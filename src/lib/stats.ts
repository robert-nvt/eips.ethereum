import { CATEGORIES } from "./categories";
import type { Eip, EipStats } from "./types";

export function computeStats(all: Eip[]): EipStats {
  const count = (s: string) => all.filter((e) => e.status === s).length;
  const authors = new Set<string>();
  all.forEach((e) => e.authors.forEach((a) => authors.add(a)));

  const byYearMap = new Map<number, number>();
  all.forEach((e) => {
    if (!e.created) return;
    const y = new Date(e.created).getFullYear();
    if (!Number.isNaN(y)) byYearMap.set(y, (byYearMap.get(y) ?? 0) + 1);
  });

  const byBucket = CATEGORIES.map((c) => ({
    bucket: c.bucket,
    count: all.filter((e) => e.bucket === c.bucket).length,
  }));

  const statusDistribution = [
    { name: "Final", value: count("Final"), color: "#10B981" },
    { name: "Draft", value: count("Draft"), color: "#F59E0B" },
    { name: "Review", value: count("Review"), color: "#8B5CF6" },
    { name: "Last Call", value: count("Last Call"), color: "#06B6D4" },
    { name: "Stagnant", value: count("Stagnant"), color: "#EF4444" },
  ];

  const lastUpdated =
    all
      .map((e) => e.created)
      .filter(Boolean)
      .sort()
      .reverse()[0] ?? new Date().toISOString();

  return {
    total: all.length,
    final: count("Final"),
    draft: count("Draft"),
    review: count("Review"),
    lastCall: count("Last Call"),
    stagnant: count("Stagnant"),
    contributors: authors.size,
    lastUpdated,
    byYear: [...byYearMap.entries()]
      .map(([year, c]) => ({ year, count: c }))
      .sort((a, b) => a.year - b.year),
    byBucket,
    statusDistribution,
  };
}
