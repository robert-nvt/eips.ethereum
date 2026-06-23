import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Users,
  Tag,
  Github,
  ExternalLink,
  Layers,
  GitBranch,
  Languages,
} from "lucide-react";
import {
  getAllEips,
  getEipById,
  getRelatedEips,
  getTranslation,
  getLearningContent,
  POPULAR_IDS,
} from "@/lib/data";
import {
  getDictionary,
  isLocale,
  LOCALES,
  localizeBodyHeadings,
  localizeType,
  localizeCategoryValue,
  type Locale,
} from "@/lib/i18n";
import { categoryByBucket, CATEGORIES } from "@/lib/categories";
import { eipLabel, formatDate, extractToc } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/lib/i18n";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { Markdown } from "@/components/markdown";
import { Toc } from "@/components/toc";
import { LearningMode } from "@/components/learning-mode";
import { RelatedEips } from "@/components/related-eips";
import { FavoriteButton } from "@/components/favorite-button";

export const revalidate = 86400;
export const dynamicParams = true;

// Pre-render the most popular/finalized standards at build time; the long tail
// (~1000+ proposals) is generated on-demand and cached via ISR (dynamicParams).
export async function generateStaticParams() {
  const eips = await getAllEips();
  const notable = eips
    .filter((e) => POPULAR_IDS.includes(e.id) || e.status === "Final")
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 120);
  const ids = new Set([...POPULAR_IDS, ...notable.map((e) => e.id)]);
  const params: { lang: string; id: string }[] = [];
  for (const lang of LOCALES) {
    for (const id of ids) params.push({ lang, id: String(id) });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const eip = await getEipById(Number(id));
  if (!eip) return { title: "Not found" };
  const tr = await getTranslation(eip.id, (isLocale(lang) ? lang : "en") as Locale);
  const title = `${eipLabel(eip)}: ${tr?.title ?? eip.title}`;
  const description = tr?.description ?? eip.description ?? "";
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/eips/${id}`,
      languages: { "en-US": `/en/eips/${id}`, "vi-VN": `/vi/eips/${id}` },
    },
    openGraph: { title, description, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function EipDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = getDictionary(locale);
  const eip = await getEipById(Number(id));
  if (!eip) notFound();

  const [tr, learning, related] = await Promise.all([
    getTranslation(eip.id, locale),
    getLearningContent(eip.id, locale),
    getRelatedEips(eip),
  ]);

  const cat = categoryByBucket(eip.bucket);
  // Prefer a translated body when available; otherwise localize section headings.
  const localizedBody =
    locale === "vi" && tr?.body
      ? tr.body
      : localizeBodyHeadings(eip.body ?? "", locale);
  const toc = extractToc(localizedBody);
  const title = tr?.title ?? eip.title;
  const description = tr?.abstract ?? tr?.description ?? eip.description;
  const showSpecNote = locale === "vi" && !tr?.body;
  const showMachineNote = locale === "vi" && Boolean(tr?.body) && Boolean(tr?.machine);

  const meta = [
    { icon: Users, label: dict.detail.authors, value: eip.authors.join(", ") || "—" },
    { icon: Calendar, label: dict.detail.created, value: formatDate(eip.created) },
    { icon: Tag, label: dict.detail.type, value: localizeType(eip.type, locale) },
    { icon: Layers, label: dict.detail.category, value: localizeCategoryValue(eip.category, locale) },
  ];

  return (
    <div className="flex flex-1">
      <main className="min-w-0 flex-1 space-y-6 px-4 py-6 sm:px-6">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.common.backHome}
        </Link>

        {/* Header card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-card/60 p-6 backdrop-blur-xl sm:p-8">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
            style={{ background: cat.glow }}
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="rounded-lg px-2.5 py-1 font-mono text-sm font-bold"
                style={{ background: `${cat.color}1f`, color: cat.color }}
              >
                {eipLabel(eip)}
              </span>
              <StatusBadge status={eip.status} locale={locale} />
              <Badge variant="outline">
                <cat.icon className="h-3 w-3" style={{ color: cat.color }} />
                {CATEGORY_LABELS[locale][cat.bucket]}
              </Badge>
              <div className="ml-auto flex items-center gap-2">
                <FavoriteButton id={eip.id} size={20} />
              </div>
            </div>

            <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">{title}</h1>
            {description && (
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">{description}</p>
            )}

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {meta.map((m) => (
                <div key={m.label} className="glass rounded-xl px-3 py-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                    <m.icon className="h-3.5 w-3.5" />
                    {m.label}
                  </div>
                  <div className="mt-0.5 truncate text-sm font-medium text-slate-200" title={m.value}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {(eip.requires.length > 0 || eip.replaces.length > 0) && (
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                {eip.requires.length > 0 && (
                  <RefList label={dict.detail.requires} ids={eip.requires} locale={locale} />
                )}
                {eip.replaces.length > 0 && (
                  <RefList label={dict.detail.replaces} ids={eip.replaces} locale={locale} />
                )}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={eip.githubUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
                {dict.detail.viewOnGithub}
              </a>
              <a
                href={eip.officialUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary/90 px-4 py-2 text-sm font-medium text-white shadow-glow transition-colors hover:bg-primary"
              >
                <ExternalLink className="h-4 w-4" />
                {dict.detail.viewOfficial}
              </a>
            </div>
          </div>
        </div>

        {learning && <LearningMode content={learning} dict={dict} />}

        {/* Body */}
        {localizedBody && (
          <div className="glass-card p-6 sm:p-8">
            {showSpecNote && (
              <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-secondary/20 bg-secondary/10 px-4 py-3 text-sm text-cyan-200">
                <Tag className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{dict.detail.specNote}</span>
              </div>
            )}
            {showMachineNote && (
              <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-violet-200">
                <Languages className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{dict.detail.machineNote}</span>
              </div>
            )}
            <Markdown content={localizedBody} />
          </div>
        )}
      </main>

      {/* Right rail: TOC + related */}
      <aside className="hidden w-[300px] shrink-0 flex-col gap-5 px-4 py-6 xl:sticky xl:top-0 xl:flex xl:h-screen xl:overflow-y-auto xl:scrollbar-thin">
        <Toc items={toc} title={dict.detail.toc} />
        <RelatedEips eips={related} locale={locale} title={dict.detail.related} />
      </aside>
    </div>
  );
}

function RefList({ label, ids, locale }: { label: string; ids: number[]; locale: Locale }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1.5 text-muted-foreground">
        <GitBranch className="h-3.5 w-3.5" />
        {label}:
      </span>
      <div className="flex flex-wrap gap-1.5">
        {ids.map((id) => (
          <Link
            key={id}
            href={`/${locale}/eips/${id}`}
            className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-xs text-secondary transition-colors hover:bg-white/10"
          >
            #{id}
          </Link>
        ))}
      </div>
    </div>
  );
}
