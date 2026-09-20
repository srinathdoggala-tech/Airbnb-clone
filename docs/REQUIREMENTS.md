# Assignment Requirements Specification

## PlayPower Labs Software Engineer Take-Home: Vacation Rental Listing Clone

This document synthesizes the explicit requirements from the PlayPower Labs take-home assessment specification.

---

### A. Required Views
1. **Primary Listing Page**:
   - Complete property page for *Romantic Jacuzzi 1BHK Candolim | Mirashya UG10*.
   - Asymmetric hero photo gallery displaying property highlights with "Show all photos" button.
   - Property overview, specifications (guests, bedrooms, beds, bathrooms), highlights, description, sleeping arrangements, amenities preview, dual-month calendar, reviews, map/location, host profile, things to know, and nearby stays.
   - Floating sticky booking card with pricing breakdown, date selector, and guest selector.
   - Sticky subnavigation bar that tracks scrolling sections.
2. **Photo Tour Modal (View 2)**:
   - Full-screen photo gallery overlay launched by clicking "Show all [count] photos" or any hero gallery photo.
   - Categorized layout grouping property photos by room/area (e.g. Living room, Full kitchen, Bedroom, Full bathroom, etc.).
   - Header with dismiss/close navigation button.
   - Clicking any photo within the tour opens the Lightbox viewer for that specific photo.
3. **Lightbox Modal (View 3)**:
   - Focused single-photo viewing overlay.
   - Previous and next navigation controls (buttons and keyboard navigation).
   - Photo index indicator (e.g. `X / 43`).
   - Close/dismiss control returning focus to the originating context.

---

### B. Required Interactions
1. **Gallery & Modal Navigation**:
   - Launching Photo Tour from hero gallery and floating button.
   - Launching Lightbox directly from hero photos or from within the Photo Tour.
   - Seamless dismissal of modals returning user to the prior view state.
2. **Keyboard Navigation**:
   - `ArrowLeft` and `ArrowRight` keys navigate previous/next photos in the Lightbox viewer.
   - `Escape` key closes the active modal (Lightbox, Photo Tour, Amenities modal, Share modal).
3. **Booking & Popover Controls**:
   - Date picker popover opening from check-in / checkout inputs.
   - Guest selector popover allowing adult, child, infant, and pet count increments/decrements respecting maximum guest limits.
   - Live recalculation of nights and total price.
4. **Scroll & Tab Interactions**:
   - Sticky navigation bar appearing upon scrolling past the hero gallery.
   - Active tab indicator tracking viewport scroll position across `#photos`, `#amenities`, `#reviews`, and `#location`.
   - "Show more / Show less" toggling for truncated description and full amenities.
5. **Wishlist & Share**:
   - Wishlist toggle persisting state in browser local storage.
   - Share modal displaying sharing channels and link copy action.

---

### C. Accessibility Requirements
1. **Semantic HTML**: Proper use of landmarks (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`, `<dialog>` / modal containers).
2. **Interactive Elements**: Use of native `<button>` and `<a>` elements for actionable controls with visible keyboard focus rings.
3. **Accessible Naming**: Descriptive `aria-label` attributes on icon-only buttons (close buttons, carousel chevrons, wishlist toggle, share trigger).
4. **Dialog Semantics**: Modal containers marked with `role="dialog"` or `role="region"`, `aria-modal="true"`, and appropriate `aria-labelledby` / `aria-label`.
5. **Focus Management**: Focus entering modals upon opening, trapping keyboard focus within active overlays, and restoring focus to trigger elements upon close.
6. **Alternative Text**: Informative `alt` text on property photos, map previews, and avatars.

---

### D. Visual Requirements
1. **Fidelity to Reference**: Match the visual appearance of the reference (`https://airbnb-clone-umber-two.vercel.app`):
   - Typography, font sizing, weights, and color contrast.
   - Spacing, padding, grid layouts, and max content container width (~1120px).
   - Border colors, border radii (e.g. rounded cards, rounded pill buttons), and drop shadows.
   - Airbnb brand colors (accent coral/pink gradient for reserve CTA, subtle gray borders, neutral dark text).
2. **Smooth Motion & Transitions**:
   - Hover scale and dimming on hero gallery tiles.
   - Smooth slide and fade transitions for popovers and sticky navigation bar.
   - Carousel sliding for nearby stays.

---

### E. Architecture & Documentation Requirements
1. **High-Level Architecture Diagram**:
   - High-level architecture diagram and design document for a production-scale vacation-rental marketplace (e.g. Airbnb scale).
   - Illustrate scaling strategies for frontend, API gateway, core services, storage, search, caching, event bus, and deployment.
   - Provide diagram in image/vector format (`architecture_diagram.png` / `architecture_diagram.svg`) alongside explanatory documentation (`docs/ARCHITECTURE.md`).
2. **Technical Documentation**:
   - `docs/PROJECT_AUDIT.md`: Provenance, baseline state, and audit.
   - `docs/IMPLEMENTATION_REVIEW.md`: Prioritized code and architecture review.
   - `docs/ACCESSIBILITY.md`: Implemented accessibility features and limitations.
   - `docs/VISUAL_QA.md`: Visual verification and fidelity record.
   - `docs/QA_CHECKLIST.md`: Formal verification checklist.
   - `README.md`: Comprehensive project overview, setup, and build instructions.

---

### F. AI Workflow Requirements
1. **AI-Native Development Log (`docs/PROMPTS.md`)**:
   - Transparent record of prompts actually used during development.
   - Document objectives, prompt text, results, developer review, and verification.
2. **Agent / Skill Configurations**:
   - Provide modular agent reviewer definitions (`.agents/agents/`) and skill SOPs (`.agents/skills/`) utilized for UI review, accessibility auditing, and visual QA.

---

### G. Submission Requirements
1. **Clean Codebase**: Original, maintainable React code without plagiarized code or direct lift-and-shift.
2. **Deliverables**:
   - Zipped repository containing the source code, assets, documentation, and architecture diagram.
   - Sequence of prompts and AI logs.
3. **Public Repository Policy**: **Do not push code to a public GitHub repository** per assessment instructions.

---

### H. Known Constraints & Scope Boundaries
1. **Desktop Focus**: Assessment explicitly specifies **Desktop only**; mobile viewport responsiveness is not required.
2. **Pure Frontend Architecture**: Backend is optional. Browser storage (`localStorage`) is permitted for state persistence.
3. **Data Grounding**: Static dataset grounded in the real reference property (*Romantic Jacuzzi 1BHK Candolim | Mirashya UG10*).
