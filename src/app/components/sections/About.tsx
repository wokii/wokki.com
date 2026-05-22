"use client";
import React, { useState } from "react";
import Image from "next/image";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import ImageModal from "../ImageModal";
import { WOKKI_DOT_COM, Zen } from "../../lib/WokkiNodes";

const encodeMailto = (emails: string[], subject: string, body: string) =>
  `mailto:${emails.join(",")}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

/**
 * Channel metadata — keyed by `platform` from `about.contact.links`.
 * Each entry contributes the public-facing label rhythm:
 *
 *   [icon]  Platform · 中文        @handle  ↗
 *           Tagline · 副标题
 *
 * Adding a new platform: append its key here and add an icon in
 * `iconForLink` below. Missing entries fall back to gentle defaults.
 */
const CHANNEL_META: Record<
  string,
  { label: string; handle: string; tagline: string }
> = {
  github: {
    label: "GitHub",
    handle: "@wokii",
    tagline: "Open Source · 开源",
  },
  linkedin: {
    label: "LinkedIn",
    handle: "/in/wokki",
    tagline: "Lineage · 履历",
  },
  x: {
    label: "X",
    handle: "@hanwokki",
    tagline: "Thoughts · 短想",
  },
  twitter: {
    label: "X",
    handle: "@hanwokki",
    tagline: "Thoughts · 短想",
  },
  instagram: {
    label: "Instagram",
    handle: "@hanwokii",
    tagline: "Frames · 视觉",
  },
  tiktok: {
    label: "TikTok",
    handle: "@hanwokki",
    tagline: "Motion · 影",
  },
  tiktokCn: {
    label: "抖音",
    handle: "@Wokki",
    tagline: "CN TikTok · 国内",
  },
};

export default function About() {
  const { about, hero } = Zen[WOKKI_DOT_COM];
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const iconForLink = (platform: string) => {
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

  const metaFor = (platform: string, description: string) =>
    CHANNEL_META[platform] ?? {
      label: description || platform,
      handle: "",
      tagline: "Channel · 频道",
    };

  const liveCount = about.contact.links.filter((link) =>
    Boolean(link.url),
  ).length;

  return (
    <Section id="about" minHeight="screen" paddingY="md" centerContent={false}>
      <div className="relative w-full">
        {/* Section atmospherics */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <div className="absolute -left-12 top-12 h-72 w-72 rounded-full bg-foreground/5 blur-[120px]" />
          <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-accent/10 blur-[140px]" />
        </div>

        <SectionTitle
          eyebrow={<span>About · 关于 · The Builder Behind the Light</span>}
          subtitle="A short letter — and the channels through which it reaches the world."
        >
          ABOUT
        </SectionTitle>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.2fr_0.8fr] md:gap-10">
          {/* Manifesto — the bio paragraph, kept intact. */}
          <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/65 p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-foreground/5 blur-[90px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 top-10 h-40 w-40 rounded-full bg-accent/10 blur-[80px]"
            />

            <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/45">
              Manifesto · 自述
            </p>

            <p className="mt-5 text-lg leading-relaxed text-foreground/90 md:text-2xl">
              I&apos;m a{" "}
              {hero.titles.map((item, index) => (
                <React.Fragment key={item.title}>
                  <span className="font-semibold text-accent">
                    {item.title}
                  </span>
                  {index < hero.titles.length - 2 && ", "}
                  {index === hero.titles.length - 2 && " and "}
                  {index === hero.titles.length - 1 && " "}
                </React.Fragment>
              ))}
              {about.introSuffix}
            </p>
            <p className="mt-5 text-base leading-relaxed text-foreground/65 md:text-lg">
              {about.summary}
            </p>
          </div>

          {/* Contact card */}
          <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/65 p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-[70px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 bottom-16 h-44 w-44 rounded-full bg-foreground/5 blur-[80px]"
            />

            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/45">
                Wokki.com · 信号
              </p>
              <span className="text-[10px] uppercase tracking-[0.35em] text-foreground/40">
                Contact
              </span>
            </div>

            <p className="mt-4 text-2xl font-semibold text-foreground/90 md:text-3xl">
              Han Wokki
              <span className="ml-2 text-sm font-normal tracking-[0.18em] text-foreground/40">
                · 沃客
              </span>
            </p>

            <div className="mt-5 space-y-3 text-sm text-foreground/70 md:text-base">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/50">
                  Phone · 电话
                </span>
                <span className="font-medium text-foreground/80">
                  +(44) blurred_number
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/50">
                  Email · 信
                </span>
                <a
                  href={encodeMailto(
                    about.contact.emails,
                    "",
                    `Hi,

I'm [name] from [company], [brief situation description]. We're looking for help with [one-line problem]. I agree in principle that the starting rate for Wokki Consultancy is £1,111 per hour.

Objective: [desired outcome]
Timeline: [rough timing, deadline]
Budget: [total budget]

Thanks,
[name]
`,
                  )}
                  className="break-all font-medium text-foreground/80 underline-offset-2 transition-colors duration-200 hover:text-accent hover:underline"
                >
                  {about.contact.emails.join(", ")}
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 pt-5">
              <span className="text-[10px] uppercase tracking-[0.28em] text-foreground/45">
                Tipping welcome · 道谢
              </span>
              <a
                href="https://pay.wokki.com/b/28E00kdgndll8eJdsc3Je03"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full border border-accent/45 bg-gradient-to-r from-accent/[0.18] to-accent/[0.05] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-accent shadow-[0_0_22px_color-mix(in_srgb,var(--accent)_22%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_36px_color-mix(in_srgb,var(--accent)_38%,transparent)]"
              >
                Wokki&apos;s Lunch
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* ─── Channels · 频道 ────────────────────────────────────── */}
        <div className="relative mt-6 overflow-hidden rounded-3xl border border-foreground/10 bg-background/55 p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] backdrop-blur-xl md:mt-10 md:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 blur-[110px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-foreground/5 blur-[110px]"
          />

          <div className="relative flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/45">
                Channels · 频道 · Where Signal Lives
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                The frequencies I broadcast on
                <span className="ml-2 text-sm font-normal tracking-[0.18em] text-foreground/40">
                  · 在何处相遇
                </span>
              </h3>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-foreground/10 bg-background/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-foreground/55 backdrop-blur">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent/50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_color-mix(in_srgb,var(--accent)_60%,transparent)]" />
              </span>
              <span className="text-foreground/65">{liveCount}</span>
              <span>live</span>
            </div>
          </div>

          <ul className="relative mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {about.contact.links.map((link, index) => {
              const meta = metaFor(link.platform, link.description);
              const number = String(index + 1).padStart(2, "0");
              const isInstagramFallback =
                link.platform === "instagram" && !link.url;
              const isMissing = !link.url && !isInstagramFallback;

              const iconNode = (
                <Image
                  src={iconForLink(link.platform)}
                  alt=""
                  width={20}
                  height={20}
                  className="social-icon h-5 w-5 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
              );

              const inner = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-foreground/12 bg-foreground/[0.04] transition-all duration-300 group-hover:border-accent/35 group-hover:bg-accent/[0.08]">
                    {iconNode}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-[10px] uppercase tracking-[0.22em] text-foreground/40">
                        {number}
                      </span>
                      <span className="text-sm font-semibold text-foreground/90">
                        {meta.label}
                      </span>
                      {meta.handle ? (
                        <span className="truncate font-mono text-[11px] tracking-[0.02em] text-foreground/55">
                          {meta.handle}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 truncate text-[10px] uppercase tracking-[0.26em] text-foreground/45">
                      {meta.tagline}
                    </p>
                  </div>
                  {isMissing ? (
                    <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground/35">
                      Soon · 待
                    </span>
                  ) : (
                    <span
                      aria-hidden
                      className="shrink-0 text-[15px] text-foreground/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
                    >
                      ↗
                    </span>
                  )}
                </>
              );

              const baseClasses =
                "group relative flex items-center gap-4 rounded-2xl border border-foreground/10 bg-background/55 px-4 py-3.5 backdrop-blur-xl transition-all duration-300";
              const interactiveClasses =
                "hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-background/75 hover:shadow-[0_18px_50px_-32px_rgba(0,0,0,0.45)]";
              const disabledClasses = "opacity-55 cursor-not-allowed";

              if (isInstagramFallback) {
                return (
                  <li
                    key={`${link.platform}-${link.description}`}
                    className="list-none"
                  >
                    <button
                      type="button"
                      onClick={() => setIsImageModalOpen(true)}
                      aria-label={`${link.platform}: ${link.description}`}
                      className={[
                        baseClasses,
                        interactiveClasses,
                        "w-full text-left",
                      ].join(" ")}
                    >
                      {inner}
                    </button>
                  </li>
                );
              }

              if (isMissing) {
                return (
                  <li
                    key={`${link.platform}-${link.description}`}
                    className="list-none"
                  >
                    <div
                      aria-label={`${link.platform} (coming soon)`}
                      className={[baseClasses, disabledClasses].join(" ")}
                    >
                      {inner}
                    </div>
                  </li>
                );
              }

              return (
                <li key={link.url} className="list-none">
                  <a
                    href={link.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${meta.label} · ${meta.handle}`}
                    className={[baseClasses, interactiveClasses].join(" ")}
                  >
                    {inner}
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="relative mt-5 text-[10px] uppercase tracking-[0.26em] text-foreground/40">
            Same person · 同一人 · different rooms.
          </p>
        </div>
      </div>

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageSrc="/instagram-image.png"
        imageAlt="Instagram image"
      />
    </Section>
  );
}
