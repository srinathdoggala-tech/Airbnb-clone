---
name: expert_airbnb_cloning
description: High-fidelity visual and behavioural cloning protocol for modern vacation rental platforms (Airbnb) adhering to the SWAT quality and security matrix, React component architecture, and WebP asset pipelines.
---

# Expert Airbnb Cloning Protocol (FAANG Principal Standard)

This skill guides AI coding agents in designing, implementing, and verifying pixel-perfect, high-performance clones of vacation-rental platforms (such as Airbnb) with zero layout shifts, strict accessibility (WCAG 2.2 AA), and high-throughput asset pipelines.

## 1. Visual & Behavioral Parity Benchmark

Every clone implementation must adhere to three mandatory viewport/overlay states:

1. **Primary Listing Page**:
   - **5-Tile Hero Gallery Grid**: Asymmetric 2fr / 1fr / 1fr layout with primary photo spanning rows 1-2, sub-tiles spanning rows 1 and 2, hover scale (`transform: scale(1.04)`), and "Show all photos" floating trigger.
   - **Sticky Navigation**: Appears dynamically via `IntersectionObserver` when scrolling past hero gallery bottom threshold; tabs spy active section; includes price recap and primary reservation CTA.
   - **Interactive Elements**:
     - Wishlist Heart Toggle: Smooth SVG fill transition to `--accent-solid: #FF385C`, persistent `localStorage` synchronization, and status toast.
     - Description Expand/Collapse: Truncated pre-line text with bottom linear-gradient fade overlay and rotating chevron indicator.
     - Dual-Month Availability Calendar: Standard Sunday-Saturday grid, pre-selected date range highlights (`.selected`, `.in-range`), and disabled past date states.
     - More Stays Nearby: Horizontal sliding multi-page carousel with paged indicator (`X / Y`) and disabled boundary controls.

2. **Full-Screen Photo Tour Overlay**:
   - Fixed full-screen modal (`role="dialog"`, `aria-modal="true"`) with sticky header, back button, and category navigation strip.
   - Category navigation buttons with live image thumbnails smoothly scrolling to corresponding room category sections.
   - Distinct layout: Large feature photo followed by paired 2-column photo rows.
   - Deep linking: Clicking any photo immediately routes into the Lightbox view at that photo's exact global index.

3. **Single-Photo Lightbox Viewer**:
   - Centered stage with isolated image viewport, smooth fade transitions (`@keyframes lb-fade`), and drop shadow.
   - Top bar: Centered category title, progressive counter (`X of 43`), and close button.
   - Bidirectional chevron arrows with hover elevation and boundary disabling (`disabled` on index `0` and index `max`).
   - Strict keyboard accessibility: `ArrowLeft` (previous), `ArrowRight` (next), and `Escape` (dismiss).

---

## 2. The SWAT Engineering Audit Matrix

Before any code modification or deployment, agents must verify compliance against the SWAT matrix:

### Security (Boundary Defense)
- Enforce strict input sanitization on all user-controlled text (e.g. search queries, guest numbers, dates).
- Never use `dangerouslySetInnerHTML` with unsanitized payloads.
- External links must include `rel="noopener noreferrer"`.
- Prevent LocalStorage prototype pollution by validating stored JSON/primitives with runtime schemas.

### Write-Safety (DOM Verification)
- Verify element states (`disabled`, `aria-expanded`, `aria-hidden`) prior to dispatching state mutations.
- Modals must implement active focus trapping (`useFocusTrap`) preventing background focus bleeding.
- Ensure focus restoration to trigger buttons upon modal dismissal.
- Apply `body.style.overflow = 'hidden'` on open overlays to eliminate dual-scroll jitter.

### Availability (The Node & Browser Event Loop)
- Convert all media to optimized **WebP** assets with progressive loading and explicit aspect ratios (`aspect-ratio: 16/10` or `4/3`) to guarantee **CLS = 0**.
- Use `decoding="async"` and `loading="lazy"` on non-hero imagery.
- All scroll listeners and `IntersectionObserver` instances must be cleanly disconnected on unmount.

### Threat (Bot Evasion & Edge Resilience)
- Support zero-network local asset serving with fallback to remote CDN URLs.
- Automation scripts must include randomized Gaussian delays (50–150ms) and bezier cursor movements when interacting through headless browsers.

---

## 3. Design System & CSS Token Registry

```css
:root {
  --ink: #222222;
  --ink-soft: #484848;
  --muted: #717171;
  --line: #DDDDDD;
  --line-soft: #EBEBEB;
  --accent: #E61E4D;
  --accent-2: #D70466;
  --accent-solid: #FF385C;
  --radius-lg: 16px;
  --radius-md: 12px;
  --radius-sm: 8px;
  --maxw: 1120px;
  --shadow-card: 0 6px 16px rgba(0, 0, 0, 0.12);
  --dur: 200ms;
  --ease: cubic-bezier(0.2, 0, 0, 1);
}
```

---

## 4. Verification & QA Checklist

- [ ] `npm run build` succeeds with zero errors and zero warnings.
- [ ] Visual match verified against reference screenshots (`ref_image1.png`, `ref_image2.png`, `ref_image3.png`).
- [ ] All 43 listing photos load as WebP without 404s.
- [ ] Keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`, `Tab`, `Enter`) functional on all overlays.
- [ ] Wishlist state persists across browser refreshes via `localStorage`.
- [ ] Responsive behavior audited down to tablet and mobile viewports.
