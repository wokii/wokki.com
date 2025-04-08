import React from "react";
import Image from "next/image";
import ThemeToggle from "./components/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="relative">
            <h1 className="text-6xl font-bold z-10 relative">
              Software Engineer.<br />
              Systems Thinker.<br />
              Aesthetic Explorer.
            </h1>
            <div className="absolute right-0 top-0 -z-10">
              <Image 
                src="/accent-circle.svg" 
                alt="" 
                width={250} 
                height={250} 
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xl">I build AI products that fuse function with form.</p>
          </div>
          <div className="mt-8 flex gap-4">
            <a href="#work" className="border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors">
              Explore My Work
            </a>
            <a href="#about" className="border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors">
              About Me
            </a>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-16 border-t border-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-bold mb-8">WORK</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-foreground text-background p-8">
              <h3 className="text-3xl">AI Coaching App</h3>
            </div>
            <div className="border border-foreground p-8">
              <h3 className="text-3xl">Coming Soon</h3>
            </div>
            <div className="border border-foreground p-8">
              <h3 className="text-3xl">Insight System for<br />Behavior Change</h3>
            </div>
            <div className="p-8">
              <p>
                Passionate about the harmony of technology, design, and human experience. 
                Constantly exploring new ideas and pushing boundaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Writing Section */}
      <section id="writing" className="py-16 border-t border-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-bold mb-8">WRITING</h2>
          <article>
            <h3 className="text-3xl">Latest Post Title</h3>
            <p>April 24, 2024</p>
          </article>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 border-t border-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-bold mb-8">EXPERIENCE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-3xl">Currently</h3>
              <p className="text-2xl">JPMorgan</p>
            </div>
            <div>
              <h3 className="text-3xl">Previously</h3>
              <p className="text-2xl">Bloomberg, stealth startup</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
