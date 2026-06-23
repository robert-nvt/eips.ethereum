"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { Languages } from "lucide-react";
import { LOCALES, isLocale, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      localStorage.setItem("eip-locale", locale);
      document.cookie = `eip-locale=${locale};path=/;max-age=31536000;samesite=lax`;
    } catch {
      /* ignore */
    }
  }, [locale]);

  function switchTo(next: Locale) {
    const segments = pathname.split("/");
    if (segments[1] && isLocale(segments[1])) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    router.push(segments.join("/") || `/${next}`);
  }

  return (
    <div className="glass flex h-10 items-center gap-0.5 rounded-full p-1">
      <Languages className="ml-2 mr-1 h-4 w-4 text-muted" aria-hidden />
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-current={l === locale}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors",
            l === locale ? "bg-primary text-white shadow-glow" : "text-muted hover:text-white"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
