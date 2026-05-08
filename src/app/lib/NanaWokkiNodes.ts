export const NANA_WOKKI = "nana.wokki" as const;

export type NanaSongBadge = "tonight" | "new" | "encore";

export type NanaSong = {
  id: string;
  title: string;
  romanization?: string;
  artist: string;
  capo?: string;
  note?: string;
  badge?: NanaSongBadge;
};

export type NanaCategory = {
  id: string;
  zh: string;
  en: string;
  blurb: string;
  songs: NanaSong[];
};

export type NanaAboutBullet = {
  label: string;
  description: string;
};

export type NanaLink = {
  label: string;
  href: string;
};

export type NanaWokki = {
  meta: {
    title: string;
    description: string;
    ogImage: string;
  };
  header: {
    onAirLabel: string;
    onAirSub: string;
    nav: {
      setlist: string;
      about: string;
      home: NanaLink;
    };
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    subtitleZh: string;
    primaryCta: NanaLink;
    randomCtaLabel: string;
    localTimeSuffix: string;
  };
  setlist: {
    eyebrow: string;
    title: string;
    description: string;
    searchPlaceholder: string;
    clearLabel: string;
    allTabLabel: string;
    allTabLabelZh: string;
    counterSingular: string;
    counterPlural: string;
    counterQueued: string;
    emptyTitle: string;
    emptyActionLabel: string;
    queueAddLabel: string;
    queueRemoveLabel: string;
    badges: Record<NanaSongBadge, string>;
    categories: NanaCategory[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    bullets: NanaAboutBullet[];
  };
  queueDock: {
    empty: string;
    clearLabel: string;
    copyLabel: string;
    copiedLabel: string;
    clipboardHeader: string;
  };
  footer: {
    curatedPrefix: string;
    curatedLink: NanaLink;
    rightLine: string;
  };
};

export const nanaWokki: NanaWokki = {
  meta: {
    title: "Nana · 黑屏吉他弹唱 · Setlist",
    description:
      "A quiet, black-screen guitar set under a small account. The menu of songs is the whole stage — please focus on the singing and the art itself.",
    ogImage: "/w.png",
  },
  header: {
    onAirLabel: "On Air",
    onAirSub: "· 黑屏直播 · 仅声音",
    nav: {
      setlist: "Setlist",
      about: "About",
      home: { label: "Wokki.com", href: "/" },
    },
  },
  hero: {
    eyebrow: "Small account · 小号 · Anonymous guitar set",
    titleLead: "Nana's",
    titleAccent: "Setlist.",
    subtitle:
      "A quiet, black-screen guitar livestream. No face, no chyrons, no show — just the song, the room, and the breath in between.",
    subtitleZh: "让大家关注到歌唱和艺术本身。请把屏幕调暗，留下耳朵。",
    primaryCta: { label: "Open the Menu", href: "#setlist" },
    randomCtaLabel: "Surprise me · 随机一首",
    localTimeSuffix: "local",
  },
  setlist: {
    eyebrow: "Setlist · 歌单",
    title: "Tonight's Menu",
    description:
      "Tap any song to add it to your request queue. When you're ready, copy the list and paste it into the live chat as 点歌.",
    searchPlaceholder: "Search · 搜歌名、歌手、调",
    clearLabel: "Clear",
    allTabLabel: "All",
    allTabLabelZh: "全部",
    counterSingular: "song",
    counterPlural: "songs",
    counterQueued: "queued",
    emptyTitle: "Nothing matched. Try a different word — or",
    emptyActionLabel: "let the room pick",
    queueAddLabel: "Add · 点",
    queueRemoveLabel: "Queued",
    badges: {
      tonight: "TONIGHT",
      new: "NEW",
      encore: "ENCORE",
    },
    categories: [
      {
        id: "originals",
        zh: "自创",
        en: "Originals",
        blurb: "Songs Nana wrote. Sung the way they were written — softly.",
        songs: [
          {
            id: "fangjian",
            title: "房间",
            romanization: "Fáng Jiān",
            artist: "Ouyang Nana",
            capo: "Capo 2 · G",
            badge: "tonight",
          },
          {
            id: "nabi",
            title: "Nabi",
            artist: "Ouyang Nana",
            capo: "No capo · D",
          },
          {
            id: "nana",
            title: "娜娜",
            romanization: "Nana",
            artist: "Ouyang Nana",
            capo: "Capo 3 · C",
          },
        ],
      },
      {
        id: "mandarin",
        zh: "中文流行",
        en: "Mandarin",
        blurb: "The ones that always get requested. Slowed down for the room.",
        songs: [
          {
            id: "xjnxjn",
            title: "想见你想见你想见你",
            romanization: "Xiǎng Jiàn Nǐ × 3",
            artist: "八三夭",
            capo: "Capo 4 · G",
            badge: "tonight",
          },
          {
            id: "piaoyang",
            title: "漂洋过海来看你",
            romanization: "Piāo Yáng Guò Hǎi Lái Kàn Nǐ",
            artist: "娃娃 / 李宗盛",
            capo: "Capo 1 · C",
          },
          {
            id: "hongdou",
            title: "红豆",
            romanization: "Hóng Dòu",
            artist: "王菲",
            capo: "Capo 2 · G",
          },
          {
            id: "houlai",
            title: "后来",
            romanization: "Hòu Lái",
            artist: "刘若英",
            capo: "Capo 3 · G",
          },
          {
            id: "xiaoxingyun",
            title: "小幸运",
            romanization: "Xiǎo Xìng Yùn",
            artist: "田馥甄",
            capo: "Capo 2 · C",
          },
          {
            id: "women",
            title: "我们",
            romanization: "Wǒ Men",
            artist: "陈奕迅",
            capo: "Capo 4 · G",
          },
          {
            id: "yanyuan",
            title: "演员",
            romanization: "Yǎn Yuán",
            artist: "薛之谦",
            capo: "Capo 1 · Em",
          },
          {
            id: "qifengle",
            title: "起风了",
            romanization: "Qǐ Fēng Le",
            artist: "买辣椒也用券",
            capo: "Capo 4 · C",
            badge: "encore",
          },
          {
            id: "xinyuan",
            title: "心愿便利贴",
            romanization: "Xīn Yuàn Biàn Lì Tiē",
            artist: "邓福如",
            capo: "Capo 5 · G",
          },
          {
            id: "nidedaan",
            title: "你的答案",
            romanization: "Nǐ De Dá Àn",
            artist: "阿冗",
            capo: "Capo 2 · G",
          },
        ],
      },
      {
        id: "folk",
        zh: "民谣 / 经典",
        en: "Folk & Classics",
        blurb: "Familiar shapes. Played gently, like memory.",
        songs: [
          {
            id: "tongnian",
            title: "童年",
            romanization: "Tóng Nián",
            artist: "罗大佑",
            capo: "Capo 2 · G",
          },
          {
            id: "yueliang",
            title: "月亮代表我的心",
            romanization: "Yuè Liàng Dài Biǎo Wǒ De Xīn",
            artist: "邓丽君",
            capo: "Capo 1 · C",
          },
          {
            id: "yishengyouni",
            title: "一生有你",
            romanization: "Yī Shēng Yǒu Nǐ",
            artist: "水木年华",
            capo: "Capo 4 · G",
          },
          {
            id: "haikuotiankong",
            title: "海阔天空",
            romanization: "Hǎi Kuò Tiān Kōng",
            artist: "Beyond",
            capo: "No capo · C",
          },
          {
            id: "dadaoxiang",
            title: "稻香",
            romanization: "Dào Xiāng",
            artist: "周杰伦",
            capo: "Capo 3 · G",
          },
          {
            id: "zuiliangde",
            title: "夜空中最亮的星",
            romanization: "Yè Kōng Zhōng Zuì Liàng De Xīng",
            artist: "逃跑计划",
            capo: "Capo 2 · G",
          },
          {
            id: "fushishanxia",
            title: "富士山下",
            romanization: "Fù Shì Shān Xià",
            artist: "陈奕迅",
            capo: "Capo 4 · G",
          },
        ],
      },
      {
        id: "english",
        zh: "英文",
        en: "English",
        blurb: "Slower. Quieter. Half-whispered into the mic.",
        songs: [
          {
            id: "cityofstars",
            title: "City of Stars",
            artist: "La La Land",
            capo: "Capo 3 · Am",
            badge: "tonight",
          },
          {
            id: "photograph",
            title: "Photograph",
            artist: "Ed Sheeran",
            capo: "Capo 4 · C",
          },
          {
            id: "riptide",
            title: "Riptide",
            artist: "Vance Joy",
            capo: "Capo 1 · Am",
          },
          {
            id: "tennessee",
            title: "Tennessee Whiskey",
            artist: "Chris Stapleton",
            capo: "No capo · A",
          },
          {
            id: "hallelujah",
            title: "Hallelujah",
            artist: "Leonard Cohen",
            capo: "Capo 5 · C",
          },
          {
            id: "vincent",
            title: "Vincent",
            artist: "Don McLean",
            capo: "Capo 4 · G",
          },
          {
            id: "standbyme",
            title: "Stand By Me",
            artist: "Ben E. King",
            capo: "No capo · A",
          },
        ],
      },
    ],
  },
  about: {
    eyebrow: "About this stream · 关于",
    title: "Why a black screen.",
    paragraphs: [
      "This is a small account. No name, no avatar, no bright lights — just six strings, one mic, and a voice that wants to be heard for what it is.",
      "欧阳娜娜希望以小号、黑屏的方式直播吉他弹唱，让大家把目光从「她是谁」移开，重新放回到歌唱与艺术本身。",
      "Dim your screen. Close your eyes if you can. The menu below is the whole stage.",
    ],
    bullets: [
      {
        label: "No camera.",
        description: "The art is the sound, not the singer.",
      },
      {
        label: "No name.",
        description: "Listen first, guess later.",
      },
      {
        label: "No autotune.",
        description: "Quiet mistakes are part of the room.",
      },
      {
        label: "点歌 / Requests.",
        description:
          "Build your queue here, paste it into chat when she opens 点歌.",
      },
    ],
  },
  queueDock: {
    empty: "Tap a song to start your 点歌 queue",
    clearLabel: "Clear",
    copyLabel: "Copy 点歌",
    copiedLabel: "Copied",
    clipboardHeader: "点歌 / Setlist requests for tonight",
  },
  footer: {
    curatedPrefix: "Curated quietly at",
    curatedLink: { label: "wokki.com", href: "/" },
    rightLine:
      "For Nana — and anyone who needs to hear the song before the singer.",
  },
};
