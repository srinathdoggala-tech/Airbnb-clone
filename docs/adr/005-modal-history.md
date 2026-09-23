# ADR 005: Dual-Layer Modal Navigation with History Stack Synchronization

## Status
Accepted

## Context
The Airbnb reference application supports opening a single-photo Lightbox either directly from the Hero Gallery or from within the full-screen Photo Tour modal. When closing the Lightbox, the application must remember its origin:
- If opened from Photo Tour: closing Lightbox returns to Photo Tour.
- If opened from Hero Gallery: closing Lightbox returns to Primary Listing.
Additionally, users expect browser Back and Forward navigation to step through modals naturally without losing page context.

## Decision
We implemented a **Dual-Layer Modal Navigation Architecture**:
1. `lightboxOrigin` state (`'hero' | 'tour'`) tracks invocation context.
2. `useUrlSync` synchronizes the active modal and photo index into `window.history.pushState` (`?modal=photo-tour`, `?modal=lightbox&photo=14&origin=tour`).
3. `popstate` event listener interprets browser Back/Forward actions and updates modal state reactively.
4. Input sanitization clamps out-of-bounds indices and falls back to listing on unrecognized parameters.

## Alternatives Considered
1. **Single Flat Modal State**: Fails to restore the intermediate Photo Tour modal when closing the Lightbox.
2. **React Router DOM**: Heavy third-party dependency; adds routing abstraction when simple query synchronization satisfies the requirement cleanly.

## Trade-offs & Consequences
- **Pros**: Matches reference behavior with 100% fidelity; supports direct deep links and browser Back/Forward.
- **Cons**: Requires explicit origin tracking in modal trigger handlers.
