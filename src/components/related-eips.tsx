import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryByBucket } from "@/lib/categories";
import { eipLabel } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Eip, Locale } from "@/lib/types";

export function RelatedEips({
  eips,
  locale,
  title,
}: {
  eips: Eip[];
  locale: Locale;
  title: string;
}) {
  if (eips.length === 0) return null;
  return (
    <div className="glass-card p-5">
      <h3 className="mb-3 font-bold text-white">{title}</h3>
      <ul className="space-y-2">
        {eips.map((e) => {
          const cat = categoryByBucket(e.bucket);
          return (
            <li key={e.id}>
              <Link
                href={`/${locale}/eips/${e.id}`}
                className="group flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-white/5"
              >
                <cat.icon className="h-4 w-4 shrink-0" style={{ color: cat.color }} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-secondary">
                      {eipLabel(e)}
                    </span>
                    <span className="truncate text-sm text-slate-200">{e.title}</span>
                  </div>
                </div>
                <StatusBadge status={e.status} locale={locale} className="hidden shrink-0 lg:inline-flex" />
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
