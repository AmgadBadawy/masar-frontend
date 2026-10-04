import { categories } from "@/data/categories";
import { services } from "@/data/services";

import type { Service, ServiceCategory } from "@/types/service";

import type { ServiceRepository } from "./service-repository";

export class LocalServiceRepository implements ServiceRepository {
  async getAll(): Promise<Service[]> {
    return services;
  }

  async getBySlug(slug: string): Promise<Service | undefined> {
    return services.find((service) => service.slug === slug);
  }

  async getByCategory(categorySlug: string): Promise<Service[]> {
    return services.filter((service) => service.category.slug === categorySlug);
  }

  async getCategories(): Promise<ServiceCategory[]> {
    return categories;
  }

  async getCategoryBySlug(slug: string): Promise<ServiceCategory | undefined> {
    return categories.find((category) => category.slug === slug);
  }
}
