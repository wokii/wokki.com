"use client";

import Link from "next/link";
import { SAS_WOKKI, sasWokki } from "../lib/SasWokkiNodes";
import { WOKKI_DOT_COM } from "../lib/WokkiNodes";
import SasHeader from "./sas-header";

const MAIN_SITE_URL =
  process.env.NEXT_PUBLIC_MAIN_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${WOKKI_DOT_COM}`);

const node = sasWokki;

export default function SasHome() {
  const {
    header,
    hero,
    manifesto,
    curriculum,
    arts,
    faculty,
    admissions,
    tenets,
    contact,
    footer,
  } = node;

  return (
    <main
      className="relative min-h-screen overflow-hidden text-[#e8f0ec]"
      style={{
        background:
          "radial-gradient(ellipse 100% 70% at 50% -10%, rgba(126,184,168,0.12) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 92% 60%, rgba(168,212,200,0.06) 0%, transparent 55%), radial-gradient(ellipse 50% 45% at 8% 85%, rgba(100,140,120,0.08) 0%, transparent 50%), #0a100e",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute left-1/2 top-24 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#7eb8a8]/[0.06] blur-3xl" />
        <div className="absolute -right-32 bottom-32 h-80 w-80 rounded-full bg-[#a8d4c8]/[0.04] blur-3xl" />
        <div className="absolute -left-24 top-1/2 h-64 w-64 rounded-full bg-[#5a8a78]/[0.05] blur-3xl" />
      </div>

      {/* Mist layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(232,240,236,0.03) 80px, rgba(232,240,236,0.03) 81px)",
        }}
      />

      <SasHeader
        mainSiteUrl={MAIN_SITE_URL}
        nav={header.nav}
        schoolLabel={header.schoolLabel}
        schoolSub={header.schoolSub}
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 md:px-10">
        {/* ─── HERO ─────────────────────────────────────────── */}
        <section className="relative flex min-h-screen flex-col items-center justify-center pb-24 pt-32 text-center">
          <div className="god-fade-up relative z-10 flex max-w-3xl flex-col items-center">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#7eb8a8]/80">
              {hero.eyebrow}
            </p>

            <h1 className="mt-7 text-5xl font-normal leading-[1.05] tracking-[0.12em] text-[#e8f0ec] md:text-7xl">
              {hero.titleZh}
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[0.38em] text-[#a8d4c8]/70 md:text-base">
              {hero.titleEn}
            </p>

            <p className="mt-8 text-base leading-relaxed text-[#e8f0ec]/70 md:text-lg">
              {hero.subtitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#e8f0ec]/45 md:text-[15px]">
              {hero.subtitleEn}
            </p>

            <blockquote className="mt-10 max-w-2xl border-l-2 border-[#7eb8a8]/40 pl-5 text-left text-sm leading-relaxed text-[#c4e8dc]/85 italic md:text-base">
              「{hero.brochureLine}」
            </blockquote>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <a
                href={hero.primaryCta.href}
                className="inline-flex items-center justify-center rounded-full border border-[#a8d4c8]/35 bg-[#7eb8a8]/[0.1] px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e8f0ec]/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a8d4c8]/60 hover:shadow-[0_0_32px_rgba(126,184,168,0.25)]"
              >
                {hero.primaryCta.label}
              </a>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center justify-center rounded-full border border-[#e8f0ec]/12 bg-transparent px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e8f0ec]/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a8d4c8]/40 hover:text-[#a8d4c8]"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>

          <div
            className="god-fade-up god-fade-up-delay-2 mt-16 flex items-end gap-1 opacity-60"
            aria-hidden
          >
            {[8, 14, 22, 18, 26, 20, 12, 16, 24, 10].map((h, i) => (
              <span
                key={i}
                className="block w-[2px] rounded-full bg-[#7eb8a8]/60"
                style={{
                  height: `${h}px`,
                  animation: `god-pulse-soft 3s ease-in-out ${i * 0.15}s infinite`,
                }}
              />
            ))}
          </div>
        </section>

        {/* ─── MANIFESTO ────────────────────────────────────── */}
        <section
          id="manifesto"
          className="relative border-t border-[#a8d4c8]/10 py-24"
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#7eb8a8]/75">
            {manifesto.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#e8f0ec] md:text-4xl">
            {manifesto.title}
          </h2>

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {manifesto.paragraphs.map((p, i) => (
              <div key={i} className="space-y-4">
                <p className="text-sm leading-relaxed text-[#e8f0ec]/70 md:text-base">
                  {p.zh}
                </p>
                <p className="text-sm leading-relaxed text-[#e8f0ec]/40 md:text-[15px]">
                  {p.en}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {manifesto.nameRationale.map((item) => (
              <article
                key={item.heading}
                className="rounded-2xl border border-[#a8d4c8]/12 bg-[#0d1512]/60 p-6 transition-colors hover:border-[#7eb8a8]/30"
              >
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a8d4c8]">
                  {item.heading}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#e8f0ec]/65">
                  {item.body}
                </p>
                <p className="mt-3 text-[12px] leading-relaxed text-[#e8f0ec]/38">
                  {item.bodyEn}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ─── CURRICULUM ───────────────────────────────────── */}
        <section
          id="curriculum"
          className="relative border-t border-[#a8d4c8]/10 py-24"
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#7eb8a8]/75">
            {curriculum.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#e8f0ec] md:text-4xl">
            {curriculum.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-[#e8f0ec]/45 md:text-base">
            {curriculum.subtitle}
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {curriculum.items.map((item) => (
              <article
                key={item.glyph}
                className="group rounded-2xl border border-[#a8d4c8]/10 bg-[#0d1512]/50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7eb8a8]/35 hover:bg-[#0d1512]/80"
              >
                <span className="text-4xl font-light text-[#7eb8a8]/80 transition-colors group-hover:text-[#a8d4c8]">
                  {item.glyph}
                </span>
                <h3 className="mt-4 text-base font-medium text-[#e8f0ec]/90">
                  {item.title}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#7eb8a8]/60">
                  {item.titleEn}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#e8f0ec]/60">
                  {item.body}
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-[#e8f0ec]/35">
                  {item.bodyEn}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ─── ARTS ─────────────────────────────────────────── */}
        <section
          id="arts"
          className="relative border-t border-[#a8d4c8]/10 py-24"
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#7eb8a8]/75">
            {arts.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#e8f0ec] md:text-4xl">
            {arts.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-[#e8f0ec]/45 md:text-base">
            {arts.subtitle}
          </p>

          <div className="mt-12 flex flex-col gap-4">
            {arts.items.map((art, i) => (
              <article
                key={art.name}
                className="grid gap-4 rounded-2xl border border-[#a8d4c8]/10 bg-gradient-to-r from-[#0d1512]/80 to-transparent p-6 md:grid-cols-[1fr_2fr] md:items-start md:gap-8"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[#7eb8a8]/55">
                    {String(i + 1).padStart(2, "0")} · {art.tag}
                  </span>
                  <h3 className="mt-2 text-xl font-medium text-[#e8f0ec]">
                    {art.name}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#a8d4c8]/55">
                    {art.nameEn}
                  </p>
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-[#e8f0ec]/65">
                    {art.body}
                  </p>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#e8f0ec]/38">
                    {art.bodyEn}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── FACULTY ──────────────────────────────────────── */}
        <section
          id="faculty"
          className="relative border-t border-[#a8d4c8]/10 py-24"
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#7eb8a8]/75">
            {faculty.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#e8f0ec] md:text-4xl">
            {faculty.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-[#e8f0ec]/45 md:text-base">
            {faculty.subtitle}
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {faculty.items.map((master) => (
              <article
                key={master.title}
                className="relative overflow-hidden rounded-2xl border border-[#a8d4c8]/12 bg-[#0d1512]/60 p-6"
              >
                <span
                  className="pointer-events-none absolute -right-4 -top-4 text-7xl font-light text-[#7eb8a8]/[0.07]"
                  aria-hidden
                >
                  {master.motif}
                </span>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#7eb8a8]/70">
                  {master.role}
                </p>
                <h3 className="mt-2 text-lg font-medium text-[#e8f0ec]">
                  {master.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#e8f0ec]/60">
                  {master.body}
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-[#e8f0ec]/38">
                  {master.bodyEn}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {master.lineage.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#a8d4c8]/15 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] text-[#a8d4c8]/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── ADMISSIONS ───────────────────────────────────── */}
        <section
          id="admissions"
          className="relative border-t border-[#a8d4c8]/10 py-24"
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#7eb8a8]/75">
            {admissions.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#e8f0ec] md:text-4xl">
            {admissions.title}
          </h2>
          <p className="mt-4 text-base text-[#c4e8dc]/80">
            {admissions.tagline}
          </p>
          <p className="mt-1 text-sm text-[#e8f0ec]/40">
            {admissions.taglineEn}
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              {admissions.requirements.map((req) => (
                <div
                  key={req.label}
                  className="rounded-xl border border-[#a8d4c8]/10 bg-[#0d1512]/50 p-5"
                >
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a8d4c8]">
                    {req.label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#e8f0ec]/65">
                    {req.detail}
                  </p>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#e8f0ec]/38">
                    {req.detailEn}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#7eb8a8]/25 bg-[#7eb8a8]/[0.06] p-8">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#7eb8a8]/80">
                Official Brochure · 官方简章
              </p>
              <ul className="mt-6 space-y-3">
                {admissions.brochure.map((line, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm leading-relaxed text-[#e8f0ec]/75"
                  >
                    <span className="text-[#7eb8a8]/60" aria-hidden>
                      —
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
              <ul className="mt-8 space-y-2 border-t border-[#a8d4c8]/15 pt-6">
                {admissions.brochureEn.map((line, i) => (
                  <li
                    key={i}
                    className="text-[12px] leading-relaxed text-[#e8f0ec]/38"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-[#e8f0ec]/55">
            {admissions.note}
          </p>
          <p className="mt-2 max-w-2xl text-[12px] leading-relaxed text-[#e8f0ec]/38">
            {admissions.noteEn}
          </p>
        </section>

        {/* ─── TENETS ───────────────────────────────────────── */}
        <section className="relative border-t border-[#a8d4c8]/10 py-24">
          <p className="text-[10px] uppercase tracking-[0.45em] text-[#7eb8a8]/75">
            {tenets.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#e8f0ec] md:text-4xl">
            {tenets.title}
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {tenets.items.map((tenet) => (
              <article
                key={tenet.zh}
                className="rounded-2xl border border-[#a8d4c8]/12 p-8 text-center"
              >
                <p className="text-4xl font-light tracking-[0.2em] text-[#7eb8a8]">
                  {tenet.zh}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.32em] text-[#a8d4c8]/55">
                  {tenet.en}
                </p>
                <p className="mt-6 text-sm leading-relaxed text-[#e8f0ec]/60">
                  {tenet.body}
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-[#e8f0ec]/35">
                  {tenet.bodyEn}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ─── CONTACT ──────────────────────────────────────── */}
        <section
          id="contact"
          className="relative flex min-h-[60svh] flex-col justify-center border-t border-[#a8d4c8]/10 py-24"
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#7eb8a8]/75">
                {contact.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#e8f0ec] md:text-4xl">
                {contact.title}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#e8f0ec]/60 md:text-base">
                {contact.body}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#e8f0ec]/38 md:text-[15px]">
                {contact.bodyEn}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={contact.cta.href}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[#7eb8a8]/40 bg-gradient-to-r from-[#7eb8a8]/[0.1] to-[#a8d4c8]/[0.06] px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a8d4c8]/60 hover:shadow-[0_0_40px_rgba(126,184,168,0.2)]"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#a8d4c8]/85">
                    {contact.cta.label}
                  </p>
                  <p className="mt-2 text-base font-medium text-[#e8f0ec] md:text-lg">
                    {contact.email}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="text-lg text-[#a8d4c8] transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <Link
                href={header.nav.home.href}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[#e8f0ec]/10 bg-[#0d1512]/60 px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#a8d4c8]/30"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#e8f0ec]/50">
                    返回人间 · Return
                  </p>
                  <p className="mt-2 text-base font-medium text-[#e8f0ec]/85 md:text-lg">
                    {header.nav.home.label}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="text-lg text-[#a8d4c8]/80 transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ───────────────────────────────────────── */}
        <footer className="border-t border-[#a8d4c8]/10 py-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-3xl font-light text-[#7eb8a8]/30" aria-hidden>
              逍
            </p>
            <p className="text-[10px] uppercase tracking-[0.42em] text-[#a8d4c8]/55">
              {footer.line}
            </p>
            <p className="max-w-md text-[11px] leading-relaxed text-[#e8f0ec]/35">
              {footer.sub}
            </p>
            <p className="text-[9px] uppercase tracking-[0.28em] text-[#e8f0ec]/20">
              {SAS_WOKKI}
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
