import React from "react";
import ThemeToggle from "./components/theme-toggle";
import Header from "./components/header";
import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Writing from "./components/sections/Writing";
import Experience from "./components/sections/Experience";
import About from "./components/sections/About";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <ThemeToggle />
      <Hero />
      <Projects />
      <Writing />
      <Experience />
      <About />
    </main>
  );
}
