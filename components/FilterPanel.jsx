// components/ResponsiveFilterSidebar.jsx
"use client";
import React, { useState } from "react";

// Define categories with some filters having nested subFilters.
const FILTER_CATEGORIES = [
  {
    title: "Payment & Stipend",
    filters: [
      { label: "Paid", value: "paid" },
      { label: "Free", value: "free" },
      { 
        label: "Stipend-based", 
        value: "stipend-based",
        subFilters: [
          { label: "$0 - $500", value: "$0 - $500" },
          { label: "$500 - $1000", value: "$500 - $1000" },
          { label: "$1000+", value: "$1000+" },
        ],
      },
      { label: "Hourly Pay", value: "hourly pay" },
      { label: "Project-based", value: "project-based" },
    ],
  },
  {
    title: "Duration",
    filters: [
      { 
        label: "Internship Duration", 
        value: "internship duration",
        subFilters: [
          { label: "Less than 3 months", value: "less than 3 months" },
          { label: "3 to 6 months", value: "3 to 6 months" },
          { label: "6+ months", value: "6+ months" },
        ],
      },
      { label: "Short-term", value: "short-term" },
      { label: "Long-term", value: "long-term" },
    ],
  },
  {
    title: "Location",
    filters: [
      { label: "Remote", value: "remote" },
      { label: "On-site", value: "on-site" },
      { label: "Hybrid", value: "hybrid" },
    ],
  },
  {
    title: "Job Type",
    filters: [
      { label: "Part-time", value: "part-time" },
      { label: "Full-time", value: "full-time" },
    ],
  },
  {
    title: "Technical",
    filters: [
      { label: "Technical", value: "technical" },
      { label: "Non-Technical", value: "non-technical" },
    ],
  },
  {
    title: "Company",
    filters: [
      { label: "Startup", value: "company type: startup" },
      { label: "MNC", value: "company type: mnc" },
      { label: "Small", value: "company size: small" },
      { label: "Medium", value: "company size: medium" },
      { label: "Large", value: "company size: large" },
    ],
  },
  {
    title: "Industry Sector",
    filters: [
      { label: "Software", value: "industry sector: software" },
      { label: "Finance", value: "industry sector: finance" },
      { label: "Healthcare", value: "industry sector: healthcare" },
      { label: "Education", value: "industry sector: education" },
    ],
  },
  {
    title: "Experience Level",
    filters: [
      { label: "Entry", value: "experience level: entry" },
      { label: "Mid", value: "experience level: mid" },
      { label: "Senior", value: "experience level: senior" },
    ],
  },
  {
    title: "Additional",
    filters: [
      { label: "Visa Sponsored", value: "visa sponsored" },
      { label: "Accommodation Provided", value: "accommodation provided" },
      { label: "Flexible Hours", value: "flexible hours" },
      { label: "University Program", value: "university program" },
      { label: "International", value: "international" },
      { label: "High Growth", value: "high growth" },
    ],
  },
];

//
// Desktop Sidebar Component (sticky sidebar for laptop/desktop)
//
function DesktopFilterSidebar({ selectedFilters, setSelectedFilters }) {
  // Track category expansion (default: all expanded)
  const [expandedCategories, setExpandedCategories] = useState(() => {
    const init = {};
    FILTER_CATEGORIES.forEach((cat) => (init[cat.title] = true));
    return init;
  });
  // Track which filters with subFilters are expanded (key: categoryTitle-filterValue)
  const [expandedFilters, setExpandedFilters] = useState({});

  const toggleCategory = (title) => {
    setExpandedCategories((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  // Toggle a main filter's selection.
  // For filters with subFilters, store selection as an array; for others, store as boolean.
  const toggleFilter = (categoryTitle, filterItem) => {
    setSelectedFilters((prev) => {
      const cat = prev[categoryTitle] ? { ...prev[categoryTitle] } : {};
      if (filterItem.subFilters) {
        // Toggle nested filter – if already selected, remove; else, initialize as empty array.
        if (cat[filterItem.value] !== undefined) {
          delete cat[filterItem.value];
        } else {
          cat[filterItem.value] = [];
        }
      } else {
        if (cat[filterItem.value]) {
          delete cat[filterItem.value];
        } else {
          cat[filterItem.value] = true;
        }
      }
      return { ...prev, [categoryTitle]: cat };
    });
    // For filters with subFilters, toggle expansion of nested options.
    if (filterItem.subFilters) {
      const key = categoryTitle + "-" + filterItem.value;
      setExpandedFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const toggleSubFilter = (categoryTitle, mainFilterValue, subFilterItem) => {
    setSelectedFilters((prev) => {
      const cat = prev[categoryTitle] ? { ...prev[categoryTitle] } : {};
      let current = cat[mainFilterValue] || [];
      if (current.includes(subFilterItem.value)) {
        current = current.filter((v) => v !== subFilterItem.value);
      } else {
        current = [...current, subFilterItem.value];
      }
      cat[mainFilterValue] = current;
      return { ...prev, [categoryTitle]: cat };
    });
  };

  const clearAll = () => {
    setSelectedFilters({});
  };

  return (
    <aside className="sticky top-0 w-64 h-screen p-6 border-r border-gray-200 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Filters</h2>
        <button onClick={clearAll} className="text-sm text-red-500 hover:underline">
          Clear All
        </button>
      </div>
      <div className="space-y-6">
        {FILTER_CATEGORIES.map((category) => (
          <div key={category.title}>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {category.title}
              </h3>
              <button onClick={() => toggleCategory(category.title)} className="focus:outline-none">
                {expandedCategories[category.title] ? "▲" : "▼"}
              </button>
            </div>
            {expandedCategories[category.title] && (
              <div className="space-y-2">
                {category.filters.map((filterItem) => {
                  const catSelection = selectedFilters[category.title] || {};
                  const isSelected = catSelection[filterItem.value] !== undefined;
                  const key = category.title + "-" + filterItem.value;
                  return (
                    <div key={filterItem.value} className="ml-2">
                      <button
                        onClick={() => toggleFilter(category.title, filterItem)}
                        className={`px-2 py-1 rounded text-sm border transition-colors duration-200 ${
                          isSelected
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white dark:bg-gray-800 text-gray-700 border-gray-300 hover:bg-indigo-100"
                        }`}
                      >
                        {filterItem.label}
                      </button>
                      {filterItem.subFilters && isSelected && expandedFilters[key] && (
                        <div className="ml-4 mt-2 flex flex-wrap gap-2">
                          {filterItem.subFilters.map((subFilter) => {
                            const currentSub = catSelection[filterItem.value] || [];
                            const isSubSelected = currentSub.includes(subFilter.value);
                            return (
                              <button
                                key={subFilter.value}
                                onClick={() => toggleSubFilter(category.title, filterItem.value, subFilter)}
                                className={`px-2 py-1 rounded text-xs border transition-colors duration-200 ${
                                  isSubSelected
                                    ? "bg-indigo-500 text-white border-indigo-500"
                                    : "bg-white dark:bg-gray-800 text-gray-700 border-gray-300 hover:bg-indigo-100"
                                }`}
                              >
                                {subFilter.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

//
// Mobile Filter Sidebar (overlay on small screens)
//
function MobileFilterSidebar({ selectedFilters, setSelectedFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(() => {
    const init = {};
    FILTER_CATEGORIES.forEach((cat) => (init[cat.title] = true));
    return init;
  });
  const [expandedFilters, setExpandedFilters] = useState({});

  const toggleCategory = (title) => {
    setExpandedCategories((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const toggleFilter = (categoryTitle, filterItem) => {
    setSelectedFilters((prev) => {
      const cat = prev[categoryTitle] ? { ...prev[categoryTitle] } : {};
      if (filterItem.subFilters) {
        if (cat[filterItem.value] !== undefined) {
          delete cat[filterItem.value];
        } else {
          cat[filterItem.value] = [];
        }
      } else {
        if (cat[filterItem.value]) {
          delete cat[filterItem.value];
        } else {
          cat[filterItem.value] = true;
        }
      }
      return { ...prev, [categoryTitle]: cat };
    });
    if (filterItem.subFilters) {
      const key = categoryTitle + "-" + filterItem.value;
      setExpandedFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const toggleSubFilter = (categoryTitle, mainFilterValue, subFilterItem) => {
    setSelectedFilters((prev) => {
      const cat = prev[categoryTitle] ? { ...prev[categoryTitle] } : {};
      let current = cat[mainFilterValue] || [];
      if (current.includes(subFilterItem.value)) {
        current = current.filter((v) => v !== subFilterItem.value);
      } else {
        current = [...current, subFilterItem.value];
      }
      cat[mainFilterValue] = current;
      return { ...prev, [categoryTitle]: cat };
    });
  };

  const clearAll = () => {
    setSelectedFilters({});
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-3 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 fixed bottom-4 right-4 z-50 rounded-full shadow-lg md:hidden"
      >
        Filters
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div className="w-64 bg-gray-50 dark:bg-gray-900 h-full overflow-y-auto p-6 border-r border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Filters</h2>
              <button onClick={clearAll} className="text-sm text-red-500 hover:underline">
                Clear All
              </button>
            </div>
            <div className="space-y-6">
              {FILTER_CATEGORIES.map((category) => (
                <div key={category.title}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{category.title}</h3>
                    <button onClick={() => toggleCategory(category.title)} className="focus:outline-none">
                      {expandedCategories[category.title] ? "▲" : "▼"}
                    </button>
                  </div>
                  {expandedCategories[category.title] && (
                    <div className="space-y-2">
                      {category.filters.map((filterItem) => {
                        const catSelection = selectedFilters[category.title] || {};
                        const isSelected = catSelection[filterItem.value] !== undefined;
                        const key = category.title + "-" + filterItem.value;
                        return (
                          <div key={filterItem.value} className="ml-2">
                            <button
                              onClick={() => toggleFilter(category.title, filterItem)}
                              className={`px-2 py-1 rounded text-sm border transition-colors duration-200 ${
                                isSelected
                                  ? "bg-indigo-600 text-white border-indigo-600"
                                  : "bg-white dark:bg-gray-800 text-gray-700 border-gray-300 hover:bg-indigo-100"
                              }`}
                            >
                              {filterItem.label}
                            </button>
                            {filterItem.subFilters && isSelected && expandedFilters[key] && (
                              <div className="ml-4 mt-2 flex flex-wrap gap-2">
                                {filterItem.subFilters.map((subFilter) => {
                                  const currentSub = catSelection[filterItem.value] || [];
                                  const isSubSelected = currentSub.includes(subFilter.value);
                                  return (
                                    <button
                                      key={subFilter.value}
                                      onClick={() => toggleSubFilter(category.title, filterItem.value, subFilter)}
                                      className={`px-2 py-1 rounded text-xs border transition-colors duration-200 ${
                                        isSubSelected
                                          ? "bg-indigo-500 text-white border-indigo-500"
                                          : "bg-white dark:bg-gray-800 text-gray-700 border-gray-300 hover:bg-indigo-100"
                                      }`}
                                    >
                                      {subFilter.label}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Apply Filters
            </button>
          </div>
          <div onClick={() => setIsOpen(false)} className="flex-1 bg-black opacity-50"></div>
        </div>
      )}
    </>
  );
}

//
// Main Responsive Component: shows desktop sidebar on larger screens and mobile overlay on small screens
//
export default function ResponsiveFilterSidebar({ selectedFilters, setSelectedFilters }) {
  return (
    <>
      <div className="hidden md:block">
        <DesktopFilterSidebar selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      </div>
      <div className="md:hidden">
        <MobileFilterSidebar selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
      </div>
    </>
  );
}
