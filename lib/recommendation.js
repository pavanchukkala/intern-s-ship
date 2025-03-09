// lib/recommendation.js

export function recommendInternships(internships) {
  if (typeof window !== "undefined") {
    const cached = sessionStorage.getItem("recommendedInternships");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Return cached order if it matches the current internships length
        if (Array.isArray(parsed) && parsed.length === internships.length) {
          return parsed;
        }
      } catch (error) {
        console.error("Error parsing cached internships:", error);
      }
    }
  }

  // Shuffle the array using Fisher-Yates algorithm
  const array = [...internships];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  if (typeof window !== "undefined") {
    sessionStorage.setItem("recommendedInternships", JSON.stringify(array));
  }

  return array;
}
