"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  accent: string;
  setAccent: (hex: string) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => null,
  accent: "#ff5f40",
  setAccent: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function useTheme() {
  return useContext(ThemeProviderContext);
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return "system";
  });
  const [accent, setAccentState] = useState<string>(() => {
    if (typeof window === "undefined") return "#ff5f40";
    const stored = localStorage.getItem("accent");
    return /^#[0-9a-fA-F]{3,8}$/.test(stored ?? "")
      ? (stored as string)
      : "#ff5f40";
  });

  const resolvedTheme = useMemo<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme;
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const next = resolvedTheme;
    if (!root.classList.contains(next)) {
      root.classList.remove(next === "dark" ? "light" : "dark");
      root.classList.add(next);
    }
    root.style.colorScheme = next;
  }, [resolvedTheme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.style.setProperty("--accent", accent);
  }, [accent]);

  useEffect(() => {
    if (theme !== "system") return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const root = window.document.documentElement;
      const next = mql.matches ? "dark" : "light";
      if (!root.classList.contains(next)) {
        root.classList.remove(next === "dark" ? "light" : "dark");
        root.classList.add(next);
      }
      root.style.colorScheme = next;
    };
    mql.addEventListener?.("change", handleChange);
    return () => mql.removeEventListener?.("change", handleChange);
  }, [theme]);

  const value: ThemeProviderState = {
    theme,
    resolvedTheme,
    setTheme: (next: Theme) => {
      setTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch {}
      try {
        document.cookie = `theme=${encodeURIComponent(next)}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      } catch {}
    },
    accent,
    setAccent: (hex: string) => {
      const valid = /^#[0-9a-fA-F]{3,8}$/.test(hex) ? hex : "#ff5f40";
      setAccentState(valid);
      try {
        localStorage.setItem("accent", valid);
      } catch {}
      try {
        document.cookie = `accent=${encodeURIComponent(valid)}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
      } catch {}
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
