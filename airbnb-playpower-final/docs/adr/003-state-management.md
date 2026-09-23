# ADR 003: Lightweight Native State with URL History Synchronization

## Status
Accepted

## Context
The application manages interactive modals (Photo Tour, Lightbox, Amenities, Share, Reservation), date ranges, guest counts, and wishlist persistence. The state management architecture needed to balance simplicity, maintainability, and deep-linking capabilities.

## Decision
We adopted **Native React 18 State (`useState`, custom hooks) combined with a custom `useUrlSync` bidirectional URL search parameter and `popstate` history hook**.

## Alternatives Considered
1. **Redux Toolkit**: Severe over-engineering for a single-page listing; introduces boilerplate, slices, and larger bundle size.
2. **Zustand**: Clean state store, but adds third-party dependencies when React's native hook primitives combined with custom hooks (`useLocalStorage`, `useFocusReturn`, `useUrlSync`) handle the requirements natively with zero dependencies.

## Trade-offs & Consequences
- **Pros**: Zero external state dependencies, instant deep-linking via query parameters (`?modal=photo-tour`, `?modal=lightbox&photo=12`), native browser Back/Forward navigation support.
- **Cons**: Component state passed via props down to immediate children.
