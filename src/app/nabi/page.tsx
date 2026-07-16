import type { Metadata } from "next";
import { NABI_WOKKI, Zen } from "../lib/WokkiNodes";
import NabiHome from "./nabi-home";

const node = Zen[NABI_WOKKI];

export const metadata: Metadata = {
  title: node.meta.title,
  description: node.meta.description,
  openGraph: {
    type: "website",
    title: node.meta.title,
    description: node.meta.description,
    images: [
      {
        url: node.meta.ogImage,
        width: 1600,
        height: 400,
        alt: "Nabi · 月儿",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: node.meta.title,
    description: node.meta.description,
  },
};

export default function NabiPage() {
  return <NabiHome />;
}
