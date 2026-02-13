"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function useTheme() {
  return useContext(ThemeProviderContext);
}

const THEME_STORAGE_KEY = "theme";

function readSavedTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
  return saved === "light" || saved === "dark" ? saved : null;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // `layout.tsx` runs a `beforeInteractive` script that sets the `dark` class
    // on `<html>` before React hydrates. Use that as the initial source of truth
    // to avoid hydration mismatch / flashes.
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }, [theme]);

  // If the visitor hasn't chosen a theme explicitly, stay in sync with system
  // preference changes.
  useEffect(() => {
    const saved = readSavedTheme();
    if (saved) return;
    if (!("matchMedia" in window)) return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      // If the user later picks a theme explicitly, don't keep overriding it.
      if (readSavedTheme()) return;
      setThemeState(mql.matches ? "dark" : "light");
    };
    onChange();

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const value = {
    theme,
    setTheme: (next: Theme) => {
      setThemeState(next);
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    },
    toggleTheme: () => {
      const next: Theme = theme === "light" ? "dark" : "light";
      setThemeState(next);
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
