import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { SearchClient } from "@/components/search-client";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  return (
    <Suspense fallback={<div className="flex-1 p-6 text-muted">…</div>}>
      <SearchClient locale={locale} dict={dict} />
    </Suspense>
  );
}
