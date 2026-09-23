# QA Checklist

## Build
- TypeScript (`npx tsc --noEmit`): **PASS** (Compiled with 0 type errors)
- Production build (`npm run build`): **PASS** (Vite v6 production bundle built cleanly in ~3.9s)
- Automated Test Suite (`npm test`): **PASS** (Node test runner executed **52 tests across 13 suites** in `src/tests/listing.test.js` and `src/tests/integration.test.js`, 52 passed, 0 failed in ~370ms)
  - Suite 1: Listing Data & Static Asset Integrity (6 tests) — **PASS**
  - Suite 2: Date Selection & Calendar Validation Logic (4 tests) — **PASS**
  - Suite 3: Guest Selector Constraints & Invariants (5 tests) — **PASS**
  - Suite 4: Dynamic Booking Price Calculation Engine (3 tests) — **PASS**
  - Suite 5: Wishlist Storage Persistence & Deserialization (3 tests) — **PASS**
  - Suite 6: Share Channels & Clipboard URL Construction (2 tests) — **PASS**
  - Suite 7: Modal Focus Restoration State Engine (5 tests for 5 modals) — **PASS**
  - Suite 8: Invalid & Empty Interaction State Fallbacks (3 tests) — **PASS**
  - Suite 9: Keyboard Navigation Dispatch Matrix (5 tests) — **PASS**
  - Suite 10: URL Query State Synchronization & Bounds Safety (8 tests) — **PASS**
  - Suite 11: State Machine Modal Transitions & History Invariants (3 tests) — **PASS**
  - Suite 12: Keyboard Interaction & Focus Restoration Matrix (3 tests) — **PASS**
  - Suite 13: Accessibility & Reduced Motion Stylesheet Audit (2 tests) — **PASS**

## Functional
- Listing page: **PASS** (Heading, specs, highlights, description, sleeping arrangements, amenities, calendar, reviews, map, host, and nearby stays rendered)
- Photo tour: **PASS** (Opens from "Show all 43 photos", renders 9 room categories with sticky navigation pills, closes on Back button or Escape)
- Lightbox: **PASS** (Opens from hero photos or tour, displays centered photo with counter `X / 43`, previous/next chevrons, boundaries respected)
- Keyboard navigation: **PASS** (`ArrowLeft` and `ArrowRight` navigate photos; `Escape` dismisses active overlays; `Tab` navigates interactive elements)
- Modal behavior: **PASS** (Modal transitions mutual exclusivity, body scroll locking during active modal, focus trap active inside dialog)

## Accessibility
- Semantic structure: **PASS** (Landmarks `<header>`, `<main>`, `<nav>`, `<section>`, `<footer>` used; interactive controls use `<button>` / `<a>`)
- Heading hierarchy: **PASS** (26 headings: 1 `<h1>`, 10 `<h2>`, 14 `<h3>`, 1 `<h4>`; **0 heading level skips detected**)
- Focus management: **PASS** (Focus trapped inside open dialogs via `useFocusTrap`; stack-based focus returned to trigger button on close via `useFocusReturn`)
- Keyboard access: **PASS** (All actionable features accessible via keyboard navigation; visible outline `:focus-visible` present across all 118 controls)
- Accessible names: **PASS** (118 / 118 interactive buttons & links declare accessible names via visible text or `aria-label`)
- Alt text: **PASS** (9 / 9 primary page images declare descriptive non-empty `alt` text)
- Contrast review: **PASS** (Computed: Body text `#222222` = **15.91:1**; Muted text `#717171` = **4.88:1**; Reserve button `#ffffff` on `#e61e4d` = **4.51:1**; all meet or exceed 4.5:1 requirement)

## Visual
- Layout: **PASS** (Desktop container constrained to `1120px` max-width, 2-column split with 370px sticky card, 80px gap)
- Typography: **PASS** (Clean sans-serif typography hierarchy matching reference Airbnb styling)
- Gallery: **PASS** (5-tile asymmetric grid: 1 large 2-row photo on left, 4 square tiles on right, rounded outer corners)
- Modals: **PASS** (Full-screen white Photo Tour overlay, high-focus single-photo Lightbox with dark backdrop, rounded cards for Share/Reservation)

## Known Limitations
- Mobile viewports were not evaluated, as the assessment strictly specified desktop scope.
- Auditory verification with live screen reader software (e.g. NVDA, JAWS, VoiceOver) was not conducted; semantics rely on standard WAI-ARIA implementations.
- Payment processing is simulated through UI states; no live payment gateway or third-party merchant integration is connected.
- Static data model is used in place of dynamic server database persistence.
