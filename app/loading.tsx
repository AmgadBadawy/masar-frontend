export default function Loading() {
  return (
    <main aria-busy="true" aria-live="polite" className="min-h-[60vh]">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <span className="sr-only">جاري تحميل الصفحة...</span>

        <div aria-hidden="true" className="animate-pulse">
          <div className="h-4 w-28 rounded bg-[var(--color-border)]" />

          <div className="mt-4 h-10 w-full max-w-xl rounded bg-[var(--color-border)]" />

          <div className="mt-4 h-5 w-full max-w-2xl rounded bg-[var(--color-border)]" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex h-56 flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                <div className="h-4 w-1/3 rounded bg-[var(--color-border)]" />
                <div className="mt-4 h-6 w-3/4 rounded bg-[var(--color-border)]" />
                <div className="mt-3 h-4 w-full rounded bg-[var(--color-border)]" />
                <div className="mt-2 h-4 w-5/6 rounded bg-[var(--color-border)]" />
                <div className="mt-auto h-5 w-24 rounded bg-[var(--color-border)]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
