import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

// One-page site: the home page is the only URL (sections are #anchors, which
// search engines treat as the same page). Add new pages here when they exist.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
