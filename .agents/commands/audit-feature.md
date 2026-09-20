# Command: audit-feature

## Purpose
Executes a full SWAT matrix audit against a specified component or feature change.

## Execution Checklist
1. Validate Security boundaries (XSS, arbitrary URI schemes).
2. Validate Write-safety (element visibility, preventDefault on anchors).
3. Validate Availability (render loop impact, bundle size impact).
4. Run project build gate: `npm run build`.
