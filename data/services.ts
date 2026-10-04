import type { Service } from "@/types/service";
import { categories } from "./categories";

const civilStatusCategory = categories.find(
  (category) => category.slug === "civil-status",
);

const documentsCategory = categories.find(
  (category) => category.slug === "documents",
);

if (!civilStatusCategory || !documentsCategory) {
  throw new Error("Required development categories are missing.");
}

export const services: Service[] = [
  {
    slug: "sample-national-id-replacement",
    title: "نموذج: استخراج بطاقة شخصية بدل فاقد",
    summary:
      "بيانات تجريبية لتوضيح شكل خدمة داخل منصة مسار أثناء مرحلة التطوير.",
    category: civilStatusCategory,
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
        url: "https://example.com",
      },
    },
  },
  {
    slug: "sample-document-request",
    title: "نموذج: طلب مستند رسمي",
    summary: "بيانات تجريبية لتوضيح خدمة أخرى داخل الكتالوج المحلي.",
    category: documentsCategory,
    authority: "جهة حكومية تجريبية",
    documents: [],
    steps: [
      {
        order: 1,
        title: "بدء الطلب",
        description: "بيانات تجريبية فقط.",
      },
    ],
    verification: {
      verifiedAt: "2026-09-20",
      source: {
        title: "مصدر تجريبي",
        url: "https://example.com",
      },
    },
  },
];
