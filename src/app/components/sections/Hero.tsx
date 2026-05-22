import React from "react";
import Image from "next/image";
import Section from "./Section";
import { WOKKI_DOT_COM, Zen } from "../../lib/WokkiNodes";

// Decorative pulse-bar rhythm (mirrors the nana setlist accent).
const HERO_BARS = [12, 22, 34, 46, 30, 18, 28, 40, 24, 14];

export default function Hero() {
  const { hero } = Zen[WOKKI_DOT_COM];
  const primaryCta = hero.ctas.find((cta) => cta.variant === "primary");
  const secondaryCta = hero.ctas.find((cta) => cta.variant === "secondary");

  return (
    <Section
      id="hero"
      minHeight="svh"
      paddingY="none"
      withTopBorder={false}
      centerContent
      className="relative w-full overflow-x-clip"
      containerClassName="md:relative -mt-6 md:mt-0"
    >
      {/* Decorative aurora — sits behind the hero. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute right-[-10%] top-1/3 h-80 w-80 rounded-full bg-accent/10 blur-[140px]" />
        <div className="absolute left-1/2 bottom-12 h-56 w-56 -translate-x-1/2 rounded-full bg-foreground/5 blur-[120px]" />
      </div>

      <div className="relative grid w-full grid-cols-1 items-center gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-6">
        <div className="wokki-fade-up relative z-10 flex flex-col">
          {/* Eyebrow — bilingual, mirrors god's `天启 · The Core Teaching` */}
          <p className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.42em] text-foreground/55">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_14px_color-mix(in_srgb,var(--accent)_85%,transparent)]" />
            </span>
            <span>Wokki · 沃客</span>
            <span aria-hidden className="text-foreground/25">
              ·
            </span>
            <span className="hidden sm:inline">London · 伦敦</span>
            <span aria-hidden className="hidden text-foreground/25 sm:inline">
              ·
            </span>
            <span>21st Century</span>
          </p>

          {/* Titles — preserves the original three-line rhythm + notes. */}
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            {hero.titles.map((item, index) => {
              const isLast = index === hero.titles.length - 1;
              return (
                <React.Fragment key={item.title}>
                  <span
                    className={`block ${isLast ? "text-accent" : "text-foreground"}`}
                  >
                    {item.title}
                    <span className="ml-2 align-baseline text-[10px] md:text-base font-normal tracking-normal text-foreground/45">
                      {item.note}
                    </span>
                  </span>
                </React.Fragment>
              );
            })}
          </h1>

          {/* Tagline */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/75 md:text-xl">
            {hero.tagline}
          </p>
          <p className="mt-2 max-w-2xl text-[12px] md:text-sm uppercase tracking-[0.18em] text-foreground/40">
            「以技术之手，托举人之尊严。」
          </p>

          {/* 节奏 — decorative pulse bars (mirrors the nana hero rhythm). */}
          <div aria-hidden className="mt-7 flex items-end gap-1.5 md:mt-9">
            {HERO_BARS.map((h, i) => (
              <span
                key={i}
                className="block w-[3px] origin-bottom rounded-full"
                style={{
                  height: `${h}px`,
                  background:
                    "color-mix(in srgb, var(--accent) 70%, transparent)",
                  animation: `wokki-pulse-bar 2.4s ease-in-out ${i * 0.12}s infinite`,
                }}
              />
            ))}
          </div>

          {/* CTAs — nana-style rounded-full pills with refined hover lift. */}
          <div className="mt-8 flex max-w-xs flex-col gap-3 md:mt-10 md:max-w-none md:flex-row md:gap-4">
            {primaryCta ? (
              <a
                href={primaryCta.href}
                className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-accent/55 bg-gradient-to-r from-accent/[0.22] to-accent/[0.06] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground shadow-[0_0_30px_color-mix(in_srgb,var(--accent)_18%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_44px_color-mix(in_srgb,var(--accent)_35%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 md:w-auto md:px-7 md:text-xs"
              >
                {primaryCta.label}
                <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            ) : null}
            {secondaryCta ? (
              <a
                href={secondaryCta.href}
                className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-foreground/15 bg-background/40 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/80 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/35 hover:bg-foreground/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 md:w-auto md:px-7 md:text-xs"
              >
                {secondaryCta.label}
                <span className="text-foreground/55 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            ) : null}
          </div>

          {/* Sub-cue — mirrors god's "See the Path ↓" without breaking style */}
          <a
            href="#projects"
            className="mt-10 hidden items-center gap-2 self-start text-[10px] uppercase tracking-[0.28em] text-foreground/40 transition-colors hover:text-accent md:inline-flex"
            aria-label="Scroll to projects"
          >
            <span>Scroll · 卷</span>
            <span aria-hidden className="text-foreground/30">
              ↓
            </span>
          </a>
        </div>

        {/* Hero image — kept (preserves original element); positioned as a
            quiet accent on desktop and a small framed mark on mobile so the
            text always breathes. */}
        <div className="pointer-events-none relative z-0 mx-auto h-[260px] w-[260px] select-none sm:h-[320px] sm:w-[320px] md:h-auto md:w-auto md:justify-self-end md:translate-y-12 lg:translate-y-16">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-accent/10 blur-3xl md:hidden"
          />
          <Image
            src="/hero.png"
            alt=""
            width={560}
            height={560}
            sizes="(min-width: 1024px) 32vw, (min-width: 768px) 45vw, 75vw"
            className="h-auto w-[clamp(220px,72vw,560px)] origin-bottom-right drop-shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:w-[clamp(240px,42vw,560px)]"
            priority
            aria-hidden="true"
          />
        </div>
      </div>
    </Section>
  );
}
