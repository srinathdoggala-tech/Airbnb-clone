# Accessibility Engineering & Verification Report

## PlayPower Labs Software Engineer Take-Home: Vacation Rental Listing Experience

---

### Executive Overview
This document records the empirical results of an accessibility evaluation performed on the vacation-rental listing application (`http://localhost:4173/`). The implementation follows WAI-ARIA authoring practices, WCAG 2.2 Level AA guidelines, and automated DOM accessibility criteria.

---

### 1. Accessibility Features Implemented

#### 1.1 Semantic HTML & Landmark Hierarchy
- **Landmarks**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` provide structural landmarks for assistive tools.
- **Strict Heading Hierarchy**:
  - **Single `<h1>`**: Reserved exclusively for the primary listing title: `"Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"`.
  - **Major Sections (`<h2>`)**: 10 sections demarcate page modules (`"Entire serviced apartment in Candolim, India"`, `"About this space"`, `"Where you'll sleep"`, `"What this place offers"`, `"5 nights in Candolim"`, `"4.95 · 19 reviews"`, `"Where you'll be"`, `"Meet your host"`, `"Things to know"`, `"Explore other options"`).
  - **Subheadings (`<h3>`)**: 14 cards organize highlights, calendar months, host bio, and house rules.
  - **Sub-module (`<h4>`)**: Nested under host bio for `"Co-hosts"`.
  - **Zero Heading Skips**: Verified 0 heading level skips across all 26 headings in the document.

#### 1.2 Form & Button Accessible Naming
- Interactive controls are built using native `<button>` and `<a>` elements with explicit `type="button"` attributes.
- Across all 118 interactive controls on the page, every button declares an accessible name via visible text or an explicit `aria-label`:
  - Language & Currency: `aria-label="Choose a language and currency"`
  - User Navigation Menu: `aria-label="User navigation menu"`
  - Share Trigger: `aria-label="Share this property"`
  - Wishlist Toggle: Dynamic `aria-label="Remove from wishlist"` / `aria-label="Add to wishlist"` with `aria-pressed` state
  - Hero Photo Triggers: `aria-label="View photo 1 of 5: Living room 2 image 4"`, etc.
  - Full Gallery Trigger: `aria-label="Show all 43 photos in full-screen tour"`
  - Calendar Controls: `aria-label="Clear selected date range"`, date-specific cell labels
  - Nearby Carousel: `aria-label="Previous stays"`, `aria-label="Next stays"`
  - Map Controls: `aria-label="Zoom in on map"`, `aria-label="Zoom out on map"`

#### 1.3 Image Alternatives & Fallbacks
- All 9 primary page images provide non-empty, descriptive `alt` text:
  - 5 Hero Gallery photos provide room-specific labels (`alt="Living room 2 image 4"`, `alt="Bedroom image 1"`, etc.).
  - 4 Nearby stay preview images describe the stay title (`alt="Beautiful Studio with a view to die for"`, etc.).
  - Host avatar renders as a semantic badge with the host's initial `"M"`.
- Every image declares dimension attributes (`width`, `height`) and fixed aspect ratios (`16/10` and `4/3`) with `decoding="async"`.

#### 1.4 Visible Focus States & Keyboard Operability
- **Focus Indicators**: Focused controls display prominent high-contrast focus rings (`outline: 2px solid #222222` with `2px offset`) via `:focus-visible`. No focus outlines are suppressed.
- **Tab Navigation**: Tested sequential keyboard Tab traversal through header, search pill, share button, wishlist button, and hero photo triggers without focus trapping outside of dialogs.
- **Keyboard Shortcuts**:
  - `Escape`: Closes whichever modal is active (`PhotoTourModal`, `LightboxModal`, `AmenitiesModal`, `ShareModal`, `ReservationModal`).
  - `ArrowLeft` / `ArrowRight`: Steps backward and forward through photos in the Lightbox viewer.

#### 1.5 Dialog Semantics & Focus Management
- **WAI-ARIA Dialog Pattern**:
  - `role="dialog"`
  - `aria-modal="true"`
  - Descriptive `aria-label` matching modal context.
- **Focus Trapping (`useFocusTrap`)**: Traps Tab and Shift+Tab cycling within open overlays, preventing focus leakage to background content.
- **Stack-Based Focus Restoration (`useFocusReturn`)**: Remembers the active trigger element and restores focus to that exact element upon modal dismissal, even across multi-level modal workflows (e.g. Hero → Photo Tour → Lightbox → Photo Tour → Hero).
- **Screen Reader Announcements**: The Lightbox counter (`<div aria-live="polite">X / 43</div>`) announces photo position updates dynamically without disruptive audio interrupts.

---

### 2. Empirical Accessibility Audit Results

| Audit Check | Target / Element | Computed Measurement | Standard / Requirement | Status |
|---|---|---|---|---|
| **Primary Text Contrast** | Body text (`#222222` on `#ffffff`) | **15.91:1** | WCAG AA $\ge$ 4.5:1 | **PASS** |
| **Muted Text Contrast** | Secondary text (`#717171` on `#ffffff`) | **4.88:1** | WCAG AA $\ge$ 4.5:1 | **PASS** |
| **Reserve Button Contrast** | White text (`#ffffff` on `#e61e4d`) | **4.51:1** | WCAG AA $\ge$ 4.5:1 | **PASS** |
| **Heading Hierarchy** | 26 headings (`h1` through `h4`) | **0 skips detected** | Strict sequence without skips | **PASS** |
| **Interactive Controls** | 118 buttons & links | **118 / 118 (100%) labeled** | Zero missing accessible names | **PASS** |
| **Image Alt Attributes** | 9 rendered images | **9 / 9 (100%) valid alt** | Non-empty descriptive strings | **PASS** |
| **Visible Focus Ring** | Tab sequence across 10 controls | **2px–3px solid outline** | Visible high-contrast ring | **PASS** |
| **Lightbox Keyboard Nav** | Arrow keys & Escape | **`ArrowLeft`, `ArrowRight`, `Esc`** | Full keyboard operability | **PASS** |
| **Focus Trapping** | Open Photo Tour & Lightbox | **Focus contained in dialog** | Zero focus leak to background | **PASS** |
| **Focus Restoration** | Modal close via Escape | **Trigger restored via ref stack** | Focus returns to trigger | **PASS** |

---

### 3. Not Tested / Remaining Limitations
- **Screen Reader Audio Testing**: Testing was conducted via automated accessibility tree inspection, DOM property verification, and keyboard emulation. Testing with physical auditory screen reader engines (e.g. JAWS, NVDA, VoiceOver) was not performed.
- **High Contrast OS Overrides**: Windows High Contrast mode and browser forced-colors mode were not explicitly evaluated.
- **Mobile Viewport Accessibility**: Desktop view was the sole requirement of this assessment; mobile touch target sizes and screen rotation were not audited.
