import type { Metadata } from "next";
import mdPortrait from "./md.jpeg";
import MdVideo from "./md-video";

const emberGlow = {
  textShadow:
    "0 0 12px rgba(255, 160, 90, 0.5), 0 0 32px rgba(255, 90, 35, 0.28), 0 0 70px rgba(120, 35, 12, 0.26)",
} as const;

export const metadata: Metadata = {
  title: "Michael Dumencic · Oracle · Wokki MCN",
  description: "A music video oracle for Michael Dumencic.",
};

export default function MichaelDumencicPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050201] px-5 py-10 text-[#fff1df]">
      <div className="md-oracle-glow pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,2,1,0.22)_46%,rgba(5,2,1,0.92)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#4c1607]/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050201] to-transparent" />

      <section className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-8 text-center">
        <div className="god-fade-up space-y-4">
          <p className="text-[10px] uppercase tracking-[0.65em] text-[#ffcfaa]/65">
            Wokki Presents
          </p>
          <h1
            className="font-serif text-4xl font-light uppercase tracking-[0.28em] text-[#fff1df] md:text-6xl"
            style={emberGlow}
          >
            Michael Dumencic
          </h1>
          <p className="text-[10px] uppercase tracking-[0.55em] text-[#ffb06a]/75 md:text-xs">
            Music Video Oracle
          </p>
        </div>

        <div className="god-fade-up god-fade-up-delay-1 relative">
          <div className="md-oracle-ring pointer-events-none absolute left-1/2 top-1/2 h-[calc(100%+5rem)] w-[calc(100%+5rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#ff9a5a]/20" />
          <div className="md-oracle-ring-reverse pointer-events-none absolute left-1/2 top-1/2 h-[calc(100%+8rem)] w-[calc(100%+8rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff6a2d]/10" />
          <MdVideo poster={mdPortrait.src} src="/md/video" />
        </div>

        <p className="god-fade-up god-fade-up-delay-2 max-w-md font-serif text-sm italic tracking-[0.22em] text-[#ffd3ad]/55">
          Press play and let the oracle speak.
        </p>
      </section>
    </main>
  );
}
