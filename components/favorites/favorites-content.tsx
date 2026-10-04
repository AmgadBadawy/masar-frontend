"use client";

import { useMemo } from "react";
import Link from "next/link";

import { FavoriteButton } from "@/components/services/favorite-button";
import { useFavorites } from "@/lib/hooks/use-favorites";
import type { Service } from "@/types/service";

interface FavoritesContentProps {
  services: Service[];
}

export function FavoritesContent({ services }: FavoritesContentProps) {
  const { favoriteSlugs, isMounted, clearFavorites } = useFavorites();

  const favoriteServices = useMemo(() => {
    const favoritesSet = new Set(favoriteSlugs);

    return services.filter((service) => favoritesSet.has(service.slug));
  }, [services, favoriteSlugs]);

  if (!isMounted) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-8 border-b border-gray-200 pb-6">
          <div className="h-8 w-56 animate-pulse rounded bg-gray-100" />
          <div className="mt-2 h-5 w-80 max-w-full animate-pulse rounded bg-gray-100" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-xl border border-gray-200 bg-gray-50 p-5"
            />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#06292B] sm:text-3xl">
            الخدمات المحفوظة
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            الخدمات والإجراءات التي قمت بحفظها للرجوع إليها سريعاً
          </p>
        </div>

        {favoriteServices.length > 0 && (
          <button
            type="button"
            onClick={clearFavorites}
            className="rounded px-3 py-1.5 text-xs font-medium text-red-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            مسح الكل
          </button>
        )}
      </div>

      {favoriteServices.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center sm:p-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364l-1.318 1.318-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>

          <h2 className="mt-4 text-base font-semibold text-[#06292B]">
            لا توجد خدمات محفوظة حالياً
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            يمكنك إضافة أي خدمة إلى قائمتك الخاصة بالضغط على زر &quot;حفظ في
            المفضلة&quot; داخل صفحة الخدمة.
          </p>

          <Link
            href="/search"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#0E5F63] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#0a484b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5F63] focus-visible:ring-offset-2"
          >
            استكشف الخدمات
          </Link>
        </div>
      )}

      {favoriteServices.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {favoriteServices.map((service) => (
            <article
              key={service.slug}
              className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#0E5F63]">
                    {service.category.name}
                  </span>

                  <FavoriteButton
                    serviceSlug={service.slug}
                    showLabel={false}
                  />
                </div>

                <h2 className="text-base font-bold text-[#06292B]">
                  <Link
                    href={`/services/${service.slug}`}
                    className="transition-colors hover:text-[#0E5F63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5F63] focus-visible:ring-offset-2"
                  >
                    {service.title}
                  </Link>
                </h2>

                {service.summary && (
                  <p className="line-clamp-2 text-xs leading-relaxed text-gray-500">
                    {service.summary}
                  </p>
                )}
              </div>

              <div className="mt-4 border-t border-gray-100 pt-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex min-h-10 items-center text-xs font-semibold text-[#0E5F63] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E5F63] focus-visible:ring-offset-2"
                >
                  عرض تفاصيل الخدمة
                  <span className="me-1" aria-hidden="true">
                    ←
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
