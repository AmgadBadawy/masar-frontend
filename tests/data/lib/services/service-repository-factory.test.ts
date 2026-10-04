import { describe, expect, it, vi } from "vitest";

import {
  getServiceRepository,
} from "@/data/lib/services/service-repository-factory";
import type { ServiceRepository } from "@/data/lib/services/service-repository";

function createRepository(overrides: Partial<ServiceRepository> = {}): ServiceRepository {
  return {
    getAll: async () => [],
    getBySlug: async () => undefined,
    getByCategory: async () => [],
    getCategories: async () => [],
    getCategoryBySlug: async () => undefined,
    ...overrides,
  };
}

describe("getServiceRepository", () => {
  it("uses the local catalogue when STRAPI_URL is absent in development", async () => {
    const localRepository = createRepository();
    const createLocalRepository = vi.fn(() => localRepository);
    const reportFallback = vi.fn();

    const repository = getServiceRepository({
      strapiUrl: "",
      nodeEnv: "development",
      createLocalRepository,
      reportFallback,
    });

    expect(repository).toBe(localRepository);
    expect(createLocalRepository).toHaveBeenCalledOnce();
    expect(reportFallback).toHaveBeenCalledWith(
      "STRAPI_URL is not configured; using the local development catalogue.",
    );
  });

  it("uses Strapi when configured and the request succeeds", async () => {
    const getAll = vi.fn(async () => []);
    const strapiRepository = createRepository({
      getAll,
    });
    const createStrapiRepository = vi.fn(() => strapiRepository);

    const repository = getServiceRepository({
      strapiUrl: "http://127.0.0.1:1337",
      nodeEnv: "development",
      createLocalRepository: () => createRepository(),
      createStrapiRepository,
      reportFallback: vi.fn(),
    });

    await repository.getAll();

    expect(createStrapiRepository).toHaveBeenCalledWith(
      "http://127.0.0.1:1337",
      "draft",
    );
    expect(getAll).toHaveBeenCalledOnce();
  });

  it("uses local data after a development Strapi runtime failure and reports it", async () => {
    const failure = new Error("Strapi unavailable");
    const strapiRepository = createRepository({
      getCategories: async () => {
        throw failure;
      },
    });
    const localRepository = createRepository({
      getCategories: async () => [{ slug: "documents", name: "المستندات والوثائق" }],
    });
    const reportFallback = vi.fn();
    const repository = getServiceRepository({
      strapiUrl: "http://127.0.0.1:1337",
      nodeEnv: "development",
      createStrapiRepository: () => strapiRepository,
      createLocalRepository: () => localRepository,
      reportFallback,
    });

    await expect(repository.getCategories()).resolves.toEqual([
      { slug: "documents", name: "المستندات والوثائق" },
    ]);
    expect(reportFallback).toHaveBeenCalledWith(
      "Strapi failed to get categories; using the local development catalogue instead.",
      failure,
    );
  });

  it("does not hide a production Strapi runtime failure", async () => {
    const failure = new Error("Strapi unavailable");
    const strapiRepository = createRepository({
      getAll: async () => {
        throw failure;
      },
    });

    const repository = getServiceRepository({
      strapiUrl: "http://127.0.0.1:1337",
      nodeEnv: "production",
      createStrapiRepository: () => strapiRepository,
      createLocalRepository: () => createRepository(),
    });

    await expect(repository.getAll()).rejects.toBe(failure);
  });

  it("requests published content outside development and test", () => {
    const createStrapiRepository = vi.fn(() => createRepository());

    getServiceRepository({
      strapiUrl: "http://127.0.0.1:1337",
      nodeEnv: "production",
      createStrapiRepository,
    });

    expect(createStrapiRepository).toHaveBeenCalledWith(
      "http://127.0.0.1:1337",
      "published",
    );
  });

  it("rejects a missing STRAPI_URL outside development", () => {
    expect(() =>
      getServiceRepository({
        strapiUrl: "",
        nodeEnv: "production",
      }),
    ).toThrow("STRAPI_URL must be configured outside development");
  });
});
