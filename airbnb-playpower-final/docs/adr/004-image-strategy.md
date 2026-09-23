# ADR 004: Pre-Optimized WebP Asset Pipeline with CDN Fallback

## Status
Accepted

## Context
High-resolution photography is the primary medium of vacation rental marketplaces. With 43 property photos and 8 nearby stay photos, uncompressed assets would exceed 50 MB, causing severe LCP degradation and mobile network choking.

## Decision
We adopted a **Local WebP Pre-Optimization Strategy** paired with an **Automated Remote CDN Fallback (`onError`)**:
- All 43 photos converted to modern WebP format (`public/images/`)
- Hero photo 0 prioritized with `fetchpriority="high"` and `loading="eager"`
- Off-screen images set to `loading="lazy"` and `decoding="async"`
- Fallback to remote CDN URLs (`remoteSrc`) on any local loading failure

## Alternatives Considered
1. **Dynamic On-Demand Image Server**: Requires active backend infrastructure (e.g. Sharp or Next Image Optimization server) not present in a static client build.
2. **Original Uncompressed PNG/JPEG**: Would balloon package size to >50 MB and violate production performance standards.

## Trade-offs & Consequences
- **Pros**: Entire photo gallery compressed to ~1.42 MB (~33 KB per image average), CLS = 0.00, resilient against missing local files.
- **Cons**: Requires pre-converting images prior to static asset packaging.
