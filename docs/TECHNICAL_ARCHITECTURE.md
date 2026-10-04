# Technical architecture

## Purpose and scope

This is the implementation plan for Masar's MVP, not implementation. Masar is an Arabic-first, public guidance and navigation layer for a small, curated catalogue of Egyptian government procedures. It helps a person find a supported procedure, prepare using source-backed information, and continue to the responsible authority's official site.

The MVP deliberately has no accounts, submissions, payments, tracking, chat, AI answers, notifications, maps, or user-generated content. It is a content-focused web application, so a small monolith is the right starting point.

## Recommended system shape

```text
Browser
  ↓
Next.js application
  ├─ App Router pages and server-rendered service content
  ├─ reusable UI components
  └─ data-access interface
       ├─ local curated data (MVP first)
       └─ Strapi adapter (later, same interface)
             ↓
           Strapi + PostgreSQL (later)
```

There are no microservices and no separate backend for the first release. Next.js owns rendering, metadata, route handling, and the data-access boundary. A future Strapi instance owns editorial content; PostgreSQL is its persistence store. The public UI must consume Masar domain objects, never raw CMS responses.

## Technology decisions

| Technology | Recommendation | MVP status | Why |
| --- | --- | --- | --- |
| Next.js App Router | Use | Add when implementation begins | Server-rendered public pages, file-based routes, metadata, and a straightforward path to static generation. |
| React | Use through Next.js | Add when implementation begins | Component-based UI is appropriate for the repeated cards, content sections, and states. |
| TypeScript | Use | Add when implementation begins | Protects the source/verification contract and makes a later CMS adapter safer. |
| Tailwind CSS | Use | Add when implementation begins | Fits the small token-driven interface and responsive RTL layout without a large custom styling layer. |
| Local TypeScript data | Use first | Add with the first UI | A small curated catalogue needs no CMS or network request to prove the user journey. |
| Strapi | Defer | Add when non-developers need to edit/publish content or the catalogue grows | Provides editorial workflow and API delivery; it is unnecessary before content operations exist. |
| PostgreSQL | Defer with Strapi | Add with Strapi | Reliable relational persistence for services, sources, categories, and verification history. It is not needed for local curated data. |
| Vercel | Preferred later | Add at deployment | Natural hosting for a Next.js public site; use its normal build and caching model. |
| TanStack Query | Defer | Do not add for local/server-rendered content | It solves client-side remote-cache synchronization. Initial search can run against already-loaded local data, and service pages are server-rendered. Reconsider only for client-driven CMS queries or interactive cache/refetch needs. |
| React Hook Form | Defer | Do not add initially | The MVP search has one field and no complex validation. Native form handling is simpler. |
| Zod | Defer until an external boundary exists | Add with Strapi adapter or forms that need validation | Validate CMS data at the adapter boundary and any future complex user input. Avoid it while there is no runtime input/API. |
| Zustand | Do not use | Not planned for MVP | Search query belongs in the URL; transient input, menu, and feedback state belong locally. No shared client store is justified. |
| Vitest + React Testing Library | Use when implementation begins | Add with the first logic/components | Fast tests for normalization, search, adapters, and accessible UI behavior. |
| Playwright (or equivalent) | Defer until core flows exist | Add after the first working journey | A small end-to-end suite should protect search and official-link handoff. |

## Frontend boundaries and folder structure

Use a compact feature-oriented layout. `app` owns routing and composition; components are shared only when genuinely reusable. Do not create a generic design-system package.

```text
app/
  layout.tsx                 # Arabic document shell, global metadata, RTL direction
  page.tsx                   # Home
  search/page.tsx            # Query-driven result list
  categories/[slug]/page.tsx # Category list
  services/[slug]/page.tsx   # Service detail + service metadata
  about/page.tsx             # Guidance role and trust explanation
  not-found.tsx
  error.tsx
  loading.tsx

components/
  ui/                        # Button, EmptyState, LoadingState, ErrorState
  layout/                    # Header, Footer, Container
  services/                  # ServiceCard, ServiceList, RequiredDocuments, ProcedureSteps,
                             # VerificationBlock, AvailabilityDetails
  search/                    # SearchInput
  navigation/                # Breadcrumb, CategoryCard

data/
  services.ts                # Curated local records only
  categories.ts

lib/
  services/                  # ServiceRepository interface, local adapter, later Strapi adapter
  search/                    # normalizeArabic and searchServices
  external-links.ts          # safe official-link helper
  seo.ts                     # metadata helpers

types/
  service.ts                 # Masar domain types, independent of Strapi

styles/
  globals.css                # Tailwind entry/global RTL-safe defaults only
```

Keep page-specific composition in `app` or the relevant feature folder. Keep `Header`, `Button`, status states, search input, cards, breadcrumb, and verification display reusable. `ProcedureSteps` and `RequiredDocuments` are service-domain components, not generic list abstractions.

## Routes and rendering

| Route | Purpose | Data/rendering |
| --- | --- | --- |
| `/` | Explain Masar, start search, browse categories | Static/server-rendered. |
| `/search?q=…` | Display query and matching supported services | Server-rendered from `q` for shareable/back-button-friendly results; a small client enhancement may update the field but URL remains canonical. |
| `/categories/[slug]` | Browse one topic category | Static/server-rendered. |
| `/services/[slug]` | Primary guidance page | Static/server-rendered with service-specific metadata. |
| `/about` | Explain Masar's guidance role and source basis | Static/server-rendered. |

The category route is included because it is part of the approved information architecture. Query state stays in `q`, not a client store. When returning from a service page, a contextual link may preserve `?from=search&q=…` or `?from=category&category=…`; browser history remains the primary back behavior.

## Conceptual content model

These are application concepts, not database tables or Strapi content types.

```text
Category 1 ─────── * GovernmentProcedure
GovernmentProcedure 1 ─────── * RequiredDocument
GovernmentProcedure 1 ─────── * ProcedureStep
GovernmentProcedure 1 ─────── * OfficialSource
GovernmentProcedure 1 ─────── 1 VerificationInfo
```

### Category

- `id`, `slug`, `name`, `description?`, `sortOrder`
- Topic-based grouping for browsing, never a claim about government organizational structure.

### GovernmentProcedure / Service

- `id`, `slug`, `title`, `plainLanguageSummary`, `categoryId`
- `responsibleAuthority`
- `searchAliases` (everyday Arabic phrases and alternative service names)
- `requiredDocuments`, `steps`, `officialSources`, `verification`
- `fees?`, `expectedDuration?`, `onlineService?`
- `optionalInfoNotes?` for an explicit published/unpublished state

`fees`, `expectedDuration`, and `onlineService` are optional because absence must mean “not officially published/available in Masar's verified content,” never zero, free, instant, or offline.

### RequiredDocument

- `id`, `label`, `details?`, `sortOrder`
- Only include a factual item if its source supports it. Do not add informal suggestions as requirements.

### ProcedureStep

- `id`, `title?`, `description`, `sortOrder`
- Ordered independently of display position so the sequence remains clear in RTL.

### OfficialSource

- `id`, `title`, `url`, `publisher?`, `sourceType` (`information` or `online-service`), `supports` (which service facts it supports)
- A service may have a source page and a different official transaction URL. Both must be clearly labeled external links.

### VerificationInfo

- `lastVerifiedAt`, `status` (`verified`, `needs-review`, `unavailable`), `notes?`
- The editorial workflow/cadence is intentionally open. The published UI only needs an honest status and date.

## Content trust rules in the UI

Every supported service displays a distinct `VerificationBlock` close to the factual guidance, containing official source title/link and the last verified date. If the status is `needs-review`, preserve the information only if editorial policy allows it, show a clear caution, and point to the official source. If status is `unavailable`, do not present factual procedure guidance as verified; use an honest unavailable/error-style message and the source only if one is known.

Optional facts use a consistent “لم تُنشر هذه المعلومة رسميًا” style message when the official source does not publish them. They are omitted from summaries rather than guessed. A link visually signals that the user leaves Masar; `target="_blank"` links use `rel="noopener noreferrer"`.

## MVP search

Start with a deterministic, client- or server-executable pure function over the local catalogue. For a small catalogue, server-side search from the `q` URL parameter is preferred: it avoids shipping the whole catalogue merely to search and keeps results shareable. The same pure function can later run inside the Strapi adapter/server data layer.

1. Trim the query and normalize safe Arabic presentation differences for matching (for example alef variants, tatweel, and diacritics); retain the original query for display.
2. Match normalized query tokens against service title, plain-language summary, category name, responsible authority, and approved `searchAliases`.
3. Rank exact title/alias matches ahead of token matches; keep the rule deterministic and documented.
4. Return only curated services. An empty query gets a search-empty prompt; a non-empty unmatched query gets a no-results prompt with category browsing and a revised-query suggestion.

Do not add Elasticsearch, Algolia, vectors, embeddings, or AI search. Revisit server-side CMS filtering/ranking only when catalogue size or measured search quality requires it.

## State, loading, empty, and errors

- **Local state:** search-input draft before submit, mobile-menu visibility, copied-link feedback, and other ephemeral UI controls.
- **URL state:** submitted search query and optional contextual origin. It is shareable and survives refresh.
- **Global state:** none in the MVP; Zustand is not needed.
- **Loading:** App Router `loading.tsx` renders a restrained structural skeleton for a route. A client control shows its own pending state only during direct interaction.
- **Empty:** distinguish no query from no matches. Explain the catalogue limitation without implying an unsupported service exists, and offer categories/revised wording.
- **Error:** `error.tsx` gives plain Arabic copy and retry/back-home actions. Never substitute unverified data after a fetch/content failure. `not-found.tsx` handles unknown slugs.

## Strapi integration without coupling the UI

Define a small repository contract in `lib/services`, for example: `listCategories`, `getCategoryBySlug`, `searchServices`, `getServiceBySlug`, and `getFeaturedServices`. Pages call this contract, not `data/` or `fetch` directly.

Initially, `localServiceRepository` maps curated TypeScript records to the domain types in `types/service.ts`. Later, `strapiServiceRepository` fetches Strapi on the server, validates/mapping its response to exactly the same domain types, and handles missing/invalid source fields conservatively. No component receives Strapi's `data/attributes` shape. Select the repository in one composition/configuration point, not throughout the UI.

When Strapi is introduced, keep its base URL/token server-only, fetch only public curated fields, and set an intentional revalidation policy. Service and category pages can use static generation/revalidation where publishing latency allows; a source correction can trigger revalidation through a secured, later-defined editorial process.

## SEO, RTL, accessibility, performance, and security

### SEO

Use the Next.js Metadata API. Each service page has a unique Arabic title, plain-language description, canonical `/services/[slug]`, and Arabic `lang` metadata. Generate sitemap entries once the catalogue is public. Do not add structured data that makes Masar appear to be the responsible government authority; add only reviewed, accurate structured data later.

### RTL and accessibility

Set `<html lang="ar" dir="rtl">` at the document root. Use CSS logical properties (`padding-inline`, `margin-inline`, `text-align: start`) rather than left/right rules. Mirror directional chevrons and back navigation; keep URLs, external-link glyphs, dates, and numbers readable with deliberate `dir`/`bdi` handling. Use semantic landmarks, one logical heading hierarchy, labels for inputs, visible keyboard focus, native buttons/links, 44×44 px touch targets, and WCAG 2.2 AA contrast validation. Source/verification/error meaning must never depend on color alone.

### Performance

Prefer Server Components. Make only interactive controls Client Components. Avoid a client data cache, large UI kit, decorative media, and unneeded JavaScript. Use `next/image` only for real, meaningful raster content; this MVP can avoid imagery altogether. Local data makes initial pages static; Strapi pages later receive explicit cache/revalidation settings rather than defaulting to frequent client fetches.

### Security

There is no user-generated content, authentication, payment data, or user profile data in the MVP. Keep CMS tokens and any revalidation secret in server-only environment variables; never prefix secrets with `NEXT_PUBLIC_`. Render editorial text as React text, not unsanitized HTML. Validate/allow-list external source URLs to `https`, display their destination clearly, and use safe external-link attributes. Keep Strapi administrative credentials out of the frontend and do not expose private CMS fields.

## Testing strategy

Start with the highest-risk trust and navigation behavior rather than broad coverage.

| Level | First tests | When |
| --- | --- | --- |
| Unit | Arabic normalization/ranking, optional-information handling, repository mapping, external-link validation | With corresponding utilities/adapters |
| Component | Search input labels/submit behavior, service card scanning content, verification block, required-document/step lists, empty/error messaging | With each shared component |
| Integration | `/search?q` result/no-result behavior, service-page source/date rendering, category-to-service navigation | Once routes exist |
| End-to-end | Search → service detail → official source handoff; category → service; unsupported query recovery | After the core journey stabilizes |

Use Vitest and React Testing Library for unit/component tests. Add a small Playwright suite later; it should protect key journeys, not reproduce every unit test.

## Implementation sequence

1. Create the typed domain model and a small source-backed local catalogue.
2. Implement the repository interface and local adapter.
3. Build shared shell/search/card/trust/status components, then routes in the approved information architecture.
4. Add unit and component tests for search and trust UI, then route/integration tests.
5. Validate RTL, keyboard, contrast, mobile layout, metadata, and external-link behavior.
6. Introduce Strapi/PostgreSQL only when the catalogue and editorial workflow require them; implement the adapter and preserve the UI contract.

## Assumptions and open decisions

- The initial catalogue is small enough for local server-side in-memory search; its exact contents and taxonomy remain open.
- A single category per service is sufficient for MVP. Add many-to-many categorization only if real catalogue evidence needs it.
- Sources and verification are modeled per service initially, with multiple sources permitted; field-level provenance can be added later if editorial needs require it.
- The source eligibility policy, review cadence, Strapi configuration, database schema, final Arabic matching rules, deployment configuration, and supported secondary language remain unresolved.
