import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCompact(n: number): string {
  if (n >= 1000) {
    return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1).replace(/\.0$/, "") + "k";
  }
  return n.toString();
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function eipLabel(eip: { id: number; category?: string | null }): string {
  const prefix = eip.category === "ERC" ? "ERC" : "EIP";
  return `${prefix}-${eip.id}`;
}

export function officialEipUrl(id: number): string {
  return `https://eips.ethereum.org/EIPS/eip-${id}`;
}

export function githubEipUrl(id: number): string {
  return `https://github.com/ethereum/EIPs/blob/master/EIPS/eip-${id}.md`;
}

export function rawEipUrl(id: number): string {
  return `https://raw.githubusercontent.com/ethereum/EIPs/master/EIPS/eip-${id}.md`;
}

export function formatDate(date?: string | Date | null): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function extractToc(markdown: string): { id: string; text: string; level: number }[] {
  const lines = markdown.split("\n");
  const items: { id: string; text: string; level: number }[] = [];
  let inFence = false;
  for (const line of lines) {
    if (line.trim().startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const m = /^(#{1,3})\s+(.+?)\s*#*$/.exec(line);
    if (m) {
      const text = m[2].replace(/[*`_]/g, "").trim();
      items.push({ id: slugify(text), text, level: m[1].length });
    }
  }
  return items;
}

/** Round shares to integer percentages that sum to exactly 100 (largest remainder). */
export function percentages(values: number[]): number[] {
  const total = values.reduce((s, v) => s + v, 0);
  if (total <= 0) return values.map(() => 0);
  const raw = values.map((v) => (v / total) * 100);
  const floored = raw.map((r) => Math.floor(r));
  let remainder = 100 - floored.reduce((s, v) => s + v, 0);
  const order = raw
    .map((r, i) => ({ i, frac: r - Math.floor(r) }))
    .sort((a, b) => b.frac - a.frac);
  const result = [...floored];
  for (let k = 0; k < order.length && remainder > 0; k++, remainder--) {
    result[order[k].i] += 1;
  }
  return result;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
