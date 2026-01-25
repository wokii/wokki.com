import type { MetadataRoute } from "next";
import { WOKKI_DOT_COM } from "./lib/WokkiNodes";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `https://${WOKKI_DOT_COM}/sitemap.xml`,
  };
}
