"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

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

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [overrideTheme, setOverrideTheme] = useState<Theme | null>(null);
  const [systemTheme, setSystemTheme] = useState<Theme>("light");

  const theme = useMemo<Theme>(() => {
    return overrideTheme ?? systemTheme;
  }, [overrideTheme, systemTheme]);

  useEffect(() => {
    if (!("matchMedia" in window)) return;
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemTheme(mql.matches ? "dark" : "light");
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    // Only set an override attribute when the user explicitly picks a theme.
    // When absent, CSS `prefers-color-scheme` drives the default theme.
    if (overrideTheme) {
      root.dataset.theme = overrideTheme;
    } else {
      root.removeAttribute("data-theme");
    }
  }, [theme, overrideTheme]);

  const value = {
    theme,
    setTheme: (next: Theme) => {
      setOverrideTheme(next);
    },
    toggleTheme: () => {
      const next: Theme = theme === "light" ? "dark" : "light";
      setOverrideTheme(next);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
