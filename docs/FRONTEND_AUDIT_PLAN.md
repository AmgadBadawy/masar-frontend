# Masar Frontend Audit

## A. Genuine Defects
- None identified in the core rendering flow. The application compiles, handles layouts, and retrieves data correctly.

## B. UX/UI Improvements
- The header is currently a single `"use client"` component because of `usePathname`. This works, but forces the logo and layout structure to be hydrated on the client.
- The `loading.tsx` skeleton could be slightly more aligned with the actual `ServiceCard` layout to reduce Layout Shift (CLS) during navigation.
- The focus rings (`focus-visible:ring-...`) are well implemented, but some interactive elements inside cards could have their hit targets expanded (e.g., using the `::after` pseudo-element trick to make the whole card clickable if it isn't already).

## C. Performance Improvements
- **Server Components:** Most pages correctly use Server Components. The Header can be refactored to keep the shell as a Server Component and only the navigation links/mobile menu as Client Components.
- The `revalidate = 300` is a good choice for Incremental Static Regeneration (ISR).

## D. Accessibility Improvements
- **Skip to Content:** Implemented correctly via `<div id="main-content">`.
- **Contrast:** The `--color-text-muted` (`#74817e`) on white (`#ffffff`) yields a contrast of ~4.54:1. This is exactly at the WCAG AA threshold. We might want to slightly darken it to `#6b7774` to ensure it comfortably passes across different monitors.

## E. SEO Improvements
- **Structured Data:** Missing `JSON-LD` schemas. For a directory like Masar, injecting `GovernmentService` or `Service` structured data on the `app/services/[slug]/page.tsx` is a high-value SEO win.
- Metadata is well-configured, dynamic, and includes OpenGraph tags.

## F. Architectural Risks
- The current implementation strictly respects the Repository pattern. Data fetching is isolated in `cached-service-repository.ts`. There are no conflicts.

## G. Documentation Discrepancies
- The previous AI review mentioned search was incomplete. However, inspecting the code reveals a fully deterministic, Arabic-normalized search implementation is already present in `lib/search/normalize-arabic.ts` and `lib/search/search-services.ts`.

---

# Implementation Strategy

## Batch 1: SEO & Client Payload Optimization
1. Refactor `components/layout/header.tsx` to extract the active link logic into a smaller `<NavLinks>` client component, allowing the header shell and `<BrandLogo>` to be Server Components.
2. Inject `JSON-LD` Structured Data (`type: 'GovernmentService'`) into `app/services/[slug]/page.tsx`.

## Batch 2: Accessibility & UI Polish
1. Slightly darken `--color-text-muted` in `app/globals.css` for better WCAG contrast headroom.
2. Refine the `ServiceCard` clickable area to ensure the entire card acts as a generous touch target on mobile devices without relying solely on the text link.
3. Update `app/loading.tsx` to perfectly match the `ServiceCard` dimensions for zero Cumulative Layout Shift (CLS).

**Note:** No Strapi or backend files will be touched. The data abstraction layer remains completely intact.
