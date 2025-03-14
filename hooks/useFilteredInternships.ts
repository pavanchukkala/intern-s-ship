// hooks/useFilteredInternships.ts
import { useMemo } from "react";

// --- Levenshtein Distance for minimal fuzzy matching ---
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
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function fuzzyMatch(searchWord: string, targetText: string): boolean {
  const lowerSearch = searchWord.toLowerCase();
  const lowerText = targetText.toLowerCase();

  // Direct substring check
  if (lowerText.includes(lowerSearch)) return true;

  // Check against each word in targetText
  const words = lowerText.split(/\W+/);
  for (let word of words) {
    if (!word) continue;
    const distance = levenshtein(lowerSearch, word);
    // Allow a threshold of roughly 30% of the search word's length
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
  paymentType?: string;   // "hourly", "project", etc.
  jobType?: string;       // "full-time", "part-time", etc.
  meta?: {
    paid?: boolean;
    fee?: number;
    companyType?: string;       // e.g. "startup", "mnc"
    companySize?: number;       // numeric size (e.g., 56)
    technical?: boolean;
    industrySector?: string;    // e.g. "software", "finance", etc.
    experienceLevel?: string;   // e.g. "entry", "mid", "senior"
    // Add additional metadata fields as needed.
    [key: string]: any;
  };
  [key: string]: any;
}

type Filters = {
  [key: string]: boolean | string[];
};

// --- Comprehensive Filter Mapping ---
// All keys are lower-cased to ensure case-insensitive matching.
const filterMapping: Record<string, (i: Internship) => boolean> = {
  // Payment & Fee Filters
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

  // Duration Filters (assuming durationDays is in days)
  "less than 3 months": (i) =>
    typeof i.durationDays === "number" && i.durationDays < 90,
  "3 to 6 months": (i) =>
    typeof i.durationDays === "number" &&
    i.durationDays >= 90 &&
    i.durationDays <= 180,
  "6+ months": (i) =>
    typeof i.durationDays === "number" && i.durationDays > 180,
  "short-term": (i) =>
    typeof i.durationDays === "number" && i.durationDays < 90,
  "long-term": (i) =>
    typeof i.durationDays === "number" && i.durationDays >= 90,

  // Location & Work Type Filters
  "remote": (i) => i.location?.toLowerCase().includes("remote"),
  "on-site": (i) =>
    i.location &&
    !i.location.toLowerCase().includes("remote") &&
    !i.location.toLowerCase().includes("hybrid"),
  "hybrid": (i) => i.location?.toLowerCase().includes("hybrid"),

  // Job Type Filters
  "part-time": (i) => i.jobType?.toLowerCase() === "part-time",
  "full-time": (i) => i.jobType?.toLowerCase() === "full-time",

  // Technical Filters
  "technical": (i) => i.meta?.technical === true,
  "non-technical": (i) => i.meta?.technical === false,

  // Company Type Filters
  "company type: startup": (i) =>
    i.meta?.companyType?.toLowerCase() === "startup",
  "company type: mnc": (i) =>
    i.meta?.companyType?.toLowerCase() === "mnc",

  // Company Size Filters (adjust thresholds as needed)
  "company size: small": (i) =>
    typeof i.meta?.companySize === "number" && i.meta.companySize < 50,
  "company size: medium": (i) =>
    typeof i.meta?.companySize === "number" &&
    i.meta.companySize >= 50 &&
    i.meta.companySize < 200,
  "company size: large": (i) =>
    typeof i.meta?.companySize === "number" && i.meta.companySize >= 200,

  // Industry Sector Filters
  "industry sector: software": (i) =>
    i.meta?.industrySector?.toLowerCase() === "software",
  "industry sector: finance": (i) =>
    i.meta?.industrySector?.toLowerCase() === "finance",
  "industry sector: healthcare": (i) =>
    i.meta?.industrySector?.toLowerCase() === "healthcare",
  "industry sector: education": (i) =>
    i.meta?.industrySector?.toLowerCase() === "education",

  // Experience Level Filters
  "experience level: entry": (i) =>
    i.meta?.experienceLevel?.toLowerCase() === "entry",
  "experience level: mid": (i) =>
    i.meta?.experienceLevel?.toLowerCase() === "mid",
  "experience level: senior": (i) =>
    i.meta?.experienceLevel?.toLowerCase() === "senior",
};

export default function useFilteredInternships(
  internships: Internship[],
  searchQuery: string,
  selectedFilters: Filters
): Internship[] {
  // Prepare search query words.
  const lowerCaseSearchQuery = searchQuery.trim().toLowerCase();
  const queryWords = lowerCaseSearchQuery.split(/\s+/).filter(Boolean);

  return useMemo(() => {
    return internships.filter((internship) => {
      // Build a searchable text string from various fields.
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

      // Apply fuzzy text search for each word.
      for (const word of queryWords) {
        if (!fuzzyMatch(word, searchableText)) {
          return false;
        }
      }

      // Apply each selected filter.
      for (const filterLabel in selectedFilters) {
        const filterValue = selectedFilters[filterLabel];
        const lowerLabel = filterLabel.toLowerCase();
        const predicate = filterMapping[lowerLabel];
        if (predicate) {
          if (!predicate(internship)) {
            return false;
          }
        } else if (Array.isArray(filterValue)) {
          // For sub‑filters, require at least one to match.
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
