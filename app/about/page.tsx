import Link from "next/link";

import { createSeoMetadata } from "@/lib/seo";

export const metadata = createSeoMetadata({
  title: "عن مسار",
  description:
    "تعرف على مسار، المنصة الإرشادية التي تساعدك على فهم الإجراءات الحكومية والوصول إلى المصادر الرسمية.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold text-[var(--color-primary)]">عن مسار</p>
          <h1 className="mt-3 max-w-3xl text-[clamp(1.75rem,1.3rem+1.8vw,2.5rem)] font-bold leading-tight tracking-tight text-[var(--color-text)] text-balance">
            مسار يساعدك على فهم الطريق قبل أن تبدأ
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-text-muted)]">
            مسار منصة إرشادية عربية تساعدك على اكتشاف الإجراءات الحكومية وفهم
            متطلباتها وخطواتها بشكل منظم وواضح.
          </p>
        </div>
      </section>

      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto grid max-w-3xl gap-4 px-4 py-12 sm:grid-cols-3 sm:px-6 sm:py-16 lg:px-8">
          {[
            ["افهم الخدمة", "نرتب المعلومات الأساسية حتى تعرف ما الذي تحتاجه."],
            ["راجع المصدر", "نعرض المصدر وتاريخ التحقق عندما تكون المعلومة متاحة."],
            ["أكمل رسميًا", "نوجّهك إلى الجهة الرسمية بدل تنفيذ الإجراء داخل مسار."],
          ].map(([title, description], index) => (
            <article
              key={title}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <span className="text-xs font-semibold text-[var(--color-primary)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-4 text-lg font-semibold text-[var(--color-text)]">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h2 className="text-[clamp(1.4rem,1.15rem+1vw,1.75rem)] font-bold tracking-tight text-[var(--color-text)]">
            ما الذي لا يقدمه مسار؟
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-text-muted)]">
            مسار ليس جهة حكومية ولا ينفّذ المعاملات بدلًا عنك. المعلومات الحالية
            لا تغني عن المصدر الرسمي، ونوضح مصدر كل خدمة وتاريخ آخر تحقق من
            بياناتها المتاحة.
          </p>
          <Link
            href="/search"
            className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-[var(--color-primary)] px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
          >
            استكشف الخدمات
            <span aria-hidden="true" className="ms-2">←</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
