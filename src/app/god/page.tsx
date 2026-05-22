import type { Metadata } from "next";
import GodHome from "./god-home";

export const metadata: Metadata = {
  title: "神识·修道场 · The Wokki Cultivation Dojo",
  description:
    "神仙本是凡人变，只怕凡人之不坚定。A peach-source cultivation dojo — twelve disciples per cohort, six months from sealing to ascension, lifetime fellowship after. The YC of becoming-immortal.",
  openGraph: {
    type: "website",
    title: "神识·修道场 · The Wokki Cultivation Dojo",
    description:
      "「神仙本是凡人变，只怕凡人之不坚定。」名师指点，同修结伴；六个月一届，十二人一批。A YC for becoming-immortal — cohorts of twelve, six-month inner-alchemy cycle.",
    images: [
      {
        url: "/w.png",
        width: 1600,
        height: 400,
        alt: "Wokki · 修道场",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "神识·修道场 · The Wokki Cultivation Dojo",
    images: ["/w.png"],
  },
};

export default function GodPage() {
  return <GodHome />;
}
