# EvalGate interface system

## Product surface

EvalGate uses an independent model evaluation laboratory with release strip, benchmark matrix, risk notebook, and run table. Its primary interaction is to compare evaluation runs before opening a release gate.

## Design DNA

- Product: AI model evaluation and release decision
- Navigation: releases, model-card, evaluations, findings, gate
- Visual engine: CSS evaluation matrix
- Asset system: prepared AI, benchmark and risk icons, using prepared Font Awesome assets
- Typography: scientific grotesk plus data monospace
- Palette: #f5f5f2, #17191e, #ff5c35, #20a4b8

## Differentiation rule

This interface does not reuse the shared headline, side visual, three metrics, record cards, and four-detail-panel skeleton from the first pass. Layout, navigation placement, information density, responsive behavior, and interaction hierarchy are specific to this product.

The client reads real deployed state from GenLayer Studionet. Loading and error states do not replace unavailable contract data with sample records.
