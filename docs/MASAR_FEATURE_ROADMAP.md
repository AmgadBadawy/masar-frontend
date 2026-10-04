# Masar — Feature Roadmap & Continuation Context

> **Purpose:** This document is the step-by-step feature roadmap for Masar. It is designed to survive chat/agent/model limits. A new chat or coding agent should read this file together with `MASAR_MASTER_CONTEXT.md` and `MASAR_NEW_CHAT_BOOTSTRAP_PROMPT.md` before continuing implementation.

---

# 1. Product North Star

Masar (مسار) is a guidance/navigation layer for Egyptian government services.

Masar does **not** perform government transactions itself. Its core job is:

```text
Discover / Search
      ↓
Find the right service
      ↓
Understand requirements
      ↓
Understand steps
      ↓
Check the official source
      ↓
Go to the official service
```

Core product principles:

- Accuracy before feature count.
- Never invent government requirements or service details.
- Official source + verification date are core trust signals.
- Arabic-first / RTL-native.
- Mobile-first.
- Calm, modern, trustworthy UI.
- Deterministic search before AI.
- Avoid over-engineering.
- Portfolio quality should come from engineering quality.

---

# 2. Non-Negotiable Constraints

## Backend / Strapi Protection

The existing Strapi backend is external infrastructure and must be treated as **READ-ONLY**.

Never modify:

- Strapi schemas
- Content types
- Backend endpoints
- API contracts
- Backend configuration
- Authentication
- Permissions
- Backend data models
- Backend hooks
- Backend deployment configuration
- Backend environment configuration

If a backend problem is discovered, report it instead of changing the backend.

## Architecture

Preserve the existing frontend/data abstraction:

```text
UI
 ↓
Repository / data access
 ↓
Local TypeScript catalogue (current/development)
        OR
Strapi (production/future)
```

The UI should not become coupled to Strapi implementation details.

## Scope discipline

Do not add a feature merely because it is technically interesting.

Every feature must have a concrete product/UX/engineering benefit.

Do not introduce AI, vector search, authentication, notifications, maps, payments, or complex infrastructure prematurely.

---

# 3. Current Product Foundation

The current Masar architecture already supports service-oriented information such as:

- `category`
- `authority`
- `documents`
- `steps`
- `fees`
- `expectedTime`
- `onlineAvailability`
- `verification`
- official `source`

Current development categories include:

- الأحوال المدنية
- المستندات والوثائق
- النقل والمرور

These are development/demo categories and are **not final verified government taxonomy**.

Current development service data is intentionally fake/sample content and may use `example.com` source URLs. It must not be presented as real government requirements. Before public release, replace it with verified official data and establish a source-review/verification policy.

---

# 4. Feature Priority System

### P0 — Foundation / Core MVP
Features required to make Masar a strong, coherent product.

### P1 — High-value Product Features
Features that materially improve the user journey without changing the product's core architecture.

### P2 — Expansion Features
Features that become valuable when the catalogue and usage grow.

### P3 — Future Intelligence / Platform Features
Features intentionally deferred until the product has enough real data, traffic, and validated UX.

---

# 5. MASTER ROADMAP

```text
P0 Core Experience
│
├── Search foundation
├── Arabic normalization
├── Service details
├── Breadcrumbs / navigation context
├── Verification / trust UX
├── Requirements + steps presentation
├── Official source CTA
├── Loading / error / empty states
├── Accessibility / RTL / responsive quality
└── Testing + production verification
        │
        ▼
P1 Product Utility
│
├── Service Finder
├── Service Checklist
├── Favorites
├── Recently Viewed
├── Share Service
├── Print / Save as PDF
├── Related Services
├── Improved fees / time / online availability presentation
└── Authority directory
        │
        ▼
P2 Catalogue / Discovery Expansion
│
├── Popular Services
├── Recently Updated Services
├── Service freshness / review states
├── Advanced filtering
├── Service comparison
├── Eligibility flow
└── Government updates / change history
        │
        ▼
P3 Future Intelligence
│
├── Semantic search
├── AI-assisted service discovery
├── Accounts
├── Cross-device saved services
├── Notifications
└── Personalized experiences
```

---

# 6. P0 — Core Experience

## P0.1 Advanced Deterministic Search

### Goal
Make Masar's search genuinely useful for Arabic users while remaining deterministic and maintainable.

### Search fields

- Service title
- Service summary
- Category name
- Authority
- Approved aliases, only when authoritative aliases exist

### Required behavior

- Arabic normalization
- Case-insensitive matching
- Partial matching
- Empty query handling
- No-result handling
- Category filtering
- Query represented in URL state

### Important constraints

- No AI
- No semantic/vector search
- No external search engine
- No unnecessary global state
- Search logic should live in a reusable/testable layer

### Done when

- Search utility is isolated from page rendering.
- Arabic normalization is deterministic.
- Relevant tests exist.
- Search works in RTL.
- Search works against current local data and remains compatible with the repository boundary.

---

## P0.2 Service Detail Experience

### Goal
Make the service page the strongest part of Masar.

### Information hierarchy

```text
Service name
↓
What this service is
↓
Authority
↓
Requirements / documents
↓
Step-by-step process
↓
Fees
↓
Expected time
↓
Online availability
↓
Verification information
↓
Official source
```

### UX goals

- Easy scanning
- Strong hierarchy
- Clear next action
- Trust visible without overwhelming the user
- Excellent mobile experience

---

## P0.3 Breadcrumb Navigation

### Goal
Help users understand where they are, especially when landing directly from search engines.

Example:

```text
الرئيسية → الفئة → الخدمة الحالية
```

### Rules

- Use semantic `<nav aria-label="Breadcrumb">`.
- Real ancestors are links.
- Current page is not a normal navigation link.
- Do not invent relationships that do not exist in the data.
- Must work correctly in RTL.

---

## P0.4 Verification / Trust UX

### Goal
Make source credibility a visible part of the product experience.

Display information such as:

```text
✓ تم التحقق من المعلومات
آخر مراجعة: [date]
المصدر الرسمي: [source]
```

Potential future states:

- Verified
- Recently updated
- Needs review

### Constraints

Never imply verification that did not happen.

Never invent dates or source details.

---

## P0.5 Requirements and Steps Presentation

### Goal
Turn service data into a scannable, practical guide.

### Requirements UI

Show documents/requirements in a clear grouped section.

### Steps UI

Show ordered steps with strong visual numbering and readable descriptions.

### Future compatibility

This feature should later support verified Strapi content without changing the UI architecture.

---

## P0.6 Official Source CTA

### Goal
Make the product's final action explicit.

Primary CTA concept:

> الذهاب إلى المصدر الرسمي

Masar should clearly distinguish:

- Guidance provided by Masar
- Transaction performed on the official government source

Never make Masar appear to be the government service itself.

---

## P0.7 Loading / Error / Empty States

Audit all relevant routes and data states.

Required cases include:

- Loading
- No search results
- Unknown service slug
- Unknown category slug
- Failed data request
- Missing optional data
- Missing image

States must be useful, accessible, and consistent with the visual system.

---

## P0.8 Accessibility / RTL / Responsive Quality

Treat these as product features, not cleanup.

Verify:

- Semantic HTML
- Heading hierarchy
- Keyboard navigation
- Focus-visible states
- Contrast
- Accessible names
- Arabic RTL behavior
- Mixed Arabic/English content
- Small screens
- Touch targets
- No horizontal overflow
- Reduced-motion behavior

Target high-quality real-world accessibility, not only a Lighthouse score.

---

## P0.9 SEO / Performance / Production Validation

Maintain and improve:

- Metadata
- Canonicals
- Open Graph
- robots
- sitemap
- Semantic structure
- Internal linking
- Image optimization
- Font loading
- Client/server boundaries
- Core Web Vitals

Target excellent Lighthouse results, ideally:

- Performance: 100
- Accessibility: 100
- Best Practices: 100
- SEO: 100

Do not use score hacks.

Production validation should run against a real production build and the existing Strapi backend when required.

---

# 7. P1 — High-Value Product Features

## P1.1 Service Finder — "إنت محتاج تعمل إيه؟"

### Goal
Allow users to discover a service even when they do not know its exact name.

Example concept:

```text
إيه اللي محتاج تعمله؟
        ↓
استخراج مستند
        ↓
تعديل بيانات
        ↓
خدمة مرور
        ↓
الخدمات المناسبة
```

### Architecture

Start as a deterministic decision tree / guided flow.

Do not use AI initially.

### Why it matters

This turns Masar from a basic directory into a genuine navigation tool.

---

## P1.2 Service Checklist

### Goal
Let users turn service requirements and steps into an actionable checklist.

Example:

```text
المستندات
□ البطاقة
□ المستند المطلوب

الخطوات
✓ الخطوة 1
○ الخطوة 2
○ الخطوة 3
```

### Storage

Can initially be local-only via browser storage.

No authentication required for the first version.

### Constraints

Do not claim a requirement exists unless it is present in verified service data.

---

## P1.3 Favorites — No Account Required Initially

### Goal
Allow users to save services they care about.

First version:

- Local browser storage
- Clear saved/unsaved state
- Dedicated saved services view/section

Future:

- Account synchronization

Do not introduce authentication just to implement the first version.

---

## P1.4 Recently Viewed Services

### Goal
Help users return to services they already explored.

Initial implementation can be local-only.

Potential behavior:

```text
آخر ما شاهدته
→ Service A
→ Service B
→ Service C
```

Keep storage small and deterministic.

---

## P1.5 Share Service

### Goal
Make it easy to send a service to another person.

Primary actions:

- Copy link
- Native Web Share API when available
- Graceful fallback

No heavy dependency should be added for this.

---

## P1.6 Print / Save as PDF

### Goal
Allow users to preserve a clean version of service instructions.

Printable output should include:

- Service name
- Authority
- Requirements
- Steps
- Fees
- Expected time
- Online availability
- Verification date
- Official source

Prefer print CSS / browser printing rather than a heavy PDF library unless a concrete requirement appears.

---

## P1.7 Related Services

### Goal
Help users discover the next relevant service after viewing one service.

Examples of relationship signals:

- Same category
- Same authority
- Explicitly related services from verified data

Avoid random recommendations.

Future data model may add explicit relationships if needed.

---

## P1.8 Better Fee / Time / Online Availability Presentation

Use the existing service fields:

- `fees`
- `expectedTime`
- `onlineAvailability`

Present them as highly scannable information blocks rather than buried text.

Potential UX:

```text
الرسوم
...

المدة المتوقعة
...

متاحة إلكترونيًا
نعم / لا / حسب الحالة
```

Only display information that exists and is trustworthy.

---

## P1.9 Authority Directory

### Goal
Make the `authority` concept discoverable.

Potential flow:

```text
الجهات الحكومية
        ↓
الجهة
        ↓
الخدمات التابعة لها
```

This can grow naturally from the existing `authority` field without coupling the UI to Strapi.

---

# 8. P2 — Catalogue / Discovery Expansion

## P2.1 Popular Services

### Goal
Expose commonly used services.

Important constraint:

Do not invent popularity numbers.

Only implement when actual usage analytics or another reliable source exists.

Until then, this can remain deferred.

---

## P2.2 Recently Updated Services

Use the service verification date to surface recently reviewed/updated information.

Example:

```text
آخر الخدمات التي تمت مراجعتها
```

This becomes more valuable as the catalogue grows.

---

## P2.3 Service Freshness / Review States

Possible states:

- Verified
- Recently updated
- Needs review

This feature requires a clear verification policy.

Never create fake freshness signals.

---

## P2.4 Advanced Filtering

Possible filters once the catalogue becomes meaningful:

- Category
- Authority
- Online availability
- Time
- Fee characteristics

Keep filters understandable and URL-addressable where appropriate.

Do not create dozens of filters prematurely.

---

## P2.5 Service Comparison

### Goal
Compare similar services side by side.

Potential fields:

| Field | Service A | Service B |
|---|---|---|
| Authority | ... | ... |
| Documents | ... | ... |
| Fees | ... | ... |
| Time | ... | ... |
| Online | ... | ... |

Only compare services where the data is structurally comparable and trustworthy.

---

## P2.6 Eligibility / Guided Qualification Flow

### Goal
Help a user determine whether a service appears relevant to their situation.

Example:

```text
هل الخدمة دي مناسبة ليك؟
        ↓
Question
        ↓
Question
        ↓
Relevant service(s)
```

Constraints:

- Rules must be based on verified service data.
- Do not infer legal/government eligibility from assumptions.
- Avoid giving legal advice.

---

## P2.7 Government Updates / Change History

Future concept:

```text
ما الذي تغيّر؟
آخر تحديث
ما الذي تمت مراجعته؟
المصدر
```

This is especially valuable when official procedures change frequently.

Requires a real editorial/verification workflow before implementation.

---

# 9. P3 — Future Intelligence / Platform Features

These are intentionally deferred until the core deterministic product is validated.

## P3.1 Semantic Search

Example intent:

```text
عايز أغير بيانات البطاقة
```

Search could understand meaning rather than relying only on exact text.

Potential technologies later:

- Embeddings
- Vector database
- Semantic retrieval

Do not introduce these into the current MVP prematurely.

---

## P3.2 AI-Assisted Service Discovery

Potential interaction:

```text
أنا عايز أعمل X
        ↓
AI interprets intent
        ↓
Relevant Masar services
```

Important architecture principle:

AI should help **discover and navigate** services, not invent government requirements.

The source of truth remains verified service data and official government sources.

---

## P3.3 Accounts

Future account features may include:

- Saved services across devices
- History synchronization
- Preferences
- Personalized discovery

Do not add accounts merely to support local favorites/checklists that can work without authentication.

---

## P3.4 Notifications

Potential use cases:

- A saved service was updated
- A verification date changed
- A government procedure changed

Requires accounts or subscriptions and a real update pipeline.

---

## P3.5 Personalized Experiences

Future examples:

- Frequently used services
- Relevant categories
- Personalized shortcuts
- Saved journeys

Only implement after product usage data validates the need.

---

# 10. Features Intentionally NOT in the Near-Term Roadmap

Do not add the following unless the product direction is explicitly changed:

- Chat as a core UI feature
- Payments
- Maps
- Social feed
- Team collaboration
- Realtime infrastructure
- Complex RBAC
- Microservices
- Mobile app
- RAG for service content
- Vector database before semantic search is justified
- AI-generated government requirements

These are outside the current focused product direction.

---

# 11. Suggested Implementation Order

Use small, reviewable stages instead of one giant implementation.

```text
Stage 1
Search foundation + Arabic normalization

Stage 2
Service detail UX + breadcrumbs + trust presentation

Stage 3
Loading / error / empty states

Stage 4
Accessibility + RTL + responsive edge cases

Stage 5
Service Checklist

Stage 6
Favorites + Recently Viewed

Stage 7
Share + Print / Save as PDF

Stage 8
Related Services + better service metadata presentation

Stage 9
Service Finder

Stage 10
Authority directory

Stage 11
Verification / freshness system

Stage 12
Advanced discovery / filtering

Stage 13
Service comparison

Stage 14
Eligibility flow

Stage 15
Testing + production hardening

Stage 16
Verified real government catalogue

Stage 17
Strapi production integration validation

Stage 18
Deployment

Stage 19
Portfolio case study

--- Later ---
Semantic search
AI-assisted discovery
Accounts
Notifications
Personalization
```

The exact order is subordinate to the actual repository state. Never restart from Stage 1 if a stage is already completed.

---

# 12. Definition of Done for Any Feature

A feature is not complete just because the code exists.

For every feature:

1. Read the relevant project decisions first.
2. Inspect the current implementation.
3. Define the smallest useful scope.
4. Identify exact files that need changes.
5. Implement frontend-only unless explicitly authorized otherwise.
6. Keep backend/Strapi read-only.
7. Keep the repository/data abstraction intact.
8. Check Arabic/RTL behavior.
9. Check mobile/responsive behavior.
10. Check keyboard/accessibility behavior.
11. Check loading/error/empty behavior where relevant.
12. Run lint.
13. Run typecheck if available.
14. Run tests if available.
15. Run production build.
16. Browser-verify the affected flow.
17. Review the diff for unrelated changes.
18. Update this roadmap's Current Status section.

---

# 13. Agent / Chat Handoff Protocol

When a chat or agent reaches its limit:

### Before stopping

Update the status section below with:

- Current stage
- Completed features
- Feature currently being edited
- Files changed
- Validation results
- Remaining issues
- Next exact task

### In a new chat

Give the new agent these files in this order:

```text
1. MASAR_MASTER_CONTEXT.md
2. MASAR_NEW_CHAT_BOOTSTRAP_PROMPT.md
3. MASAR_FEATURE_ROADMAP.md
4. Any relevant architecture/decision documents
```

Then instruct the agent:

```text
Read all Masar context documents before making changes.
Use MASAR_FEATURE_ROADMAP.md as the current feature roadmap.
Verify the repository state before editing.
Continue from the documented Current Status.
Do not restart completed work.
Do not modify Strapi/backend files.
Do not override documented architectural decisions silently.
```

---

# 14. Current Status

> **This section should be updated after each major milestone.**

## Project

Masar — Egyptian government-service guidance/navigation platform.

## Current architectural state

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Arabic-first / RTL
- Repository abstraction for data access
- Local TypeScript catalogue for development
- Strapi integration architecture preserved for production/future

## Confirmed routes/features from the latest known state

- `/`
- `/search`
- `/categories/[slug]`
- `/services/[slug]`
- `/robots.txt`
- `/sitemap.xml`
- `/about` needs/needed verification because it was previously linked from the footer but not present in the documented route set at one point.

## Latest known work

- Frontend UI exists beyond the original MVP foundation.
- Search exists but was previously identified as needing stronger Arabic normalization and dedicated search logic.
- Service details exist.
- Accessibility/SEO work has already been partially implemented and reviewed.
- Footer received visual polish to improve contrast for the white logo.
- Batch 2 direction included RTL logical spacing, semantic breadcrumbs, and focus-visible improvements on search filters.
- Production build was previously blocked when Strapi was not running; this was understood as expected behavior of the current production repository selection.

## Latest known feature priority

The next product-oriented progression is:

```text
Search hardening
→ Service detail/trust polish
→ Loading/error/empty
→ Accessibility/RTL/responsive hardening
→ Checklist
→ Favorites / Recently Viewed
→ Share / Print
→ Related Services
→ Service Finder
→ Authority directory
→ Verification/freshness
→ Advanced discovery
→ Comparison
→ Eligibility
→ Testing / production hardening
→ Verified real data
→ Strapi production validation
→ Deployment
→ Portfolio case study
```

## Current active task

**Update this field whenever work begins.**

```text
[WRITE CURRENT ACTIVE TASK HERE]
```

## Files currently being changed

```text
[WRITE FILE PATHS HERE]
```

## Latest validation

```text
lint: [PASS / FAIL / NOT RUN]
typecheck: [PASS / FAIL / NOT RUN]
tests: [PASS / FAIL / NOT RUN]
build: [PASS / FAIL / NOT RUN]
browser verification: [PASS / FAIL / NOT RUN]
lighthouse: [record latest measurements here]
```

## Remaining issues

```text
[WRITE REMAINING ISSUES HERE]
```

## Next exact task

```text
[WRITE ONE EXACT NEXT TASK HERE]
```

---

# 15. Final Product Quality Bar

Masar should eventually demonstrate:

### Product

- Clear problem and value proposition
- Focused service-discovery experience
- Strong service detail experience
- Trustworthy source handling
- Clear next action

### UX

- Mobile-first
- Responsive
- Accessible
- Arabic-first
- Clear loading/error/empty states
- Low cognitive load
- Strong information hierarchy

### Engineering

- Strong TypeScript typing
- Clear repository boundary
- Server-first Next.js posture where appropriate
- Minimal client-side JavaScript
- Minimal dependencies
- Testable business logic
- Maintainable component structure
- No unnecessary abstraction

### Performance

- Excellent Core Web Vitals
- Optimized images
- Efficient fonts
- Minimal unnecessary hydration
- No performance score hacks

### Trust

- Verified information only
- Official source links
- Verification dates
- Clear distinction between Masar guidance and government transactions

### Portfolio quality

The final project should demonstrate engineering judgment, not just feature count.

A smaller set of deeply polished features is preferable to a large collection of shallow features.

---

# 16. Important Future Principle

The strongest future direction for Masar is not "add more AI".

The strongest product progression is:

```text
Good catalogue
      ↓
Excellent organization
      ↓
Excellent deterministic search
      ↓
Guided discovery
      ↓
Actionable service checklist
      ↓
Strong trust / verification system
      ↓
Meaningful usage data
      ↓
Semantic search
      ↓
AI-assisted discovery
```

AI should be introduced only when it provides a measurable improvement over the deterministic experience.

The source of truth for government procedures must remain verified data and official government sources.

---

# 17. New Chat Quick Start

Copy/paste this into a new chat when needed:

```text
I am continuing the existing Masar project.

Read these files first:
- MASAR_MASTER_CONTEXT.md
- MASAR_NEW_CHAT_BOOTSTRAP_PROMPT.md
- MASAR_FEATURE_ROADMAP.md
- relevant docs/ architecture/decision files

Treat MASAR_MASTER_CONTEXT.md as canonical project context.
Treat MASAR_FEATURE_ROADMAP.md as the feature roadmap and handoff state.

First verify the actual repository state and compare it with the documented Current Status.
Do not restart completed work.
Continue from the exact Next Task documented in MASAR_FEATURE_ROADMAP.md.

Preserve all existing architectural decisions.
Treat Strapi/backend as READ-ONLY.
Do not modify backend files, schemas, API contracts, or backend configuration.
Do not silently change architecture.
Do not introduce deferred technologies prematurely.

Use small logical implementation stages.
Before editing, state the exact files and scope.
After editing, run validation and update MASAR_FEATURE_ROADMAP.md.
```

---

# 18. Last Updated

2026-09-29

Update this date whenever the roadmap or Current Status changes materially.
