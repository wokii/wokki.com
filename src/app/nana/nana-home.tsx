"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { NANA_WOKKI, Zen, type NanaSong } from "../lib/WokkiNodes";

const node = Zen[NANA_WOKKI];
const ALL_SONGS: NanaSong[] = node.setlist.categories.flatMap((c) => c.songs);

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function NanaHome() {
  const { header, hero, setlist, about, queueDock, footer } = node;

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [queue, setQueue] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [randomId, setRandomId] = useState<string | null>(null);
  const [now, setNow] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const randomFlashRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const tick = () =>
      setNow(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    tick();
    const t = window.setInterval(tick, 30_000);
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    if (!randomId) return;
    if (randomFlashRef.current) window.clearTimeout(randomFlashRef.current);
    randomFlashRef.current = window.setTimeout(() => setRandomId(null), 2400);
    return () => {
      if (randomFlashRef.current) window.clearTimeout(randomFlashRef.current);
    };
  }, [randomId]);

  const filteredCategories = useMemo(() => {
    const q = normalize(query.trim());
    return setlist.categories
      .map((c) => {
        const songs = c.songs.filter((s) => {
          if (activeCategory !== "all" && activeCategory !== c.id) return false;
          if (!q) return true;
          const haystack = normalize(
            [s.title, s.romanization ?? "", s.artist, s.capo ?? ""].join(" "),
          );
          return haystack.includes(q);
        });
        return { ...c, songs };
      })
      .filter((c) => c.songs.length > 0);
  }, [query, activeCategory, setlist.categories]);

  const totalShown = filteredCategories.reduce(
    (acc, c) => acc + c.songs.length,
    0,
  );

  const queuedSongs = useMemo(
    () =>
      queue
        .map((id) => ALL_SONGS.find((s) => s.id === id))
        .filter(Boolean) as NanaSong[],
    [queue],
  );

  const toggleQueue = (id: string) => {
    setQueue((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
    setCopied(false);
  };

  const pickRandom = () => {
    const next = ALL_SONGS[Math.floor(Math.random() * ALL_SONGS.length)];
    setRandomId(next.id);
    const card = document.getElementById(`song-${next.id}`);
    if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const copyQueue = async () => {
    if (!queuedSongs.length) return;
    const lines = queuedSongs.map(
      (s, i) =>
        `${i + 1}. ${s.title}${s.romanization ? ` (${s.romanization})` : ""} — ${s.artist}`,
    );
    const text = `${queueDock.clipboardHeader}\n${lines.join("\n")}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const counterLabel = `${totalShown} ${
    totalShown === 1 ? setlist.counterSingular : setlist.counterPlural
  } · ${queue.length} ${setlist.counterQueued}`;

  return (
    <main
      className="relative min-h-screen overflow-hidden text-[#f4ede4]"
      style={{
        background:
          "radial-gradient(120% 80% at 18% 0%, rgba(255,95,64,0.08) 0%, rgba(0,0,0,0) 55%), radial-gradient(120% 80% at 82% 100%, rgba(255,180,140,0.05) 0%, rgba(0,0,0,0) 60%), #050505",
      }}
    >
      <header className="fixed top-0 left-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="relative inline-flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#ff5f40]/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff5f40] shadow-[0_0_18px_rgba(255,95,64,0.85)]" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/85">
              {header.onAirLabel}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.28em] text-white/35 sm:inline">
              {header.onAirSub}
            </span>
          </div>
          <nav className="flex items-center gap-5 text-[10px] uppercase tracking-[0.28em] text-white/55">
            <a
              href="#setlist"
              className="transition-colors hover:text-[#ff5f40]"
            >
              {header.nav.setlist}
            </a>
            <a href="#about" className="transition-colors hover:text-[#ff5f40]">
              {header.nav.about}
            </a>
            <Link
              href={header.nav.home.href}
              className="hidden transition-colors hover:text-[#ff5f40] sm:inline"
            >
              {header.nav.home.label}
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 pb-16 pt-32">
        <p className="text-[10px] uppercase tracking-[0.45em] text-white/40">
          {hero.eyebrow}
        </p>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight text-white md:text-7xl">
          {hero.titleLead}
          <span className="block text-[#ff5f40]">{hero.titleAccent}</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
          {hero.subtitle}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/45">
          {hero.subtitleZh}
        </p>

        <div className="mt-10 flex items-end gap-1.5" aria-hidden>
          {[12, 22, 34, 46, 30, 18, 28, 40, 24, 14].map((h, i) => (
            <span
              key={i}
              className="block w-[3px] rounded-full bg-[#ff5f40]/70"
              style={{
                height: `${h}px`,
                animation: `nanaPulse 2.4s ease-in-out ${i * 0.12}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/50">
          <a
            href={hero.primaryCta.href}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 font-semibold text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff5f40] hover:text-[#ff5f40] hover:shadow-[0_0_28px_rgba(255,95,64,0.35)]"
          >
            {hero.primaryCta.label}
          </a>
          <button
            type="button"
            onClick={pickRandom}
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-transparent px-5 py-2 font-semibold text-white/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff5f40] hover:text-[#ff5f40]"
          >
            {hero.randomCtaLabel}
          </button>
          {mounted ? (
            <span className="ml-1 hidden text-white/35 sm:inline">
              · {now} {hero.localTimeSuffix}
            </span>
          ) : null}
        </div>
      </section>

      <section
        id="setlist"
        className="mx-auto max-w-5xl px-6 pb-24 pt-12 md:pt-16"
      >
        <div className="mb-10 flex flex-col gap-2">
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
            {setlist.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {setlist.title}
          </h2>
          <p className="max-w-2xl text-sm text-white/55">
            {setlist.description}
          </p>
        </div>

        <div className="sticky top-[58px] z-40 -mx-6 mb-10 border-y border-white/5 bg-black/55 px-6 py-4 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={setlist.searchPlaceholder}
                className="w-full rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-[#ff5f40]/70"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-[#ff5f40]"
                >
                  {setlist.clearLabel}
                </button>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {[
                {
                  id: "all",
                  label: setlist.allTabLabel,
                  zh: setlist.allTabLabelZh,
                },
                ...setlist.categories.map((c) => ({
                  id: c.id,
                  label: c.en,
                  zh: c.zh,
                })),
              ].map((tab) => {
                const active = activeCategory === tab.id;
                return (
                  <button
                    type="button"
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition-all duration-200 ${
                      active
                        ? "border-[#ff5f40] bg-[#ff5f40]/[0.12] text-[#ff5f40] shadow-[0_0_18px_rgba(255,95,64,0.25)]"
                        : "border-white/10 bg-white/[0.02] text-white/55 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    {tab.label} · {tab.zh}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-[0.28em] text-white/35">
            {counterLabel}
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {filteredCategories.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center">
              <p className="text-sm text-white/55">
                {setlist.emptyTitle}{" "}
                <button
                  type="button"
                  onClick={pickRandom}
                  className="text-[#ff5f40] underline-offset-2 hover:underline"
                >
                  {setlist.emptyActionLabel}
                </button>
                .
              </p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.id} className="flex flex-col gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                    {category.en} · {category.zh}
                  </p>
                  <p className="mt-2 max-w-xl text-sm italic text-white/45">
                    {category.blurb}
                  </p>
                </div>
                <ul className="grid gap-3 md:grid-cols-2">
                  {category.songs.map((song, idx) => {
                    const queued = queue.includes(song.id);
                    const flashing = randomId === song.id;
                    return (
                      <li
                        key={song.id}
                        id={`song-${song.id}`}
                        className="list-none"
                      >
                        <button
                          type="button"
                          onClick={() => toggleQueue(song.id)}
                          className={`group relative flex w-full items-center gap-5 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-300 ${
                            queued
                              ? "border-[#ff5f40]/60 bg-[#ff5f40]/[0.07] shadow-[0_0_30px_rgba(255,95,64,0.18)]"
                              : "border-white/10 bg-white/[0.025] hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.05]"
                          } ${
                            flashing
                              ? "ring-1 ring-[#ff5f40]/80 [animation:nanaFlash_2s_ease-out_forwards]"
                              : ""
                          }`}
                          aria-pressed={queued}
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold tracking-[0.18em] transition-colors ${
                              queued
                                ? "border-[#ff5f40] bg-[#ff5f40]/15 text-[#ff5f40]"
                                : "border-white/15 bg-white/[0.03] text-white/55 group-hover:border-white/40 group-hover:text-white"
                            }`}
                            aria-hidden
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                              <span className="text-base font-medium text-white">
                                {song.title}
                              </span>
                              {song.romanization ? (
                                <span className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                                  {song.romanization}
                                </span>
                              ) : null}
                              {song.badge ? (
                                <span
                                  className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] ${
                                    song.badge === "tonight"
                                      ? "border-[#ff5f40]/60 text-[#ff5f40]"
                                      : "border-white/25 text-white/65"
                                  }`}
                                >
                                  {setlist.badges[song.badge]}
                                </span>
                              ) : null}
                            </span>
                            <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-white/45">
                              <span>{song.artist}</span>
                              {song.capo ? (
                                <>
                                  <span aria-hidden>·</span>
                                  <span className="font-mono tracking-[0.05em] text-white/55">
                                    {song.capo}
                                  </span>
                                </>
                              ) : null}
                            </span>
                          </span>
                          <span
                            className={`shrink-0 text-[10px] font-semibold uppercase tracking-[0.22em] transition-opacity ${
                              queued
                                ? "text-[#ff5f40]"
                                : "text-white/30 group-hover:text-white/60"
                            }`}
                          >
                            {queued
                              ? setlist.queueRemoveLabel
                              : setlist.queueAddLabel}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-10 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
              {about.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {about.title}
            </h2>
            {about.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed ${
                  i === 0
                    ? "mt-5 text-white/65"
                    : i === about.paragraphs.length - 1
                      ? "mt-3 text-white/45"
                      : "mt-3 text-white/55"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="flex flex-col gap-4 text-sm text-white/65">
            {about.bullets.map((bullet) => (
              <li key={bullet.label} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff5f40]"
                />
                <span>
                  <span className="text-white">{bullet.label}</span>{" "}
                  {bullet.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 text-[10px] uppercase tracking-[0.28em] text-white/35 md:flex-row md:items-center">
          <span>
            {footer.curatedPrefix}{" "}
            <Link
              href={footer.curatedLink.href}
              className="text-white/65 hover:text-[#ff5f40]"
            >
              {footer.curatedLink.label}
            </Link>
          </span>
          <span>{footer.rightLine}</span>
        </div>
      </footer>

      {mounted ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-5">
          <div
            className={`pointer-events-auto flex w-full max-w-xl items-center gap-3 rounded-full border border-white/10 bg-black/75 px-4 py-2.5 text-[11px] text-white/75 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 ${
              queue.length === 0
                ? "translate-y-2 opacity-60"
                : "translate-y-0 opacity-100"
            }`}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#ff5f40]/50 bg-[#ff5f40]/[0.12] text-[10px] font-semibold text-[#ff5f40]">
              {queue.length}
            </span>
            <span className="min-w-0 flex-1 truncate text-white/65">
              {queue.length === 0
                ? queueDock.empty
                : queuedSongs.map((s) => s.title).join(" · ")}
            </span>
            {queue.length > 0 ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setQueue([]);
                    setCopied(false);
                  }}
                  className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-white/55 transition-colors hover:border-white/30 hover:text-white"
                >
                  {queueDock.clearLabel}
                </button>
                <button
                  type="button"
                  onClick={copyQueue}
                  className="rounded-full border border-[#ff5f40]/60 bg-[#ff5f40]/[0.12] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#ff5f40] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_22px_rgba(255,95,64,0.35)]"
                >
                  {copied ? queueDock.copiedLabel : queueDock.copyLabel}
                </button>
              </>
            ) : null}
          </div>
        </div>
      ) : null}

      <style jsx global>{`
        @keyframes nanaPulse {
          0%,
          100% {
            transform: scaleY(0.6);
            opacity: 0.55;
          }
          50% {
            transform: scaleY(1.4);
            opacity: 1;
          }
        }
        @keyframes nanaFlash {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 95, 64, 0);
          }
          25% {
            box-shadow: 0 0 0 6px rgba(255, 95, 64, 0.35);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 95, 64, 0);
          }
        }
      `}</style>
    </main>
  );
}
