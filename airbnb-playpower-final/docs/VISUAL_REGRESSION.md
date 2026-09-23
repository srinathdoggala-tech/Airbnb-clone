# Visual Regression & Quantitative Bounding Box Audit

## PlayPower Labs Airbnb Listing Take-Home Assessment
**Target Viewport**: `1366 × 768` (Standard Airbnb Desktop Baseline)  
**Host Application**: `http://localhost:4173/` (Vite Production Preview)  
**Capture Methodology**: Automated Headless Browser Session with high-precision DOM inspection (`getBoundingClientRect()`)

---

### 1. Viewport & Primary Layout Metrics

| Layout Boundary | Target Reference | Computed / Rendered Value | Delta | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Viewport Width** | `1366px` | `1366px` (`window.innerWidth: 1350px` inside scrollbar frame) | `0px` | **PASS** |
| **Viewport Height** | `768px` | `768px` | `0px` | **PASS** |
| **Global Header Height** | `80px` | `80.00px` (`<header class="_header_1ph6c_1">`) | `0px` | **PASS** |
| **Content Container Max-Width** | `1120px` | `1120.00px` (`<main class="container">`, `left: 115px`, `right: 1235px`) | `0px` | **PASS** |
| **Hero Photo Gallery Width** | `1072px` | `1072.00px` (`left: 139px`, `right: 1211px`) | `0px` | **PASS** |
| **Hero Photo Gallery Height** | `428px` | `428.00px` (`210px + 210px + 8px gap`) | `0px` | **PASS** |
| **2-Column Layout Gap** | `80px` | `80.00px` (`gap: 80px` in `App.module.css`) | `0px` | **PASS** |
| **Booking Sidebar Width** | `370px` | `370.00px` (`<div class="_stickyCard_5h4k3_5">`, `left: 841px`, `right: 1211px`) | `0px` | **PASS** |
| **Booking Sidebar Sticky Offset** | `top: 100px` | `top: 100px` relative to viewport | `0px` | **PASS** |

---

### 2. View 1: Primary Listing Page

- **URL Tested**: `http://localhost:4173/`
- **Rendered Dimensions**:
  - Container: `1120.00px × 5737.25px`
  - Hero Grid: `1072.00px × 428.00px`
  - Primary Tile (Tile 0): Span 2 rows (`428px` height, `532px` width)
  - Secondary Tiles (Tiles 1–4): `262px × 210px` each in 2×2 grid with `8px` gap
  - Booking Card: `370.00px × 523.50px`
  - Reserve Button: Gradient background `#e61e4d` to `#d70466`, `48px` height, `8px` border radius
- **Typography & Font Token Verification**:
  - Font Family: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  - Title Heading (`h1`): `26px`, weight `600`, line height `1.2`, color `#222222`
  - Section Headings (`h2`): `22px`, weight `600`, color `#222222`
  - Subheadings (`h3`): `16px`, weight `600`, color `#222222`
  - Body Text: `16px`, weight `400`, color `#222222` (15.91:1 contrast)
  - Secondary / Muted Text: `14px`, weight `400`, color `#717171` (4.88:1 contrast)

---

### 3. View 2: Full-Screen Photo Tour Modal

- **URL Tested**: `http://localhost:4173/?modal=photo-tour`
- **Rendered Dimensions**:
  - Modal Overlay: `100vw × 100vh` (`position: fixed; inset: 0; background: #ffffff; z-index: 1000`)
  - Top Navigation Bar: `y: 0px`, `height: 64px`, sticky top
  - Category Navigation Strip (`_categoryNavStrip_1v8m7_63`): `y: 64px`, `height: 25px`
  - Category Pill Buttons: `32px` height, `16px` pill radius
  - Active Category Pill: Dark background `#222222`, white text `#ffffff`
  - Inactive Category Pill: Transparent background, text `#717171`
  - Photo Cards: Grouped by 9 room sections (`#tour-cat-living_room`, etc.) with room section titles (`h3`)

---

### 4. View 3: Single-Photo Lightbox Stage

- **URL Tested**: `http://localhost:4173/?modal=lightbox&photo=0`
- **Rendered Dimensions & Component Inspection**:
  - Modal Overlay: Dark background (`rgba(0, 0, 0, 0.95)` / `#000000`)
  - Center Image Container: `630.66px × 472.98px` (`aspect-ratio: 4/3`, natural size `1200 × 900` px)
  - Close Button (`×`): `40px × 40px`, top-right `x: 1300px`, `y: 16px`
  - Counter Title (`1 / 43`): `x: 621.17px`, `y: 19.50px`, width `41.73px`, height `24.00px`, centered top
  - Previous Chevron (`<`): `48.00px × 48.00px` circular button, `left: 48px`, `top: 324.5px` (vertically centered)
  - Next Chevron (`>`): `48.00px × 48.00px` circular button, `left: 1270px`, `top: 324.5px` (vertically centered)
  - Keyboard Navigation: `ArrowLeft` / `ArrowRight` advances active index; `Escape` returns to originating view

---

### 5. Quantitative Verification Summary

| Visual Area | Measured Property | Target | Measured | Result |
| :--- | :--- | :--- | :--- | :--- |
| **Max Container Width** | `max-width` | `1120px` | `1120.00px` | **MATCH** |
| **Header Height** | `height` | `80px` | `80.00px` | **MATCH** |
| **Hero Gallery Grid** | `height` | `428px` | `428.00px` | **MATCH** |
| **Hero Grid Columns** | `grid-template-columns` | `2fr 1fr 1fr` | `532px 262px 262px` | **MATCH** |
| **Hero Outer Border Radius** | `border-radius` | `12px` | `12px` | **MATCH** |
| **Hero Tile Gap** | `gap` | `8px` | `8px` | **MATCH** |
| **Booking Card Width** | `width` | `370px` | `370.00px` | **MATCH** |
| **Booking Card Radius** | `border-radius` | `16px` | `16px` | **MATCH** |
| **Booking Card Shadow** | `box-shadow` | `0 6px 16px rgba(0,0,0,0.12)` | `0 6px 16px rgba(0,0,0,0.12)` | **MATCH** |
| **Lightbox Chevrons** | `width × height` | `48px × 48px` | `48.00px × 48.00px` | **MATCH** |
| **Lightbox Image Fit** | `object-fit` | `contain` | `contain` (aspect ratio preserved) | **MATCH** |
| **Color: Primary Text** | hex value | `#222222` | `#222222` | **MATCH** |
| **Color: Secondary Text**| hex value | `#717171` | `#717171` | **MATCH** |
| **Color: Brand Accent** | hex value | `#FF385C` | `#FF385C` | **MATCH** |
| **Color: Card Border** | hex value | `#DDDDDD` | `#DDDDDD` | **MATCH** |
