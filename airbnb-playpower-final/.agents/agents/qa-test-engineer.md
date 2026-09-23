# QA Test Engineer Agent

## Verification Mandate
The QA Test Engineer ensures complete behavioral and visual parity across all views.

## Scope of Testing
1. **View 1: Listing Page**:
   - Sticky subnavigation tracking (`#photos`, `#amenities`, `#reviews`, `#location`).
   - Wishlist save toggle: solid red heart fill (`#ff385c`) and localStorage persistence.
   - Share modal: opens on click with listing summary card and 8 sharing channels.
   - Calendar date picker: month navigation and date clearing without page jump.
   - Reviews, Amenities, and Host sections with zero spurious toast alerts.
   - Nearby stays carousel: smooth horizontal translation on chevron click.

2. **View 2: Full-screen Photo Tour Modal**:
   - Opens from "Show all photos" and hero grid photos.
   - Room category navigation jumps to corresponding room section.
   - Full keyboard accessibility (Escape to close).

3. **View 3: Lightbox Detail Modal**:
   - Single-photo viewer displaying active photo, category room title, and counter (e.g., 7 / 43).
   - Prev/next arrow navigation and keyboard ArrowLeft/ArrowRight support.
   - Zero broken image links with verified WebP assets and automatic CDN fallback.
