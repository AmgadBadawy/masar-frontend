import type { Metadata } from "next";

export const SITE_NAME = "مسار";

export const DEFAULT_DESCRIPTION =
  "دليل مبسّط للإجراءات الحكومية في مصر يساعدك تعرف الخدمة المناسبة والخطوات والمستندات المطلوبة.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type CreateSeoMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

export function createSeoMetadata({
  title,
  description,
  path,
  noIndex = false,
}: CreateSeoMetadataOptions): Metadata {
  return {
    title,
    description,

    ...(path && {
      alternates: {
        canonical: path,
      },
    }),

    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      locale: "ar_EG",
      type: "website",

      ...(path && {
        url: path,
      }),
    },

    robots: {
      index: !noIndex,
      follow: true,
    },
  };
}
