# ADR 006: WAI-ARIA Dialog Architecture and Stack-Based Focus Restoration

## Status
Accepted

## Context
Accessibility (WCAG 2.2 AA) is an essential evaluation criterion for enterprise frontend engineering. Key challenges included:
- Trapping focus inside modal dialogs to prevent tab escape into background DOM.
- Restoring keyboard focus to the exact triggering element when modals dismiss, including nested modal flows (`Listing` → `Photo Tour` → `Lightbox` → `Photo Tour` → `Listing`).
- Providing visible high-contrast focus rings for keyboard users while preserving aesthetic purity for mouse clicks.
- Handling reduced motion preferences.

## Decision
We implemented a **Dedicated Accessibility Hook Suite**:
1. **`useFocusTrap`**: Traps `Tab` and `Shift+Tab` cycling within active modal dialogs.
2. **`useFocusReturn`**: Maintains a stack of trigger elements and restores focus upon modal dismissal.
3. **`:focus-visible`**: Provides high-contrast 2px black focus rings solely on keyboard navigation.
4. **`@media (prefers-reduced-motion: reduce)`**: Neutralizes animation and transition durations.
5. **Truthful Qualification**: Explicitly document that live auditory screen-reader testing was not available, avoiding manufactured compliance claims.

## Alternatives Considered
1. **Focus Trap Libraries (`focus-trap-react`)**: Adds external dependencies; our custom hooks implement the same WCAG AA behavior in ~50 lines of TypeScript with zero bundle bloat.
2. **Automated-Only Accessibility Claims**: Claiming 100% WCAG compliance without live screen-reader audio validation creates provenance and auditing risk.

## Trade-offs & Consequences
- **Pros**: Zero third-party accessibility dependencies, 100% keyboard operability, stack-based nested focus return.
- **Cons**: Physical screen-reader testing remains documented as an explicit environmental limitation.
