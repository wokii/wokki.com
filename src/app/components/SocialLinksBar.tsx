"use client";

import React, { useMemo, useState } from "react";
import ImageModal from "./ImageModal";

type SocialLink = {
  platform: string;
  description: string;
  url: string | null;
};

/**
 * Channel meta — surfaces a handle on hover in the floating header bar.
 * Keep this in sync with `CHANNEL_META` in components/sections/About.tsx.
 */
const CHANNEL_META: Record<string, { label: string; handle: string }> = {
  github: { label: "GitHub", handle: "@wokii" },
  linkedin: { label: "LinkedIn", handle: "/in/wokki" },
  x: { label: "X", handle: "@hanwokki" },
  twitter: { label: "X", handle: "@hanwokki" },
  instagram: { label: "Instagram", handle: "@hanwokii" },
  tiktok: { label: "TikTok", handle: "@hanwokki" },
  tiktokCn: { label: "抖音", handle: "@Wokki" },
};

/**
 * Inline, theme-aware glyphs. `currentColor` lets each icon inherit the
 * surrounding text color, which keeps the bar perfectly monochrome.
 */
function PlatformGlyph({
  platform,
  className = "",
}: {
  platform: string;
  className?: string;
}) {
  switch (platform) {
    case "github":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          className={className}
        >
          <path d="M12 .5C5.4.5 0 5.9 0 12.6c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.3 1.2.9-.3 2-.4 3-.4s2.1.1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.6 1.7.2 3 .1 3.3.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.3v3.4c0 .3.2.7.8.6C20.7 22.4 24 17.9 24 12.6 24 5.9 18.6.5 12 .5z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          className={className}
        >
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.55V9h3.57v11.45zM21.78 0H2.22C1 0 0 1 0 2.22v19.55C0 23 1 24 2.22 24h19.55C23 24 24 23 24 21.78V2.22C24 1 23 0 21.78 0z" />
        </svg>
      );
    case "x":
    case "twitter":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          className={className}
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.658l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className={className}
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r="0.9"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "tiktok":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          className={className}
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V7.65a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.08z" />
        </svg>
      );
    case "tiktokCn":
      // 抖音 — same TikTok glyph mirrored, with a small CN dot in the corner
      // so it reads as the China-native sibling without dropping the family
      // resemblance.
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          className={className}
        >
          <g transform="translate(24 0) scale(-1 1)">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V7.65a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.08z" />
          </g>
          <circle cx="20.5" cy="20.5" r="2.4" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
          className={className}
        >
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

export default function SocialLinksBar({
  links,
  label = "FOLLOW",
  className = "",
  instagramImageSrc = "/instagram-image.png",
  instagramImageAlt = "Instagram image",
}: {
  links: SocialLink[];
  label?: string;
  className?: string;
  instagramImageSrc?: string;
  instagramImageAlt?: string;
}) {
  const [isInstagramModalOpen, setIsInstagramModalOpen] = useState(false);

  const normalized = useMemo(
    () =>
      links.map((l) => ({
        ...l,
        platform: String(l.platform ?? "").trim(),
        description: String(l.description ?? "").trim(),
        url: l.url ? String(l.url).trim() : null,
      })),
    [links],
  );

  const liveCount = normalized.filter((l) => Boolean(l.url)).length;

  return (
    <>
      <div className={`flex items-center justify-center gap-2.5 ${className}`}>
        {/* Eyebrow — bilingual, mirrors the rest of the homepage rhythm. */}
        {label ? (
          <span className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.36em] text-foreground/45 sm:inline-flex">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_color-mix(in_srgb,var(--accent)_60%,transparent)]" />
            </span>
            <span>{label}</span>
            <span aria-hidden className="text-foreground/25">
              ·
            </span>
            <span>关注</span>
            <span aria-hidden className="text-foreground/25">
              ·
            </span>
            <span className="text-foreground/65">{liveCount}</span>
          </span>
        ) : null}

        {/* The capsule — single hairline-divided pill. */}
        <div className="relative isolate inline-flex items-stretch overflow-hidden rounded-full border border-foreground/12 bg-background/65 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.35),inset_0_1px_0_color-mix(in_srgb,#ffffff_40%,transparent)] backdrop-blur-xl">
          {/* Soft accent sheen — sits behind the icons. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-accent/[0.07] via-transparent to-accent/[0.05]"
          />

          {normalized.map((link, index) => {
            const meta = CHANNEL_META[link.platform] ?? {
              label: link.description || link.platform,
              handle: "",
            };
            const tooltipText = meta.handle
              ? `${meta.label} · ${meta.handle}`
              : meta.label;
            const isLast = index === normalized.length - 1;
            const key = `${link.platform}-${link.description}`;

            const itemClassName =
              "group/icon relative inline-flex h-10 w-11 items-center justify-center text-foreground/65 transition-all duration-300 hover:bg-foreground/[0.06] hover:text-accent active:scale-95 focus-visible:outline-none focus-visible:bg-foreground/[0.06] focus-visible:text-accent sm:w-12";

            const glyph = (
              <PlatformGlyph
                platform={link.platform}
                className="h-[18px] w-[18px] transition-transform duration-300 group-hover/icon:scale-110 group-focus-visible/icon:scale-110"
              />
            );

            const tooltip = (
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full border border-foreground/12 bg-background/92 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/80 opacity-0 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all duration-200 group-hover/icon:opacity-100 group-hover/icon:translate-y-0 group-focus-visible/icon:opacity-100 group-focus-visible/icon:translate-y-0">
                {tooltipText}
              </span>
            );

            const divider = !isLast ? (
              <span aria-hidden className="my-2 w-px bg-foreground/12" />
            ) : null;

            // Instagram: only use modal preview when URL is missing.
            if (link.platform === "instagram" && !link.url) {
              return (
                <React.Fragment key={key}>
                  <button
                    type="button"
                    onClick={() => setIsInstagramModalOpen(true)}
                    aria-label={tooltipText}
                    className={itemClassName}
                  >
                    {glyph}
                    {tooltip}
                  </button>
                  {divider}
                </React.Fragment>
              );
            }

            if (!link.url) {
              return (
                <React.Fragment key={key}>
                  <span
                    aria-label={`${meta.label} (coming soon)`}
                    className="relative inline-flex h-10 w-11 items-center justify-center text-foreground/35 opacity-60 sm:w-12"
                  >
                    {glyph}
                  </span>
                  {divider}
                </React.Fragment>
              );
            }

            return (
              <React.Fragment key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tooltipText}
                  className={itemClassName}
                >
                  {glyph}
                  {tooltip}
                </a>
                {divider}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <ImageModal
        isOpen={isInstagramModalOpen}
        onClose={() => setIsInstagramModalOpen(false)}
        imageSrc={instagramImageSrc}
        imageAlt={instagramImageAlt}
      />
    </>
  );
}
