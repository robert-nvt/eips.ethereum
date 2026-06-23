import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getEipsByBucket } from "@/lib/data";
import { bucketBySlug, CATEGORIES } from "@/lib/categories";
import { getDictionary, isLocale, LOCALES, CATEGORY_LABELS, type Locale } from "@/lib/i18n";
import { EipCard } from "@/components/eip-card";

export const revalidate = 3600;

export function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of LOCALES) {
    for (const c of CATEGORIES) params.push({ lang, slug: c.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const cat = bucketBySlug(slug);
  if (!cat) return { title: "Not found" };
  return {
    title: cat.label,
    description: cat.description,
    alternates: {
      canonical: `/${lang}/categories/${slug}`,
      languages: { "en-US": `/en/categories/${slug}`, "vi-VN": `/vi/categories/${slug}` },
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const cat = bucketBySlug(slug);
  if (!cat) notFound();
  const eips = await getEipsByBucket(cat.bucket);

  return (
    <main className="flex-1 space-y-6 px-4 py-6 sm:px-6">
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        {dict.common.backHome}
      </Link>

      <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-card/60 p-7 backdrop-blur-xl">
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full blur-3xl"
          style={{ background: cat.glow }}
        />
        <div className="relative flex items-center gap-4">
          <span
            className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10"
            style={{ background: `${cat.color}1a`, boxShadow: `0 0 24px ${cat.glow}` }}
          >
            <cat.icon className="h-7 w-7" style={{ color: cat.color }} />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-white">{CATEGORY_LABELS[locale][cat.bucket]}</h1>
            <p className="mt-1 text-sm text-muted">{cat.description}</p>
          </div>
          <span className="ml-auto rounded-xl bg-white/5 px-4 py-2 text-sm">
            <span className="text-xs text-muted">{dict.common.showing} </span>
            <span className="font-bold text-white">{eips.length}</span>
            <span className="text-xs text-muted"> {dict.common.eips}</span>
          </span>
        </div>
      </div>

      {eips.length === 0 ? (
        <div className="glass-card grid place-items-center py-20 text-muted">
          {dict.search.noResults}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {eips.map((eip, i) => (
            <EipCard key={eip.id} eip={eip} locale={locale} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
