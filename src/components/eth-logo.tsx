import { cn } from "@/lib/utils";

export function EthLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 417" className={cn("h-full w-full", className)} aria-hidden>
      <defs>
        <linearGradient id="eth-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id="eth-b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>
      <path fill="url(#eth-a)" d="M127.96 0 124.6 11.4v275.7l3.36 3.36 127.96-75.6z" />
      <path fill="url(#eth-b)" d="M127.96 0 0 214.86l127.96 75.6V154.16z" />
      <path fill="url(#eth-a)" d="m127.96 312.19-1.9 2.31v98.21l1.9 5.55L256 236.59z" />
      <path fill="url(#eth-b)" d="M127.96 418.26v-106.07L0 236.59z" />
      <path fill="#4F46E5" opacity=".8" d="m127.96 290.46 127.96-75.6-127.96-58.7z" />
      <path fill="#6366F1" opacity=".8" d="m0 214.86 127.96 75.6V156.16z" />
    </svg>
  );
}
