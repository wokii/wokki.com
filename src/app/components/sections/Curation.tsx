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
    <li className="group relative flex items-center gap-4 rounded-2xl border border-foreground/10 bg-background/60 p-4 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
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
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">
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
        <p className="mt-2 truncate whitespace-nowrap text-sm text-foreground/60">
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
      maxHeight="screen"
      paddingY="md"
      centerContent={false}
    >
      <SectionTitle>CURATION</SectionTitle>
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Kindreds</h3>
          <ul className="space-y-4">
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
            className="mt-6 inline-flex items-center justify-center rounded-full border border-accent/40 bg-accent/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent shadow-[0_0_18px_color-mix(in_srgb,var(--accent)_30%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/20 hover:text-accent hover:shadow-[0_0_32px_color-mix(in_srgb,var(--accent)_45%,transparent)]"
          >
            Tap into the Network by donating £1,1110
          </a>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-4">Entertainment</h3>
          <ul className="space-y-4">
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
          <h3 className="text-2xl font-semibold mb-4">Knowledge</h3>
          <ul className="space-y-4">
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
    </Section>
  );
}
