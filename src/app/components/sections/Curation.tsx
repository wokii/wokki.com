import React from "react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

type Kindred = {
  name: string;
  shortIntro: string;
  description: string;
  links: Array<{
    label: string;
    url?: string;
  }>;
  imageUrl: string;
};

type CuratedEntry = {
  title: string;
  shortIntro: string;
  description: string;
  links: Array<{
    label: string;
    url: string;
  }>;
  creator: string;
  imageUrl: string;
};

type CurationCardProps = {
  imageUrl: string;
  imageAlt: string;
  shortIntro: string;
  title: string;
  description: string;
  links?: Array<{
    label: string;
    url?: string;
  }>;
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
  return (
    <li className="flex items-center gap-4 rounded-2xl border border-foreground/10 bg-background/60 p-4 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
      {hasPrimaryLink ? (
        <a
          href={primaryLink?.url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0"
        >
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-12 w-12 rounded-full object-cover border border-foreground/10"
            loading="lazy"
          />
        </a>
      ) : (
        <img
          src={imageUrl}
          alt={imageAlt}
          className="h-12 w-12 rounded-full object-cover border border-foreground/10"
          loading="lazy"
        />
      )}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">
          {shortIntro}
        </p>
        {hasPrimaryLink ? (
          <a
            href={primaryLink?.url}
            target="_blank"
            rel="noreferrer"
            className="mt-1 block text-lg font-semibold hover:text-accent transition-colors"
          >
            {title}
          </a>
        ) : (
          <p className="mt-1 text-lg font-semibold">{title}</p>
        )}
        <p className="mt-2 text-sm text-foreground/60">{description}</p>
        {hasLinks ? (
          <div className="mt-2 flex flex-wrap items-center text-sm">
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
                    className="text-accent hover:underline"
                  >
                    {link.label}
                  </a>
                ) : (
                  <span className="text-foreground/50">{link.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : null}
      </div>
    </li>
  );
}

const kindreds: Kindred[] = [
  {
    name: "Christine Hui",
    shortIntro: "Marketing Princess",
    description: "Christine is 'The Influencer'.",
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/christine-huingaman/",
      },
      {
        label: "TikTok",
        url: "https://www.tiktok.com/@povchristineie",
      },
      {
        label: "抖音",
        url: "https://www.douyin.com/user/MS4wLjABAAAA6dlxf0baWEWZ4VQl8tuhWY-J8l4PreD1OkEHzCZS9gw",
      },
    ],
    imageUrl: "/kindreds/Christine.png",
  },
  {
    name: "Bernát Gábor",
    shortIntro: "PSF Fellow",
    description: "Bernat Gabor is 'The Expert in Python'.",
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/gaborbernat/",
      },
    ],
    imageUrl: "/kindreds/Bernat.jpeg",
  },
  {
    name: "Richard Boyne",
    shortIntro: "The Humble Software Engineer",
    description: "richard-boyne-description",
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/richard-boyne-0588a9183/",
      },
    ],
    imageUrl: "/kindreds/Richard.jpeg",
  },
];

const curatedEntries: CuratedEntry[] = [
  {
    title: "BLACKPINK - 'Pink Venom' M/V",
    shortIntro: "MV Kaleidoscope",
    description: "Official music video release on YouTube.",
    links: [
      {
        label: "YouTube",
        url: "https://www.youtube.com/watch?v=gQlMMD8auMs",
      },
      {
        label: "Elon Watching Black Pink (Douyin)",
        url: "https://www.douyin.com/video/7546676545462406458",
      },
    ],
    creator: "Blackpink",
    imageUrl: "/curation/pink-venom.jpg",
  },
  {
    title: "推背图",
    shortIntro: "The Back-Pushing Diagrams ",
    description: "back-pushing-diagrams-description",
    links: [
      {
        label: "wiki",
        url: "https://zh.wikisource.org/wiki/%E6%8E%A8%E8%83%8C%E5%9C%96_(%E8%A2%81%E5%A4%A9%E7%BD%A1%E3%80%81%E6%9D%8E%E6%B7%B3%E9%A2%A8)",
      },
    ],
    creator: "@",
    imageUrl: "/curation/Tbt-44.jpeg",
  },
  {
    title: "JENNIE - like JENNIE",
    shortIntro: "The Flying Music Video",
    description: "like-jennie-description",
    links: [
      {
        label: "YouTube",
        url: "https://www.youtube.com/watch?v=JSFG-IE8n_c",
      },
    ],
    creator: "Jennie Kim",
    imageUrl: "/curation/like-jennie.jpg",
  },
  {
    title: "God, Zen, Dao",
    shortIntro: "The One",
    description: "This is 'The Origin'.",
    links: [
      {
        label: "Self",
        url: "https://node.wokki.com/00000000000000001",
      },
    ],
    creator: "",
    imageUrl: "/curation/dao.png",
  },
  {
    title: "Snow in the Spring Garden",
    shortIntro: "The Chinese Music Video",
    description: "chinese-music-video-description",
    links: [
      {
        label: "YouTube",
        url: "https://www.youtube.com/watch?v=Tj34AFR3YK0",
      },
    ],
    creator: "Waiting for Mr. Who (Singer)",
    imageUrl: "/curation/chinese-music-video.jpg",
  },
  {
    title: "Virtues",
    shortIntro: "The Good",
    description: "1. Love and Support 2. Awe 3. Gratefulness",
    links: [
      {
        label: "The Book",
        url: "",
      },
    ],
    creator: "Dao",
    imageUrl: "/curation/heart.png",
  },
];

export default function Curation() {
  const entertainmentVideos = curatedEntries.filter(
    (_, index) => index % 2 === 0,
  );
  const knowledgeVideos = curatedEntries.filter((_, index) => index % 2 === 1);

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
            {kindreds.map((kindred) => (
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
