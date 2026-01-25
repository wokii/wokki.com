import React from "react";
import { headers } from "next/headers";
import ThemeToggle from "./components/theme-toggle";
import Header from "./components/header";
import Footer from "./components/footer";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Curation from "./components/sections/Curation";
import Writing from "./components/sections/Writing";
import Experience from "./components/sections/Experience";
import About from "./components/sections/About";
import ConsultancyHome from "./consultancy/consultancy-home";

const isConsultancyHost = (host: string) => host.startsWith("consultancy.");

export default async function Home() {
  const host = (await headers()).get("host") ?? "";
  if (isConsultancyHost(host)) {
    return <ConsultancyHome />;
  }

  return (
    <main className="min-h-screen">
      <Header />
      <ThemeToggle />
      <Hero />
      <Projects />
      <Curation />
      <Writing />
      <Experience />
      <About />
      <Footer />
    </main>
  );
}
