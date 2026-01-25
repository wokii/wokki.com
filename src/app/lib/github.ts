import { WOKKI_DOT_COM } from "./WokkiNodes";

const repo = `wokii/${WOKKI_DOT_COM}`;
const apiHeaders: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "User-Agent": WOKKI_DOT_COM,
  "X-GitHub-Api-Version": "2022-11-28",
};
if (process.env.GITHUB_TOKEN) {
  apiHeaders.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

const fetchOptions =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const }
    : { next: { revalidate: 3600 } };

export const formatDateOnly = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "GMT",
  }).format(new Date(date));

export const formatDateTime = (date: string) =>
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

async function getLastCommitIso(): Promise<string | null> {
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
    return (
      latest?.commit?.author?.date ?? latest?.commit?.committer?.date ?? null
    );
  } catch {
    return null;
  }
}

async function getLastPushedIso(): Promise<string | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: apiHeaders,
      ...fetchOptions,
    });

    if (!response.ok) return null;

    const data = (await response.json()) as { pushed_at?: string };
    return data.pushed_at ?? null;
  } catch {
    return null;
  }
}

async function getLastCommitIsoFromAtom(): Promise<string | null> {
  try {
    const response = await fetch(
      `https://github.com/${repo}/commits/HEAD.atom`,
      fetchOptions,
    );

    if (!response.ok) return null;

    const text = await response.text();
    const match = text.match(/<entry>[\s\S]*?<updated>([^<]+)<\/updated>/);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

export async function getLastUpdatedIso(): Promise<string | null> {
  return (
    (await getLastCommitIso()) ??
    (await getLastPushedIso()) ??
    (await getLastCommitIsoFromAtom())
  );
}
