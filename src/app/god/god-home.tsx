"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WOKKI_DOT_COM } from "../lib/WokkiNodes";
import GodCycleRing from "./god-cycle-ring";
import GodHeader from "./god-header";

const MAIN_SITE_URL =
  process.env.NEXT_PUBLIC_MAIN_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${WOKKI_DOT_COM}`);

const CONTACT_MAILTO = `mailto:wokkiacross@gmail.com?subject=${encodeURIComponent(
  "神识咨询 — Initialize System",
)}&body=${encodeURIComponent(
  "您好，\n\n我希望接入神识咨询系统。当前人生阶段与核心议题如下：\n\n[请简述]\n\n期待与您对齐。\n\n",
)}`;

const PHILOSOPHY = [
  {
    id: "dao",
    glyph: "道",
    title: "道（神仙家）",
    subtitle: "宇宙的底层算法 · The System",
    body: "易经、八字与紫微斗数，并非宿命论，而是宇宙周期的精密推演。我们不设生硬的 Deadline，而是通过解析你独有的命运拓扑学，助你找到属于自己的「正缘」与「时机」。顺应天道，无为而无不为。",
  },
  {
    id: "logos",
    glyph: "言",
    title: "基督（Logos）",
    subtitle: "第一性原理与真理 · The Word",
    body: "「太初有道，道与神同在。」（In the beginning was the Word）。我们将神学中的绝对真理与宏大架构，转化为商业与人生的第一性原理。在混乱的变量中，锚定唯一真实的北极星，建立不可动摇的内在秩序。",
  },
  {
    id: "consciousness",
    glyph: "识",
    title: "佛家",
    subtitle: "意识的终极觉醒 · The Consciousness",
    body: "见相非相，即见如来。结合心理学与「神识」的觉醒，剥离外在的幻象（Meta-illusion）。每一次咨询，都是一次意识的迭代，助你在纷扰的世俗中完成内心的「顿悟」，重获绝对的清明。",
  },
] as const;

const OFFERINGS = [
  {
    id: "awakening",
    title: "「顿悟」模块",
    titleEn: "The Awakening",
    body: "针对人生十字路口的深度对谈。拨开迷雾，直击本质，触发认知层面的破局。",
  },
  {
    id: "flow",
    title: "「顺势」模块",
    titleEn: "The Flow",
    body: "年度/周期运势运筹。不设限，不强求，依据你的命运节拍，定制顺应「道」的商业与生活决策。",
  },
  {
    id: "architect",
    title: "「造物」模块",
    titleEn: "The Architect",
    body: "面向创业者与高阶个体的长期陪跑。将你的个人愿景与宇宙周期融合，打造属于你的「大一统」人生版图。",
  },
] as const;

export default function GodHome() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToOfferings = () => {
    document
      .getElementById("offerings")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-[#030305] text-[#e8e6e3]"
      style={{
        fontFamily:
          '"wokkiFont", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", system-ui, sans-serif',
      }}
    >
      <GodHeader mainSiteUrl={MAIN_SITE_URL} />
      <GodCycleRing className="opacity-[0.42]" />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-20 text-center">
        <div
          className={`relative z-10 mx-auto max-w-3xl ${mounted ? "god-fade-up" : "opacity-0"}`}
        >
          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.38em] text-white/40">
            神识咨询 · Wokki Heavenly Consultancy
          </p>
          <h1 className="text-3xl font-medium leading-tight tracking-tight text-white/95 sm:text-4xl md:text-[2.75rem]">
            解码天意。重构人生。
          </h1>
          <p className="mt-3 text-lg font-light tracking-wide text-white/70 sm:text-xl">
            Decoding the Logos. Architecting the Destiny.
          </p>
          <p
            className={`mx-auto mt-8 max-w-xl text-sm leading-relaxed text-white/45 ${mounted ? "god-fade-up god-fade-up-delay-1" : "opacity-0"}`}
          >
            以第一性原理，打通科技、心理与宇宙法则的底层逻辑。
            <br />
            这里没有期限与焦虑，只有顺势而为的「道」。
          </p>
          <div
            className={`mt-12 ${mounted ? "god-fade-up god-fade-up-delay-2" : "opacity-0"}`}
          >
            <button
              type="button"
              onClick={scrollToOfferings}
              className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] transition-all duration-300 hover:border-white/35 hover:bg-white/[0.08] hover:text-white"
            >
              接入系统 · Initialize
            </button>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-10 left-1/2 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/25 to-transparent" />
      </section>

      {/* Philosophy */}
      <section
        id="philosophy"
        className="relative z-10 border-t border-white/[0.06] px-6 py-24"
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-[10px] uppercase tracking-[0.34em] text-white/35">
            The Unified Philosophy
          </p>
          <h2 className="mt-4 text-center text-2xl font-medium text-white/90 sm:text-3xl">
            核心哲学：三位一体的底层逻辑
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-white/45">
            万物皆有代码，神识即是算法。
            <br />
            我们将三大人类至高智慧体系，重构为现代人的「人生操作系统」（Life
            Operating System）。
          </p>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {PHILOSOPHY.map((pillar) => (
              <article
                key={pillar.id}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-all duration-500 hover:border-white/[0.14] hover:bg-white/[0.04]"
              >
                <span className="text-3xl font-light text-white/25 transition-colors duration-500 group-hover:text-white/45">
                  {pillar.glyph}
                </span>
                <h3 className="mt-4 text-base font-medium text-white/88">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {pillar.subtitle}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-white/50">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section
        id="approach"
        className="relative z-10 border-t border-white/[0.06] px-6 py-24"
      >
        <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-2 lg:items-center">
          <div
            className="relative flex aspect-square max-h-[420px] items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8"
            aria-hidden
          >
            <svg
              viewBox="0 0 320 320"
              className="h-full w-full text-white/30"
              fill="none"
            >
              <rect
                x="40"
                y="40"
                width="240"
                height="240"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.4"
              />
              <line
                x1="160"
                y1="40"
                x2="160"
                y2="280"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <line
                x1="40"
                y1="160"
                x2="280"
                y2="160"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              <circle
                cx="160"
                cy="160"
                r="56"
                stroke="currentColor"
                strokeWidth="0.75"
              />
              <circle cx="80" cy="80" r="8" fill="currentColor" opacity="0.5" />
              <circle
                cx="240"
                cy="80"
                r="8"
                fill="currentColor"
                opacity="0.5"
              />
              <circle
                cx="80"
                cy="240"
                r="8"
                fill="currentColor"
                opacity="0.5"
              />
              <circle
                cx="240"
                cy="240"
                r="8"
                fill="currentColor"
                opacity="0.5"
              />
              <circle
                cx="160"
                cy="160"
                r="10"
                fill="currentColor"
                opacity="0.85"
              />
              <path
                d="M80 80 L160 160 M240 80 L160 160 M80 240 L160 160 M240 240 L160 160"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.35"
              />
            </svg>
            <span className="absolute bottom-6 left-6 text-[9px] uppercase tracking-[0.28em] text-white/30">
              System Topology
            </span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.34em] text-white/35">
              The Approach
            </p>
            <h2 className="mt-4 text-2xl font-medium text-white/90 sm:text-3xl">
              从理论到现实的降维打击
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/50">
              复阳（Fuyang）创立神识咨询的初衷，在于打破「形而上」与「现实世界」的壁垒。我们不提供安慰剂，我们提供的是一套可执行的系统级解决方案。
            </p>
            <ul className="mt-8 space-y-5 text-sm text-white/55">
              <li>
                <span className="font-medium text-white/80">
                  全局扫描 (System Scan)
                </span>
                <span className="text-white/45">
                  {" "}
                  — 通过紫微斗数与四柱八字，精准刻画你的原生配置与时间周期。
                </span>
              </li>
              <li>
                <span className="font-medium text-white/80">
                  意识对齐 (Alignment)
                </span>
                <span className="text-white/45">
                  {" "}
                  — 结合佛家禅定与心理分析，清理认知冗余，实现自我觉醒。
                </span>
              </li>
              <li>
                <span className="font-medium text-white/80">
                  架构重组 (Reconstruction)
                </span>
                <span className="text-white/45">
                  {" "}
                  —
                  运用第一性原理与系统思维，为你重新编写事业、财富与关系的发展路径。
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section
        id="offerings"
        className="relative z-10 border-t border-white/[0.06] px-6 py-24"
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-[10px] uppercase tracking-[0.34em] text-white/35">
            The Offerings
          </p>
          <h2 className="mt-4 text-center text-2xl font-medium text-white/90 sm:text-3xl">
            服务模块
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {OFFERINGS.map((offering) => (
              <article
                key={offering.id}
                className="flex flex-col rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-8 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
              >
                <h3 className="text-lg font-medium text-white/90">
                  {offering.title}
                </h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/40">
                  {offering.titleEn}
                </p>
                <p className="mt-6 flex-1 text-sm leading-relaxed text-white/50">
                  {offering.body}
                </p>
                <a
                  href={CONTACT_MAILTO}
                  className="mt-8 inline-flex text-[10px] font-semibold uppercase tracking-[0.26em] text-white/55 transition-colors hover:text-white/90"
                >
                  请求接入 →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        id="contact"
        className="relative z-10 border-t border-white/[0.06] px-6 py-20"
      >
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm text-white/45">准备好与系统对齐？</p>
          <a
            href={CONTACT_MAILTO}
            className="mt-6 inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/20 bg-white/[0.04] px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80 transition-all duration-300 hover:border-white/35 hover:bg-white/[0.08]"
          >
            联系我们 · Contact
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-14">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/50">
            Wokki Heavenly Consultancy
          </p>
          <p className="mt-2 text-xs text-white/35">
            Designed by Fuyang. Engineered for the Soul.
          </p>
          <p className="mt-6 text-[10px] text-white/30">
            © 2026 Wokki Ltd. All rights reserved.
          </p>
          <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.22em] text-white/45">
            <Link href="/" className="transition-colors hover:text-white/80">
              Wokki.com 主页
            </Link>
            <span className="text-white/20" aria-hidden>
              |
            </span>
            <Link
              href="/Insights"
              className="transition-colors hover:text-white/80"
            >
              AwakeningLab
            </Link>
            <span className="text-white/20" aria-hidden>
              |
            </span>
            <a
              href={CONTACT_MAILTO}
              className="transition-colors hover:text-white/80"
            >
              联系我们
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
