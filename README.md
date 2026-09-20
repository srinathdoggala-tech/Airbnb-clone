# Vacation Rental Listing Experience — Romantic Jacuzzi 1BHK Candolim

## PlayPower Labs Software Engineer Take-Home Assessment

A desktop-focused vacation rental listing web application reproducing the visual appearance, component hierarchy, and interaction behaviors of the reference property listing:

* **Property**: *Romantic Jacuzzi 1BHK Candolim | Mirashya UG10* (Candolim, Goa, India)
* **Reference Experience**: [https://airbnb-clone-umber-two.vercel.app/](https://airbnb-clone-umber-two.vercel.app/)
* **Repository**: [https://github.com/srinathdoggala-tech/Airbnb-clone.git](https://github.com/srinathdoggala-tech/Airbnb-clone.git)

---

## 1. Project Overview
This application is a pure frontend React application built for the PlayPower Labs take-home assessment. Designed specifically for desktop viewports, it implements the three primary views specified by the assignment: the main property listing page, a full-screen categorized photo tour modal, and a single-photo lightbox viewer with keyboard navigation.

---

## 2. Features & Key Experiences

### View 1: Primary Listing Page
- **Header**: Airbnb logo, search bar pill ("Anywhere · Any week · Add guests"), and user menu.
- **Hero Gallery**: 5-tile asymmetric grid (1 large photo spanning two rows, 4 secondary tiles) with hover scale, dimming, and "Show all 43 photos" action button.
- **Sticky Subnavigation**: Spies scroll position past the hero gallery, tracking active sections (`#photos`, `#amenities`, `#reviews`, `#location`) and presenting a condensed price recap with a Reserve CTA.
- **Property Details**: Guest specifications (3 guests, 1 bedroom, 1 bed, 1 bathroom), "Guest favourite" badge with rating metrics, host overview, description with expand/collapse toggle, sleeping arrangements, and amenities preview (10 top amenities with icons).
- **Dual-Month Calendar**: Interactive two-month view (October & November 2026) with pre-selected date range (18 Oct – 23 Oct 2026) and "Clear dates" action.
- **Sticky Booking Card**: Floating card fixed on scroll (`top: 100px`) featuring nightly rate (`₹5,700`), rating summary, check-in/checkout date popover, guest selector popover (adults, children, infants, pets), itemized price calculation, and reserve action.
- **Bottom Modules**: Detailed reviews with individual rating breakdown categories, location description and map placeholder, comprehensive host profile with co-hosts, things to know (house rules, safety, cancellation policy), and an 8-card nearby stays carousel.

### View 2: Full-Screen Photo Tour Modal
- Full-screen white overlay launched from "Show all 43 photos" or any hero photo.
- Sticky category navigation bar linking to 9 distinct room categories (Living room 1 & 2, Full kitchen, Bedroom, Full bathroom, Gym, Exterior, Pool, Additional photos).
- Renders all 43 property photos with room tags, descriptions, and click-to-lightbox navigation.
- Body scroll locking and Escape key / Back button dismissal.

### View 3: Single-Photo Lightbox Modal
- High-focus viewer with dark background and centered image.
- Navigation chevrons for previous and next photo with boundary handling (disabled on boundaries).
- Slide counter indicator (`X / 43`) with `aria-live="polite"` announcement.
- Origin-aware close behavior: returning to the Photo Tour if opened from the tour, or to the listing page if opened from the hero gallery.

### Interactive Utility Modals
- **Share Modal**: Social sharing triggers and direct link copy to clipboard.
- **Reservation Confirmation**: Displays booking summary details and itemized pricing upon clicking Reserve.
- **Wishlist Toggle**: Heart button toggles save state and persists to browser `localStorage`.

---

## 3. Technology Stack
- **Framework**: React 18 (`18.3.1`)
- **Language**: TypeScript (`5.7.2`) with strict type checking
- **Build Tooling**: Vite (`6.0.7`)
- **Styling**: Vanilla CSS Modules (`.module.css`) with global design tokens (`src/styles/tokens.css`)
- **Icons**: Custom accessible SVG icons (`src/components/common/Icons.tsx`)
- **Storage**: Browser `localStorage` for wishlist persistence
- **Testing**: Node.js built-in test runner (`node:test`, `node:assert/strict`)

---

## 4. Architecture Summary
The frontend architecture follows a component-driven pattern with centralized modal state machine orchestration:
- **Application Root (`src/App.tsx`)**: Controls modal mutual exclusivity (`activeModal`), tracks photo indices, manages wishlist state, and binds global scroll spy hooks.
- **Component Layer (`src/components/`)**: Modular, isolated components with scoped CSS modules, eliminating global styling collisions.
- **Data Layer (`src/data/listing.ts`)**: Strongly-typed listing dataset with normalized photo arrays, amenity groupings, and pricing structures.
- **Hooks Layer (`src/hooks/`)**: Reusable logic for focus trapping (`useFocusTrap`), focus restoration (`useFocusReturn`), keyboard listeners (`useKeyboardNavigation`), and scroll position spying (`useScrollSpy`).

Alongside the frontend application, a conceptual distributed systems architecture for a production-scale vacation-rental marketplace is detailed in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and illustrated in [architecture_diagram.png](architecture_diagram.png).

---

## 5. Accessibility Features
The application incorporates key accessibility standards aligned with WAI-ARIA authoring practices:
- **Landmark Structure**: Semantic HTML5 tags (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`).
- **Interactive Controls**: Built strictly with `<button>` and `<a>` elements with visible `:focus-visible` outline rings.
- **Modal Dialog Semantics**: Overlay containers declare `role="dialog"`, `aria-modal="true"`, and descriptive `aria-label`.
- **Focus Management**: Active modal overlays trap focus via `useFocusTrap` and restore focus to trigger elements on close via `useFocusReturn`.
- **Keyboard Navigation**: Full support for `Tab`, `Shift+Tab`, `ArrowLeft`, `ArrowRight` (in Lightbox), and `Escape` (modal dismissal).
- **Text Alternatives**: Populated `alt` text on all 43 listing photos.

Detailed accessibility documentation is available in [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md).

---

## 6. AI-Assisted Development Workflow
This project was implemented using an AI-native engineering workflow. A transparent log of prompts actually executed during this development and documentation process is recorded in [docs/PROMPTS.md](docs/PROMPTS.md).

Modular reviewer agent configurations and skill standards used during development are located in:
- `.agents/agents/ui-reviewer.md`
- `.agents/agents/accessibility-reviewer.md`
- `.agents/agents/qa-reviewer.md`
- `.agents/skills/visual-qa/SKILL.md`

---

## 7. Project Structure
```text
├── .agents/                    # Agent reviewer configs and visual QA skills
│   ├── agents/
│   │   ├── accessibility-reviewer.md
│   │   ├── qa-reviewer.md
│   │   └── ui-reviewer.md
│   └── skills/
│       └── visual-qa/
│           └── SKILL.md
├── docs/                       # Technical assessment documentation
│   ├── ACCESSIBILITY.md
│   ├── ARCHITECTURE.md
│   ├── IMPLEMENTATION_PLAN.md
│   ├── IMPLEMENTATION_REVIEW.md
│   ├── PROJECT_AUDIT.md
│   ├── PROMPTS.md
│   ├── QA_CHECKLIST.md
│   ├── REQUIREMENTS.md
│   └── VISUAL_QA.md
├── public/                     # Static assets
│   └── assets/
│       ├── images/             # Icons, map placeholders, badges
│       ├── nearby/             # 8 nearby stay preview images
│       └── photos/             # 43 optimized WebP property photos
├── src/                        # Application source code
│   ├── components/             # React modular components
│   │   ├── Amenities/
│   │   ├── BookingCard/
│   │   ├── Calendar/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── HeroGallery/
│   │   ├── Host/
│   │   ├── Lightbox/
│   │   ├── ListingDetails/
│   │   ├── ListingHeader/
│   │   ├── Location/
│   │   ├── Navigation/
│   │   ├── NearbyStays/
│   │   ├── PhotoTour/
│   │   ├── Reviews/
│   │   ├── ThingsToKnow/
│   │   └── common/
│   ├── data/                   # Listing data and metadata
│   ├── hooks/                  # Custom accessibility & navigation hooks
│   ├── styles/                 # Global tokens and utility CSS
│   ├── tests/                  # Automated verification test suite
│   ├── types/                  # Strict TypeScript interfaces
│   ├── App.tsx                 # Root application orchestration
│   └── main.tsx                # React entry point
├── architecture_diagram.png    # High-level production architecture diagram
├── architecture_diagram.svg    # Vector production architecture diagram
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 8. Local Setup
### Prerequisites
- Node.js 18+ (tested on Node.js v24.19.0)
- npm 9+ or pnpm 8+

### Installation
```bash
# 1. Clone repository
git clone https://github.com/srinathdoggala-tech/Airbnb-clone.git
cd Airbnb-clone

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# -> Opens on http://localhost:5173/
```

---

## 9. Build & Verification Commands

### Automated Test Suite
```bash
npm test
# Executes Node.js native test runner on src/tests/listing.test.js
```

### TypeScript Compiler Check
```bash
npx tsc --noEmit
# Verifies zero type errors across the entire codebase
```

### Production Build
```bash
npm run build
# Compiles optimized bundle into dist/
```

### Local Preview of Production Build
```bash
npm run preview -- --port 4173
# Serves dist/ bundle locally on http://localhost:4173/
```

---

## 10. Verification Performed
- **Automated Tests**: 36 automated unit and integration tests across 9 test suites in `src/tests/listing.test.js` validating listing data, hero photo indices, all 43 WebP photo files on disk (>5KB), 8 nearby stay images, date selection edge cases, guest count limits, booking pricing recalculation, wishlist persistence, social sharing URLs, multi-level modal focus restoration, and keyboard navigation matrices.
- **Type Checking**: `tsc --noEmit` verified 0 compiler errors.
- **Bundle Generation**: `npm run build` compiled cleanly in ~3.69s.
- **Browser Automation Smoke Test**: Executed 15 test items against `http://localhost:4173/` covering listing load, hero gallery, photo tour open/close, lightbox navigation, keyboard arrow keys (`ArrowLeft`, `ArrowRight`), escape dismissal, focus trapping/restoration, date and guest popovers, reservation confirmation, and wishlist persistence.

Detailed results are logged in [docs/QA_CHECKLIST.md](docs/QA_CHECKLIST.md).

---

## 11. Known Limitations
- **Scope**: Designed and tested strictly for desktop viewports ($1120\text{px}+$ container width); mobile responsiveness was excluded per the assessment instructions.
- **Screen Reader Evaluation**: WAI-ARIA attributes and semantic elements were verified via DOM inspection and keyboard navigation; direct testing with dedicated screen reader software (e.g. JAWS, NVDA) was not performed.
- **Backend & Checkout**: Application is pure frontend; booking reservations and wishlist toggling are simulated via UI modals and browser `localStorage`.
