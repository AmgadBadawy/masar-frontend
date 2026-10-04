import Link from "next/link";
import type { Service } from "@/types/service";

type ServiceCardProps = {
  service: Service;
  index?: number;
  variant?: "list" | "card";
};

export function ServiceCard({
  service,
  index,
  variant = "list",
}: ServiceCardProps) {
  if (variant === "card") {
    return (
      <article className="relative flex h-full flex-col rounded-xl border border-[var(--color-border)] bg-white p-5 transition-shadow hover:shadow-md">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {typeof index === "number" && (
            <span className="text-xs font-bold tabular-nums text-[var(--color-text-subtle)]">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}

          <span className="text-sm font-bold text-[var(--color-primary)]">
            {service.category.name}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-bold leading-7 text-[var(--color-text)] text-balance">
          {service.title}
        </h3>

        {service.summary && (
          <p className="mt-2 line-clamp-3 text-sm font-medium leading-7 text-[var(--color-text-muted)]">
            {service.summary}
          </p>
        )}

        <div className="mt-auto pt-5">
          <Link
            href={`/services/${service.slug}`}
            className="group before:absolute before:inset-0 inline-flex min-h-11 items-center text-sm font-bold text-[var(--color-text)] transition-colors duration-150 hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
          >
            اعرف الطريق
            <span
              aria-hidden="true"
              className="ms-2 transition-transform duration-150 group-hover:-translate-x-1"
            >
              ←
            </span>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="border-t border-[var(--color-border)] first:border-t-0">
      <Link
        href={`/services/${service.slug}`}
        className="group grid gap-5 px-2 py-6 transition-colors duration-150 hover:bg-[var(--color-surface-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary)] sm:px-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {typeof index === "number" && (
              <span className="text-sm font-bold tabular-nums text-[var(--color-text-subtle)]">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}

            <span className="text-sm font-bold text-[var(--color-primary)]">
              {service.category.name}
            </span>
          </div>

          <h3 className="mt-3 text-lg font-bold leading-7 text-[var(--color-text)] transition-colors duration-150 group-hover:text-[var(--color-primary)] sm:text-xl">
            {service.title}
          </h3>

          {service.summary && (
            <p className="mt-2 max-w-2xl text-sm font-medium leading-7 text-[var(--color-text-muted)]">
              {service.summary}
            </p>
          )}
        </div>

        <span className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--color-text)] transition-colors duration-150 group-hover:text-[var(--color-primary)]">
          اعرف الطريق
          <span
            aria-hidden="true"
            className="transition-transform duration-150 group-hover:-translate-x-1"
          >
            ←
          </span>
        </span>
      </Link>
    </article>
  );
}
