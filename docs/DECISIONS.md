# Decisions

## Established decisions

| Topic | Decision |
| --- | --- |
| Product name | Masar — مسار |
| Product focus | Help users understand government procedures in Egypt |
| Product role | Guidance and navigation layer; not a replacement for government services |
| Primary language | Arabic |
| Design direction | Modern, trustworthy Egyptian technology product; not a government website |
| UX priorities | Mobile-first and accessible |
| Factual information | Must not be invented; factual service details should eventually have an official source and verification date |
| MVP audience | Egyptian adults handling a government procedure for themselves or a close family member, often from a phone and without specialist knowledge |
| Primary MVP journey | Find a curated procedure through Arabic search or category browsing, understand source-backed guidance, then continue to an official source when needed |
| Information architecture | Home, search, categories, service detail, and About Masar; service detail is the primary destination |
| Search role | Search supports everyday Arabic descriptions and service names for the supported catalogue; it must show an honest no-result state when there is no match |
| Service-page order | Purpose and authority, preparation, steps, officially published fees/duration/online availability, then source and verification date |
| External handoff | Masar links out to clearly labeled official sources and official online services when available; it does not complete transactions |
| MVP exclusions | No accounts, social features, notifications, payments, real-time updates, maps, chat, or AI procedure answers |
| Visual character | Calm, clear, warm, and structured; Egyptian in Arabic-first relevance and subtle warmth, without national or government symbolism |
| Core color direction | Deep teal for primary confidence, light neutral surfaces, and restrained copper accents; no flag-color treatment or decorative gradients |
| Typography direction | IBM Plex Sans Arabic for Arabic UI, paired with Inter for Latin content, with system sans-serif fallbacks |
| Layout foundations | Mobile-first, single-column by default; readable 720 px service-detail and 1120 px listing maximum widths; 4 px spacing rhythm |
| UI styling | 12 px card/input radius, subtle neutral borders, and minimal shadows; information hierarchy must lead over decoration |
| Trust UI | Official source and last verified date are a distinct, consistently visible service-detail block |
| RTL approach | RTL is the default design mode; directional controls are mirrored while URLs and external-link indicators retain appropriate direction |
| MVP application architecture | Use one Next.js App Router application with TypeScript, Tailwind CSS, server-rendered public pages, and a small data-access boundary; do not introduce separate services or a backend for the initial catalogue. |
| Initial content source | Start with a small curated local TypeScript catalogue. Keep UI code behind a repository interface so a later Strapi adapter can supply the same domain objects. |
| CMS and database timing | Defer Strapi and PostgreSQL until the catalogue or editorial workflow needs non-developer content management. They are not required to validate the MVP journey. |
| Search approach | Start with deterministic server-side matching over the curated catalogue using normalized Arabic text, titles, summaries, categories, authorities, and approved aliases. Keep the query in the URL; do not add AI, vector, or external search infrastructure. |
| Client state | Keep submitted search state in the URL and transient interaction state local to components. Do not use a global client store or Zustand in the MVP. |
| Data fetching | Do not add TanStack Query while content is local and pages are server-rendered. Re-evaluate only for a later client-driven remote-data need. |
| Trust data model | Model official source(s) and verification separately from optional procedure facts. Missing official fee, duration, or online-service information is displayed as unavailable, never inferred. |
| Route structure | Use `/`, `/search?q=`, `/categories/[slug]`, `/services/[slug]`, and `/about`, matching the approved information architecture. |

## Open decisions

- Database and schema design
- API design
- CMS choice and deployment configuration once a content workflow is needed
- Initial supported procedure catalogue and category taxonomy
- Official-source eligibility criteria, content review workflow, and verification cadence
- Exact Arabic search matching, synonym handling, and result ranking
- Whether a dedicated source methodology page is needed beyond About Masar
- Final logo concept, wordmark treatment, and standalone-symbol need
- Final font licensing, loading strategy, and target-device fallback testing
- Whether category icons are needed and, if so, their visual approach
- Dark-mode support beyond the MVP
- Final component-level contrast and interaction-state specifications
- Figma and other design artifacts
- Deployment and hosting
