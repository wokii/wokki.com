import React from "react";
import Image from "next/image";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { WOKKI_DOT_COM, Zen } from "../../lib/WokkiNodes";

export default function About() {
  const { about, hero } = Zen[WOKKI_DOT_COM];
  const iconForLink = (platform: string) => {
    const icons: Record<string, string> = {
      github: "/social-media-svg/004-github.svg",
      linkedin: "/social-media-svg/002-linkedin.svg",
      x: "/social-media-svg/003-twitter.svg",
      twitter: "/social-media-svg/003-twitter.svg",
      instagram: "/social-media-svg/001-instagram.svg",
      tiktok: "/social-media-svg/005-tik-tok.svg",
      tiktokCn: "/social-media-svg/006-tik-tok-1.svg",
      gmail: "/social-media-svg/007-gmail.svg",
      youtube: "/social-media-svg/009-youtube.svg",
    };

    return icons[platform] ?? icons.instagram;
  };
  return (
    <Section id="about" minHeight="screen" paddingY="md" centerContent={false}>
      <div className="relative">
        <div className="absolute inset-0 -z-10 pointer-events-none select-none">
          <div className="absolute left-[-8%] top-[5%] h-[320px] w-[320px] rounded-full bg-foreground/5 blur-[120px]" />
        </div>
        <SectionTitle>ABOUT</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 md:gap-10">
          <div className="relative overflow-hidden rounded-3xl bg-background/70 p-6 md:p-8 shadow-[0_18px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-foreground/5 blur-[90px]" />
            <div className="pointer-events-none absolute -right-16 top-10 h-40 w-40 rounded-full bg-accent/10 blur-[80px]" />
            <p className="text-xl md:text-2xl leading-relaxed text-foreground/90">
              I&apos;m a{" "}
              {hero.titles.map((item, index) => (
                <React.Fragment key={item.title}>
                  <span className="text-accent font-semibold">
                    {item.title}
                  </span>
                  {index < hero.titles.length - 2 && ", "}
                  {index === hero.titles.length - 2 && " and "}
                  {index === hero.titles.length - 1 && " "}
                </React.Fragment>
              ))}
              {about.introSuffix}
            </p>
            <p className="mt-5 text-lg md:text-xl leading-relaxed text-foreground/70">
              {about.summary}
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-background/70 p-6 pb-20 md:p-8 md:pb-24 shadow-[0_18px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="pointer-events-none absolute -left-20 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-[70px]" />
            <div className="pointer-events-none absolute -right-20 bottom-16 h-44 w-44 rounded-full bg-foreground/5 blur-[80px]" />
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-foreground/50">
                WOKKI_DOT_COM
              </p>
              <span className="text-[10px] uppercase tracking-[0.35em] text-foreground/40">
                Contact
              </span>
            </div>
            <p className="mt-4 text-2xl md:text-3xl font-semibold text-foreground/90">
              Han Wokki
            </p>
            <div className="mt-4 space-y-2 text-sm md:text-base text-foreground/70">
              <p>
                <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-foreground/50">
                  Phone
                </span>
                <span className="ml-3 font-medium text-foreground/80">
                  +(44) blurred_number
                </span>
              </p>
              <p>
                <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-foreground/50">
                  Email
                </span>
                <span className="ml-3 font-medium text-foreground/80">
                  wokkiacross@gmail.com
                </span>
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-start gap-2 border-t border-foreground/10 bg-background/85 px-6 py-4 md:px-8">
              {about.contact.links.map((link) => {
                const icon = (
                  <Image
                    src={iconForLink(link.platform)}
                    alt=""
                    width={18}
                    height={18}
                    className="social-icon h-4 w-4 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                );

                if (!link.url) {
                  return (
                    <span
                      key={`${link.platform}-${link.description}`}
                      aria-label={`${link.platform} (coming soon)`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-background/60 shadow-[0_10px_30px_rgba(0,0,0,0.08)] opacity-40 backdrop-blur"
                    >
                      {icon}
                    </span>
                  );
                }

                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.platform}: ${link.description}`}
                    className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-background/70 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/30 hover:bg-background"
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
