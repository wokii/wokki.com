"use client";

import Link from "next/link";

type GodHeaderProps = {
  mainSiteUrl: string;
};

export default function GodHeader({ mainSiteUrl }: GodHeaderProps) {
  const base = mainSiteUrl.replace(/\/$/, "");
  const consultancyUrl = `${base}/consultancy`;
  const mcnUrl = `${base}/mcn`;

  const handleTopClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (window.scrollY === 0) {
      window.location.reload();
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-[#e8d5a3]/10 bg-[#06050c]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <div className="group relative w-72">
          <a
            href="#"
            onClick={handleTopClick}
            className="relative z-10 inline-flex w-full items-center justify-center rounded-full border border-[#e8d5a3]/20 bg-[#0c0b14]/85 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f5f0e8]/85 shadow-[0_4px_24px_rgba(201,169,98,0.12)] transition-colors duration-200 hover:border-[#e8d5a3]/40 hover:text-[#e8d5a3]"
          >
            <span className="whitespace-nowrap font-normal tracking-[0.32em]">
              神识咨询 · Heavenly
            </span>
          </a>
          <div className="pointer-events-none absolute left-0 top-full mt-2 w-72 translate-y-2 scale-[0.985] rounded-[2rem] border border-[#e8d5a3]/12 bg-gradient-to-b from-[#12101c]/98 to-[#0a0912]/90 p-3 opacity-0 shadow-[0_28px_65px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 after:absolute after:-top-3 after:left-0 after:h-3 after:w-full group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
            <div className="flex flex-col gap-1.5">
              <Link
                href={base}
                className="group/item block w-full rounded-2xl border border-[#c9a962]/25 bg-[#c9a962]/[0.08] px-3 py-2.5 transition-all duration-200 hover:border-[#e8d5a3]/40 hover:bg-[#c9a962]/[0.14]"
              >
                <p className="text-base font-medium text-[#f5f0e8]/90 transition-colors group-hover/item:text-[#e8d5a3]">
                  Wokki.com
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a962]/80">
                  人间 · Main Site
                </p>
              </Link>
              <Link
                href={consultancyUrl}
                className="group/item block w-full rounded-2xl border border-transparent px-3 py-2.5 transition-all duration-200 hover:border-[#e8d5a3]/12 hover:bg-[#f5f0e8]/[0.04]"
              >
                <p className="text-base font-medium text-[#f5f0e8]/85 transition-colors group-hover/item:text-[#f5f0e8]">
                  Wokki Consultancy
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#f5f0e8]/40">
                  凡间法则 · Mortal Plane
                </p>
              </Link>
              <Link
                href={mcnUrl}
                className="group/item block w-full rounded-2xl border border-transparent px-3 py-2.5 transition-all duration-200 hover:border-[#e8d5a3]/12 hover:bg-[#f5f0e8]/[0.04]"
              >
                <p className="text-base font-medium text-[#f5f0e8]/85 transition-colors group-hover/item:text-[#f5f0e8]">
                  Wokki MCN
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#f5f0e8]/40">
                  星网 · Creator Network
                </p>
              </Link>
            </div>
          </div>
        </div>
        <nav className="flex items-center gap-5 text-[10px] uppercase tracking-[0.28em] text-[#f5f0e8]/50">
          <a
            href="#philosophy"
            className="transition-colors hover:text-[#e8d5a3]"
          >
            天启
          </a>
          <a
            href="#approach"
            className="transition-colors hover:text-[#e8d5a3]"
          >
            法门
          </a>
          <a
            href="#offerings"
            className="transition-colors hover:text-[#e8d5a3]"
          >
            服务
          </a>
          <a href="#contact" className="transition-colors hover:text-[#e8d5a3]">
            结缘
          </a>
        </nav>
      </div>
    </header>
  );
}
