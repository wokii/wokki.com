import type { Metadata } from "next";
import { sasWokki } from "../lib/SasWokkiNodes";
import SasHome from "./sas-home";

const node = sasWokki;

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
        alt: "Subtle Art School · 逍遥派",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: node.meta.title,
    description: node.meta.description,
    images: [node.meta.ogImage],
  },
};

export default function SasPage() {
  return <SasHome />;
}
