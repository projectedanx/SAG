// [OMISSION: We do not use external vector DBs (e.g., Pinecone, Weaviate) or heavy embedding models
// (e.g., Transformers.js) to preserve the pure Local-first invariant. This is a lightweight TF-IDF
// implementation running strictly in the browser/node runtime.]

/**
 * Tokenizes raw text into an array of strictly lowercase alphanumeric strings.
 * Discards punctuation to normalize inputs for the Epistemic Matrix resonance calculations.
 *
 * @param {string} text - The raw text string to tokenize.
 * @returns {string[]} An array of cleaned, lowercase alphanumeric tokens.
 */
export const tokenize = (text: string): string[] => {
    // Basic alphanumeric tokenization and lowercasing
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(t => t.length > 0);
};

/**
 * Calculates Term Frequency (TF) for a given array of tokens.
 * TF is the ratio of a term's occurrences to the total number of tokens in the document.
 *
 * @param {string[]} tokens - An array of tokens representing a document.
 * @returns {Record<string, number>} A dictionary mapping each token to its calculated term frequency.
 */
export const calculateTF = (tokens: string[]): Record<string, number> => {
    const tf: Record<string, number> = {};
    const totalTokens = tokens.length;
    if (totalTokens === 0) return tf;

    for (const token of tokens) {
        tf[token] = (tf[token] || 0) + 1;
    }

    for (const token in tf) {
        tf[token] = tf[token] / totalTokens;
    }
    return tf;
};

/**
 * Calculates Inverse Document Frequency (IDF) across a provided corpus of documents.
 * IDF measures how much information a word provides (rare words have higher IDF).
 *
 * @param {string[][]} corpus - An array of documents, where each document is an array of tokens.
 * @returns {Record<string, number>} A dictionary mapping each unique token to its IDF score.
 */
export const calculateIDF = (corpus: string[][]): Record<string, number> => {
    const idf: Record<string, number> = {};
    const totalDocs = corpus.length;
    if (totalDocs === 0) return idf;

    // Count how many documents contain each term
    const docFrequency: Record<string, number> = {};
    for (const docTokens of corpus) {
        // Use a Set to count each word only once per document
        const uniqueTokens = new Set(docTokens);
        for (const token of uniqueTokens) {
            docFrequency[token] = (docFrequency[token] || 0) + 1;
        }
    }

    for (const token in docFrequency) {
        // idf = log(N / df)
        idf[token] = Math.log(totalDocs / docFrequency[token]);
    }

    return idf;
};

/**
 * Converts a document into a numerical TF-IDF vector against a global vocabulary.
 * This function forms the core spatial representation of an app's persona within the matrix.
 *
 * @param {string[]} tokens - The tokens of the document to vectorize.
 * @param {string[]} vocab - The global list of all unique terms across the corpus.
 * @param {Record<string, number>} idf - The pre-calculated IDF dictionary for the corpus.
 * @returns {number[]} A dense numerical array representing the TF-IDF vector.
 */
export const vectorize = (tokens: string[], vocab: string[], idf: Record<string, number>): number[] => {
    const tf = calculateTF(tokens);
    return vocab.map(term => {
        const termTF = tf[term] || 0;
        const termIDF = idf[term] || 0; // If term is not in idf, weight is 0
        return termTF * termIDF;
    });
};

/**
 * Calculates the cosine similarity between two high-dimensional mathematical vectors.
 * Measures the angular alignment between queries and matrix applications, outputting a score between 0.0 and 1.0.
 *
 * @param {number[]} vecA - The first numerical vector.
 * @param {number[]} vecB - The second numerical vector.
 * @returns {number} The cosine similarity score, where 1.0 indicates perfect alignment.
 */
export const calculateCosineSimilarity = (vecA: number[], vecB: number[]): number => {
    if (vecA.length !== vecB.length || vecA.length === 0) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] * vecA[i];
        normB += vecB[i] * vecB[i];
    }

    if (normA === 0 || normB === 0) return 0;

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

/**
 * [Φ] Golden Scar Implementation: Forces a mathematical contradiction by applying human Tacit Friction to the baseline score.
 * By artificially distorting the calculated similarity using the Golden Ratio (1.618 or 0.618),
 * it ensures the system holds both mathematical reality and human veto in structural tension.
 *
 * @param {number} score - The baseline, mathematically calculated cosine similarity score.
 * @param {'Resonant' | 'Dissonant' | undefined} feedback - The human-injected friction altering the matrix logic.
 * @returns {number} The newly perturbed resonance score holding the structural contradiction.
 */
export const applyHumanPerturbation = (score: number, feedback: 'Resonant' | 'Dissonant' | undefined): number => {
    if (feedback === 'Resonant') {
        // Boost score, max 1.0 (Golden Ratio multiplier approximation for aesthetic tension)
        return Math.min(1.0, score * 1.618);
    } else if (feedback === 'Dissonant') {
        // Penalize score, min 0.0
        return Math.max(0.0, score * 0.618);
    }
    return score;
};
