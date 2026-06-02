# CONSTRAINTS.md

The Sovereign OS - Application Matrix Generator enforces the following architectural, operational, and aesthetic constraints. These are not guidelines; they are deterministic boundaries.

## 1. Local-First Invariant
Data lives entirely on the device. No reliance on external databases, central AI APIs (except explicit Gemini DCCD tasks), or telemetry servers. All persistent state is written to local disk (e.g., `matrix.json`).

## 2. Root Hygiene
The repository must maintain a pristine boiler-room state. No unauthorized or temporary artifact files (e.g., `output.md`, `test.json`) may exist at the root level. Explicitly permitted root metadata: `metadata.json`.

## 3. Prune-First Protocol
Before adding new structural implementations, developers and agents must execute a search for redundant, deprecated, or "hallway trash" artifacts and remove them. This minimizes thermodynamic entropy within the build.

## 4. Concurrency Protocol Constraint
*   **Parallel Execution:** All read-only information gathering operations (e.g., codebase search, file reading) MUST be executed in parallel.
*   **Sequential Mutability:** All state-mutating actions (e.g., file edits, terminal commands) MUST ALWAYS be executed sequentially to prevent paraconsistent race conditions.

## 5. UI Aesthetic Constraint (Conceptual Blending Theory)
Direct color utility classes (e.g., `text-white`, `bg-blue-500`) are explicitly FORBIDDEN when generating or modifying UI components. Only semantic tokens (e.g., `--primary`, `--surface`, `text-primary`) are permitted, preserving the abstract aesthetic mapping necessary for Sovereign blending.

## 6. Structural Isomorphic Expression
Code structure must reflect the conceptual value. The system must not automatically resolve ambiguity; it must act as a Tactile Dialectician, holding subjective friction and objective constraints in tension, quantified by the CFDI Score and Metabolic Cost metrics.
