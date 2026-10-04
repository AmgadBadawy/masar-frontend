import type { Service, ServiceCategory } from "@/types/service";

import { env } from "node:process";

import type { ServiceRepository } from "./service-repository";
import {
  mapStrapiCategory,
  mapStrapiService,
  StrapiDataMappingError,
} from "./strapi-service-mapper";

type Fetcher = (input: string, init?: RequestInit) => Promise<Response>;

type StrapiCollectionResponse = {
  data: unknown;
};

type StrapiRequestInit = RequestInit & {
  next?: {
    revalidate: number;
  };
};

export type StrapiPublicationStatus = "draft" | "published";

export class StrapiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly url: string,
  ) {
    super(message);
    this.name = "StrapiRequestError";
  }
}

export type StrapiServiceRepositoryOptions = {
  baseUrl?: string;
  fetcher?: Fetcher;
  publicationStatus?: StrapiPublicationStatus;
};

const SERVICE_POPULATE =
  "populate[category][fields][0]=slug&populate[category][fields][1]=name&populate[category][fields][2]=description&populate[documents]=true&populate[steps]=true&populate[verification]=true";

const CATALOGUE_REVALIDATE_SECONDS = 300;

export class StrapiServiceRepository implements ServiceRepository {
  private readonly baseUrl: string;
  private readonly fetcher: Fetcher;
  private readonly publicationStatus: StrapiPublicationStatus;

  constructor({
    baseUrl = env.STRAPI_URL,
    fetcher = fetch,
    publicationStatus = env.NODE_ENV === "development" || env.NODE_ENV === "test"
      ? "draft"
      : "published",
  }: StrapiServiceRepositoryOptions = {}) {
    if (!baseUrl) {
      throw new Error(
        "StrapiServiceRepository requires STRAPI_URL or an explicit baseUrl.",
      );
    }

    this.baseUrl = baseUrl.replace(/\/$/, "");
    this.fetcher = fetcher;
    this.publicationStatus = publicationStatus;
  }

  async getAll(): Promise<Service[]> {
    const data = await this.getPaginatedCollection(
      `/api/services?status=${this.publicationStatus}&${SERVICE_POPULATE}`,
    );

    return data.map(mapStrapiService);
  }

  async getBySlug(slug: string): Promise<Service | undefined> {
    const data = await this.getCollection(
      `/api/services?status=${this.publicationStatus}&${SERVICE_POPULATE}&filters[slug][$eq]=${encodeURIComponent(slug)}`,
    );

    if (data.length === 0) {
      return undefined;
    }

    if (data.length > 1) {
      throw new StrapiDataMappingError(
        `Strapi returned multiple services for unique slug "${slug}".`,
      );
    }

    return mapStrapiService(data[0]);
  }

  async getCategories(): Promise<ServiceCategory[]> {
    const data = await this.getPaginatedCollection(
      `/api/categories?status=${this.publicationStatus}&fields[0]=slug&fields[1]=name&fields[2]=description`,
    );

    return data.map(mapStrapiCategory);
  }

  async getByCategory(categorySlug: string): Promise<Service[]> {
    const data = await this.getPaginatedCollection(
      `/api/services?status=${this.publicationStatus}&${SERVICE_POPULATE}&filters[category][slug][$eq]=${encodeURIComponent(categorySlug)}`,
    );

    return data.map(mapStrapiService);
  }

  async getCategoryBySlug(slug: string): Promise<ServiceCategory | undefined> {
    const data = await this.getCollection(
      `/api/categories?status=${this.publicationStatus}&fields[0]=slug&fields[1]=name&fields[2]=description&filters[slug][$eq]=${encodeURIComponent(slug)}`,
    );

    if (data.length === 0) {
      return undefined;
    }

    if (data.length > 1) {
      throw new StrapiDataMappingError(
        `Strapi returned multiple categories for unique slug "${slug}".`,
      );
    }

    return mapStrapiCategory(data[0]);
  }

  private getRequestInit(): StrapiRequestInit {
    const headers = { Accept: "application/json" };

    if (this.publicationStatus === "draft") {
      return {
        headers,
        cache: "no-store",
      };
    }

    return {
      headers,
      next: {
        revalidate: CATALOGUE_REVALIDATE_SECONDS,
      },
    };
  }

  private async getCollection(path: string): Promise<unknown[]> {
    const url = `${this.baseUrl}${path}`;
    let response: Response;

    try {
      response = await this.fetcher(url, this.getRequestInit());
    } catch (error) {
      const detail = error instanceof Error ? `: ${error.message}` : "";
      throw new StrapiRequestError(
        `Unable to reach Strapi at ${url}${detail}`,
        0,
        url,
      );
    }

    if (!response.ok) {
      const detail = await response.text();
      throw new StrapiRequestError(
        `Strapi request to ${url} failed with HTTP ${response.status}${detail ? `: ${detail}` : ""}`,
        response.status,
        url,
      );
    }

    let payload: unknown;

    try {
      payload = await response.json();
    } catch {
      throw new StrapiRequestError(
        `Strapi request to ${url} returned invalid JSON.`,
        response.status,
        url,
      );
    }

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      throw new StrapiDataMappingError(
        `Strapi response from ${url} must be an object with a data array.`,
      );
    }

    const { data } = payload as StrapiCollectionResponse;

    if (!Array.isArray(data)) {
      throw new StrapiDataMappingError(
        `Strapi response from ${url} must contain a data array.`,
      );
    }

    return data;
  }

  private async getPaginatedCollection(path: string): Promise<unknown[]> {
    const pageSize = 100;
    const all: unknown[] = [];

    for (let page = 1; ; page += 1) {
      const pageData = await this.getCollection(
        `${path}&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      );
      all.push(...pageData);

      if (pageData.length < pageSize) return all;
    }
  }
}
