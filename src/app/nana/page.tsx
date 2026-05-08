import type { Metadata } from "next";
import { NANA_WOKKI, Zen } from "../lib/WokkiNodes";
import NanaHome from "./nana-home";

const node = Zen[NANA_WOKKI];

export const metadata: Metadata = {
  title: node.meta.title,
  description: node.meta.description,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    title: node.meta.title,
    description: node.meta.description,
    images: [
      {
        url: node.meta.ogImage,
        width: 1600,
        height: 400,
        alt: "Wokki",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: node.meta.title,
  },
};

export default function NanaPage() {
  return <NanaHome />;
}
