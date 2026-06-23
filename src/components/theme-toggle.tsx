"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = theme !== "light";

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "glass relative flex h-10 w-[68px] items-center rounded-full p-1 transition-colors",
        className
      )}
    >
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-glow transition-transform duration-300",
          mounted && !isDark ? "translate-x-[28px]" : "translate-x-0"
        )}
      >
        {mounted && !isDark ? (
          <Sun className="h-4 w-4 text-white" />
        ) : (
          <Moon className="h-4 w-4 text-white" />
        )}
      </span>
    </button>
  );
}
