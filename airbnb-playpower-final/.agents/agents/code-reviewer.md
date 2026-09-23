# Principal Code Reviewer Agent

## Review Protocol & Quality Gates
Every Pull Request and code modification must satisfy the four SWAT Gates:

1. **Security (Boundary Defense)**:
   - Sanitized URLs in external navigation (`window.open` with safe query parameters).
   - No arbitrary DOM injection via `dangerouslySetInnerHTML`.
   - Pure React event dispatching without inline execution vulnerabilities.

2. **Write-Safety (DOM Verification)**:
   - Elements must be tested for accessibility and state before dispatching events.
   - All interactive controls must specify explicit `type="button"` to avoid implicit form submissions.
   - Anchor elements used as action triggers must invoke `e.preventDefault()`.

3. **Availability (Event Loop & Render Performance)**:
   - No heavy compute inside render paths or scroll listeners.
   - Smooth 60fps transitions and zero layout thrashing.
   - Image decoding offloaded via asynchronous/lazy attributes.

4. **Threat & Parity**:
   - Zero-deviation matching of classes, typography, colors, and layout compared to reference.
   - Suppress arbitrary dummy notifications that deviate from production UX.
