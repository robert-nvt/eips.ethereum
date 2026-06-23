import type { EipStats } from "../types";

/**
 * Repo-wide aggregate figures, used for hero/sidebar headline numbers when the
 * database has not yet been hydrated by the ingestion pipeline. Once
 * `scripts/ingest.ts` runs, these are computed live from PostgreSQL.
 */
export const AGGREGATE_STATS: EipStats = {
  total: 1232,
  final: 420,
  draft: 380,
  review: 210,
  lastCall: 120,
  stagnant: 102,
  contributors: 1000,
  lastUpdated: "2025-05-13",
  byYear: [
    { year: 2015, count: 12 },
    { year: 2016, count: 28 },
    { year: 2017, count: 64 },
    { year: 2018, count: 142 },
    { year: 2019, count: 118 },
    { year: 2020, count: 96 },
    { year: 2021, count: 168 },
    { year: 2022, count: 184 },
    { year: 2023, count: 156 },
    { year: 2024, count: 144 },
    { year: 2025, count: 120 },
  ],
  byBucket: [
    { bucket: "token", count: 96 },
    { bucket: "nft", count: 84 },
    { bucket: "wallet", count: 72 },
    { bucket: "security", count: 110 },
    { bucket: "defi", count: 88 },
    { bucket: "signature", count: 64 },
    { bucket: "identity", count: 58 },
    { bucket: "infrastructure", count: 412 },
    { bucket: "metadata", count: 76 },
    { bucket: "others", count: 72 },
  ],
  statusDistribution: [
    { name: "Final", value: 420, color: "#10B981" },
    { name: "Draft", value: 380, color: "#F59E0B" },
    { name: "Review", value: 210, color: "#8B5CF6" },
    { name: "Last Call", value: 120, color: "#06B6D4" },
    { name: "Stagnant", value: 102, color: "#EF4444" },
  ],
};

export const POPULAR_RANKING: { id: number; label: string; views: number; color: string }[] = [
  { id: 20, label: "ERC-20", views: 12400, color: "#10B981" },
  { id: 721, label: "ERC-721", views: 9800, color: "#06B6D4" },
  { id: 1155, label: "ERC-1155", views: 6700, color: "#8B5CF6" },
  { id: 1559, label: "EIP-1559", views: 6100, color: "#F59E0B" },
  { id: 712, label: "EIP-712", views: 5300, color: "#EAB308" },
  { id: 4337, label: "ERC-4337", views: 4900, color: "#4F46E5" },
  { id: 4626, label: "ERC-4626", views: 4200, color: "#22C55E" },
  { id: 2612, label: "EIP-2612", views: 3800, color: "#EC4899" },
];
