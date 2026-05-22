import React from "react";
import { formatDateTime, getLastUpdatedIso } from "../lib/github";

export default async function Footer() {
  const lastUpdatedIso = await getLastUpdatedIso();
  const lastUpdatedLabel =
    (lastUpdatedIso ? formatDateTime(lastUpdatedIso) : null) ??
    (process.env.NODE_ENV === "development" ? "unavailable" : null);

  return (
    <footer className="block sm:fixed sm:bottom-0 sm:left-0 sm:right-0 w-full sm:z-50 border-t border-foreground/10 bg-background/55 backdrop-blur-xl text-center py-5 text-[11px] sm:text-xs">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-1 px-4 sm:flex-row sm:gap-3">
        <span className="inline-flex items-center gap-1.5 text-foreground/70">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_color-mix(in_srgb,var(--accent)_60%,transparent)]"
          />
          <span className="uppercase tracking-[0.22em]">
            Designed by Wokki · London · 设计于伦敦
          </span>
        </span>
        <span aria-hidden className="hidden text-foreground/25 sm:inline">
          ·
        </span>
        <span className="text-foreground/55">
          Built by Wokki × Cursor × ChatGPT × Gemini
        </span>
        {lastUpdatedLabel ? (
          <>
            <span aria-hidden className="hidden text-foreground/25 sm:inline">
              ·
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/45 sm:text-[11px]">
              Last pulse · {lastUpdatedLabel}
            </span>
          </>
        ) : null}
      </div>
    </footer>
  );
}
