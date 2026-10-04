import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh]">
      <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
        <p className="text-sm font-semibold text-[var(--color-primary)]">404</p>

        <h1 className="mt-3 text-[clamp(1.75rem,1.3rem+1.6vw,2.25rem)] font-bold tracking-tight text-[var(--color-text)]">
          الصفحة التي تبحث عنها غير موجودة
        </h1>

        <p className="mt-5 max-w-xl text-base leading-8 text-[var(--color-text-muted)]">
          قد تكون الصفحة حُذفت، أو تغيّر الرابط، أو يكون العنوان غير صحيح.
          يمكنك العودة إلى الرئيسية أو استكشاف الخدمات المتاحة.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[var(--color-primary)] px-6 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[var(--color-primary-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
          >
            العودة للرئيسية
          </Link>

          <Link
            href="/search"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-6 text-sm font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)]/50 hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
          >
            استكشف الخدمات
          </Link>
        </div>
      </section>
    </main>
  );
}
