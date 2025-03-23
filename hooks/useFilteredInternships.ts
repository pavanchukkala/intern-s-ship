import { useMemo } from "react";

// Levenshtein Distance for minimal fuzzy matching
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
  if (lowerText.includes(lowerSearch)) return true;
  const words = lowerText.split(/\W+/);
  for (let word of words) {
    if (!word) continue;
    const distance = levenshtein(lowerSearch, word);
    const threshold = Math.floor(lowerSearch.length * 0.3);
    if (distance <= threshold) return true;
  }
  return false;
}

// Types
export interface Internship {
  company?: string;
  role?: string;
  location?: string;
  skills?: string | string[];
  domain?: string;
  description?: string;
  durationText?: string; // e.g., "45 Days"
  durationDays?: number; // e.g., 45 (Assuming this represents months if using "internship duration" slider)
  stipend?: number;
  paymentType?: string;
  jobType?: string;
  meta?: {
    paid?: boolean;
    fee?: number | string;
    companyType?: string;       // e.g. "startup", "Medium", etc.
    companySize?: number;       // numeric size if available
    technical?: boolean;
    industrySector?: string;    // e.g. "software", "finance", etc.
    experienceLevel?: string;   // e.g. "entry", "mid", "senior"
    visaSponsored?: boolean;
    accommodationProvided?: boolean;
    flexibleHours?: boolean;
    universityProgram?: boolean;
    international?: boolean;
    highGrowth?: boolean;
    [key: string]: any;
  };
  [key: string]: any;
}

type Filters = {
  [key: string]: boolean | string[] | number[];
};

// Updated filter mapping with adjustments for internship duration and company type/size.
// For fuzzy matching typos, we use fuzzyMatch when comparing strings.
const filterMapping: Record<string, (i: Internship, filterValue?: any) => boolean> = {
  "paid": (i, filterValue) => {
    const fee = typeof i.meta?.fee === "string" ? parseFloat(i.meta.fee) : i.meta?.fee;
    if (Array.isArray(filterValue)) {
      return i.meta?.paid === true && typeof fee === "number" && fee >= filterValue[0] && fee <= filterValue[1];
    }
    return i.meta?.paid === true;
  },
  "free": (i, _) => i.meta?.paid === false,
  "stipend-based": (i, filterValue) => {
    const fee = typeof i.meta?.fee === "string" ? parseFloat(i.meta.fee) : i.meta?.fee;
    if (Array.isArray(filterValue)) {
      return typeof fee === "number" && fee >= filterValue[0] && fee <= filterValue[1];
    }
    return typeof fee === "number";
  },
  "$0 - $500": (i, _) => {
    const fee = typeof i.meta?.fee === "string" ? parseFloat(i.meta.fee) : i.meta?.fee;
    return typeof fee === "number" && fee >= 0 && fee <= 500;
  },
  "$500 - $1000": (i, _) => {
    const fee = typeof i.meta?.fee === "string" ? parseFloat(i.meta.fee) : i.meta?.fee;
    return typeof fee === "number" && fee > 500 && fee <= 1000;
  },
  "$1000+": (i, _) => {
    const fee = typeof i.meta?.fee === "string" ? parseFloat(i.meta.fee) : i.meta?.fee;
    return typeof fee === "number" && fee > 1000;
  },
  // For internship duration, we now compare the numbers directly (assuming they're in months)
  "internship duration": (i, filterValue) => {
    if (Array.isArray(filterValue)) {
      return typeof i.durationDays === "number" && i.durationDays >= filterValue[0] && i.durationDays <= filterValue[1];
    }
    return typeof i.durationDays === "number";
  },
  "short-term": (i, _) => typeof i.durationDays === "number" && i.durationDays < 3,
  "long-term": (i, _) => typeof i.durationDays === "number" && i.durationDays >= 3,
  "remote": (i, _) => i.location?.toLowerCase().includes("remote"),
  "on-site": (i, _) =>
    i.location &&
    !i.location.toLowerCase().includes("remote") &&
    !i.location.toLowerCase().includes("hybrid"),
  "hybrid": (i, _) => i.location?.toLowerCase().includes("hybrid"),
  "part-time": (i, _) => i.jobType?.toLowerCase() === "part-time",
  "full-time": (i, _) => i.jobType?.toLowerCase() === "full-time",
  "technical": (i, _) => i.meta?.technical === true,
  "non-technical": (i, _) => i.meta?.technical === false,
  // For company type filters, we first try companyType then fall back to fuzzy matching.
  "company type: startup": (i, _) => {
    if (typeof i.meta?.companyType === "string") {
      return fuzzyMatch("startup", i.meta.companyType);
    }
    return false;
  },
  "company type: mnc": (i, _) => {
    if (typeof i.meta?.companyType === "string") {
      return fuzzyMatch("mnc", i.meta.companyType);
    }
    return false;
  },
  // For company size, if numeric is available use it; otherwise, use companyType string.
  "company size: small": (i, _) => {
    if (typeof i.meta?.companySize === "number") {
      return i.meta.companySize < 50;
    }
    if (typeof i.meta?.companyType === "string") {
      return fuzzyMatch("small", i.meta.companyType);
    }
    return false;
  },
  "company size: medium": (i, _) => {
    if (typeof i.meta?.companySize === "number") {
      return i.meta.companySize >= 50 && i.meta.companySize < 200;
    }
    if (typeof i.meta?.companyType === "string") {
      return fuzzyMatch("medium", i.meta.companyType);
    }
    return false;
  },
  "company size: large": (i, _) => {
    if (typeof i.meta?.companySize === "number") {
      return i.meta.companySize >= 200;
    }
    if (typeof i.meta?.companyType === "string") {
      return fuzzyMatch("large", i.meta.companyType);
    }
    return false;
  },
  "industry sector: software": (i, _) =>
    fuzzyMatch("software", i.meta?.industrySector || ""),
  "industry sector: finance": (i, _) =>
    fuzzyMatch("finance", i.meta?.industrySector || ""),
  "industry sector: healthcare": (i, _) =>
    fuzzyMatch("healthcare", i.meta?.industrySector || ""),
  "industry sector: education": (i, _) =>
    fuzzyMatch("education", i.meta?.industrySector || ""),
  "experience level: entry": (i, _) =>
    fuzzyMatch("entry", i.meta?.experienceLevel || ""),
  "experience level: mid": (i, _) =>
    fuzzyMatch("mid", i.meta?.experienceLevel || ""),
  "experience level: senior": (i, _) =>
    fuzzyMatch("senior", i.meta?.experienceLevel || ""),
  "visa sponsored": (i, _) => i.meta?.visaSponsored === true,
  "accommodation provided": (i, _) => i.meta?.accommodationProvided === true,
  "flexible hours": (i, _) => i.meta?.flexibleHours === true,
  "university program": (i, _) => i.meta?.universityProgram === true,
  "international": (i, _) => i.meta?.international === true,
  "high growth": (i, _) => i.meta?.highGrowth === true,
};

export default function useFilteredInternships(
  internships: Internship[],
  searchQuery: string,
  selectedFilters: Filters
): Internship[] {
  const lowerCaseSearchQuery = searchQuery.trim().toLowerCase();
  const queryWords = lowerCaseSearchQuery.split(/\s+/).filter(Boolean);

  return useMemo(() => {
    return internships.filter((internship) => {
      // Build a searchable text string from various fields.
      const searchableText = `
        ${internship.company || ""}
        ${internship.role || ""}
        ${internship.location || ""}
        ${typeof internship.skills === "string"
          ? internship.skills
          : Array.isArray(internship.skills)
          ? internship.skills.join(" ")
          : ""}
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
          if (!predicate(internship, filterValue)) {
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
