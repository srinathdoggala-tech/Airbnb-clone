# Airbnb Listing Clone (Candolim, Goa)

A high-fidelity, pixel-perfect, and behavioral React clone of the Airbnb listing:
**Romantic Jacuzzi 1BHK Candolim | Mirashya UG10**
Reference: [https://airbnb-clone-umber-two.vercel.app/](https://airbnb-clone-umber-two.vercel.app/)

Built for the **Playpower Labs Software Engineer Assessment**.

---

## 📁 Repository Structure

```
├── .agents/              # Agent rules, SWAT security matrix, and skills
│   └── skills/
│       └── expert_airbnb_cloning/
├── dist/                 # Production-optimized build output
├── extra/                # Raw references, HTML dumps, and intermediate assets
│   ├── ref_sections/     # Cleaned reference HTML section slices
│   ├── ref_dump.html     # Raw reference DOM capture
│   └── ...               # Intermediate analysis and preview files
├── public/               # Static assets served by Vite
│   └── assets/
│       ├── fonts/        # Airbnb Cereal variable fonts (.woff2)
│       ├── images/       # High-res avatars, chips, and UI icons
│       ├── nearby/       # Optimized WebP photos for nearby stays
│       └── photos/       # 43 optimized WebP property photos
├── scripts/              # Build, extraction, and automation scripts
│   ├── convert_webp.py   # WebP optimization pipeline
│   ├── create_submission_zip.py # Packaging utility
│   └── ...
├── src/                  # React application source code
│   ├── components/
│   │   ├── amenities/    # Amenities list & 54-item modal
│   │   ├── booking/      # Sticky booking widget & price calculator
│   │   ├── calendar/     # Dual-month interactive calendar
│   │   ├── gallery/      # 5-photo hero grid & photo lightbox
│   │   ├── header/       # Navbar, pill search bar, & sticky sub-nav
│   │   ├── host/         # Host profile, co-hosts, & safety info
│   │   ├── nearby/       # Smooth-scrolling stays nearby carousel
│   │   ├── reviews/      # Rating breakdown & guest reviews
│   │   └── tour/         # 43-photo categorized photo tour modal
│   ├── data/
│   │   └── listingData.js# Normalized listing data store
│   ├── styles/
│   │   └── App.css       # Scoped, zero-collision Airbnb design system
│   ├── tests/
│   │   └── listing.test.js # FAANG integrity verification suite
│   ├── App.jsx           # Main listing page orchestration
│   └── main.jsx          # React 18 entry point
├── architecture_design.md# Frontend system design & production scaling blueprint
├── architecture_diagram.png # Architecture diagram (high-res raster)
├── architecture_diagram.svg # Architecture diagram (vector source)
├── prompts_sequence.md   # Complete 11-step master prompts sequence for 100% reproduction
├── PLAYPOWER_ASSESSMENT_SUBMISSION.md # Full assessment submission dossier
├── SUBMISSION_DOCUMENTATION.md # Comprehensive engineering documentation
├── index.html            # Vite HTML shell
├── package.json          # Project dependencies and npm scripts
└── vite.config.js        # Vite configuration
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Run Automated Integrity Tests
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```

---

## 🌟 Key Features & Architectural Highlights

1. **Pixel-Perfect Visual Parity**:
   - Matches the reference down to typography, spacing, SVG iconography, and responsive grid layouts.
   - 5-tile hero gallery grid strictly matching reference imagery and hierarchy.
   - Sticky booking sidebar anchored to `top: 100px` throughout content scrolling.
2. **Three Native View Modes**:
   - **Main Listing**: Complete overview, highlights, sleeping arrangements, amenities, calendar, reviews, host profile, things to know, and nearby stays.
   - **Photo Tour Overlay**: Full-screen dialog with 9 category navigation tabs, amenity badge chips, and smooth scroll anchors.
   - **Lightbox Viewer**: High-performance photo viewer with arrow key navigation, photo counter, and focus management.
3. **Interactive Micro-Interactions**:
   - Sticky navigation bar that appears dynamically on scrolling past the hero grid.
   - Wishlist heart button with smooth coral-red transition and notification toast.
   - "More stays nearby" sliding carousel with smooth boundary scrolling and live page indicator (`1 / 2` ↔ `2 / 2`).
   - Interactive dual-month calendar with pre-selected dates (Oct 18 – 23, 2026) and "Clear dates" toggle.
4. **WebP Optimization Pipeline**:
   - All 51 property and stay photos converted to high-definition WebP, saving **26.1% bandwidth** with zero 404s.
5. **Frontend Architecture & Production Scaling Design**:
   - Includes [`architecture_design.md`](./architecture_design.md) detailing the React 18 component hierarchy, unidirectional state flow, modal state machine, and the conceptual multi-region production scaling blueprint.
6. **Master Prompts Sequence**:
   - Includes [`prompts_sequence.md`](./prompts_sequence.md) providing the complete 11-step master prompt sequence for 100% clone reproduction.
