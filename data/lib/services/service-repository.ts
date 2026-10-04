import type { Service, ServiceCategory } from "@/types/service";

export interface ServiceRepository {
  getAll(): Promise<Service[]>;

  getBySlug(slug: string): Promise<Service | undefined>;

  getByCategory(categorySlug: string): Promise<Service[]>;

  getCategories(): Promise<ServiceCategory[]>;

  getCategoryBySlug(slug: string): Promise<ServiceCategory | undefined>;
}
