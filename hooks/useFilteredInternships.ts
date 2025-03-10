import { useMemo } from "react";

interface Internship {
  company?: string;
  role?: string;
  location?: string;
  skills?: string;
  domain?: string;
  description?: string;
  [key: string]: any;
}

export default function useFilteredInternships(
  internships: Internship[],
  searchQuery: string,
  selectedFilters: string[]
): Internship[] {
  // Convert the search query to lowercase and split into individual words
  const lowerCaseSearchQuery = searchQuery.toLowerCase().trim();
  const queryWords = lowerCaseSearchQuery.split(/\s+/).filter(Boolean);

  const filteredInternships = useMemo(() => {
    return internships.filter((internship) => {
      // Combine various fields into one searchable string
      const searchable = `
        ${internship.company || ""}
        ${internship.role || ""}
        ${internship.location || ""}
        ${internship.skills || ""}
        ${internship.domain || ""}
        ${internship.description || ""}
      `.toLowerCase();

      // Check that every word in the query exists somewhere in the searchable text
      const matchesSearch = queryWords.every((word) =>
        searchable.includes(word)
      );

      // For selected filters, ensure each filter term is present as well
      let matchesFilters = true;
      if (selectedFilters && selectedFilters.length > 0) {
        matchesFilters = selectedFilters.every((filter) =>
          searchable.includes(filter.toLowerCase())
        );
      }

      return matchesSearch && matchesFilters;
    });
  }, [internships, queryWords, selectedFilters]);

  return filteredInternships;
}
