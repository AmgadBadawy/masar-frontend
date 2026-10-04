# MASAR — Master Project Context & Handoff

> Canonical handoff for continuing the Masar project in a new ChatGPT conversation. Upload this file first. Treat it as the source of truth unless the user provides newer code/state.

## 1) Working relationship and learning style

The user is a Frontend Developer / CS graduate in Egypt. They understand Frontend fundamentals but consider their practical experience limited.

They want to build Masar **step by step from scratch**, with explanations of:
- what we are doing
- why we are doing it now
- why a technology/file/architecture decision is appropriate
- how the change connects to the rest of the project

They do not want a huge finished solution dumped without explanation.

They use **Codex on their computer** and currently want to continue with **Codex only** for implementation. Do not confuse them by switching coding agents/models.

For every coding task, recommend Codex effort:
- **Light** — simple/mechanical changes
- **Medium** — normal implementation, UI, documentation
- **Hard** — architecture, state, data fetching, forms, complex debugging
- **Extra Hard** — deep/ambiguous/high-risk reasoning

Preferred communication: Egyptian Arabic, direct, structured, practical, production-oriented.

---

# 2) Product identity

## Name

**Masar — مسار**

Working name; final brand/name validation can happen later.

## Core idea

Masar is an Arabic-first web platform that helps Egyptian users understand how to complete government procedures through clear, structured paths.

Example:
> "عايز أطلع بطاقة بدل فاقد"

Masar should explain, when officially verified:
- what the service is
- required documents
- responsible authority
- steps
- fees
- expected time
- online availability
- official source
- last verification date

Masar is a **guidance/navigation layer**, not the government service itself. Users are sent to the official service/source rather than completing the transaction inside Masar.

Core principle:
> **Organize first. Intelligence later.**

---

# 3) Product principles

1. Accuracy before feature count.
2. Never invent government requirements or service details.
3. Official source + verification date are core trust signals.
4. Arabic-first / RTL-native.
5. Mobile-first.
6. Clear, calm, modern UI.
7. Deterministic search before AI.
8. Avoid over-engineering the MVP.
9. Portfolio quality should come from engineering quality, not unnecessary technology.
10. Masar should look like a modern product, not a heavy government portal.

Avoid visual clichés such as dominant seals, eagles, flags, or bureaucratic decoration.

---

# 4) MVP scope

## In scope

- Home page
- Browse/discover services
- Arabic search
- Category/filter discovery where needed
- Service detail page
- Step-by-step guidance
- Official source / trust section
- Last verified date
- Responsive layout
- Accessibility basics
- SEO basics
- Loading / error / empty states where relevant
- Focused testing of critical flows

## Out of scope for MVP

Do not add prematurely:
- AI assistant
- AI-generated answers
- Semantic search / embeddings
- Vector database
- RAG
- GitHub integration
- Realtime
- Maps
- Chat
- Notifications
- Payments
- Social features
- Team collaboration
- Mobile app
- Complex RBAC
- Microservices
- Advanced analytics

---

# 5) Product / UX decisions already made

The UX/IA work established:
- MVP uses a small curated service catalogue.
- Service detail is the central experience.
- Search should be deterministic and Arabic-aware.
- Official sources and verification dates are part of the information model and UX.
- Users should be directed toward the official service rather than transacting inside Masar.
- No user accounts/authentication in the MVP.
- No AI answers in the MVP.
- No chat, payments, maps, notifications, or social feed.

Important conceptual user flow:
```text
Discover / Search
      ↓
Service
      ↓
Understand requirements
      ↓
Understand steps
      ↓
Check official source
      ↓
Go to official service
```

---

# 6) Brand / visual direction

Documented in `docs/BRAND_DIRECTION.md`.

Direction:
- calm
- trustworthy
- modern
- clear
- not overly governmental

Visual base:
- deep teal primary
- soft neutral surfaces/backgrounds
- restrained copper accent
- clear borders
- minimal shadows
- readable content widths
- strong hierarchy

Typography:
- Arabic: IBM Plex Sans Arabic
- Latin conceptually: Inter

Accessibility/interaction direction:
- semantic HTML
- keyboard navigation
- visible focus states
- proper labels
- reduced-motion support
- clear hover/focus states

---

# 7) Documentation already completed

The project documentation foundation exists and should not be recreated from scratch.

Known docs:
```text
docs/PRODUCT.md
docs/MVP_SCOPE.md
docs/DECISIONS.md
docs/USER_PERSONA.md
docs/JOBS_TO_BE_DONE.md
docs/VALUE_PROPOSITION.md
docs/INFORMATION_ARCHITECTURE.md
docs/USER_FLOWS.md
docs/BRAND_DIRECTION.md
docs/TECHNICAL_ARCHITECTURE.md
```

These cover product definition, scope, decisions, personas, JTBD, value proposition, IA, flows, brand direction, and technical architecture.

---

# 8) Roadmap

```text
0. Problem Discovery                 ✅
1. Product Definition               ✅
2. UX / IA                          ✅
3. Brand Direction                  ✅
4. Technical Architecture           ✅
5. Frontend Foundation              ✅
6. Design / CSS Foundation          ✅
7. Data Model + Local Catalogue     ✅ core
8. Home Page                        ✅
9. Search                           ⏳ continue from actual local state
10. Service Details                 partly/possibly ✅ — verify local code
11. States / Accessibility / SEO    partly ✅ — verify local code
12. Testing                         ⏳
13. Strapi Integration               ⏳
14. Deployment                       ⏳
15. Portfolio Case Study             ⏳
```

Do not blindly trust the stage labels above. Verify current files before changing anything because later work may already exist locally.

---

# 9) Technical architecture decisions

## Core stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS

## Current data approach

Start with a small local TypeScript catalogue.

UI/data access should be separated through a repository abstraction so a future Strapi backend can replace the source without rewriting the UI.

Target conceptual architecture:
```text
UI
 ↓
Repository / data access
 ↓
Local TypeScript data  (now)
        OR
Strapi                   (later)
 ↓
PostgreSQL              (later)
```

## Search architecture

Intended first implementation:
- deterministic
- Arabic-normalized
- local catalogue
- search title/summary/category/authority and approved aliases when aliases exist
- URL query represents submitted search state
- no AI
- no external search engine
- no vector database

## State

- URL state for submitted search/filter state
- local component state for transient UI
- no global store unless a real requirement appears

## Deferred dependencies

Do not install just because they may be useful later:
```text
TanStack Query
React Hook Form
Zod
Zustand
Vitest
React Testing Library
Playwright
Strapi tooling
PostgreSQL tooling
AI SDKs
Vector DB / embeddings
```

---

# 10) Next.js foundation — completed

Known versions during foundation:
- Next.js `16.3.5`
- React `19.3.0`
- TypeScript lockfile `6.0.3`
- ESLint `9.39.5`
- Tailwind CSS `4.3.3`
- `@tailwindcss/postcss` `4.3.3`

A TypeScript compatibility issue occurred with the newest TypeScript release and Next's TypeScript ESLint integration. The project pinned the latest compatible TypeScript 6 release instead of weakening linting.

Validation passed:
```bash
npm run lint
npm run build
```

---

# 11) Git note

Git was initialized.

Historical state included:
- branch `master`
- repository initially had no commits
- Windows Git ownership mismatch because `.git` was owned by another user context

A command-scoped status workaround was used:
```bash
git -c safe.directory=D:/Portfolio-Projects/Masar status
```

Do not blindly change global Git safety configuration. Verify the current state first.

---

# 12) Current CSS / design tokens

The user manually replaced `app/globals.css` with this foundation:

```css
@import "tailwindcss";

:root {
  --font-sans: var(--font-ibm-plex-sans-arabic), Arial, sans-serif;

  --color-primary: #0f5c5e;
  --color-primary-foreground: #ffffff;
  --color-background: #f8faf9;
  --color-surface: #ffffff;
  --color-surface-muted: #f1f5f4;
  --color-text: #172426;
  --color-text-muted: #5f7072;
  --color-border: #d9e2e1;
  --color-accent: #b9824b;
  --color-success: #237a57;
  --color-warning: #9a6a16;
  --color-error: #b54747;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --radius-lg: 1rem;
}

* {
  box-sizing: border-box;
}

html {
  min-height: 100%;
}

body {
  min-height: 100vh;
  margin: 0;
  background: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.75;
  text-rendering: optimizeLegibility;
}

:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}

::selection {
  background: var(--color-primary);
  color: var(--color-primary-foreground);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

After this change, lint and build passed.

---

# 13) Data model — completed core

## `types/service.ts`

```ts
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
  summary: string;

  category: ServiceCategory;
  authority: string;

  documents: ServiceDocument[];
  steps: ServiceStep[];

  fees?: string;
  expectedTime?: string;
  onlineAvailability?: string;

  verification: Verification;
};
```

## `data/categories.ts`

```ts
import type { ServiceCategory } from "@/types/service";

export const categories: ServiceCategory[] = [
  {
    slug: "civil-status",
    name: "الأحوال المدنية",
    description: "خدمات ووثائق الأحوال المدنية.",
  },
  {
    slug: "documents",
    name: "المستندات والوثائق",
    description: "خدمات مرتبطة بالمستندات الرسمية.",
  },
  {
    slug: "transport",
    name: "النقل والمرور",
    description: "خدمات مرتبطة بالنقل والمرور.",
  },
];
```

These are explicitly development categories, not final verified taxonomy.

## `data/services.ts`

Current known development catalogue contains fake sample content. Do not present it as real government information.

```ts
import type { Service } from "@/types/service";
import { categories } from "./categories";

const civilStatusCategory = categories.find(
  (category) => category.slug === "civil-status",
);

const documentsCategory = categories.find(
  (category) => category.slug === "documents",
);

if (!civilStatusCategory || !documentsCategory) {
  throw new Error("Required development categories are missing.");
}

export const services: Service[] = [
  {
    slug: "sample-national-id-replacement",
    title: "نموذج: استخراج بطاقة شخصية بدل فاقد",
    summary:
      "بيانات تجريبية لتوضيح شكل خدمة داخل منصة مسار أثناء مرحلة التطوير.",
    category: civilStatusCategory,
    authority: "جهة حكومية تجريبية",
    documents: [
      {
        name: "مستند تجريبي",
        description: "هذا المستند تجريبي وليس متطلبًا حكوميًا حقيقيًا.",
      },
    ],
    steps: [
      {
        order: 1,
        title: "الخطوة التجريبية الأولى",
        description: "بيانات تجريبية لشرح شكل خطوات الخدمة.",
      },
      {
        order: 2,
        title: "الخطوة التجريبية الثانية",
        description: "بيانات تجريبية لشرح تسلسل خطوات الخدمة.",
      },
    ],
    verification: {
      verifiedAt: "2026-09-20",
      source: {
        title: "مصدر تجريبي",
        url: "https://example.com",
      },
    },
  },
  {
    slug: "sample-document-request",
    title: "نموذج: طلب مستند رسمي",
    summary:
      "بيانات تجريبية لتوضيح خدمة أخرى داخل الكتالوج المحلي.",
    authority: "جهة حكومية تجريبية",
    documents: [],
    steps: [
      {
        order: 1,
        title: "بدء الطلب",
        description: "بيانات تجريبية فقط.",
      },
    ],
    verification: {
      verifiedAt: "2026-09-20",
      source: {
        title: "مصدر تجريبي",
        url: "https://example.com",
      },
    },
  },
];
```

Important: the second service belongs to `documents` in the known implementation, but the snippet above intentionally reflects only the known fields; verify the actual current file before editing.

---

# 14) Repository path — IMPORTANT correction

A previous assistant incorrectly assumed repository files lived under `lib/services/`.

The user explicitly corrected this.

**Actual current path:**
```text
data/lib/services/
├── service-repository.ts
└── local-service-repository.ts
```

Therefore this import is correct:
```ts
import { LocalServiceRepository } from "@/data/lib/services/local-service-repository";
```

Do not move the files merely to match an older document path.

The `@/*` alias maps from project root.

---

# 15) Repository abstraction — what is known / what must be verified

Original interface:
```ts
import type { Service, ServiceCategory } from "@/types/service";

export interface ServiceRepository {
  getAll(): Service[];
  getBySlug(slug: string): Service | undefined;
  getCategories(): ServiceCategory[];
}
```

Original local implementation:
```ts
import { categories } from "@/data/categories";
import { services } from "@/data/services";
import type { Service, ServiceCategory } from "@/types/service";
import type { ServiceRepository } from "./service-repository";

export class LocalServiceRepository implements ServiceRepository {
  getAll(): Service[] {
    return services;
  }

  getBySlug(slug: string): Service | undefined {
    return services.find((service) => service.slug === slug);
  }

  getCategories(): ServiceCategory[] {
    return categories;
  }
}
```

Later the user added `getByCategory()` and/or changed implementation details.

Therefore the exact current contents of:
```text
data/lib/services/service-repository.ts
data/lib/services/local-service-repository.ts
```
are **unknown in this handoff** and must be read from the user's current project before refactoring.

Do not overwrite them from the old snippet automatically.

---

# 16) TypeScript alias

Current alias:
```json
"paths": {
  "@/*": [
    "./*"
  ]
}
```

No `baseUrl` was intentionally added.

Use imports that reflect actual filesystem paths.

---

# 17) Home page — completed manually

The user explicitly chose to build the Home page manually rather than with Codex so they could learn UI construction directly.

Do not rebuild it from scratch unless asked.

Current component tree:
```text
components/
├── home/
│   ├── categories.tsx
│   ├── featured-services.tsx
│   ├── hero.tsx
│   ├── hero-image.tsx
│   └── trust-section.tsx
└── layout/
    ├── brand-logo.tsx
    ├── footer.tsx
    └── header.tsx
```

## `app/page.tsx`

```tsx
import { Categories } from "@/components/home/categories";
import { FeaturedServices } from "@/components/home/featured-services";
import { Hero } from "@/components/home/hero";
import { TrustSection } from "@/components/home/trust-section";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedServices />
      <TrustSection />
    </main>
  );
}
```

## Home structure
```text
Header
Hero
  ├── headline
  ├── description
  ├── search form
  └── hero image
Categories
Featured Services
Trust Section
Footer
```

---

# 18) Home component details

## `components/home/categories.tsx`

Current known behavior:
- renders categories from `data/categories`
- each card links to `/search?category=<slug>`
- has accessible section heading
- responsive grid
- keyboard/focus styles
- uses the design tokens

The current heading/copy includes:
- `استكشف حسب المجال`
- `ابدأ مسارك من المكان الصح`
- `كل الخدمات`

## `components/home/featured-services.tsx`

Current behavior:
```ts
const featuredServices = services.slice(0, 6);
```

Cards link to:
```text
/services/[slug]
```

There is currently no `featured` field. This is acceptable for development; do not add one unless needed.

## `components/home/hero.tsx`

Current concept:
- full/large hero image
- dark gradient overlay
- headline:
  `كل خدمة ليها طريق.`
  `مسار يوصّلك له.`
- search form submitting to `/search` with query param `q`
- secondary link to browse services

Search form is a normal GET form:
```html
<form action="/search" method="GET" role="search">
```

Input name is:
```text
q
```

## `components/home/hero-image.tsx`

Uses:
```tsx
<Image
  src="/images/Hero-image.webp"
  alt=""
  fill
  priority
  sizes="100vw"
  className="object-cover object-center"
/>
```

## `components/home/trust-section.tsx`

Three trust points:
- `خطوات واضحة`
- `مصادر رسمية`
- `معلومات مُراجعة`

The section emphasizes that Masar helps users understand the route and points them toward official sources.

---

# 19) Layout components

## `components/layout/brand-logo.tsx`

Known version:
```tsx
import Image from "next/image";

type BrandLogoProps = {
  priority?: boolean;
};

export function BrandLogo({ priority = false }: BrandLogoProps) {
  return (
    <div className="relative h-10 w-[150px] sm:h-12 sm:w-[180px]">
      <Image
        src="/brand/masar-logo.svg"
        alt="مسار"
        fill
        priority={priority}
        sizes="(min-width: 640px) 180px, 150px"
        className="object-contain object-right"
      />
    </div>
  );
}
```

## Header

Uses `<BrandLogo priority />` and navigation to:
- `/`
- `/search`

It is sticky, RTL-aware, and uses the defined visual tokens.

## Footer

Footer is globally rendered from `app/layout.tsx`.

It links to:
- `/`
- `/search`
- `/about`

It explicitly states that Masar is an informational guidance platform and not a government authority.

Do not add another Footer inside individual pages if it is already global.

---

# 20) SEO foundation

## `lib/seo.ts`

Known version:
```ts
import type { Metadata } from "next";

export const SITE_NAME = "مسار";

export const DEFAULT_DESCRIPTION =
  "دليل مبسّط للإجراءات الحكومية في مصر يساعدك تعرف الخدمة المناسبة والخطوات والمستندات المطلوبة.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type CreateSeoMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

export function createSeoMetadata({
  title,
  description,
  path,
  noIndex = false,
}: CreateSeoMetadataOptions): Metadata {
  return {
    title,
    description,

    ...(path && {
      alternates: {
        canonical: path,
      },
    }),

    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      locale: "ar_EG",
      type: "website",

      ...(path && {
        url: path,
      }),
    },

    robots: {
      index: !noIndex,
      follow: true,
    },
  };
}
```

## `.env`
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Development-only value.

## `app/layout.tsx`

Known configuration:
- `lang="ar"`
- `dir="rtl"`
- IBM Plex Sans Arabic through `next/font/google`
- global Header
- global Footer
- metadataBase based on `SITE_URL`
- title template for pages
- description
- robots
- Open Graph locale `ar_EG`
- favicon/reference to `/brand/masar-sympol.svg`

Do not add Footer again in pages.

---

# 21) Static assets currently referenced

Known references:
```text
public/brand/masar-logo.svg
public/brand/masar-sympol.svg
public/images/Hero-image.webp
```

Verify actual filesystem spelling/case before changing.

The favicon filename is currently written as `masar-sympol.svg` (note the spelling). Do not silently rename it.

---

# 22) Routes

Original technical architecture target:
```text
/
/search
/categories/[slug]
/services/[slug]
/about
```

Current `/` exists.

A `/services/[slug]` page was later built by the user.

Other pages, especially `/search` and `/categories/[slug]`, may now exist. Verify actual current local files before changing them.

---

# 23) Search status

Search was the next major roadmap stage.

Intended initial design:
```text
/search?q=...
```

Search fields may include:
- title
- summary
- category
- authority
- approved aliases

Arabic normalization should be deterministic.

A helper such as:
```text
lib/search/normalize-arabic.ts
```
was deliberately not created earlier because search implementation had not started at that point.

Later search code may already exist. **Check before creating duplicate utilities.**

---

# 24) Figma history

A Figma file named `Masar — MVP Design` was created previously.

The Figma integration then became blocked by tool/seat/account issues. The project intentionally moved on without Figma.

Do not spend project time repairing Figma unless the user explicitly asks to revisit it.

---

# 25) Codex sandbox history

Codex repeatedly showed a Windows sandbox problem similar to:
```text
windows sandbox failed: helper_unknown_error: setup refresh had errors
```

This affected patch/edit operations. The machine was restarted and the issue persisted at times.

Some code was therefore implemented manually.

Current working rule:
- use Codex for implementation when available
- if editing is blocked, make small manual changes with explanations
- do not waste large amounts of usage trying to repair the integration

---

# 26) Current known repository / app state

At minimum, the project has these established pieces:
```text
app/layout.tsx
app/page.tsx
app/globals.css
components/home/*
components/layout/*
data/categories.ts
data/services.ts
data/lib/services/*
lib/seo.ts
types/service.ts
docs/*
public/brand/*
public/images/*
.env
package.json
tsconfig.json
```

However, current local code may now contain additional routes/utilities introduced after this context was captured.

**Never overwrite current files based only on this document when the exact file contents are marked as unknown.**

---

# 27) What to verify first in a new chat

Before implementation, verify the current local project state, especially:

1. Current file tree.
2. `git status`.
3. `data/lib/services/service-repository.ts`.
4. `data/lib/services/local-service-repository.ts`.
5. `app/search/page.tsx` if present.
6. `app/services/[slug]/page.tsx` if present.
7. Any search utility already present.
8. `package.json` only if dependency state is unclear.
9. Run/confirm:
   ```bash
   npm run lint
   npm run build
   ```
   at the appropriate checkpoint.

Then identify the **first actually incomplete feature**.

Do not restart from the roadmap beginning.

---

# 28) Suggested continuation path after verification

Most likely next progression:
```text
Search
 ↓
Service details
 ↓
Loading / error / empty states
 ↓
Accessibility + SEO audit
 ↓
Testing
 ↓
Verified production data
 ↓
Strapi integration
 ↓
Deployment
 ↓
Portfolio case study
```

But this ordering is subordinate to actual current code state.

---

# 29) Development data warning

The current service catalogue uses fake sample content and `https://example.com` for source URLs.

This is acceptable during development only.

Before a public/portfolio-quality release, replace sample service data with verified data from official government sources and implement a clear review/verification policy.

Never make the sample data look like real official requirements.

---

# 30) Final quality bar

Masar should eventually demonstrate:

### Product
- clear problem
- focused MVP
- useful discovery flow
- trustworthy service details

### UX
- mobile-first
- responsive
- accessible
- readable Arabic UI
- clear empty/error/loading states

### Engineering
- Next.js App Router
- React
- TypeScript
- Tailwind
- sensible component boundaries
- repository/data abstraction
- deterministic Arabic search
- test coverage for critical behavior
- later CMS integration
- successful production build and deployment

### Portfolio story

The project should read as a serious product/engineering case study, not merely a CRUD demo.

---

# 31) Golden rule for the next assistant

> **Preserve the architecture, verify the current code, then make the smallest correct next change.**

The user's goal is not just to have a working app. The goal is to learn how to build and ship a coherent, production-style frontend project from foundations to deployment.
