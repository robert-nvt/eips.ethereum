"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;

  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  activeBucket: string;
  setActiveBucket: (bucket: string) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [...s.favorites, id],
        })),
      isFavorite: (id) => get().favorites.includes(id),

      searchOpen: false,
      setSearchOpen: (open) => set({ searchOpen: open }),

      activeBucket: "overview",
      setActiveBucket: (bucket) => set({ activeBucket: bucket }),
    }),
    {
      name: "eip-explorer-ui",
      partialize: (s) => ({ favorites: s.favorites }),
    }
  )
);
