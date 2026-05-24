export const SAS_WOKKI = "sas.wokki" as const;

export type SasCurriculumItem = {
  glyph: string;
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
};

export type SasArt = {
  name: string;
  nameEn: string;
  tag: string;
  body: string;
  bodyEn: string;
};

export type SasFaculty = {
  title: string;
  role: string;
  motif: string;
  body: string;
  bodyEn: string;
  lineage: string[];
};

export type SasTransmission = {
  topic: string;
  topicEn: string;
  format: string;
  body: string;
  bodyEn: string;
};

export type SasTenet = {
  zh: string;
  en: string;
  body: string;
  bodyEn: string;
};

export type SasWokki = {
  meta: {
    title: string;
    description: string;
    ogImage: string;
  };
  header: {
    schoolLabel: string;
    schoolSub: string;
    nav: {
      manifesto: string;
      curriculum: string;
      arts: string;
      faculty: string;
      transmissions: string;
      admissions: string;
      contact: string;
      home: { label: string; href: string };
    };
  };
  hero: {
    eyebrow: string;
    titleZh: string;
    titleEn: string;
    subtitle: string;
    subtitleEn: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  manifesto: {
    eyebrow: string;
    title: string;
    paragraphs: Array<{ zh: string; en: string }>;
    nameRationale: Array<{ heading: string; body: string; bodyEn: string }>;
  };
  curriculum: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: SasCurriculumItem[];
  };
  arts: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: SasArt[];
  };
  faculty: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: SasFaculty[];
  };
  transmissions: {
    eyebrow: string;
    title: string;
    subtitle: string;
    lecturer: string;
    lecturerEn: string;
    items: SasTransmission[];
  };
  admissions: {
    eyebrow: string;
    title: string;
    subtitle: string;
    subtitleEn: string;
    requirements: Array<{ label: string; detail: string; detailEn: string }>;
    brochure: string[];
    brochureEn: string[];
    note: string;
    noteEn: string;
  };
  tenets: {
    eyebrow: string;
    title: string;
    items: SasTenet[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    bodyEn: string;
    cta: { label: string; href: string };
    secondaryCta: { label: string; sub: string; href: string };
    email: string;
  };
  footer: {
    line: string;
    sub: string;
  };
};

export const sasWokki: SasWokki = {
  meta: {
    title: "逍遥派 · Subtle Art School",
    description: "琴棋戏书画，花鸟诗酒茶。",
    ogImage: "/w.png",
  },
  header: {
    schoolLabel: "逍遥派",
    schoolSub: "Subtle Art School",
    nav: {
      manifesto: "名相",
      curriculum: "六艺",
      arts: "绝学",
      faculty: "名师",
      transmissions: "口传",
      admissions: "招生",
      contact: "问道",
      home: { label: "Wokki.com", href: "/" },
    },
  },
  hero: {
    eyebrow: "烟霞",
    titleZh: "逍遥派",
    titleEn: "Subtle Art School",
    subtitle: "琴棋戏书画，花鸟诗酒茶。",
    subtitleEn: "Music, chess, opera, brush — flowers, birds, poetry, tea.",
    primaryCta: { label: "简章", href: "#admissions" },
    secondaryCta: { label: "口传", href: "#transmissions" },
  },
  manifesto: {
    eyebrow: "名相",
    title: "Subtle Art School",
    paragraphs: [
      {
        zh: "六艺为门，武学在内。",
        en: "Six arts at the gate; martial work within.",
      },
      {
        zh: "王元讲席，录课传世。",
        en: "Wokki lectures; lessons recorded.",
      },
    ],
    nameRationale: [
      {
        heading: "School",
        body: "武学，亦学问。",
        bodyEn: "Martial art, also scholarship.",
      },
      {
        heading: "Art",
        body: "艺为表，功为里。",
        bodyEn: "Art outward; skill inward.",
      },
      {
        heading: "Subtle",
        body: "精微，不张扬。",
        bodyEn: "Refined. Unannounced.",
      },
    ],
  },
  curriculum: {
    eyebrow: "六艺",
    title: "所考",
    subtitle: "琴棋书画，医卜星相。",
    items: [
      {
        glyph: "琴",
        title: "音律",
        titleEn: "Qín",
        body: "以音调气。",
        bodyEn: "Breath through sound.",
      },
      {
        glyph: "棋",
        title: "弈道",
        titleEn: "Qí",
        body: "珍珑试人。",
        bodyEn: "Chess tests the mind.",
      },
      {
        glyph: "书",
        title: "笔法",
        titleEn: "Shū",
        body: "劲在笔端。",
        bodyEn: "Force in the stroke.",
      },
      {
        glyph: "画",
        title: "丹青",
        titleEn: "Huà",
        body: "石室壁画。",
        bodyEn: "Stone-chamber murals.",
      },
      {
        glyph: "医",
        title: "医理",
        titleEn: "Yī",
        body: "经脉药性。",
        bodyEn: "Channels and herbs.",
      },
      {
        glyph: "卜",
        title: "星相",
        titleEn: "Bǔ",
        body: "观天行事。",
        bodyEn: "Read the sky; act.",
      },
      {
        glyph: "理",
        title: "论工",
        titleEn: "Lǐ",
        body: "现象成论。",
        bodyEn: "Phenomena into argument.",
      },
      {
        glyph: "数",
        title: "系统",
        titleEn: "Shù",
        body: "模型为器。",
        bodyEn: "Models as tools.",
      },
    ],
  },
  arts: {
    eyebrow: "绝学",
    title: "武学",
    subtitle: "名见于册。",
    items: [
      {
        name: "凌波微步",
        nameEn: "Língbō Wēibù",
        tag: "步法",
        body: "身轻步远。",
        bodyEn: "Light body, long step.",
      },
      {
        name: "北冥神功",
        nameEn: "Běimíng Shéngōng",
        tag: "吸功",
        body: "纳海须空。",
        bodyEn: "Receive much; hold empty.",
      },
      {
        name: "小无相功",
        nameEn: "Xiǎo Wúxiàng Gōng",
        tag: "无相",
        body: "无形拟形。",
        bodyEn: "No form; mirrors form.",
      },
      {
        name: "天山六阳掌",
        nameEn: "Tiānshān Liùyáng Zhǎng",
        tag: "掌法",
        body: "至阳至刚。",
        bodyEn: "Utter yang, utter force.",
      },
      {
        name: "生死符",
        nameEn: "Shēngsǐ Fú",
        tag: "制敌",
        body: "一针定命。",
        bodyEn: "One needle decides.",
      },
    ],
  },
  faculty: {
    eyebrow: "名师",
    title: "教席",
    subtitle: "前辈在列。",
    items: [
      {
        title: "无崖子",
        role: "开山祖师",
        motif: "崖",
        body: "壁画传功。",
        bodyEn: "Murals transmit.",
        lineage: ["画", "无相", "情"],
      },
      {
        title: "苏星河",
        role: "八友之首",
        motif: "棋",
        body: "棋局择徒。",
        bodyEn: "Chess selects heirs.",
        lineage: ["棋", "择徒", "传功"],
      },
      {
        title: "天山童姥",
        role: "北脉",
        motif: "童",
        body: "六阳生死。",
        bodyEn: "Yang palm; life-death needle.",
        lineage: ["六阳", "符", "尊"],
      },
      {
        title: "李秋水",
        role: "南脉",
        motif: "水",
        body: "身法毒理。",
        bodyEn: "Movement and toxin.",
        lineage: ["身法", "毒", "魅"],
      },
      {
        title: "王元 · Wokki",
        role: "当代讲席",
        motif: "元",
        body: "理数命理，录课口传。",
        bodyEn: "Theory, systems, metaphysics — on record.",
        lineage: ["理", "数", "口"],
      },
    ],
  },
  transmissions: {
    eyebrow: "口传",
    title: "讲席录",
    subtitle: "一事一课。",
    lecturer: "王元 · Wokki",
    lecturerEn: "@hanwokki",
    items: [
      {
        topic: "命理",
        topicEn: "Metaphysics",
        format: "易经 · 八字 · 紫微",
        body: "周期，结构，推演。",
        bodyEn: "Cycles, structure, inference.",
      },
      {
        topic: "系统",
        topicEn: "Systems",
        format: "系统",
        body: "决策，关系，财务。",
        bodyEn: "Decisions, relations, capital.",
      },
      {
        topic: "原理",
        topicEn: "First principles",
        format: "言",
        body: "假设与事实。",
        bodyEn: "Assumption and fact.",
      },
      {
        topic: "心理",
        topicEn: "Psychology",
        format: "觉",
        body: "行为，模式，觉知。",
        bodyEn: "Behaviour, pattern, awareness.",
      },
      {
        topic: "工程",
        topicEn: "Engineering",
        format: "理",
        body: "建模，执行。",
        bodyEn: "Model, execute.",
      },
    ],
  },
  admissions: {
    eyebrow: "招生",
    title: "简章",
    subtitle: "三条。",
    subtitleEn: "Three clauses.",
    requirements: [
      {
        label: "仪容",
        detail: "重气度。",
        detailEn: "Temperament first.",
      },
      {
        label: "通艺",
        detail: "六艺有基。",
        detailEn: "Six arts grounded.",
      },
      {
        label: "心度",
        detail: "能自修。",
        detailEn: "Self-study able.",
      },
    ],
    brochure: ["不统江湖。", "先艺后武。", "山门不启。", "传书问路。"],
    brochureEn: [
      "No dominion sought.",
      "Arts before martial.",
      "Gate closed.",
      "Write to inquire.",
    ],
    note: "先阅录课，再传书。",
    noteEn: "Read first. Write second.",
  },
  tenets: {
    eyebrow: "心法",
    title: "三义",
    items: [
      {
        zh: "无招",
        en: "No form",
        body: "形借意立。",
        bodyEn: "Borrow form; own intent.",
      },
      {
        zh: "无求",
        en: "No grasp",
        body: "名位空。",
        bodyEn: "Titles empty.",
      },
      {
        zh: "无扰",
        en: "No stir",
        body: "应止。",
        bodyEn: "Respond, then stop.",
      },
    ],
  },
  contact: {
    eyebrow: "问道",
    title: "传书",
    body: "课业之问，致信讲席。",
    bodyEn: "Coursework — write the lecturer.",
    cta: {
      label: "传书",
      href: "mailto:self@wokki.com?subject=Subtle%20Art%20School%20%E9%97%AE%E9%81%93",
    },
    secondaryCta: {
      label: "录课",
      sub: "@王元 Wokki",
      href: "https://www.douyin.com/user/MS4wLjABAAAA6dlxf0baWEWZ4VQl8tuhWY-J8l4PreD1OkEHzCZS9gw",
    },
    email: "self@wokki.com",
  },
  footer: {
    line: "逍遥派 · Subtle Art School",
    sub: "琴棋戏书画，花鸟诗酒茶。",
  },
};
