// lib/recommendation.js
let cachedInternships = null;

export function recommendInternships(internships) {
  // If we've already shuffled once and the lengths match, return the cached order
  if (cachedInternships && cachedInternships.length === internships.length) {
    return cachedInternships;
  }
  
  const array = [...internships];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  
  cachedInternships = array;
  return array;
}
