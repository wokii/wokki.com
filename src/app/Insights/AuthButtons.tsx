"use client";

import { signIn } from "next-auth/react";

type AuthButtonProps = {
  className?: string;
  label: string;
};

export function SignInButton({ className, label }: AuthButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        signIn("google", {
          callbackUrl: "/",
        })
      }
    >
      {label}
      <span aria-hidden>↗</span>
    </button>
  );
}

export function SwitchAccountButton({ className, label }: AuthButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        signIn(
          "google",
          { callbackUrl: "/Insights" },
          { prompt: "select_account" },
        )
      }
    >
      {label}
    </button>
  );
}
