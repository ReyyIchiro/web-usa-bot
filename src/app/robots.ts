import type { MetadataRoute } from "next";
import { brand } from "../../brand.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: `${brand.url}/sitemap.xml`,
  };
}
