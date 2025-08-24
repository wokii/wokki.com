"use client";

import { useTheme } from "../theme-provider";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const resolvedTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-foreground text-background z-[100] group transition duration-200 ease-out shadow-md hover:shadow-lg hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-background focus-visible:ring-offset-foreground"
      aria-label="Toggle theme"
    >
      <span
        className="block text-[20px] leading-none transition-transform duration-300 ease-out rotate-180 group-hover:rotate-0"
        aria-hidden
        style={{ fontFamily: "sans-serif" }}
      >
        ☯︎
      </span>
    </button>
  );
}
