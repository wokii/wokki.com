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
  description: "The Philosopher of 21st Century",
  authors: [{ name: "Wokki", url: `https://${WOKKI_DOT_COM}` }],
  creator: "Wokki",
  openGraph: {
    type: "website",
    siteName: "Wokki",
    images: [
      {
        url: "/w.png",
        alt: "Wokki (W)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@hanwokki",
    images: ["/w.png"],
  },
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
