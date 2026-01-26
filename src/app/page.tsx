import React from "react";
import ThemeToggle from "./components/theme-toggle";
import Header from "./components/header";
import Footer from "./components/footer";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Curation from "./components/sections/Curation";
import Writing from "./components/sections/Writing";
import Scroll from "./components/sections/Scroll";
import About from "./components/sections/About";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <ThemeToggle />
      <Hero />
      <Projects />
      <Curation />
      <Writing />
      <Scroll />
      <About />
      <Footer />
    </main>
  );
}
