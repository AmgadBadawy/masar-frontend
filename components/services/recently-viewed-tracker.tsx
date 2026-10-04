"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/lib/hooks/use-recently-viewed";

export function RecentlyViewedTracker({ slug }: { slug: string }) {
  const { addRecentService } = useRecentlyViewed();

  useEffect(() => {
    if (slug) {
      addRecentService(slug);
    }
  }, [slug, addRecentService]);

  return null;
}
