import type { Metadata } from "next";
import GodHome from "./god-home";

export const metadata: Metadata = {
  title: "神识咨询 · Wokki Heavenly Consultancy",
  description:
    "解码天意。重构人生。Decoding the Logos. Architecting the Destiny. — 以第一性原理打通科技、心理与宇宙法则的底层逻辑。",
  openGraph: {
    type: "website",
    title: "神识咨询 · Wokki Heavenly Consultancy",
    description:
      "Decoding the Logos. Architecting the Destiny. — A unified taxonomy of Dao, Logos, and Buddha-mind, engineered as a Life Operating System.",
    images: [
      {
        url: "/w.png",
        width: 1600,
        height: 400,
        alt: "Wokki (W) · 神识咨询",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "神识咨询 · Wokki Heavenly Consultancy",
    images: ["/w.png"],
  },
};

export default function GodPage() {
  return <GodHome />;
}
