import type { Metadata } from "next";
import GodHome from "./god-home";

export const metadata: Metadata = {
  title: "神识咨询 | Wokki Heavenly Consultancy",
  description:
    "解码天意。重构人生。以第一性原理统合道、佛、基督三大智慧体系，打造现代人的人生操作系统。",
  openGraph: {
    type: "website",
    title: "神识咨询 | Wokki Heavenly Consultancy",
    description:
      "Decoding the Logos. Architecting the Destiny. Wokki Heavenly Consultancy.",
    images: [
      {
        url: "/w.png",
        width: 1600,
        height: 400,
        alt: "Wokki",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "神识咨询 | Wokki Heavenly Consultancy",
    images: ["/w.png"],
  },
};

export default function GodPage() {
  return <GodHome />;
}
