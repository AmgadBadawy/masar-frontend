# MVP information architecture

## Navigation model

The MVP uses a small, mobile-first navigation model:

- Home: start a search or browse categories.
- Categories: browse the curated procedure catalogue by topic.
- Search: find procedures using Arabic everyday language or service names.
- About Masar: explain Masar's guidance role and its source-based approach.

The service page is the primary destination. It should preserve a simple way back to its category or the prior search results.

## Page hierarchy

```text
Home
├── Search results
│   └── Service detail
│       ├── Official source (external)
│       └── Official online service (external, when officially available)
├── Categories
│   └── Category listing
│       └── Service detail
└── About Masar
```

## Main pages

### Home

- A prominent Arabic search entry point.
- A short explanation that Masar guides users and does not provide the government service.
- A small set of categories for browsing.

### Search results

- The search query and a list of matching curated procedures.
- Each result should make the service name, a short purpose, and responsible authority easy to scan.
- An empty state should suggest browsing categories and using simpler or alternative terms; it must not fabricate a result.

### Categories and category listing

- Categories are topic-based collections of procedures, not a claim about government organizational structure.
- The initial category set is an OPEN DECISION and must follow the selected, verified catalogue.
- A category listing shows the relevant procedures and lets the user open one.

### Service detail

The service detail page presents only source-backed content in a task-oriented order:

1. Service name and short plain-language purpose
2. Responsible authority
3. What to prepare: required documents, when officially published
4. Steps: official procedure steps, when officially published
5. Fees: only when officially published
6. Expected duration: only when officially published
7. Online availability and official online-service link: only when officially published
8. Official source and last verified date
9. Links back to the originating search or category

The conceptual content fields are guidance for eventual content modeling, not a database schema:

- Service name
- Plain-language summary
- Category
- Responsible authority
- Required documents
- Procedure steps
- Officially published fee information
- Officially published expected duration
- Online availability and official service link
- Official source title and URL
- Last verified date
- Content notes for unavailable or unpublished information

### About Masar

- What Masar is and is not.
- How source-backed information and verification dates support trust.
- A clear reminder that users complete transactions through the responsible authority.

## Supporting behaviors

- External official links should be clearly labeled as leaving Masar.
- Browser back behavior and visible contextual back links should return users to their prior results or category when possible.
- No account, saved services, notifications, chat, maps, payments, or administrative interfaces are needed for the MVP.

## Open decisions

- Final category taxonomy and the first supported procedure catalogue
- Search matching behavior, including synonyms and Arabic normalization
- Whether a dedicated sources/methodology page is required beyond the About page
