"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function Toc({ items, title }: { items: TocItem[]; title: string }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="glass-card p-4">
      <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <ul className="space-y-0.5 text-sm">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={cn(
                "block rounded-lg px-2 py-1.5 transition-colors",
                i.level >= 3 && "pl-5 text-[13px]",
                active === i.id
                  ? "bg-primary/15 font-medium text-white"
                  : "text-muted hover:bg-white/5 hover:text-white"
              )}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
