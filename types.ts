/**
 * Represents the fundamental unit of the Epistemic Matrix within the Sovereign OS paradigm.
 * Holds both deterministic configurations and human-imposed paraconsistent constraints.
 */
export interface AppItem {
  /** Cryptographic or locally generated unique identifier for the app persona */
  id: string;
  /** Evocative, sovereign-aligned brand name */
  name: string;
  /** The initial baseline description of the application */
  originalDescription: string;
  /** The LLM-expanded description detailing sovereign capabilities */
  generatedDescription?: string;
  /** The complete technical specification formatted in Markdown detailing architecture and KPIs */
  specification?: string;
  /** Current state of the application within the DCCD (Draft-Conditioned Constrained Decoding) workflow */
  status: 'idle' | 'generating' | 'completed' | 'failed' | 'auditing' | 'sculpting';
  /** The tacit human constraint or edge case forcing contradiction with the deterministic spec */
  operationalFriction?: string;
  /** Thermodynamic/cognitive load (Joules/kN) required to resolve spatial/logical constraints between the original spec and injected friction */
  metabolicCost?: number;
  /** Tracks AI usage metrics */
  tokenUsage?: number;
  /** Indicates if this app was created by merging two distinct domains (Conceptual Blend) */
  isBlended?: boolean;
  /** Indicates if this app involves deeper structural integration of two complex specifications */
  isDeepBlend?: boolean;
  /** Confidence-Fidelity Divergence Index (0.0 to 1.0). >0.15 indicates Algorithmic Shame or drift from Sovereign invariants */
  cfdiScore?: number;
  /** Detailed critique addressing transitivity fallacies or monotonic logic cascades identified during a Sovereign Audit */
  auditLog?: string;
  /** The mathematical vector similarity score used within the lightweight TF-IDF Resonance Engine */
  resonanceScore?: number;
  /** Human-imposed perturbation to apply a 'Golden Scar' (aesthetic tension multiplier) to the resonance score */
  humanFeedback?: 'Resonant' | 'Dissonant';
}

/**
 * Configuration parameters strictly guiding the deterministic outputs of the LLM services.
 */
export interface GenerationConfig {
  /** Maximum token limit ensuring sufficient length for technical specifications */
  maxTokens: number;
  /** Determines the thermodynamic randomness (higher for creativity, lower for strict DCCD adherence) */
  temperature: number;
}

/**
 * Represents a discrete event or state change logged within the system's terminal view.
 */
export type LogEntry = {
  /** ISO standard timestamp or localized time string of the event */
  timestamp: string;
  /** The descriptive content of the event */
  message: string;
  /** The category of the event, determining aesthetic presentation in the terminal */
  type: 'info' | 'success' | 'error' | 'system';
};

/**
 * Pre-defined foundational categories from which the Genesis Engine induces novel Sovereign app concepts.
 */
export type AppDomain = 
  | 'Productivity' 
  | 'Health & Wellness' 
  | 'Social Graph' 
  | 'DeFi & Finance' 
  | 'Education' 
  | 'Gaming' 
  | 'Sovereign Identity' 
  | 'Cognitive Science'
  | 'Sustainability'
  | 'Art & Creativity';

/**
 * Constant array containing all available Application Domains for inductive generation.
 * @type {AppDomain[]}
 */
export const APP_DOMAINS: AppDomain[] = [
  'Productivity',
  'Health & Wellness',
  'Social Graph',
  'DeFi & Finance',
  'Education',
  'Gaming',
  'Sovereign Identity',
  'Cognitive Science',
  'Sustainability',
  'Art & Creativity'
];

/**
 * The initial immutable state representing foundational applications seeded into the Epistemic Matrix.
 * @type {Omit<AppItem, 'id' | 'status'>[]}
 */
export const INITIAL_APP_DATA: Omit<AppItem, 'id' | 'status'>[] = [
  { 
    name: "Cognitex", 
    originalDescription: "A personal knowledge graph that indexes your reading history locally to surface serendipitous connections between disparate ideas." 
  },
  { 
    name: "VaultStream", 
    originalDescription: "A self-sovereign financial dashboard that aggregates DeFi positions across chains without exposing keys to a central server." 
  },
  { 
    name: "AuraSync", 
    originalDescription: "A biometric health monitor that correlates circadian rhythm data with productivity blocks to optimize deep work schedules." 
  },
  { 
    name: "LexiconDAO", 
    originalDescription: "A decentralized publishing platform where readers co-own the copyright of evolving collaborative fiction works." 
  },
  { 
    name: "EchoGarden", 
    originalDescription: "An ambient soundscape generator that adapts structurally to your current code velocity and typing cadence." 
  },
  { 
    name: "Civitas", 
    originalDescription: "A hyper-local governance tool allowing neighborhoods to vote on resource allocation using quadratic funding principles." 
  }
];