"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import AuthControls from "./auth/AuthControls";
import { WOKKI_DOT_COM } from "../lib/WokkiNodes";

const colorOptions = [
  "#ef4444", // red
  "#ff5f40", // orange
  "#f59e0b", // yellow
  "#10b981", // green
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#8b5cf6", // violet
];

const defaultNetworkLinks = {
  home: `https://${WOKKI_DOT_COM}`,
  consultancy: `https://${WOKKI_DOT_COM}/consultancy`,
  node: `https://node.${WOKKI_DOT_COM}`,
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
    consultancy: `${protocol}://${baseDomain}/consultancy`,
    node: `${protocol}://node.${baseDomain}`,
  };
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accentColor, setAccentColor] = useState<string>("#ff5f40");
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);
  const [networkLinks, setNetworkLinks] = useState(defaultNetworkLinks);

  useEffect(() => {
    setNetworkLinks(getNetworkLinks(window.location.host));
  }, []);

  useEffect(() => {
    const computed = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    if (computed) {
      setAccentColor(computed);
    }
  }, []);

  const applyAccent = (hex: string) => {
    document.documentElement.style.setProperty("--accent", hex);
    setAccentColor(hex);
    setIsColorPaletteOpen(false);
  };

  const handleBrandClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (window.scrollY <= 0) {
      window.location.reload();
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Keep favicon color in sync with the current accent color
  useEffect(() => {
    const updateFaviconWithAccent = (hexColor: string) => {
      // Inline the W path used for the site mark
      const wPathD =
        "M46.764 32.192h12.607L74.976 69.37l18.605-39.636 18.765 39.636 15.925-37.155 12.573-.023-28.656 64.974-18.551-40.943-18.853 40.816-28.02-64.847z";

      const svgMarkup = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 192.756 192.756\">\n  <g transform=\"translate(96.378 96.378) scale(1.5) translate(-96.378 -96.378) translate(2.6 33)\">\n    <path fill=\"${hexColor}\" d=\"${wPathD}\"/>\n  </g>\n</svg>`;

      const dataUrl = `data:image/svg+xml,${encodeURIComponent(svgMarkup)}`;

      let linkEl = document.querySelector(
        'link[rel="icon"][type="image/svg+xml"]',
      ) as HTMLLinkElement | null;
      if (!linkEl) {
        linkEl = document.querySelector(
          'link[rel="icon"]',
        ) as HTMLLinkElement | null;
      }

      if (linkEl) {
        linkEl.type = "image/svg+xml";
        linkEl.href = dataUrl;
        linkEl.sizes = "any";
      } else {
        const newLink = document.createElement("link");
        newLink.rel = "icon";
        newLink.type = "image/svg+xml";
        newLink.sizes = "any";
        newLink.href = dataUrl;
        document.head.appendChild(newLink);
      }
    };

    updateFaviconWithAccent(accentColor);
  }, [accentColor]);

  const ColorButton = ({
    hex,
    isSelected,
  }: {
    hex: string;
    isSelected: boolean;
  }) => (
    <button
      onClick={() => applyAccent(hex)}
      className={`h-5 w-5 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-accent ${
        isSelected
          ? "ring-2 ring-accent -translate-y-0.5 opacity-100"
          : "opacity-40 hover:opacity-100 focus-visible:opacity-100"
      }`}
      style={{ backgroundColor: hex, borderColor: "rgba(0,0,0,0.2)" }}
      aria-label={`Set accent color ${hex}`}
      title={`Accent ${hex}`}
    />
  );

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <Link
      href={href}
      className="inline-block hover:text-accent transition-colors relative group py-1"
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/81 backdrop-blur-sm border-b border-foreground/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        <div className="flex items-center">
          <div className="relative group before:absolute before:left-0 before:right-0 before:top-full before:h-3 before:content-['']">
            <button
              type="button"
              className="font-bold text-xl relative"
              onClick={handleBrandClick}
              aria-label="Go to top"
            >
              <span className="text-foreground group-hover:text-accent transition-colors">
                Wokki
              </span>
              <span className="text-accent group-hover:text-foreground transition-colors">
                .com
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </button>
            <div className="pointer-events-none absolute left-0 top-full mt-3 w-56 rounded-2xl border border-foreground/10 bg-background/90 p-3 text-xs shadow-lg backdrop-blur transition-all duration-200 opacity-0 translate-y-1 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0">
              <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/45">
                Wokki Network
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={networkLinks.home}
                  className="rounded-xl px-3 py-2 text-sm transition-colors hover:bg-foreground/5 hover:text-accent"
                >
                  I&apos;m Wokki (Here)
                </a>
                <a
                  href={networkLinks.consultancy}
                  className="rounded-xl px-3 py-2 text-sm transition-colors hover:bg-foreground/5 hover:text-accent"
                >
                  Wokki Consultancy
                </a>
                <a
                  href={networkLinks.node}
                  className="rounded-xl px-3 py-2 text-sm transition-colors hover:bg-foreground/5 hover:text-accent"
                >
                  Wokki Node
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop color selector */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 z-10">
          {colorOptions.map((hex) => (
            <ColorButton key={hex} hex={hex} isSelected={accentColor === hex} />
          ))}
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center space-x-8">
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#curation">Curation</NavLink>
            <NavLink href="#writing">Writing</NavLink>
            <NavLink href="#scroll">Scroll</NavLink>
            <NavLink href="#about">About</NavLink>
          </nav>
          <AuthControls />
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          {/* Color palette */}
          <div className="relative">
            <button
              className="p-2"
              onClick={() => {
                setIsColorPaletteOpen(!isColorPaletteOpen);
                setIsMenuOpen(false);
              }}
              aria-label="Toggle color palette"
              aria-expanded={isColorPaletteOpen}
              aria-controls="mobile-color-palette"
            >
              <div
                className="w-6 h-6 rounded-full border-2 border-foreground/20"
                style={{ backgroundColor: accentColor }}
              />
            </button>

            {/* Color palette dropdown */}
            <div
              id="mobile-color-palette"
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background border border-foreground/10 rounded-2xl shadow-lg z-20 overflow-hidden transition-all duration-200 ease-out transform-gpu origin-top px-3 py-2 ${
                isColorPaletteOpen
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 -translate-y-1 scale-95 pointer-events-none"
              }`}
              aria-hidden={!isColorPaletteOpen}
            >
              <div className="flex flex-col items-center gap-2">
                {colorOptions.map((hex) => (
                  <ColorButton
                    key={hex}
                    hex={hex}
                    isSelected={accentColor === hex}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Menu button */}
          <button
            className="p-2"
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsColorPaletteOpen(false);
            }}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background p-4 border-b border-foreground/10">
          <nav className="flex flex-col space-y-4 items-end">
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#curation">Curation</NavLink>
            <NavLink href="#writing">Writing</NavLink>
            <NavLink href="#scroll">Scroll</NavLink>
            <NavLink href="#about">About</NavLink>
            <AuthControls />
          </nav>
        </div>
      )}
    </header>
  );
}
