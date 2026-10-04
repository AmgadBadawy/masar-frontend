"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";

const FAVORITES_STORAGE_KEY = "masar_favorite_services";

export function useFavorites() {
  const [favoriteSlugs, setFavoriteSlugs, isMounted] = useLocalStorage<
    string[]
  >(FAVORITES_STORAGE_KEY, []);

  const addFavorite = useCallback(
    (slug: string) => {
      setFavoriteSlugs((prev) =>
        prev.includes(slug) ? prev : [...prev, slug],
      );
    },
    [setFavoriteSlugs],
  );

  const removeFavorite = useCallback(
    (slug: string) => {
      setFavoriteSlugs((prev) => prev.filter((s) => s !== slug));
    },
    [setFavoriteSlugs],
  );

  const toggleFavorite = useCallback(
    (slug: string) => {
      setFavoriteSlugs((prev) =>
        prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
      );
    },
    [setFavoriteSlugs],
  );

  const isFavorite = useCallback(
    (slug: string) => {
      return favoriteSlugs.includes(slug);
    },
    [favoriteSlugs],
  );

  const clearFavorites = useCallback(() => {
    setFavoriteSlugs([]);
  }, [setFavoriteSlugs]);

  return useMemo(
    () => ({
      favoriteSlugs,
      isMounted,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      clearFavorites,
    }),
    [
      favoriteSlugs,
      isMounted,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
      clearFavorites,
    ],
  );
}
