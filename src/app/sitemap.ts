import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://wokki.com";
  return [
    {
      url: `${base}/`,
      changeFrequency: "monthly",
      priority: 1.0,
      lastModified: new Date(),
    },
  ];
}
