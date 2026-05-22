"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type DouyinCard = {
  id: string;
  url: string;
  kind: string; // 笔记 / 视频 / 主页
  kindEn: string; // Note / Curated / Profile
  author: string; // @handle
  authorTag: string; // small contextual subline
  title: string; // headline shown in caption block
  caption: string; // longer line below the title
  tags: string[]; // # hashtags shown in the caption block
  glyph: string; // large background character — quiet poster
  poster: string; // tailwind gradient classes for the poster
  accent: string; // hex / css color for the accent halo, chip, etc.
};

// Default 抖音 feed. First card is the user-provided note URL.
const DOUYIN_FEED: DouyinCard[] = [
  {
    id: "note-7642369844512323270",
    url: "https://www.douyin.com/note/7642369844512323270",
    kind: "笔记",
    kindEn: "Note",
    author: "@沃客",
    authorTag: "Wokki · 21世纪",
    title: "一支安静的 Note",
    caption: "A quiet note from the architect — tap to open on 抖音.",
    tags: ["#沃客", "#note", "#wokki"],
    glyph: "笔",
    poster:
      "from-[color-mix(in_srgb,var(--accent)_70%,transparent)] via-[color-mix(in_srgb,var(--accent)_24%,transparent)] to-[#0b0b10]",
    accent: "var(--accent)",
  },
  {
    id: "video-7546676545462406458",
    url: "https://www.douyin.com/video/7546676545462406458",
    kind: "视频",
    kindEn: "Curated",
    author: "@沃客 · 推背图",
    authorTag: "Curation · Frame No.001",
    title: "Elon Watching Black Pink",
    caption: "推背图之一 — the CEO and the K-pop frame, captured on 抖音.",
    tags: ["#推背图", "#黑粉", "#frame"],
    glyph: "影",
    poster: "from-pink-500/55 via-fuchsia-500/20 to-[#10080f]",
    accent: "#ff5b8a",
  },
  {
    id: "user-wokki-douyin",
    url: "https://www.douyin.com/user/MS4wLjABAAAA6dlxf0baWEWZ4VQl8tuhWY-J8l4PreD1OkEHzCZS9gw",
    kind: "主页",
    kindEn: "Profile",
    author: "@沃客 · Wokki",
    authorTag: "抖音主页 · the running feed",
    title: "Wokki on 抖音",
    caption: "More shorts from the architect of this site.",
    tags: ["#主页", "#follow", "#沃客"],
    glyph: "沃",
    poster: "from-sky-400/55 via-cyan-400/20 to-[#06101a]",
    accent: "#5fd0ff",
  },
];

const WHEEL_COOLDOWN_MS = 360;
const TOUCH_THRESHOLD_PX = 28;

// ───────────────────────── small icon glyphs ─────────────────────────
function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8 3 4.8 6.4 4.8c2 0 3.6 1.1 4.6 2.8 1-1.7 2.6-2.8 4.6-2.8 3.4 0 5.5 3.2 4 7C19.5 16.4 12 21 12 21z" />
    </svg>
  );
}

function CommentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M21 12c0 4.4-4 8-9 8a9.7 9.7 0 0 1-3.7-.7L3 21l1.7-5A7.6 7.6 0 0 1 3 12c0-4.4 4-8 9-8s9 3.6 9 8z" />
    </svg>
  );
}

function ShareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
      <path d="M16 6l-4-4-4 4" />
      <path d="M12 2v14" />
    </svg>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ArrowUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );
}

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

// ───────────────────────── component ─────────────────────────
export default function HeroDouyinFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWheelAtRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [pulse, setPulse] = useState(false);

  const total = DOUYIN_FEED.length;
  const card = DOUYIN_FEED[activeIdx];

  const advance = useCallback(
    (delta: 1 | -1) => {
      setDirection(delta);
      setActiveIdx((idx) => (idx + delta + total) % total);
      setPulse(true);
      window.setTimeout(() => setPulse(false), 360);
    },
    [total],
  );

  // Native wheel listener: hover + scroll wheel = cycle (Douyin style).
  // Uses { passive: false } so we can preventDefault and avoid page scroll.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (Math.abs(e.deltaY) < 4) return;

      e.preventDefault();

      const now = Date.now();
      if (now - lastWheelAtRef.current < WHEEL_COOLDOWN_MS) return;
      lastWheelAtRef.current = now;

      advance(e.deltaY > 0 ? 1 : -1);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [advance]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      advance(1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      advance(-1);
    }
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartYRef.current = e.touches[0]?.clientY ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const startY = touchStartYRef.current;
    if (startY === null) return;
    const endY = e.changedTouches[0]?.clientY ?? startY;
    const dy = startY - endY;
    if (Math.abs(dy) > TOUCH_THRESHOLD_PX) advance(dy > 0 ? 1 : -1);
    touchStartYRef.current = null;
  };

  return (
    <div className="relative mx-auto flex w-full max-w-[300px] flex-col items-center md:max-w-[320px]">
      {/* Soft accent halo bleeding behind the phone */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 35%, color-mix(in srgb, var(--card-accent) 38%, transparent), transparent 70%)",
          opacity: 0.7,
          ["--card-accent" as never]: card.accent,
        }}
      />

      {/* Phone-frame shell */}
      <div
        ref={containerRef}
        role="region"
        aria-label="Douyin feed · 刷抖音"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="group/feed relative aspect-[9/19] w-full overflow-hidden rounded-[34px] border border-foreground/20 bg-[linear-gradient(180deg,#15151b_0%,#0a0a0e_100%)] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] outline-none transition-shadow duration-300 focus-visible:ring-2 focus-visible:ring-accent/40"
        style={
          {
            ["--card-accent" as never]: card.accent,
          } as React.CSSProperties
        }
      >
        {/* Phone screen — slightly inset from the frame */}
        <div className="absolute inset-[6px] overflow-hidden rounded-[28px] bg-[#0a0a0e]">
          {/* Sliding card rail */}
          <div
            className="absolute inset-0 transition-transform duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateY(${-activeIdx * 100}%)` }}
          >
            {DOUYIN_FEED.map((c, i) => (
              <div
                key={c.id}
                className="absolute inset-x-0 h-full"
                style={{ top: `${i * 100}%` }}
                aria-hidden={i !== activeIdx}
              >
                {/* Poster gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${c.poster}`}
                />

                {/* Quiet ambient grain overlays for depth */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.10), transparent 55%), radial-gradient(80% 60% at 50% 100%, rgba(0,0,0,0.55), transparent 70%)",
                  }}
                />

                {/* Giant glyph as quiet content surrogate */}
                <span
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-center font-serif text-[160px] leading-none text-white/15"
                >
                  {c.glyph}
                </span>

                {/* Central play affordance (tap → open) */}
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.title} — Open on 抖音`}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white/90 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/55">
                    <PlayIcon className="ml-0.5 h-5 w-5" />
                  </span>
                </a>
              </div>
            ))}
          </div>

          {/* ─── Top status bar (sits above the sliding rail) ─── */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-3 text-[10px] uppercase tracking-[0.28em] text-white/70">
            <span className="tabular-nums">9:24</span>
            <div className="flex items-center gap-1">
              <span className="block h-1 w-1 rounded-full bg-white/70" />
              <span className="block h-1 w-1 rounded-full bg-white/70" />
              <span className="block h-1 w-1 rounded-full bg-white/40" />
              <span className="ml-1 text-[9px] tracking-[0.2em]">5G</span>
            </div>
          </div>

          {/* Dynamic-island-style notch */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-2 z-10 h-[18px] w-[78px] -translate-x-1/2 rounded-full bg-black/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          />

          {/* ─── Feed tabs (推荐 / 关注) ─── */}
          <div className="pointer-events-none absolute inset-x-0 top-9 z-10 flex items-center justify-center gap-5 text-[11px] font-semibold text-white/55">
            <span className="text-white/45 tracking-wide">关注</span>
            <span className="relative text-white tracking-wide">
              推荐
              <span
                aria-hidden
                className="absolute -bottom-1.5 left-1/2 block h-[2px] w-5 -translate-x-1/2 rounded-full bg-white"
              />
            </span>
            <span className="text-white/45 tracking-wide">直播</span>
          </div>

          {/* ─── Right-side action rail (avatar + ♥ / 💬 / ↗ + disc) ─── */}
          <div className="absolute right-2.5 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center gap-3.5">
            <div
              className="relative h-9 w-9 overflow-hidden rounded-full border border-white/35 shadow-[0_0_18px_color-mix(in_srgb,var(--card-accent)_60%,transparent)]"
              aria-hidden
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--card-accent) 80%, white), color-mix(in srgb, var(--card-accent) 30%, black))`,
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center font-serif text-[15px] text-white/95">
                {card.glyph}
              </span>
              <span
                aria-hidden
                className="absolute -bottom-1 left-1/2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-[#fe2c55] text-[10px] font-bold leading-none text-white shadow"
              >
                +
              </span>
            </div>

            <div className="flex flex-col items-center text-white/95">
              <button
                type="button"
                aria-label="Like"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/25 backdrop-blur transition-transform duration-200 hover:scale-110"
              >
                <HeartIcon className="h-[18px] w-[18px]" />
              </button>
              <span className="mt-0.5 text-[9px] tracking-wide text-white/80">
                ♡
              </span>
            </div>

            <div className="flex flex-col items-center text-white/95">
              <button
                type="button"
                aria-label="Comment"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/25 backdrop-blur transition-transform duration-200 hover:scale-110"
              >
                <CommentIcon className="h-[18px] w-[18px]" />
              </button>
              <span className="mt-0.5 text-[9px] tracking-wide text-white/80">
                ∞
              </span>
            </div>

            <div className="flex flex-col items-center text-white/95">
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share / Open on 抖音"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/25 backdrop-blur transition-transform duration-200 hover:scale-110"
              >
                <ShareIcon className="h-[18px] w-[18px]" />
              </a>
              <span className="mt-0.5 text-[9px] tracking-wide text-white/80">
                ↗
              </span>
            </div>

            {/* Spinning disc — quintessential Douyin */}
            <div
              aria-hidden
              className="relative mt-1 h-9 w-9 wokki-orbit-douyin rounded-full border border-white/25 shadow-[0_0_20px_color-mix(in_srgb,var(--card-accent)_40%,transparent)]"
              style={{
                background: "radial-gradient(circle, #1a1a22 30%, #050507 70%)",
              }}
            >
              <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />
              <span
                className="absolute inset-1 rounded-full border border-white/8"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.08) 30%, transparent 60%)",
                }}
              />
            </div>
          </div>

          {/* ─── Right-edge progress ticks ─── */}
          <div className="pointer-events-none absolute right-1 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-1">
            {DOUYIN_FEED.map((_, i) => (
              <span
                key={i}
                className={`block w-[2px] rounded-full transition-all duration-300 ${
                  i === activeIdx ? "h-4 bg-white/90" : "h-2 bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* ─── Bottom caption block (author + title + tags) ─── */}
          <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-12 pt-10">
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
            />
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1 rounded-full border px-2 py-[3px] text-[9px] font-semibold uppercase tracking-[0.24em]"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--card-accent) 60%, transparent)",
                  background:
                    "color-mix(in srgb, var(--card-accent) 18%, transparent)",
                  color: "white",
                }}
              >
                {card.kindEn}
              </span>
              <span className="truncate text-[11px] uppercase tracking-[0.24em] text-white/75">
                {card.author}
              </span>
            </div>

            <h3
              key={`${card.id}-title`}
              className={`mt-2 text-[15px] font-semibold leading-snug text-white ${
                pulse
                  ? direction === 1
                    ? "wokki-feed-in-down"
                    : "wokki-feed-in-up"
                  : ""
              }`}
            >
              「{card.title}」
            </h3>

            <p
              key={`${card.id}-caption`}
              className={`mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-white/80 ${
                pulse
                  ? direction === 1
                    ? "wokki-feed-in-down"
                    : "wokki-feed-in-up"
                  : ""
              }`}
            >
              {card.caption}
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] font-medium text-white/85">
              {card.tags.map((tag) => (
                <span key={tag} className="tracking-wide">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/55">
              <span
                aria-hidden
                className="inline-flex h-3 w-3 items-center justify-center rounded-full text-white"
                style={{ background: "var(--card-accent)" }}
              >
                <PlayIcon className="ml-[0.5px] h-2 w-2" />
              </span>
              <span>{card.authorTag}</span>
            </div>
          </div>

          {/* ─── Bottom phone home indicator ─── */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-1.5 z-10 flex justify-center"
          >
            <span className="block h-[3px] w-[88px] rounded-full bg-white/55" />
          </div>
        </div>

        {/* Side scroll hint on the outside-right edge (desktop only) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-9 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 text-[9px] uppercase tracking-[0.32em] text-foreground/45 md:flex"
        >
          <span>滚</span>
          <span className="block h-6 w-px bg-foreground/20" />
          <span>轮</span>
        </div>
      </div>

      {/* ─── External controls below the phone (counter + arrows + Open) ─── */}
      <div className="mt-4 flex w-full items-center justify-between gap-3 px-1 text-[10px] uppercase tracking-[0.28em] text-foreground/55">
        <div className="flex items-center gap-2">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--card-accent)" }}
            />
          </span>
          <span className="tabular-nums">
            {String(activeIdx + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          <span aria-hidden className="text-foreground/25">
            ·
          </span>
          <span>抖音</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => advance(-1)}
            aria-label="Previous card · 上一张"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-foreground/15 bg-background/50 text-foreground/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/35 hover:text-foreground"
          >
            <ArrowUpIcon className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={() => advance(1)}
            aria-label="Next card · 下一张"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-foreground/15 bg-background/50 text-foreground/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/35 hover:text-foreground"
          >
            <ArrowDownIcon className="h-3 w-3" />
          </button>
        </div>
      </div>

      <a
        href={card.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group/open mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/45 bg-accent/[0.12] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/[0.2]"
      >
        <span>Open on 抖音 · 打开</span>
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover/open:translate-x-0.5"
          style={{ color: "var(--card-accent)" }}
        >
          ↗
        </span>
      </a>

      <p
        className="mt-2 text-[9px] uppercase tracking-[0.3em] text-foreground/35"
        aria-hidden
      >
        Hover · 滚轮 to swipe · 同抖音
      </p>
    </div>
  );
}
