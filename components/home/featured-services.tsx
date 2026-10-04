import Link from "next/link";
import { ServiceCard } from "@/components/services/service-card";
import type { Service } from "@/types/service";

type FeaturedServicesProps = {
  services: Service[];
};

export function FeaturedServices({ services }: FeaturedServicesProps) {
  const featuredServices = services.slice(0, 6);

  return (
    <section
      aria-labelledby="featured-services-heading"
      dir="rtl"
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <header className="lg:col-span-4">
            <p className="text-sm font-bold text-[var(--color-primary)]">
              خدمات يمكنك البدء منها
            </p>

            <h2
              id="featured-services-heading"
              className="mt-3 max-w-[380px] text-[clamp(1.6rem,1.2rem+1.5vw,2.25rem)] font-extrabold leading-tight tracking-tight text-[var(--color-text)]"
            >
              ابدأ من خدمة محددة
            </h2>

            <p className="mt-4 max-w-[380px] text-base font-medium leading-8 text-[var(--color-text-muted)]">
              إذا كنت تعرف الخدمة التي تحتاجها، ابدأ منها مباشرة وتعرّف على
              الطريق والمعلومات المرتبطة بها.
            </p>

            <Link
              href="/search"
              className="group mt-6 inline-flex min-h-11 items-center text-sm font-bold text-[var(--color-text)] transition-colors duration-150 hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-4"
            >
              عرض جميع الخدمات
              <span
                aria-hidden="true"
                className="ms-2 transition-transform duration-150 group-hover:-translate-x-1"
              >
                ←
              </span>
            </Link>
          </header>

          <div className="lg:col-span-8">
            {featuredServices.length > 0 ? (
              <div className="border-b border-[var(--color-border)]">
                {featuredServices.map((service, index) => (
                  <ServiceCard
                    key={service.slug}
                    service={service}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="border-y border-[var(--color-border)] py-8 text-center">
                <p className="text-sm font-medium leading-7 text-[var(--color-text-muted)]">
                  لا توجد خدمات متاحة حاليًا.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
