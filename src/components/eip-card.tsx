"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categoryByBucket } from "@/lib/categories";
import { eipLabel } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { FavoriteButton } from "@/components/favorite-button";
import { CATEGORY_LABELS } from "@/lib/i18n";
import type { Eip, Locale } from "@/lib/types";

export function EipCard({
  eip,
  locale,
  index = 0,
}: {
  eip: Eip;
  locale: Locale;
  index?: number;
}) {
  const cat = categoryByBucket(eip.bucket);
  const Icon = cat.icon;
  const label = eipLabel(eip);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
    >
      <Link
        href={`/${locale}/eips/${eip.id}`}
        className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-card/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
        style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.35)" }}
      >
        {/* glow */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-60"
          style={{ background: cat.glow }}
        />
        <div className="flex items-start justify-between gap-3">
          <div
            className="grid h-12 w-12 place-items-center rounded-xl border border-white/10"
            style={{ background: `${cat.color}1a`, boxShadow: `0 0 18px ${cat.glow}` }}
          >
            <Icon className="h-6 w-6" style={{ color: cat.color }} />
          </div>
          <span
            className="rounded-md px-2 py-1 text-xs font-semibold"
            style={{ background: `${cat.color}1f`, color: cat.color }}
          >
            {label}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          <h3 className="text-base font-semibold leading-snug text-white">{eip.title}</h3>
          <p className="line-clamp-2 text-sm text-muted">{eip.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span
            className="rounded-md px-2 py-1 text-xs font-medium"
            style={{ background: `${cat.color}14`, color: cat.color }}
          >
            {CATEGORY_LABELS[locale][cat.bucket]}
          </span>
          <div className="flex items-center gap-1.5">
            <StatusBadge status={eip.status} locale={locale} className="hidden sm:inline-flex" />
            <FavoriteButton id={eip.id} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
