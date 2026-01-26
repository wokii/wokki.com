"use client";

import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
};

const DEFAULT_COORDINATES = {
  lat: 37.7749,
  lon: -122.4194,
};

const REGION_COORDINATES: Record<string, { lat: number; lon: number }> = {
  US: { lat: 39.8283, lon: -98.5795 },
  CA: { lat: 56.1304, lon: -106.3468 },
  MX: { lat: 23.6345, lon: -102.5528 },
  BR: { lat: -14.235, lon: -51.9253 },
  AR: { lat: -38.4161, lon: -63.6167 },
  CL: { lat: -35.6751, lon: -71.543 },
  GB: { lat: 55.3781, lon: -3.436 },
  IE: { lat: 53.4129, lon: -8.2439 },
  FR: { lat: 46.2276, lon: 2.2137 },
  DE: { lat: 51.1657, lon: 10.4515 },
  ES: { lat: 40.4637, lon: -3.7492 },
  IT: { lat: 41.8719, lon: 12.5674 },
  NL: { lat: 52.1326, lon: 5.2913 },
  SE: { lat: 60.1282, lon: 18.6435 },
  NO: { lat: 60.472, lon: 8.4689 },
  DK: { lat: 56.2639, lon: 9.5018 },
  PL: { lat: 51.9194, lon: 19.1451 },
  RU: { lat: 61.524, lon: 105.3188 },
  ZA: { lat: -30.5595, lon: 22.9375 },
  EG: { lat: 26.8206, lon: 30.8025 },
  AE: { lat: 23.4241, lon: 53.8478 },
  SA: { lat: 23.8859, lon: 45.0792 },
  IN: { lat: 20.5937, lon: 78.9629 },
  CN: { lat: 35.8617, lon: 104.1954 },
  JP: { lat: 36.2048, lon: 138.2529 },
  KR: { lat: 35.9078, lon: 127.7669 },
  TW: { lat: 23.6978, lon: 120.9605 },
  HK: { lat: 22.3193, lon: 114.1694 },
  SG: { lat: 1.3521, lon: 103.8198 },
  TH: { lat: 15.87, lon: 100.9925 },
  ID: { lat: -0.7893, lon: 113.9213 },
  AU: { lat: -25.2744, lon: 133.7751 },
  NZ: { lat: -40.9006, lon: 174.886 },
};

const resolveCoordinates = (locale?: string | null) => {
  if (!locale) return DEFAULT_COORDINATES;
  const normalized = locale.replace("_", "-");
  const region = normalized.split("-")[1]?.toUpperCase();
  if (region && REGION_COORDINATES[region]) {
    return REGION_COORDINATES[region];
  }
  return DEFAULT_COORDINATES;
};

const toRadians = (value: number) => (value * Math.PI) / 180;

const getDayOfYear = (date: Date) => {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const current = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((current - start) / 86400000);
};

const estimateSunTimes = (date: Date, latitude: number) => {
  const dayOfYear = getDayOfYear(date);
  const declination = 23.44 * Math.sin((2 * Math.PI * (dayOfYear - 81)) / 365);
  const latRad = toRadians(latitude);
  const declRad = toRadians(declination);
  const cosHourAngle = -Math.tan(latRad) * Math.tan(declRad);

  if (cosHourAngle >= 1) {
    return { sunrise: 0, sunset: 0, polarNight: true, polarDay: false };
  }
  if (cosHourAngle <= -1) {
    return { sunrise: 0, sunset: 24, polarNight: false, polarDay: true };
  }

  const hourAngle = Math.acos(cosHourAngle);
  const dayLengthHours = (2 * hourAngle * 24) / (2 * Math.PI);
  const sunrise = 12 - dayLengthHours / 2;
  const sunset = 12 + dayLengthHours / 2;

  return { sunrise, sunset, polarNight: false, polarDay: false };
};

const getTimeAsHours = (date: Date) => date.getHours() + date.getMinutes() / 60;

const buildDateWithHours = (baseDate: Date, hours: number) => {
  const date = new Date(baseDate);
  const hour = Math.floor(hours);
  const minutes = Math.round((hours - hour) * 60);
  date.setHours(hour, minutes, 0, 0);
  return date;
};

const resolveSunTheme = (locale?: string | null) => {
  const { lat } = resolveCoordinates(locale);
  const now = new Date();
  const { sunrise, sunset, polarDay, polarNight } = estimateSunTimes(now, lat);
  if (polarDay) return "light";
  if (polarNight) return "dark";
  const currentHours = getTimeAsHours(now);
  return currentHours >= sunrise && currentHours < sunset ? "light" : "dark";
};

const getNextTransitionDelay = (locale?: string | null) => {
  const { lat } = resolveCoordinates(locale);
  const now = new Date();
  const todayTimes = estimateSunTimes(now, lat);

  if (todayTimes.polarDay || todayTimes.polarNight) {
    return 12 * 60 * 60 * 1000;
  }

  const nowHours = getTimeAsHours(now);
  let nextTransition: Date | null = null;

  if (nowHours < todayTimes.sunrise) {
    nextTransition = buildDateWithHours(now, todayTimes.sunrise);
  } else if (nowHours < todayTimes.sunset) {
    nextTransition = buildDateWithHours(now, todayTimes.sunset);
  } else {
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const tomorrowTimes = estimateSunTimes(tomorrow, lat);
    if (!tomorrowTimes.polarDay && !tomorrowTimes.polarNight) {
      nextTransition = buildDateWithHours(tomorrow, tomorrowTimes.sunrise);
    }
  }

  if (!nextTransition) {
    return 12 * 60 * 60 * 1000;
  }

  return Math.max(nextTransition.getTime() - now.getTime(), 60 * 1000);
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function useTheme() {
  return useContext(ThemeProviderContext);
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { data: session } = useSession();
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const userLocale = session?.user?.locale ?? null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setThemeState(storedTheme);
      return;
    }
    if (storedTheme) {
      localStorage.removeItem("theme");
    }
    setThemeState(resolveSunTheme(userLocale));
  }, [mounted, userLocale]);

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      return;
    }
    const timer = window.setTimeout(() => {
      setThemeState(resolveSunTheme(userLocale));
    }, getNextTransitionDelay(userLocale));

    return () => window.clearTimeout(timer);
  }, [mounted, theme, userLocale]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setThemeState(theme);
      localStorage.setItem("theme", theme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
