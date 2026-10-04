import { describe, expect, it } from "vitest";

import { categories } from "@/data/categories";
import { LocalServiceRepository } from "@/data/lib/services/local-service-repository";
import type { ServiceRepository } from "@/data/lib/services/service-repository";
import { services } from "@/data/services";

const repository: ServiceRepository = new LocalServiceRepository();

describe("LocalServiceRepository", () => {
  it("exposes the complete local catalogue through the repository interface", async () => {
    await expect(repository.getAll()).resolves.toBe(services);
  });

  it("returns a service by slug and undefined for an unknown slug", async () => {
    await expect(repository.getBySlug("sample-national-id-replacement")).resolves.toBe(
      services[0],
    );
    await expect(repository.getBySlug("missing-service")).resolves.toBeUndefined();
  });

  it("returns categories and category-specific services", async () => {
    await expect(repository.getCategories()).resolves.toBe(categories);
    await expect(repository.getByCategory("civil-status")).resolves.toEqual([services[0]]);
    await expect(repository.getByCategory("missing-category")).resolves.toEqual([]);
    await expect(repository.getCategoryBySlug("civil-status")).resolves.toBe(categories[0]);
    await expect(repository.getCategoryBySlug("missing-category")).resolves.toBeUndefined();
  });
});
