import type { MetadataRoute } from "next";
import { WOKKI_DOT_COM } from "./lib/WokkiNodes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${WOKKI_DOT_COM}`;
  return [
    {
      url: `${base}/`,
      changeFrequency: "monthly",
      priority: 1.0,
      lastModified: new Date(),
    },
  ];
}
