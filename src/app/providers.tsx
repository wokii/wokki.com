"use client";

import { SessionProvider } from "next-auth/react";

import VisitTracker from "./components/analytics/VisitTracker";
import ThemeProvider from "./theme-provider";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <VisitTracker />
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
}
