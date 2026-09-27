import { applications, facts, linkedin } from "@/content/site";

// Absolute site URL for canonical links, sitemap, robots and structured data.
// Set NEXT_PUBLIC_SITE_URL to the real domain in production (e.g. https://capivora.com).
// On Vercel the production domain is picked up automatically if it is not set.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

// Only the real production site should be indexed (not local dev or preview deploys).
export const indexable = process.env.NODE_ENV === "production" && process.env.VERCEL_ENV !== "preview";

export const siteName = "Capivora Robotics";
export const title = "Capivora Robotics | AI Vision Systems for Smart Manufacturing";
export const description =
  "Capivora Robotics builds AI vision systems for smart manufacturing, from quality inspection to robotic picking. Pre-incubated at Nirmaan, IIT Madras.";

export const keywords = [
  "Capivora Robotics",
  "machine vision",
  "computer vision",
  "AI vision systems",
  "robotics startup",
  "smart manufacturing",
  "industrial automation",
  "robot vision",
  ...applications.map((a) => a.title.toLowerCase()),
  "Chennai",
  "IIT Madras",
];

// schema.org structured data: who the company is, and the website itself.
export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      alternateName: "Capivora",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/brand/capivora-logo.png`, width: 1120, height: 332 },
      image: `${siteUrl}/icon.png`,
      description,
      foundingDate: facts[0].value,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
      sameAs: [linkedin],
      knowsAbout: ["Machine vision", "Computer vision", "Robotics", "Smart manufacturing", ...applications.map((a) => a.title)],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};
