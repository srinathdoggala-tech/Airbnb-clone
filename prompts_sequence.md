# AI-Assisted Development Log

> **Assessment**: Playpower Labs Take-Home Task: Airbnb-Clone App  
> **Reference Page**: [https://airbnb-clone-umber-two.vercel.app](https://airbnb-clone-umber-two.vercel.app)  
> **Property**: *Romantic Jacuzzi 1BHK Candolim | Mirashya UG10* (Candolim, Goa, India)  
> **Target Scope**: **Pure Frontend Web Application** (React 18, Vite, Vanilla CSS, WebP Assets, Browser Storage)  
> **Workflow Objective**: This prompt sequence was designed to guide an AI coding workflow step-by-step to produce the desktop vacation rental listing experience with all 3 mandatory views (Listing Page, Photo Tour, Lightbox Viewer), 43 categorized photos, 54 amenities, dynamic pricing, and QA verifications.

---

## Architecture & Workflow Overview

```mermaid
flowchart TD
    P1["Prompt 1: Project Scaffolding & Airbnb Design System"] --> P2["Prompt 2: Normalized Data Model & WebP Assets"]
    P2 --> P3["Prompt 3: Navigation Header & Sticky Subnav"]
    P3 --> P4["Prompt 4: 5-Tile Asymmetric Hero Photo Grid"]
    P4 --> P5["Prompt 5: Left Content Modules (Overview, Highlights, Description, Amenities, Calendar)"]
    P5 --> P6["Prompt 6: Right Floating Sticky Booking Card & Pricing Engine"]
    P6 --> P7["Prompt 7: Wide Bottom Sections (Reviews, Map, Host, Things to Know, Nearby Carousel)"]
    P7 --> P8["Prompt 8: View 2 - Full-Screen Photo Tour Modal (43 Photos, 9 Categories)"]
    P8 --> P9["Prompt 9: View 3 - Single-Photo Lightbox Viewer (Keyboard Nav & CDN Fallback)"]
    P9 --> P10["Prompt 10: Share Dialog (8 Channels), Wishlist Heart Red Fill & App Orchestration"]
    P10 --> P11["Prompt 11: SWAT Quality Gate, Node.js Native Test Suite & Build Verification"]
```

---

## Master Prompts Sequence

```text
================================================================================
PROMPT 1: Project Scaffolding, Build Config & Airbnb Design Tokens
================================================================================
ROLE: Principal Frontend Architect
OBJECTIVE: Scaffold a high-performance React 18 + Vite project and build the core Airbnb CSS design system.
CONTEXT: We are building a high-fidelity, desktop-first clone of the Airbnb listing at https://airbnb-clone-umber-two.vercel.app. The project is a pure frontend application with zero backend runtime dependencies.

INSTRUCTIONS:
1. Initialize a clean Vite project with React template:
   npm create vite@latest . -- --template react
2. In `vite.config.js`, configure React plugin and local development port 3000:
   ```javascript
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   export default defineConfig({
     plugins: [react()],
     server: { port: 3000, host: true }
   });
   ```

1. In `index.html`, set page title to:
   `Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 - Airbnb`
   Add the Airbnb favicon and configure font preloading for Circular / Cereal fonts.
2. In `src/styles/App.css`, implement the complete Airbnb design system:
   - Root Design Tokens:
     --rausch: #FF385C;
     --rausch-dark: #E00B41;
     --foggy: #717171;
     --hof: #222222;
     --line: #DDDDDD;
     --line-soft: #EBEBEB;
     --bg-card: #F7F7F7;
     --bg-hover: #F2F2F2;
     --font-cereal: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
     --radius-sm: 8px;
     --radius-md: 12px;
     --radius-lg: 16px;
     --radius-pill: 32px;
     --shadow-card: 0 6px 16px rgba(0,0,0,0.12);
     --shadow-nav: 0 2px 4px rgba(0,0,0,0.08);
   - Core Structural Layout Classes:
     `._zcNtKV` { max-width: 1120px; margin: 0 auto; padding: 0 40px; box-sizing: border-box; }
     `._lhKJir` { display: flex; gap: 80px; position: relative; width: 100%; align-items: flex-start; }
     `._joiPBF` { flex: 1; min-width: 0; }
     `._iJTxKe` { width: 370px; flex-shrink: 0; position: sticky; top: 120px; }
     `._SPYgTj` { width: 100%; border-top: 1px solid var(--line-soft); margin-top: 48px; padding-top: 48px; }
3. Add baseline resets for typography, font smoothing, box-sizing, and button borders.

VERIFICATION: Run `npm run dev`. Navigate to <http://localhost:3000/> to verify the blank shell loads with zero console errors and Airbnb CSS tokens active
================================================================================

```

```text
================================================================================
PROMPT 2: Normalized Listing Data Model & WebP Asset Pipeline
================================================================================
ROLE: Lead Data & Media Systems Engineer
OBJECTIVE: Create the complete normalized listing store `src/data/listingData.js` and establish the optimized WebP asset pipeline.
CONTEXT: The clone requires 43 real listing photos, 8 nearby stay photos, 54 categorized amenities, and exact listing details from Candolim, Goa.

INSTRUCTIONS:
1. Create `src/data/listingData.js` exporting the `LISTING` data object:
   - Core Metadata:
     * id: "1599895892448055764"
     * title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"
     * location: "Candolim, Goa, India"
     * propertyType: "Entire serviced apartment in Candolim, India"
     * specs: "3 guests · 1 bedroom · 1 bed · 1 bathroom"
     * rating: 4.95, reviewsCount: 19, isGuestFavorite: true
   - Pricing Engine Parameters:
     * basePricePerNight: 5700
     * nights: 5
     * checkInDate: "2026-10-18", checkOutDate: "2026-10-23"
     * dateRangeText: "18 Oct 2026 - 23 Oct 2026"
     * totalBasePrice: 28500
     * cleaningFee: 1200
     * serviceFee: 4195
     * totalBeforeTaxes: 33895
   - Host Profile:
     * name: "Mirashya Homes", superhost: true, yearsHosting: 2
     * reviewsCount: "1,463", rating: "4.68★"
     * coHosts: 8 co-hosts with avatars in `public/assets/images/avatars/`
   - Room Categories (9 categories):
     * living1: "Living room 1" (photos 0–6)
     * living2: "Living room 2" (photos 7–9)
     * kitchen: "Full kitchen" (photos 10–13)
     * bedroom: "Bedroom" (photos 14–19)
     * bathroom: "Full bathroom" (photos 20–24)
     * gym: "Gym" (photos 25–26)
     * exterior: "Exterior" (photos 27–32)
     * pool: "Pool" (photos 33–36)
     * additional: "Additional photos" (photos 37–42)
   - Photos Array (43 items):
     Each item contains `{ id: i, cat: "room_key", label: "Room Label", webp: "/assets/photos/photo_XX_cat.webp", remoteSrc: "https://a0.muscache.com/..." }`.
     * Note: Photo 0 is `photo_07_living2.webp`, Photo 7 is `photo_07_living2.webp` ("Living room 2").
   - Hero Photos Mapping (5 indices): [0, 8, 14, 27, 28].
   - 54 Amenities categorized into 13 groups:
     * Scenic views, Bathroom, Bedroom & laundry, Entertainment, Heating & cooling, Home safety, Internet & office, Kitchen & dining, Location features, Outdoor, Parking & facilities, Services, Not included.
   - 8 Nearby Stays with id, name, location, rating, price, and thumbnail.
2. In `scripts/convert_webp.py`, write a Python script using Pillow to convert source images to `.webp` at quality 82, placing all 43 images into `public/assets/photos/` and 8 images into `public/assets/nearby/`.

VERIFICATION: Ensure `src/data/listingData.js` exports `LISTING` with 43 photos and 54 amenities. Verify all 43 `.webp` files exist in `public/assets/photos/` with total size under 4.5 MB.
================================================================================
```

```text
================================================================================
PROMPT 3: Site Header, Search Pill & Sticky Subnavigation Bar
================================================================================
ROLE: Senior UI Engineer
OBJECTIVE: Build `src/components/header/Header.jsx` and `src/components/navigation/StickyTabs.jsx`.
CONTEXT: Airbnb's signature desktop navigation features a global header with a compact search pill, and a dynamic sticky subnavigation bar with scroll-spy and quick Reserve CTA.

INSTRUCTIONS:
1. In `src/components/header/Header.jsx`:
   - Left: Official Airbnb coral logo SVG (`#FF385c`) linking to `#`.
   - Center: Compact search pill (`._cShPill`) displaying:
     "Anywhere" · "Any week" · "Add guests" + circular red search icon button (`#FF385C`).
   - Right: "Airbnb your home" button, globe currency/language button, and user menu pill button with hamburger SVG and host avatar icon.
2. In `src/components/navigation/StickyTabs.jsx`:
   - Accept props: `{ onReserveClick }`.
   - Track scroll position: appears when scrolling past hero section (`scrollY > 600px`).
   - Tabs list: "Photos" (`#photos`), "Amenities" (`#amenities`), "Reviews" (`#reviews`), "Location" (`#location`).
   - Implement `IntersectionObserver` observing `#photos`, `#amenities`, `#reviews`, `#location` to set active tab indicator with bottom border (`#222`).
   - Clicking a tab smoothly scrolls window to the target element: `document.getElementById(id).scrollIntoView({ behavior: 'smooth' })`.
   - Right side of sticky bar: Quick recap showing `₹5,700 / night`, rating `4.95 ★ (19)`, and coral "Reserve" button that triggers `onReserveClick()`.

VERIFICATION: Scrolling down past 600px smoothly reveals the sticky subnav bar; active tab indicator switches as sections scroll into view.
================================================================================
```

```text
================================================================================
PROMPT 4: Listing Header & 5-Photo Asymmetric Hero Gallery Grid
================================================================================
ROLE: Frontend Layout Specialist
OBJECTIVE: Implement `src/components/listing-header/ListingHeader.jsx` and `src/components/gallery/GalleryGrid.jsx`.
CONTEXT: The hero gallery is Airbnb's central visual anchor. It features a 5-photo asymmetric layout with interactive hover dimming and a floating "Show all photos" button.

INSTRUCTIONS:
1. In `src/components/listing-header/ListingHeader.jsx`:
   - Title: `<h1>Romantic Jacuzzi 1BHK Candolim | Mirashya UG10</h1>`.
   - Action controls row:
     * Left: Location link `Candolim, Goa, India`.
     * Right: "Share" button with share SVG icon -> invokes `onShareClick()`.
     * Right: "Save" button with heart SVG icon:
       - Must dynamically update style based on `isSaved` prop:
         `fill: isSaved ? '#ff385c' : 'none'`, `stroke: isSaved ? '#ff385c' : 'currentColor'`.
       - Text toggles between "Save" and "Saved".
       - Click invokes `onToggleSave()`.
2. In `src/components/gallery/GalleryGrid.jsx`:
   - Accept props: `{ onShowAllPhotos, onPhotoClick }`.
   - Grid layout `._DPzomV`:
     * Container height: 440px with `border-radius: 12px; overflow: hidden; display: grid; grid-template-columns: 2fr 1fr 1fr; grid-gap: 8px;`.
     * Large Left Tile: Photo 0 (`photo_07_living2.webp`) spanning 2 rows on left.
     * Top-Right Tiles: Photo 1 and Photo 2 (`photo_08_living2.webp`, `photo_14_bed.webp`).
     * Bottom-Right Tiles: Photo 3 and Photo 4 (`photo_27_ext.webp`, `photo_28_ext.webp`).
   - Hover Dimming Effect:
     * When any photo tile is hovered, apply `filter: brightness(0.9)` to other tiles with `transition: filter 0.2s ease`.
   - Floating "Show all 43 photos" Button:
     * Positioned bottom-right (`position: absolute; bottom: 24px; right: 24px;`).
     * White pill with 9-dot grid icon, text "Show all photos".
     * Clicking button calls `onShowAllPhotos()`.
     * Clicking any photo tile calls `onPhotoClick(photoIndex)`.

VERIFICATION: 5 photos render in the exact 1-large + 4-small arrangement; hovering dims other tiles; clicking "Show all photos" fires callback.
================================================================================
```

```text
================================================================================
PROMPT 5: Left-Rail Content Modules (Overview, Description, Amenities, Calendar)
================================================================================
ROLE: Frontend UI Components Engineer
OBJECTIVE: Build the left content column components: `Overview.jsx`, `Highlights.jsx`, `Description.jsx`, `SleepingArrangements.jsx`, `Amenities.jsx`, and `CalendarSection.jsx`.
CONTEXT: The left column contains detailed listing copy and interactive features. We must ensure no unwanted page jumps or spurious toast alerts occur.

INSTRUCTIONS:
1. In `src/components/overview/Overview.jsx`:
   - Subheading: "Entire serviced apartment in Candolim, India".
   - Specs: "3 guests · 1 bedroom · 1 bed · 1 bathroom".
   - "Guest favorite" laurel leaf badge with rating "4.95 ★" and "19 Reviews".
2. In `src/components/highlights/Highlights.jsx`:
   - 3 highlight rows with SVGs:
     * "Dedicated workspace": A private room with wifi well-suited for working.
     * "Self check-in": Check yourself in with the keypad.
     * "Free cancellation before 13 Oct": Get a full refund if you change plans.
3. In `src/components/description/Description.jsx`:
   - Formatted description copy describing the luxury Candolim 1BHK apartment with private jacuzzi.
   - Translation badge: "Some info has been translated automatically. <a href="#">Show original</a>".
   - CRITICAL QA FIX: The "Show original" anchor must prevent default:
     `<a href="#" onClick={(e) => e.preventDefault()}>Show original</a>`
     Ensure clicking it does NOT jump the page to the top.
4. In `src/components/sleep/SleepingArrangements.jsx`:
   - Section title "Where you'll sleep".
   - Bedroom card with bed SVG icon, bold "Bedroom", and subtitle "1 double bed".
5. In `src/components/amenities/Amenities.jsx`:
   - Section title "What this place offers".
   - 2-column grid showing top 10 amenities with real SVGs (Jacuzzi, Wifi, Kitchen, Free parking, Private pool, Air conditioning, etc.).
   - "Show all 54 amenities" button with `type="button"`, calling `onShowAllAmenities()`.
6. In `src/components/calendar/CalendarSection.jsx`:
   - Title: "5 nights in Candolim" and date subtitle "18 Oct 2026 - 23 Oct 2026".
   - Dual-month interactive calendar showing October 2026 and November 2026 side-by-side.
   - Days 18 to 23 of October highlighted with coral background and connected selection bar.
   - CRITICAL QA FIX: Bottom "Clear dates" button must have:
     `<button type="button" onClick={(e) => { e.preventDefault(); onClearDates?.(); }}>Clear dates</button>`
     Ensure it does NOT fire any alert toasts and does NOT submit any forms.

VERIFICATION: All left-rail modules render sequentially with proper spacing; clicking "Show original" and "Clear dates" produces zero unwanted jumps or toasts.
================================================================================
```

```text
================================================================================
PROMPT 6: Right-Rail Sticky Floating Booking Card & 5-Night Pricing Engine
================================================================================
ROLE: Financial UI & State Specialist
OBJECTIVE: Implement `src/components/booking/BookingCard.jsx` with real-time price breakdown and sticky positioning.
CONTEXT: The booking sidebar is sticky (`top: 120px`), calculates exact stay totals, and includes user actions that must match reference behavior.

INSTRUCTIONS:
1. In `src/components/booking/BookingCard.jsx`:
   - Render inside an `<aside className="_iJTxKe">` with card styling:
     `border: 1px solid var(--line); border-radius: 16px; padding: 24px; box-shadow: var(--shadow-card); background: #fff;`.
   - Price Header:
     * `₹5,700` bold 22px text + ` / night` subtitle.
     * Rating badge: `★ 4.95 · 19 reviews`.
   - Combined Picker Box:
     * Top row split into Check-in (`18/10/2026`) and Checkout (`23/10/2026`).
     * Bottom row for Guests: `3 guests`.
   - Primary "Reserve" Button:
     * Full-width button with Airbnb gradient:
       `background: linear-gradient(to right, #E61E4D 0%, #E31C5F 50%, #D70466 100%);`
       `color: #fff; font-weight: 600; font-size: 16px; padding: 14px; border-radius: 8px;`.
     * Text: "Reserve". Subtitle below button: "You won't be charged yet".
   - Price Calculation Table:
     * `₹5,700 x 5 nights` -> `₹28,500`
     * `Cleaning fee` -> `₹1,200`
     * `Airbnb service fee` -> `₹4,195`
     * Divider line (`border-top: 1px solid var(--line-soft)`).
     * `Total before taxes` -> `₹33,895` (bold 16px).
   - Promo Discount Badge:
     * Clickable green badge: "Special 10% promo applied".
   - Footer "Report this listing":
     * CRITICAL QA FIX: Anchor must prevent default and avoid toasts:
       `<a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--foggy)', textDecoration: 'underline' }}>Report this listing</a>`

VERIFICATION: Card stays pinned during scrolling; pricing shows ₹28,500 base and ₹33,895 total; "Report this listing" is completely silent.
================================================================================
```

```text
================================================================================
PROMPT 7: Full-Width Bottom Sections (Reviews, Map, Host, Things to Know, Nearby)
================================================================================
ROLE: Frontend Full-Width UI Specialist
OBJECTIVE: Implement `Reviews.jsx`, `LocationMap.jsx`, `HostSection.jsx`, `ThingsToKnow.jsx`, and `NearbyStays.jsx`.
CONTEXT: These sections occupy the full width (`._SPYgTj`) beneath the two-column split, providing trust, location context, and alternative recommendations.

INSTRUCTIONS:
1. In `src/components/reviews/Reviews.jsx`:
   - Overall rating badge: Laurel wreath graphic, `4.95` rating, "Guest favorite" label.
   - 6 Category rating bars: Cleanliness (4.9), Accuracy (4.9), Check-in (5.0), Communication (4.9), Location (4.8), Value (4.8).
   - 2-column grid of 6 guest review cards with avatar, reviewer name, date, and review text.
   - CRITICAL QA FIX: "Show all 19 reviews" button must have:
     `<button type="button" onClick={(e) => e.preventDefault()}>Show all 19 reviews</button>`
     Ensure clicking it does NOT trigger any spurious toasts.
2. In `src/components/location/LocationMap.jsx`:
   - Section title "Where you'll be". Subtitle "Candolim, Goa, India".
   - Styled Google Maps iframe embed or custom vector map centered on Candolim Beach with custom Airbnb pin.
   - Neighborhood summary text highlighting proximity to Candolim Beach, restaurants, and nightlife.
3. In `src/components/host/HostSection.jsx`:
   - Host identity card: Avatar for "Mirashya Homes", "Superhost", "2 years hosting".
   - Stats grid: 1,463 reviews, 4.68★ rating, identity verified.
   - Co-hosts section with 8 co-host avatar thumbnails and names.
   - CRITICAL QA FIX: "Message host" button must have:
     `<button type="button" onClick={(e) => e.preventDefault()}>Message host</button>`
     Ensure it is silent and does NOT show an alert toast.
4. In `src/components/things-to-know/ThingsToKnow.jsx`:
   - 3 columns: "House rules", "Safety & property", and "Cancellation policy".
   - CRITICAL QA FIX: Each column's "Learn more" or "Show more" link must prevent default:
     `<a href="#" onClick={(e) => e.preventDefault()}>Learn more</a>`
     Ensure clicking any policy link does NOT jump the browser to page top.
5. In `src/components/nearby/NearbyStays.jsx`:
   - Title: "More stays nearby in Candolim".
   - Header controls: Page indicator (`1 / 2` ↔ `2 / 2`) and Previous (`←`) / Next (`→`) circle buttons.
   - Horizontal sliding card track displaying all 8 nearby stays with image, rating, title, and price.
   - Clicking Next slides the carousel to page 2; clicking Prev slides back to page 1.

VERIFICATION: All full-width sections render cleanly; carousel slides between page 1 and 2; review and host buttons show no fake toasts.
================================================================================
```

```text
================================================================================
PROMPT 8: View 2 - Full-Screen Photo Tour Overlay Modal
================================================================================
ROLE: Modal Architecture & Accessibility Engineer
OBJECTIVE: Implement `src/components/photo-tour/PhotoTourModal.jsx` displaying all 43 listing photos across 9 room categories.
CONTEXT: This is the 2nd mandatory view. It opens from "Show all photos" or any hero photo, featuring room jump navigation and scroll-locking.

INSTRUCTIONS:
1. In `src/components/photo-tour/PhotoTourModal.jsx`:
   - Accept props: `{ isOpen, onClose, onPhotoClick, isSaved, onToggleSave, onShareClick }`.
   - If `!isOpen`, return `null`.
   - Fullscreen modal overlay:
     `position: fixed; inset: 0; z-index: 200; background: #fff; overflow-y: auto;`.
   - Lock background page scrolling when open:
     `useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; }, [isOpen]);`
   - Sticky Top Bar (`position: sticky; top: 0; background: #fff; z-index: 10; border-bottom: 1px solid var(--line-soft);`):
     * Left: Back arrow button (`←`) calling `onClose()`.
     * Center: Title "Photo tour".
     * Right: Share button (`onShareClick()`) and Wishlist save heart button (`onToggleSave()`).
       - Heart SVG dynamically fills solid red (`#ff385c`) when `isSaved` is true.
   - Category Quick-Jump Bar:
     * 9 category buttons with live thumbnail image: Living room 1, Living room 2, Full kitchen, Bedroom, Full bathroom, Gym, Exterior, Pool, Additional photos.
     * Clicking a category smoothly scrolls the modal container to `tour-category-{catKey}` using `scrollIntoView({ behavior: 'smooth' })`.
   - Category Photo Sections:
     * Render each of the 9 room categories with title and amenity pills.
     * Display featured large image followed by 2-column paired grids.
     * Each photo is wrapped in a clickable container calling `onPhotoClick(photoIndex)` to launch Lightbox directly.
   - Accessibility: Close modal on `Escape` key.

VERIFICATION: Modal opens smoothly from "Show all photos"; category buttons jump to corresponding room sections; photo click opens Lightbox.
================================================================================
```

```text
================================================================================
PROMPT 9: View 3 - Single-Photo Lightbox Modal Viewer with Resilient CDN Fallback
================================================================================
ROLE: Media & Performance Engineer
OBJECTIVE: Implement `src/components/lightbox/LightboxModal.jsx` with photo counter, keyboard navigation, and automatic CDN fallback.
CONTEXT: This is the 3rd mandatory view. It displays a single photo on a dark stage with counter (e.g. `7 / 43`), arrow navigation, and zero broken images.

INSTRUCTIONS:
1. In `src/components/lightbox/LightboxModal.jsx`:
   - Accept props: `{ isOpen, currentIndex, totalPhotos, currentPhoto, onNext, onPrev, onClose, onShowTour }`.
   - If `!isOpen || !currentPhoto`, return `null`.
   - Overlay: `position: fixed; inset: 0; z-index: 300; background: rgba(0, 0, 0, 0.85); display: flex; flex-direction: column;`.
   - Header Bar (`display: flex; justify-content: space-between; padding: 20px 24px; color: #fff;`):
     * Left: Grid icon button (`⊞`) to switch back to Photo Tour modal (`onShowTour()`).
     * Center: Dynamic category room title matching photo (e.g. Photo 7 displays `"Living room 2"`).
     * Right: Photo counter string `{currentIndex + 1} / {totalPhotos}` (e.g. `7 / 43`) and Close button (`✕`) calling `onClose()`.
   - Stage Area (`flex: 1; display: flex; align-items: center; justify-content: center; position: relative;`):
     * Image container: Max-width 90vw, max-height 80vh.
     * Image element:
       ```jsx
       <img
         key={currentIndex}
         src={currentPhoto.webp}
         alt={currentPhoto.label || `Photo ${currentIndex + 1}`}
         style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '4px' }}
         onError={(e) => {
           if (currentPhoto.remoteSrc && e.currentTarget.src !== currentPhoto.remoteSrc) {
             e.currentTarget.src = currentPhoto.remoteSrc;
           }
         }}
       />
       ```
       * Note: Automatic `onError` cascade ensures if any local WebP asset fails, it seamlessly falls back to high-res Airbnb CDN.
   - Navigation Buttons:
     * Left Arrow (`←`) button: Calls `onPrev()`, disabled when `currentIndex === 0`.
     * Right Arrow (`→`) button: Calls `onNext()`, disabled when `currentIndex === totalPhotos - 1`.
   - Keyboard Navigation Hook:
     ```javascript
     useEffect(() => {
       const handleKeyDown = (e) => {
         if (e.key === 'ArrowLeft') onPrev();
         else if (e.key === 'ArrowRight') onNext();
         else if (e.key === 'Escape') onClose();
       };
       window.addEventListener('keydown', handleKeyDown);
       return () => window.removeEventListener('keydown', handleKeyDown);
     }, [onNext, onPrev, onClose]);
     ```

VERIFICATION: Photo 7 opens displaying title "Living room 2" and counter "7 / 43"; keyboard Left/Right arrows navigate smoothly; ESC closes viewer.
================================================================================
```

```text
================================================================================
PROMPT 10: Share Modal Dialog, Wishlist Red Fill & Main App Orchestrator
================================================================================
ROLE: Lead Frontend Architect
OBJECTIVE: Implement `ShareModal.jsx`, `AmenitiesModal.jsx`, and wire all views together in `src/App.jsx`.
CONTEXT: Connect all components into a seamless unidirectional state machine managing the 3 views, modals, and client-side persistence.

INSTRUCTIONS:
1. In `src/components/common/ShareModal.jsx`:
   - Render centered modal dialog when `isOpen` is true.
   - Header: "Share this place" + close button (`✕`).
   - Property Preview Card: Thumbnail (`photo_07_living2.webp`), "Romantic Jacuzzi 1BHK Candolim", 4.95★ rating, and "Candolim, Goa".
   - 8 Sharing Channels Grid:
     1. "Copy Link": Copies `window.location.href` to clipboard, changes button text to "Link copied!" with green checkmark.
     2. "Email": Opens `mailto:` link.
     3. "WhatsApp": Opens `https://api.whatsapp.com/send?text=...`.
     4. "Messenger": Opens Facebook Messenger share.
     5. "Facebook": Opens Facebook sharer.
     6. "Twitter / X": Opens Twitter intent tweet.
     7. "Messages / SMS": Opens `sms:` URI.
     8. "Embed Code": Copies `<iframe>` snippet to clipboard.
2. In `src/components/amenities/AmenitiesModal.jsx`:
   - Full categorized dialog displaying all 54 amenities grouped into 13 categories with search input.
3. In `src/App.jsx`:
   - Manage top-level state:
     * `isPhotoTourOpen`: boolean (View 2)
     * `isLightboxOpen`: boolean (View 3)
     * `lightboxIndex`: integer (0..42)
     * `isAmenitiesModalOpen`: boolean
     * `isShareModalOpen`: boolean
     * `isSaved`: boolean, initialized from `localStorage.getItem('airbnb_saved_ug10') === 'true'`
   - Handlers:
     * `handleToggleSave()`: Toggles `isSaved`, writes to `localStorage`.
     * `handleOpenLightbox(idx)`: Sets `lightboxIndex = idx`, `isLightboxOpen = true`, `isPhotoTourOpen = false`.
     * `handleOpenPhotoTour()`: Sets `isPhotoTourOpen = true`, `isLightboxOpen = false`.
     * `handleNextPhoto()`: Increments `lightboxIndex` up to 42.
     * `handlePrevPhoto()`: Decrements `lightboxIndex` down to 0.
   - Render Layout:
     `<Header />`
     `<StickyTabs onReserveClick={scrollToBooking} />`
     `<main className="_zcNtKV">`
       `<ListingHeader isSaved={isSaved} onToggleSave={handleToggleSave} onShareClick={() => setIsShareModalOpen(true)} />`
       `<GalleryGrid onShowAllPhotos={handleOpenPhotoTour} onPhotoClick={handleOpenLightbox} />`
       `<div className="_lhKJir">`
         `<div className="_joiPBF">`
           `<Overview /> <Highlights /> <Description /> <SleepingArrangements /> <Amenities onShowAllAmenities={() => setIsAmenitiesModalOpen(true)} /> <CalendarSection />`
         `</div>`
         `<BookingCard />`
       `</div>`
       `<div className="_SPYgTj">`
         `<Reviews /> <LocationMap /> <HostSection /> <ThingsToKnow /> <NearbyStays />`
       `</div>`
     `</main>`
     `<PhotoTourModal isOpen={isPhotoTourOpen} onClose={() => setIsPhotoTourOpen(false)} onPhotoClick={handleOpenLightbox} isSaved={isSaved} onToggleSave={handleToggleSave} onShareClick={() => setIsShareModalOpen(true)} />`
     `<LightboxModal isOpen={isLightboxOpen} currentIndex={lightboxIndex} totalPhotos={43} currentPhoto={LISTING.photos[lightboxIndex]} onNext={handleNextPhoto} onPrev={handlePrevPhoto} onClose={() => setIsLightboxOpen(false)} onShowTour={handleOpenPhotoTour} />`
     `<AmenitiesModal isOpen={isAmenitiesModalOpen} onClose={() => setIsAmenitiesModalOpen(false)} />`
     `<ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />`

VERIFICATION: Share button opens 8-channel modal; Wishlist heart fills red `#ff385c` and persists in localStorage; View 1, 2, and 3 switch flawlessly.
================================================================================
```

```text
================================================================================
PROMPT 11: SWAT Quality Gate Audit, Automated Test Suite & Build Verification
================================================================================
ROLE: Principal QA & Release Engineer
OBJECTIVE: Build the native Node.js test suite in `src/tests/listing.test.js` and verify functional requirements against the SWAT matrix.
CONTEXT: Enforce strict quality gates ensuring all 43 photos, 54 amenities, 5-night pricing, and client QA fixes are fully verified.

INSTRUCTIONS:
1. In `src/tests/listing.test.js`, write comprehensive unit tests using native `node:test` and `node:assert`:
   - Test 1: Listing title and property type match reference.
   - Test 2: Hero grid indices [0, 8, 14, 27, 28] point to valid photos.
   - Test 3: Exactly 43 real property photos across 9 categories exist in dataset.
   - Test 4: All 43 `.webp` files physically exist in `public/assets/photos/` with file size > 10 kB.
   - Test 5: All 8 nearby stay photos physically exist in `public/assets/nearby/`.
   - Test 6: 5-night stay pricing: 5 x ₹5,700 = ₹28,500 base, total ₹33,895 before taxes.
   - Test 7: Exactly 54 amenities across 13 categories exist in dataset.
2. In `package.json`, add test script:
   `"test": "node --test src/tests/listing.test.js"`
3. Run verification commands:
   npm test
   npm run build
4. Verify all 9 client QA items pass:
   - QA-1: Share button opens 8-channel modal with copy feedback.
   - QA-2: Wishlist heart fills solid red `#ff385c`.
   - QA-3: "Report this listing" is completely silent.
   - QA-4: "Show original" does not jump page to top.
   - QA-5: "Clear dates" does not fire alert toasts.
   - QA-6: "Show all 19 reviews" does not fire alert toasts.
   - QA-7: "Message host" does not fire alert toasts.
   - QA-8: "Learn more" links in Things to know do not jump page to top.
   - QA-9: Nearby stays carousel slides smoothly between pages.
   - BUG-10: Lightbox photo 7/43 loads clearly with category title "Living room 2".

VERIFICATION: All 7 automated tests pass (7 pass, 0 fail); Vite production build completes cleanly with 0 errors.
================================================================================
```

---

## Verification & Execution Summary

| Phase | Master Prompt | Target Deliverable | Verification Command |
| :--- | :--- | :--- | :--- |
| **Foundation** | Prompt 1 | Project Scaffolding & Airbnb Tokens | `npm run dev` |
| **Data & Assets** | Prompt 2 | 43 WebP Photos & 54 Amenities | `node -e "assert(LISTING.photos.length === 43)"` |
| **Navigation** | Prompt 3 | Global Header & Sticky Scroll-Spy Subnav | Scroll past 600px |
| **Hero Gallery** | Prompt 4 | 5-Photo Asymmetric Grid with Hover Dimming | Visual inspect 5 tiles |
| **Left Rail** | Prompt 5 | Overview, Description, Amenities, Calendar | Test "Show original" & "Clear dates" |
| **Right Rail** | Prompt 6 | Sticky Booking Card & 5-Night Pricing | Check ₹28,500 / ₹33,895 |
| **Bottom Sections** | Prompt 7 | Reviews, Map, Host, Policies, Nearby Slider | Slide nearby carousel |
| **View 2: Tour** | Prompt 8 | Full-Screen 43-Photo Gallery Across 9 Rooms | Click "Show all photos" |
| **View 3: Lightbox** | Prompt 9 | Single-Photo Stage with Arrows & Keys | Press ArrowLeft / ArrowRight |
| **Modals & App** | Prompt 10 | Share Modal, Red Heart, App State Machine | Test Copy link & Wishlist save |
| **Quality Gate** | Prompt 11 | SWAT Test Suite & Production Bundle | `npm test` & `npm run build` |
