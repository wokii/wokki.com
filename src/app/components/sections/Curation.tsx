import React from "react";
import Image from "next/image";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { WOKKI_DOT_COM, Zen, type CurationLink } from "../../lib/WokkiNodes";

type CurationCardProps = {
  imageUrl: string;
  imageAlt: string;
  shortIntro: string;
  title: string;
  description: string;
  links?: CurationLink[];
};

const platformFromLink = (link: CurationLink) => {
  const label = link.label.trim();
  const lowerLabel = label.toLowerCase();
  const url = (link.url ?? "").toLowerCase();

  if (
    lowerLabel.includes("youtube") ||
    url.includes("youtube.com") ||
    url.includes("youtu.be")
  ) {
    return "YouTube";
  }

  if (
    lowerLabel.includes("tiktok") ||
    url.includes("tiktok.com") ||
    url.includes("douyin.com")
  ) {
    return "TikTok";
  }

  if (lowerLabel.includes("instagram") || url.includes("instagram.com")) {
    return "Instagram";
  }

  if (lowerLabel.includes("linkedin") || url.includes("linkedin.com")) {
    return "LinkedIn";
  }

  return label;
};

function CurationCard({
  imageUrl,
  imageAlt,
  shortIntro,
  title,
  description,
  links = [],
}: CurationCardProps) {
  const hasLinks = links.length > 0;
  const primaryLink = links.find((link) => Boolean(link.url));
  const hasPrimaryLink = Boolean(primaryLink?.url);
  const linkedPlatforms = Array.from(
    new Set(links.filter((link) => Boolean(link.url)).map(platformFromLink)),
  );
  const linkedPlatformsText = linkedPlatforms.join(" · ");
  const hoverLabel = linkedPlatformsText
    ? `${title} · ${linkedPlatformsText}`
    : title;
  return (
    <li className="group relative flex items-center gap-4 rounded-2xl border border-foreground/10 bg-background/60 p-4 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]">
      <div className="pointer-events-none absolute left-4 right-4 top-0 z-20 -translate-y-2 rounded-lg border border-foreground/12 bg-background/92 px-3 py-1.5 text-xs text-foreground/75 opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-200 group-hover:-translate-y-full group-hover:opacity-100">
        {hoverLabel}
      </div>
      {hasPrimaryLink ? (
        <a
          href={primaryLink?.url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0"
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover border border-foreground/10"
          />
        </a>
      ) : (
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover border border-foreground/10"
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-[0.22em] text-foreground/50">
          {shortIntro}
        </p>
        {hasPrimaryLink ? (
          <a
            href={primaryLink?.url}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block truncate whitespace-nowrap text-lg font-semibold transition-colors hover:text-accent"
          >
            {title}
          </a>
        ) : (
          <p className="mt-1 truncate whitespace-nowrap text-lg font-semibold">
            {title}
          </p>
        )}
        <p className="mt-1.5 truncate whitespace-nowrap text-sm text-foreground/60">
          {description}
        </p>
        {hasLinks ? (
          <div className="mt-2 flex items-center overflow-hidden whitespace-nowrap text-sm">
            {links.map((link, index) => (
              <React.Fragment key={`${link.label}-${link.url ?? "nolink"}`}>
                {index > 0 ? (
                  <span className="mx-2 text-foreground/40">·</span>
                ) : null}
                {link.url ? (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate text-accent hover:underline"
                  >
                    {link.label}
                  </a>
                ) : (
                  <span className="truncate text-foreground/50">
                    {link.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  );
}

type ColumnHeaderProps = {
  eyebrow: string;
  title: string;
  blurb: string;
};

function ColumnHeader({ eyebrow, title, blurb }: ColumnHeaderProps) {
  return (
    <div className="mb-4 flex flex-col gap-1.5">
      <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/45">
        {eyebrow}
      </p>
      <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
      <p className="text-[12px] italic text-foreground/45">{blurb}</p>
    </div>
  );
}

export default function Curation() {
  const { curation } = Zen[WOKKI_DOT_COM];
  const entertainmentVideos = curation.entries.filter(
    (_, index) => index % 2 === 0,
  );
  const knowledgeVideos = curation.entries.filter(
    (_, index) => index % 2 === 1,
  );

  return (
    <Section
      id="curation"
      minHeight="screen"
      maxHeight="none"
      paddingY="md"
      centerContent={false}
    >
      <div className="relative w-full">
        {/* Section atmospherics */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <div className="absolute -left-10 top-20 h-64 w-64 rounded-full bg-accent/8 blur-[110px]" />
          <div className="absolute right-0 bottom-10 h-72 w-72 rounded-full bg-foreground/5 blur-[120px]" />
        </div>

        <SectionTitle
          eyebrow={<span>Curation · 选集 · The Network</span>}
          subtitle="People, frequencies, and frames worth holding close."
        >
          CURATION
        </SectionTitle>

        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <ColumnHeader
              eyebrow="Kindreds · 同道"
              title="Kindreds"
              blurb="The few who walk alongside."
            />
            <ul className="space-y-3">
              {curation.kindreds.map((kindred) => (
                <CurationCard
                  key={kindred.name}
                  imageUrl={kindred.imageUrl}
                  imageAlt={kindred.name}
                  shortIntro={kindred.shortIntro}
                  title={kindred.name}
                  description={kindred.description}
                  links={kindred.links}
                />
              ))}
            </ul>
            <a
              href="https://pay.wokki.com/b/bJe9AUekr4OPbqVbk43Je02"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-accent/45 bg-gradient-to-r from-accent/[0.18] to-accent/[0.05] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent shadow-[0_0_22px_color-mix(in_srgb,var(--accent)_22%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_36px_color-mix(in_srgb,var(--accent)_38%,transparent)]"
            >
              Tap in · Donate £1,1110
              <span aria-hidden>↗</span>
            </a>
          </div>

          <div>
            <ColumnHeader
              eyebrow="Entertainment · 娱"
              title="Entertainment"
              blurb="The frequencies that move the body."
            />
            <ul className="space-y-3">
              {entertainmentVideos.map((video) => (
                <CurationCard
                  key={video.title}
                  imageUrl={video.imageUrl}
                  imageAlt={video.title}
                  shortIntro={video.shortIntro}
                  title={video.title}
                  description={video.description}
                  links={video.links}
                />
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeader
              eyebrow="Knowledge · 知"
              title="Knowledge"
              blurb="The frames that anchor the mind."
            />
            <ul className="space-y-3">
              {knowledgeVideos.map((video) => (
                <CurationCard
                  key={video.title}
                  imageUrl={video.imageUrl}
                  imageAlt={video.title}
                  shortIntro={video.shortIntro}
                  title={video.title}
                  description={video.description}
                  links={video.links}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
