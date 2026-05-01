import { describe, test, expect } from "vitest";
import {
    tokenize,
    calculateTF,
    calculateIDF,
    calculateCosineSimilarity,
    applyHumanPerturbation,
    vectorize
} from '../services/resonanceEngine';

// [∇] Uncertainty: The TF-IDF model is highly sensitive to tokenization rules.
// We assume basic alphanumeric splitting here.

describe('Resonance Engine', () => {
    test('tokenize handles basic strings and lowercases', () => {
        const text = "Hello World! This is a test.";
        const tokens = tokenize(text);
        expect(tokens).toEqual(['hello', 'world', 'this', 'is', 'a', 'test']);
    });

    test('calculateTF computes term frequencies correctly', () => {
        const tokens = ['apple', 'banana', 'apple', 'orange'];
        const tf = calculateTF(tokens);
        expect(tf['apple']).toBe(2/4);
        expect(tf['banana']).toBe(1/4);
        expect(tf['orange']).toBe(1/4);
    });

    test('calculateIDF computes inverse document frequencies correctly', () => {
        const corpus = [
            ['apple', 'banana'],
            ['apple', 'orange', 'grape'],
            ['banana', 'kiwi']
        ];
        // Total docs = 3.
        // 'apple' appears in 2. idf = log(3/2)
        // 'banana' appears in 2. idf = log(3/2)
        // 'orange' appears in 1. idf = log(3/1)
        const idf = calculateIDF(corpus);
        expect(idf['apple']).toBeCloseTo(Math.log(3/2));
        expect(idf['banana']).toBeCloseTo(Math.log(3/2));
        expect(idf['orange']).toBeCloseTo(Math.log(3/1));
    });

    test('vectorize transforms text into tf-idf vectors', () => {
        const vocab = ['apple', 'banana', 'orange'];
        const idf = { 'apple': 0.1, 'banana': 0.2, 'orange': 0.3 };
        const tokens = ['apple', 'apple', 'orange']; // tf: apple=2/3, orange=1/3, banana=0

        const vec = vectorize(tokens, vocab, idf);
        expect(vec[0]).toBeCloseTo((2/3) * 0.1); // apple
        expect(vec[1]).toBe(0);                  // banana
        expect(vec[2]).toBeCloseTo((1/3) * 0.3); // orange
    });

    test('calculateCosineSimilarity handles identical, orthogonal, and mixed vectors', () => {
        const vecA = [1, 0, 1];
        const vecB = [1, 0, 1];
        const vecC = [0, 1, 0];
        const vecD = [0.5, 0.5, 0];

        expect(calculateCosineSimilarity(vecA, vecB)).toBeCloseTo(1.0);
        expect(calculateCosineSimilarity(vecA, vecC)).toBe(0.0);
        expect(calculateCosineSimilarity(vecC, vecD)).toBeGreaterThan(0.0);
    });

    test('calculateCosineSimilarity returns 0 for zero vectors', () => {
        const vecA = [0, 0, 0];
        const vecB = [1, 1, 1];
        expect(calculateCosineSimilarity(vecA, vecB)).toBe(0);
    });

    // [⊘] Contradiction: Mathematical similarity vs. Tacit Human Value.
    // The human perturbation explicitly distorts the mathematical vector space.
    test('applyHumanPerturbation distorts the mathematical score', () => {
        const baseScore = 0.5;

        // [Φ] Golden Scar: The exact weights (1.618, 0.618) are hardcoded based on the aesthetic tension requirement.
        const resonantScore = applyHumanPerturbation(baseScore, 'Resonant');
        expect(resonantScore).toBe(Math.min(1.0, baseScore * 1.618));

        const dissonantScore = applyHumanPerturbation(baseScore, 'Dissonant');
        expect(dissonantScore).toBe(Math.max(0.0, baseScore * 0.618));

        const neutralScore = applyHumanPerturbation(baseScore, undefined);
        expect(neutralScore).toBe(baseScore);
    });
});
