export type Locale = "en" | "vi";

export type EipStatus =
  | "Final"
  | "Draft"
  | "Review"
  | "Last Call"
  | "Stagnant"
  | "Living"
  | "Withdrawn"
  | "Idea";

export type Bucket =
  | "token"
  | "nft"
  | "wallet"
  | "security"
  | "defi"
  | "signature"
  | "identity"
  | "infrastructure"
  | "metadata"
  | "others";

export interface Eip {
  id: number;
  title: string;
  description?: string | null;
  authors: string[];
  status: EipStatus | string;
  type?: string | null;
  category?: string | null;
  bucket: Bucket;
  created?: string | null;
  requires: number[];
  replaces: number[];
  supersededBy?: number[];
  tags: string[];
  body?: string | null;
  rawUrl?: string | null;
  githubUrl?: string | null;
  officialUrl?: string | null;
  views: number;
  favorites: number;
  popularity: number;
}

export interface EipStats {
  total: number;
  final: number;
  draft: number;
  review: number;
  lastCall: number;
  stagnant: number;
  contributors: number;
  lastUpdated: string;
  byYear: { year: number; count: number }[];
  byBucket: { bucket: Bucket; count: number }[];
  statusDistribution: { name: string; value: number; color: string }[];
}
