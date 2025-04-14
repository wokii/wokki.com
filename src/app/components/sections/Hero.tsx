import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen pt-24 pb-16 relative flex items-center"
    >
      <div className="container mx-auto px-4">
        <div className="relative">
          <h1 className="text-4xl md:text-6xl font-bold z-10 relative">
            Software Engineer.
            <br />
            Systems Thinker.
            <br />
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
      </div>
    </section>
  );
}
