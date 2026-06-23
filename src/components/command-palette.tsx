"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import Fuse from "fuse.js";
import { Search, CornerDownLeft, Hash } from "lucide-react";
import { useUiStore } from "@/lib/store";
import {
  buildFuse,
  loadSearchIndex,
  runSearch,
  type SearchDoc,
} from "@/lib/search";
import { StatusBadge } from "@/components/ui/status-badge";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function CommandPalette({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const open = useUiStore((s) => s.searchOpen);
  const setOpen = useUiStore((s) => s.setSearchOpen);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) loadSearchIndex().then(setDocs);
  }, [open]);

  const fuse = useMemo<Fuse<SearchDoc> | null>(
    () => (docs.length ? buildFuse(docs) : null),
    [docs]
  );
  const results = useMemo(
    () => (fuse ? runSearch(fuse, query, 8) : []),
    [fuse, query]
  );

  useEffect(() => setActive(0), [query]);

  function go(doc: SearchDoc) {
    setOpen(false);
    setQuery("");
    router.push(`/${locale}/eips/${doc.id}`);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
          className="fixed left-1/2 top-[15%] z-50 w-[92vw] max-w-2xl -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-card/95 shadow-2xl backdrop-blur-2xl data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95"
        >
          <Dialog.Title className="sr-only">{dict.search.title}</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-white/10 px-4">
            <Search className="h-5 w-5 text-muted" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((a) => Math.min(a + 1, results.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((a) => Math.max(a - 1, 0));
                } else if (e.key === "Enter" && results[active]) {
                  go(results[active]);
                }
              }}
              placeholder={dict.search.placeholder}
              className="h-14 flex-1 bg-transparent text-base text-white placeholder:text-muted-foreground focus:outline-none"
            />
            <kbd className="hidden rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-muted sm:block">
              ESC
            </kbd>
          </div>

          <div className="max-h-[50vh] overflow-y-auto p-2 scrollbar-thin">
            {query && results.length === 0 && (
              <div className="px-4 py-10 text-center text-sm text-muted">
                {dict.search.noResults}
              </div>
            )}
            {!query && (
              <div className="px-4 py-10 text-center text-sm text-muted">
                {dict.search.typeToSearch}
              </div>
            )}
            {results.map((doc, i) => (
              <button
                key={doc.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(doc)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                  i === active ? "bg-primary/15" : "hover:bg-white/5"
                }`}
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/5">
                  <Hash className="h-4 w-4 text-secondary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-secondary">
                      {doc.label}
                    </span>
                    <span className="truncate text-sm font-medium text-white">{doc.title}</span>
                  </div>
                  <div className="truncate text-xs text-muted">{doc.description}</div>
                </div>
                <StatusBadge status={doc.status} locale={locale} className="hidden shrink-0 sm:inline-flex" />
                {i === active && <CornerDownLeft className="h-4 w-4 text-muted" />}
              </button>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
