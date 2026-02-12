import React from "react";
import Image from "next/image";
import Section from "./Section";
import { WOKKI_DOT_COM, Zen } from "../../lib/WokkiNodes";

export default function Hero() {
  const { hero } = Zen[WOKKI_DOT_COM];
  const primaryCta = hero.ctas.find((cta) => cta.variant === "primary");
  const secondaryCta = hero.ctas.find((cta) => cta.variant === "secondary");
  return (
    <Section
      id="hero"
      minHeight="svh"
      paddingY="none"
      withTopBorder={false}
      centerContent={true}
      className="relative w-full overflow-x-clip"
      containerClassName="md:relative -mt-6 md:mt-0"
    >
      <div className="relative">
        <h1 className="text-3xl md:text-6xl font-bold z-10 relative text-left">
          {hero.titles.map((item, index) => (
            <React.Fragment key={item.title}>
              {item.title}
              <span className="ml-2 text-xs md:text-base text-foreground/50">
                {item.note}
              </span>
              {index < hero.titles.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>
      </div>
      <div className="mt-3 md:mt-4">
        <p className="text-base md:text-xl text-left text-foreground/70">
          {hero.tagline}
        </p>
      </div>
      <div className="mt-6 md:mt-8 flex max-w-xs flex-col gap-3 md:max-w-none md:flex-row md:gap-4">
        {primaryCta ? (
          <a
            href={primaryCta.href}
            className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-accent/80 bg-accent px-4 py-2.5 text-xs font-medium tracking-wide text-background shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background md:w-auto md:px-7 md:py-3 md:text-sm"
          >
            {primaryCta.label}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        ) : null}
        {secondaryCta ? (
          <a
            href={secondaryCta.href}
            className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-foreground/15 bg-background/40 px-4 py-2.5 text-xs font-medium tracking-wide text-foreground/80 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background md:w-auto md:px-7 md:py-3 md:text-sm"
          >
            {secondaryCta.label}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        ) : null}
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 -z-10 translate-y-0 select-none md:right-16 md:translate-y-20 lg:translate-y-24">
        <Image
          src="/hero.png"
          alt=""
          width={560}
          height={560}
          sizes="(min-width: 1024px) 32vw, (min-width: 768px) 45vw, 75vw"
          className="h-auto w-[clamp(210px,68vw,600px)] origin-bottom-right drop-shadow-lg scale-[0.81] md:w-[clamp(240px,45vw,560px)]"
          priority
          aria-hidden="true"
        />
      </div>
    </Section>
  );
}
