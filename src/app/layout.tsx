import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ethereum EIP Explorer — Explore all Ethereum Improvement Proposals",
    template: "%s · Ethereum EIP Explorer",
  },
  description:
    "Explore, search and track every Ethereum Improvement Proposal (EIP) and ERC standard. Token standards, NFTs, DeFi, account abstraction and more.",
  keywords: ["Ethereum", "EIP", "ERC", "ERC-20", "ERC-721", "standards", "blockchain", "web3"],
  authors: [{ name: "Ethereum EIP Explorer" }],
  openGraph: {
    title: "Ethereum EIP Explorer",
    description: "Explore, search and track every Ethereum Improvement Proposal.",
    url: siteUrl,
    siteName: "Ethereum EIP Explorer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethereum EIP Explorer",
    description: "Explore, search and track every Ethereum Improvement Proposal.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans scrollbar-thin">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
