import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FavoriteButton } from "@/components/services/favorite-button";
import { ServiceChecklist } from "@/components/services/service-checklist";
import { getCachedServiceBySlug } from "@/data/lib/services/cached-service-repository";
import { formatArabicDate } from "@/lib/formatters/format-arabic-date";
import { createSeoMetadata, DEFAULT_DESCRIPTION, SITE_URL } from "@/lib/seo";
import { RecentlyViewedTracker } from "@/components/services/recently-viewed-tracker";

export const revalidate = 300;

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getCachedServiceBySlug(slug);

  if (!service) {
    return createSeoMetadata({
      title: "الخدمة غير موجودة",
      description: "الخدمة التي تبحث عنها غير موجودة في مسار.",
      noIndex: true,
    });
  }

  return createSeoMetadata({
    title: service.title,
    description: service.summary ?? DEFAULT_DESCRIPTION,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getCachedServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const additionalDetails = [
    { label: "الرسوم", value: service.fees },
    { label: "المدة المتوقعة", value: service.expectedTime },
    { label: "إتاحة الخدمة إلكترونيًا", value: service.onlineAvailability },
  ].filter((detail): detail is { label: string; value: string } =>
    Boolean(detail.value),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: service.title,
    description: service.summary,
    provider: {
      "@type": "GovernmentOrganization",
      name: service.authority || "جهة حكومية",
    },
    serviceType: service.category.name,
    url: `${SITE_URL}/services/${service.slug}`,
  };

  return (
    <main>
      {/* متتبع المشاهدات المخفي (ديناميكي) */}
      <RecentlyViewedTracker slug={service.slug} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* هيدر الخدمة والرجوع */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/search"
              className="inline-flex min-h-11 items-center text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
            >
              <span aria-hidden="true" className="ml-2">
                →
              </span>
              العودة للخدمات
            </Link>

            {/* زر إضافة الخدمة للمفضلة */}
            <FavoriteButton serviceSlug={service.slug} />
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-[var(--color-primary)]">
              {service.category.name}
            </p>

            <h1 className="mt-3 max-w-3xl text-[clamp(1.7rem,1.25rem+1.6vw,2.35rem)] font-bold leading-[1.35] tracking-tight text-[var(--color-text)] text-balance">
              {service.title}
            </h1>

            {service.summary && (
              <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-text-muted)]">
                {service.summary}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* الجهة المختصة والمجال */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <dl
            className={`grid gap-4 ${
              service.authority ? "sm:grid-cols-2" : ""
            }`}
          >
            {service.authority && (
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                <dt className="text-sm text-[var(--color-text-muted)]">
                  الجهة المختصة
                </dt>
                <dd className="mt-2 text-base font-semibold leading-7 text-[var(--color-text)]">
                  {service.authority}
                </dd>
              </div>
            )}

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <dt className="text-sm text-[var(--color-text-muted)]">المجال</dt>
              <dd className="mt-2 text-base font-semibold leading-7 text-[var(--color-text)]">
                <Link
                  href={`/categories/${service.category.slug}`}
                  className="hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                >
                  {service.category.name}
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* تفاصيل إضافية */}
      {additionalDetails.length > 0 && (
        <section
          aria-labelledby="service-details-heading"
          className="border-b border-[var(--color-border)]"
        >
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
            <p className="text-sm font-semibold text-[var(--color-primary)]">
              تفاصيل إضافية
            </p>
            <h2
              id="service-details-heading"
              className="mt-2 text-[clamp(1.35rem,1.1rem+1vw,1.75rem)] font-bold tracking-tight text-[var(--color-text)]"
            >
              معلومات تساعدك قبل البدء
            </h2>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {additionalDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
                >
                  <dt className="text-sm text-[var(--color-text-muted)]">
                    {detail.label}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold leading-7 text-[var(--color-text)]">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* قائمة التفقد التفاعلية (Checklist) */}
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <ServiceChecklist
            serviceSlug={service.slug}
            documents={service.documents}
            steps={service.steps}
          />
        </div>
      </section>

      {/* التحقق من المصدر الرسمي */}
      <section
        aria-labelledby="verification-heading"
        className="border-b border-[var(--color-border)]"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7">
            <p className="text-sm font-semibold text-[var(--color-primary)]">
              معلومات المصدر
            </p>
            <h2
              id="verification-heading"
              className="mt-2 text-xl font-bold text-[var(--color-text)]"
            >
              التحقق من المعلومات
            </h2>

            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <dt className="text-sm text-[var(--color-text-muted)]">
                  آخر تحقق
                </dt>
                <dd className="mt-1 text-sm font-semibold text-[var(--color-text)]">
                  {formatArabicDate(service.verification.verifiedAt)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-text-muted)]">
                  المصدر
                </dt>
                <dd>
                  <a
                    href={service.verification.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex min-h-11 items-center text-sm font-semibold text-[var(--color-primary)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                  >
                    {service.verification.source.title}
                    <span className="sr-only"> (يفتح في نافذة جديدة)</span>
                  </a>
                </dd>
              </div>
            </dl>

            <a
              href={service.verification.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--color-primary)] px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
            >
              انتقل إلى المصدر الرسمي
              <span aria-hidden="true" className="mr-2">
                ↗
              </span>
              <span className="sr-only"> (يفتح في نافذة جديدة)</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
