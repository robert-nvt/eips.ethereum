import { notFound } from "next/navigation";
import { LOCALES, isLocale, getDictionary } from "@/lib/i18n";
import { getStats } from "@/lib/data";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { CommandPalette } from "@/components/command-palette";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const stats = await getStats();

  return (
    <div className="flex min-h-screen">
      <Sidebar locale={lang} dict={dict} stats={stats} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header locale={lang} dict={dict} />
        {children}
      </div>
      <CommandPalette locale={lang} dict={dict} />
    </div>
  );
}
