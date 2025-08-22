import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen pt-24 pb-16 relative flex items-center"
    >
      <div className="container mx-auto px-4 relative">
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold z-10 relative">
            Software Engineer
            <br />
            Systems Thinker
            <br />
            Aesthetic Explorer
          </h1>
        </div>
        <div className="mt-4">
          <p className="text-xl">
            I build AI products that fuse function with form.
          </p>
        </div>
        <div className="mt-8 flex gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-6 py-3 font-medium tracking-wide text-background shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Explore My Work
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href="#about"
            className="group inline-flex items-center gap-2 rounded-md border border-accent/60 px-6 py-3 font-medium tracking-wide text-accent transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            About Me
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
        <div className="absolute right-4 md:right-16 bottom-0 translate-y-12 md:translate-y-20 lg:translate-y-24 -z-10 pointer-events-none select-none">
          <Image
            src="/hero.png"
            alt=""
            width={560}
            height={560}
            sizes="(min-width: 1024px) 32vw, (min-width: 768px) 45vw, 60vw"
            className="w-[clamp(240px,45vw,560px)] h-auto drop-shadow-lg"
            priority
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
