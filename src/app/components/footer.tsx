import React from "react";
import { formatDateTime, getLastUpdatedIso } from "../lib/github";

export default async function Footer() {
  const lastUpdatedIso = await getLastUpdatedIso();
  const lastUpdatedLabel =
    (lastUpdatedIso ? formatDateTime(lastUpdatedIso) : null) ??
    (process.env.NODE_ENV === "development" ? "unavailable" : null);

  return (
    <footer className="block sm:fixed sm:bottom-0 sm:left-0 sm:right-0 w-full sm:z-50 bg-background/21 backdrop-blur-sm text-center py-6 text-xs sm:text-sm">
      Designed by Wokki in London · Built by Wokki × Cursor × ChatGPT × Gemini
      {lastUpdatedLabel ? (
        <span className="ml-2 text-[10px] sm:text-xs text-foreground/60">
          · Last updated {lastUpdatedLabel} (Based on GitHub commit)
        </span>
      ) : null}
    </footer>
  );
}
