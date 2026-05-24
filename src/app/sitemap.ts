import type { MetadataRoute } from "next";

const SITE_URL = "https://apex.texasserviceexperts.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "services", changeFrequency: "monthly", priority: 0.9 },
    { path: "industries", changeFrequency: "monthly", priority: 0.9 },
    { path: "industries/roofing", changeFrequency: "monthly", priority: 0.8 },
    { path: "industries/hvac", changeFrequency: "monthly", priority: 0.8 },
    { path: "industries/remodeling", changeFrequency: "monthly", priority: 0.8 },
    { path: "industries/pool", changeFrequency: "monthly", priority: 0.8 },
    {
      path: "industries/general-contractors",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { path: "pricing", changeFrequency: "monthly", priority: 0.9 },
    { path: "about", changeFrequency: "monthly", priority: 0.7 },
    { path: "contact", changeFrequency: "monthly", priority: 0.7 },
  ];

  return routes.map((r) => ({
    url: r.path ? `${SITE_URL}/${r.path}` : SITE_URL,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
