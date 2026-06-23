import matter from "gray-matter";
import type { Bucket, Eip } from "./types";
import { githubEipUrl, officialEipUrl, rawEipUrl } from "./utils";

const BUCKET_KEYWORDS: { bucket: Bucket; keywords: string[] }[] = [
  { bucket: "nft", keywords: ["nft", "non-fungible", "non fungible", "deed", "collectible", "1155", "royalty", "rental"] },
  { bucket: "token", keywords: ["fungible token", "token standard", "erc-20", "erc20", "vault token"] },
  { bucket: "wallet", keywords: ["account abstraction", "smart wallet", "wallet", "userop", "bundler", "paymaster"] },
  { bucket: "security", keywords: ["proxy", "upgrade", "ownership", "access control", "security", "delegatecall"] },
  { bucket: "defi", keywords: ["vault", "yield", "amm", "lending", "defi", "swap", "liquidity", "oracle"] },
  { bucket: "signature", keywords: ["signature", "permit", "typed data", "sign", "712", "approval"] },
  { bucket: "identity", keywords: ["identity", "kyc", "aml", "compliance", "sign-in", "siwe", "did", "credential"] },
  { bucket: "metadata", keywords: ["metadata", "uri", "display", "ui", "ux", "rendering"] },
];

export function inferBucket(eip: {
  title: string;
  category?: string | null;
  type?: string | null;
  tags?: string[];
  body?: string | null;
}): Bucket {
  const haystack = `${eip.title} ${(eip.tags ?? []).join(" ")}`.toLowerCase();
  for (const { bucket, keywords } of BUCKET_KEYWORDS) {
    if (keywords.some((k) => haystack.includes(k))) return bucket;
  }
  // Core / Networking / Interface proposals are infrastructure unless matched above
  const t = (eip.type ?? "").toLowerCase();
  if (t === "core" || t === "networking" || t === "interface") return "infrastructure";
  if ((eip.category ?? "").toLowerCase() === "core") return "infrastructure";
  return "others";
}

function parseAuthors(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((a) => a.replace(/<[^>]+>/g, "").replace(/\([^)]*\)/g, "").trim())
    .filter(Boolean);
}

function parseNumberList(raw?: string | number | (string | number)[]): number[] {
  if (raw == null) return [];
  const arr = Array.isArray(raw) ? raw : String(raw).split(",");
  return arr
    .map((x) => parseInt(String(x).replace(/[^0-9]/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
}

function extractDescription(body: string, fmDescription?: string): string {
  if (fmDescription) return fmDescription.trim();
  const abstractMatch = body.match(/##\s*Abstract\s*\n+([^#]+)/i);
  const source = abstractMatch ? abstractMatch[1] : body;
  const firstPara = source.replace(/\r/g, "").split("\n\n").map((s) => s.trim()).find((s) => s.length > 0);
  return (firstPara ?? "").replace(/\s+/g, " ").slice(0, 240);
}

/** Parse a raw EIP markdown file (frontmatter + body) into an Eip record. */
export function parseEipMarkdown(id: number, raw: string): Eip {
  const { data, content } = matter(raw);
  const status = (data.status ?? "Draft").toString();
  const type = data.type ? data.type.toString() : null;
  const category = data.category ? data.category.toString() : null;
  const title = (data.title ?? `EIP-${id}`).toString();
  const tags: string[] = Array.isArray(data.tags) ? data.tags.map(String) : [];

  const eip: Eip = {
    id,
    title,
    description: extractDescription(content, data.description?.toString()),
    authors: parseAuthors(data.author?.toString()),
    status,
    type,
    category,
    bucket: inferBucket({ title, category, type, tags, body: content }),
    created: data.created ? new Date(data.created).toISOString() : null,
    requires: parseNumberList(data.requires),
    replaces: parseNumberList(data.replaces),
    supersededBy: parseNumberList(data["superseded-by"]),
    tags,
    body: content,
    rawUrl: rawEipUrl(id),
    githubUrl: githubEipUrl(id),
    officialUrl: officialEipUrl(id),
    views: 0,
    favorites: 0,
    popularity: 0,
  };
  return eip;
}
