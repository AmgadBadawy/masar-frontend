import Link from "next/link";

import type { ServiceCategory } from "@/types/service";

type CategoriesProps = {
  categories: ServiceCategory[];
};

export function Categories({ categories }: CategoriesProps) {
  return (
    <section
      aria-labelledby="categories-heading"
      dir="rtl"
      className="border-b border-[var(--color-border)] bg-[var(--color-background)]"
    >
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <header className="lg:col-span-4">
            <p className="text-sm font-bold text-[var(--color-primary)]">
              ابدأ من المجال
            </p>

            <h2
              id="categories-heading"
              className="mt-3 max-w-[380px] text-[clamp(1.6rem,1.2rem+1.5vw,2.25rem)] font-extrabold leading-tight tracking-tight text-[var(--color-text)]"
            >
              من أين تبدأ؟
            </h2>

            <p className="mt-4 max-w-[380px] text-base leading-8 text-[var(--color-text-muted)]">
              اختر المجال الأقرب للخدمة التي تبحث عنها، ثم انتقل إلى التفاصيل
              المناسبة.
            </p>

            <Link
              href="/search"
              className="group mt-6 inline-flex min-h-11 items-center text-sm font-bold text-[var(--color-text)] transition-colors duration-150 hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-4"
            >
              عرض كل الخدمات
              <span
                aria-hidden="true"
                className="ms-2 transition-transform duration-150 group-hover:-translate-x-1"
              >
                ←
              </span>
            </Link>
          </header>

          <div className="lg:col-span-8">
            {categories.length > 0 ? (
              <div className="overflow-hidden border-y border-[var(--color-border)]">
                {categories.map((category, index) => (
                  <Link
                    key={category.slug}
                    href={`/categories/${category.slug}`}
                    className="group grid min-h-20 grid-cols-[44px_minmax(0,1fr)_28px] items-center gap-4 border-t border-[var(--color-border)] px-2 py-4 transition-colors duration-150 first:border-t-0 hover:bg-[var(--color-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary)] sm:min-h-[84px] sm:grid-cols-[52px_minmax(0,1fr)_32px] sm:px-4"
                  >
                    {/* تعديل لون الأرقام ليكون ممتازا في التباين القراءاتي */}
                    <span className="text-sm font-bold tabular-nums text-[var(--color-text-subtle)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0">
                      <span className="block text-lg font-bold leading-7 text-[var(--color-text)] transition-colors duration-150 group-hover:text-[var(--color-primary)] sm:text-xl">
                        {category.name}
                      </span>
                    </span>

                    <span
                      aria-hidden="true"
                      className="justify-self-end text-lg text-[var(--color-text-muted)] transition-[color,transform] duration-150 group-hover:-translate-x-1 group-hover:text-[var(--color-primary)]"
                    >
                      ←
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="border-y border-[var(--color-border)] py-8">
                <p className="text-sm leading-7 text-[var(--color-text-muted)]">
                  لا توجد مجالات متاحة حاليًا.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
