import type { MetadataRoute } from "next";
import { description, siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Capivora",
    description,
    start_url: "/",
    display: "browser",
    background_color: "#f1f3f4",
    theme_color: "#0c1a22",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
