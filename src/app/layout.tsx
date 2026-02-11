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
    <html lang="en">
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
