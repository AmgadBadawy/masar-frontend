# Brand direction

## Purpose

This is a practical visual foundation for Masar's MVP. It guides future design and implementation; it is not a finished design system, logo, or UI specification.

Masar should feel like a calm, capable guide: it reduces uncertainty around government procedures without imitating a government authority.

## 1. Brand personality

- **Trustworthy:** evidence-led, restrained, and transparent about what is known.
- **Clear:** plain language, obvious hierarchy, and one understandable next step at a time.
- **Helpful:** supportive without being overly casual or patronizing.
- **Calm:** low visual noise for users who may be under time pressure.
- **Modernly Egyptian:** locally relevant in Arabic and tone, with subtle warmth rather than national symbols.
- **Human technology:** organized and efficient, never cold, bureaucratic, or enterprise-heavy.

## 2. Brand principles

- Let information, source status, and action hierarchy create trust; decoration should not.
- Use a small number of repeatable visual cues consistently.
- Prefer generous whitespace, plain labels, and readable Arabic over dense dashboards or ornamental treatments.
- Make official-source and verification information visible, not hidden in a footer or tooltip.
- Use warm accents sparingly to guide attention, not to decorate every surface.
- Keep the interface familiar to users with varied digital comfort.

## 3. Visual keywords

Calm, grounded, clear, direct, warm, structured, Arabic-first, dependable, light, quietly capable.

Avoid: formal, ceremonial, patriotic, glossy, futuristic, loud, bureaucratic, dashboard-heavy, or generic-SaaS.

## 4. Logo direction

Explore only one of these directions in a later logo-design phase. Do not combine all of them into one mark.

### Direction A: The guided path

A simple continuous line or gently turning path that suggests moving from uncertainty to the next step. The form should remain legible at small mobile-header sizes and avoid literal map pins, roads, or arrows.

### Direction B: Letterform route

A custom, minimal interpretation of **م** or the word **مسار**, where a subtle opening, line, or connection implies direction. The Arabic wordmark should remain primary; the mark must not require decorative calligraphy to work.

### Direction C: Start to destination

Two quiet geometric points joined by a short, intentional route. This communicates progression through a procedure without resembling a ministry seal, official badge, or navigation app icon.

### Open logo decisions

- Whether the MVP needs a standalone symbol or only a bilingual-ready wordmark.
- Exact Arabic wordmark type treatment and any Latin rendering.
- Trademark, naming, and availability review.

## 5. Color system

The system uses dark teal for confidence and structure, with soft neutral backgrounds and a restrained warm accent. It deliberately avoids red-white-black flag treatments, national emblems, and large color fields.

| Role | HEX | Use |
| --- | --- | --- |
| Primary | `#0F4C5C` | Primary actions, key links, focused navigation, and the main brand signal. Use white text. |
| Secondary | `#2F6B70` | Supporting interactive states and subtle secondary emphasis. Use white text only after implementation contrast testing. |
| Accent | `#B96F35` | Small highlights, category cues, and non-critical visual emphasis. Do not use as body text on white. |
| Background | `#F7F8F6` | Default page background; soft and low-glare. |
| Surface | `#FFFFFF` | Cards, inputs, source blocks, and elevated content. |
| Text | `#17201E` | Default headings and body text on light surfaces. |
| Muted text | `#52615E` | Supporting labels, metadata, and secondary explanatory text on light surfaces. |
| Success | `#16794D` | Confirmed positive states only; never a substitute for source information. |
| Warning | `#8A5900` | Caution or unavailable-information notices; pair with clear text. |
| Error | `#B42318` | Validation, failed states, and critical issues; pair with clear text. |

### Accessibility use

- Primary and text colors are dark enough for white or very light surfaces and are intended for high-contrast text use.
- Accent is an emphasis color, not a default text color; do not put white text on it until the final contrast ratio is tested.
- Success, warning, and error communicate state only alongside an icon, label, or explanatory text; color must never carry the meaning alone.
- Final component combinations require WCAG contrast validation before implementation.

## 6. Typography

### Recommendation

- **Arabic primary:** IBM Plex Sans Arabic.
- **Latin fallback:** Inter.
- **System fallbacks:** `Arial`, `sans-serif`.

IBM Plex Sans Arabic is legible on small screens, has a contemporary but non-decorative tone, and supports the product's clear, technology-oriented character. Inter provides a neutral companion for Latin terms, URLs, or mixed-language source names.

### Hierarchy

- **Page title:** 28–32 px, bold, compact line height.
- **Section heading:** 20–24 px, semibold or bold.
- **Card/service title:** 18–20 px, semibold.
- **Body:** 16 px, regular, comfortable line height.
- **Supporting text and metadata:** 14 px, regular or medium; do not go smaller for essential information.

Use weight and spacing before color or size extremes to establish hierarchy. Avoid all-caps Latin labels and overly tight Arabic line spacing.

## 7. UI foundations

### Shape, depth, and borders

- **Border radius:** 12 px for cards and inputs; 8 px for compact controls. Avoid exaggerated pill shapes except for small badges.
- **Shadows:** One soft, low-contrast elevation level for cards or sticky mobile controls; most layout should rely on surfaces and borders instead of shadows.
- **Borders:** Thin, neutral borders such as `#D9E0DD` to separate interactive surfaces and information groups.

### Spacing and layout

- Use a simple 4 px spacing rhythm, most commonly 8, 12, 16, 24, and 32 px.
- Give information sections clear vertical separation; do not compress procedural steps into dense blocks.
- Keep readable content widths rather than stretching service text across wide screens.
- Suggested maximum readable content width: 720 px for service details; 1120 px for page-level listings.

### Responsive principles

- Start with a single-column layout and touch-first controls.
- Treat 640 px as the point where compact content can begin to breathe; treat 1024 px as the point for wider listing layouts. These are layout guidance, not fixed implementation requirements.
- Preserve the same content order across screen sizes. Desktop should add space and columns only when they improve scanning.
- Keep key actions, source status, and back navigation visible without requiring precision pointer interactions.

## 8. Core component inventory

### Header

A compact brand wordmark, primary navigation appropriate to the viewport, and a clear way back to home/search. Avoid dense menus and institutional mastheads.

### Search input

A prominent Arabic-first field with an explicit label or accessible name, concise placeholder, visible focus, and a search action. It should invite everyday-language queries rather than demand official terminology.

### Category card

A simple topic card with a clear category name and quiet directional affordance. Do not rely on decorative illustrations or a large icon catalogue.

### Service card

Shows service name, short purpose, and responsible authority in a tappable, scan-friendly unit. It must not imply that Masar performs the service.

### Button

One high-emphasis primary style, a low-emphasis secondary style, and a link-style action. Use clear action labels; reserve primary emphasis for the user’s next step.

### Badge

A compact, text-first status cue for limited labels such as official online-service availability. It must not be the only place a critical fact appears.

### Breadcrumb

A lightweight contextual path on larger screens or within the service page, mirrored for RTL. On small screens, a clear back link may be more useful than a full trail.

### Service information section

A consistent section pattern for requirements, steps, fees, duration, and online availability. Each section has a direct Arabic heading and makes unavailable or unpublished information explicit.

### Source and verification block

A visually distinct but calm block containing source title, external official link, and last verified date. This is a trust feature, not a promotional card.

### Alert

A concise inline message for unavailable information, warnings, or errors. Pair color with a text explanation and, where useful, an icon.

### Empty state

A calm no-results message that suggests a revised Arabic search or category browsing. It must not offer invented answers or imply unsupported services exist.

### Loading state

Short, restrained skeletons or progress indicators that preserve page structure. Avoid distracting shimmer effects.

### Error state

A plain explanation that content could not be loaded, plus a retry action where applicable. Do not expose technical jargon or make unverified fallback claims.

## 9. Arabic and RTL considerations

- Design and test in RTL from the first interface draft; do not treat RTL as a final flip.
- Right-align Arabic reading content, headings, form labels, and list hierarchy by default.
- Mirror directional icons, chevrons, breadcrumbs, and back navigation; do not mirror universal symbols such as external-link indicators.
- Support mixed-direction content deliberately: preserve readable official URLs, Latin authority names, dates, and numerals without breaking Arabic reading flow.
- Use Arabic labels rather than unexplained icon-only controls, especially for essential actions.
- Ensure procedure steps and document lists retain clear numbering and indentation in RTL.

## 10. Accessibility principles

- Meet WCAG 2.2 AA contrast requirements for final text and interactive states.
- Preserve keyboard access, visible focus, semantic headings, and logical focus order.
- Provide touch targets of at least 44 by 44 CSS px for primary mobile controls.
- Never encode source status, errors, or online availability through color alone.
- Use clear labels, helpful validation messages, and language that does not assume administrative expertise.
- Respect text scaling, browser zoom, and screen readers without hiding essential service or source information.

## 11. Mobile-first principles

- Search is the clearest entry point and should appear early on the home page.
- Use one-column service guidance with short sections and predictable order.
- Keep external-link destinations explicit before the user leaves Masar.
- Avoid hover-only behavior, tiny hit areas, multi-level menus, and side-by-side dense comparison layouts.
- Optimize for limited bandwidth and a short attention window; visual assets should not delay essential guidance.

## 12. Do and don't examples

**Do:** use a calm light background, readable dark Arabic text, and a single clear primary action.

**Don't:** reproduce a government portal header, seal, eagle, or flag-color band.

**Do:** make the source title and verification date easy to find on every supported service.

**Don't:** hide provenance behind a generic “learn more” link or use an official-looking badge without explanation.

**Do:** use warm copper sparingly to guide attention or group categories.

**Don't:** cover cards and backgrounds with gradients, glass effects, floating widgets, or decorative illustrations.

**Do:** use a clear Arabic label such as “افتح المصدر الرسمي” alongside an external-link cue.

**Don't:** rely on unfamiliar icons, English-only labels, or visual jargon to communicate core actions.

## Open visual decisions

- Final logo direction, wordmark treatment, and whether a standalone symbol is needed.
- Final font licensing, loading strategy, and fallback testing on target devices.
- Exact category icon approach, if icons are needed at all.
- Dark mode is not defined for the MVP.
- Final component-level contrast checks and interaction-state specifications will be required at implementation time.
