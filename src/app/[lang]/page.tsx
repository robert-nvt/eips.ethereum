import type { Metadata } from "next";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { getStats, getPopularEips, getPopularRanking } from "@/lib/data";
import { Hero } from "@/components/hero";
import { PopularStandards } from "@/components/popular-standards";
import { RightSidebar } from "@/components/right-sidebar";
import { FooterBar } from "@/components/footer-bar";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(isLocale(lang) ? lang : "en");
  return {
    title: "Ethereum EIP Explorer",
    description: dict.hero.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { "en-US": "/en", "vi-VN": "/vi" },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (isLocale(lang) ? lang : "en") as Locale;
  const dict = getDictionary(locale);

  const [stats, popular, ranking] = await Promise.all([
    getStats(),
    getPopularEips(),
    Promise.resolve(getPopularRanking()),
  ]);

  return (
    <div className="flex flex-1">
      <main className="min-w-0 flex-1 space-y-8 px-4 py-6 sm:px-6">
        <Hero dict={dict} stats={stats} />
        <PopularStandards eips={popular} locale={locale} dict={dict} />
        <FooterBar locale={locale} dict={dict} />
      </main>
      <RightSidebar locale={locale} dict={dict} stats={stats} ranking={ranking} />
    </div>
  );
}
