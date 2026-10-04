import { env } from "node:process";

import { LocalServiceRepository } from "./local-service-repository";
import type { ServiceRepository } from "./service-repository";
import {
  StrapiServiceRepository,
  type StrapiPublicationStatus,
} from "./strapi-service-repository";

type FallbackReporter = (message: string, error?: unknown) => void;

class DevelopmentFallbackServiceRepository implements ServiceRepository {
  constructor(
    private readonly primary: ServiceRepository,
    private readonly fallback: ServiceRepository,
    private readonly reportFallback: FallbackReporter,
  ) {}

  getAll() {
    return this.useFallback("get all services", () => this.primary.getAll(), () =>
      this.fallback.getAll(),
    );
  }

  getBySlug(slug: string) {
    return this.useFallback(
      `get service "${slug}"`,
      () => this.primary.getBySlug(slug),
      () => this.fallback.getBySlug(slug),
    );
  }

  getByCategory(categorySlug: string) {
    return this.useFallback(
      `get services in category "${categorySlug}"`,
      () => this.primary.getByCategory(categorySlug),
      () => this.fallback.getByCategory(categorySlug),
    );
  }

  getCategories() {
    return this.useFallback(
      "get categories",
      () => this.primary.getCategories(),
      () => this.fallback.getCategories(),
    );
  }

  getCategoryBySlug(slug: string) {
    return this.useFallback(
      `get category "${slug}"`,
      () => this.primary.getCategoryBySlug(slug),
      () => this.fallback.getCategoryBySlug(slug),
    );
  }

  private async useFallback<T>(
    operation: string,
    primary: () => Promise<T>,
    fallback: () => Promise<T>,
  ): Promise<T> {
    try {
      return await primary();
    } catch (error) {
      this.reportFallback(
        `Strapi failed to ${operation}; using the local development catalogue instead.`,
        error,
      );
      return fallback();
    }
  }
}

export type ServiceRepositoryFactoryOptions = {
  strapiUrl?: string;
  nodeEnv?: string;
  createLocalRepository?: () => ServiceRepository;
  createStrapiRepository?: (
    baseUrl: string,
    publicationStatus: StrapiPublicationStatus,
  ) => ServiceRepository;
  reportFallback?: FallbackReporter;
};

/**
 * Selects the server-side catalogue source in one place.
 *
 * Production always surfaces Strapi configuration and request failures. Local
 * data is only an explicit fallback for development/test work.
 */
export function getServiceRepository({
  strapiUrl = env.STRAPI_URL,
  nodeEnv = env.NODE_ENV,
  createLocalRepository = () => new LocalServiceRepository(),
  createStrapiRepository = (baseUrl, publicationStatus) =>
    new StrapiServiceRepository({ baseUrl, publicationStatus }),
  reportFallback = console.warn,
}: ServiceRepositoryFactoryOptions = {}): ServiceRepository {
  const isDevelopment = nodeEnv === "development" || nodeEnv === "test";

  if (!strapiUrl) {
    if (!isDevelopment) {
      throw new Error(
        "STRAPI_URL must be configured outside development to load the Masar catalogue.",
      );
    }

    reportFallback(
      "STRAPI_URL is not configured; using the local development catalogue.",
    );
    return createLocalRepository();
  }

  const strapiRepository = createStrapiRepository(
    strapiUrl,
    isDevelopment ? "draft" : "published",
  );

  if (!isDevelopment) {
    return strapiRepository;
  }

  return new DevelopmentFallbackServiceRepository(
    strapiRepository,
    createLocalRepository(),
    reportFallback,
  );
}
