import type {
  Service,
  ServiceCategory,
  ServiceDocument,
  ServiceStep,
} from "@/types/service";

type StrapiRecord = Record<string, unknown>;

const OFFICIAL_SOURCE_HOSTS = new Set([
  "www.khadamatmisr.gov.eg",
  "khadamatmisr.gov.eg",
]);

export class StrapiDataMappingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "StrapiDataMappingError";
  }
}

function asRecord(value: unknown, field: string): StrapiRecord {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new StrapiDataMappingError(`Strapi field "${field}" must be an object.`);
  }

  return value as StrapiRecord;
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new StrapiDataMappingError(
      `Strapi field "${field}" must be a non-empty string.`,
    );
  }

  return value;
}

function optionalString(value: unknown, field: string): string | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new StrapiDataMappingError(`Strapi field "${field}" must be a string.`);
  }

  return value;
}

function requiredArray(value: unknown, field: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new StrapiDataMappingError(`Strapi field "${field}" must be an array.`);
  }

  return value;
}

function mapDocument(value: unknown, index: number): ServiceDocument {
  const document = asRecord(value, `documents[${index}]`);
  const description = optionalString(
    document.description,
    `documents[${index}].description`,
  );

  return {
    name: requiredString(document.name, `documents[${index}].name`),
    ...(description !== undefined && { description }),
  };
}

function mapStep(value: unknown, index: number): ServiceStep {
  const step = asRecord(value, `steps[${index}]`);

  if (typeof step.order !== "number" || !Number.isInteger(step.order)) {
    throw new StrapiDataMappingError(
      `Strapi field "steps[${index}].order" must be an integer.`,
    );
  }

  return {
    order: step.order,
    title: requiredString(step.title, `steps[${index}].title`),
    description: requiredString(step.description, `steps[${index}].description`),
  };
}

function mapVerification(value: unknown): Service["verification"] {
  const verification = asRecord(value, "verification");
  const verifiedAt = requiredString(verification.verifiedAt, "verification.verifiedAt");

  if (Number.isNaN(Date.parse(`${verifiedAt}T00:00:00Z`))) {
    throw new StrapiDataMappingError(
      'Strapi field "verification.verifiedAt" must be a valid date.',
    );
  }

  const url = requiredString(verification.sourceUrl, "verification.sourceUrl");

  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.protocol !== "https:"
      || !OFFICIAL_SOURCE_HOSTS.has(parsedUrl.hostname)
      || !/^\/node\/\d+$/.test(parsedUrl.pathname)
    ) throw new Error("Unsupported official source");
  } catch {
    throw new StrapiDataMappingError(
      'Strapi field "verification.sourceUrl" must be an HTTPS Khadamat Misr service URL.',
    );
  }

  return {
    verifiedAt,
    source: {
      title: requiredString(verification.sourceTitle, "verification.sourceTitle"),
      url,
    },
  };
}

export function mapStrapiCategory(value: unknown): ServiceCategory {
  const category = asRecord(value, "category");
  const description = optionalString(category.description, "category.description");

  return {
    slug: requiredString(category.slug, "category.slug"),
    name: requiredString(category.name, "category.name"),
    ...(description !== undefined && { description }),
  };
}

export function mapStrapiService(value: unknown): Service {
  const service = asRecord(value, "service");
  const summary = optionalString(service.summary, "service.summary");
  const authority = optionalString(service.authority, "service.authority");
  const fees = optionalString(service.fees, "service.fees");
  const expectedTime = optionalString(service.expectedTime, "service.expectedTime");
  const onlineAvailability = optionalString(
    service.onlineAvailability,
    "service.onlineAvailability",
  );

  return {
    slug: requiredString(service.slug, "service.slug"),
    title: requiredString(service.title, "service.title"),
    category: mapStrapiCategory(service.category),
    documents: requiredArray(service.documents, "service.documents").map(mapDocument),
    steps: requiredArray(service.steps, "service.steps").map(mapStep),
    verification: mapVerification(service.verification),
    ...(summary !== undefined && { summary }),
    ...(authority !== undefined && { authority }),
    ...(fees !== undefined && { fees }),
    ...(expectedTime !== undefined && { expectedTime }),
    ...(onlineAvailability !== undefined && { onlineAvailability }),
  };
}
