"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const badgeStyles =
  "flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 bg-[color-mix(in_srgb,var(--accent)_12%,var(--background))] text-[11px] font-medium uppercase tracking-widest text-foreground/80 transition-colors hover:border-accent hover:text-accent";

const outsiderBadgeStyles =
  "border-accent/70 bg-accent/15 text-accent shadow-[0_0_18px_color-mix(in_srgb,var(--accent)_60%,transparent)] ring-2 ring-accent/70 animate-pulse";

const menuStyles =
  "absolute right-0 top-full mt-3 w-64 rounded-[1.5rem] border border-foreground/10 bg-background/90 p-4 text-xs shadow-lg backdrop-blur transition-all duration-200 dark:border-accent/20 dark:shadow-[0_6px_16px_color-mix(in_srgb,var(--accent)_18%,transparent)]";

const menuItemStyles =
  "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-foreground/5";

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

export default function AuthControls() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (!session) {
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
          <p className="mt-2 text-lg font-semibold">Sign In</p>
          <p className="mt-1 text-[11px] text-foreground/45">
            - is the recommended action -
          </p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/60">
            Uh-oh. You are currently just an{" "}
            <span className="font-semibold text-accent">O.S.</span>{" "}
            <span className="text-foreground/45">
              (that stands for &apos;outsider&apos;)
            </span>
            .
          </p>
          <button
            className="mt-4 inline-flex w-full items-center justify-between rounded-full border border-foreground/15 bg-background/70 px-4 py-2 text-sm font-medium text-foreground transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-[color-mix(in_srgb,var(--accent)_16%,var(--background))]"
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
        <div className="px-3 py-2">
          <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/35">
            Signed in
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <p className="text-base font-semibold text-foreground tracking-[0.01em]">
              {session.user?.name ?? session.user?.email ?? "User"}
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/60">
              {roleLabel}
            </span>
          </div>
          <p className="mt-1 text-xs text-foreground/45">
            {session.user?.email ?? "Signed in"}
          </p>
        </div>
        <div className="my-2 h-px bg-foreground/10" />
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
