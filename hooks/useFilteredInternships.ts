// hooks/useFilteredInternships.ts
import { useMemo } from "react";

interface Internship {
  company: string;
  role: string;
  skills: string;
  stipend?: string;
  duration?: string;
  // add other fields if needed
  [key: string]: any;
}

export default function useFilteredInternships(
  internships: Internship[],
  searchQuery: string,
  selectedFilters: string[]
) {
  return useMemo(() => {
    return internships.filter((internship) => {
      const searchMatch =
        internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.skills.toLowerCase().includes(searchQuery.toLowerCase());

      if (selectedFilters.length === 0) return searchMatch;

      const matchesFilters = selectedFilters.every((filter) => {
        return (
          (internship.stipend && internship.stipend.toLowerCase().includes(filter.toLowerCase())) ||
          (internship.duration && internship.duration.toLowerCase().includes(filter.toLowerCase())) ||
          (internship.skills && internship.skills.toLowerCase().includes(filter.toLowerCase()))
        );
      });

      return searchMatch && matchesFilters;
    });
  }, [internships, searchQuery, selectedFilters]);
}
