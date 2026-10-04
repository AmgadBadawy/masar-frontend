import { describe, expect, it } from "vitest";

import {
  mapStrapiCategory,
  mapStrapiService,
  StrapiDataMappingError,
} from "@/data/lib/services/strapi-service-mapper";

const strapiCategory = {
  id: 1,
  documentId: "category-document-id",
  name: "الأحوال المدنية",
  slug: "civil-status",
  description: "خدمات ووثائق الأحوال المدنية.",
  publishedAt: null,
};

const strapiService = {
  id: 1,
  documentId: "service-document-id",
  title: "نموذج: استخراج بطاقة شخصية بدل فاقد",
  slug: "sample-national-id-replacement",
  summary: "بيانات تجريبية لتوضيح شكل خدمة داخل منصة مسار أثناء مرحلة التطوير.",
  authority: "جهة حكومية تجريبية",
  fees: null,
  expectedTime: null,
  onlineAvailability: null,
  category: strapiCategory,
  documents: [
    {
      id: 1,
      name: "مستند تجريبي",
      description: "هذا المستند تجريبي وليس متطلبًا حكوميًا حقيقيًا.",
    },
  ],
  steps: [
    {
      id: 1,
      order: 1,
      title: "الخطوة التجريبية الأولى",
      description: "بيانات تجريبية لشرح شكل خطوات الخدمة.",
    },
    {
      id: 2,
      order: 2,
      title: "الخطوة التجريبية الثانية",
      description: "بيانات تجريبية لشرح تسلسل خطوات الخدمة.",
    },
  ],
  verification: {
    id: 1,
    verifiedAt: "2026-09-20",
    sourceTitle: "مصدر تجريبي",
    sourceUrl: "https://www.khadamatmisr.gov.eg/node/999",
  },
};

describe("Strapi service mapper", () => {
  it("maps Strapi service fields into the unchanged frontend domain shape", () => {
    expect(mapStrapiService(strapiService)).toEqual({
      slug: "sample-national-id-replacement",
      title: "نموذج: استخراج بطاقة شخصية بدل فاقد",
      summary: "بيانات تجريبية لتوضيح شكل خدمة داخل منصة مسار أثناء مرحلة التطوير.",
      category: {
        slug: "civil-status",
        name: "الأحوال المدنية",
        description: "خدمات ووثائق الأحوال المدنية.",
      },
      authority: "جهة حكومية تجريبية",
      documents: [
        {
          name: "مستند تجريبي",
          description: "هذا المستند تجريبي وليس متطلبًا حكوميًا حقيقيًا.",
        },
      ],
      steps: [
        {
          order: 1,
          title: "الخطوة التجريبية الأولى",
          description: "بيانات تجريبية لشرح شكل خطوات الخدمة.",
        },
        {
          order: 2,
          title: "الخطوة التجريبية الثانية",
          description: "بيانات تجريبية لشرح تسلسل خطوات الخدمة.",
        },
      ],
      verification: {
        verifiedAt: "2026-09-20",
        source: {
          title: "مصدر تجريبي",
          url: "https://www.khadamatmisr.gov.eg/node/999",
        },
      },
    });
  });

  it("maps a category independently", () => {
    expect(mapStrapiCategory(strapiCategory)).toEqual({
      slug: "civil-status",
      name: "الأحوال المدنية",
      description: "خدمات ووثائق الأحوال المدنية.",
    });
  });

  it("preserves an empty official steps list and omits unavailable optional fields", () => {
    expect(
      mapStrapiService({
        ...strapiService,
        steps: [],
        fees: null,
        expectedTime: undefined,
        onlineAvailability: null,
      }),
    ).toMatchObject({
      steps: [],
    });

    const service = mapStrapiService({
      ...strapiService,
      steps: [],
      fees: null,
      expectedTime: undefined,
      onlineAvailability: null,
    });

    expect(service).not.toHaveProperty("fees");
    expect(service).not.toHaveProperty("expectedTime");
    expect(service).not.toHaveProperty("onlineAvailability");
  });

  it("maps a service without unpublished summary or authority", () => {
    const service = mapStrapiService({
      ...strapiService,
      summary: null,
      authority: undefined,
      documents: [],
      steps: [],
    });

    expect(service).not.toHaveProperty("summary");
    expect(service).not.toHaveProperty("authority");
    expect(service.documents).toEqual([]);
    expect(service.steps).toEqual([]);
  });

  it("rejects malformed source URLs instead of returning malformed domain data", () => {
    expect(() =>
      mapStrapiService({
        ...strapiService,
        verification: { ...strapiService.verification, sourceUrl: "not-a-url" },
      }),
    ).toThrow(StrapiDataMappingError);
  });
});
