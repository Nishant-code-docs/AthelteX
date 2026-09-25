/**
 * Cosine Similarity Matching Algorithm
 * Computes similarity between skill vectors for athlete-coach matching
 */

/**
 * Compute cosine similarity between two skill objects
 * @param {Object} vectorA - First skill vector (e.g., coach's preferred skills)
 * @param {Object} vectorB - Second skill vector (e.g., athlete's actual skills)
 * @returns {number} Similarity score between 0 and 100
 */
export function cosineSimilarity(vectorA, vectorB) {
  const keys = Object.keys(vectorA);
  
  if (keys.length === 0) return 0;

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (const key of keys) {
    const a = vectorA[key] || 0;
    const b = vectorB[key] || 0;
    dotProduct += a * b;
    magnitudeA += a * a;
    magnitudeB += b * b;
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) return 0;

  const similarity = dotProduct / (magnitudeA * magnitudeB);
  return Math.round(similarity * 100);
}

/**
 * Compute weighted match score considering both similarity and skill levels
 * @param {Object} coachPreferred - Coach's preferred skill levels
 * @param {Object} athleteSkills - Athlete's actual skill levels
 * @returns {{ matchScore: number, breakdown: Array, similarity: number }}
 */
export function computeMatchScore(coachPreferred, athleteSkills) {
  const similarity = cosineSimilarity(coachPreferred, athleteSkills);
  
  const keys = Object.keys(coachPreferred);
  const breakdown = keys.map(skill => {
    const preferred = coachPreferred[skill] || 0;
    const actual = athleteSkills[skill] || 0;
    const gap = actual - preferred;
    const percentage = preferred > 0 ? Math.round((actual / preferred) * 100) : 0;
    
    return {
      skill,
      preferred,
      actual,
      gap,
      percentage: Math.min(percentage, 120),
      status: gap >= 0 ? 'exceeds' : gap >= -10 ? 'close' : 'below',
    };
  });

  // Weighted score: 60% cosine similarity + 40% average skill fulfillment
  const avgFulfillment = breakdown.reduce((sum, b) => sum + Math.min(b.percentage, 100), 0) / breakdown.length;
  const matchScore = Math.round(similarity * 0.6 + avgFulfillment * 0.4);

  return { matchScore, breakdown, similarity };
}

/**
 * Rank athletes by match score for a given coach
 * @param {Object} coachPreferred - Coach's preferred skill levels
 * @param {Array} athletes - Array of athlete objects
 * @returns {Array} Sorted array of { athlete, matchScore, breakdown, similarity }
 */
export function rankAthletes(coachPreferred, athletes) {
  return athletes
    .map(athlete => {
      const { matchScore, breakdown, similarity } = computeMatchScore(coachPreferred, athlete.skills);
      return { athlete, matchScore, breakdown, similarity };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Find similar athletes based on skill profiles
 * @param {Object} targetSkills - The target skill profile
 * @param {Array} athletes - Array of athlete objects to compare
 * @param {string} excludeId - ID to exclude (the athlete themselves)
 * @returns {Array} Top similar athletes
 */
export function findSimilarAthletes(targetSkills, athletes, excludeId) {
  return athletes
    .filter(a => a.id !== excludeId)
    .map(athlete => ({
      athlete,
      similarity: cosineSimilarity(targetSkills, athlete.skills),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5);
}
