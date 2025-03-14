// hooks/useFilteredInternships.ts
import { useMemo } from "react";

// --- Levenshtein Distance (for simple fuzzy matching) ---
function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1).toLowerCase() === a.charAt(j - 1).toLowerCase()) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,    // deletion
          matrix[i][j - 1] + 1,    // insertion
          matrix[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function fuzzyMatch(searchWord: string, targetText: string): boolean {
  const lowerSearch = searchWord.toLowerCase();
  const lowerText = targetText.toLowerCase();

  // First, check a direct substring match.
  if (lowerText.includes(lowerSearch)) return true;

  // Otherwise, compare each word in targetText.
  const words = lowerText.split(/\W+/);
  for (let word of words) {
    if (!word) continue;
    const distance = levenshtein(lowerSearch, word);
    // Allow a threshold of roughly 30% of the search word's length.
    const threshold = Math.floor(lowerSearch.length * 0.3);
    if (distance <= threshold) return true;
  }
  return false;
}

// --- Types ---
export interface Internship {
  company?: string;
  role?: string;
  location?: string;
  skills?: string | string[];
  domain?: string;
  description?: string;
  durationText?: string;  // e.g., "45 Days"
  durationDays?: number;  // e.g., 45
  stipend?: number;
  paymentType?: string;   // e.g., "hourly", "project"
  jobType?: string;       // e.g., "full-time", "part-time"
  meta?: {
    paid?: boolean;
    fee?: number;
    companyType?: string;
    companySize?: number;
    technical?: boolean;
    industrySector?: string;
    // Add additional metadata as needed.
    [key: string]: any;
  };
  [key: string]: any;
}

type Filters = {
  [key: string]: boolean | string[];
};

// --- The Filtering Hook ---
export default function useFilteredInternships(
  internships: Internship[],
  searchQuery: string,
  selectedFilters: Filters
): Internship[] {
  // Prepare the search query words (in lower case).
  const lowerCaseSearchQuery = searchQuery.trim().toLowerCase();
  const queryWords = lowerCaseSearchQuery.split(/\s+/).filter(Boolean);

  // Mapping of lower-cased filter labels to predicate functions.
  const filterMapping: Record<string, (i: Internship) => boolean> = {
    "paid": (i) => i.meta?.paid === true,
    "free": (i) => i.meta?.paid === false,
    "stipend-based": (i) => typeof i.meta?.fee === "number",
    "$0 - $500": (i) =>
      typeof i.meta?.fee === "number" && i.meta.fee >= 0 && i.meta.fee <= 500,
    "$500 - $1000": (i) =>
      typeof i.meta?.fee === "number" && i.meta.fee > 500 && i.meta.fee <= 1000,
    "$1000+": (i) =>
      typeof i.meta?.fee === "number" && i.meta.fee > 1000,
    "hourly pay": (i) => i.paymentType?.toLowerCase() === "hourly",
    "project-based": (i) => i.paymentType?.toLowerCase() === "project",
    "short-term": (i) => typeof i.durationDays === "number" && i.durationDays < 90,
    "long-term": (i) => typeof i.durationDays === "number" && i.durationDays >= 90,
    "remote": (i) => i.location?.toLowerCase().includes("remote"),
    "on-site": (i) => i.location && !i.location.toLowerCase().includes("remote"),
    "hybrid": (i) => i.location?.toLowerCase().includes("hybrid"),
    "part-time": (i) => i.jobType?.toLowerCase() === "part-time",
    "full-time": (i) => i.jobType?.toLowerCase() === "full-time",
    "technical": (i) => i.meta?.technical === true,
    "non-technical": (i) => i.meta?.technical === false,
    "company type: mnc": (i) =>
      i.meta?.companyType?.toLowerCase() === "mnc",
    "industry sector: software": (i) =>
      i.meta?.industrySector?.toLowerCase() === "software",
    // Extend with additional filters as needed.
  };

  return useMemo(() => {
    return internships.filter((internship) => {
      // Combine key fields into one searchable text string.
      const searchableText = `
        ${internship.company || ""}
        ${internship.role || ""}
        ${internship.location || ""}
        ${typeof internship.skills === "string" ? internship.skills : (Array.isArray(internship.skills) ? internship.skills.join(" ") : "")}
        ${internship.domain || ""}
        ${internship.description || ""}
        ${internship.meta?.industrySector || ""}
        ${internship.meta?.companyType || ""}
      `;

      // Check each search query word with our fuzzy matcher.
      for (const word of queryWords) {
        if (!fuzzyMatch(word, searchableText)) {
          return false;
        }
      }

      // Apply the selected filters.
      for (const filterLabel in selectedFilters) {
        const filterValue = selectedFilters[filterLabel];
        const lowerLabel = filterLabel.toLowerCase();
        const predicate = filterMapping[lowerLabel];
        if (predicate) {
          if (!predicate(internship)) {
            return false;
          }
        } else if (Array.isArray(filterValue)) {
          // For nested filters, require at least one sub-filter to match.
          const subFilterPassed = filterValue.some((subFilter) => {
            const lowerSub = subFilter.toLowerCase();
            const subPredicate = filterMapping[lowerSub];
            return subPredicate ? subPredicate(internship) : false;
          });
          if (!subFilterPassed) return false;
        }
      }
      return true;
    });
  }, [internships, queryWords, selectedFilters]);
}
