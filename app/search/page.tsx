import type { Metadata } from "next";
import Link from "next/link";

import { ServiceCard } from "@/components/services/service-card";
import {
  getCachedCategories,
  getCachedServices,
} from "@/data/lib/services/cached-service-repository";
import { createSeoMetadata } from "@/lib/seo";
import { searchServices } from "@/lib/search/search-services";

type SearchParamValue = string | string[] | undefined;

type SearchPageProps = {
  searchParams: Promise<{
    q?: SearchParamValue;
    category?: SearchParamValue;
  }>;
};

function getSearchParamValue(value: SearchParamValue): string {
  return typeof value === "string" ? value : "";
}

export async function generateMetadata({
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = getSearchParamValue(params.q).trim();
  const categorySlug = getSearchParamValue(params.category);
  const category = (await getCachedCategories()).find(
    (item) => item.slug === categorySlug,
  );

  const title = category
    ? `خدمات ${category.name}`
    : query
      ? `نتائج البحث عن ${query.slice(0, 50)}`
      : "البحث عن الخدمات";

  return createSeoMetadata({
    title,
    description:
      "ابحث عن الخدمات الحكومية المتاحة في مسار، واستكشف الطريق والخطوات والمستندات الخاصة بكل خدمة.",
    path: "/search",
    noIndex: true,
  });
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = getSearchParamValue(params.q).trim();
  const requestedCategory = getSearchParamValue(params.category);

  const [categories, services] = await Promise.all([
    getCachedCategories(),
    getCachedServices(),
  ]);
  const selectedCategoryData = categories.find(
    (category) => category.slug === requestedCategory,
  );
  const selectedCategory = selectedCategoryData?.slug ?? "";
  const filteredServices = searchServices(services, {
    query,
    categorySlug: selectedCategory,
  });

  const hasFilters = Boolean(query || selectedCategory);
  const resultHeading = !hasFilters
    ? "كل الخدمات المتاحة"
    : filteredServices.length === 0
      ? "لا توجد خدمات مطابقة"
      : `${filteredServices.length} ${
          filteredServices.length === 1 ? "خدمة" : "خدمات"
        }`;

  return (
    <main>
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[var(--content-max)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[var(--color-primary)]">
              استكشف الخدمات
            </p>

            <h1 className="mt-3 text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)] font-bold leading-tight tracking-tight text-[var(--color-text)] text-balance">
              {selectedCategoryData
                ? selectedCategoryData.name
                : "ابحث عن الخدمة التي تحتاجها"}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-text-muted)]">
              ابحث عن الخدمة بالاسم أو المجال أو الجهة المختصة، واعرف الطريق
              المناسب لها من البداية.
            </p>
          </div>

          <form
            action="/search"
            method="GET"
            role="search"
            className="mt-8 max-w-3xl"
          >
            {selectedCategory && (
              <input type="hidden" name="category" value={selectedCategory} />
            )}

            <label htmlFor="search-input" className="sr-only">
              ابحث عن خدمة
            </label>

            <div className="flex flex-col gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5 shadow-[var(--shadow-soft)] sm:flex-row">
              <input
                id="search-input"
                name="q"
                type="search"
                defaultValue={query}
                placeholder="ابحث عن خدمة أو جهة..."
                enterKeyHint="search"
                className="min-h-12 min-w-0 flex-1 rounded-lg bg-transparent px-4 text-base text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-subtle)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] sm:min-h-[3.25rem]"
              />

              <button
                type="submit"
                className="min-h-12 rounded-lg bg-[var(--color-primary)] px-7 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 sm:min-h-[3.25rem]"
              >
                بحث
              </button>
            </div>
          </form>
        </div>
      </section>

      <section
        aria-labelledby="categories-filter-heading"
        className="border-b border-[var(--color-border)]"
      >
        <div className="mx-auto max-w-[var(--content-max)] px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2
                id="categories-filter-heading"
                className="text-sm font-semibold text-[var(--color-text)]"
              >
                تصفية حسب المجال
              </h2>

              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                اختر المجال لتضييق النتائج.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:max-w-3xl lg:justify-end">
              <Link
                href={
                  query ? `/search?q=${encodeURIComponent(query)}` : "/search"
                }
                aria-current={!selectedCategory ? "true" : undefined}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-primary)]/50"
                }`}
              >
                كل المجالات
              </Link>

              {categories.map((category) => {
                const href = query
                  ? `/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category.slug)}`
                  : `/search?category=${encodeURIComponent(category.slug)}`;
                const isActive = selectedCategory === category.slug;

                return (
                  <Link
                    key={category.slug}
                    href={href}
                    aria-current={isActive ? "true" : undefined}
                    className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-primary)]/50"
                    }`}
                  >
                    {category.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="search-results-heading"
        className="border-b border-[var(--color-border)]"
      >
        <div className="mx-auto max-w-[var(--content-max)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary)]">
                نتائج البحث
              </p>

              <h2
                id="search-results-heading"
                className="mt-2 text-[clamp(1.4rem,1.1rem+1.2vw,1.875rem)] font-bold tracking-tight text-[var(--color-text)]"
              >
                {resultHeading}
              </h2>
            </div>

            {hasFilters && (
              <Link
                href="/search"
                className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
              >
                مسح الفلاتر
              </Link>
            )}
          </div>

          {filteredServices.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service, index) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  index={index}
                  variant="card"
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-dashed border-[var(--color-border)] px-6 py-14 text-center sm:py-16">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">
                لم نجد الخدمة التي تبحث عنها
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[var(--color-text-muted)]">
                جرّب كلمة بحث مختلفة أو اختر مجالًا آخر، ويمكنك مراجعة كل
                الخدمات المتاحة.
              </p>

              <Link
                href="/search"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--color-primary)] px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
              >
                عرض كل الخدمات
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
