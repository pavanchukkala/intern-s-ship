// components/FilterPanel.jsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  // Additional Platform Filters
  {
    label: "Additional Filters",
    subFilters: [
      { label: "Visa Sponsored", value: "visa sponsored" },
      { label: "Accommodation Provided", value: "accommodation provided" },
      { label: "Flexible Hours", value: "flexible hours" },
      { label: "University Program", value: "university program" },
      { label: "International", value: "international" },
      { label: "High Growth", value: "high growth" },
    ],
  },
];

export default function FilterPanel({
  selectedFilters,
  setSelectedFilters,
  showFilters,
  setShowFilters,
}) {
  // Toggle main filter selection. For filters with sub‑filters, an empty array is initialized.
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

  // Toggle a sub‑filter value within a main filter.
  const toggleSubFilter = (mainFilterLabel, subFilterValue) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (!Array.isArray(newFilters[mainFilterLabel])) {
        newFilters[mainFilterLabel] = [];
      }
      if (newFilters[mainFilterLabel].includes(subFilterValue)) {
        newFilters[mainFilterLabel] = newFilters[mainFilterLabel].filter(
          (val) => val !== subFilterValue
        );
        if (newFilters[mainFilterLabel].length === 0) {
          delete newFilters[mainFilterLabel];
        }
      } else {
        newFilters[mainFilterLabel] = [
          ...newFilters[mainFilterLabel],
          subFilterValue,
        ];
      }
      return newFilters;
    });
  };

  // Clear all filters.
  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  return (
    <div className="w-full p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800">
      {/* Header with controls */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Filters
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-sm px-3 py-1 border rounded focus:outline-none transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          {Object.keys(selectedFilters).length > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm px-3 py-1 bg-red-500 text-white rounded transition-colors duration-200 hover:bg-red-600 focus:outline-none"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Filters UI */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FILTERS.map((filter) => {
            const isSelected = Object.prototype.hasOwnProperty.call(
              selectedFilters,
              filter.label
            );
            return (
              <div key={filter.label} className="flex flex-col">
                {/* Main filter button */}
                <button
                  onClick={(e) => {
                    toggleMainFilter(filter.label, !!filter.subFilters);
                    e.currentTarget.blur();
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors duration-200 ${
                    isSelected
                      ? "bg-indigo-600 text-white border border-indigo-700"
                      : "bg-white dark:bg-gray-800 text-gray-800 border border-gray-300 hover:bg-indigo-600 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
                {/* Sub-filters, with a subtle fade/slide transition */}
                {filter.subFilters && isSelected && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 flex flex-wrap gap-2 overflow-hidden"
                    >
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
                            className={`px-3 py-1 rounded-md text-xs transition-colors duration-200 ${
                              isSubSelected
                                ? "bg-indigo-500 text-white border border-indigo-700"
                                : "bg-white dark:bg-gray-800 text-gray-800 border border-gray-300 hover:bg-indigo-500 hover:text-white"
                            }`}
                          >
                            {sub.label}
                          </button>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
