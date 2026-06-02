# AGENTS.md: Sovereign OS Matrix Generator Instructions

## Metadata
```yaml
name: sovereign-os-matrix-generator-agent
version: 1.0.0
created: 2026-06-03T00:00:00Z
maintainer: Sovereign Core
description: "Instructions and build limits for autonomous agents acting upon the root Epistemic Matrix repository."
```

---

## Deterministic Build Limits & Instructions

Agents operating within this repository MUST adhere to the following strict build and operational limits:

1.  **Dependencies:** Strict versioning only. No `latest` or `^` or `~` ranges for new production dependencies. Convert unpinned ranges to exact semantic versions when interacting with `package.json`.
2.  **Code Output:** Agents must not emit code that violates the Semantic Aesthetic token system. Explicit color utilities (e.g., `text-white`) are forbidden.
3.  **Root Hygiene:** Agents are strictly forbidden from leaving execution artifacts (e.g., `output.md`, `scratchpad.txt`) in the root directory. Clean up any transient files before task completion.
4.  **Test Suite Execution:** Before submitting any change that mutates the codebase, agents must verify stability using the exact commands: `npm run test:unit`, `npm run test:integration`, and `npm run test:roundtrip`.
5.  **Documentation Updates:** All JSDoc and Markdown updates must conform to the Empirical Documentation standard, anchoring terms to the underlying conceptual framework rather than generic programming terms (e.g., `cfdiScore` must be documented as "measure of Algorithmic Shame").

## Executable Self-Test Contract
An agent operating on this repository is considered compliant if and only if it completes a multi-phase DCCD workflow without violating the Prune-First or Root Hygiene protocols.
