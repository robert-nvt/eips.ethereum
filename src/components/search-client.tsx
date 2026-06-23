"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { Search as SearchIcon } from "lucide-react";
import {
  buildFuse,
  loadSearchIndex,
  runSearch,
  type SearchDoc,
} from "@/lib/search";
import { categoryByBucket } from "@/lib/categories";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function SearchClient({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [docs, setDocs] = useState<SearchDoc[]>([]);

  useEffect(() => {
    loadSearchIndex().then(setDocs);
  }, []);

  const fuse = useMemo<Fuse<SearchDoc> | null>(
    () => (docs.length ? buildFuse(docs) : null),
    [docs]
  );
  const results = useMemo(
    () => (fuse ? runSearch(fuse, query, 60) : []),
    [fuse, query]
  );

  return (
    <main className="flex-1 space-y-6 px-4 py-6 sm:px-6">
      <div className="glass flex h-14 items-center gap-3 rounded-2xl px-5">
        <SearchIcon className="h-5 w-5 text-muted" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={dict.search.placeholder}
          className="h-full flex-1 bg-transparent text-base text-white placeholder:text-muted-foreground focus:outline-none"
        />
        {query && (
          <span className="text-sm text-muted">
            {results.length} {dict.search.results}
          </span>
        )}
      </div>

      {!query && (
        <div className="glass-card grid place-items-center py-24 text-muted">
          {dict.search.typeToSearch}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="glass-card grid place-items-center py-24 text-muted">
          {dict.search.noResults}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3">
        {results.map((doc) => {
          const cat = categoryByBucket(doc.bucket);
          return (
            <Link
              key={doc.id}
              href={`/${locale}/eips/${doc.id}`}
              className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-card/60 p-4 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/15"
            >
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
                style={{ background: `${cat.color}1a` }}
              >
                <cat.icon className="h-5 w-5" style={{ color: cat.color }} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-secondary">{doc.label}</span>
                  <span className="truncate font-medium text-white">{doc.title}</span>
                </div>
                <p className="mt-0.5 line-clamp-1 text-sm text-muted">{doc.description}</p>
              </div>
              <StatusBadge status={doc.status} locale={locale} className="hidden shrink-0 sm:inline-flex" />
            </Link>
          );
        })}
      </div>
    </main>
  );
}
