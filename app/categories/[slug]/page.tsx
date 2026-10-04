import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ServiceCard } from "@/components/services/service-card";
import {
  getCachedCategoryBySlug,
  getCachedServicesByCategory,
} from "@/data/lib/services/cached-service-repository";
import { createSeoMetadata } from "@/lib/seo";

export const revalidate = 300;

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCachedCategoryBySlug(slug);

  if (!category) {
    return createSeoMetadata({
      title: "المجال غير موجود",
      description: "المجال الذي تبحث عنه غير موجود في مسار.",
      noIndex: true,
    });
  }

  return createSeoMetadata({
    title: category.name,
    description:
      category.description ?? `استكشف خدمات ${category.name} على مسار.`,
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCachedCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const services = await getCachedServicesByCategory(slug);

  return (
    <main>
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-[var(--content-max)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[var(--color-primary)]">
              مجال الخدمات
            </p>

            <h1 className="mt-3 text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)] font-bold leading-tight tracking-tight text-[var(--color-text)] text-balance">
              {category.name}
            </h1>

            {category.description && (
              <p className="mt-4 text-base leading-8 text-[var(--color-text-muted)]">
                {category.description}
              </p>
            )}

            <p className="mt-6 text-sm font-medium text-[var(--color-text-muted)]">
              {services.length}{" "}
              {services.length === 1 ? "خدمة متاحة" : "خدمات متاحة"}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="category-services-heading"
        className="border-b border-[var(--color-border)]"
      >
        <div className="mx-auto max-w-[var(--content-max)] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-[var(--color-primary)]">
              الخدمات
            </p>

            <h2
              id="category-services-heading"
              className="mt-2 max-w-3xl text-[clamp(1.4rem,1.1rem+1.2vw,1.875rem)] font-bold tracking-tight text-[var(--color-text)] text-balance"
            >
              الخدمات المتاحة في {category.name}
            </h2>
          </div>

          {services.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  index={index}
                  variant="card"
                />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-dashed border-[var(--color-border)] px-6 py-16 text-center">
              <h3 className="text-lg font-semibold text-[var(--color-text)]">
                لا توجد خدمات متاحة في هذا المجال حاليًا
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[var(--color-text-muted)]">
                يمكنك استكشاف المجالات الأخرى أو العودة إلى قائمة الخدمات
                المتاحة.
              </p>

              <Link
                href="/search"
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--color-primary)] px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
              >
                استكشف كل الخدمات
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
