import type { Bucket } from "./types";
import {
  Coins,
  Image as ImageIcon,
  Wallet,
  ShieldCheck,
  LineChart,
  PenTool,
  Contact,
  Server,
  Palette,
  MoreHorizontal,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

export interface CategoryDef {
  bucket: Bucket;
  slug: string;
  label: string;
  icon: LucideIcon;
  color: string;
  glow: string;
  description: string;
}

export const CATEGORIES: CategoryDef[] = [
  {
    bucket: "token",
    slug: "token",
    label: "Token Standards",
    icon: Coins,
    color: "#F59E0B",
    glow: "rgba(245,158,11,0.30)",
    description: "Fungible token standards: ERC-20, vaults and permits.",
  },
  {
    bucket: "nft",
    slug: "nft",
    label: "NFT Standards",
    icon: ImageIcon,
    color: "#06B6D4",
    glow: "rgba(6,182,212,0.30)",
    description: "Non-fungible and multi-token standards for digital assets.",
  },
  {
    bucket: "wallet",
    slug: "wallet",
    label: "Wallet & Account",
    icon: Wallet,
    color: "#4F46E5",
    glow: "rgba(79,70,229,0.30)",
    description: "Account abstraction, smart wallets and account standards.",
  },
  {
    bucket: "security",
    slug: "security",
    label: "Security & Upgrade",
    icon: ShieldCheck,
    color: "#10B981",
    glow: "rgba(16,185,129,0.30)",
    description: "Proxy patterns, upgradeability and security primitives.",
  },
  {
    bucket: "defi",
    slug: "defi",
    label: "DeFi Standards",
    icon: LineChart,
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.30)",
    description: "Vaults, yield, AMMs and decentralized finance building blocks.",
  },
  {
    bucket: "signature",
    slug: "signature",
    label: "Signature & Permit",
    icon: PenTool,
    color: "#EAB308",
    glow: "rgba(234,179,8,0.30)",
    description: "Typed structured data signing and gasless approvals.",
  },
  {
    bucket: "identity",
    slug: "identity",
    label: "Identity & KYC",
    icon: Contact,
    color: "#22C55E",
    glow: "rgba(34,197,94,0.30)",
    description: "Identity, compliance and KYC/AML token standards.",
  },
  {
    bucket: "infrastructure",
    slug: "infrastructure",
    label: "Infrastructure",
    icon: Server,
    color: "#0EA5E9",
    glow: "rgba(14,165,233,0.30)",
    description: "Core protocol, interfaces and low-level infrastructure.",
  },
  {
    bucket: "metadata",
    slug: "metadata",
    label: "UI/UX & Metadata",
    icon: Palette,
    color: "#EC4899",
    glow: "rgba(236,72,153,0.30)",
    description: "Metadata, display and user experience standards.",
  },
  {
    bucket: "others",
    slug: "others",
    label: "Others",
    icon: MoreHorizontal,
    color: "#94A3B8",
    glow: "rgba(148,163,184,0.30)",
    description: "Everything else across the Ethereum proposal space.",
  },
];

export const OVERVIEW_NAV = {
  slug: "overview",
  label: "Overview",
  icon: LayoutDashboard,
};

export const STATUS_COLORS: Record<string, string> = {
  Final: "#10B981",
  Draft: "#F59E0B",
  Review: "#8B5CF6",
  "Last Call": "#06B6D4",
  Stagnant: "#EF4444",
  Living: "#4F46E5",
  Withdrawn: "#64748B",
  Idea: "#64748B",
};

export function bucketBySlug(slug: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function categoryByBucket(bucket: string): CategoryDef {
  return CATEGORIES.find((c) => c.bucket === bucket) ?? CATEGORIES[CATEGORIES.length - 1];
}
