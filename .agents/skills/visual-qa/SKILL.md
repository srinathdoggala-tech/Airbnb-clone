---
name: visual-qa
description: Standard Operating Procedure (SOP) for automated, repeatable visual and behavioral regression testing of vacation rental frontend applications.
---

# Visual QA Verification Protocol (SOP)

This skill defines the repeatable step-by-step procedure for auditing frontend visual fidelity, layout stability, and interaction mechanics using autonomous browser automation.

---

## 1. Pre-Flight Environment Verification
1. Ensure the development or preview server is actively listening on local port (e.g. `http://localhost:4173/` or `http://localhost:3000/`).
2. Verify that all 43 local WebP assets are reachable without HTTP 404 errors.
3. Maximize browser viewport to a standard desktop resolution ($1440 \times 900$ or $1920 \times 1080$).

---

## 2. Visual Regression Audit Steps

### Step 1: Main Listing Page Structure
- Capture full-page screenshot (`main_listing_page.png`).
- Verify container width (`max-width: 1120px`), centered alignment, and 24px horizontal gutters.
- Verify 5-photo hero gallery grid geometry: 2fr primary photo spanning 2 rows, 1fr supporting tiles.
- Verify sticky booking card position (`top: 100px`, `box-shadow: var(--shadow-card)`).

### Step 2: Scroll Dynamics & Sticky Navigation
- Scroll page down by 600px past hero gallery bottom threshold.
- Verify sticky subnavigation bar slides into view from top (`transform: translateY(0)`).
- Verify section tabs spy active scroll position:
  - Scrolling to `#amenities` highlights "Amenities" tab with bottom black border.
  - Scrolling to `#reviews` highlights "Reviews" tab.
  - Scrolling to `#location` highlights "Location" tab.

### Step 3: Photo Tour Full-Screen Modal Overlay
- Click floating button `"Show all 43 photos"`.
- Verify full-screen overlay mounts with `role="dialog"` and `aria-modal="true"`.
- Confirm body scroll lock is engaged (`document.body.style.overflow === 'hidden'`).
- Verify 9 category navigation pills render and clicking each scrolls to corresponding room section.
- Verify all room photos display without broken image placeholders.

### Step 4: Single-Photo Lightbox Modal Viewer
- Click any photo tile inside the Photo Tour or Hero Gallery.
- Verify single-photo stage appears with dark backdrop, centered photo, and dynamic counter (`X / 43`).
- Press `ArrowRight`: Verify active photo advances by 1 and counter increments.
- Press `ArrowLeft`: Verify active photo decrements by 1.
- Press `Escape`: Verify Lightbox dismisses immediately, restoring focus to previous active element.

### Step 5: Interactive Overlays & Storage Persistence
- Click `"Save"` heart button: Verify heart fills red (`#FF385C`), toast notification appears, and reload page to confirm persistence in `localStorage`.
- Click `"Reserve"` button on Booking Card: Verify confirmation modal displays summary pricing (`₹28,499`) and dates.
- Click `"Share"` button: Verify share modal opens and copy-link triggers confirmation toast.

---

## 3. Exit Criteria
- [ ] Zero visual clipping or horizontal scrollbars on desktop viewports.
- [ ] Minimal layout shift observed with image dimensions explicitly defined.
- [ ] Complete keyboard operability validated with zero focus bleeding.
- [ ] TypeScript compiler (`tsc --noEmit`) and bundle build (`npm run build`) pass cleanly.
