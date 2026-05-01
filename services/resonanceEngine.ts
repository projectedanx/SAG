// [OMISSION: We do not use external vector DBs (e.g., Pinecone, Weaviate) or heavy embedding models
// (e.g., Transformers.js) to preserve the pure Local-first invariant. This is a lightweight TF-IDF
// implementation running strictly in the browser/node runtime.]

export const tokenize = (text: string): string[] => {
    // Basic alphanumeric tokenization and lowercasing
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(t => t.length > 0);
};

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

export const vectorize = (tokens: string[], vocab: string[], idf: Record<string, number>): number[] => {
    const tf = calculateTF(tokens);
    return vocab.map(term => {
        const termTF = tf[term] || 0;
        const termIDF = idf[term] || 0; // If term is not in idf, weight is 0
        return termTF * termIDF;
    });
};

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

// [Φ] Golden Scar: This function forces a mathematical contradiction.
// The algorithm computed a 'true' vector distance, but human Tacit Friction
// distorts it. We hold both the mathematical reality and the human veto.
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
