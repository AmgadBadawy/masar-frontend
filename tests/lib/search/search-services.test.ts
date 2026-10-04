import { describe, expect, it } from "vitest";

import { categories } from "@/data/categories";
import { services } from "@/data/services";
import { searchServices } from "@/lib/search/search-services";
import type { Service } from "@/types/service";

const englishService: Service = {
  slug: "digital-request",
  title: "Digital Request",
  summary: "طلب Demo service للتجربة",
  category: categories[2],
  authority: "Demo Authority",
  documents: [],
  steps: [],
  verification: {
    verifiedAt: "2026-09-20",
    source: { title: "Demo source", url: "https://example.com" },
  },
};

const searchableServices = [...services, englishService];

function slugs(results: Service[]): string[] {
  return results.map((service) => service.slug);
}

describe("searchServices", () => {
  it("finds a service by title with common Arabic variations", () => {
    const expected = ["sample-national-id-replacement"];

    expect(slugs(searchServices(services, { query: "بطاقة" }))).toEqual(expected);
    expect(slugs(searchServices(services, { query: "بِطَاقَة" }))).toEqual(expected);
    expect(slugs(searchServices(services, { query: "بطاقه" }))).toEqual(expected);
  });

  it("finds services by summary, category name, and authority", () => {
    expect(slugs(searchServices(services, { query: "الكتالوج المحلي" }))).toEqual([
      "sample-document-request",
    ]);
    expect(slugs(searchServices(services, { query: "الأحوال" }))).toEqual([
      "sample-national-id-replacement",
    ]);
    expect(slugs(searchServices(services, { query: "جهة حكومية تجريبية" }))).toEqual([
      "sample-national-id-replacement",
      "sample-document-request",
    ]);
  });

  it("returns all services in their original order for empty or whitespace-only queries", () => {
    const expected = slugs(searchableServices);

    expect(slugs(searchServices(searchableServices))).toEqual(expected);
    expect(slugs(searchServices(searchableServices, { query: "   " }))).toEqual(
      expected,
    );
  });

  it("supports partial and multiple matches without changing result order", () => {
    expect(slugs(searchServices(services, { query: "بدل فا" }))).toEqual([
      "sample-national-id-replacement",
    ]);
    expect(slugs(searchServices(services, { query: "نموذج" }))).toEqual([
      "sample-national-id-replacement",
      "sample-document-request",
    ]);
  });

  it("returns no results when no searchable field matches", () => {
    expect(searchServices(services, { query: "غير موجودة" })).toEqual([]);
  });

  it("matches English case-insensitively and supports mixed Arabic-English queries", () => {
    expect(slugs(searchServices(searchableServices, { query: "digital" }))).toEqual([
      "digital-request",
    ]);
    expect(slugs(searchServices(searchableServices, { query: "طلب demo" }))).toEqual([
      "digital-request",
    ]);
  });

  it("searches a service safely when unpublished summary and authority are absent", () => {
    const serviceWithoutOptionalFields: Service = {
      slug: "official-record-without-summary",
      title: "خدمة رسمية موثقة",
      category: categories[0],
      documents: [],
      steps: [],
      verification: {
        verifiedAt: "2026-09-24",
        source: { title: "مركز خدمات مصر", url: "https://www.khadamatmisr.gov.eg/node/999" },
      },
    };

    expect(
      slugs(searchServices([serviceWithoutOptionalFields], { query: "خدمة رسمية" })),
    ).toEqual(["official-record-without-summary"]);
  });

  it("applies a category filter independently and together with the query", () => {
    expect(
      slugs(searchServices(services, { categorySlug: "documents" })),
    ).toEqual(["sample-document-request"]);
    expect(
      slugs(
        searchServices(services, {
          query: "نموذج",
          categorySlug: "civil-status",
        }),
      ),
    ).toEqual(["sample-national-id-replacement"]);
  });
});
