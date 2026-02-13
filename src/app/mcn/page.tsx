import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "../components/theme-toggle";
import ChristineThemeImage from "./christine-theme-image";
import HeaderYoutubePlayer, {
  type PlaylistItem,
} from "./header-youtube-player";
import NextSigningCameraCard from "./next-signing-camera-card";
import WokkiThemeImage from "./wokki-theme-image";
import { MCN_WOKKI, WOKKI_DOT_COM, Zen } from "../lib/WokkiNodes";

const mcn = Zen[MCN_WOKKI];
const getYoutubeVideoId = (url: string) => {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "");
    }

    return null;
  } catch {
    return null;
  }
};

const iconForPlatform = (platform: string) => {
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

export const metadata: Metadata = {
  title: mcn.meta.title,
  description: mcn.meta.description,
};

export default function MCNPage() {
  const { header, hero, roster, contact } = mcn;
  const wokkiCom = Zen[WOKKI_DOT_COM];
  const primaryNetworkLink = header.links[0];
  const secondaryNetworkLinks = header.links.slice(1);
  const rosterCardClass =
    "relative flex min-h-[520px] flex-col justify-end overflow-hidden rounded-[2rem] border border-foreground/12 bg-gradient-to-b from-background/85 to-background/60 px-8 pt-8 pb-7";
  const socialIconClass =
    "inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:-translate-y-0.5";
  const socialTooltipClass =
    "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-foreground/20 bg-background/85 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.22em] text-foreground/80 opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 group-hover/icon:opacity-100 group-hover/icon:-translate-y-0.5 peer-focus-visible:opacity-100 peer-focus-visible:-translate-y-0.5";
  const wokkiSocials = wokkiCom.about.contact.links
    .filter((link) => Boolean(link.url))
    .map((link) => ({
      label: link.description,
      platform: link.platform,
      url: link.url as string,
    }));
  const christineSocials =
    wokkiCom.curation.kindreds
      .find((kindred) => kindred.name.toLowerCase().includes("christine"))
      ?.links.filter((link) => Boolean(link.url))
      .map((link) => ({
        label: link.label,
        platform: link.label === "抖音" ? "tiktokCn" : link.label.toLowerCase(),
        url: link.url as string,
      })) ?? [];
  const youtubePlaylist: PlaylistItem[] = wokkiCom.curation.entries
    .map((entry) => {
      const youtubeLink = entry.links.find(
        (link) => link.label.toLowerCase() === "youtube" && Boolean(link.url),
      );

      if (!youtubeLink?.url) {
        return null;
      }

      const videoId = getYoutubeVideoId(youtubeLink.url);

      if (!videoId) {
        return null;
      }

      return {
        id: `${entry.title}-${videoId}`.toLowerCase().replace(/\s+/g, "-"),
        title: entry.title,
        videoId,
      };
    })
    .filter((item): item is PlaylistItem => item !== null);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      >
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-16 bottom-20 h-72 w-72 rounded-full bg-foreground/10 blur-3xl" />
      </div>

      <header className="fixed top-0 left-0 z-50 w-full border-b border-foreground/10 bg-background/65 backdrop-blur-2xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center px-6 py-3 md:px-10">
          <div className="group relative w-64 before:absolute before:left-0 before:right-0 before:top-full before:h-3 before:content-['']">
            <div className="inline-flex h-10 w-full items-center justify-center rounded-full border border-foreground/15 bg-background/40 px-5 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/70 transition-colors duration-200 group-hover:border-accent/35 group-hover:text-accent">
              {header.networkLabel}
            </div>
            <div className="pointer-events-none absolute left-0 top-full z-20 mt-1 w-64 rounded-[1.5rem] border border-foreground/12 bg-background/92 p-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-200 opacity-0 translate-y-2 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
              <div className="flex flex-col gap-1">
                <Link
                  href={primaryNetworkLink.href}
                  className="block w-full rounded-xl border border-accent/20 bg-accent/[0.06] px-3 py-2.5 text-base font-medium text-foreground/90 transition-all duration-200 hover:border-accent/35 hover:bg-accent/[0.1] hover:text-accent"
                >
                  <p className="text-base font-medium leading-none">
                    {primaryNetworkLink.label}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-accent/80">
                    {primaryNetworkLink.tag}
                  </p>
                </Link>
                {secondaryNetworkLinks.map((entry) => (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    className="block w-full rounded-xl px-3 py-2.5 text-base font-medium text-foreground/85 transition-all duration-200 hover:bg-foreground/[0.05] hover:text-foreground"
                  >
                    <p className="text-base font-medium leading-none">
                      {entry.label}
                    </p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                      {entry.tag}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="justify-self-center">
            <HeaderYoutubePlayer playlist={youtubePlaylist} />
          </div>
          <div className="justify-self-end">
            <nav className="inline-flex items-center gap-1 rounded-full border border-foreground/12 bg-background/45 p-1 text-[10px] uppercase tracking-[0.28em] text-foreground/60">
              <a
                href="#roster"
                className="rounded-full px-4 py-2 transition-colors hover:bg-foreground/[0.06] hover:text-accent"
              >
                {header.nav.roster}
              </a>
              <a
                href="#contact"
                className="rounded-full px-4 py-2 transition-colors hover:bg-foreground/[0.06] hover:text-accent"
              >
                {header.nav.contact}
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-14 pt-28 md:px-10 md:pb-20 md:pt-32">
        <section className="grid min-h-[92svh] items-center gap-12 border-b border-foreground/10 pb-18 pt-10 md:grid-cols-[1.25fr_0.75fr] md:gap-14 md:pb-24 md:pt-16">
          <div>
            <p className="text-[10px] uppercase tracking-[0.48em] text-foreground/45">
              {hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.03em] md:text-8xl">
              {hero.title}
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-foreground/68 md:text-xl">
              {hero.subtitle}
            </p>
            <div className="mt-11 flex flex-wrap items-center gap-3">
              <a
                href={hero.cta.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-accent/45 bg-accent/12 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/70 hover:bg-accent/20"
              >
                {hero.cta.label}
              </a>
              <a
                href="#roster"
                className="inline-flex items-center rounded-full border border-foreground/15 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground/72 transition-colors hover:border-foreground/25 hover:text-foreground"
              >
                View roster
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[2rem] border border-foreground/12 bg-background/50 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl md:p-8">
              <p className="text-[10px] uppercase tracking-[0.34em] text-foreground/40">
                Founder&apos;s Note
              </p>
              <p className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                &ldquo;I help you achieve the upper limit of your
                potential.&rdquo;
              </p>
              <p className="mt-6 border-t border-foreground/10 pt-4 text-right text-xs uppercase tracking-[0.24em] text-foreground/46">
                — Wokki
              </p>
            </div>
            <div className="pointer-events-none absolute -bottom-8 -right-6 h-24 w-24 rounded-full bg-accent/12 blur-2xl" />
          </div>
        </section>

        <section
          id="roster"
          className="flex min-h-screen flex-col justify-center py-18 md:py-24"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.45em] text-foreground/45">
                {roster.eyebrow}
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                {roster.title}
              </h2>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <article className={`group ${rosterCardClass}`}>
              <WokkiThemeImage
                daySrc={roster.wokkiCardImageDay}
                nightSrc={roster.wokkiCardImageNight}
                alt={`${roster.wokkiCardTitle} portrait`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent" />
              <div className="relative z-10 text-white">
                <p
                  className="text-[10px] uppercase tracking-[0.32em]"
                  style={{ color: roster.wokkiCardEyebrowColor }}
                >
                  {roster.wokkiCardEyebrow}
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                  {roster.wokkiCardTitle}
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
                  {roster.wokkiCardDescription}
                </p>
                <div className="mt-6 border-t border-white/20 pt-7">
                  <div className="flex justify-end">
                    <div className="inline-flex flex-wrap gap-1 rounded-full border border-white/22 bg-white/[0.2] px-2 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                      {wokkiSocials.map((social) => (
                        <span
                          key={social.label}
                          className="group/icon relative inline-flex"
                        >
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`peer ${socialIconClass} text-white/85 hover:text-white`}
                            aria-label={social.label}
                          >
                            <Image
                              src={iconForPlatform(social.platform)}
                              alt=""
                              width={14}
                              height={14}
                              className="opacity-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.65)]"
                              aria-hidden="true"
                            />
                          </a>
                          <span
                            className={socialTooltipClass}
                            aria-hidden="true"
                          >
                            {social.label}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article className={`group ${rosterCardClass}`}>
              <ChristineThemeImage />
              <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-transparent" />
              <div className="relative z-10 text-white">
                <p
                  className="text-[10px] uppercase tracking-[0.36em]"
                  style={{ color: roster.signedAliasColor }}
                >
                  {roster.signedAlias}
                </p>
                <p className="mt-2 text-2xl font-semibold leading-none tracking-tight md:text-3xl">
                  {roster.profileName}
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80">
                  {roster.profileDescription}
                </p>
                <div className="mt-6 border-t border-white/20 pt-7">
                  <div className="flex justify-end">
                    <div className="inline-flex flex-wrap gap-1 rounded-full border border-white/22 bg-white/[0.2] px-2 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_8px_24px_rgba(0,0,0,0.2)] backdrop-blur-xl">
                      {christineSocials.map((social) => (
                        <span
                          key={social.label}
                          className="group/icon relative inline-flex"
                        >
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`peer ${socialIconClass} text-white/85 hover:text-white`}
                            aria-label={social.label}
                          >
                            <Image
                              src={iconForPlatform(social.platform)}
                              alt=""
                              width={14}
                              height={14}
                              className="opacity-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.65)]"
                              aria-hidden="true"
                            />
                          </a>
                          <span
                            className={socialTooltipClass}
                            aria-hidden="true"
                          >
                            {social.label}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <NextSigningCameraCard
              className={rosterCardClass}
              eyebrow={roster.nextCardEyebrow}
              title={roster.nextCardTitle}
              description={roster.nextCardDescription}
            />
          </div>
        </section>

        <section
          id="contact"
          className="flex min-h-screen flex-col justify-center border-t border-foreground/10 py-16 md:py-24"
        >
          <div className="rounded-[2rem] border border-foreground/12 bg-gradient-to-b from-background/92 to-background/70 p-7 shadow-[0_18px_42px_rgba(0,0,0,0.12)] backdrop-blur-xl md:p-11">
            <p className="text-[10px] uppercase tracking-[0.45em] text-foreground/45">
              {contact.eyebrow}
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              {contact.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-xl">
              {contact.description}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={contact.cta.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full border border-accent/45 bg-accent/12 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/70 hover:bg-accent/20"
              >
                {contact.cta.label}
              </a>
              <a
                href="#roster"
                className="inline-flex items-center rounded-full border border-foreground/15 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/72 transition-colors hover:border-foreground/25 hover:text-foreground"
              >
                Back to roster
              </a>
            </div>
          </div>
        </section>
      </div>
      <ThemeToggle />
    </main>
  );
}
