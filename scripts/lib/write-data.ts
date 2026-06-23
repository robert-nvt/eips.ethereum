import { mkdir, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { computeStats } from "../../src/lib/stats";
import { CATEGORIES } from "../../src/lib/categories";
import type { Eip } from "../../src/lib/types";
import type { SearchDoc } from "../../src/lib/search";

const DATA_DIR = join(process.cwd(), "public", "data");

/** Reference counts used for popularity + "most referenced" charts. */
export function withPopularity(eips: Eip[]): Eip[] {
  const refCount = new Map<number, number>();
  for (const e of eips) {
    for (const r of [...e.requires, ...e.replaces]) {
      refCount.set(r, (refCount.get(r) ?? 0) + 1);
    }
  }
  const statusWeight: Record<string, number> = {
    Final: 40,
    Living: 36,
    "Last Call": 30,
    Review: 24,
    Draft: 16,
    Stagnant: 6,
    Withdrawn: 2,
  };
  return eips.map((e) => {
    const refs = refCount.get(e.id) ?? 0;
    const popularity =
      e.popularity > 0
        ? e.popularity
        : (statusWeight[e.status] ?? 10) +
          refs * 4 +
          Math.log10((e.views || 0) + 1) * 10;
    return { ...e, popularity: Math.round(popularity * 100) / 100 };
  });
}

export async function writeDataFiles(rawEips: Eip[]) {
  const eips = withPopularity(rawEips).sort((a, b) => a.id - b.id);
  await mkdir(DATA_DIR, { recursive: true });

  // Per-EIP full records (with markdown body) so detail pages only load
  // their own file and list/dashboard reads stay light.
  const eipsDir = join(DATA_DIR, "eips");
  await rm(eipsDir, { recursive: true, force: true });
  await mkdir(eipsDir, { recursive: true });
  for (const e of eips) {
    await writeFile(join(eipsDir, `eip-${e.id}.json`), JSON.stringify(e));
  }

  // eips.json — slim metadata index (no markdown body)
  const slim = eips.map(({ body, ...rest }) => rest);
  await writeFile(join(DATA_DIR, "eips.json"), JSON.stringify(slim));

  // categories.json — taxonomy + counts
  const categories = CATEGORIES.map((c) => ({
    bucket: c.bucket,
    slug: c.slug,
    label: c.label,
    color: c.color,
    description: c.description,
    count: eips.filter((e) => e.bucket === c.bucket).length,
  }));
  await writeFile(join(DATA_DIR, "categories.json"), JSON.stringify(categories));

  // stats.json — aggregate
  const stats = computeStats(eips);
  // most referenced
  const refCount = new Map<number, number>();
  for (const e of eips) {
    for (const r of [...e.requires, ...e.replaces]) {
      refCount.set(r, (refCount.get(r) ?? 0) + 1);
    }
  }
  const mostReferenced = [...refCount.entries()]
    .map(([id, count]) => {
      const e = eips.find((x) => x.id === id);
      return { id, count, label: e ? (e.category === "ERC" ? "ERC-" : "EIP-") + id : `EIP-${id}` };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  await writeFile(
    join(DATA_DIR, "stats.json"),
    JSON.stringify({ ...stats, mostReferenced })
  );

  // search-index.json — slim docs for Fuse
  const searchDocs: SearchDoc[] = eips.map((e) => ({
    id: e.id,
    label: (e.category === "ERC" ? "ERC-" : "EIP-") + e.id,
    title: e.title,
    description: e.description ?? "",
    authors: e.authors,
    tags: e.tags,
    bucket: e.bucket,
    category: e.category,
    status: e.status,
  }));
  await writeFile(join(DATA_DIR, "search-index.json"), JSON.stringify(searchDocs));

  console.log(
    `Wrote ${eips.length} EIPs → public/data/{eips,categories,stats,search-index}.json`
  );
}
