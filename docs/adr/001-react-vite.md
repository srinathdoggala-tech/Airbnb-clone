# ADR 001: Selection of React 18 and Vite as Core Build Engine

## Status
Accepted

## Context
The take-home assignment requires delivering a pixel-perfect, high-performance desktop implementation of an Airbnb listing page. We needed a frontend build engine that satisfies:
- Immediate HMR feedback (<50ms) during UI fine-tuning
- Strict TypeScript type safety
- Minimal production bundle footprint (<100 kB gzipped)
- Native ES module handling without heavy Webpack overhead

## Decision
We adopted **React 18.3.1 with Vite 6.4.3** and TypeScript 5.7.2.

## Alternatives Considered
1. **Next.js (App Router)**: Adds significant server runtime complexity, SSR hydration overhead, and node server requirements unnecessary for a static client-side listing reproduction.
2. **Create React App / Webpack**: Outdated build toolchain with slow incremental compilation and bloated vendor chunks.
3. **Vanilla JavaScript**: Maximum runtime performance, but sacrifices component composability, type safety, and testing ergonomics across 17 distinct component modules.

## Trade-offs & Consequences
- **Pros**: Lightning-fast production builds (~3.5s), zero runtime configuration, lean ~69.8 kB gzipped JS bundle.
- **Cons**: Client-rendered only; initial HTML does not contain pre-rendered markup. Fully acceptable for this desktop take-home scope.
