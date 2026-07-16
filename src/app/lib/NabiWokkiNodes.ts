export const NABI_WOKKI = "nabi.wokki" as const;

export type NabiLink = {
  label: string;
  href: string;
};

export type NabiSocialLink = {
  platform: string;
  description: string;
  url: string;
};

export type NabiCollection = {
  id: string;
  glyph: string;
  title: string;
  titleZh: string;
  blurb: string;
  blurbZh: string;
  tag?: string;
};

export type NabiPillar = {
  glyph: string;
  title: string;
  body: string;
};

export type NabiWokki = {
  meta: {
    title: string;
    description: string;
    ogImage: string;
  };
  header: {
    brandLabel: string;
    brandSub: string;
    nav: {
      brand: string;
      collections: string;
      duality: string;
      yang: NabiLink;
    };
  };
  hero: {
    moonPhase: string;
    titleYin: string;
    titleBrand: string;
    name: string;
    nameRoman: string;
    tagline: string;
    taglineZh: string;
    primaryCta: NabiLink;
    secondaryCta: NabiLink;
  };
  philosophy: {
    eyebrow: string;
    title: string;
    titleZh: string;
    paragraphs: string[];
    pillars: NabiPillar[];
  };
  collections: {
    eyebrow: string;
    title: string;
    description: string;
    items: NabiCollection[];
    shopCta: NabiLink;
  };
  duality: {
    eyebrow: string;
    title: string;
    yin: {
      glyph: string;
      name: string;
      role: string;
      traits: string[];
    };
    yang: {
      glyph: string;
      name: string;
      role: string;
      traits: string[];
      link: NabiLink;
    };
    closing: string;
    closingZh: string;
  };
  art: {
    eyebrow: string;
    title: string;
    description: string;
    links: NabiLink[];
  };
  social: {
    eyebrow: string;
    title: string;
    links: NabiSocialLink[];
  };
  footer: {
    left: string;
    yangLink: NabiLink;
    right: string;
  };
};

export const nabiWokki: NabiWokki = {
  meta: {
    title: "Nabi · 月儿 · 欧阳娜娜",
    description:
      "The yin half of wokki.com — Ouyang Nana's Nabi lifestyle brand. Soft, lunar, and butterfly-light: stationery, apparel, home, and the art of gentle living.",
    ogImage: "/w.png",
  },
  header: {
    brandLabel: "Nabi · 月儿",
    brandSub: "阴 · Yin",
    nav: {
      brand: "Brand",
      collections: "Collections",
      duality: "☯ Yin & Yang",
      yang: { label: "Wokki · 阳", href: "/" },
    },
  },
  hero: {
    moonPhase: "弦月 · Waxing Crescent",
    titleYin: "月儿",
    titleBrand: "Nabi",
    name: "欧阳娜娜",
    nameRoman: "Ouyang Nana",
    tagline:
      "Butterfly-light lifestyle for those who listen before they speak. The yin half of a shared constellation.",
    taglineZh: "以阴柔承载美感，以 Nabi 传递日常里的诗意。蝴蝶轻落，月华无声。",
    primaryCta: { label: "Explore Collections", href: "#collections" },
    secondaryCta: { label: "Meet the Yin & Yang", href: "#duality" },
  },
  philosophy: {
    eyebrow: "Philosophy · 品牌理念",
    title: "Soft is not small.",
    titleZh: "阴柔，不是软弱。",
    paragraphs: [
      "Nabi — from the Persian word for butterfly — is Ouyang Nana's invitation to live with lightness: objects that feel like a breath, colours that settle rather than shout, rituals that honour slowness.",
      "As 月儿, the moon-child of this site, she holds the yin pole: receptive, artistic, luminous in reflection. Where Wokki builds systems, Nabi cultivates atmosphere.",
      "Every piece is designed to be touched, kept, and returned to — not consumed and discarded.",
    ],
    pillars: [
      {
        glyph: "蝶",
        title: "Butterfly · 蝶",
        body: "Transformation without force. Nabi marks moments of becoming — quiet, personal, repeatable.",
      },
      {
        glyph: "月",
        title: "Moon · 月",
        body: "Light borrowed, not generated. The brand glows by reflecting what you already carry inside.",
      },
      {
        glyph: "柔",
        title: "Softness · 柔",
        body: "Rounded edges, muted palettes, textures that ask to be held. Strength that does not need to prove itself.",
      },
    ],
  },
  collections: {
    eyebrow: "Collections · 系列",
    title: "Four rooms of Nabi",
    description:
      "Stationery for morning pages, apparel for unhurried days, home objects for still corners, and music for the spaces between.",
    items: [
      {
        id: "stationery",
        glyph: "笔",
        title: "Stationery",
        titleZh: "文具",
        blurb:
          "Notebooks, washi, pens — tools for thoughts that arrive softly.",
        blurbZh: "笔记本、和纸、钢笔——为轻轻到来的念头准备。",
        tag: "NEW",
      },
      {
        id: "apparel",
        glyph: "衣",
        title: "Apparel",
        titleZh: "服饰",
        blurb: "Layered silhouettes in moon-washed tones. Wear the pause.",
        blurbZh: "月洗色调的层叠轮廓。把停顿穿在身上。",
      },
      {
        id: "home",
        glyph: "居",
        title: "Home",
        titleZh: "家居",
        blurb:
          "Candles, textiles, objects that turn any corner into a small sanctuary.",
        blurbZh: "蜡烛、织物、小物——把任意角落变成庇护所。",
      },
      {
        id: "music",
        glyph: "音",
        title: "Music & Art",
        titleZh: "音乐与艺术",
        blurb:
          "Cello, guitar, voice — the black-screen set where art speaks before the name.",
        blurbZh: "大提琴、吉他、歌声——黑屏直播里，艺术先于名字开口。",
        tag: "LIVE",
      },
    ],
    shopCta: {
      label: "Visit Nabi Shop · 前往官方店",
      href: "https://nabiouyangnana.tmall.com/",
    },
  },
  duality: {
    eyebrow: "Duality · 阴阳",
    title: "Two halves, one orbit",
    yin: {
      glyph: "月",
      name: "月儿 · Nabi · 欧阳娜娜",
      role: "Yin · 阴 · The Moon",
      traits: [
        "Art · 艺术",
        "Voice · 歌声",
        "Soft living · 柔生活",
        "Brand · 品牌",
      ],
    },
    yang: {
      glyph: "日",
      name: "Wokki · 王元",
      role: "Yang · 阳 · The Sun",
      traits: [
        "Systems · 系统",
        "Engineering · 工程",
        "Strategy · 战略",
        "Consultancy · 咨询",
      ],
      link: { label: "Cross to the Yang half →", href: "/" },
    },
    closing:
      "Neither half is complete alone. The taiji turns because opposites lean into each other.",
    closingZh: "孤阴不生，独阳不长。太极因相反而完整。",
  },
  art: {
    eyebrow: "Art · 艺术",
    title: "When the screen goes dark",
    description:
      "On a small account, with no camera and no name — only six strings and a voice. The setlist is the whole stage.",
    links: [
      { label: "Nana's Setlist · 歌单", href: "/nana" },
      { label: "神识·修道场", href: "/god" },
    ],
  },
  social: {
    eyebrow: "Connect · 连接",
    title: "Follow the butterfly",
    links: [
      {
        platform: "instagram",
        description: "Instagram",
        url: "https://www.instagram.com/oynnnna/",
      },
      {
        platform: "x",
        description: "Weibo",
        url: "https://weibo.com/u/1195242865",
      },
      {
        platform: "tiktok",
        description: "Douyin",
        url: "https://www.douyin.com/user/MS4wLjABAAAA6dlxf0baWEWZ4VQl8tuhWY-J8l4PreD1OkEHzCZS9gw",
      },
      {
        platform: "youtube",
        description: "YouTube",
        url: "https://www.youtube.com/@OuyangNana",
      },
    ],
  },
  footer: {
    left: "Curated with moonlight at",
    yangLink: { label: "wokki.com", href: "/" },
    right: "For 月儿 — and everyone who finds strength in softness.",
  },
};
