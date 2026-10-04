import { describe, expect, it, vi } from "vitest";

import { StrapiServiceRepository } from "@/data/lib/services/strapi-service-repository";

const categories = [
  { name: "الأحوال المدنية", slug: "civil-status", description: "خدمات ووثائق الأحوال المدنية." },
  { name: "المستندات والوثائق", slug: "documents", description: "خدمات مرتبطة بالمستندات الرسمية." },
  { name: "النقل والمرور", slug: "transport", description: "خدمات مرتبطة بالنقل والمرور." },
];

const services = [
  {
    title: "نموذج: استخراج بطاقة شخصية بدل فاقد", slug: "sample-national-id-replacement", summary: "بيانات تجريبية لتوضيح شكل خدمة داخل منصة مسار أثناء مرحلة التطوير.", authority: "جهة حكومية تجريبية", category: categories[0],
    documents: [{ name: "مستند تجريبي", description: "هذا المستند تجريبي وليس متطلبًا حكوميًا حقيقيًا." }],
    steps: [{ order: 1, title: "الخطوة التجريبية الأولى", description: "بيانات تجريبية لشرح شكل خطوات الخدمة." }, { order: 2, title: "الخطوة التجريبية الثانية", description: "بيانات تجريبية لشرح تسلسل خطوات الخدمة." }],
    verification: { verifiedAt: "2026-09-20", sourceTitle: "مصدر تجريبي", sourceUrl: "https://www.khadamatmisr.gov.eg/node/999" },
  },
  {
    title: "نموذج: طلب مستند رسمي", slug: "sample-document-request", summary: "بيانات تجريبية لتوضيح خدمة أخرى داخل الكتالوج المحلي.", authority: "جهة حكومية تجريبية", category: categories[1], documents: [],
    steps: [{ order: 1, title: "بدء الطلب", description: "بيانات تجريبية فقط." }],
    verification: { verifiedAt: "2026-09-20", sourceTitle: "مصدر تجريبي", sourceUrl: "https://www.khadamatmisr.gov.eg/node/998" },
  },
];

function jsonResponse(data: unknown): Response {
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

describe("StrapiServiceRepository", () => {
  it("requests the configured populated collections and maps all domain data", async () => {
    const fetcher = vi.fn(async (url: string) => {
      if (url.includes("/api/categories")) return jsonResponse(categories);
      return jsonResponse(services);
    });
    const repository = new StrapiServiceRepository({
      baseUrl: "http://localhost:1337",
      fetcher,
    });

    const [receivedCategories, receivedServices] = await Promise.all([
      repository.getCategories(),
      repository.getAll(),
    ]);

    expect(receivedCategories).toHaveLength(3);
    expect(receivedServices).toHaveLength(2);
    expect(receivedServices[0]).toMatchObject({
      category: { slug: "civil-status" },
      documents: [{ name: "مستند تجريبي" }],
      steps: [{ order: 1 }, { order: 2 }],
      verification: { source: { title: "مصدر تجريبي", url: "https://www.khadamatmisr.gov.eg/node/999" } },
    });
    expect(fetcher).toHaveBeenCalledWith(
      expect.stringContaining("/api/services?status=draft&populate[category][fields][0]=slug"),
      expect.objectContaining({ cache: "no-store" }),
    );
    expect(fetcher).not.toHaveBeenCalledWith(
      expect.stringContaining("populate=*"),
      expect.anything(),
    );
  });

  it("requests only published content when configured for production", async () => {
    const fetcher = vi.fn(async () => jsonResponse(services));
    const repository = new StrapiServiceRepository({
      baseUrl: "http://localhost:1337",
      fetcher,
      publicationStatus: "published",
    });

    await repository.getAll();

    expect(fetcher).toHaveBeenCalledWith(
      expect.stringContaining("/api/services?status=published&populate[category][fields][0]=slug"),
      expect.objectContaining({ next: { revalidate: 300 } }),
    );
  });

  it("retrieves every Strapi page instead of silently truncating the catalogue at 100", async () => {
    const firstPage = Array.from({ length: 100 }, () => services[0]);
    const secondPage = Array.from({ length: 30 }, () => services[1]);
    const fetcher = vi.fn(async (url: string) =>
      jsonResponse(url.includes("pagination[page]=1") ? firstPage : secondPage),
    );
    const repository = new StrapiServiceRepository({
      baseUrl: "http://localhost:1337",
      fetcher,
    });

    await expect(repository.getAll()).resolves.toHaveLength(130);
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(fetcher.mock.calls[0][0]).toContain("pagination[page]=1");
    expect(fetcher.mock.calls[1][0]).toContain("pagination[page]=2");
  });

  it("returns undefined for a missing slug", async () => {
    const repository = new StrapiServiceRepository({
      baseUrl: "http://localhost:1337",
      fetcher: async () => jsonResponse([]),
    });

    await expect(repository.getBySlug("missing-service")).resolves.toBeUndefined();
    await expect(repository.getCategoryBySlug("missing-category")).resolves.toBeUndefined();
  });

  it("filters category listings in Strapi instead of downloading the full catalogue", async () => {
    const fetcher = vi.fn(async () => jsonResponse([services[0]]));
    const repository = new StrapiServiceRepository({
      baseUrl: "http://localhost:1337",
      fetcher,
    });

    await expect(repository.getByCategory("civil-status")).resolves.toHaveLength(1);
    expect(fetcher).toHaveBeenCalledWith(
      expect.stringContaining("filters[category][slug][$eq]=civil-status"),
      expect.anything(),
    );
  });

  it("raises an explicit HTTP error", async () => {
    const repository = new StrapiServiceRepository({
      baseUrl: "http://localhost:1337",
      fetcher: async () => new Response("Forbidden", { status: 403 }),
    });

    await expect(repository.getAll()).rejects.toMatchObject({
      name: "StrapiRequestError",
      status: 403,
    });
  });
});

