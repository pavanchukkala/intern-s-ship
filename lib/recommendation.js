// lib/recommendation.js

/**
 * Recommends internships based on multiple factors:
 * - Relevance score (e.g., skills match, location)
 * - User interaction score (clicks, views, engagement)
 * - Popularity score (company reputation, demand)
 * - Recency score (how new the internship is)
 * - A random factor (to keep things fresh)
 *
 * @param {Array} internships - Array of internship objects.
 * Each internship object can have:
 *    - relevanceScore (number)
 *    - userInteractionScore (number)
 *    - popularityScore (number)
 *    - createdAt (timestamp or date string)
 *
 * @param {Object} options - Custom options for weighting and randomness.
 *    - randomnessFactor: Multiplier for the random component.
 *    - weights: Object containing weights for relevance, userInteraction, popularity, and recency.
 *    - now: (Optional) Timestamp to compute recency, defaults to current time.
 *
 * @returns {Array} - Sorted array of internships based on the composite score.
 */
export function recommendInternships(internships, options = {}) {
  const {
    randomnessFactor = 1,
    weights = {
      relevance: 1.0,
      userInteraction: 0.5,
      popularity: 0.5,
      recency: 0.3,
    },
    now = Date.now(),
  } = options;

  const scoredInternships = internships.map((internship) => {
    // Get scores from the internship object; default to 0 if missing.
    const relevanceScore = internship.relevanceScore || 0;
    const userInteractionScore = internship.userInteractionScore || 0;
    const popularityScore = internship.popularityScore || 0;
    
    // Compute recency score: newer internships score higher.
    // This simple approach decays the score by days since creation.
    const recencyScore = internship.createdAt
      ? 1 / (((now - new Date(internship.createdAt).getTime()) / (1000 * 3600 * 24)) + 1)
      : 0;

    // Random component for serendipity.
    const randomComponent = Math.random() * randomnessFactor;

    // Composite score calculation.
    const compositeScore =
      (weights.relevance * relevanceScore) +
      (weights.userInteraction * userInteractionScore) +
      (weights.popularity * popularityScore) +
      (weights.recency * recencyScore) +
      randomComponent;

    return { ...internship, compositeScore };
  });

  // Sort descending by composite score.
  return scoredInternships.sort((a, b) => b.compositeScore - a.compositeScore);
}
