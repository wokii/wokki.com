import type { Metadata } from "next";
import ConsultancyHome from "./consultancy-home";

export const metadata: Metadata = {
  title: "Wokki Consultancy - The All Knowing Consultancy",
  openGraph: {
    type: "website",
    title: "Wokki Consultancy - The All Knowing Consultancy",
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
    title: "Wokki Consultancy - The All Knowing Consultancy",
    images: ["/w.png"],
  },
};

export default function ConsultancyPage() {
  return <ConsultancyHome />;
}
