"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";

type SocialLink = {
  platform: string;
  description: string;
  url: string | null;
};

const iconForPlatform = (platform: string) => {
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

        <div className="relative isolate flex max-w-full items-center gap-1 rounded-full border border-foreground/10 bg-background/50 p-1.5 shadow-[0_22px_70px_rgba(0,0,0,0.10)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-b before:from-white/70 before:to-transparent before:opacity-50 after:pointer-events-none after:absolute after:inset-[1px] after:rounded-full after:border after:border-white/25">
          {normalized.map((link) => {
            const iconSrc = iconForPlatform(link.platform);
            const key = `${link.platform}-${link.description}`;
            const itemClassName =
              "group/icon relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 bg-background/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_26px_rgba(0,0,0,0.08)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-background/90 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_16px_40px_rgba(0,0,0,0.12)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

            const icon = (
              <Image
                src={iconSrc}
                alt=""
                width={18}
                height={18}
                className="social-icon h-4 w-4 opacity-80 transition-opacity duration-300 group-hover/icon:opacity-100 group-focus-visible/icon:opacity-100"
                aria-hidden="true"
              />
            );

            const tooltip = (
              <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-foreground/10 bg-background/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.32em] text-foreground/70 opacity-0 shadow-[0_14px_50px_rgba(0,0,0,0.12)] backdrop-blur transition-all duration-200 group-hover/icon:opacity-100 group-focus-visible/icon:opacity-100">
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
                  className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/10 bg-background/60 opacity-30 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_24px_rgba(0,0,0,0.06)] backdrop-blur"
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
