import React from "react";
import Image from "next/image";
import Section from "./Section";

export default function Hero() {
  return (
    <Section
      id="hero"
      minHeight="svh"
      paddingY="none"
      withTopBorder={false}
      centerContent={true}
      className="relative overflow-x-hidden w-screen max-w-[100vw]"
      containerClassName="md:relative -mt-6 md:mt-0"
    >
      <div className="relative">
        <h1 className="text-3xl md:text-6xl font-bold z-10 relative text-left">
          Software Engineer
          <br />
          System Thinker
          <br />
          Aesthetic Explorer
        </h1>
      </div>
      <div className="mt-3 md:mt-4">
        <p className="text-base md:text-xl text-left">
          I build AI products that fuse function with form.
        </p>
      </div>
      <div className="mt-6 md:mt-8 flex flex-col md:flex-row gap-3 md:gap-4">
        <a
          href="#projects"
          className="group inline-flex items-center gap-1 md:gap-2 whitespace-nowrap rounded-md border border-accent bg-accent px-2 py-1.5 md:px-6 md:py-3 text-[10px] md:text-base font-medium tracking-wide text-background shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background w-[30vw] md:w-auto"
        >
          Explore My Work
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
        <a
          href="#about"
          className="group inline-flex items-center gap-1 md:gap-2 whitespace-nowrap rounded-md border border-accent/60 px-2 py-1.5 md:px-6 md:py-3 text-[10px] md:text-base font-medium tracking-wide text-accent transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background w-[30vw] md:w-auto"
        >
          About Me
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
      <div className="absolute right-2 md:right-16 bottom-0 translate-y-0 md:translate-y-20 lg:translate-y-24 -z-10 pointer-events-none select-none">
        <Image
          src="/hero.png"
          alt=""
          width={560}
          height={560}
          sizes="(min-width: 1024px) 32vw, (min-width: 768px) 45vw, 75vw"
          className="w-[clamp(240px,75vw,600px)] md:w-[clamp(240px,45vw,560px)] h-auto drop-shadow-lg scale-90 origin-bottom-right"
          priority
          aria-hidden="true"
        />
      </div>
    </Section>
  );
}
