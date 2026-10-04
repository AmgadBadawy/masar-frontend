"use client";

import { useFavorites } from "@/lib/hooks/use-favorites";

interface FavoriteButtonProps {
  serviceSlug: string;
  className?: string;
  showLabel?: boolean;
}

export function FavoriteButton({
  serviceSlug,
  className = "",
  showLabel = true,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isMounted } = useFavorites();

  if (!isMounted) {
    return (
      <button
        type="button"
        disabled
        aria-hidden="true"
        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium opacity-50 cursor-not-allowed ${className}`}
      >
        <span className="h-5 w-5 rounded-full bg-gray-200 animate-pulse" />
        {showLabel && <span>حفظ في المفضلة</span>}
      </button>
    );
  }

  const favorite = isFavorite(serviceSlug);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(serviceSlug)}
      aria-pressed={favorite}
      aria-label={
        favorite ? "إزالة الخدمة من المفضلة" : "حفظ الخدمة في المفضلة"
      }
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5F63] focus-visible:ring-offset-2 ${
        favorite
          ? "border-[#0E5F63] bg-[#0E5F63]/10 text-[#0E5F63]"
          : "border-gray-200 bg-white text-gray-600 hover:border-[#0E5F63] hover:text-[#06292B]"
      } ${className}`}
    >
      <svg
        className={`h-5 w-5 transition-transform duration-200 active:scale-125 ${
          favorite
            ? "fill-[#0E5F63] stroke-[#0E5F63]"
            : "fill-none stroke-current"
        }`}
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      {showLabel && (
        <span>{favorite ? "محفوظ في المفضلة" : "حفظ في المفضلة"}</span>
      )}
    </button>
  );
}
