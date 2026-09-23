# ADR 002: Adoption of Scoped CSS Modules and CSS Custom Properties

## Status
Accepted

## Context
Airbnb’s design language relies on strict, micro-tuned spacing, typography, elevation shadows, and rounded corner tokens. The styling solution needed to ensure:
- Zero global style contamination across 17 component areas
- High performance without runtime CSS-in-JS injection overhead (e.g. styled-components)
- Centralized design tokens (colors, typography, spacing, shadows, radii)
- Native support for `@media (prefers-reduced-motion: reduce)`

## Decision
We adopted **Scoped CSS Modules (`*.module.css`) paired with centralized CSS Custom Properties in `src/styles/globals.css`**.

## Alternatives Considered
1. **Tailwind CSS**: Rapid prototyping, but clutters JSX with long utility strings and complicates matching exact Airbnb design specifications (e.g. 523.5px card heights, custom box shadows).
2. **Styled-Components / Emotion**: Incurs runtime JavaScript parsing and style-tag injection overhead, increasing bundle size and FID.
3. **Global Plain CSS**: High risk of class name collisions between modal headers, cards, and buttons.

## Trade-offs & Consequences
- **Pros**: Zero runtime CSS cost, compile-time class name hashing, 100% encapsulation, clean CSS output (`~7.8 kB` gzipped).
- **Cons**: Requires writing separate `.module.css` companion files for each component.
