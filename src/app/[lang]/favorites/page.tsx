import { notFound } from "next/navigation";
import { getDictionary, isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { FavoritesClient } from "@/components/favorites-client";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function FavoritesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  return <FavoritesClient locale={locale} dict={getDictionary(locale)} />;
}
