"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

const colorOptions = [
  "#ef4444", // red
  "#ff5f40", // orange
  "#f59e0b", // yellow
  "#10b981", // green
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#8b5cf6", // violet
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accentColor, setAccentColor] = useState<string>("#ff5f40");
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("accentColor");
    if (saved) {
      document.documentElement.style.setProperty("--accent", saved);
      setAccentColor(saved);
      return;
    }
    const computed = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim();
    if (computed) {
      setAccentColor(computed);
    }
  }, []);

  const applyAccent = (hex: string) => {
    document.documentElement.style.setProperty("--accent", hex);
    localStorage.setItem("accentColor", hex);
    setAccentColor(hex);
    setIsColorPaletteOpen(false);
  };

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
      className="hover:text-accent transition-colors relative group py-1"
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-foreground/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
        <div className="flex items-center">
          <Link href="#hero" className="font-bold text-xl relative group">
            <span className="text-foreground group-hover:text-accent transition-colors">
              I&apos;m{" "}
            </span>
            <span className="text-accent group-hover:text-foreground transition-colors">
              Wokki
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Desktop color selector */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 z-10">
          {colorOptions.map((hex) => (
            <ColorButton key={hex} hex={hex} isSelected={accentColor === hex} />
          ))}
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#writing">Writing</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#about">About</NavLink>
        </nav>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          {/* Color palette button */}
          <button
            className="relative p-2"
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
          </button>

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
          <nav className="flex flex-col space-y-4">
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#writing">Writing</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#about">About</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
