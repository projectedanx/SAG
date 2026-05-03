import { AppItem } from '../types';

export interface PluriversalCapsule {
  capsule_id: string;
  app_reference: string;
  Hickam_Orientation: {
    primary_axiom: string;
    competing_vectors: string[];
  };
  Contrastive_Delta: {
    mathematical_resonance: number;
    human_friction_input: string;
    golden_scar_multiplier?: number;
  };
  Martensite_Metrics: {
    CFDI_score: number;
    metabolic_cost: number;
    epistemic_escrow_triggered: boolean;
  };
}

/**
 * Generates a cryptographic-like hash identifier for the capsule.
 * In a production local-first environment, this would use WebCrypto API.
 */
const generateCapsuleId = (appId: string, timestamp: number): string => {
  return `pkc-${appId}-${timestamp.toString(16)}`;
};

/**
 * Constructs a Pluriversal Knowledge Capsule (PKC) holding the structural
 * ambiguity and tension between the AI's deterministic state and human tacit friction.
 *
 * @param app The application item in its current state.
 * @returns A structured PluriversalCapsule holding the tension [∇]
 */
export const generatePluriversalCapsule = (app: AppItem): PluriversalCapsule => {
  const isDissonant = app.humanFeedback === 'Dissonant';
  const isResonant = app.humanFeedback === 'Resonant';

  // Calculate the golden scar multiplier based on the Paraconsistent logic defined in Epic 3
  let goldenScarMultiplier = 1.0;
  if (isResonant) goldenScarMultiplier = 1.618;
  if (isDissonant) goldenScarMultiplier = 0.618;

  const cfdiScore = app.cfdiScore ?? 0;
  const epistemicEscrowTriggered = cfdiScore > 0.15;

  const competingVectors = [];
  if (app.operationalFriction) {
    competingVectors.push(`Human Friction: ${app.operationalFriction.substring(0, 50)}...`);
  }
  if (app.specification) {
    competingVectors.push("Deterministic Matrix Specification");
  }

  return {
    capsule_id: generateCapsuleId(app.id, Date.now()),
    app_reference: app.id,
    Hickam_Orientation: {
      primary_axiom: app.name,
      competing_vectors: competingVectors.length > 0 ? competingVectors : ["Stable Baseline"],
    },
    Contrastive_Delta: {
      mathematical_resonance: app.resonanceScore ?? 0,
      human_friction_input: app.operationalFriction ?? "None",
      golden_scar_multiplier: goldenScarMultiplier,
    },
    Martensite_Metrics: {
      CFDI_score: cfdiScore,
      metabolic_cost: app.metabolicCost ?? 0,
      epistemic_escrow_triggered: epistemicEscrowTriggered,
    }
  };
};

/**
 * Utility to stringify the capsule, fulfilling the Zero-Entropy Code Emission
 * requirement (JSON Schema Draft 2020-12 compliance).
 */
export const exportCapsuleToJSON = (capsule: PluriversalCapsule): string => {
  return JSON.stringify(capsule, null, 2);
};
