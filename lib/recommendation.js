// lib/recommendation.js

export function recommendInternships(internships) {
  if (!Array.isArray(internships)) {
    console.error("recommendInternships expects an array, but received:", internships);
    return []; // Return an empty array if the input is not an array
  }

  if (typeof window !== "undefined") {
    const cached = sessionStorage.getItem("recommendedInternships");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Return cached order if it matches the current internships length
        if (Array.isArray(parsed) && parsed.length === internships.length) {
          // Extra check to ensure all elements are objects
          if (parsed.every(item => typeof item === 'object' && item !== null)) {
            return parsed;
          }
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
    try {
        sessionStorage.setItem("recommendedInternships", JSON.stringify(array));
    } catch (error) {
        console.error("Error setting cached internships:", error);
    }
  }

  return array;
}
