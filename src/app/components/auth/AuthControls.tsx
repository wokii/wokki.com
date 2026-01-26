"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const badgeStyles =
  "flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 bg-[color-mix(in_srgb,var(--accent)_10%,var(--background))] text-[11px] font-medium uppercase tracking-widest text-foreground/80 transition-all hover:border-accent/60 hover:text-accent";

const outsiderBadgeStyles =
  "border-accent/40 bg-accent/10 text-accent shadow-[0_0_12px_color-mix(in_srgb,var(--accent)_45%,transparent)] ring-1 ring-accent/40 hover:shadow-[0_0_16px_color-mix(in_srgb,var(--accent)_55%,transparent)]";

const menuStyles =
  "absolute right-0 top-full mt-3 w-[300px] rounded-[30px] border border-foreground/12 bg-[linear-gradient(165deg,color-mix(in_srgb,var(--accent)_6%,var(--background))_0%,var(--background)_45%,color-mix(in_srgb,var(--accent)_4%,var(--background))_100%)] p-5 text-xs shadow-[0_28px_90px_rgba(0,0,0,0.16)] backdrop-blur-xl transition-all duration-200 dark:border-accent/18 dark:shadow-[0_26px_80px_color-mix(in_srgb,var(--accent)_18%,transparent)]";

const menuItemStyles =
  "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm font-medium text-foreground/85 transition-all hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] hover:text-foreground";

const getInitials = (name?: string | null, email?: string | null) => {
  const source = name?.trim() || email?.split("@")[0]?.trim() || "user";
  const parts = source
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .slice(0, 2);

  const letters =
    parts.length > 0
      ? parts.map((part) => part[0]?.toUpperCase() ?? "")
      : ["U"];

  return `${letters.join(".")}.`;
};

const getRoleBadgeLabel = (role?: string | null) => {
  if (!role) return "";
  const normalized = role.toLowerCase();
  if (normalized === "insider") return "IN";
  if (normalized === "outsider") return "OUT";
  return role;
};

export default function AuthControls() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (!session) {
    const signedOutLabel = getRoleBadgeLabel("outsider");
    return (
      <div className="relative group before:absolute before:left-0 before:right-0 before:top-full before:h-3 before:content-['']">
        <button
          className={`${badgeStyles} ${outsiderBadgeStyles}`}
          onClick={() => signIn("google")}
          aria-label="Sign in"
        >
          O.S.
        </button>
        <div
          className={`${menuStyles} pointer-events-none opacity-0 translate-y-1 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0`}
        >
          <div className="px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/35">
              Signed out
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <p className="text-base font-semibold text-foreground tracking-[0.01em]">
                Outsider
              </p>
              <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                {signedOutLabel || "OUT"}
              </span>
            </div>
            <p className="mt-1 text-xs text-foreground/45">
              Sign in to unlock insider views.
            </p>
          </div>
          <div className="my-3 h-px bg-foreground/10" />
          <button
            className="mt-1 inline-flex w-full items-center justify-between rounded-full border border-foreground/15 bg-background/80 px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:bg-[color-mix(in_srgb,var(--accent)_14%,var(--background))]"
            onClick={() => signIn("google")}
          >
            <span>Log in to become an Insider</span>
            <span aria-hidden>↗</span>
          </button>
        </div>
      </div>
    );
  }

  const roleLabel = session.user?.role ?? "outsider";
  const badgeRoleLabel = getRoleBadgeLabel(roleLabel);
  const initials = getInitials(session.user?.name, session.user?.email);
  const showRoleBadge = /[^\x00-\x7F]/.test(roleLabel);

  return (
    <div className="relative group before:absolute before:left-0 before:right-0 before:top-full before:h-3 before:content-['']">
      <button
        className={`${badgeStyles} border-foreground/30 bg-[color-mix(in_srgb,var(--accent)_8%,var(--background))] text-foreground shadow-[0_0_12px_color-mix(in_srgb,var(--accent)_35%,transparent)] hover:shadow-[0_0_18px_color-mix(in_srgb,var(--accent)_45%,transparent)] dark:border-accent/50 dark:shadow-[0_0_18px_color-mix(in_srgb,var(--accent)_50%,transparent)] dark:hover:shadow-[0_0_24px_color-mix(in_srgb,var(--accent)_65%,transparent)]`}
        aria-label="Open account menu"
      >
        {showRoleBadge ? roleLabel : initials}
      </button>
      <div
        className={`${menuStyles} pointer-events-none opacity-0 translate-y-1 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0`}
      >
        <div className="rounded-2xl border border-foreground/10 bg-background/80 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] dark:border-accent/15 dark:bg-[color-mix(in_srgb,var(--accent)_6%,transparent)]">
          <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/45">
            Signed in
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <p className="text-base font-semibold text-foreground tracking-[0.02em]">
              {session.user?.name ?? session.user?.email ?? "User"}
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-[color-mix(in_srgb,var(--accent)_10%,var(--background))] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-foreground/60">
              {badgeRoleLabel}
            </span>
          </div>
          <p className="mt-2 text-xs text-foreground/50">
            {session.user?.email ?? "Signed in"}
          </p>
        </div>
        <div className="my-4 h-px bg-foreground/10" />
        <Link className={menuItemStyles} href="/Insights">
          Insights
        </Link>
        <button
          className={menuItemStyles}
          onClick={async () => {
            await signOut({ redirect: false });
            await signIn(
              "google",
              { callbackUrl: "/" },
              { prompt: "select_account" },
            );
          }}
        >
          <span>Switch account</span>
        </button>
        <button className={menuItemStyles} onClick={() => signOut()}>
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}
