import React from "react";

const repo = "wokii/wokki.com";
const apiHeaders: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "User-Agent": "wokki.com",
  "X-GitHub-Api-Version": "2022-11-28",
};
if (process.env.GITHUB_TOKEN) {
  apiHeaders.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

const fetchOptions =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const }
    : { next: { revalidate: 3600 } };

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "GMT",
    timeZoneName: "short",
  }).format(new Date(date));

async function getLastCommitDate(): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/commits?per_page=1`,
      {
        headers: apiHeaders,
        ...fetchOptions,
      },
    );

    if (!response.ok) return null;

    const [latest] = (await response.json()) as Array<{
      commit?: { author?: { date?: string }; committer?: { date?: string } };
    }>;
    const date =
      latest?.commit?.author?.date ?? latest?.commit?.committer?.date;
    if (!date) return null;

    return formatDate(date);
  } catch {
    return null;
  }
}

async function getLastPushedDate(): Promise<string | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: apiHeaders,
      ...fetchOptions,
    });

    if (!response.ok) return null;

    const data = (await response.json()) as { pushed_at?: string };
    if (!data.pushed_at) return null;

    return formatDate(data.pushed_at);
  } catch {
    return null;
  }
}

async function getLastCommitDateFromAtom(): Promise<string | null> {
  try {
    const response = await fetch(
      `https://github.com/${repo}/commits/HEAD.atom`,
      fetchOptions,
    );

    if (!response.ok) return null;

    const text = await response.text();
    const match = text.match(/<entry>[\s\S]*?<updated>([^<]+)<\/updated>/);
    if (!match?.[1]) return null;

    return formatDate(match[1]);
  } catch {
    return null;
  }
}

export default async function Footer() {
  const lastUpdated =
    (await getLastCommitDate()) ??
    (await getLastPushedDate()) ??
    (await getLastCommitDateFromAtom());
  const lastUpdatedLabel =
    lastUpdated ??
    (process.env.NODE_ENV === "development" ? "unavailable" : null);

  return (
    <footer className="block sm:fixed sm:bottom-0 sm:left-0 sm:right-0 w-full sm:z-50 bg-background/21 backdrop-blur-sm text-center py-6 text-xs sm:text-sm">
      Designed by Wokki in London · Built by Wokki × Cursor × ChatGPT
      {lastUpdatedLabel ? (
        <span className="ml-2 text-[10px] sm:text-xs text-foreground/60">
          · Last updated {lastUpdatedLabel} (Based on GitHub commit)
        </span>
      ) : null}
    </footer>
  );
}
