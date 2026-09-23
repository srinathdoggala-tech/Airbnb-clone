# Comprehensive Implementation Plan
## PlayPower Labs Take-Home Assessment: Original Airbnb Listing Experience

---

### Executive Overview & Assignment Objectives
This document defines the end-to-end engineering specification, UI decomposition, interaction architecture, accessibility design, and verification plan for an original, desktop-first vacation rental listing experience modeled after the reference listing:
**Reference:** [Romantic Jacuzzi 1BHK Candolim | Mirashya UG10](https://airbnb-clone-umber-two.vercel.app/)

The implementation is built using modern React 18, TypeScript, Vite, and modular CSS design tokens, applying the **SWAT Engineering Protocol** (Security, Write-Safety, Availability, and Threat Defense) and **WCAG 2.2 Level AA accessibility guidelines**.

---

## 1. SWAT Matrix & Architectural Gate Criteria

| SWAT Gate | Engineering Objective | Implementation Protocol |
| :--- | :--- | :--- |
| **Security** | Zero-trust boundary isolation & XSS defense | No `dangerouslySetInnerHTML`. All user inputs (dates, guest counts, share links) strictly sanitized via TypeScript guards. External URLs enforce `rel="noopener noreferrer"`. `localStorage` keys validated against type schemas. |
| **Write-Safety** | Element verification & focus preservation | Before triggering state changes, verify DOM accessibility. Modal dialogs enforce strict focus trapping via `useFocusTrap` and return focus to triggering element via `useFocusReturn`. Body scroll locking (`overflow: hidden`) eliminates dual-scroll artifacts. |
| **Availability** | Event loop protection & layout stability | All 43 photos delivered in optimized local WebP format with dual-tier fallback to remote CDN. Image dimensions define explicit aspect ratios (`16/10` and `4/3`) minimizing Cumulative Layout Shift. Non-hero images set `loading="lazy"` and `decoding="async"`. |
| **Threat Defense** | Edge resilience & autonomous reliability | Local asset serving provides offline resilience and protects against external CDN rate-limiting or blocking. Micro-interactions utilize standard eased transitions without unnatural synchronous jumps. |

---

## 2. Requirements & Scope Breakdown

### Primary Deliverables
1. **Three Core Viewport Experiences:**
   - **View 1: Primary Listing Page**: Complete desktop property listing with site navigation, 5-photo asymmetric hero gallery, scroll-spy sticky navigation bar, overview specs, expandable description, sleeping arrangements, amenities preview (with 54-item modal), dual-month interactive calendar, sticky floating booking card with dynamic 5-night pricing engine and guest selector, host profile with co-hosts, styled location map, guest reviews grid, house rules, and nearby stays carousel.
   - **View 2: Full-Screen Photo Tour Overlay**: Dedicated modal displaying all 43 listing photos categorized into 9 distinct room sections with live thumbnail category navigation pills, smooth anchor scrolling, and direct deep-linking into the Lightbox.
   - **View 3: Single-Photo Lightbox Modal**: Centered viewport stage with category title, dynamic counter (`X / 43`), bidirectional chevron buttons, full keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`), focus trapping, and focus restoration.
2. **Interactive Overlays & Modals:**
   - **Share Modal Dialog**: Quick copy-to-clipboard with visual toast feedback and multi-channel sharing options.
   - **Amenities Modal Dialog**: Complete categorized list of 54 amenities across 13 domains with verified inclusion/exclusion badges.
   - **Wishlist Heart Toggle**: Persistent wishlist state synced with `localStorage`, smooth SVG fill transition to `#FF385C`, and toast confirmation.
   - **Reservation Flow**: Interactive date range selection, guest breakdown (adults, children, infants, pets), dynamic pricing calculation, and reservation modal feedback.
3. **Engineering Documentation & AI Artifacts:**
   - `docs/IMPLEMENTATION_PLAN.md` (this document)
   - `docs/ARCHITECTURE.md` (Production-scale distributed system design)
   - `docs/ACCESSIBILITY.md` (WCAG 2.2 AA audit & keyboard mapping)
   - `docs/QA_CHECKLIST.md` (Comprehensive testing matrix)
   - `docs/PROMPTS.md` (Chronological prompt engineering log)
   - `.agents/agents/` (UI, Accessibility, and QA reviewer agent definitions)
   - `.agents/skills/visual-qa/SKILL.md` (Repeatable visual QA process)
   - `README.md` (Professional documentation with setup and run instructions)

---

## 3. UI Decomposition & Visual Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│ Global Header: Brand Logo | Search Bar Pill | Host Link | Profile Pill  │
├────────────────────────────────────────────────────────────────────────┤
│ Listing Header: Title ("Romantic Jacuzzi...") | Share & Save Actions    │
├────────────────────────────────────────────────────────────────────────┤
│ Hero Gallery: 5-Photo Asymmetric Grid (1 Large + 4 Small) + "Show All" │
├────────────────────────────────────────────────────────────────────────┤
│ Sticky Navigation Bar: [Photos | Amenities | Reviews | Location]       │
├──────────────────────────────────────┬─────────────────────────────────┤
│ Left Rail (Main Content ~65%):       │ Right Rail (Sticky ~35%):       │
│ • Property Overview & Specs          │ • Sticky Floating Booking Card  │
│ • Guest Favourite Laurel Badge       │   - Price per night (₹5,700)   │
│ • Host Mini-Profile                  │   - Rating & Review count       │
│ • Highlights (Jacuzzi, Location)     │   - Check-in / Checkout Selector│
│ • Description (Expandable with Fade) │   - Guest Selector Popover      │
│ • Sleeping Arrangements              │   - "Reserve" Gradient CTA      │
│ • Amenities Preview + "Show all 54"  │   - Price Breakdown & Total     │
│ • Dual-Month Interactive Calendar    │                                 │
├──────────────────────────────────────┴─────────────────────────────────┤
│ Full-Width Bottom Modules:                                             │
│ • Reviews Summary & 6 Detailed Review Cards                            │
│ • Location Map & Candolim Neighborhood Guide                           │
│ • Meet Your Host: Mirashya Homes Profile, Co-hosts & Stats             │
│ • Things to Know: House Rules, Safety & Property, Cancellation Policy   │
│ • Nearby Stays: 8-Listing Interactive Carousel                         │
├────────────────────────────────────────────────────────────────────────┤
│ Global Footer: Privacy, Terms, Company, Currency & Language Selectors   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Component Architecture Plan

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── UserMenu.tsx
│   │   └── Header.module.css
│   ├── ListingHeader/
│   │   ├── ListingHeader.tsx
│   │   └── ListingHeader.module.css
│   ├── HeroGallery/
│   │   ├── HeroGallery.tsx
│   │   └── HeroGallery.module.css
│   ├── Navigation/
│   │   ├── StickyNav.tsx
│   │   └── StickyNav.module.css
│   ├── ListingDetails/
│   │   ├── Overview.tsx
│   │   ├── HostHeader.tsx
│   │   ├── Highlights.tsx
│   │   ├── Description.tsx
│   │   ├── SleepingArrangements.tsx
│   │   └── ListingDetails.module.css
│   ├── Amenities/
│   │   ├── AmenitiesPreview.tsx
│   │   ├── AmenitiesModal.tsx
│   │   └── Amenities.module.css
│   ├── BookingCard/
│   │   ├── BookingCard.tsx
│   │   ├── DatePickerPopover.tsx
│   │   ├── GuestSelectorPopover.tsx
│   │   ├── PricingBreakdown.tsx
│   │   └── BookingCard.module.css
│   ├── Calendar/
│   │   ├── CalendarSection.tsx
│   │   └── Calendar.module.css
│   ├── Reviews/
│   │   ├── ReviewsSection.tsx
│   │   ├── ReviewCard.tsx
│   │   └── Reviews.module.css
│   ├── Location/
│   │   ├── LocationSection.tsx
│   │   └── Location.module.css
│   ├── Host/
│   │   ├── HostFullSection.tsx
│   │   └── Host.module.css
│   ├── ThingsToKnow/
│   │   ├── ThingsToKnowSection.tsx
│   │   └── ThingsToKnow.module.css
│   ├── NearbyStays/
│   │   ├── NearbyStaysCarousel.tsx
│   │   └── NearbyStays.module.css
│   ├── PhotoTour/
│   │   ├── PhotoTourModal.tsx
│   │   ├── CategoryNav.tsx
│   │   └── PhotoTour.module.css
│   ├── Lightbox/
│   │   ├── LightboxModal.tsx
│   │   └── Lightbox.module.css
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── Footer.module.css
│   └── common/
│       ├── Modal.tsx
│       ├── Toast.tsx
│       ├── ShareModal.tsx
│       └── Icons.tsx
│
├── hooks/
│   ├── useLightbox.ts
│   ├── useKeyboardNavigation.ts
│   ├── useFocusTrap.ts
│   ├── useFocusReturn.ts
│   ├── useScrollSpy.ts
│   └── useLocalStorage.ts
│
├── data/
│   └── listing.ts
│
├── types/
│   └── listing.ts
│
├── styles/
│   ├── tokens.css
│   ├── globals.css
│   └── utilities.css
│
├── App.tsx
└── main.tsx
```

---

## 5. Design Tokens & Styling System

The visual design system is parameterized in `src/styles/tokens.css`:

```css
:root {
  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 22px;
  --font-size-2xl: 26px;
  --font-size-3xl: 32px;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Colors */
  --color-text-primary: #222222;
  --color-text-secondary: #717171;
  --color-text-light: #B0B0B0;
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F7F7F7;
  --color-border-light: #EBEBEB;
  --color-border-medium: #DDDDDD;
  --color-border-dark: #222222;
  --color-brand: #FF385C;
  --color-brand-gradient: linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%);
  --color-accent-gold: #E07912;
  --color-overlay: rgba(0, 0, 0, 0.6);

  /* Spacing */
  --space-xxs: 4px;
  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 80px;

  /* Layout */
  --max-content-width: 1120px;
  --max-header-width: 1280px;
  --header-height: 80px;
  --sticky-nav-height: 50px;

  /* Radii */
  --radius-xs: 4px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.08);
  --shadow-card: 0 6px 16px rgba(0, 0, 0, 0.12);
  --shadow-hover: 0 6px 20px rgba(0, 0, 0, 0.16);
  --shadow-modal: 0 8px 28px rgba(0, 0, 0, 0.28);

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.2, 0, 0, 1);
  --transition-normal: 200ms cubic-bezier(0.2, 0, 0, 1);
  --transition-slow: 350ms cubic-bezier(0.2, 0, 0, 1);
}
```

---

## 6. Interaction & State Management Plan

### State Model Architecture
State is maintained locally and lifted to `App.tsx` only where cross-component synchronization is required:

```typescript
interface AppState {
  // Modal & Overlay View Management
  activeModal: 'none' | 'photo-tour' | 'lightbox' | 'amenities' | 'share' | 'reservation-confirmed';
  
  // Lightbox State
  lightboxIndex: number;
  lightboxOrigin: 'hero' | 'tour';
  
  // Wishlist & Saved State
  isSaved: boolean;
  
  // Booking Parameters
  checkinDate: string; // "10/18/2026"
  checkoutDate: string; // "10/23/2026"
  guestCounts: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
  
  // Active Navigation Anchor
  activeNavSection: 'photos' | 'amenities' | 'reviews' | 'location';
  
  // Toast Notification
  toastMessage: string | null;
}
```

### Lightbox State Transition Matrix
```
[Listing Page] ──(Click Hero Image)─────────► [Lightbox Modal (Index N)]
[Listing Page] ──(Click "Show all photos")──► [Photo Tour Modal]
[Photo Tour]   ──(Click Category Photo)─────► [Lightbox Modal (Index N)]
[Lightbox]     ──(Press ArrowLeft/Right)────► [Lightbox Modal (Index N ± 1)]
[Lightbox]     ──(Press Escape / Close)─────► Return to Origin (Tour or Listing)
[Photo Tour]   ──(Press Escape / Close)─────► [Listing Page] (Restore Scroll)
```

---

## 7. Accessibility Engineering Plan (WCAG 2.2 AA)

1. **Semantic HTML**:
   - `header`, `nav`, `main`, `section`, `article`, `footer`, `aside`.
   - All interactive controls are strictly `<button>` or `<a href>` elements. Zero clickable `div` or `span` elements without semantic role and keyboard handlers.
2. **Accessible Dialogs (`role="dialog"`, `aria-modal="true"`)**:
   - Unique `aria-labelledby` or `aria-label` identifying each dialog.
   - Body scroll lock toggling `document.body.style.overflow = 'hidden'`.
   - Focus trap (`useFocusTrap`) cycling Tab and Shift+Tab exclusively within the active dialog.
   - Focus restoration (`useFocusReturn`) returning browser focus to the exact button or tile that triggered the dialog.
3. **Keyboard Controls**:
   - `Escape`: Instantly dismisses active dialog or dropdown popover.
   - `ArrowLeft` / `ArrowRight`: Navigate previous and next photo in Lightbox with live counter announcement (`aria-live="polite"`).
   - `Enter` / `Space`: Activates buttons, accordion toggles, and photo tiles.
4. **Visual Focus Indicators**:
   - High-contrast 2px solid `#222222` outline with 2px offset on all interactive elements via `:focus-visible`.

---

## 8. Step-by-Step Implementation Sequence

1. **Step 1: Scaffolding & Design System**:
   - Verify Node/Vite build environment.
   - Setup `src/styles/tokens.css`, `src/styles/globals.css`, and `src/styles/utilities.css`.
2. **Step 2: Type System & Listing Data Model**:
   - Audit and refine `src/types/listing.ts` and `src/data/listing.ts`.
3. **Step 3: Core Hooks & Utilities**:
   - Create `useFocusTrap.ts`, `useFocusReturn.ts`, `useKeyboardNavigation.ts`, `useScrollSpy.ts`, `useLocalStorage.ts`.
4. **Step 4: Global Header & Search Pill**:
   - Implement `Header.tsx`, `SearchBar.tsx`, `UserMenu.tsx`.
5. **Step 5: Listing Header & Action Buttons**:
   - Implement `ListingHeader.tsx` with Share Modal trigger and animated Wishlist heart toggle.
6. **Step 6: 5-Photo Asymmetric Hero Gallery**:
   - Implement `HeroGallery.tsx` with 2fr/1fr/1fr grid, hover dimming, and "Show all photos" floating pill.
7. **Step 7: Sticky Scroll-Spy Navigation**:
   - Implement `StickyNav.tsx` with dynamic threshold observation, active tab spying, price recap, and reserve CTA.
8. **Step 8: Left-Rail Content Modules**:
   - Implement `Overview.tsx`, `Highlights.tsx`, `Description.tsx` (with gradient clamp), `SleepingArrangements.tsx`.
9. **Step 9: Amenities Preview & Full Modal**:
   - Implement `AmenitiesPreview.tsx` and `AmenitiesModal.tsx` covering all 54 items across 13 categories.
10. **Step 10: Dual-Month Calendar**:
    - Implement `CalendarSection.tsx` with range selection, check-in/checkout dates, and clear dates button.
11. **Step 11: Floating Sticky Booking Card**:
    - Implement `BookingCard.tsx` with `DatePickerPopover.tsx`, `GuestSelectorPopover.tsx`, dynamic price breakdown, and reserve CTA.
12. **Step 12: Bottom Modules**:
    - Implement `ReviewsSection.tsx` (rating breakdown + 6 review cards), `LocationSection.tsx` (map + Candolim guide), `HostFullSection.tsx`, `ThingsToKnowSection.tsx`, `NearbyStaysCarousel.tsx`.
13. **Step 13: View 2 - Full-Screen Photo Tour Overlay**:
    - Implement `PhotoTourModal.tsx` and `CategoryNav.tsx` with sticky category thumbnail navigation and 43 photos in 9 sections.
14. **Step 14: View 3 - Accessible Lightbox Modal**:
    - Implement `LightboxModal.tsx` with image stage, counter, bidirectional arrows, keyboard navigation, and CDN fallback.
15. **Step 15: Common Modals & Toasts**:
    - Implement `ShareModal.tsx`, `Toast.tsx`, and reservation confirmation modal.
16. **Step 16: Documentation Suite**:
    - Generate `docs/ARCHITECTURE.md`, `docs/ACCESSIBILITY.md`, `docs/QA_CHECKLIST.md`, `docs/PROMPTS.md`, `.agents/agents/`, `.agents/skills/`, and `README.md`.
17. **Step 17: SWAT Quality Gate & Final Build Verification**:
    - Run TypeScript compiler checks and Vite production build (`npm run build`).

---

## 9. Comprehensive QA & Verification Matrix

- [x] **Build Verification**: `npm run build` compiles clean with zero TypeScript errors or warnings.
- [x] **Visual Parity**: 5-tile hero gallery grid, sticky navigation bar, booking card layout, and typography match the reference.
- [x] **Asset Delivery**: All 43 photos load reliably in WebP format with zero broken images.
- [x] **State Machine Integrity**: Seamless transitions between Listing Page, Photo Tour, and Lightbox without state de-sync.
- [x] **Keyboard Navigation**: `ArrowLeft`, `ArrowRight`, `Escape`, `Tab`, and `Enter` functional on all interactive modules and dialogs.
- [x] **Focus Management**: Focus strictly contained within modals and restored to trigger on close.
- [x] **Storage Persistence**: Wishlist state persists across browser page reloads via `localStorage`.
- [x] **Edge Cases**: Zero guests / maximum guests limits enforced; date range inversion prevented; first/last image boundaries handled.

