// components/FilterPanel.jsx
"use client";

const FILTERS = [
  // Payment & Stipend Filters
  { label: "Paid" },
  { label: "Free" },
  {
    label: "Stipend-based",
    subFilters: [
      { label: "$0 - $500", value: "$0 - $500" },
      { label: "$500 - $1000", value: "$500 - $1000" },
      { label: "$1000+", value: "$1000+" },
    ],
  },
  { label: "Hourly Pay" },
  { label: "Project-based" },

  // Duration Filters
  {
    label: "Internship Duration",
    subFilters: [
      { label: "Less than 3 months", value: "less than 3 months" },
      { label: "3 to 6 months", value: "3 to 6 months" },
      { label: "6+ months", value: "6+ months" },
    ],
  },
  { label: "Short-term" },
  { label: "Long-term" },

  // Location & Work Type Filters
  { label: "Remote" },
  { label: "On-site" },
  { label: "Hybrid" },

  // Job Type Filters
  { label: "Part-time" },
  { label: "Full-time" },

  // Technical Filters
  { label: "Technical" },
  { label: "Non-Technical" },

  // Company Type Filters
  {
    label: "Company Type",
    subFilters: [
      { label: "Startup", value: "company type: startup" },
      { label: "MNC", value: "company type: mnc" },
    ],
  },

  // Company Size Filters
  {
    label: "Company Size",
    subFilters: [
      { label: "Small", value: "company size: small" },
      { label: "Medium", value: "company size: medium" },
      { label: "Large", value: "company size: large" },
    ],
  },

  // Industry Sector Filters
  {
    label: "Industry Sector",
    subFilters: [
      { label: "Software", value: "industry sector: software" },
      { label: "Finance", value: "industry sector: finance" },
      { label: "Healthcare", value: "industry sector: healthcare" },
      { label: "Education", value: "industry sector: education" },
    ],
  },

  // Experience Level Filters
  {
    label: "Experience Level",
    subFilters: [
      { label: "Entry", value: "experience level: entry" },
      { label: "Mid", value: "experience level: mid" },
      { label: "Senior", value: "experience level: senior" },
    ],
  },
];

export default function FilterPanel({ selectedFilters, setSelectedFilters, showFilters, setShowFilters }) {
  const toggleMainFilter = (filterLabel, hasSubFilters) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[filterLabel]) {
        delete newFilters[filterLabel];
      } else {
        newFilters[filterLabel] = hasSubFilters ? [] : true;
      }
      return newFilters;
    });
  };

  const toggleSubFilter = (mainFilterLabel, subFilterValue) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (!Array.isArray(newFilters[mainFilterLabel])) {
        newFilters[mainFilterLabel] = [];
      }
      if (newFilters[mainFilterLabel].includes(subFilterValue)) {
        newFilters[mainFilterLabel] = newFilters[mainFilterLabel].filter((val) => val !== subFilterValue);
        if (newFilters[mainFilterLabel].length === 0) {
          delete newFilters[mainFilterLabel];
        }
      } else {
        newFilters[mainFilterLabel] = [...newFilters[mainFilterLabel], subFilterValue];
      }
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  return (
    <div className="w-full">
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
                    className={`px-3 py-2 transition-all duration-300 transform rounded-xl shadow-md text-xs focus:outline-none ${
                      isSelected
                        ? "scale-110 bg-indigo-600 text-white shadow-lg border-2 border-indigo-700"
                        : "scale-100 bg-white dark:bg-gray-800 text-gray-800 border border-gray-300"
                    } hover:scale-105 hover:bg-indigo-600 hover:text-white`}
                  >
                    {filter.label}
                  </button>
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
                            className={`px-2 py-1 transition-all duration-300 transform rounded-md shadow-sm text-xs focus:outline-none ${
                              isSubSelected
                                ? "bg-indigo-500 text-white border-2 border-indigo-700"
                                : "bg-white dark:bg-gray-800 text-gray-800 border border-gray-300"
                            } hover:bg-indigo-500 hover:text-white`}
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
