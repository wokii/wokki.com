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
const THEME_COOKIE_KEY = "theme";
const THEME_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year

function readCookieTheme(): Theme | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${THEME_COOKIE_KEY}=([^;]*)`),
  );
  if (!match) return null;
  try {
    const value = decodeURIComponent(match[1] ?? "");
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function writeThemeCookie(theme: Theme) {
  // Avoid `Secure` so it still works on localhost.
  document.cookie = `${THEME_COOKIE_KEY}=${encodeURIComponent(theme)}; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
}

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
    const saved = readSavedTheme() ?? readCookieTheme();
    if (saved) return;
    if (!("matchMedia" in window)) return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      // If the user later picks a theme explicitly, don't keep overriding it.
      if (readSavedTheme() ?? readCookieTheme()) return;
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
      writeThemeCookie(next);
    },
    toggleTheme: () => {
      const next: Theme = theme === "light" ? "dark" : "light";
      setThemeState(next);
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
      writeThemeCookie(next);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
