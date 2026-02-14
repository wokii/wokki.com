import type { Metadata } from "next";
import ConsultancyHome from "./consultancy-home";

export const metadata: Metadata = {
  title: "Wokki Consultancy - The All Knowing Consultancy",
  openGraph: {
    type: "website",
    title: "Wokki Consultancy - The All Knowing Consultancy",
    images: [
      {
        url: "/w.svg",
        width: 1600,
        height: 400,
        alt: "Wokki (W)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wokki Consultancy - The All Knowing Consultancy",
    images: ["/w.svg"],
  },
};

export default function ConsultancyPage() {
  return <ConsultancyHome />;
}
