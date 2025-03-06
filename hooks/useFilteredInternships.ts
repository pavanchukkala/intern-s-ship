// hooks/useFilteredInternships.ts
import { useMemo } from "react";

interface Internship {
  company: string;
  role: string;
  skills: string;
  stipend?: string;
  duration?: string;
  // Add any additional fields as needed.
  [key: string]: any;
}

/**
 * selectedFilters is now an object.
 * - For filters without sub-filters, the key is the filter label and value is true.
 * - For filters with sub-filters, the value is an array of selected sub-filter values.
 */
export default function useFilteredInternships(
  internships: Internship[],
  searchQuery: string,
  selectedFilters: Record<string, any>
) {
  return useMemo(() => {
    return internships.filter((internship) => {
      // Check if the internship matches the search query.
      const searchMatch =
        internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.skills.toLowerCase().includes(searchQuery.toLowerCase());

      // If no filters are applied, return the search result.
      if (Object.keys(selectedFilters).length === 0) return searchMatch;

      // For each selected filter, check if the internship meets the criteria.
      const filtersMatch = Object.entries(selectedFilters).every(([filterKey, filterValue]) => {
        switch (filterKey) {
          case "Paid":
            return internship.stipend && internship.stipend.toLowerCase().includes("paid");
          case "Free":
            return internship.stipend && internship.stipend.toLowerCase().includes("free");
          case "Stipend-based":
            if (Array.isArray(filterValue) && filterValue.length > 0) {
              // Example: Check if any stipend range matches (adjust according to your data)
              return filterValue.some((range: string) =>
                internship.stipend && internship.stipend.toLowerCase().includes(range)
              );
            }
            return internship.stipend && internship.stipend.toLowerCase().includes("stipend");
          case "Hourly Pay":
            return internship.hourly && internship.hourly.toLowerCase().includes("hourly");
          case "Project-based":
            return internship.type && internship.type.toLowerCase().includes("project");
          case "Short-term":
            return internship.duration && internship.duration.toLowerCase().includes("short");
          case "Long-term":
            return internship.duration && internship.duration.toLowerCase().includes("long");
          case "Remote":
            return internship.location && internship.location.toLowerCase().includes("remote");
          case "On-site":
            return internship.location && internship.location.toLowerCase().includes("on-site");
          case "Hybrid":
            return internship.location && internship.location.toLowerCase().includes("hybrid");
          case "Part-time":
            return internship.type && internship.type.toLowerCase().includes("part-time");
          case "Full-time":
            return internship.type && internship.type.toLowerCase().includes("full-time");
          case "Technical":
            return internship.skills && internship.skills.toLowerCase().includes("technical");
          case "Non-Technical":
            return internship.skills && internship.skills.toLowerCase().includes("non-technical");
          case "Internship Duration":
            if (Array.isArray(filterValue) && filterValue.length > 0) {
              return filterValue.some((duration: string) =>
                internship.duration && internship.duration.toLowerCase().includes(duration)
              );
            }
            return !!internship.duration;
          case "Company Size":
            return internship.companySize && internship.companySize.toLowerCase().includes("company");
          case "Industry Sector":
            return internship.industry && internship.industry.toLowerCase().includes("industry");
          case "Experience Level":
            return internship.experienceLevel && internship.experienceLevel.toLowerCase().includes("experience");
          case "Startup":
            return internship.companyType && internship.companyType.toLowerCase().includes("startup");
          case "MNC":
            return internship.companyType && internship.companyType.toLowerCase().includes("mnc");
          default:
            // For any filter not explicitly handled, you can decide to return true or implement additional matching.
            return true;
        }
      });

      return searchMatch && filtersMatch;
    });
  }, [internships, searchQuery, selectedFilters]);
}
