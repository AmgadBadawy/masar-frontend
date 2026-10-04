import type { Service } from "@/types/service";

import { normalizeArabic } from "./normalize-arabic";

type SearchServicesOptions = {
  query?: string;
  categorySlug?: string;
};

export function searchServices(
  services: Service[],
  { query = "", categorySlug = "" }: SearchServicesOptions = {},
): Service[] {
  const normalizedQuery = normalizeArabic(query);

  return services.filter((service) => {
    const matchesCategory =
      categorySlug.length === 0 || service.category.slug === categorySlug;

    if (!matchesCategory || normalizedQuery.length === 0) {
      return matchesCategory;
    }

    const searchableFields = [
      service.title,
      service.summary,
      service.category.name,
      service.authority,
    ].filter((field): field is string => typeof field === "string");

    return searchableFields.some((field) =>
      normalizeArabic(field).includes(normalizedQuery),
    );
  });
}
