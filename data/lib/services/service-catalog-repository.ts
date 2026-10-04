import type { ServiceRepository } from "./service-repository";

/**
 * Backwards-compatible name for the repository contract introduced during the
 * Strapi migration. New code uses ServiceRepository directly.
 */
export type ServiceCatalogRepository = ServiceRepository;
