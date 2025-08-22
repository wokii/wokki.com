"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accentColor, setAccentColor] = useState<string>("#ff5f40");

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
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

        {/* Centered Accent color selector (desktop) */}
        <div
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 z-10"
          aria-label="Accent color selector"
        >
          {[
            "#ef4444", // red
            "#ff5f40", // orange
            "#f59e0b", // yellow
            "#10b981", // green
            "#3b82f6", // blue
            "#6366f1", // indigo
            "#8b5cf6", // violet
          ].map((hex) => (
            <button
              key={hex}
              onClick={() => applyAccent(hex)}
              className={`relative h-5 w-5 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-accent ${
                accentColor === hex
                  ? "ring-2 ring-accent -translate-y-0.5 opacity-100"
                  : "opacity-40 hover:opacity-100 focus-visible:opacity-100"
              }`}
              style={{ backgroundColor: hex, borderColor: "rgba(0,0,0,0.2)" }}
              aria-label={`Set accent color ${hex}`}
              title={`Accent ${hex}`}
            />
          ))}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#projects"
            className="hover:text-accent transition-colors relative group py-1"
          >
            Projects
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="#writing"
            className="hover:text-accent transition-colors relative group py-1"
          >
            Writing
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="#experience"
            className="hover:text-accent transition-colors relative group py-1"
          >
            Experience
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="#about"
            className="hover:text-accent transition-colors relative group py-1"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={toggleMenu}
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background p-4 border-b border-foreground/10">
          <nav className="flex flex-col space-y-4">
            <Link
              href="#projects"
              className="hover:text-accent transition-colors relative group py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#writing"
              className="hover:text-accent transition-colors relative group py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Writing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#experience"
              className="hover:text-accent transition-colors relative group py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Experience
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="#about"
              className="hover:text-accent transition-colors relative group py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
