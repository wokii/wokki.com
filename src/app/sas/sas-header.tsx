"use client";

import Link from "next/link";

type SasHeaderProps = {
  mainSiteUrl: string;
  nav: {
    manifesto: string;
    curriculum: string;
    arts: string;
    faculty: string;
    transmissions: string;
    admissions: string;
    contact: string;
    home: { label: string; href: string };
  };
  schoolLabel: string;
  schoolSub: string;
};

export default function SasHeader({
  mainSiteUrl,
  nav,
  schoolLabel,
  schoolSub,
}: SasHeaderProps) {
  const base = mainSiteUrl.replace(/\/$/, "");
  const godUrl = `${base}/god`;

  const handleTopClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (window.scrollY === 0) {
      window.location.reload();
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-[#a8d4c8]/10 bg-[#0a100e]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <div className="group relative w-72">
          <a
            href="#"
            onClick={handleTopClick}
            className="relative z-10 inline-flex w-full items-center justify-center rounded-full border border-[#a8d4c8]/25 bg-[#0d1512]/90 px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e8f0ec]/90 shadow-[0_4px_24px_rgba(126,184,168,0.12)] transition-colors duration-200 hover:border-[#a8d4c8]/45 hover:text-[#a8d4c8]"
          >
            <span className="whitespace-nowrap font-normal tracking-[0.28em]">
              {schoolLabel}
            </span>
          </a>
          <div className="pointer-events-none absolute left-0 top-full mt-2 w-72 translate-y-2 scale-[0.985] rounded-[2rem] border border-[#a8d4c8]/12 bg-gradient-to-b from-[#121a17]/98 to-[#0a100e]/95 p-3 opacity-0 shadow-[0_28px_65px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 after:absolute after:-top-3 after:left-0 after:h-3 after:w-full group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
            <div className="flex flex-col gap-1.5">
              <Link
                href={base}
                className="group/item block w-full rounded-2xl border border-[#7eb8a8]/25 bg-[#7eb8a8]/[0.08] px-3 py-2.5 transition-all duration-200 hover:border-[#a8d4c8]/40 hover:bg-[#7eb8a8]/[0.14]"
              >
                <p className="text-base font-medium text-[#e8f0ec]/90 transition-colors group-hover/item:text-[#a8d4c8]">
                  Wokki.com
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#7eb8a8]/80">
                  人间 · Main Site
                </p>
              </Link>
              <Link
                href={godUrl}
                className="group/item block w-full rounded-2xl border border-transparent px-3 py-2.5 transition-all duration-200 hover:border-[#a8d4c8]/12 hover:bg-[#e8f0ec]/[0.04]"
              >
                <p className="text-base font-medium text-[#e8f0ec]/85 transition-colors group-hover/item:text-[#e8f0ec]">
                  神识·修道场
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#e8f0ec]/40">
                  Cultivation Dojo
                </p>
              </Link>
            </div>
          </div>
        </div>

        <p className="hidden text-[9px] uppercase tracking-[0.32em] text-[#a8d4c8]/45 lg:block">
          {schoolSub}
        </p>

        <nav className="hidden items-center gap-4 text-[10px] uppercase tracking-[0.24em] text-[#e8f0ec]/50 md:flex">
          <a
            href="#manifesto"
            className="transition-colors hover:text-[#a8d4c8]"
          >
            {nav.manifesto}
          </a>
          <a
            href="#curriculum"
            className="transition-colors hover:text-[#a8d4c8]"
          >
            {nav.curriculum}
          </a>
          <a href="#arts" className="transition-colors hover:text-[#a8d4c8]">
            {nav.arts}
          </a>
          <a href="#faculty" className="transition-colors hover:text-[#a8d4c8]">
            {nav.faculty}
          </a>
          <a
            href="#transmissions"
            className="transition-colors hover:text-[#a8d4c8]"
          >
            {nav.transmissions}
          </a>
          <a
            href="#admissions"
            className="transition-colors hover:text-[#a8d4c8]"
          >
            {nav.admissions}
          </a>
          <a href="#contact" className="transition-colors hover:text-[#c4e8dc]">
            {nav.contact}
          </a>
        </nav>

        <nav className="flex items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-[#e8f0ec]/50 md:hidden">
          <a
            href="#transmissions"
            className="transition-colors hover:text-[#a8d4c8]"
          >
            {nav.transmissions}
          </a>
          <a
            href="#admissions"
            className="transition-colors hover:text-[#a8d4c8]"
          >
            {nav.admissions}
          </a>
          <a href="#contact" className="transition-colors hover:text-[#c4e8dc]">
            {nav.contact}
          </a>
        </nav>
      </div>
    </header>
  );
}
