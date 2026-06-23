import Link from "next/link";
import { BookOpen, Code2, Users } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";

export function FooterBar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = [
    {
      icon: BookOpen,
      title: dict.footer.learn,
      body: dict.footer.learnBody,
      href: `/${locale}/eips/20`,
      color: "#06B6D4",
    },
    {
      icon: Code2,
      title: dict.footer.source,
      body: dict.footer.sourceBody,
      href: "https://github.com/ethereum/EIPs",
      color: "#8B5CF6",
    },
    {
      icon: Users,
      title: dict.footer.community,
      body: dict.footer.communityBody,
      href: "https://ethereum-magicians.org/",
      color: "#10B981",
    },
  ];

  return (
    <div className="glass-card grid grid-cols-1 divide-white/5 p-2 sm:grid-cols-3 sm:divide-x">
      {items.map((it) => {
        const inner = (
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/5">
            <span
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
              style={{ background: `${it.color}1f` }}
            >
              <it.icon className="h-5 w-5" style={{ color: it.color }} />
            </span>
            <div>
              <div className="text-sm font-semibold text-white">{it.title}</div>
              <div className="text-xs text-muted">{it.body}</div>
            </div>
          </div>
        );
        return it.href.startsWith("http") ? (
          <a key={it.title} href={it.href} target="_blank" rel="noopener noreferrer">
            {inner}
          </a>
        ) : (
          <Link key={it.title} href={it.href}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
}
