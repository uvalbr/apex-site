import type { MetadataRoute } from "next";
import { ARTICLE_SLUGS } from "@/lib/resources-data";

const SITE_URL = "https://apexrevenueoperations.com";

export const dynamic = "force-static";

// Per-route lastModified timestamps. Updated when a route's content is
// materially changed; not all-same so crawlers see real signals.
const LAST_MODIFIED = {
  home: new Date("2026-05-24T12:00:00Z"),
  services: new Date("2026-05-24T12:00:00Z"),
  industriesHub: new Date("2026-05-24T12:00:00Z"),
  industryDetail: new Date("2026-05-20T12:00:00Z"),
  pricing: new Date("2026-05-22T12:00:00Z"),
  about: new Date("2026-05-18T12:00:00Z"),
  contact: new Date("2026-05-18T12:00:00Z"),
  privacy: new Date("2026-05-24T12:00:00Z"),
  terms: new Date("2026-05-24T12:00:00Z"),
  resourcesHub: new Date("2026-05-24T12:00:00Z"),
  resourcesArticle: new Date("2026-05-24T12:00:00Z"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: string;
    lastModified: Date;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", lastModified: LAST_MODIFIED.home, changeFrequency: "weekly", priority: 1.0 },
    { path: "services", lastModified: LAST_MODIFIED.services, changeFrequency: "monthly", priority: 0.9 },
    { path: "industries", lastModified: LAST_MODIFIED.industriesHub, changeFrequency: "monthly", priority: 0.9 },
    { path: "industries/roofing", lastModified: LAST_MODIFIED.industryDetail, changeFrequency: "monthly", priority: 0.8 },
    { path: "industries/hvac", lastModified: LAST_MODIFIED.industryDetail, changeFrequency: "monthly", priority: 0.8 },
    { path: "industries/remodeling", lastModified: LAST_MODIFIED.industryDetail, changeFrequency: "monthly", priority: 0.8 },
    { path: "industries/pool", lastModified: LAST_MODIFIED.industryDetail, changeFrequency: "monthly", priority: 0.8 },
    {
      path: "industries/general-contractors",
      lastModified: LAST_MODIFIED.industryDetail,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { path: "pricing", lastModified: LAST_MODIFIED.pricing, changeFrequency: "monthly", priority: 0.9 },
    { path: "about", lastModified: LAST_MODIFIED.about, changeFrequency: "monthly", priority: 0.7 },
    { path: "contact", lastModified: LAST_MODIFIED.contact, changeFrequency: "monthly", priority: 0.7 },
    { path: "privacy", lastModified: LAST_MODIFIED.privacy, changeFrequency: "yearly", priority: 0.3 },
    { path: "terms", lastModified: LAST_MODIFIED.terms, changeFrequency: "yearly", priority: 0.3 },
    { path: "resources", lastModified: LAST_MODIFIED.resourcesHub, changeFrequency: "weekly", priority: 0.8 },
    ...ARTICLE_SLUGS.map((slug) => ({
      path: `resources/${slug}`,
      lastModified: LAST_MODIFIED.resourcesArticle,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return routes.map((r) => ({
    url: r.path ? `${SITE_URL}/${r.path}` : SITE_URL,
    lastModified: r.lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
