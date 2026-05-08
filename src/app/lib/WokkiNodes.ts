import { NANA_WOKKI, nanaWokki, type NanaWokki } from "./NanaWokkiNodes";

export { NANA_WOKKI, nanaWokki } from "./NanaWokkiNodes";
export type {
  NanaWokki,
  NanaSong,
  NanaSongBadge,
  NanaCategory,
  NanaAboutBullet,
  NanaLink,
} from "./NanaWokkiNodes";

export type HeroTitle = {
  title: string;
  note: string;
};

export type HeroCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary";
};

export type Hero = {
  titles: HeroTitle[];
  tagline: string;
  ctas: HeroCta[];
};

export type ContactLink = {
  platform: string;
  description: string;
  url: string | null;
};

export type About = {
  introSuffix: string;
  summary: string;
  contact: {
    emails: string[];
    links: ContactLink[];
  };
};

export type ProjectBackgroundConfig = {
  color: string;
  opacity: number;
  size: string;
  path: string;
};

export const projectBackgrounds = {
  HEART: {
    color: "var(--accent)",
    opacity: 0.2,
    size: "60%",
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  },
} as const satisfies Record<string, ProjectBackgroundConfig>;

export type ProjectBackgroundKey = keyof typeof projectBackgrounds;

export type Project = {
  id: number;
  title: string;
  shortIntro: string;
  description: string;
  link: string | null;
  image: string;
  background: ProjectBackgroundKey | null;
  cardSuit: string;
  cardRank: string;
};

export type Projects = {
  items: Project[];
  backgrounds: typeof projectBackgrounds;
};

export type CurationLink = {
  label: string;
  url?: string;
};

export type Kindred = {
  name: string;
  shortIntro: string;
  description: string;
  links: CurationLink[];
  imageUrl: string;
};

export type CuratedEntry = {
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

export type Curation = {
  kindreds: Kindred[];
  entries: CuratedEntry[];
};

export type ScrollTimelineEntry = {
  id: string;
  title: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string | null;
  skills: string[];
  link?: string;
};

export type ScrollPointsSnapshot = {
  date: string;
  points: {
    health?: number;
    overall?: number;
    awakeningScore?: number;
  };
};

export type Scroll = {
  timelineEntries: ScrollTimelineEntry[];
  pointsSnapshots: ScrollPointsSnapshot[];
};

export type InsightRecord = {
  id: string;
  email: string;
  title: string;
  summary: string;
  createdAt: string;
};

export type Writing = {
  quote: {
    text: string;
    author: string;
    source: string;
    url: string;
  };
  emptyState: string;
};

export type ConsultancyWokki = {
  hero: {
    title: string;
    subtitle: string;
    eyebrow?: string;
    cta: {
      label: string;
      href: string;
    };
    rateNote: string;
  };
  insights: {
    records: InsightRecord[];
    heading: string;
    emptyState: string;
    signIn: {
      heading: string;
      body: string;
      ctaLabel: string;
    };
  };
};

export type MCNWokki = {
  meta: {
    title: string;
    description: string;
  };
  header: {
    networkLabel: string;
    links: Array<{
      label: string;
      tag: string;
      href: string;
      featured?: boolean;
    }>;
    nav: {
      roster: string;
      contact: string;
    };
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: {
      label: string;
      href: string;
    };
  };
  roster: {
    eyebrow: string;
    title: string;
    signedBadge: string;
    signedAlias: string;
    signedAliasColor: string;
    profileName: string;
    profileDescription: string;
    profileStatus: string;
    profileCtaLabel: string;
    profileUrl: string;
    nextCardEyebrow: string;
    nextCardTitle: string;
    nextCardDescription: string;
    nextCardSocials: string[];
    wokkiCardEyebrow: string;
    wokkiCardEyebrowColor: string;
    wokkiCardTitle: string;
    wokkiCardDescription: string;
    wokkiCardImageDay: string;
    wokkiCardImageNight: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    cta: {
      label: string;
      href: string;
    };
  };
};

export type WokkiCom = {
  hero: Hero;
  about: About;
  projects: Projects;
  curation: Curation;
  scroll: Scroll;
  writing: Writing;
};

export const WOKKI_DOT_COM = "wokki.com" as const;
export const CONSULTANCY_WOKKI = "consultancy.wokki" as const;
export const MCN_WOKKI = "mcn.wokki" as const;

export type AliasMap = Record<string, string[]>;

export const aliasMap: AliasMap = {
  jpmorgan: [
    "JPM",
    "JPMC",
    "JPMorgan",
    "JPMorgan Chase",
    "JPMorgan Chase & Co",
  ],
};

const capitalizeFirst = (value: string) =>
  value ? `${value[0].toUpperCase()}${value.slice(1)}` : "";

const encodeMailto = (email: string, subject: string, body: string) =>
  `mailto:${email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

export const consultancyInitialSessionEmail = encodeMailto(
  "wokkiacross@gmail.com",
  "Wokki Consultancy Initial Session",
  `Hi Wokki,

I'm [name] from [company], [brief situation description]. We're looking for help with [one-line problem]. I agree in principle that the starting rate for Wokki Consultancy is £1,111 per hour.

Objective: [desired outcome]
Timeline: [rough timing, deadline]
Budget: [total budget]

Thanks,
[name]`,
);

export type Zen = {
  [WOKKI_DOT_COM]: WokkiCom;
  [CONSULTANCY_WOKKI]: ConsultancyWokki;
  [MCN_WOKKI]: MCNWokki;
  [NANA_WOKKI]: NanaWokki;
};

export const wokkiCom: WokkiCom = {
  hero: {
    titles: [
      { title: "Theory Engineer", note: "(philosopher: a.e.)" },
      { title: "Systems Thinker", note: "(doer: e.m.)" },
      { title: "aesthetics exprorer", note: "(visionary: s.j.)" },
    ],
    tagline: '"I envision a world where human is elevated by technology."',
    ctas: [
      { label: "Explore My Work", href: "#projects", variant: "primary" },
      { label: "About Me", href: "#about", variant: "secondary" },
    ],
  },
  about: {
    introSuffix:
      "passionate about envisioning a world where human is elevated, enhanced, and empowered by technology.",
    summary:
      "With experience across Mathematics, Finance, Economics, AI Startups, Psychology, Music, Media, Consultancy and Design. I bring an Absolutely unique perspective to solving complex problems through technology and aesthetics.",
    contact: {
      emails: [
        "self@wokki.com",
        "christine@wokki.com",
        "wokkiacross@gmail.com",
      ],
      links: [
        {
          platform: "github",
          description: "GitHub",
          url: "https://github.com/wokii",
        },
        {
          platform: "linkedin",
          description: "LinkedIn",
          url: "https://www.linkedin.com/in/wokki/",
        },
        // {
        //   platform: "linkedin",
        //   description: "Girlfriend's LinkedIn, she is an upcoming influencer.",
        //   url: "https://www.linkedin.com/in/christine-hui-5697b2270/",
        // },
        {
          platform: "x",
          description: "X",
          url: "https://x.com/hanwokki",
        },
        {
          platform: "instagram",
          description: "Instagram",
          url: "https://www.instagram.com/hanwokii/",
        },
        {
          platform: "tiktok",
          description: "TikTok",
          url: "https://www.tiktok.com/@hanwokki",
        },
        {
          platform: "tiktokCn",
          description: "抖音(CN TikTok)",
          url: "https://www.douyin.com/user/MS4wLjABAAAA6dlxf0baWEWZ4VQl8tuhWY-J8l4PreD1OkEHzCZS9gw",
        },
      ],
    },
  },
  projects: {
    backgrounds: projectBackgrounds,
    items: [
      {
        id: 1,
        title: "AI Coaching App",
        shortIntro: "Psychology",
        description:
          "An AI-powered coaching platform that provides personalized guidance and feedback.",
        link: "https://zera.co",
        image: "/images/ai-coaching.jpg",
        background: null,
        cardSuit: "♣",
        cardRank: "A",
      },
      {
        id: 2,
        title: "Digital Twin",
        shortIntro: "AI, Psychology",
        description:
          "A digital twin of myself providing on-demand emotional support to Christine.",
        link: `https://christine.${WOKKI_DOT_COM}`,
        image: "/images/insight-system.jpg",
        background: "HEART",
        cardSuit: "♥",
        cardRank: "Q",
      },
      {
        id: 3,
        title: capitalizeFirst(WOKKI_DOT_COM),
        shortIntro: "Self",
        description:
          "This very website you are on right now. Click to flip back.",
        link: `https://${WOKKI_DOT_COM}`,
        image: "/images/design-portfolio.jpg",
        background: null,
        cardSuit: "♠",
        cardRank: "A",
      },
      {
        id: 4,
        title: "Divination App",
        shortIntro: "Astrology",
        description:
          "A digital divination tool that combines classical I Ching hexagram casting with LLM-powered interpretations.",
        link: "https://xiaoliuyao.streamlit.app/",
        image: "/images/data-viz.jpg",
        background: null,
        cardSuit: "♦",
        cardRank: "J",
      },
      {
        id: 5,
        title: "CallSense MVP",
        shortIntro: "Prototype",
        description:
          "An MVP that leverages LLMs to analyze sales call transcripts, extracting objections, intent, and sentiment to enhance sales strategies.",
        link: "https://glyphic.streamlit.app/",
        image: "/images/sales-call-analytics.jpg",
        background: null,
        cardSuit: "♣",
        cardRank: "2",
      },
      {
        id: 6,
        title: "FA Automation",
        shortIntro: "Finance",
        description:
          "A concise and elegant script that automates a part of tedious and repetitive financial analysis processes for KPMG.",
        link: "https://github.com/wokii/fa-automation/",
        image: "/images/web-platform.jpg",
        background: null,
        cardSuit: "♥",
        cardRank: "2",
      },
      {
        id: 7,
        title: "Insight System",
        shortIntro: "Behavioral Science",
        description:
          "A behavior change platform that provides psychological insights based on users' authorised data.",
        link: null,
        image: "/images/insight-system.jpg",
        background: null,
        cardSuit: "♣",
        cardRank: "K",
      },
    ],
  },
  curation: {
    kindreds: [
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
        shortIntro: "The Humble Engineer",
        description: "The humble engineer who works at Jane Street.",
        links: [
          {
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/richard-boyne-0588a9183/",
          },
        ],
        imageUrl: "/kindreds/Richard.jpeg",
      },
    ],
    entries: [
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
        title: "Dao, God, Zen, Deism...",
        shortIntro: "The One",
        description: "This is 'The Origin'.",
        links: [
          {
            label: "Perennial Philosophy",
            url: `https://en.wikipedia.org/wiki/Perennial_philosophy`,
          },
        ],
        creator: "",
        imageUrl: "/curation/dao.png",
      },
      {
        title: "等什么君 - Snow in the Spring Garden",
        shortIntro: "The Chinese Music Video",
        description: "chinese-music-video-description",
        links: [
          {
            label: "YouTube",
            url: "https://www.youtube.com/watch?v=Tj34AFR3YK0",
          },
        ],
        creator: "等什么君",
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
    ],
  },
  scroll: {
    pointsSnapshots: [
      {
        date: "2018-09-01",
        points: {
          health: 78,
          overall: 48,
          awakeningScore: 18,
        },
      },
      {
        date: "2020-03-03",
        points: {
          health: 60,
          overall: 35,
          awakeningScore: 20,
        },
      },
      {
        date: "2022-01-01",
        points: {
          health: 45,
          overall: 30,
          awakeningScore: 24,
        },
      },
      {
        date: "2024-02-09",
        points: {
          health: 58,
          overall: 38,
          awakeningScore: 26,
        },
      },
      {
        date: "2025-09-01",
        points: {
          health: 72,
          overall: 55,
          awakeningScore: 70,
        },
      },
      {
        date: "2026-01-07",
        points: {
          health: 90,
          overall: 80,
          awakeningScore: 88,
        },
      },
      {
        date: "2026-01-10",
        points: {
          health: 99,
          overall: 95,
          awakeningScore: 85,
        },
      },
    ],
    timelineEntries: [
      {
        id: "jpmorgan",
        title: "JPMorgan",
        role: "Quant Dev",
        description: "Margin Trading, Prime Finance Service & Clearing.",
        link: "https://www.jpmorganchase.com/",
        startDate: "2025-02-09",
        endDate: null,
        skills: ["Finance", "Mathematics", "Computer Science"],
      },
      {
        id: "stealth",
        title: "Stealth Startup",
        role: "Lead Engineer",
        description: "Built an AI Coaching product from concept to launch.",
        startDate: "2024-02-11",
        endDate: "2024-11-31",
        skills: [
          "Behavioral Science",
          "Psychology",
          "Product",
          "Design",
          "Computer Science",
        ],
      },
      {
        id: "bloomberg",
        title: "Bloomberg",
        role: "Software Engineer",
        description: "Data Ingestion Pipeline & OTC Derivatives Pricing Infra.",
        link: "https://www.bloomberg.com/",
        startDate: "2020-03-03",
        endDate: "2024-02-09",
        skills: ["Finance", "Computer Science", "Mathematics"],
      },
      {
        id: "imperial",
        title: "Imperial College London",
        role: "MSc Computing",
        description:
          "Computing with specialisation in Machine Learning (Nowadays 'AI').",
        link: "https://www.imperial.ac.uk/",
        startDate: "2018-09-01",
        endDate: "2019-11-01",
        skills: ["Computer Science"],
      },
    ],
  },
  writing: {
    quote: {
      text: "\"Fugayzi, fugazi. It's a whazy. It's a woozie. It's fairy dust. It doesn't exist. It's never landed. It is no matter. It's not on the elemental chart. It's not fucking real.\"",
      author: "Mark H.",
      source: "The Wolf of Wall Street",
      url: "https://www.acmi.net.au/stories-and-ideas/the-wolf-of-wall-street-fairy-dust/",
    },
    emptyState: "Nothing here yet.",
  },
};

export const consultancyWokki: ConsultancyWokki = {
  hero: {
    eyebrow: "Consultancy",
    title: "Wokki Consultancy",
    subtitle:
      "Private consulting across Strategy, Product, Engineering, Psychology and AI.",
    cta: {
      label: "Check Pricing",
      href: "#pricing",
    },
    rateNote: "Starting rate: £1,111 per hour.",
  },
  insights: {
    records: [
      {
        id: "insight-001",
        email: "hanwokki@gmail.com",
        title: "Test Insight 1",
        summary: "Your focus peaks on Tuesday mornings and dips after 4pm.",
        createdAt: "2026-01-22T10:30:00Z",
      },
      {
        id: "insight-002",
        email: "hanwokki@gmail.com",
        title: "Test Insight 2 (Energy)",
        summary: "Short breaks every 90 minutes correlate with higher output.",
        createdAt: "2026-01-20T14:00:00Z",
      },
      {
        id: "insight-003",
        email: "christine.huingaman@gmail.com",
        title: "Momentum check",
        summary: "Evening sessions are trending upward this month.",
        createdAt: "2026-01-18T19:40:00Z",
      },
    ],
    heading: "Your insight records",
    emptyState: "No insight records yet.",
    signIn: {
      heading: "Sign in required",
      body: "Please sign in to view insights tied to your account.",
      ctaLabel: "Sign in with Google",
    },
  },
};

export const mcnWokki: MCNWokki = {
  meta: {
    title: "Wokki MCN",
    description:
      "Wokki MCN is the largest MCNetwork on the planet. If you are talented and under-positioned, get in touch with Han Wokki.",
  },
  header: {
    networkLabel: "Wokki Network",
    links: [
      {
        label: "Wokki.com",
        tag: "Main Site",
        href: "/",
        featured: true,
      },
      {
        label: "Wokki Consultancy",
        tag: "Enlightenment",
        href: "/consultancy",
      },
      {
        label: "Wokki MCN",
        tag: "Creator Network",
        href: "/mcn",
      },
    ],
    nav: {
      roster: "Roster",
      contact: "Contact",
    },
  },
  hero: {
    eyebrow: "Wokki MCN",
    title: "The world’s most prestigious influencer network",
    subtitle:
      "If you are talented and think you are under-positioned, get in touch with Wokki.",
    cta: {
      label: "Get in touch",
      href: "https://www.linkedin.com/in/wokki/",
    },
  },
  roster: {
    eyebrow: "Roster",
    title: "Check out the Crazy Ones",
    signedBadge: "Signed",
    signedAlias: "Baby-Blush",
    signedAliasColor: "#f9c5d1",
    profileName: "Christine",
    profileDescription:
      "Editorial-grade brand operator. Strategic marketing, category-level events, and global B2B narrative impact.",
    profileStatus: "Signed Influencer",
    profileCtaLabel: "View profile",
    profileUrl: "https://www.linkedin.com/in/christine-huingaman/",
    nextCardEyebrow: "Roster",
    nextCardTitle: "Next Signing",
    nextCardDescription: "More talent profiles to be added soon.",
    nextCardSocials: ["linkedin", "instagram", "tiktok"],
    wokkiCardEyebrow: "Founder",
    wokkiCardEyebrowColor: "#10b981",
    wokkiCardTitle: "Wokki",
    wokkiCardDescription:
      "Founder of Wokki.com, Wokki Consultancy and Wokki MCN.",
    wokkiCardImageDay: "/mcn/wokki-day.JPG",
    wokkiCardImageNight: "/mcn/wokki-night.JPG",
  },
  contact: {
    eyebrow: "Contact",
    title: "Think you should be positioned higher?",
    description:
      "Reach out directly to Han Wokki and share your profile, your work, and where you want to go next.",
    cta: {
      label: "Contact Han Wokki",
      href: "https://www.linkedin.com/in/wokki/",
    },
  },
};

export const Zen: Zen = {
  [WOKKI_DOT_COM]: wokkiCom,
  [CONSULTANCY_WOKKI]: consultancyWokki,
  [MCN_WOKKI]: mcnWokki,
  [NANA_WOKKI]: nanaWokki,
};
