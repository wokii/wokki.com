"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NABI_WOKKI, WOKKI_DOT_COM, Zen } from "../lib/WokkiNodes";

const node = Zen[NABI_WOKKI];

const defaultNetworkLinks = {
  home: `https://${WOKKI_DOT_COM}`,
  nabi: `https://${WOKKI_DOT_COM}/nabi`,
  nana: `https://${WOKKI_DOT_COM}/nana`,
  consultancy: `https://${WOKKI_DOT_COM}/consultancy`,
};

const getNetworkLinks = (host: string) => {
  const hostname = host.split(":")[0];
  const port = host.split(":")[1];
  const isLocalhost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".localhost");
  const protocol = isLocalhost ? "http" : "https";
  const baseDomain = isLocalhost
    ? `localhost${port ? `:${port}` : ""}`
    : WOKKI_DOT_COM;

  return {
    home: `${protocol}://${baseDomain}`,
    nabi: `${protocol}://${baseDomain}/nabi`,
    nana: `${protocol}://${baseDomain}/nana`,
    consultancy: `${protocol}://${baseDomain}/consultancy`,
  };
};

export default function NabiHeader() {
  const { header } = node;
  const [networkLinks, setNetworkLinks] = useState(defaultNetworkLinks);

  useEffect(() => {
    setNetworkLinks(getNetworkLinks(window.location.host));
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-[#f9c5d1]/10 bg-[#0d0f18]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <div className="relative group">
          <Link
            href="/nabi"
            className="flex flex-col gap-0.5 transition-opacity hover:opacity-90"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#f9c5d1]/90">
              {header.brandLabel}
            </span>
            <span className="text-[9px] uppercase tracking-[0.32em] text-white/35">
              {header.brandSub}
            </span>
          </Link>
          <div className="pointer-events-none absolute left-0 top-full mt-3 w-56 rounded-2xl border border-[#f9c5d1]/15 bg-[#0d0f18]/95 p-3 text-xs shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur transition-all duration-200 opacity-0 translate-y-1 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-has-[:focus-visible]:pointer-events-auto group-has-[:focus-visible]:opacity-100 group-has-[:focus-visible]:translate-y-0">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              Wokki Network
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <a
                href={networkLinks.nabi}
                className="rounded-xl px-3 py-2 text-sm text-[#f9c5d1] transition-colors hover:bg-white/5"
              >
                月儿 · Nabi (Here)
              </a>
              <a
                href={networkLinks.home}
                className="rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/5 hover:text-[#ff5f40]"
              >
                Wokki · 阳
              </a>
              <a
                href={networkLinks.nana}
                className="rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/5 hover:text-white/80"
              >
                Nana Setlist
              </a>
              <a
                href={networkLinks.consultancy}
                className="rounded-xl px-3 py-2 text-sm transition-colors hover:bg-white/5 hover:text-white/80"
              >
                Wokki Consultancy
              </a>
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-5 text-[10px] uppercase tracking-[0.28em] text-white/50">
          <a
            href="#philosophy"
            className="hidden transition-colors hover:text-[#f9c5d1] sm:inline"
          >
            {header.nav.brand}
          </a>
          <a
            href="#collections"
            className="transition-colors hover:text-[#f9c5d1]"
          >
            {header.nav.collections}
          </a>
          <a href="#duality" className="transition-colors hover:text-[#f9c5d1]">
            {header.nav.duality}
          </a>
          <Link
            href={header.nav.yang.href}
            className="rounded-full border border-[#ff5f40]/30 px-3 py-1 text-[#ff5f40]/80 transition-all hover:border-[#ff5f40] hover:bg-[#ff5f40]/10 hover:text-[#ff5f40]"
          >
            {header.nav.yang.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
