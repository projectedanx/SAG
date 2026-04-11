import { GoogleGenAI, Type } from "@google/genai";
import { GenerationConfig, AppItem } from '../types';

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    if (!process.env.API_KEY) {
      console.error("API_KEY is missing from environment variables.");
      throw new Error("API_KEY is missing.");
    }
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const generateAppDescription = async (
  appName: string,
  originalDesc: string,
  config: GenerationConfig
): Promise<string> => {
  const client = getClient();
  
  const prompt = `
    You are a technical copywriter for a software app store.
    Task: Re-write a description for an application.
    App Name: "${appName}"
    Context: "${originalDesc}"
    
    Constraints:
    - Keep it under ${config.maxTokens} words (approx).
    - Make it engaging and professional.
    - Return ONLY the description text.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: config.temperature,
      }
    });

    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const generateBlendedConcept = async (
  app1: AppItem,
  app2: AppItem,
  config: GenerationConfig
): Promise<{ name: string; description: string; specification?: string }> => {
  const client = getClient();

  // Check if we have deep specs to blend
  const hasSpecs = app1.specification && app2.specification;
  const specContext1 = app1.specification ? `\nTechnical Spec 1:\n${app1.specification}` : "";
  const specContext2 = app2.specification ? `\nTechnical Spec 2:\n${app2.specification}` : "";

  // If we have existing specs, we want the output to be substantial (at least 800 words or user config)
  const targetWordCount = hasSpecs ? Math.max(config.maxTokens, 800) : config.maxTokens;

  const prompt = `
    Apply Fauconnier & Turner's Conceptual Blending Theory to create a NOVEL application idea.
    
    Input Space 1: ${app1.name} - ${app1.originalDescription} ${specContext1}
    Input Space 2: ${app2.name} - ${app2.originalDescription} ${specContext2}
    
    Process:
    1. Identify the Generic Space (shared abstract structure).
    2. Project contents from both Input Spaces into a Blended Space.
    3. Perform "Completion" and "Elaboration" to create a new emergent structure.
    4. The result must be a NEW app with a unique name and description.
    ${hasSpecs ? '5. CRITICAL: Since input specs are provided, you must perform a DEEP BLEND. Synthesize the architectural patterns, data models, and philosophies of BOTH inputs into a highly detailed new Technical Specification.' : ''}
    
    Naming Protocol:
    - Create a unique, brandable name (e.g. "Synapse", "Flux", "Core").
    - DO NOT use "App 1", "Blend App", or generic titles.
    
    Constraints:
    - Name: Brandable string.
    - Description: Concise summary (under 60 words) for the dashboard card.
    - Specification: ${hasSpecs ? `MUST BE COMPREHENSIVE (~${targetWordCount} words). Expand on technical implementation. MUST INCLUDE a specific 'Key Performance Indicators (KPIs)' section with measurable metrics. Use Markdown format.` : `Detailed technical markdown (approx ${targetWordCount} words) including a dedicated KPIs section.`}
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.9, // Higher temperature for creativity
        maxOutputTokens: 8192, // Ensure enough tokens for a long specification within the JSON
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "The unique name of the new blended app" },
            description: { type: Type.STRING, description: "A concise summary (max 50 words) for the UI card." },
            specification: { type: Type.STRING, description: "The full technical specification in Markdown. Must be detailed." }
          },
          required: ["name", "description", "specification"]
        }
      }
    });

    const jsonText = response.text || "{}";
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini Blending Error:", error);
    throw error;
  }
};

export const generateConceptsFromDomains = async (
  domains: string[],
  count: number = 3
): Promise<Array<{ name: string; description: string }>> => {
  const client = getClient();
  const domainList = domains.join(", ");
  
  const prompt = `
    Role: Visionary Product Architect for the Sovereign Cognitive OS.
    Task: Use INDUCTIVE REASONING to generate ${count} novel application concepts based on the following domains: [${domainList}].

    Methodology (Inductive Loop):
    1. Observation: Identify specific, unaddressed friction points, data silos, or emerging capabilities within the selected domains.
    2. Pattern Recognition: Find the underlying structural needs (e.g., "Users in Finance lack privacy," "Health data is fragmented").
    3. Hypothesis (The App): Propose a specific software solution that solves this via Sovereign principles (Local-first, Identity-controlled, Cryptographic).

    NAMING PROTOCOL (STRICT ENFORCEMENT):
    - NO GENERIC NAMES (e.g., "Health App", "Finance Tracker", "App 1").
    - NO DESCRIPTIVE TITLES.
    - REQUIRED: Abstract, evocative, high-tech brand names.
    - FORMAT: Single word (e.g., "Oculus", "Vortex", "Aegis") or Compound (e.g., "MindVault", "BioSync", "DataFlux").
    - TONE: Futuristic, Sovereign, Cryptographic.

    Output Requirements:
    - Name: The unique brand name.
    - Description: 2 sentences. First sentence states the specific observation/problem. Second sentence defines the sovereign solution using the hypothesis.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.85,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["name", "description"]
          }
        }
      }
    });

    const jsonText = response.text || "[]";
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini Domain Generation Error:", error);
    throw error;
  }
};

export const generateAppSpecification = async (
  app: AppItem,
  config: GenerationConfig
): Promise<string> => {
  const client = getClient();
  
  const prompt = `
    Create a deterministic Technical Specification for the following application:
    
    App Name: ${app.name}
    Concept: ${app.generatedDescription || app.originalDescription}
    
    Output Format: Markdown.
    
    STRICT FORMATTING GUIDELINES:
    - Use standard Markdown syntax.
    - Enclose all code in triple backticks with the specific language (e.g. \`\`\`typescript, \`\`\`json).
    - Use clear bullet points for lists.
    - Ensure proper whitespace between sections for readability.
    
    Structure the response exactly as follows:
    
    # Technical Specification: ${app.name}
    
    ## 1. Core Philosophy & Epistemic Goals
    (Define the high-level purpose and sovereign invariants)
    
    ## 2. Key Performance Indicators (KPIs)
    (Define measurable success metrics for the generated app. MUST include at least 3 concrete metrics such as latency targets, offline availability rates, adoption percentages, or cryptographic verification speeds.)

    ## 3. User Stories & Journeys
    (3-5 critical user flows)
    
    ## 4. Data Schema
    (Define key interfaces and types. MUST use \`\`\`typescript code blocks.)
    
    ## 5. Component Architecture
    (React Component tree structure. Use indented lists.)
    
    ## 6. API Contracts
    (Function signatures for service layer. MUST use \`\`\`typescript code blocks.)
    
    ## 7. Implementation Strategy
    (Step-by-step execution plan)
    
    Constraint: Be specific, technical, and ready for a developer to implement. Use approximately ${config.maxTokens} words.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.5, // Lower temperature for deterministic specs
        maxOutputTokens: 4000, // Increased to support longer specs
      }
    });

    return response.text || "Failed to generate specifications.";
  } catch (error) {
    console.error("Gemini Spec Generation Error:", error);
    throw error;
  }
};