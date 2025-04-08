import React from "react";
import Image from "next/image";
import ThemeToggle from "./components/theme-toggle";
import Header from "./components/header";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <ThemeToggle />
      
      {/* Hero Section */}
      <section className="min-h-screen pt-24 pb-16 relative flex items-center">
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
      <section id="work" className="min-h-screen py-16 border-t border-foreground flex items-center">
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
      <section id="writing" className="min-h-screen py-16 border-t border-foreground flex items-center">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-bold mb-8">WRITING</h2>
          <article>
            <h3 className="text-3xl">Latest Post Title</h3>
            <p>April 24, 2024</p>
          </article>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen py-16 border-t border-foreground flex items-center">
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

      {/* About Section */}
      <section id="about" className="min-h-screen py-16 border-t border-foreground flex items-center">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-bold mb-8">ABOUT</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-xl mb-4">
                I&apos;m a software engineer and systems thinker passionate about building AI products 
                that merge elegant design with powerful functionality.
              </p>
              <p className="text-xl">
                With experience across fintech and startups, I bring a unique perspective to 
                solving complex problems through technology and design.
              </p>
            </div>
            <div>
              <h3 className="text-2xl mb-4">Contact</h3>
              <p className="mb-2">
                <a href="mailto:hello@example.com" className="underline hover:text-accent transition-colors">
                  hello@example.com
                </a>
              </p>
              <p>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">
                  GitHub
                </a>
                {" • "}
                <a href="https://www.linkedin.com/in/christine-hui-5697b2270/" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">
                  My Wife&apos;s LinkedIn, She does marketing and is open to jobs.
                </a>
                {" • "}
                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">
                  Twitter
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
