import type { Metadata } from "next";
import Script from "next/script";
import { cookies } from "next/headers";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeCookie = (await cookies()).get("theme")?.value;
  const isDark = themeCookie === "dark";

  return (
    <html
      lang="en"
      className={isDark ? "dark" : undefined}
      style={{ colorScheme: isDark ? "dark" : "light" }}
    >
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
