export type ServiceCategory = {
  slug: string;
  name: string;
  description?: string;
};

export type OfficialSource = {
  title: string;
  url: string;
};

export type Verification = {
  verifiedAt: string;
  source: OfficialSource;
};

export type ServiceDocument = {
  name: string;
  description?: string;
};

export type ServiceStep = {
  order: number;
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  title: string;
  summary?: string;

  category: ServiceCategory;
  authority?: string;

  documents: ServiceDocument[];
  steps: ServiceStep[];

  fees?: string;
  expectedTime?: string;
  onlineAvailability?: string;

  verification: Verification;
};
