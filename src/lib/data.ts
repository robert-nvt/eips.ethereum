import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SEED_EIPS } from "./data/seed-eips";
import { AGGREGATE_STATS, POPULAR_RANKING } from "./data/aggregate-stats";
import { CATEGORIES } from "./categories";
import { githubEipUrl, officialEipUrl, rawEipUrl } from "./utils";
import { computeStats } from "./stats";
import type { Bucket, Eip, EipStats, Locale } from "./types";

const DATA_DIR = join(process.cwd(), "public", "data");

function withUrls(eip: Eip): Eip {
  return {
    ...eip,
    githubUrl: eip.githubUrl ?? githubEipUrl(eip.id),
    officialUrl: eip.officialUrl ?? officialEipUrl(eip.id),
    rawUrl: eip.rawUrl ?? rawEipUrl(eip.id),
  };
}

const SEED = SEED_EIPS.map(withUrls);

let _cache: Eip[] | null = null;

async function readJson<T>(file: string): Promise<T | null> {
  try {
    const raw = await readFile(join(DATA_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export const POPULAR_IDS = [
  20, 721, 1155, 4626, 4337, 3643, 2981, 1822, 1967, 165, 712, 2612,
];

export async function getAllEips(): Promise<Eip[]> {
  if (_cache) return _cache;
  const fromDisk = await readJson<Eip[]>("eips.json");
  const eips = (fromDisk && fromDisk.length ? fromDisk : SEED).map(withUrls);
  _cache = [...eips].sort((a, b) => a.id - b.id);
  return _cache;
}

export async function getEipById(id: number): Promise<Eip | null> {
  // Full record (with markdown body) lives in its own file.
  const full = await readJson<Eip>(`eips/eip-${id}.json`);
  if (full) return withUrls(full);
  const all = await getAllEips();
  return all.find((e) => e.id === id) ?? null;
}

export async function getEipsByBucket(bucket: Bucket): Promise<Eip[]> {
  const all = await getAllEips();
  return all
    .filter((e) => e.bucket === bucket)
    .sort((a, b) => b.popularity - a.popularity || a.id - b.id);
}

export async function getPopularEips(): Promise<Eip[]> {
  const all = await getAllEips();
  const byId = new Map(all.map((e) => [e.id, e]));
  const picks = POPULAR_IDS.map((id) => byId.get(id)).filter(Boolean) as Eip[];
  if (picks.length >= 8) return picks;
  return [...all].sort((a, b) => b.popularity - a.popularity).slice(0, 12);
}

export async function getTrendingEips(limit = 8): Promise<Eip[]> {
  const all = await getAllEips();
  return [...all]
    .sort((a, b) => b.views - a.views || b.popularity - a.popularity)
    .slice(0, limit);
}

export function getPopularRanking() {
  return POPULAR_RANKING;
}

export async function getRelatedEips(eip: Eip, limit = 6): Promise<Eip[]> {
  const all = await getAllEips();
  const related = new Set<number>([...eip.requires, ...eip.replaces]);
  for (const other of all) {
    if (other.requires.includes(eip.id) || other.replaces.includes(eip.id)) {
      related.add(other.id);
    }
  }
  const direct = all.filter((e) => related.has(e.id) && e.id !== eip.id);
  const sameBucket = all
    .filter((e) => e.bucket === eip.bucket && e.id !== eip.id && !related.has(e.id))
    .sort((a, b) => b.popularity - a.popularity);
  return [...direct, ...sameBucket].slice(0, limit);
}

export async function getStats(): Promise<EipStats> {
  const fromDisk = await readJson<EipStats>("stats.json");
  if (fromDisk) return fromDisk;
  const all = await getAllEips();
  if (all.length > 50) return computeStats(all);
  return AGGREGATE_STATS;
}

export interface VietnameseTranslation {
  id: number;
  title?: string;
  abstract?: string;
  summary?: string;
  description?: string;
  body?: string;
  machine?: boolean;
}

export async function getTranslation(
  id: number,
  locale: Locale
): Promise<VietnameseTranslation | null> {
  if (locale === "en") return null;
  return readJson<VietnameseTranslation>(`translations/${locale}/eip-${id}.json`);
}

export interface LearningContent {
  id: number;
  beginner: string;
  intermediate: string;
  advanced: string;
}

export async function getLearningContent(
  id: number,
  locale: Locale
): Promise<LearningContent | null> {
  return readJson<LearningContent>(`learning/${locale}/eip-${id}.json`);
}
