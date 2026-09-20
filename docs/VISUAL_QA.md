# Visual QA & Fidelity Audit

## PlayPower Labs Software Engineer Take-Home: Vacation Rental Listing Experience

### Overview
This visual quality assurance review documents the visual parity between the current desktop application and the reference listing experience (`https://airbnb-clone-umber-two.vercel.app`).

---

### Visual Comparison Matrix

| Visual Area | Reference Specification | Implementation Details | Status |
|---|---|---|---|
| **Max Container Width** | Standard Airbnb desktop container (~1120px max-width, centered, 24px/40px padding) | `.container` configured with `max-width: 1120px; margin: 0 auto; padding: 0 var(--spacing-xl);` | **MATCH** |
| **Top Global Header** | Sticky/fixed top header, Airbnb logo, search pill ("Anywhere · Any week · Add guests"), right user pill | `src/components/Header/Header.tsx` with logo SVG, search pill with search icon, and user menu button | **MATCH** |
| **Hero Photo Gallery** | 5-tile asymmetric layout: 1 large photo (2 rows, left) + 4 smaller square photos (right grid 2x2). Rounded outer corners, "Show all 43 photos" bottom-right button. | `HeroGallery.module.css` with CSS Grid (`grid-template-columns: 2fr 1fr 1fr; grid-template-rows: 200px 200px; gap: 8px; border-radius: 12px;`). Hover dimming and scale. | **MATCH** |
| **Sticky Subnavigation Bar** | Appears when scrolling past hero gallery. Contains Photos, Amenities, Reviews, Location tabs + right price recap & Reserve button. | `StickyNav.tsx` with scroll spy tracking `#photos`, `#amenities`, `#reviews`, `#location`. Slides down via `transform: translateY(0)` with elevation shadow. | **MATCH** |
| **2-Column Split Layout** | Left column (~65% width) with property details; Right column (~35% width) with sticky booking card. | `App.module.css` with flexbox/grid (`grid-template-columns: 1fr 370px; gap: 80px; align-items: start;`). | **MATCH** |
| **Sticky Booking Card** | Card with border, elevated shadow (`box-shadow: 0 6px 16px rgba(0,0,0,0.12)`), rounded corners (12px), sticky offset (`top: 100px`). | `BookingCard.module.css` matching border, border radius, shadow, input grid for check-in/checkout, and reserve gradient button. | **MATCH** |
| **Calendar Module** | Dual-month layout (October and November 2026), selected date range highlight (18 Oct – 23 Oct), "Clear dates" action. | `CalendarSection.tsx` with dual-month grid table, day labels, date range spanning visual styles, and reset button. | **MATCH** |
| **Amenities Preview** | 2-column grid showing top 10 amenities with icons + "Show all 54 amenities" outlined button. | `AmenitiesPreview.tsx` rendering SVG icons, text labels, and modal trigger button. | **MATCH** |
| **Full-Screen Photo Tour (View 2)** | Full-screen white background overlay, sticky top bar with Back button, Share, Save. Category jump navigation, photos grouped by room. | `PhotoTourModal.tsx` and `CategoryNav.tsx` with categorized sections (`#tour-cat-[key]`), image cards, and smooth scrolling. | **MATCH** |
| **Single-Photo Lightbox (View 3)** | High-focus viewer, dark or neutral frame, centered image, prev/next circular chevron buttons, counter (`X / 43`), top close button. | `LightboxModal.tsx` with circular chevrons, counter header, smooth slide animation, and keyboard navigation. | **MATCH** |
| **Reviews & Rating Section** | Overall rating score (4.95), laurel wreath "Guest favourite" badge, rating category breakdowns, review cards with avatars. | `ReviewsSection.tsx` and `ReviewCard.tsx` with rating scores and authentic review cards. | **MATCH** |
| **Host Section & Footer** | Host avatar, host stats (1,463 reviews, 4.68★, 2 years), co-hosts list, response rate info, and multi-column Airbnb footer. | `HostFullSection.tsx` and `Footer.tsx` with accurate copy and layout structure. | **MATCH** |

---

### Detailed Visual Issue Log

#### Issue 1: Hero Gallery Boundary Overflow & Corner Radii
- **Observation**: Outer boundary of the 5-photo hero gallery must have rounded corners (12px) with individual corner radii applied to the leftmost and rightmost tiles.
- **Expected Appearance**: Top-left and bottom-left tiles rounded on left; top-right and bottom-right tiles rounded on right.
- **Implementation**: Handled in `HeroGallery.module.css` via `:first-child` (left border-radius) and `:nth-child(3)` / `:last-child` (right border-radius) with `overflow: hidden`.
- **Verification**: Verified in browser preview; hero grid maintains rounded border without clipping gaps.

#### Issue 2: Sticky Booking Card Viewport Clamping
- **Observation**: On shorter vertical viewports, sticky booking card should not overlap the footer or jump erratically.
- **Expected Appearance**: Position sticky with `top: 100px` relative to `.mainLayout` container.
- **Implementation**: Styled with `position: sticky; top: 100px;` within the right column wrapper.
- **Verification**: Smooth scrolling down the page holds the card fixed alongside left content sections.

#### Issue 3: Lightbox Image Aspect Ratio & Letterboxing
- **Observation**: Photos have differing dimensions (landscape vs portrait).
- **Expected Appearance**: Single-photo lightbox must center the image without distortion or aspect ratio stretching.
- **Implementation**: `object-fit: contain; max-width: 100%; max-height: 80vh;` applied to lightbox image container in `Lightbox.module.css`.
- **Verification**: Photos of all orientations scale proportionally within the viewport bounds.

#### Issue 4: Category Pill Tab Active Indicator in Photo Tour
- **Observation**: Sticky category bar in Photo Tour modal needs clear visual distinction for the active category.
- **Expected Appearance**: Underline or dark pill active state on the current room category.
- **Implementation**: Active class applies dark pill background `#222222` with white text `#ffffff`.
- **Verification**: Clicking category pills scrolls to target section and applies active state.
