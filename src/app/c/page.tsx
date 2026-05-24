import type { Metadata } from "next";
import Link from "next/link";
import CBackgroundVideo from "./c-background-video";
import { WOKKI_DOT_COM } from "../lib/WokkiNodes";

const MAIN_SITE_URL =
  process.env.NEXT_PUBLIC_MAIN_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${WOKKI_DOT_COM}`);

const earthGlowHero = {
  textShadow:
    "0 0 12px rgba(201, 169, 97, 0.55), 0 0 28px rgba(196, 155, 90, 0.42), 0 0 56px rgba(80, 55, 20, 0.28)",
} as const;

const earthGlowSoft = {
  textShadow:
    "0 0 10px rgba(196, 155, 90, 0.45), 0 0 24px rgba(180, 140, 70, 0.28), 0 0 44px rgba(80, 55, 20, 0.14)",
} as const;

const earthGlowFaint = {
  textShadow:
    "0 0 8px rgba(196, 155, 90, 0.32), 0 0 20px rgba(180, 140, 70, 0.18)",
} as const;

export const metadata: Metadata = {
  title: "C · Beauty · Wokki MCN",
  description: "To Christine · The Muse",
};

export default function CPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#030303] text-[#f5f0e8]">
      <CBackgroundVideo src="/c/video" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#030303]/60 via-transparent to-[#030303]/90" />
      <div className="pointer-events-none absolute left-1/2 top-[42%] h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,169,97,0.14)_0%,rgba(196,155,90,0.08)_42%,rgba(60,45,15,0.04)_68%,transparent_78%)] blur-3xl" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-6 py-12 md:px-10 md:py-16">
        <header className="god-fade-up w-full text-center">
          <p
            className="text-[10px] uppercase tracking-[0.5em] text-[#e8d5a3]/75"
            style={earthGlowFaint}
          >
            Wokki · MCN
          </p>
        </header>

        <div className="god-fade-up god-fade-up-delay-1 absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
          <h1
            className="font-serif text-9xl font-light leading-none text-[#f5edd6] md:text-[13rem]"
            style={{
              letterSpacing: "0.15em",
              textIndent: "0.15em",
              ...earthGlowHero,
            }}
          >
            C
          </h1>

          <p
            className="mt-8 text-xs uppercase tracking-[0.6em] text-[#ede0c8]/90 md:text-sm"
            style={earthGlowSoft}
          >
            B e a u t y
          </p>

          <div className="mt-10 h-px w-12 bg-gradient-to-r from-transparent via-[#c9a961]/60 to-transparent shadow-[0_0_14px_rgba(201,169,97,0.4)]" />

          <p
            className="mt-8 font-serif text-[11px] italic tracking-[0.25em] text-[#d4c4a0]/55 md:text-xs"
            style={earthGlowFaint}
          >
            To Christine · The Muse
          </p>
        </div>

        <footer className="god-fade-up god-fade-up-delay-2 flex w-full flex-col items-center gap-6">
          <Link
            href={MAIN_SITE_URL}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full border border-[#f5f0e8]/20 bg-[#030303]/30 px-8 py-3.5 backdrop-blur-xl transition-all duration-500 hover:border-[#e8d5a3]/50 hover:bg-[#030303]/50 hover:shadow-[0_0_30px_rgba(232,213,163,0.15)]"
          >
            <span className="relative z-10 text-[9px] uppercase tracking-[0.35em] text-[#f5f0e8]/80 transition-colors group-hover:text-[#e8d5a3]">
              Return to Core
            </span>
          </Link>
        </footer>
      </div>
    </main>
  );
}
