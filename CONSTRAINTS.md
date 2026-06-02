# CONSTRAINTS.md

## Structural Architectural Constraints

1. **Sovereign OS Paradigms:**
   - **Local-first Architecture:** Data must live entirely on the device. No cloud syncing of unencrypted user application matrices.
   - **Cryptographic Proofs:** System interactions require verification over trust.
   - **Identity-controlled Data:** Users maintain full sovereignty over their digital footprint and configurations.

2. **UI Aesthetic Constraint (Conceptual Blending Theory):**
   - **Rule:** NEVER use direct color utility classes (e.g., `text-white`) when generating or modifying UI components.
   - **Enforcement:** Only semantic tokens (e.g., `text-slate-200`, `text-sovereign-500`, `--primary`) are permitted to preserve visual coherence across topological themes.

3. **Concurrency Protocol Constraint:**
   - **Rule:** All read-only information gathering operations (e.g., `read_file`, `list_files`) MUST be executed in parallel.
   - **Rule:** All state-mutating actions (e.g., `edit_file`, `run_terminal_cmd`) MUST ALWAYS be executed sequentially to prevent race conditions.

4. **Root Hygiene Constraint (Prune-First Protocol):**
   - **Rule:** The repository enforces strict 'Root Hygiene'. Non-standard root-level scripts or artifact files must be pruned.
   - **Exception:** `metadata.json` is a critical core configuration file that must be preserved.
   - **Enforcement:** Infrastructure modifications must be reasoned through DISCOVER, CLASSIFY, VERIFY, and JOURNAL steps, and documented in a `.jules/superintendent.md` journal entry.

5. **Epistemic Validation & Formatting Constraint:**
   - **Rule:** Final output for Architectural Gerontology Tasks must include a calculated Tension Metric (Novelty vs. Grounding Score) and adhere to a strict JSON Schema containing keys: `outcome_type`, `target_module`, `initial_cognitive_complexity_score`, `hypothesis_summary`, `ACU_robustness_score`, `tension_metric`, and `justification_or_plan`.
   - **Output Format:** Final outputs must begin with a structured JSON block containing `Hickam_Orientation`, `Contrastive_Delta`, and `Martensite_Metrics`, followed by a markdown separator `---` and the final response.

6. **Communication Constraints:**
   - **No_Evaluative_Adjectives:** Avoid subjective descriptors; use measurable, objective language.
   - **No_Preamble:** Begin output directly; omit conversational introductions.
   - **Enforce_Bicameral_Output:** Use structured blocks (e.g., JSON metadata + content).

7. **Documentation Constraints:**
   - **Empirical over Traditional:** The repository strictly enforces Empirical Documentation standards. Use `AGENTS.md` for deterministic build limits, `DOMAIN_GLOSSARY.md` / `CONSTRAINTS.md` for bounded vocabulary, and sequentially numbered Architecture Decision Records (e.g., `docs/adr/*.md`) to capture structural tradeoffs.
   - **Sovereign Taxonomy:** When documenting code (JSDoc/TSDoc), explicitly anchor types and descriptions to the 'Sovereign OS' conceptual framework (e.g., describing `cfdiScore` as a measure of 'Algorithmic Shame' rather than using generic float descriptions).

8. **Dependency Constraint:**
   - **Rule:** Strict dependency versioning is enforced. Use minor and patch bumps only (`~` or `^` to specific versions). Convert any `latest` or `*` dependencies to pinned semantic versions.

9. **MCP KORSAKOV Constraints:**
   - **Rule:** Server implementations must adhere to the KORSAKOV architectural manifest: strictly enforce JSON Schema Draft 2020-12, implement SERF-compliant structured error recoveries, and follow the multi-phase DCCD workflow.

10. **TACTILE_DIALECTICIAN Protocol:**
    - **Rule:** Hold ambiguity in tension and never auto-resolve contradictions.
    - **Markers:** Mark uncertainty with `[∇]`, contradictions with `[⊗]`, omissions with `[OMISSION: <rationale>]`, and irreconcilable paths with `[Φ]`. Output a Pluriversal Knowledge Capsule.
