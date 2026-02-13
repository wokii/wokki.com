"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";
import { useTheme } from "../theme-provider";

type SocialLink = {
  platform: string;
  description: string;
  url: string | null;
};

const iconForPlatform = (platform: string, resolvedTheme: "light" | "dark") => {
  const glyphThemeSuffix = resolvedTheme === "dark" ? "white" : "black";
  const icons: Record<string, string> = {
    github: "/social-media-svg/004-github.svg",
    linkedin: "/social-media-svg/002-linkedin.svg",
    x: "/social-media-svg/003-twitter.svg",
    twitter: "/social-media-svg/003-twitter.svg",
    instagram: "/social-media-svg/001-instagram.svg",
    tiktok: "/social-media-svg/005-tik-tok.svg",
    tiktokCn: "/social-media-svg/006-tik-tok-1.svg",
    gmail: "/social-media-svg/007-gmail.svg",
    youtube: "/social-media-svg/009-youtube.svg",
  };

  if (platform === "github") {
    return `/social-media-svg/004-github-glyph-${glyphThemeSuffix}.svg`;
  }
  if (platform === "x" || platform === "twitter") {
    return `/social-media-svg/003-x-glyph-${glyphThemeSuffix}.svg`;
  }
  if (platform === "tiktok") {
    return `/social-media-svg/005-tiktok-glyph-${glyphThemeSuffix}.svg`;
  }

  return icons[platform] ?? icons.instagram;
};

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
  const { resolvedTheme } = useTheme();

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

  return (
    <>
      <div className={`flex items-center gap-2 ${className}`}>
        {label ? (
          <span className="text-[11px] uppercase tracking-[0.32em] text-foreground/45">
            {label}
          </span>
        ) : null}

        <div className="liquid-glass relative isolate flex max-w-full items-center gap-1 rounded-full p-1.5">
          {normalized.map((link) => {
            const iconSrc = iconForPlatform(link.platform, resolvedTheme);
            const key = `${link.platform}-${link.description}`;
            const itemClassName =
              "liquid-glass-item group/icon relative inline-flex h-11 w-11 items-center justify-center rounded-full active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

            const icon = (
              <Image
                src={iconSrc}
                alt=""
                width={20}
                height={20}
                className="liquid-glass-icon social-icon h-5 w-5 opacity-90 transition-opacity duration-300 group-hover/icon:opacity-100 group-focus-visible/icon:opacity-100"
                aria-hidden="true"
              />
            );

            const tooltip = (
              <span className="liquid-glass-tooltip pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] tracking-[0.12em] text-foreground/70 opacity-0 transition-all duration-200 group-hover/icon:opacity-100 group-hover/icon:translate-y-0 group-focus-visible/icon:opacity-100 group-focus-visible/icon:translate-y-0">
                {link.description || link.platform}
              </span>
            );

            // Instagram: only use modal preview when URL is missing.
            if (link.platform === "instagram" && !link.url) {
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setIsInstagramModalOpen(true)}
                  aria-label={`${link.platform}: ${link.description}`}
                  className={itemClassName}
                >
                  {tooltip}
                  {icon}
                </button>
              );
            }

            if (!link.url) {
              return (
                <span
                  key={key}
                  aria-label={`${link.platform} (coming soon)`}
                  className="liquid-glass-item relative inline-flex h-11 w-11 items-center justify-center rounded-full opacity-30"
                >
                  {icon}
                </span>
              );
            }

            return (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.platform}: ${link.description}`}
                className={itemClassName}
              >
                {tooltip}
                {icon}
              </a>
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
