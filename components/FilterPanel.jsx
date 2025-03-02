"use client";
import { Button } from "@/components/ui/button";

const FILTERS = [
  "Paid", "Free", "Stipend-based", "Hourly Pay", "Project-based", "Short-term", "Long-term",
  "Remote", "On-site", "Hybrid", "Part-time", "Full-time", "Technical", "Non-Technical",
  "Internship Duration", "Company Size", "Industry Sector", "Experience Level", "Startup", "MNC"
];

export default function FilterPanel({ selectedFilters, toggleFilter, showFilters, setShowFilters }) {
  return (
    <>
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="text-xs"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      {showFilters && (
        <div className="mb-4 flex flex-wrap gap-3">
          {FILTERS.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilters.includes(filter) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter(filter)}
              className="px-3 py-2 transition-all transform hover:scale-105 hover:bg-indigo-600 hover:text-white rounded-xl shadow-md text-xs"
            >
              {filter}
            </Button>
          ))}
        </div>
      )}
    </>
  );
}
