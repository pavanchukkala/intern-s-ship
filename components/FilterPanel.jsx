"use client";

// Define filters as objects. Filters with sub‑filters include a "subFilters" array.
const FILTERS = [
  { label: "Paid" },
  { label: "Free" },
  { 
    label: "Stipend-based", 
    subFilters: [
      { label: "$0 - $500", value: "0-500" },
      { label: "$500 - $1000", value: "500-1000" },
      { label: "$1000+", value: "1000+" }
    ]
  },
  { label: "Hourly Pay" },
  { label: "Project-based" },
  { label: "Short-term" },
  { label: "Long-term" },
  { label: "Remote" },
  { label: "On-site" },
  { label: "Hybrid" },
  { label: "Part-time" },
  { label: "Full-time" },
  { label: "Technical" },
  { label: "Non-Technical" },
  { 
    label: "Internship Duration", 
    subFilters: [
      { label: "Less than 3 months", value: "0-3" },
      { label: "3 to 6 months", value: "3-6" },
      { label: "6+ months", value: "6+" }
    ]
  },
  { label: "Company Size" },
  { label: "Industry Sector" },
  { label: "Experience Level" },
  { label: "Startup" },
  { label: "MNC" }
];

export default function FilterPanel({ selectedFilters, setSelectedFilters, showFilters, setShowFilters }) {
  /**
   * selectedFilters is an object where:
   * - For filters without sub‑filters: key = filter label, value = true.
   * - For filters with sub‑filters: key = filter label, value = array of selected sub‑filter values.
   */

  // Toggle a main filter.
  const toggleMainFilter = (filterLabel, hasSubFilters) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[filterLabel]) {
        // Unselect the main filter entirely.
        delete newFilters[filterLabel];
      } else {
        // If filter has sub‑filters, initialize as an empty array; otherwise mark as true.
        newFilters[filterLabel] = hasSubFilters ? [] : true;
      }
      return newFilters;
    });
  };

  // Toggle a sub‑filter for a filter that supports nested options.
  const toggleSubFilter = (mainFilterLabel, subFilterValue) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      // Ensure the main filter exists and is an array.
      if (!Array.isArray(newFilters[mainFilterLabel])) {
        newFilters[mainFilterLabel] = [];
      }
      if (newFilters[mainFilterLabel].includes(subFilterValue)) {
        // Remove the sub‑filter value.
        newFilters[mainFilterLabel] = newFilters[mainFilterLabel].filter((val) => val !== subFilterValue);
        // Optionally, if no sub‑filters remain, unselect the main filter entirely.
        if (newFilters[mainFilterLabel].length === 0) {
          delete newFilters[mainFilterLabel];
        }
      } else {
        // Add the sub‑filter value.
        newFilters[mainFilterLabel] = [...newFilters[mainFilterLabel], subFilterValue];
      }
      return newFilters;
    });
  };

  // Clear all filters.
  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  return (
    <div className="w-full">
      {/* Show/Hide Filters Button */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{ WebkitTapHighlightColor: "transparent" }}
          className={`text-xs transition-colors duration-300 px-3 py-1 rounded focus:outline-none border ${
            showFilters
              ? "bg-black text-white hover:bg-white hover:text-black border-black"
              : "bg-white text-black hover:bg-black hover:text-white border-black"
          }`}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <>
          {/* Clear All Filters Button */}
          {Object.keys(selectedFilters).length > 0 && (
            <div className="mb-4 flex justify-end">
              <button
                onClick={(e) => {
                  clearAllFilters();
                  e.currentTarget.blur();
                }}
                style={{ WebkitTapHighlightColor: "transparent" }}
                className="text-xs border border-red-500 bg-red-500 text-white px-3 py-1 rounded transition-colors duration-300 hover:bg-red-600 focus:outline-none"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Render Main Filter Buttons */}
          <div className="mb-4 flex flex-wrap gap-3">
            {FILTERS.map((filter) => {
              const isSelected = Object.prototype.hasOwnProperty.call(selectedFilters, filter.label);
              return (
                <div key={filter.label} className="flex flex-col">
                  <button
                    onClick={(e) => {
                      toggleMainFilter(filter.label, !!filter.subFilters);
                      e.currentTarget.blur();
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
                    {filter.label}
                  </button>
                  {/* Render sub‑filters if they exist and the main filter is selected */}
                  {filter.subFilters && isSelected && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {filter.subFilters.map((sub) => {
                        const isSubSelected =
                          Array.isArray(selectedFilters[filter.label]) &&
                          selectedFilters[filter.label].includes(sub.value);
                        return (
                          <button
                            key={sub.value}
                            onClick={(e) => {
                              toggleSubFilter(filter.label, sub.value);
                              e.currentTarget.blur();
                            }}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                            className={`px-2 py-1 transition-all duration-300 transform rounded-md shadow-sm text-xs focus:outline-none
                              ${
                                isSubSelected
                                  ? "bg-indigo-500 text-white border-2 border-indigo-700"
                                  : "bg-white dark:bg-gray-800 text-gray-800 border border-gray-300"
                              }
                              hover:bg-indigo-500 hover:text-white`}
                          >
                            {sub.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
