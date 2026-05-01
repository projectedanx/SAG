export interface AppItem {
  id: string;
  name: string;
  originalDescription: string;
  generatedDescription?: string;
  specification?: string; // New field for technical specs
  status: 'idle' | 'generating' | 'completed' | 'failed' | 'auditing' | 'sculpting';
  operationalFriction?: string;
  metabolicCost?: number;
  tokenUsage?: number;
  isBlended?: boolean;
  isDeepBlend?: boolean;
  cfdiScore?: number;
  auditLog?: string;
  resonanceScore?: number;
  humanFeedback?: 'Resonant' | 'Dissonant';
}

export interface GenerationConfig {
  maxTokens: number;
  temperature: number;
}

export type LogEntry = {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'system';
};

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