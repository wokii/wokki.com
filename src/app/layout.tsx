import type { Metadata } from "next";
import Script from "next/script";
import { WOKKI_DOT_COM, Zen } from "./lib/WokkiNodes";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL(`https://${WOKKI_DOT_COM}`),
  title: `Han Wokki – ${Zen[WOKKI_DOT_COM].hero.titles
    .map((item) => item.title)
    .join(", ")}`,
  description: "I build AI products that fuse function with form.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">{`(() => {
  try {
    var root = document.documentElement;
    var THEME_KEY = "theme";

    var saved = localStorage.getItem(THEME_KEY);
    var theme = (saved === "light" || saved === "dark") ? saved : null;

    if (!theme) {
      var prefersDark = false;
      try {
        prefersDark =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
      } catch {}
      theme = prefersDark ? "dark" : "light";
    }

    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  } catch {}
})();`}</Script>
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
        <Script
          data-goatcounter="https://wokki.goatcounter.com/count"
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
