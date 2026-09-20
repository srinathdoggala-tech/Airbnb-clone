# QA Checklist

## Build
- TypeScript (`npx tsc --noEmit`): **PASS** (Compiled with 0 type errors)
- Production build (`npm run build`): **PASS** (Vite v6 production bundle built cleanly in ~3.69s)
- Tests (`npm test`): **PASS** (Node test runner executed 7 tests in `src/tests/listing.test.js`, 7 passed, 0 failed in ~174ms)

## Functional
- Listing page: **PASS** (Heading, specs, highlights, description, sleeping arrangements, amenities, calendar, reviews, map, host, and nearby stays rendered)
- Photo tour: **PASS** (Opens from "Show all 43 photos", renders 9 room categories with sticky navigation pills, closes on Back button or Escape)
- Lightbox: **PASS** (Opens from hero photos or tour, displays centered photo with counter `X / 43`, previous/next chevrons, boundaries respected)
- Keyboard navigation: **PASS** (`ArrowLeft` and `ArrowRight` navigate photos; `Escape` dismisses active overlays; `Tab` navigates interactive elements)
- Modal behavior: **PASS** (Modal transitions mutual exclusivity, body scroll locking during active modal, focus trap active inside dialog)

## Accessibility
- Semantic structure: **PASS** (Landmarks `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>` used; interactive controls use `<button>` / `<a>`)
- Focus management: **PASS** (Focus trapped inside open dialogs via `useFocusTrap`; focus returned to trigger button on close via `useFocusReturn`)
- Keyboard access: **PASS** (All actionable features accessible via keyboard navigation; visible outline `:focus-visible` present)
- Accessible names: **PASS** (`aria-label` applied to icon-only controls, navigation buttons, and modal dialogs)
- Alt text: **PASS** (Descriptive `label` rendered as `alt` text across all 43 listing photos)
- Contrast review: **PASS** (High-contrast text `#222222` against white `#ffffff` and brand contrast reviewed)

## Visual
- Layout: **PASS** (Desktop container constrained to `1120px` max-width, 2-column split with 370px sticky card, 80px gap)
- Typography: **PASS** (Clean sans-serif typography hierarchy matching reference Airbnb styling)
- Gallery: **PASS** (5-tile asymmetric grid: 1 large 2-row photo on left, 4 square tiles on right, rounded outer corners)
- Modals: **PASS** (Full-screen white Photo Tour overlay, high-focus single-photo Lightbox with dark backdrop, rounded cards for Share/Reservation)

## Known Limitations
- Mobile viewports were not evaluated, as the assessment strictly specified desktop scope.
- Assistive screen reader software (e.g. NVDA, JAWS, VoiceOver) was not tested with live audio output; compliance relies on standard WAI-ARIA implementations.
- Payment processing is simulated through UI states; no live payment gateway or third-party merchant integration is connected.
- Static data model is used in place of dynamic server database persistence.
