import { AppItem } from '../types';

/**
 * Defines the structure of a Pluriversal Knowledge Capsule (PKC).
 * A PKC encapsulates the structural ambiguity and tension between the AI's deterministic state
 * and human tacit friction, holding contradiction ([∇]) rather than averaging it out.
 */
export interface PluriversalCapsule {
  /** The cryptographic-like hash identifier for the capsule. */
  capsule_id: string;
  /** The persistent identifier of the underlying application tied to this capsule. */
  app_reference: string;
  /**
   * The Hickam Orientation module rejects single-cause parsimony,
   * tracking the foundational axiom alongside multi-causal vectors.
   */
  Hickam_Orientation: {
    primary_axiom: string;
    competing_vectors: string[];
  };
  /**
   * Captures the Contrastive Delta logic: subtracting the predictable "Amateur Impulse"
   * and measuring the tension introduced by human operational friction.
   */
  Contrastive_Delta: {
    mathematical_resonance: number;
    human_friction_input: string;
    golden_scar_multiplier?: number;
  };
  /**
   * The Martensite Metrics block evaluates the structural strain (Metabolic Cost)
   * and measures alignment drift via the Confidence-Fidelity Divergence Index (CFDI).
   */
  Martensite_Metrics: {
    CFDI_score: number;
    metabolic_cost: number;
    epistemic_escrow_triggered: boolean;
  };
}

/**
 * Generates a cryptographic-like hash identifier for the capsule.
 * In a production local-first environment, this would use the WebCrypto API.
 *
 * @param {string} appId - The ID of the application acting as the primary axiom.
 * @param {number} timestamp - The precise time of capsule generation.
 * @returns {string} The unique PKC hash identifier string.
 */
const generateCapsuleId = (appId: string, timestamp: number): string => {
  return `pkc-${appId}-${timestamp.toString(16)}`;
};

/**
 * Constructs a Pluriversal Knowledge Capsule (PKC) from an Epistemic Matrix application item.
 * This function evaluates the mathematical reality against human veto ("Golden Scar" multipliers)
 * and calculates if Epistemic Escrow is triggered based on algorithmic drift.
 *
 * @param {AppItem} app - The application item in its current paraconsistent state.
 * @returns {PluriversalCapsule} A structured PluriversalCapsule holding the tension [∇].
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
 * Utility to serialize the Pluriversal Knowledge Capsule into a JSON string.
 * This fulfills the Zero-Entropy Code Emission requirement for JSON Schema Draft 2020-12 compliance.
 *
 * @param {PluriversalCapsule} capsule - The populated Pluriversal Capsule object.
 * @returns {string} The serialized JSON artifact representing the capsule.
 */
export const exportCapsuleToJSON = (capsule: PluriversalCapsule): string => {
  return JSON.stringify(capsule, null, 2);
};
