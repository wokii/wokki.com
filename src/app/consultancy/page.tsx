import type { Metadata } from "next";
import ConsultancyHome from "./consultancy-home";

export const metadata: Metadata = {
  title: "Wokki Consultancy - The All Knowing Consultancy",
};

export default function ConsultancyPage() {
  return <ConsultancyHome />;
}
