import { describe, expect, it } from "vitest";

import { StrapiServiceRepository } from "@/data/lib/services/strapi-service-repository";

const strapiUrl = process.env.STRAPI_URL;
const integrationTest = strapiUrl ? it : it.skip;

describe("StrapiServiceRepository integration", () => {
  integrationTest("maps the complete official published catalogue from the live Strapi API", async () => {
    const repository = new StrapiServiceRepository({
      baseUrl: strapiUrl,
      publicationStatus: "published",
    });
    const [categories, services] = await Promise.all([
      repository.getCategories(),
      repository.getAll(),
    ]);

    expect(categories).toHaveLength(9);
    expect(services).toHaveLength(130);
    expect(services).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          category: expect.objectContaining({ slug: "civil-status" }),
          steps: [],
          verification: expect.objectContaining({
            source: expect.objectContaining({
              url: expect.stringMatching(/^https:\/\//),
            }),
          }),
        }),
      ]),
    );
    expect(services.every((service) => service.slug.startsWith("khadamat-misr-"))).toBe(true);
    expect(services.every((service) => service.verification.source.url.startsWith("https://www.khadamatmisr.gov.eg/node/"))).toBe(true);
  });
});
