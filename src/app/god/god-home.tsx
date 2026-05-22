import Link from "next/link";
import {
  consultancyInitialSessionEmail,
  WOKKI_DOT_COM,
} from "../lib/WokkiNodes";
import GodAltarTV from "./god-altar-tv";
import GodCultivationPath from "./god-cultivation-path";
import GodFiveElements from "./god-five-elements";
import GodHeader from "./god-header";
import GodPeachBlossom from "./god-peach-blossom";
import GodPetals from "./god-petals";
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
    body: "见相非相，即见如来。结合心理学与「神识」的觉醒，剥离外在的幻象 (Meta-illusion)。每一次修习，都是一次意识的迭代，助你在纷扰的世俗中完成内心的「顿悟」，重获绝对的清明。",
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
 * 五阶修行 · The Cultivation Path — five canonical stages of 内丹 (inner-alchemy)
 * cultivation, reframed as a YC-style operational journey.
 */
const cultivation = [
  {
    stage: "炼气",
    pinyin: "Liàn Qì",
    en: "Refining Qi",
    color: "#5fa37a",
    duration: "Week 01 → 04",
    cohortLabel: "Onboarding · 入定",
    yc: "The Application Read-Through",
    title: "认识你自己 — 收摄气息，澄清意图。",
    body: "扫描原生配置：紫微斗数、四柱八字、性格地图、当下情境。建立每日修习节奏，与同期道友互相照见——找到自己当下真实的「气」。",
    bodyEn:
      "Read your native chart. Establish the daily cadence. Meet your cohort. The first month is about clearing static and discovering what energy you actually carry — not what you imagine you carry.",
  },
  {
    stage: "筑基",
    pinyin: "Zhù Jī",
    en: "Foundation",
    color: "#c9a962",
    duration: "Week 05 → 12",
    cohortLabel: "Sprint · 共修",
    yc: "Build Phase",
    title: "搭建道基 — 把洞见沉淀为系统。",
    body: "把模糊的觉知翻译成可执行的人生 OS：决策框架、能量管理、关系拓扑、财务流。每周名师答疑，每周同修复盘。基础不牢，地动山摇。",
    bodyEn:
      "Translate fuzzy awareness into an executable life-OS: decision frameworks, energy management, relational topology, capital flow. Weekly master Q&A, weekly cohort retros. Without foundation, every gain leaks back out.",
  },
  {
    stage: "金丹",
    pinyin: "Jīn Dān",
    en: "Golden Core",
    color: "#d9d2c0",
    duration: "Month 04 → 05",
    cohortLabel: "Crystallisation · 凝结",
    yc: "Demo-Day Build-Up",
    title: "结成金丹 — 把独特性凝固成签名。",
    body: "找到你独一无二的「道号」——可以被外部世界识别、传播、信赖的核心标识。事业、作品、个人品牌——把你的天赋折叠成一颗会发光的金丹。",
    bodyEn:
      "Find your sovereign signal — the unique mark by which the outer world will recognise, transmit, and trust you. Whether business, body of work, or brand, the talent must be folded into a luminous core.",
  },
  {
    stage: "元婴",
    pinyin: "Yuán Yīng",
    en: "Nascent Soul",
    color: "#d9554e",
    duration: "Month 06",
    cohortLabel: "Demo · 出关",
    yc: "Demo Day",
    title: "出关大典 — 你的元婴正式现世。",
    body: "在道场内对全体名师与同修发布你的「元婴」：新公司、新作品、新身份、新决定。从此你已是独立修行者，不再依附师门，但永远是道场之子。",
    bodyEn:
      "Demo day. You ship your nascent soul — a new venture, a new body of work, a new identity, a new decisive cut — to the masters and the cohort. You are no longer dependent on the school, yet forever a child of the school.",
  },
  {
    stage: "飞升",
    pinyin: "Fēi Shēng",
    en: "Ascension",
    color: "#f5b8c8",
    duration: "Lifetime · 终身",
    cohortLabel: "Alumni · 同门",
    yc: "The Alumni Network",
    title: "飞升为仙 — 加入同门星图。",
    body: "结业即结缘。终身共修通道、季度雅集、跨期道友互助、未来批次的开示席位。星图越大，每一颗星越亮——这是真正的复利。",
    bodyEn:
      "Graduation is communion. A lifelong shared channel, quarterly gatherings, cross-cohort 道友 support, and a perpetual seat in future cohorts. The constellation only grows brighter — that is the only real compounding.",
  },
] as const;

/**
 * 名师 — Lead masters of the dojo. 紫薇星喵 · Nana is First (天下第一);
 * 道彩真人 · 王元 · Wokki is Second (天下第二). Guest masters rotate each cohort.
 */
const masters = [
  {
    title: "紫薇星喵 · 欧阳娜娜 · Nana",
    role: "Supreme Patriarch · 道场至尊 · 天下第一",
    motif: "喵",
    body: "桃音至尊 · 六弦证道。以大提琴与吉他入世，以黑屏直播出世——唯有歌声与琴音，方见真阳。道彩真人敬其为首，道场星图以北辰当之。",
    bodyEn:
      "The Ziwei Star Cat · Ouyang Nana. Supreme voice of the peach-source · cultivation through six strings. Cellist, guitarist, keeper of the black-screen set — only song and string reveal true yang. Master Dàocǎi bows to her as First Under Heaven; the dojo's constellation sets her as the pole star.",
    lineage: ["琴 · Strings", "歌 · Voice", "艺 · Art"],
  },
  {
    title: "道彩真人 · 王元 · Wokki",
    role: "Founder · 道场主理 · 天下第二",
    motif: "彩",
    body: "Theory Engineer · Systems Thinker · 紫薇双星之二。曾任 JPMorgan 量化、Bloomberg 工程师、AI 初创首席工程师，毕业于伦敦帝国理工学院计算机硕士。融贯数学、金融、心理、设计、玄学与禅。",
    bodyEn:
      "Master Dàocǎi · Han Yuan · Wokki. Theory Engineer · Systems Thinker · the dual-Ziwei star, Second Under Heaven. Quant at JPMorgan, engineer at Bloomberg, founding engineer of an AI startup, MSc Computing from Imperial College London. Fluent across mathematics, finance, psychology, design, metaphysics and Zen.",
    lineage: ["道家 · Daoist", "Logos · Christian", "禅 · Chán-Buddhism"],
  },
  {
    title: "客座道友 · Guest Masters",
    role: "Cohort guest faculty",
    motif: "客",
    body: "每一期道场会邀请 3–5 位领域内的「真传」客座道友——可能来自量化金融、行为科学、品牌叙事、创业实战、传统玄学等不同山门——确保每位同修都能与某一道相印证。",
    bodyEn:
      "Each cohort hosts 3–5 guest masters drawn from quant finance, behavioural science, brand-narrative, founder-mode operations, and classical metaphysics — so every disciple can find at least one lineage that resonates.",
    lineage: ["量化 · Quant", "品牌 · Brand", "创业 · Founder"],
  },
] as const;

/**
 * 同修 — The cohort. Properties of the fellowship.
 */
const fellowship = [
  {
    metric: "12",
    label: "Disciples · 同修名额",
    sub: "每届严选 12 位，宁缺毋滥。Each cohort, twelve disciples — never more.",
  },
  {
    metric: "180",
    label: "Days · 共修周期",
    sub: "六个月闭关至出关。Six months from sealing to ascension.",
  },
  {
    metric: "∞",
    label: "Lifetime · 同门终身",
    sub: "出关后即永远同门。Graduation is the beginning, not the end.",
  },
] as const;

/**
 * 入道 — three offerings, three depths of engagement, reframed as
 * cultivation tiers: 初心 (taster) → 同修 (full cohort) → 真传 (inner disciple).
 */
const offerings = [
  {
    label: "「初心」",
    name: "Initiation",
    pinyin: "Chū Xīn",
    cadence: "一次入定 · A single deep session",
    ycLike: "≈ YC Office Hours, one-shot",
    description:
      "针对人生十字路口的深度对谈。一次入定，拨开迷雾，直击本质——决定要不要踏上修仙这条路。",
    descriptionEn:
      "A single, deep dialogue at a crossroad. One sitting, the fog parts, you decide whether to walk this path at all.",
    motif: "初",
    primary: false,
    cta: "Inquire · 问道",
    color: "#c9a962",
  },
  {
    label: "「同修」",
    name: "The Cohort",
    pinyin: "Tóng Xiū",
    cadence: "六月共修 · Six-month batch",
    ycLike: "≈ YC Batch (W26)",
    description:
      "完整六个月的道场之旅：每届 12 位同修，每周名师答疑，每月线下雅集，从「炼气」走到「出关」。修仙的人不是孤独地走，是和最好的同期一起走。",
    descriptionEn:
      "The full six-month cohort: twelve disciples per batch, weekly master Q&A, monthly in-person 雅集, walking together from 炼气 to 出关. You don't ascend alone — you ascend with your batch.",
    motif: "同",
    primary: true,
    cta: "Apply · 申请入门",
    color: "#f5b8c8",
  },
  {
    label: "「真传」",
    name: "Inner Disciple",
    pinyin: "Zhēn Chuán",
    cadence: "一年陪跑 · Year-long lineage",
    ycLike: "≈ YC continuity + 1-on-1",
    description:
      "面向已有同修经验的高阶个体。一对一全年陪跑：每周私授，季度闭关，融贯你的事业、家庭、灵性于同一条线索之中。",
    descriptionEn:
      "For high-agency individuals with prior cohort experience. A year of one-on-one transmission: weekly private sessions, quarterly retreats, your career, family and inner life woven into a single thread.",
    motif: "真",
    primary: false,
    cta: "Lineage · 入室",
    color: "#e8d5a3",
  },
] as const;

export default function GodHome() {
  const consultancyUrl = `${MAIN_SITE_URL.replace(/\/$/, "")}/consultancy`;

  return (
    <main
      className="relative min-h-screen overflow-hidden text-[#f5f0e8]"
      style={{
        background:
          "radial-gradient(ellipse 90% 60% at 50% -8%, rgba(232,213,163,0.14) 0%, transparent 55%), radial-gradient(ellipse 65% 50% at 88% 70%, rgba(245,184,200,0.06) 0%, transparent 55%), radial-gradient(ellipse 55% 40% at 10% 88%, rgba(201,169,98,0.08) 0%, transparent 50%), #06050c",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
      >
        <div className="absolute left-1/2 top-32 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[#e8d5a3]/[0.07] blur-3xl" />
        <div className="absolute -right-24 bottom-40 h-72 w-72 rounded-full bg-[#f5b8c8]/[0.05] blur-3xl" />
        <div className="absolute -left-20 top-1/2 h-56 w-56 rounded-full bg-[#8cb4ff]/[0.04] blur-3xl" />
      </div>

      {/* 桃花雨 — drifts across the full page */}
      <GodPetals className="absolute inset-0 h-full" />

      <GodHeader mainSiteUrl={MAIN_SITE_URL} />

      {/* 牌位刘海 · The Serif altar tablet — viewport-pinned notch, autoplay once then tucks away */}
      <GodAltarTV src="/god/lv.mp4" />

      <div className="relative mx-auto w-full max-w-5xl px-6 md:px-10">
        {/* ─── HERO ─────────────────────────────────────────── */}
        <section className="relative flex min-h-screen flex-col items-center justify-center pb-24 pt-32 text-center">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <GodStarWheel className="w-[36rem] max-w-[92vw] opacity-[0.40] md:w-[44rem]" />
            <div className="pointer-events-none absolute inset-0 god-ripple" />
          </div>

          <div className="god-fade-up relative z-10 flex flex-col items-center">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#c9a962]/80">
              神识咨询 · Wokki Heavenly Consultancy
            </p>

            <h1 className="mt-7 text-4xl font-normal leading-[1.05] tracking-[0.08em] text-[#f5f0e8] md:text-6xl">
              修道场
            </h1>
            <p className="mt-3 text-[11px] uppercase tracking-[0.42em] text-[#e8d5a3]/65 md:text-xs">
              The Cultivation Dojo · A YC for Becoming-Immortal
            </p>

            {/* The Founding Stele — central quote, the dojo's 道训 */}
            <figure className="god-fade-up god-fade-up-delay-1 mt-12 max-w-2xl">
              <div className="relative rounded-[2rem] border border-[#e8d5a3]/15 bg-gradient-to-b from-[#12101c]/80 via-[#0c0b14]/55 to-[#06050c]/70 px-8 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-2 -top-3 text-[5rem] font-light leading-none text-[#e8d5a3]/15"
                >
                  「
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-2 -bottom-7 text-[5rem] font-light leading-none text-[#e8d5a3]/15"
                >
                  」
                </span>
                <blockquote className="relative">
                  <p className="text-2xl font-light leading-relaxed tracking-[0.1em] text-[#f5f0e8] md:text-3xl">
                    神仙本是凡人变，
                    <br />
                    只怕凡人志不坚。
                  </p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.32em] text-[#e8d5a3]/65 md:text-xs">
                    Immortals were once mortal —
                    <br className="md:hidden" /> the only barrier is the
                    firmness of the mortal will.
                  </p>
                </blockquote>
                <figcaption className="mt-6 border-t border-[#e8d5a3]/10 pt-4 text-right text-[10px] uppercase tracking-[0.28em] text-[#f5f0e8]/40">
                  道场训 · The Dojo&rsquo;s Stele
                </figcaption>
              </div>
            </figure>

            <p className="god-fade-up god-fade-up-delay-2 mt-10 max-w-2xl text-base leading-relaxed text-[#f5f0e8]/68 md:text-lg">
              我们不是一家咨询公司——我们是一座
              <span className="text-[#e8d5a3]">桃源修道场</span>。
              <br className="hidden md:block" />
              名师指点，同修结伴；六个月一届，十二人一批。
            </p>
            <p className="god-fade-up god-fade-up-delay-2 mt-3 max-w-2xl text-sm leading-relaxed text-[#f5f0e8]/45 md:text-[15px]">
              We are not a consultancy — we are a{" "}
              <span className="text-[#f5b8c8]/85">peach-source dojo</span>: the
              YC of becoming-immortal. Twelve disciples per cohort. Six months
              from sealing to ascension. Lifetime fellowship after that.
            </p>

            <div className="god-fade-up god-fade-up-delay-3 mt-12 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
              <a
                href="#offerings"
                className="inline-flex items-center justify-center rounded-full border border-[#f5b8c8]/55 bg-gradient-to-r from-[#c9a962]/15 to-[#f5b8c8]/15 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f5f0e8] shadow-[0_0_40px_rgba(245,184,200,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f5b8c8]/75 hover:shadow-[0_0_60px_rgba(245,184,200,0.36)]"
              >
                申请入门 · Apply to the Cohort
              </a>
              <a
                href="#cultivation"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#f5f0e8]/15 px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#f5f0e8]/65 transition-colors hover:border-[#e8d5a3]/35 hover:text-[#e8d5a3]"
              >
                See the Path
                <span aria-hidden className="text-[#e8d5a3]/60">
                  ↓
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ─── PHILOSOPHY ──────────────────────────────────── */}
        <section
          id="philosophy"
          className="relative flex min-h-screen flex-col justify-center border-t border-[#e8d5a3]/10 py-28"
        >
          <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a962]/75">
                天启 · The Core Teaching
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
                道场之上，三家心法并立、互为印证。我们将三大人类至高智慧体系，重构为现代修行者的「人生操作系统」(Life
                Operating System)——既是哲学，也是工程。
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#f5f0e8]/45 md:text-[15px]">
                Three apex traditions — Daoist cosmology, Christian Logos and
                Buddhist consciousness — refactored into one coherent operating
                system for the modern cultivator. Philosophy and engineering at
                once.
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

        {/* ─── FIVE ELEMENTS ───────────────────────────────── */}
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
                穿插而衡——这是宇宙最古老的反馈控制系统，也是道场内修习的核心心法。
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#f5f0e8]/45 md:text-[15px]">
                If the Trinity defines the why, the Five Elements define the
                how-of-flow. Wood, Fire, Earth, Metal and Water nourish along
                the 相生 cycle and balance through the 相克 cycle — the oldest
                feedback-control system in the cosmos, and the core 心法 of the
                dojo.
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

        {/* ─── 修行 · THE CULTIVATION PATH ─────────────────── */}
        <section
          id="cultivation"
          className="relative flex min-h-screen flex-col justify-center border-t border-[#e8d5a3]/10 py-28"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a962]/75">
                修行 · The Five-Stage Path
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#f5f0e8] md:text-5xl">
                从凡夫到神仙，
                <br className="hidden md:block" />
                只需五阶。
              </h2>
              <p className="mt-5 max-w-xl text-sm uppercase tracking-[0.18em] text-[#f5f0e8]/45 md:text-base md:tracking-[0.1em] md:normal-case">
                Five canonical stages of inner-alchemy — restructured as a
                six-month operational cohort.
              </p>
            </div>
            <div className="text-sm leading-relaxed text-[#f5f0e8]/65 md:text-base">
              <p>
                如果 YC 把创业者从{" "}
                <span className="text-[#e8d5a3]/85">application</span> 带到{" "}
                <span className="text-[#e8d5a3]/85">demo day</span>，
                我们则把修行者从「炼气」带到「飞升」——
                同样是孵化器的结构，但行走的是修仙之路。
              </p>
              <p className="mt-3 text-[#f5f0e8]/45">
                Where YC takes founders from application to demo day, we take
                cultivators from 炼气 (Refining Qi) to 飞升 (Ascension) — same
                incubator architecture, but the path is romance, not hustle.
              </p>
            </div>
          </div>

          {/* The path visualisation */}
          <div className="mt-14 overflow-x-auto pb-2">
            <GodCultivationPath className="min-w-[640px]" />
          </div>

          {/* Stage cards */}
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
            {cultivation.map((stage, i) => (
              <li key={stage.stage} className="list-none">
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-gradient-to-b from-[#12101c]/85 to-[#0a0912]/55 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 ${
                    i === 4 ? "lg:bg-gradient-to-b lg:from-[#1a1018]/85" : ""
                  }`}
                  style={{ borderColor: `${stage.color}30` }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-3 -top-4 text-[7rem] font-light leading-none transition-opacity duration-300 group-hover:opacity-[0.2]"
                    style={{ color: stage.color, opacity: 0.08 }}
                  >
                    {stage.stage[0]}
                  </span>
                  <div className="relative">
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-[0.28em]"
                        style={{ color: stage.color }}
                      >
                        0{i + 1}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.22em] text-[#f5f0e8]/45">
                        {stage.duration}
                      </span>
                    </div>
                    <h3
                      className="mt-3 text-2xl font-light"
                      style={{
                        color: stage.color,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {stage.stage}
                    </h3>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[#f5f0e8]/50">
                      {stage.pinyin} · {stage.en}
                    </p>
                    <div
                      className="mt-3 h-px w-full"
                      style={{
                        background: `linear-gradient(to right, ${stage.color}66, transparent)`,
                      }}
                    />
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[9px] uppercase tracking-[0.22em]">
                      <span
                        className="rounded-full border px-2 py-0.5"
                        style={{
                          borderColor: `${stage.color}55`,
                          color: stage.color,
                          backgroundColor: `${stage.color}10`,
                        }}
                      >
                        {stage.cohortLabel}
                      </span>
                      <span className="rounded-full border border-[#f5f0e8]/15 bg-[#f5f0e8]/[0.04] px-2 py-0.5 text-[#f5f0e8]/55">
                        {stage.yc}
                      </span>
                    </div>
                    <p className="mt-4 text-[13px] font-medium leading-snug text-[#f5f0e8]/80">
                      {stage.title}
                    </p>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-[#f5f0e8]/60">
                      {stage.body}
                    </p>
                    <p className="mt-2 text-[11px] leading-relaxed text-[#f5f0e8]/35">
                      {stage.bodyEn}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── 道场 · MASTERS & FELLOWSHIP ─────────────────── */}
        <section
          id="dojo"
          className="relative flex min-h-screen flex-col justify-center border-t border-[#e8d5a3]/10 py-28"
        >
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-start">
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a962]/75">
                道场 · The Dojo
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#f5f0e8] md:text-5xl">
                名师指点，
                <br className="hidden md:block" />
                同修结伴。
              </h2>
              <p className="mt-5 max-w-xl text-sm uppercase tracking-[0.18em] text-[#f5f0e8]/45 md:text-base md:tracking-[0.1em] md:normal-case">
                Masters point the Way · Fellows walk it together.
              </p>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-[#f5f0e8]/65 md:text-base">
                修仙从来不是孤独的事。一个人走得快，一群人走得远——而要登天，
                必须既有
                <span className="text-[#e8d5a3]/85">名师</span>
                的「点化」，也要有
                <span className="text-[#f5b8c8]/85">同修</span>
                的「印证」。
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#f5f0e8]/45 md:text-[15px]">
                Cultivation has never been a solitary craft. One walks fast
                alone — a sangha walks far. Ascension requires both the
                master&rsquo;s spark and the fellow disciple&rsquo;s mirror.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -right-4 -top-6 h-32 w-32 opacity-50">
                <GodPeachBlossom color="#f5b8c8" opacity={0.55} />
              </div>
              <div className="relative grid gap-3 rounded-[2rem] border border-[#f5b8c8]/15 bg-gradient-to-b from-[#1a1018]/70 to-[#0a0912]/55 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl md:grid-cols-3">
                {fellowship.map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-col items-start gap-2 rounded-2xl border border-[#e8d5a3]/12 bg-[#0c0b14]/55 p-4"
                  >
                    <p
                      className="text-3xl font-light leading-none text-[#e8d5a3] md:text-4xl"
                      style={{ letterSpacing: "0.04em" }}
                    >
                      {f.metric}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.26em] text-[#f5b8c8]/80">
                      {f.label}
                    </p>
                    <p className="text-[11px] leading-snug text-[#f5f0e8]/50">
                      {f.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Masters */}
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {masters.map((m) => (
              <article
                key={m.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#e8d5a3]/14 bg-gradient-to-b from-[#12101c]/85 to-[#0a0912]/55 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e8d5a3]/35"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-4 text-[10rem] font-light leading-none text-[#e8d5a3]/[0.07] transition-colors group-hover:text-[#e8d5a3]/[0.13]"
                >
                  {m.motif}
                </span>
                <div className="relative">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[#c9a962]/80">
                    {m.role}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#e8d5a3] md:text-3xl">
                    {m.title}
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-[#f5f0e8]/70">
                    {m.body}
                  </p>
                  <p className="mt-3 text-[12px] leading-relaxed text-[#f5f0e8]/40">
                    {m.bodyEn}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.22em]">
                    {m.lineage.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#e8d5a3]/22 bg-[#e8d5a3]/[0.06] px-3 py-1 text-[#e8d5a3]/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── 入道 · OFFERINGS / COHORT TIERS ─────────────── */}
        <section
          id="offerings"
          className="relative flex min-h-screen flex-col justify-center border-t border-[#e8d5a3]/10 py-28"
        >
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a962]/75">
              入道 · How to Begin
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#f5f0e8] md:text-5xl">
              三层入道，
              <br className="hidden md:block" />
              一脉相承。
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#f5f0e8]/55 md:text-base">
              Three gates of entry, one lineage. From a single conversation to a
              year-long inner-disciple transmission — choose the depth that
              matches your conviction.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {offerings.map((offering, i) => (
              <article
                key={offering.name}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border bg-gradient-to-b from-[#12101c]/85 to-[#0a0912]/55 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 ${
                  offering.primary
                    ? "shadow-[0_36px_110px_rgba(245,184,200,0.18)] md:-translate-y-2"
                    : ""
                }`}
                style={{
                  borderColor: offering.primary
                    ? `${offering.color}55`
                    : `${offering.color}28`,
                }}
              >
                {offering.primary ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-px left-6 inline-flex -translate-y-1/2 items-center gap-1 rounded-full border border-[#f5b8c8]/60 bg-[#1a1018]/95 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#f5b8c8] shadow-[0_0_24px_rgba(245,184,200,0.35)]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[#f5b8c8]" />
                    Main Path · 主修
                  </span>
                ) : null}

                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 -top-6 text-[9rem] font-light leading-none transition-all duration-500 group-hover:opacity-[0.18]"
                  style={{ color: offering.color, opacity: 0.08 }}
                >
                  {offering.motif}
                </span>

                <div className="relative">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[#c9a962]/80">
                    Tier · 0{i + 1}
                  </p>
                  <h3
                    className="mt-3 text-2xl font-light md:text-3xl"
                    style={{ color: offering.color, letterSpacing: "0.06em" }}
                  >
                    {offering.label}
                  </h3>
                  <p className="mt-1.5 text-[11px] uppercase tracking-[0.28em] text-[#f5f0e8]/55">
                    {offering.pinyin} · {offering.name}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.22em]">
                    <span
                      className="rounded-full border px-2.5 py-1"
                      style={{
                        borderColor: `${offering.color}45`,
                        color: offering.color,
                        backgroundColor: `${offering.color}10`,
                      }}
                    >
                      {offering.cadence}
                    </span>
                    <span className="rounded-full border border-[#f5f0e8]/15 bg-[#f5f0e8]/[0.04] px-2.5 py-1 text-[#f5f0e8]/55">
                      {offering.ycLike}
                    </span>
                  </div>
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
                    className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] transition-colors"
                    style={{ color: offering.color }}
                  >
                    {offering.cta}
                    <span aria-hidden style={{ color: `${offering.color}cc` }}>
                      ↗
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─── 结缘 · APPLY / CONTACT ───────────────────────── */}
        <section
          id="contact"
          className="relative flex min-h-[70svh] flex-col justify-center border-t border-[#e8d5a3]/10 py-24"
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-[#c9a962]/75">
                结缘 · Apply / Be Found
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#f5f0e8] md:text-5xl">
                只怕凡人
                <br className="hidden md:block" />
                志不坚。
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#f5f0e8]/55 md:text-base">
                修道场每年开两届。如果你已读到这里，那不是巧合——
                这是你与同修之间的第一次照见。
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#f5f0e8]/40 md:text-[15px]">
                Two cohorts per year. If you&rsquo;ve read this far, it&rsquo;s
                not chance — it&rsquo;s the first mirror between you and your
                fellow disciples.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={consultancyInitialSessionEmail}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[#f5b8c8]/40 bg-gradient-to-r from-[#c9a962]/[0.08] to-[#f5b8c8]/[0.08] px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f5b8c8]/70 hover:shadow-[0_0_40px_rgba(245,184,200,0.25)]"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#f5b8c8]/85">
                    主修 · Apply to the Cohort
                  </p>
                  <p className="mt-2 text-base font-medium text-[#f5f0e8] md:text-lg">
                    申请下一届同修席位 (12 spots)
                  </p>
                </div>
                <span
                  aria-hidden
                  className="text-lg text-[#f5b8c8] transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <Link
                href={consultancyUrl}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-[#c9a962]/35 bg-[#c9a962]/[0.06] px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e8d5a3]/55 hover:bg-[#c9a962]/[0.12]"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a962]/85">
                    初心 · Single Session
                  </p>
                  <p className="mt-2 text-base font-medium text-[#f5f0e8]/90 md:text-lg">
                    Book a one-shot Initiation
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
            <div className="h-10 w-10 opacity-60">
              <GodPeachBlossom color="#f5b8c8" opacity={0.85} />
            </div>
            <p className="text-[10px] uppercase tracking-[0.42em] text-[#e8d5a3]/55">
              神识咨询 · 修道场 · Wokki Heavenly Consultancy
            </p>
            <p className="text-[11px] tracking-[0.18em] text-[#f5f0e8]/40">
              Designed by Dàocǎi. Engineered for the Soul.
              <span className="ml-3 text-[#e8d5a3]/45">
                道彩设计 · 为灵魂工程
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
