import { getServerSession } from "next-auth";
import { headers } from "next/headers";

import { authOptions } from "@/app/lib/auth";
import { CONSULTANCY_WOKKI, Zen } from "@/app/lib/WokkiNodes";
import { SignInButton, SwitchAccountButton } from "./AuthButtons";

const getConsultancyUrl = async () => {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "";
  const forwardedProto = requestHeaders.get("x-forwarded-proto");
  const protocol =
    forwardedProto ??
    (host.includes("localhost") || host.includes("127.0.0.1")
      ? "http"
      : "https");

  const [hostname, port] = host.split(":");

  if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
    const localHost = `consultancy.${hostname}${port ? `:${port}` : ""}`;
    return `${protocol}://${localHost}`;
  }

  const hostParts = hostname.split(".");
  const baseDomain =
    hostParts.length >= 2 ? hostParts.slice(-2).join(".") : hostname;

  return `${protocol}://consultancy.${baseDomain}`;
};

export default async function InsightsPage() {
  const { insights } = Zen[CONSULTANCY_WOKKI];
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();
  const consultancyUrl = await getConsultancyUrl();

  if (!email) {
    return (
      <main className="min-h-screen px-6 py-24">
        <div className="mx-auto max-w-3xl rounded-3xl border border-foreground/10 bg-background/60 p-8 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">
              Wokki Consultancy
            </p>
            <a
              href={consultancyUrl}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:border-accent hover:text-accent"
            >
              Return
              <span aria-hidden>↗</span>
            </a>
          </div>
          <h1 className="mt-3 text-3xl font-semibold">
            {insights.signIn.heading}
          </h1>
          <p className="mt-3 text-foreground/60">{insights.signIn.body}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <SignInButton
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
              label={insights.signIn.ctaLabel}
            />
          </div>
        </div>
      </main>
    );
  }

  const records = insights.records.filter(
    (record) => record.email.toLowerCase() === email,
  );

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/40">
            Wokki Consultancy
          </p>
          <a
            href={consultancyUrl}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:border-accent hover:text-accent"
          >
            Return
            <span aria-hidden>↗</span>
          </a>
        </div>
        <h1 className="mt-3 text-3xl font-semibold">{insights.heading}</h1>
        <div className="mt-3 flex items-center justify-between gap-3 text-foreground/60">
          <p className="min-w-0 truncate">
            Showing results for <span className="text-foreground">{email}</span>
          </p>
          <SwitchAccountButton
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-accent hover:text-accent"
            label="Switch account"
          />
        </div>

        <div className="mt-8 space-y-4">
          {records.length === 0 ? (
            <div className="rounded-3xl border border-foreground/10 bg-background/60 p-6 text-foreground/60">
              {insights.emptyState}
            </div>
          ) : (
            records.map((record) => (
              <article
                key={record.id}
                className="rounded-3xl border border-foreground/10 bg-background/60 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">{record.title}</h2>
                  <span className="text-xs uppercase tracking-[0.25em] text-foreground/50">
                    {new Date(record.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-3 text-foreground/70">{record.summary}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
