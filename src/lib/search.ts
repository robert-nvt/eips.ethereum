import Fuse, { type IFuseOptions } from "fuse.js";

export interface SearchDoc {
  id: number;
  label: string;
  title: string;
  title_vi?: string;
  description?: string;
  description_vi?: string;
  authors: string[];
  tags: string[];
  tags_vi?: string[];
  bucket: string;
  category?: string | null;
  status: string;
}

const FUSE_OPTIONS: IFuseOptions<SearchDoc> = {
  includeScore: true,
  threshold: 0.38,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: [
    { name: "label", weight: 3 },
    { name: "id", weight: 3 },
    { name: "title", weight: 2.5 },
    { name: "title_vi", weight: 2.5 },
    { name: "description", weight: 1.2 },
    { name: "description_vi", weight: 1.2 },
    { name: "tags", weight: 1.5 },
    { name: "tags_vi", weight: 1.5 },
    { name: "authors", weight: 1 },
    { name: "bucket", weight: 0.8 },
    { name: "category", weight: 0.8 },
    { name: "status", weight: 0.5 },
  ],
};

export function buildFuse(docs: SearchDoc[]): Fuse<SearchDoc> {
  return new Fuse(docs, FUSE_OPTIONS);
}

export function runSearch(
  fuse: Fuse<SearchDoc>,
  query: string,
  limit = 24
): SearchDoc[] {
  const q = query.trim();
  if (!q) return [];
  // Direct number match (e.g. "20", "erc-721")
  const numeric = q.replace(/^(eip|erc)[-\s]?/i, "").trim();
  if (/^\d+$/.test(numeric)) {
    const exact = fuse.getIndex().docs.filter((d) => String(d.id) === numeric);
    const fuzzy = fuse.search(q).map((r) => r.item);
    const merged = [...exact, ...fuzzy.filter((f) => String(f.id) !== numeric)];
    return merged.slice(0, limit);
  }
  return fuse.search(q, { limit }).map((r) => r.item);
}

let _indexPromise: Promise<SearchDoc[]> | null = null;

export function loadSearchIndex(): Promise<SearchDoc[]> {
  if (_indexPromise) return _indexPromise;
  _indexPromise = fetch("/data/search-index.json")
    .then((r) => (r.ok ? r.json() : []))
    .catch(() => []);
  return _indexPromise;
}
