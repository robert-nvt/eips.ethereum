import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import { EipCard } from "@/components/eip-card";
import type { Dictionary } from "@/lib/i18n";
import type { Eip, Locale } from "@/lib/types";

export function PopularStandards({
  eips,
  locale,
  dict,
}: {
  eips: Eip[];
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-warning/15">
            <Flame className="h-5 w-5 text-warning" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-white">{dict.popular.title}</h2>
            <p className="text-xs text-muted">{dict.popular.subtitle}</p>
          </div>
        </div>
        <Link
          href={`/${locale}/categories/token`}
          className="flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-cyan-300"
        >
          {dict.popular.viewAll}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {eips.map((eip, i) => (
          <EipCard key={eip.id} eip={eip} locale={locale} index={i} />
        ))}
      </div>
    </section>
  );
}
