import type { MetadataRoute } from "next";
import { getAllEips } from "@/lib/data";
import { CATEGORIES } from "@/lib/categories";
import { LOCALES } from "@/lib/i18n";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const eips = await getAllEips();
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LOCALES) {
    entries.push({ url: `${base}/${lang}`, changeFrequency: "daily", priority: 1 });
    entries.push({ url: `${base}/${lang}/search`, changeFrequency: "weekly", priority: 0.5 });
    for (const c of CATEGORIES) {
      entries.push({
        url: `${base}/${lang}/categories/${c.slug}`,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
    for (const e of eips) {
      entries.push({
        url: `${base}/${lang}/eips/${e.id}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }
  return entries;
}
