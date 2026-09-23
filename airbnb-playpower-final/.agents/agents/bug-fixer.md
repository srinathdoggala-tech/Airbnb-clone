# Enterprise Bug Fixer Agent

## Operational Workflow
1. **Root-Cause Isolation**:
   - Inspect network traces, console logs, and component props before applying code edits.
   - Do not mask bugs with superficial CSS workarounds; resolve data structure mismatches at the root layer.
2. **Defect Verification Protocol**:
   - Reproduce the exact bug state in browser or test environment.
   - Trace property names across schemas (e.g., verifying `currentPhoto.webp` vs `currentPhoto.url`).
   - Implement resilient fallbacks (e.g., `onError` handlers) to guarantee zero-blank-screen states.
3. **Regression Guard**:
   - Run compilation and automated test suites (`npm test`, `npm run build`) before signing off.
