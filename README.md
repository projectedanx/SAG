<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Sovereign OS - Application Matrix Generator

The **Sovereign OS - Application Matrix Generator** is an advanced epistemic toolset built to iteratively design, audit, and blend localized, privacy-first application architectures. Utilizing a multi-phase DCCD (Draft-Conditioned Constrained Decoding) workflow backed by Gemini, it induces novel concepts and subjects them to rigorous architectural constraints.

## Foundational Philosophy: Sovereign OS
This project strictly adheres to the "Sovereign OS" architectural paradigm:
1. **Local-first Architecture:** Data lives entirely on the device.
2. **Cryptographic Proofs:** Verification over trust.
3. **Identity-controlled Data:** Users maintain full sovereignty over their digital footprint.

## Core Mechanisms
- **Epistemic Matrix:** The central state container managing all application personas (AppItems), tracking their evolution from raw concepts to detailed Technical Specifications.
- **Genesis Engine:** Uses inductive reasoning to generate novel Sovereign app concepts from foundational domains (e.g., DeFi, Cognitive Science).
- **Resonance Engine:** A lightweight, local-first TF-IDF vectorizer that calculates similarity between human queries and generated concepts. It implements the **Golden Scar** logic, a paraconsistent perturbation holding both mathematical reality and human veto in structural tension.
- **Topological Causal Sculpting:** Injects human 'Operational Friction' into deterministic specifications. It purposefully avoids averaging out contradiction, measuring the strain as 'Metabolic Cost'.
- **Sovereign Audits & CFDI Scoring:** Evaluates specifications against Sovereign invariants. Identifies "Algorithmic Shame" or drift via a Confidence-Fidelity Divergence Index (CFDI) score.
- **Pluriversal Capsule Generators:** Encapsulates the state, friction, and structural tension into verifiable, Zero-Entropy artifacts compliant with JSON Schema Draft 2020-12.
- **KORSAKOV MCP Server:** A localized Model Context Protocol server enabling programmatic read/write access to the persistent Epistemic Matrix (`matrix.json`) using strict SERF-compliant error recoveries.

## Run Locally

**Prerequisites:** Node.js v18+

### Setup the Frontend Interface
1. Install dependencies:
   `npm install`
2. Configure your environment:
   Create a `.env.local` file in the root directory and add your Gemini API key:
   `API_KEY=your_gemini_api_key_here`
3. Run the development server:
   `npm run dev`

### Setup the KORSAKOV MCP Server
To allow external agents to interface with your local Matrix state:
1. Navigate to the server directory:
   `cd matrix-mcp-server`
2. Install dependencies and build:
   `npm install`
   `npm run build`
3. The server runs via standard I/O (stdio transport) using the `node build/index.js` command, which can be hooked into compliant MCP clients (e.g., Claude Desktop).

## Developer Documentation
All public interfaces, types, and services are fully documented using JSDoc/TSDoc. Developers should familiarize themselves with `types.ts` to understand the data schema and `services/AppContext.tsx` to understand the state flow.

*Note: Maintain strict Root Hygiene. Ensure no unauthorized artifacts exist at the root level, excluding configuration files like metadata.json.*
