# 001. Implementation of the Epistemic Matrix and KORSAKOV MCP Server

## Status
Accepted

## Context
The Sovereign OS Application Matrix Generator requires a persistent state container that aligns with the Sovereign principles (Local-first, Identity-controlled). Initially, the application logic was entirely ephemeral within the React frontend, leading to a loss of the conceptual substrate upon refresh and violating the local persistence requirement for a true Sovereign identity application. Furthermore, a mechanism was needed to allow external, local agents to interface with this matrix safely.

## Decision
We decided to implement the **Epistemic Matrix** as a persistent, queryable Local-first JSON layer (`matrix.json`), serving as the central state container.
To expose this state safely to local agent networks, we established a **KORSAKOV MCP Server** (`matrix-mcp-server`), utilizing the Model Context Protocol over a standard I/O (stdio) transport.
The server strictly enforces the KORSAKOV architectural manifest, specifically the zero-entropy code emission using JSON Schema Draft 2020-12 and SERF-compliant structured error recoveries for all read/write operations.

## Consequences
- **Positive:** Ensures data remains local-first and identity-controlled on the user's disk. Enables programmatic, deterministic access and modification of the application matrix by external local AI tooling. Satisfies Epic 1 dependencies for a persistent layer.
- **Negative:** Introduces a decoupled architecture (React app vs MCP server process) that must be managed and run simultaneously by the operator.
