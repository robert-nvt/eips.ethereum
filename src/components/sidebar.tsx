"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES, OVERVIEW_NAV } from "@/lib/categories";
import { CATEGORY_LABELS, type Dictionary } from "@/lib/i18n";
import { EthLogo } from "@/components/eth-logo";
import { formatCompact, formatDate, cn } from "@/lib/utils";
import type { EipStats, Locale } from "@/lib/types";

export function Sidebar({
  locale,
  dict,
  stats,
}: {
  locale: Locale;
  dict: Dictionary;
  stats: EipStats;
}) {
  const pathname = usePathname();
  const base = `/${locale}`;
  const isOverview = pathname === base || pathname === `${base}/`;

  return (
    <aside className="hidden h-screen w-[264px] shrink-0 flex-col gap-6 overflow-y-auto border-r border-white/[0.06] bg-card/40 px-4 py-6 backdrop-blur-xl scrollbar-thin lg:sticky lg:top-0 lg:flex">
      {/* Logo */}
      <Link href={base} className="flex items-center gap-3 px-2">
        <div className="h-10 w-10 animate-float">
          <EthLogo />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-bold text-white">Ethereum EIPs</div>
          <div className="text-xs text-muted">Explorer</div>
        </div>
      </Link>

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        <NavItem
          href={base}
          active={isOverview}
          icon={<OVERVIEW_NAV.icon className="h-[18px] w-[18px]" />}
          label={dict.nav.overview}
          highlight
        />
        <div className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {dict.nav.categories}
        </div>
        {CATEGORIES.map((c) => {
          const href = `${base}/categories/${c.slug}`;
          const active = pathname === href;
          return (
            <NavItem
              key={c.slug}
              href={href}
              active={active}
              icon={<c.icon className="h-[18px] w-[18px]" style={{ color: c.color }} />}
              label={CATEGORY_LABELS[locale][c.bucket]}
            />
          );
        })}
      </nav>

      {/* Statistics */}
      <div className="mt-auto px-1">
        <div className="px-2 pb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {dict.nav.statistics}
        </div>
        <div className="space-y-3 rounded-2xl border border-white/[0.06] bg-card/50 p-4">
          <Stat label={dict.nav.totalEips} value={`${formatCompact(stats.total)}+`} color="#818CF8" />
          <Stat label={dict.nav.final} value={`${formatCompact(stats.final)}+`} color="#10B981" />
          <Stat label={dict.nav.draft} value={`${formatCompact(stats.draft)}+`} color="#F59E0B" />
          <Stat label={dict.nav.review} value={`${formatCompact(stats.review)}+`} color="#8B5CF6" />
          <div className="border-t border-white/5 pt-3">
            <div className="text-[11px] text-muted-foreground">{dict.nav.lastUpdated}</div>
            <div className="text-sm font-semibold text-cyan-300">
              {formatDate(stats.lastUpdated)}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  href,
  active,
  icon,
  label,
  highlight,
}: {
  href: string;
  active: boolean;
  icon: React.ReactNode;
  label: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
        active
          ? "bg-primary/15 text-white shadow-[inset_0_0_0_1px_rgba(79,70,229,0.4)]"
          : "text-slate-400 hover:bg-white/[0.04] hover:text-white",
        highlight && active && "bg-primary/20"
      )}
    >
      {icon}
      <span className="truncate">{label}</span>
    </Link>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-sm font-bold" style={{ color }}>
        {value}
      </span>
    </div>
  );
}
