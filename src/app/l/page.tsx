import type { Metadata } from "next";
import Link from "next/link";
import LBackgroundVideo from "./l-background-video";
import { WOKKI_DOT_COM } from "../lib/WokkiNodes";

const MAIN_SITE_URL =
  process.env.NEXT_PUBLIC_MAIN_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${WOKKI_DOT_COM}`);

const dawnGlowHero = {
  textShadow:
    "0 0 12px rgba(255, 190, 140, 0.55), 0 0 28px rgba(255, 120, 90, 0.38), 0 0 56px rgba(200, 70, 60, 0.22)",
} as const;

const dawnGlowSoft = {
  textShadow:
    "0 0 10px rgba(255, 180, 130, 0.45), 0 0 24px rgba(255, 110, 80, 0.28), 0 0 44px rgba(180, 60, 50, 0.14)",
} as const;

const dawnGlowFaint = {
  textShadow:
    "0 0 8px rgba(255, 170, 120, 0.32), 0 0 20px rgba(255, 100, 70, 0.18)",
} as const;

export const metadata: Metadata = {
  title: "L · 黎明之燕 · Wokki MCN",
  description: "L燕 · 小哪吒 · Little Nezha",
};

export default function LPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-[#f5f0e8]">
      <LBackgroundVideo src="/l/video" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#030303]/60 via-transparent to-[#030303]/90" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,160,100,0.14)_0%,rgba(255,100,70,0.08)_42%,rgba(180,50,40,0.04)_68%,transparent_78%)] blur-3xl" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 py-12 md:px-10 md:py-16">
        <header className="god-fade-up w-full text-center">
          <p
            className="text-[10px] uppercase tracking-[0.5em] text-[#ffd4b8]/75"
            style={dawnGlowFaint}
          >
            Wokki · MCN
          </p>
        </header>

        <div className="god-fade-up god-fade-up-delay-1 absolute left-1/2 top-[28%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
          <h1
            className="font-serif text-[11rem] font-light leading-none text-[#fff5eb] md:text-[16rem]"
            style={{
              letterSpacing: "0.15em",
              textIndent: "0.15em",
              ...dawnGlowHero,
            }}
          >
            L
          </h1>

          <p
            className="mt-8 text-xs uppercase tracking-[0.6em] text-[#ffe8d8]/90 md:text-sm"
            style={dawnGlowSoft}
          >
            D a w n · S w a l l o w
          </p>

          <div className="mt-10 h-px w-12 bg-gradient-to-r from-transparent via-[#ff9a6a]/60 to-transparent shadow-[0_0_14px_rgba(255,140,90,0.4)]" />

          <p
            className="mt-8 font-serif text-[11px] italic tracking-[0.25em] text-[#ffd0b0]/55 md:text-xs"
            style={dawnGlowFaint}
          >
            黎明之燕 · 小哪吒
          </p>
        </div>

        <footer className="god-fade-up god-fade-up-delay-2 flex w-full flex-col items-center gap-6">
          <Link
            href={MAIN_SITE_URL}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full border border-[#f5f0e8]/20 bg-[#030303]/30 px-8 py-3.5 backdrop-blur-xl transition-all duration-500 hover:border-[#ffb08a]/50 hover:bg-[#030303]/50 hover:shadow-[0_0_30px_rgba(255,160,100,0.15)]"
          >
            <span className="relative z-10 text-[9px] uppercase tracking-[0.35em] text-[#f5f0e8]/80 transition-colors group-hover:text-[#ffd4b8]">
              Return to Core
            </span>
          </Link>
        </footer>
      </div>
    </main>
  );
}
