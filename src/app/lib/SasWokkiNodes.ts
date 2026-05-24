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
    brochureLine: string;
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
  admissions: {
    eyebrow: string;
    title: string;
    tagline: string;
    taglineEn: string;
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
    description:
      "We teach you to break a wrist with grace — and to hold a sublime indifference toward the noise of the martial world. An elite academy of subtle arts, hidden in mist, open only to those who already know.",
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
      admissions: "招生",
      contact: "问道",
      home: { label: "Wokki.com", href: "/" },
    },
  },
  hero: {
    eyebrow: "Hidden in the mist · 藏于烟霞",
    titleZh: "逍遥派",
    titleEn: "Subtle Art School",
    subtitle: "坐落在深山老林里的高级文艺书院——至少，对外人是这么说的。",
    subtitleEn:
      "An advanced academy of refined arts, nestled deep in mist-shrouded mountains — or so the outsiders believe.",
    brochureLine:
      "我们教你如何优雅地折断别人的手腕，以及，如何对这个喧嚣的武林保持「逍遥」的精妙态度。",
    primaryCta: {
      label: "阅读招生简章 · Read the Brochure",
      href: "#admissions",
    },
    secondaryCta: { label: "浏览绝学 · The Arts", href: "#arts" },
  },
  manifesto: {
    eyebrow: "名相 · On the Name",
    title: "为什么叫 School，不叫 Sect",
    paragraphs: [
      {
        zh: "逍遥派收徒不仅看脸，还要求琴棋书画、医卜星相、奇门遁甲样样精通。他们本质上是一个精英艺术学霸联盟——不是宗教帮会，而是学派。",
        en: "The Xiaoyao lineage does not merely recruit for combat potential. Disciples must excel across the classical arts — music, strategy, calligraphy, painting, medicine, divination, astronomy, and esoteric geometry. They are, at core, an elite league of artistic savants — not a sect in the religious sense, but a school of thought.",
      },
      {
        zh: "Subtle Art School 保留了那种「老子天下第一、不在乎世俗眼光」的狂傲与洒脱，却将其包装在学术、正经的外壳之下。这种反差，才是最高级的装杯。",
        en: "Subtle Art School preserves the swagger of absolute self-sovereignty — the sublime art of not giving a damn what the world thinks — while wrapping it in the respectable shell of scholarship. That contrast is the finest low-key flex.",
      },
    ],
    nameRationale: [
      {
        heading: "School · 学院质感",
        body: "「School」在英文里既是武术门派，更是学院、学派的代名词。它凸显无崖子、苏星河等人知识渊博、气质高雅的学霸属性。",
        bodyEn:
          "In English, “School” denotes both a martial lineage and an academy of ideas. It foregrounds the scholarly elegance of masters like Wuyazi and Su Xinghe — polymaths, not gang bosses.",
      },
      {
        heading: "Subtle Art · 隐蔽装杯",
        body: "对外，这里是教导精妙艺术的书院；对内，「艺术」是杀人于无形、优雅至极的绝顶武功——比如凌波微步那种极具美感的步法。",
        bodyEn:
          "Outwardly, subtle art means refined culture. Inwardly, it is the art of ending a fight before it begins — footwork so beautiful it looks like dance, force so quiet it feels like weather.",
      },
      {
        heading: "The Attitude · 精神闭环",
        body: "别的门派喊「千秋万载，一统江湖」；我们的招生简章上只写着：逍遥。",
        bodyEn:
          "Other schools shout for eternal dominion. Our brochure simply says: whatever — and means it.",
      },
    ],
  },
  curriculum: {
    eyebrow: "六艺 · The Curriculum",
    title: "入学门槛：样样精通",
    subtitle:
      "琴棋书画 · 医卜星相 · 奇门遁甲 — before you touch a single lethal form.",
    items: [
      {
        glyph: "琴",
        title: "Strings · 音律",
        titleEn: "Qín",
        body: "以音入心，以律合气。逍遥派弟子须能借一曲止戈，或以弦震退敌——美学即武器。",
        bodyEn:
          "Sound enters the mind; rhythm aligns the breath. A single phrase may halt a blade — aesthetics as armament.",
      },
      {
        glyph: "棋",
        title: "Strategy · 弈道",
        titleEn: "Qí",
        body: "棋盘即战场。落子三手之外，胜负已分。苏星河以珍珑棋局择徒，非为消遣，实为识人。",
        bodyEn:
          "The board is the battlefield. Three moves ahead, the outcome is sealed. Su Xinghe’s chess ordeal selects disciples — not pastime, but oracle.",
      },
      {
        glyph: "书",
        title: "Calligraphy · 笔法",
        titleEn: "Shū",
        body: "一笔一画皆含劲力。字可杀人，亦可渡人——取决于你当时「管不管」。",
        bodyEn:
          "Every stroke carries force. Characters can wound or redeem — depending on whether you care that day.",
      },
      {
        glyph: "画",
        title: "Painting · 丹青",
        titleEn: "Huà",
        body: "观画如观势。无崖子以画传功，以石室壁画藏百年绝学——美，是最长的伪装。",
        bodyEn:
          "To read a painting is to read a formation. Wuyazi transmitted gong through murals — beauty as the longest camouflage.",
      },
      {
        glyph: "医",
        title: "Medicine · 医理",
        titleEn: "Yī",
        body: "知生死，方能掌生死。医道与武道同源——逍遥派从不把「救人」与「杀人」分得太清。",
        bodyEn:
          "Know life and death to command them. Medicine and martial arts share one root — the school rarely draws a bright line between healing and ending.",
      },
      {
        glyph: "卜",
        title: "Divination · 星相",
        titleEn: "Bǔ & Xiàng",
        body: "医卜星相，奇门遁甲。逍遥派弟子读天象如读人心——预测，是为了更优雅地不出手。",
        bodyEn:
          "Divination, astronomy, esoteric gates. Disciples read the sky as they read intent — foresight so you need not strike at all.",
      },
    ],
  },
  arts: {
    eyebrow: "绝学 · Signature Arts",
    title: "精妙艺术，杀人无形",
    subtitle:
      "Outsiders see culture. Initiates see combat systems with impeccable taste.",
    items: [
      {
        name: "凌波微步",
        nameEn: "Língbō Wēibù",
        tag: "Movement · 步法",
        body: "凌波而行，微步生莲。世间最美的逃跑路线——也是最难被锁定的杀阵。",
        bodyEn:
          "Walk upon ripples; each step blooms. The most beautiful exit path in the jianghu — and the hardest formation to pin down.",
      },
      {
        name: "北冥神功",
        nameEn: "Běimíng Shéngōng",
        tag: "Absorption · 吸功",
        body: "海纳百川，有容乃大。借他人之力，成逍遥之道——但请先学会「逍遥」，否则反噬。",
        bodyEn:
          "The northern sea accepts all rivers. Borrow force, become free — but only after mastering indifference, or the rebound will end you.",
      },
      {
        name: "小无相功",
        nameEn: "Xiǎo Wúxiàng Gōng",
        tag: "Formless · 无相",
        body: "无形无相，拟形拟意。可化天下武学于掌中——前提是，你本来就样样精通。",
        bodyEn:
          "Without fixed form, it mirrors any form. Every art becomes available — if you were already fluent in every art.",
      },
      {
        name: "天山六阳掌",
        nameEn: "Tiānshān Liùyáng Zhǎng",
        tag: "Palm · 掌法",
        body: "至阳至刚，却出自童姥之手。反差，是逍遥派的签名。",
        bodyEn:
          "Utter yang, utter force — yet transmitted by the Child Elder. Contrast is the school’s watermark.",
      },
      {
        name: "生死符",
        nameEn: "Shēngsǐ Fú",
        tag: "Control · 制敌",
        body: "一针定生死。不是威胁，是日程管理——逍遥派从不大声说话。",
        bodyEn:
          "One needle, two fates. Not a threat — appointment scheduling. The school never raises its voice.",
      },
    ],
  },
  faculty: {
    eyebrow: "名师 · Faculty",
    title: "学霸联盟，各怀绝学",
    subtitle: "They publish papers. They also end disputes. Quietly.",
    items: [
      {
        title: "无崖子 · Wuyazi",
        role: "Founding Patriarch · 开山祖师",
        motif: "崖",
        body: "逍遥派之祖。琴棋书画皆通，石室壁画藏百年传承。因情所困，因道逍遥——典型的学霸悲剧，也是典型的逍遥起点。",
        bodyEn:
          "Founder of the lineage. Polymath, mural-archivist, keeper of a century of transmission. Trapped by attachment, liberated by doctrine — the scholar’s tragedy that birthed the school.",
        lineage: ["画 · Murals", "无相 · Formless", "情 · Attachment"],
      },
      {
        title: "苏星河 · Su Xinghe",
        role: "Eight Friends · 八弟子之首",
        motif: "棋",
        body: "珍珑棋局择徒，以死传功。苏星河不是「武夫」，是「Problem Setter」——逍遥派最严格的 Admissions Officer。",
        bodyEn:
          "He chose heirs through an impossible chess puzzle and died transmitting power. Not a brawler — a problem setter. The school’s strictest admissions officer.",
        lineage: ["棋 · Strategy", "择徒 · Selection", "传功 · Transmission"],
      },
      {
        title: "天山童姥 · Tianshan Child Elder",
        role: "Northern Line · 天山一脉",
        motif: "童",
        body: "八荒六合唯我独尊——听起来很中二，执行起来很有效。童姥证明：逍遥派允许你狂，只要你真有本事。",
        bodyEn:
          "“Eight directions, six harmonies — only I am supreme.” Sounds adolescent. Works. The Child Elder proves: swagger is permitted when backed by competence.",
        lineage: ["六阳 · Yang Palm", "符 · Talismans", "尊 · Sovereignty"],
      },
      {
        title: "李秋水 · Li Qiushui",
        role: "Southern Line · 南疆一脉",
        motif: "水",
        body: "秋水长天，美与杀并行。逍遥派从不承诺「纯善」——只承诺「有品味」。",
        bodyEn:
          "Autumn water, endless sky — beauty and lethality in parallel. The school never promised goodness. It promised taste.",
        lineage: ["身法 · Movement", "毒 · Toxin", "魅 · Allure"],
      },
    ],
  },
  admissions: {
    eyebrow: "招生 · Admissions",
    title: "招生简章",
    tagline: "我们不喊口号。我们只发 syllabus。",
    taglineEn: "We don’t chant slogans. We distribute syllabi.",
    requirements: [
      {
        label: "颜值 · Presentation",
        detail:
          "逍遥派传统上「收徒看脸」。这不是肤浅——是相信气质即修炼的外显。",
        detailEn:
          "The lineage historically selects for presence. Not vanity — the belief that temperament shows on the surface.",
      },
      {
        label: "全才 · Polymath",
        detail: "六艺不全者，连珍珑棋局的边都摸不到。",
        detailEn:
          "Without mastery across the six arts, you will not even reach the first move of the chess ordeal.",
      },
      {
        label: "态度 · Attitude",
        detail:
          "须已初步掌握「逍遥」——否则北冥神功第一课就会教你什么叫真的管不了。",
        detailEn:
          "Prior fluency in enlightened indifference required — otherwise Lesson One of Beiming Shen Gong will teach you what ‘cannot cope’ feels like.",
      },
    ],
    brochure: [
      "本派不设「千秋万载，一统江湖」之宏愿。",
      "本派不设「血债血偿」之俗套。",
      "本派教授：如何优雅地折断别人的手腕。",
      "本派教授：如何对喧嚣武林保持精妙的不在乎。",
      "本派位于：你地图上没有的地方。",
      "本派开放日：没有。",
    ],
    brochureEn: [
      "We do not aspire to eternal dominion over the jianghu.",
      "We do not traffic in crude vengeance arcs.",
      "We teach: how to break a wrist with grace.",
      "We teach: how to hold sublime indifference toward martial-world noise.",
      "We are located: where your map ends.",
      "Open day: never.",
    ],
    note: "若你读到这里仍想入门——恭喜，你已经通过了第一道筛选：好奇心比野心更诚实。",
    noteEn:
      "If you still wish to enroll after reading this — congratulations. You passed the first filter: curiosity more honest than ambition.",
  },
  tenets: {
    eyebrow: "心法 · Tenets",
    title: "逍遥三诀",
    items: [
      {
        zh: "无招",
        en: "No Fixed Form",
        body: "小无相功之髓。形式是借来的，内核是自己的。",
        bodyEn: "The marrow of formless gong — borrow shapes, keep your core.",
      },
      {
        zh: "无求",
        en: "No Craving",
        body: "不争名，不争位，不争「天下第一」——除非你真的无聊。",
        bodyEn: "No thirst for titles — unless you are genuinely bored.",
      },
      {
        zh: "无扰",
        en: "No Disturbance",
        body: "逍遥。这是最高心法，也是最低门槛。",
        bodyEn: "Whatever. The highest doctrine and the lowest bar.",
      },
    ],
  },
  contact: {
    eyebrow: "问道 · Inquire",
    title: "找不到山门？正常。",
    body: "逍遥派不对公众开放。若你与派中已有渊源——或你只是想聊聊 TRPG 设定、同人世界观、公会 Lore——欢迎传书。",
    bodyEn:
      "The school is not open to the public. If you share lineage with an initiate — or simply wish to discuss TRPG lore, fan-worldbuilding, or guild mythology — a letter is welcome.",
    cta: {
      label: "传书 · Send a Letter",
      href: "mailto:self@wokki.com?subject=Subtle%20Art%20School%20%E9%97%AE%E9%81%93",
    },
    email: "self@wokki.com",
  },
  footer: {
    line: "逍遥派 · Subtle Art School",
    sub: "An elite academy of subtle arts — if you know, you know.",
  },
};
