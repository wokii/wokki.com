import type { Metadata } from "next";
import ConsultancyHome from "./consultancy-home";
import { CONSULTANCY_WOKKI, Zen } from "../lib/WokkiNodes";

const { meta } = Zen[CONSULTANCY_WOKKI];

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    type: "website",
    title: meta.title,
    images: [
      {
        url: "/w.png",
        width: 1600,
        height: 400,
        alt: "Wokki (W)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    images: ["/w.png"],
  },
};

export default function ConsultancyPage() {
  return <ConsultancyHome />;
}
