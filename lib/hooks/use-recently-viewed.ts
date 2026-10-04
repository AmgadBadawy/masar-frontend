"use client";

import { useCallback, useMemo } from "react";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";

const RECENTLY_VIEWED_KEY = "masar_recently_viewed_services";
const DEFAULT_MAX_ITEMS = 6;

export function useRecentlyViewed(maxItems: number = DEFAULT_MAX_ITEMS) {
  const [recentSlugs, setRecentSlugs, isMounted] = useLocalStorage<string[]>(
    RECENTLY_VIEWED_KEY,
    [],
  );

  const addRecentService = useCallback(
    (slug: string) => {
      setRecentSlugs((prevSlugs) => {
        const filtered = prevSlugs.filter((s) => s !== slug);
        return [slug, ...filtered].slice(0, maxItems);
      });
    },
    [maxItems, setRecentSlugs],
  );

  const removeRecentService = useCallback(
    (slug: string) => {
      setRecentSlugs((prev) => prev.filter((s) => s !== slug));
    },
    [setRecentSlugs],
  );

  const clearHistory = useCallback(() => {
    setRecentSlugs([]);
  }, [setRecentSlugs]);

  return useMemo(
    () => ({
      recentSlugs,
      isMounted,
      addRecentService,
      removeRecentService,
      clearHistory,
    }),
    [
      recentSlugs,
      isMounted,
      addRecentService,
      removeRecentService,
      clearHistory,
    ],
  );
}
