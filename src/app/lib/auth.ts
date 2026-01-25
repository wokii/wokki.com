import type { CookieOption, NextAuthOptions } from "next-auth";
import { headers } from "next/headers";
import GoogleProvider from "next-auth/providers/google";
import { Resend } from "resend";
import { WOKKI_DOT_COM } from "./WokkiNodes";

export type UserRole = "元" | "insider" | "outsider" | "妃";

const parseCsv = (value?: string) =>
  new Set(
    value
      ?.split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean),
  );

const adminEmails = parseCsv(process.env.ADMIN_EMAILS);
const clientEmails = parseCsv(process.env.CLIENT_EMAILS);
const feiEmails = parseCsv(process.env.FEI_EMAILS);
const resendApiKey = process.env.RESEND_API_KEY;
const statsRecipient = process.env.AUTH_STATS_TO_EMAIL ?? "hanwokki@gmail.com";
const statsFromEmail =
  process.env.AUTH_STATS_FROM_EMAIL ?? "onboarding@resend.dev";

const resolveCookieDomain = () => {
  const nextAuthUrl = process.env.NEXTAUTH_URL;
  if (!nextAuthUrl) return undefined;

  try {
    const hostname = new URL(nextAuthUrl).hostname;
    if (hostname === "127.0.0.1") {
      return undefined;
    }
    if (hostname === "localhost" || hostname.endsWith(".localhost")) {
      return ".localhost";
    }
    if (hostname === WOKKI_DOT_COM || hostname.endsWith(`.${WOKKI_DOT_COM}`)) {
      return `.${WOKKI_DOT_COM}`;
    }
    return `.${hostname}`;
  } catch {
    return undefined;
  }
};

const cookieDomain = resolveCookieDomain();
const isProduction = process.env.NODE_ENV === "production";
const sharedCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  secure: isProduction,
  ...(cookieDomain ? { domain: cookieDomain } : {}),
};

const buildCookieOption = (
  name: string,
  overrides: Partial<CookieOption["options"]> = {},
): CookieOption => ({
  name,
  options: {
    ...sharedCookieOptions,
    ...overrides,
  },
});

const roleOverridesByEmail: Record<string, UserRole> = {
  "hanwokki@gmail.com": "元",
  "seeker.wokki@gmail.com": "元",
  "christine.huingaman@gmail.com": "妃",
};

const resolveUserRole = (email?: string | null): UserRole => {
  if (!email) {
    return "outsider";
  }

  const normalized = email.toLowerCase();
  const overrideRole = roleOverridesByEmail[normalized];
  if (overrideRole) {
    return overrideRole;
  }

  if (feiEmails.has(normalized)) {
    return "妃";
  }

  if (adminEmails.has(normalized)) {
    return "元";
  }

  if (clientEmails.has(normalized)) {
    return "insider";
  }

  return "insider";
};

const getRequestMeta = async () => {
  try {
    const requestHeaders = await headers();
    const forwardedFor = requestHeaders.get("x-forwarded-for");
    const ip =
      forwardedFor?.split(",")[0]?.trim() ?? requestHeaders.get("x-real-ip");

    return {
      ip,
      userAgent: requestHeaders.get("user-agent"),
      acceptLanguage: requestHeaders.get("accept-language"),
      referer: requestHeaders.get("referer"),
      host: requestHeaders.get("host"),
      country:
        requestHeaders.get("x-vercel-ip-country") ??
        requestHeaders.get("cf-ipcountry"),
      region: requestHeaders.get("x-vercel-ip-country-region"),
      city: requestHeaders.get("x-vercel-ip-city"),
      timezone: requestHeaders.get("x-vercel-ip-timezone"),
    };
  } catch {
    return {
      ip: null,
      userAgent: null,
      acceptLanguage: null,
      referer: null,
      host: null,
      country: null,
      region: null,
      city: null,
      timezone: null,
    };
  }
};

const sendSignInReport = async (
  email: string | null | undefined,
  name: string | null | undefined,
  role: UserRole,
) => {
  if (!email) {
    return;
  }
  try {
    if (!resendApiKey) {
      console.warn("Missing RESEND_API_KEY; sign-in stats email was not sent.");
      return;
    }
    const meta = await getRequestMeta();
    const timestampIso = new Date().toISOString();
    const timestampLocal = new Date().toString();

    const lines = [
      `Sign-in event`,
      `Name: ${name ?? "unknown"}`,
      `Email: ${email}`,
      `Role: ${role}`,
      `Time (ISO): ${timestampIso}`,
      `Time (Server): ${timestampLocal}`,
      `IP: ${meta.ip ?? "unknown"}`,
      `Country: ${meta.country ?? "unknown"}`,
      `Region: ${meta.region ?? "unknown"}`,
      `City: ${meta.city ?? "unknown"}`,
      `Timezone: ${meta.timezone ?? "unknown"}`,
      `User-Agent: ${meta.userAgent ?? "unknown"}`,
      `Accept-Language: ${meta.acceptLanguage ?? "unknown"}`,
      `Referer: ${meta.referer ?? "unknown"}`,
      `Host: ${meta.host ?? "unknown"}`,
    ];

    const resend = new Resend(resendApiKey);
    await resend.emails.send({
      from: statsFromEmail,
      to: [statsRecipient],
      subject: `Sign-in: ${email}`,
      text: lines.join("\n"),
    });
  } catch (error) {
    console.warn("Sign-in stats email failed.", error);
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: buildCookieOption(
      isProduction
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
    ),
    callbackUrl: buildCookieOption(
      isProduction
        ? "__Secure-next-auth.callback-url"
        : "next-auth.callback-url",
      { httpOnly: false },
    ),
    csrfToken: buildCookieOption(
      isProduction ? "__Secure-next-auth.csrf-token" : "next-auth.csrf-token",
      { httpOnly: false },
    ),
    pkceCodeVerifier: buildCookieOption(
      isProduction
        ? "__Secure-next-auth.pkce.code_verifier"
        : "next-auth.pkce.code_verifier",
    ),
    state: buildCookieOption(
      isProduction ? "__Secure-next-auth.state" : "next-auth.state",
    ),
  },
  callbacks: {
    async jwt({ token, user }) {
      const email = token.email ?? user?.email ?? null;
      token.role = resolveUserRole(email);
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as UserRole) ?? "outsider";
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      const role = resolveUserRole(user.email);
      await sendSignInReport(user.email, user.name, role);
    },
  },
};
