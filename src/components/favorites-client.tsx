"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { useUiStore } from "@/lib/store";
import { loadSearchIndex, type SearchDoc } from "@/lib/search";
import { categoryByBucket } from "@/lib/categories";
import { StatusBadge } from "@/components/ui/status-badge";
import { FavoriteButton } from "@/components/favorite-button";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function FavoritesClient({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const favorites = useUiStore((s) => s.favorites);
  const [docs, setDocs] = useState<SearchDoc[]>([]);

  useEffect(() => {
    loadSearchIndex().then(setDocs);
  }, []);

  const items = docs.filter((d) => favorites.includes(d.id));

  return (
    <main className="flex-1 space-y-6 px-4 py-6 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-300/15">
          <Star className="h-5 w-5 fill-amber-300 text-amber-300" />
        </span>
        <h1 className="text-2xl font-bold text-white">{dict.header.favorites}</h1>
      </div>

      {items.length === 0 ? (
        <div className="glass-card grid place-items-center gap-2 py-24 text-center text-muted">
          <Star className="h-8 w-8 text-muted-foreground" />
          <p>{dict.search.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((doc) => {
            const cat = categoryByBucket(doc.bucket);
            return (
              <div
                key={doc.id}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-card/60 p-4 backdrop-blur-xl"
              >
                <Link href={`/${locale}/eips/${doc.id}`} className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ background: `${cat.color}1a` }}>
                    <cat.icon className="h-5 w-5" style={{ color: cat.color }} />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-secondary">{doc.label}</span>
                      <span className="truncate font-medium text-white">{doc.title}</span>
                    </div>
                    <StatusBadge status={doc.status} locale={locale} className="mt-1" />
                  </div>
                </Link>
                <FavoriteButton id={doc.id} size={18} />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
