import { cache } from "react";

import { getServiceRepository } from "./service-repository-factory";

const getRequestRepository = cache(() => getServiceRepository());

export const getCachedCategories = cache(async () => {
  return getRequestRepository().getCategories();
});

export const getCachedCategoryBySlug = cache(async (slug: string) => {
  return getRequestRepository().getCategoryBySlug(slug);
});

export const getCachedServices = cache(async () => {
  return getRequestRepository().getAll();
});

export const getCachedServiceBySlug = cache(async (slug: string) => {
  return getRequestRepository().getBySlug(slug);
});

export const getCachedServicesByCategory = cache(async (categorySlug: string) => {
  return getRequestRepository().getByCategory(categorySlug);
});
