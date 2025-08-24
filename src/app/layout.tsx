import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ThemeProvider from "./theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wokki.com"),
  title: "Han Wokki – Software Engineer, Systems Thinker, Aesthetic Explorer",
  description: "I build AI products that fuse function with form.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const accentCookie = cookieStore.get("accent")?.value;
  const themeClass =
    themeCookie === "dark" ? "dark" : themeCookie === "light" ? "light" : "";
  const accentValue = /^[#][0-9a-fA-F]{3,8}$/.test(accentCookie ?? "")
    ? (accentCookie as string)
    : "#ff5f40";
  const htmlStyle = { ["--accent"]: accentValue } as React.CSSProperties;
  return (
    <html
      lang="en"
      className={themeClass}
      style={htmlStyle}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script id="prefs-no-flash" strategy="beforeInteractive">
          {`
            (function() {
              try {
                var storedTheme = localStorage.getItem('theme');
                var mql = window.matchMedia('(prefers-color-scheme: dark)');
                var theme = (storedTheme === 'dark' || storedTheme === 'light')
                  ? storedTheme
                  : (mql.matches ? 'dark' : 'light');
                var root = document.documentElement;
                if (!root.classList.contains(theme)) {
                  root.classList.remove(theme === 'dark' ? 'light' : 'dark');
                  root.classList.add(theme);
                }
                root.style.colorScheme = theme;

                var storedAccent = localStorage.getItem('accent');
                var accent = /^#[0-9a-fA-F]{3,8}$/.test(storedAccent || '') ? storedAccent : '#ff5f40';
                root.style.setProperty('--accent', accent);
              } catch (e) {}
            })();
          `}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
        <Script
          data-goatcounter="https://wokki.goatcounter.com/count"
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
