"use client";

import { Star } from "lucide-react";
import { useUiStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  id,
  className,
  size = 16,
}: {
  id: number;
  className?: string;
  size?: number;
}) {
  const favorites = useUiStore((s) => s.favorites);
  const toggle = useUiStore((s) => s.toggleFavorite);
  const active = favorites.includes(id);

  return (
    <button
      type="button"
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      className={cn(
        "grid place-items-center rounded-lg p-1.5 text-muted transition-colors hover:bg-white/5 hover:text-amber-300",
        active && "text-amber-300",
        className
      )}
    >
      <Star size={size} className={cn(active && "fill-amber-300")} />
    </button>
  );
}
