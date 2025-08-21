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
            className="border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
          >
            Explore My Work
          </a>
          <a
            href="#about"
            className="border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
          >
            About Me
          </a>
        </div>
        <div className="absolute right-4 md:right-16 bottom-0 -z-10 pointer-events-none select-none">
          <Image
            src="/hero.png"
            alt=""
            width={560}
            height={560}
            className="w-[240px] md:w-[420px] lg:w-[560px] h-auto drop-shadow-lg"
            priority
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}
