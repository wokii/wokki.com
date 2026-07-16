"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NABI_WOKKI, Zen } from "../lib/WokkiNodes";
import NabiHeader from "./nabi-header";
import NabiYinYang from "./nabi-yin-yang";

const node = Zen[NABI_WOKKI];

const iconForPlatform = (platform: string) => {
  const icons: Record<string, string> = {
    instagram: "/social-media-svg/001-instagram.svg",
    x: "/social-media-svg/003-x-glyph-white.svg",
    tiktok: "/social-media-svg/005-tiktok-glyph-white.svg",
    youtube: "/social-media-svg/009-youtube.svg",
  };
  return icons[platform] ?? icons.instagram;
};

export default function NabiHome() {
  const { hero, philosophy, collections, duality, art, social, footer } = node;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main
      className="relative min-h-screen overflow-hidden text-[#f4eef8]"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 15% -10%, rgba(249,197,209,0.12) 0%, transparent 55%), radial-gradient(ellipse 90% 70% at 85% 110%, rgba(184,168,216,0.08) 0%, transparent 60%), radial-gradient(circle at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 40%), #0d0f18",
      }}
    >
      <div className="nabi-moon-glow pointer-events-none fixed -left-32 top-24 h-[420px] w-[420px] rounded-full bg-[#f9c5d1]/[0.07] blur-[100px]" />
      <div
        className="nabi-stars pointer-events-none fixed inset-0 opacity-40"
        aria-hidden
      />

      <NabiHeader />

      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-20 pt-32 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex-1">
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#f9c5d1]/55">
            {hero.moonPhase}
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-7xl lg:text-8xl">
            <span className="block text-[#f9c5d1]">{hero.titleYin}</span>
            <span className="mt-1 block text-white/95">{hero.titleBrand}</span>
          </h1>
          <p className="mt-4 text-lg tracking-wide text-white/70 md:text-xl">
            {hero.name}
            <span className="ml-3 text-sm uppercase tracking-[0.25em] text-white/35">
              {hero.nameRoman}
            </span>
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
            {hero.tagline}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/40">
            {hero.taglineZh}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-[#f9c5d1]/50 bg-[#f9c5d1]/[0.12] px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f9c5d1] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f9c5d1]/20 hover:shadow-[0_0_32px_rgba(249,197,209,0.25)]"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f9c5d1]/40 hover:text-[#f9c5d1]"
            >
              {hero.secondaryCta.label}
            </a>
          </div>

          <div className="mt-12 flex items-center gap-2" aria-hidden>
            {[8, 14, 22, 18, 26, 16, 24, 12, 20, 10].map((h, i) => (
              <span
                key={i}
                className="block w-[2px] rounded-full bg-[#f9c5d1]/50"
                style={{
                  height: `${h}px`,
                  animation: `nabi-pulse 3s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-1 flex-col items-center lg:mt-0">
          {mounted ? (
            <NabiYinYang size={280} className="lg:scale-110" />
          ) : (
            <div className="h-[280px] w-[280px]" />
          )}
          <p className="mt-8 text-center text-[10px] uppercase tracking-[0.35em] text-white/30">
            ☯ · 阴中有阳 · 阳中有阴
          </p>
        </div>
      </section>

      <section
        id="philosophy"
        className="relative mx-auto max-w-6xl px-6 py-24"
      >
        <div className="mb-12 flex flex-col gap-2">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#f9c5d1]/50">
            {philosophy.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {philosophy.title}
          </h2>
          <p className="text-lg text-[#f9c5d1]/70">{philosophy.titleZh}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-5">
            {philosophy.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed md:text-base ${
                  i === 0
                    ? "text-white/70"
                    : i === philosophy.paragraphs.length - 1
                      ? "text-white/45 italic"
                      : "text-white/55"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <ul className="flex flex-col gap-4">
            {philosophy.pillars.map((pillar) => (
              <li
                key={pillar.glyph}
                className="group rounded-2xl border border-[#f9c5d1]/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-[#f9c5d1]/25 hover:bg-[#f9c5d1]/[0.04]"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#f9c5d1]/30 bg-[#f9c5d1]/[0.08] text-lg text-[#f9c5d1]">
                    {pillar.glyph}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white/85">
                      {pillar.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/45">
                      {pillar.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="collections"
        className="relative mx-auto max-w-6xl px-6 py-24"
      >
        <div className="mb-12 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#f9c5d1]/50">
              {collections.eyebrow}
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {collections.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/50">
              {collections.description}
            </p>
          </div>
          <a
            href={collections.shopCta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex shrink-0 items-center justify-center rounded-full border border-[#f9c5d1]/40 bg-[#f9c5d1]/10 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#f9c5d1] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(249,197,209,0.2)] md:mt-0"
          >
            {collections.shopCta.label}
          </a>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {collections.items.map((item) => (
            <li
              key={item.id}
              className="group relative overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#f9c5d1]/25 hover:shadow-[0_20px_60px_rgba(249,197,209,0.08)]"
            >
              <div className="pointer-events-none absolute -right-6 -top-6 text-[7rem] font-bold leading-none text-[#f9c5d1]/[0.04] transition-colors group-hover:text-[#f9c5d1]/[0.08]">
                {item.glyph}
              </div>
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#f9c5d1]/60">
                    {item.titleZh} · {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {item.blurb}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-white/35">
                    {item.blurbZh}
                  </p>
                </div>
                {item.tag ? (
                  <span className="shrink-0 rounded-full border border-[#f9c5d1]/40 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#f9c5d1]">
                    {item.tag}
                  </span>
                ) : null}
              </div>
              {item.id === "music" ? (
                <Link
                  href="/nana"
                  className="relative mt-5 inline-flex text-[10px] uppercase tracking-[0.25em] text-[#f9c5d1]/70 transition-colors hover:text-[#f9c5d1]"
                >
                  Open setlist →
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section id="duality" className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#f9c5d1]/50">
            {duality.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {duality.title}
          </h2>
        </div>

        <div className="relative grid gap-6 md:grid-cols-2">
          <div className="nabi-yin-card rounded-3xl border border-[#f9c5d1]/20 bg-gradient-to-br from-[#f9c5d1]/[0.08] to-transparent p-8 md:p-10">
            <span className="text-4xl text-[#f9c5d1]/80">
              {duality.yin.glyph}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-[#f9c5d1]">
              {duality.yin.name}
            </h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#f9c5d1]/60">
              {duality.yin.role}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {duality.yin.traits.map((trait) => (
                <li
                  key={trait}
                  className="rounded-full border border-[#f9c5d1]/25 bg-[#f9c5d1]/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#f9c5d1]/80"
                >
                  {trait}
                </li>
              ))}
            </ul>
          </div>

          <div className="nabi-yang-card rounded-3xl border border-[#ff5f40]/20 bg-gradient-to-br from-[#ff5f40]/[0.06] to-transparent p-8 md:p-10">
            <span className="text-4xl text-[#ff5f40]/80">
              {duality.yang.glyph}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-[#ff5f40]">
              {duality.yang.name}
            </h3>
            <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[#ff5f40]/60">
              {duality.yang.role}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {duality.yang.traits.map((trait) => (
                <li
                  key={trait}
                  className="rounded-full border border-[#ff5f40]/25 bg-[#ff5f40]/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#ff5f40]/80"
                >
                  {trait}
                </li>
              ))}
            </ul>
            <Link
              href={duality.yang.link.href}
              className="mt-8 inline-flex text-[10px] uppercase tracking-[0.25em] text-[#ff5f40]/70 transition-colors hover:text-[#ff5f40]"
            >
              {duality.yang.link.label}
            </Link>
          </div>

          <div
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
            aria-hidden
          >
            {mounted ? <NabiYinYang size={72} animate={false} /> : null}
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-white/50">
          {duality.closing}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-[#f9c5d1]/50">
          {duality.closingZh}
        </p>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-3xl border border-white/8 bg-white/[0.02] p-8 md:p-12">
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#f9c5d1]/50">
            {art.eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
            {art.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50">
            {art.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {art.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/10 px-5 py-2 text-[10px] uppercase tracking-[0.25em] text-white/60 transition-all hover:border-[#f9c5d1]/40 hover:text-[#f9c5d1]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-16">
        <p className="text-center text-[10px] uppercase tracking-[0.4em] text-[#f9c5d1]/50">
          {social.eyebrow}
        </p>
        <h2 className="mt-3 text-center text-2xl font-semibold text-white">
          {social.title}
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {social.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.description}
              className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all hover:-translate-y-0.5 hover:border-[#f9c5d1]/40 hover:bg-[#f9c5d1]/10"
            >
              <Image
                src={iconForPlatform(link.platform)}
                alt=""
                width={20}
                height={20}
                className="opacity-70 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
            </a>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#f9c5d1]/10 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-[10px] uppercase tracking-[0.28em] text-white/35 md:flex-row md:items-center">
          <span>
            {footer.left}{" "}
            <Link
              href={footer.yangLink.href}
              className="text-[#ff5f40]/70 hover:text-[#ff5f40]"
            >
              {footer.yangLink.label}
            </Link>
          </span>
          <span>{footer.right}</span>
        </div>
      </footer>

      <Link
        href="/"
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#ff5f40]/30 bg-[#0d0f18]/90 text-lg text-[#ff5f40]/80 shadow-lg backdrop-blur transition-all hover:scale-105 hover:border-[#ff5f40] hover:text-[#ff5f40]"
        aria-label="Switch to Yang · Wokki.com"
        title="☯ 转至阳 · Wokki"
      >
        ☯
      </Link>
    </main>
  );
}
