"use client";

import Link from "next/link";
import { Search, Star, LayoutGrid, ChevronDown, Menu } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useUiStore } from "@/lib/store";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { CATEGORIES } from "@/lib/categories";
import { CATEGORY_LABELS, type Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const setSearchOpen = useUiStore((s) => s.setSearchOpen);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-background/70 backdrop-blur-xl">
      <div className="flex h-[72px] items-center gap-3 px-4 sm:px-6">
        {/* Search trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="glass group flex h-11 flex-1 items-center gap-3 rounded-full px-4 text-left text-muted transition-colors hover:border-white/15 hover:text-slate-300"
        >
          <Search className="h-[18px] w-[18px]" />
          <span className="flex-1 text-sm">{dict.header.searchPlaceholder}</span>
          <kbd className="hidden items-center gap-0.5 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] font-medium text-muted sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>

        {/* Favorites */}
        <Link href={`/${locale}/favorites`}>
          <Button variant="glass" className="hidden h-11 rounded-full sm:inline-flex">
            <Star className="h-4 w-4 text-amber-300" />
            <span className="hidden md:inline">{dict.header.favorites}</span>
          </Button>
        </Link>

        {/* Categories dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="glass" className="hidden h-11 rounded-full sm:inline-flex">
              <LayoutGrid className="h-4 w-4 text-secondary" />
              <span className="hidden md:inline">{dict.header.categories}</span>
              <ChevronDown className="h-4 w-4 opacity-60" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className="z-50 grid w-64 grid-cols-1 gap-1 rounded-2xl border border-white/10 bg-card/95 p-2 shadow-2xl backdrop-blur-2xl data-[state=open]:animate-in data-[state=open]:fade-in"
            >
              {CATEGORIES.map((c) => (
                <DropdownMenu.Item key={c.slug} asChild>
                  <Link
                    href={`/${locale}/categories/${c.slug}`}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 outline-none transition-colors hover:bg-white/5 focus:bg-white/5"
                  >
                    <c.icon className="h-4 w-4" style={{ color: c.color }} />
                    {CATEGORY_LABELS[locale][c.bucket]}
                  </Link>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <LanguageSwitcher locale={locale} />
        <ThemeToggle />

        {/* Mobile search button */}
        <button
          onClick={() => setSearchOpen(true)}
          aria-label="Search"
          className="glass grid h-11 w-11 place-items-center rounded-full sm:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
