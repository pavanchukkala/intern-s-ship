"use client";

const FILTERS = [
  "Paid", "Free", "Stipend-based", "Hourly Pay", "Project-based", "Short-term", "Long-term",
  "Remote", "On-site", "Hybrid", "Part-time", "Full-time", "Technical", "Non-Technical",
  "Internship Duration", "Company Size", "Industry Sector", "Experience Level", "Startup", "MNC"
];

export default function FilterPanel({ selectedFilters, setSelectedFilters, showFilters, setShowFilters }) {
  // Toggle a filter: add it if not present; remove it if already selected.
  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  // Clear all active filters.
  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div className="w-full">
      {/* Show/Hide Filters Button */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{ WebkitTapHighlightColor: "transparent" }}
          className="text-xs border border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 px-3 py-1 rounded focus:outline-none"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <>
          {/* Clear All Filters Button */}
          {selectedFilters.length > 0 && (
            <div className="mb-4 flex justify-end">
              <button
                onClick={(e) => {
                  clearAllFilters();
                  e.currentTarget.blur(); // Remove focus immediately
                }}
                style={{ WebkitTapHighlightColor: "transparent" }}
                className="text-xs border border-red-500 bg-red-500 text-white px-3 py-1 rounded transition-colors duration-300 hover:bg-red-600 focus:outline-none"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* List of Filter Buttons */}
          <div className="mb-4 flex flex-wrap gap-3">
            {FILTERS.map((filter) => {
              const isSelected = selectedFilters.includes(filter);
              return (
                <button
                  key={filter}
                  onClick={(e) => {
                    toggleFilter(filter);
                    e.currentTarget.blur(); // Force blur to remove persistent focus styling on mobile
                  }}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                  className={`px-3 py-2 transition-all duration-300 transform rounded-xl shadow-md text-xs focus:outline-none
                    ${
                      isSelected
                        ? "scale-110 bg-indigo-600 text-white shadow-lg border-2 border-indigo-700"
                        : "scale-100 bg-white dark:bg-gray-800 text-gray-800 border border-gray-300"
                    }
                    hover:scale-105 hover:bg-indigo-600 hover:text-white`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
