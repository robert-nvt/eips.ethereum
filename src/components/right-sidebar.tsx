import Link from "next/link";
import {
  Flame,
  Star,
  TrendingUp,
  CheckCircle2,
  Clock,
  Github,
  ArrowRight,
} from "lucide-react";
import { StatusDonut } from "@/components/charts/status-donut";
import { formatCompact, percentages } from "@/lib/utils";
import { localizeStatus } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";
import type { EipStats, Locale } from "@/lib/types";

interface RankItem {
  id: number;
  label: string;
  views: number;
  color: string;
}

export function RightSidebar({
  locale,
  dict,
  stats,
  ranking,
}: {
  locale: Locale;
  dict: Dictionary;
  stats: EipStats;
  ranking: RankItem[];
}) {
  // The 5 headline statuses don't cover the whole corpus (Living, Withdrawn,
  // Moved, …). Add an "Other" slice so the ring + center match the real total.
  const shownSum = stats.statusDistribution.reduce((s, d) => s + d.value, 0);
  const otherCount = Math.max(0, stats.total - shownSum);
  const statusData = [
    ...stats.statusDistribution.map((d) => ({ ...d, name: localizeStatus(d.name, locale) })),
    ...(otherCount > 0
      ? [{ name: localizeStatus("Other", locale), value: otherCount, color: "#64748B" }]
      : []),
  ];
  const total = statusData.reduce((s, d) => s + d.value, 0);
  const pcts = percentages(statusData.map((d) => d.value));

  return (
    <aside className="hidden w-[336px] shrink-0 flex-col gap-5 overflow-y-auto px-4 py-6 scrollbar-thin xl:sticky xl:top-0 xl:flex xl:h-screen">
      {/* Popular ranking */}
      <div className="glass-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Flame className="h-[18px] w-[18px] text-warning" />
          <h3 className="font-bold text-white">{dict.right.popularEips}</h3>
        </div>
        <ol className="space-y-2">
          {ranking.map((r, i) => (
            <li key={r.id}>
              <Link
                href={`/${locale}/eips/${r.id}`}
                className="group flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-white/5"
              >
                <span className="w-4 text-center text-sm font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <span
                  className="rounded-md px-2 py-0.5 font-mono text-xs font-semibold"
                  style={{ background: `${r.color}1f`, color: r.color }}
                >
                  {r.label}
                </span>
                <span className="ml-auto flex items-center gap-1 text-xs text-amber-300">
                  <Star className="h-3 w-3 fill-amber-300" />
                  {formatCompact(r.views)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <Link
          href={`/${locale}/categories/token`}
          className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-cyan-300"
        >
          {dict.right.viewRanking}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Status distribution */}
      <div className="glass-card p-5">
        <h3 className="mb-3 font-bold text-white">{dict.right.statusTitle}</h3>
        <div className="flex items-center gap-3">
          <StatusDonut data={statusData} total={total} />
          <ul className="flex-1 space-y-2">
            {statusData.map((d, i) => (
              <li key={d.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-slate-300">{d.name}</span>
                <span className="ml-auto font-semibold text-white">
                  {formatCompact(d.value)}
                </span>
                <span className="w-9 text-right text-muted-foreground">{pcts[i]}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Legend / symbols */}
      <div className="glass-card p-5">
        <h3 className="mb-3 font-bold text-white">{dict.right.legend}</h3>
        <ul className="space-y-2.5 text-sm text-slate-300">
          <LegendRow icon={<Star className="h-4 w-4 fill-amber-300 text-amber-300" />} label={dict.right.favorite} />
          <LegendRow icon={<TrendingUp className="h-4 w-4 text-secondary" />} label={dict.right.popular} />
          <LegendRow icon={<CheckCircle2 className="h-4 w-4 text-success" />} label={dict.right.finalized} />
          <LegendRow icon={<Clock className="h-4 w-4 text-warning" />} label={dict.right.inProgress} />
        </ul>
      </div>

      {/* Contribute */}
      <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/15 to-primary/10 p-5">
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/30 blur-2xl" />
        <h3 className="font-bold text-white">{dict.right.contributeTitle}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
          {dict.right.contributeBody}
        </p>
        <a
          href="https://github.com/ethereum/EIPs"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/15"
        >
          {dict.right.contributeCta}
          <Github className="h-4 w-4" />
        </a>
      </div>
    </aside>
  );
}

function LegendRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <li className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </li>
  );
}
