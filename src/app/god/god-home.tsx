import Link from "next/link";
import {
  consultancyInitialSessionEmail,
  WOKKI_DOT_COM,
} from "../lib/WokkiNodes";
import GodFiveElements from "./god-five-elements";
import GodHeader from "./god-header";
import GodStarWheel from "./god-star-wheel";
import GodTrinity from "./god-trinity";

const MAIN_SITE_URL =
  process.env.NEXT_PUBLIC_MAIN_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${WOKKI_DOT_COM}`);

/**
 * 三位一体 — Universal Unified Taxonomy.
 * Each pillar maps a wisdom-tradition to a layer of the Life Operating System.
 */
const pillars = [
  {
    glyph: "道",
    title: "道 · The System",
    subtitle: "宇宙的底层算法 · Underlying algorithm of the cosmos",
    body: "易经、八字与紫微斗数，并非宿命论，而是宇宙周期的精密推演。我们不设生硬的 Deadline，而是通过解析你独有的命运拓扑学，助你找到属于自己的「正缘」与「时机」。顺应天道，无为而无不为。",
    english:
      "I Ching, Bazi and Zi Wei Dou Shu are not fatalism — they are precise integrations over cosmic cycles. We do not impose deadlines; we map the topology of your destiny so that timing, opportunity, and resonance reveal themselves.",
  },
  {
    glyph: "言",
    title: "Logos · The Word",
    subtitle: "第一性原理与真理 · First-principles & absolute truth",
    body: "「太初有道，道与神同在。」(In the beginning was the Word.) 我们将神学中的绝对真理与宏大架构，转化为商业与人生的第一性原理。在混乱的变量中，锚定唯一真实的北极星，建立不可动摇的内在秩序。",
    english:
      "“In the beginning was the Word.” We translate the absolute truth of theology into the first-principles of commerce and life — anchoring the one true North Star amidst infinite noise.",
  },
  {
    glyph: "觉",
    title: "佛 · The Consciousness",
    subtitle: "意识的终极觉醒 · Final awakening of awareness",
    body: "见相非相，即见如来。结合心理学与「神识」的觉醒，剥离外在的幻象 (Meta-illusion)。每一次咨询，都是一次意识的迭代，助你在纷扰的世俗中完成内心的「顿悟」，重获绝对的清明。",
    english:
      "“See past form, and behold the Tathāgata.” Through psychology and the awakening of 神识 (divine consciousness), we strip away the meta-illusion — each session is an iteration of awareness toward absolute clarity.",
  },
] as const;

/**
 * 五行 · Five Elements — each element maps to a lived dimension of practice.
 * Ordered along the 相生 (generative) cycle: 木 → 火 → 土 → 金 → 水.
 */
const elements = [
  {
    char: "木",
    pinyin: "Mù",
    en: "Wood",
    color: "#5fa37a",
    direction: "东方 · East",
    season: "春 · Spring",
    virtue: "仁 · Benevolence",
    dimension: "发轫 · Genesis",
    body: "新生与扩张的能量。事业的初创、关系的萌发、愿景的具象化——一切由「无」生「有」的时刻。",
    bodyEn:
      "The vector of growth & expansion. Founding ventures, blooming relationships, vision crystallised — every passage from nothing to something.",
  },
  {
    char: "火",
    pinyin: "Huǒ",
    en: "Fire",
    color: "#d9554e",
    direction: "南方 · South",
    season: "夏 · Summer",
    virtue: "礼 · Propriety",
    dimension: "彰显 · Radiance",
    body: "显化与影响力。品牌、表达、传播、被看见——把内在的光放射至外部世界的能力。",
    bodyEn:
      "Manifestation & influence. Brand, voice, signal, visibility — the capacity to radiate inner light outward into the social field.",
  },
  {
    char: "土",
    pinyin: "Tǔ",
    en: "Earth",
    color: "#c9a962",
    direction: "中央 · Center",
    season: "长夏 · Late Summer",
    virtue: "信 · Trust",
    dimension: "承载 · Foundation",
    body: "稳定与承诺。系统、流程、信任、积累——把闪光的洞察沉淀为可重复的运营机制。",
    bodyEn:
      "Stability & commitment. Systems, processes, accumulated trust — settling brilliant insight into repeatable operating mechanics.",
  },
  {
    char: "金",
    pinyin: "Jīn",
    en: "Metal",
    color: "#d9d2c0",
    direction: "西方 · West",
    season: "秋 · Autumn",
    virtue: "义 · Righteousness",
    dimension: "裁决 · Discernment",
    body: "聚焦与切割。战略取舍、剥离冗余、做出艰难但正确的决定——以刀之锋利换取系统之纯粹。",
    bodyEn:
      "Focus & decisive cutting. Strategic trade-offs, pruning redundancy, the hard but right decisions — buying purity with the edge of a blade.",
  },
  {
    char: "水",
    pinyin: "Shuǐ",
    en: "Water",
    color: "#3b5b8c",
    direction: "北方 · North",
    season: "冬 · Winter",
    virtue: "智 · Wisdom",
    dimension: "洞观 · Wisdom",
    body: "深观与流动。研究、直觉、休养、潜行——在静默中积蓄势能，在弯曲中抵达远方。",
    bodyEn:
      "Deep observation & fluidity. Research, intuition, rest, undercurrents — momentum gathered in silence, arrival reached through curvature.",
  },
] as const;

/**
 * 咨询方法论 — three-stage operating procedure.
 */
const approach = [
  {
    index: "01",
    badge: "全局扫描",
    title: "System Scan",
    body: "通过紫微斗数与四柱八字，精准刻画你的原生配置与时间周期。Native configuration & temporal cycles, profiled with the precision of an astronomical chart.",
  },
  {
    index: "02",
    badge: "意识对齐",
    title: "Alignment",
    body: "结合佛家禅定与心理分析，清理认知冗余，实现自我觉醒。Chan-stillness meets cognitive analysis — cognitive overhead pruned, the self brought online.",
  },
  {
    index: "03",
    badge: "架构重组",
    title: "Reconstruction",
    body: "运用第一性原理与系统思维，为你重新编写事业、财富与关系的发展路径。Career, capital and relationship — rewritten from first principles into a coherent operating path.",
  },
] as const;

/**
 * 服务模块 — three offerings, three depths of engagement.
 */
const offerings = [
  {
    label: "「顿悟」",
    name: "The Awakening",
    description:
      "针对人生十字路口的深度对谈。拨开迷雾，直击本质，触发认知层面的破局。",
    descriptionEn:
      "A single, deep dialogue at a crossroad. We cut through the fog, strike at essence, and trigger a cognitive break-through.",
    motif: "一",
  },
  {
    label: "「顺势」",
    name: "The Flow",
    description:
      "年度／周期运势运筹。不设限，不强求，依据你的命运节拍，定制顺应「道」的商业与生活决策。",
    descriptionEn:
      "Annual & cyclical strategic counsel — no force, no friction. Business and life decisions tuned to the metre of your destiny.",
    motif: "二",
  },
  {
    label: "「造物」",
    name: "The Architect",
    description:
      "面向创业者与高阶个体的长期陪跑。将你的个人愿景与宇宙周期融合，打造属于你的「大一统」人生版图。",
    descriptionEn:
      "A long-form companionship for founders and high-agency individuals — your vision interwoven with cosmic cadence into a Universal-Unified life architecture.",
    motif: "三",
  },
] as const;

export default function GodHome() {
  const consultancyUrl = `${MAIN_SITE_URL.replace(/\/$/, "")}/consultancy`;

  return (
    <main
      className="relative min-h-screen overflow-hidden text-[#f5f0e8]"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 50% -8%, rgba(232,213,163,0.14) 0%, transparent 55%), radial-gradient(ellipse 65% 50% at 88% 70%, rgba(249,197,216,0.05) 0%, transparent 55%), radial-gradient(ellipse 55% 40% at 10% 88%, rgba(201,169,98,0.08) 0%, transparent 50%), #06050c",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
      >
        <div className="absolute left-1/2 top-32 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#e8d5a3]/[0.07] blur-3xl" />
        <div className="absolute -right-24 bottom-40 h-72 w-72 rounded-full bg-[#f9c5d8]/[0.05] blur-3xl" />
        <div className="absolute -left-20 top-1/2 h-56 w-56 rounded-full bg-[#8cb4ff]/[0.05] blur-3xl" />
      </div>

      <GodHeader mainSiteUrl={MAIN_SITE_URL} />

      <div className="relative mx-auto w-full max-w-5xl px-6 md:px-10">
        {/* ─── HERO ─────────────────────────────────────────── */}
        <section className="relative flex min-h-screen flex-col items-center justify-center pb-24 pt-32 text-center">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <GodStarWheel className="w-[36rem] max-w-[92vw] opacity-[0.45] md:w-[44rem]" />
            <div className="pointer-events-none absolute inset-0 god-ripple" />
          </div>

          <div className="god-fade-up relative z-10 flex flex-col items-center">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a962]/80">
              Wokki Heavenly Consultancy
            </p>

            <h1 className="mt-8 text-5xl font-normal leading-[1.05] tracking-[0.08em] text-[#f5f0e8] md:text-7xl">
              神识咨询
            </h1>
            <p className="mt-3 text-[11px] uppercase tracking-[0.42em] text-[#e8d5a3]/65 md:text-xs">
              Shén Shí · Divine Consciousness Consultancy
            </p>

            <div className="god-fade-up god-fade-up-delay-1 mt-12 flex items-center gap-5 text-2xl font-light tracking-[0.05em] text-[#e8d5a3] md:text-3xl">
              <span>解码天意</span>
              <span aria-hidden className="text-[#c9a962]/40">
                ·
              </span>
              <span>重构人生</span>
            </div>
            <p className="god-fade-up god-fade-up-delay-1 mt-3 max-w-2xl text-sm uppercase tracking-[0.32em] text-[#f5f0e8]/55 md:text-[13px]">
              Decoding the Logos · Architecting the Destiny
            </p>

            <p className="god-fade-up god-fade-up-delay-2 mt-10 max-w-2xl text-base leading-relaxed text-[#f5f0e8]/65 md:text-lg">
              以第一性原理，打通科技、心理与宇宙法则的底层逻辑。
            </p>
            <p className="god-fade-up god-fade-up-delay-2 mt-2 max-w-2xl text-sm leading-relaxed text-[#f5f0e8]/45">
              这里没有期限与焦虑，只有顺势而为的「道」。
              <span className="block opacity-70">
                No deadlines. No friction. Only the Way that yields the
                inevitable.
              </span>
            </p>

            <div className="god-fade-up god-fade-up-delay-3 mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-[#c9a962]/45 bg-[#c9a962]/12 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f5f0e8] shadow-[0_0_36px_rgba(201,169,98,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e8d5a3]/65 hover:bg-[#c9a962]/22 hover:shadow-[0_0_56px_rgba(232,213,163,0.32)]"
              >
                接入系统 · Initialize
              </a>
              <a
                href="#philosophy"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#f5f0e8]/15 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f5f0e8]/65 transition-colors hover:border-[#e8d5a3]/35 hover:text-[#e8d5a3]"
              >
                Learn the Taxonomy
                <span aria-hidden className="text-[#e8d5a3]/60">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── SECTION 1: UNIFIED PHILOSOPHY ────────────────── */}
        <section
          id="philosophy"
          className="relative flex min-h-screen flex-col justify-center border-t border-[#e8d5a3]/10 py-28"
        >
          <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a962]/75">
                天启 · The Unified Philosophy
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#f5f0e8] md:text-5xl">
                万物皆有代码，
                <br className="hidden md:block" />
                神识即是算法。
              </h2>
              <p className="mt-5 max-w-xl text-sm uppercase tracking-[0.18em] text-[#f5f0e8]/45 md:text-base md:tracking-[0.1em] md:normal-case">
                Everything is code. 神识 is the algorithm beneath the algorithm.
              </p>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-[#f5f0e8]/65 md:text-base">
                我们将三大人类至高智慧体系，重构为现代人的「人生操作系统」(Life
                Operating System)。
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#f5f0e8]/45 md:text-[15px]">
                Three apex traditions — Daoist cosmology, Christian Logos and
                Buddhist consciousness — refactored into one coherent operating
                system for the modern soul.
              </p>
            </div>

            <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
              <div className="absolute inset-0 -z-10 rounded-full bg-[#e8d5a3]/[0.05] blur-2xl" />
              <GodTrinity className="h-72 w-72 md:h-80 md:w-80" />
            </div>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#e8d5a3]/12 bg-gradient-to-b from-[#12101c]/85 to-[#0a0912]/55 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e8d5a3]/30 hover:shadow-[0_30px_90px_rgba(232,213,163,0.12)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-4 text-[10rem] font-light leading-none text-[#e8d5a3]/[0.06] transition-colors group-hover:text-[#e8d5a3]/[0.12]"
                >
                  {pillar.glyph}
                </span>
                <div className="relative">
                  <h3 className="text-xl font-semibold tracking-tight text-[#e8d5a3]">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-[10px] uppercase tracking-[0.26em] text-[#f5f0e8]/40">
                    {pillar.subtitle}
                  </p>
                  <p className="mt-6 text-sm leading-relaxed text-[#f5f0e8]/68">
                    {pillar.body}
                  </p>
                  <p className="mt-4 text-[12px] leading-relaxed text-[#f5f0e8]/40">
                    {pillar.english}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── SECTION 1.5: FIVE ELEMENTS ───────────────────── */}
        <section
          id="wuxing"
          className="relative flex min-h-screen flex-col justify-center border-t border-[#e8d5a3]/10 py-28"
        >
          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a962]/75">
                五行 · The Five Elements
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#f5f0e8] md:text-5xl">
                金木水火土，
                <br className="hidden md:block" />
                五种能量，五种维度。
              </h2>
              <p className="mt-5 max-w-xl text-sm uppercase tracking-[0.18em] text-[#f5f0e8]/45 md:text-base md:tracking-[0.1em] md:normal-case">
                Five elements · five energies · five operating dimensions of a
                life.
              </p>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-[#f5f0e8]/65 md:text-base">
                若三位一体定义「为何」，五行则定义「如何流动」。木火土金水以
                <span className="font-medium" style={{ color: "#5fa37a" }}>
                  {" 相生 "}
                </span>
                环流而养，以
                <span className="font-medium" style={{ color: "#d9554e" }}>
                  {" 相克 "}
                </span>
                穿插而衡——这是宇宙最古老的反馈控制系统。
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#f5f0e8]/45 md:text-[15px]">
                If the Trinity defines the why, the Five Elements define the
                how-of-flow. Wood, Fire, Earth, Metal and Water nourish along
                the 相生 cycle and balance through the 相克 cycle — the oldest
                feedback-control system in the cosmos.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.22em]">
                {elements.map((el) => (
                  <span
                    key={el.char}
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
                    style={{
                      borderColor: `${el.color}55`,
                      color: el.color,
                      backgroundColor: `${el.color}12`,
                    }}
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: el.color }}
                    />
                    {el.char} · {el.en}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
              <div className="absolute inset-0 -z-10 rounded-full bg-[#e8d5a3]/[0.04] blur-2xl" />
              <GodFiveElements className="h-[22rem] w-[22rem] md:h-[24rem] md:w-[24rem]" />
            </div>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {elements.map((el, i) => (
              <article
                key={el.char}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-gradient-to-b from-[#12101c]/85 to-[#0a0912]/55 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 ${
                  i === 2 ? "lg:col-span-1 lg:translate-y-2" : ""
                }`}
                style={{
                  borderColor: `${el.color}28`,
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -top-4 text-[8rem] font-light leading-none transition-opacity duration-300 group-hover:opacity-[0.18]"
                  style={{ color: el.color, opacity: 0.07 }}
                >
                  {el.char}
                </span>
                <div className="relative">
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className="text-3xl font-light"
                      style={{ color: el.color, letterSpacing: "0.04em" }}
                    >
                      {el.char}
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-[0.28em]"
                      style={{ color: `${el.color}cc` }}
                    >
                      {el.pinyin} · {el.en}
                    </span>
                  </div>
                  <div
                    className="mt-3 h-px w-full"
                    style={{
                      background: `linear-gradient(to right, ${el.color}66, transparent)`,
                    }}
                  />
                  <dl className="mt-4 space-y-1.5 text-[10px] uppercase tracking-[0.18em] text-[#f5f0e8]/50">
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-[#f5f0e8]/35">方位</dt>
                      <dd>{el.direction}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-[#f5f0e8]/35">季节</dt>
                      <dd>{el.season}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt className="text-[#f5f0e8]/35">德</dt>
                      <dd>{el.virtue}</dd>
                    </div>
                  </dl>
                  <p
                    className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em]"
                    style={{ color: el.color }}
                  >
                    {el.dimension}
                  </p>
                  <p className="mt-3 text-[12.5px] leading-relaxed text-[#f5f0e8]/65">
                    {el.body}
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-[#f5f0e8]/38">
                    {el.bodyEn}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── SECTION 2: APPROACH ──────────────────────────── */}
        <section
          id="approach"
          className="relative flex min-h-screen flex-col justify-center border-t border-[#e8d5a3]/10 py-28"
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a962]/75">
                法门 · The Approach
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#f5f0e8] md:text-5xl">
                从理论到现实的
                <br className="hidden md:block" />
                降维打击。
              </h2>
              <p className="mt-5 max-w-md text-[13px] uppercase tracking-[0.18em] text-[#f5f0e8]/45 md:text-sm md:tracking-[0.1em] md:normal-case">
                A higher-dimensional strike, deployed on lower-dimensional
                reality.
              </p>
              <p className="mt-8 max-w-md text-sm leading-relaxed text-[#f5f0e8]/65 md:text-base">
                复阳 (Fùyáng)
                创立神识咨询的初衷，在于打破「形而上」与「现实世界」的壁垒。我们不提供安慰剂，我们提供的是一套可执行的系统级解决方案。
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#f5f0e8]/45 md:text-[15px]">
                Fùyáng founded 神识咨询 to dissolve the barrier between the
                metaphysical and the material. We do not dispense placebos. We
                ship system-level solutions.
              </p>
            </div>

            <ol className="relative flex flex-col gap-6 border-l border-[#e8d5a3]/15 pl-8 lg:pl-12">
              {approach.map((step) => (
                <li key={step.index} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[2.55rem] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-[#c9a962]/45 bg-[#06050c] text-[10px] font-semibold tracking-[0.16em] text-[#e8d5a3] lg:-left-[3.6rem]"
                  >
                    {step.index}
                  </span>
                  <div className="rounded-2xl border border-[#e8d5a3]/12 bg-gradient-to-b from-[#12101c]/80 to-[#0a0912]/55 p-6 shadow-[0_16px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-[#c9a962]/75">
                      {step.badge} · {step.title}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[#f5f0e8]/70 md:text-[15px]">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── SECTION 3: OFFERINGS ─────────────────────────── */}
        <section
          id="offerings"
          className="relative flex min-h-screen flex-col justify-center border-t border-[#e8d5a3]/10 py-28"
        >
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a962]/75">
              服务 · The Offerings
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#f5f0e8] md:text-5xl">
              三层服务，
              <br className="hidden md:block" />
              三种共振。
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#f5f0e8]/55 md:text-base">
              Three modules, three depths of engagement. Each is calibrated to a
              moment in your life-cycle — choose by resonance, not by impulse.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {offerings.map((offering, i) => (
              <article
                key={offering.name}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#e8d5a3]/12 bg-gradient-to-b from-[#12101c]/85 to-[#0a0912]/55 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#e8d5a3]/35 hover:shadow-[0_36px_100px_rgba(232,213,163,0.16)] ${
                  i === 1 ? "md:translate-y-3" : ""
                }`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -top-6 text-[9rem] font-light leading-none text-[#e8d5a3]/[0.07] transition-all duration-500 group-hover:text-[#e8d5a3]/[0.14]"
                >
                  {offering.motif}
                </span>

                <div className="relative">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[#c9a962]/80">
                    Module · 0{i + 1}
                  </p>
                  <h3 className="mt-3 text-2xl font-light tracking-[0.06em] text-[#e8d5a3] md:text-3xl">
                    {offering.label}
                  </h3>
                  <p className="mt-1.5 text-[11px] uppercase tracking-[0.28em] text-[#f5f0e8]/50">
                    {offering.name}
                  </p>
                  <p className="mt-6 text-sm leading-relaxed text-[#f5f0e8]/68">
                    {offering.description}
                  </p>
                  <p className="mt-3 text-[12px] leading-relaxed text-[#f5f0e8]/40">
                    {offering.descriptionEn}
                  </p>
                </div>

                <div className="relative mt-8 border-t border-[#e8d5a3]/10 pt-5">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e8d5a3]/85 transition-colors hover:text-[#e8d5a3]"
                  >
                    Inquire
                    <span aria-hidden className="text-[#c9a962]/60">
                      ↗
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── CONTACT / RESONANCE ──────────────────────────── */}
        <section
          id="contact"
          className="relative flex min-h-[70svh] flex-col justify-center border-t border-[#e8d5a3]/10 py-24"
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a962]/75">
                结缘 · Resonance
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#f5f0e8] md:text-5xl">
                当频率对齐，
                <br className="hidden md:block" />
                自有缘。
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#f5f0e8]/55 md:text-base">
                When the frequency aligns, resonance arrives. Reach through the
                mortal plane, or transmit directly.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href={consultancyUrl}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[#c9a962]/35 bg-[#c9a962]/[0.08] px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e8d5a3]/55 hover:bg-[#c9a962]/[0.16] hover:shadow-[0_0_36px_rgba(232,213,163,0.18)]"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a962]/85">
                    凡间法则 · Mortal Plane
                  </p>
                  <p className="mt-2 text-base font-medium text-[#f5f0e8] md:text-lg">
                    Wokki Consultancy — pricing & sessions
                  </p>
                </div>
                <span
                  aria-hidden
                  className="text-lg text-[#e8d5a3] transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <a
                href={consultancyInitialSessionEmail}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[#f5f0e8]/12 bg-[#0c0b14]/60 px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e8d5a3]/30 hover:bg-[#12101c]/70"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#f5f0e8]/55">
                    Direct transmission · Email
                  </p>
                  <p className="mt-2 text-base font-medium text-[#f5f0e8]/85 md:text-lg">
                    wokkiacross@gmail.com
                  </p>
                </div>
                <span
                  aria-hidden
                  className="text-lg text-[#e8d5a3]/80 transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ───────────────────────────────────────── */}
        <footer className="border-t border-[#e8d5a3]/10 py-12">
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.42em] text-[#e8d5a3]/55">
              Wokki Heavenly Consultancy · 神识咨询
            </p>
            <p className="text-[11px] tracking-[0.18em] text-[#f5f0e8]/40">
              Designed by Fuyang. Engineered for the Soul.
              <span className="ml-3 text-[#e8d5a3]/45">
                复阳设计 · 为灵魂工程
              </span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.28em] text-[#f5f0e8]/40">
              <Link
                href={MAIN_SITE_URL}
                className="transition-colors hover:text-[#e8d5a3]"
              >
                Wokki.com
              </Link>
              <span aria-hidden className="text-[#e8d5a3]/20">
                ·
              </span>
              <Link
                href={consultancyUrl}
                className="transition-colors hover:text-[#e8d5a3]"
              >
                Wokki Consultancy
              </Link>
              <span aria-hidden className="text-[#e8d5a3]/20">
                ·
              </span>
              <Link
                href={`${MAIN_SITE_URL.replace(/\/$/, "")}/mcn`}
                className="transition-colors hover:text-[#e8d5a3]"
              >
                Wokki MCN
              </Link>
              <span aria-hidden className="text-[#e8d5a3]/20">
                ·
              </span>
              <a
                href={consultancyInitialSessionEmail}
                className="transition-colors hover:text-[#e8d5a3]"
              >
                联系我们 · Contact
              </a>
            </div>
            <p className="mt-2 text-[10px] tracking-[0.3em] text-[#f5f0e8]/25">
              © 2026 Wokki Ltd. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
