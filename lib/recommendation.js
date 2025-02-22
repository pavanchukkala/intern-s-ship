// /lib/recommendation.js
export function recommendInternships(internships) {
  // Currently a random shuffle algorithm.
  return [...internships].sort(() => Math.random() - 0.5);
}
