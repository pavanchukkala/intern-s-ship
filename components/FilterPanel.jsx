// components/FilterSidebar.jsx
"use client";
import React from "react";

const FILTER_CATEGORIES = [
  {
    title: "Payment & Stipend",
    filters: [
      { label: "Paid", value: "paid" },
      { label: "Free", value: "free" },
      { label: "Stipend-based", value: "stipend-based" },
      { label: "$0 - $500", value: "$0 - $500" },
      { label: "$500 - $1000", value: "$500 - $1000" },
      { label: "$1000+", value: "$1000+" },
      { label: "Hourly Pay", value: "hourly pay" },
      { label: "Project-based", value: "project-based" },
    ],
  },
  {
    title: "Duration",
    filters: [
      { label: "Less than 3 months", value: "less than 3 months" },
      { label: "3 to 6 months", value: "3 to 6 months" },
      { label: "6+ months", value: "6+ months" },
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

export default function FilterSidebar({ selectedFilters, setSelectedFilters }) {
  // Toggle filter selection for a given category.
  const toggleFilter = (categoryTitle, filterValue) => {
    setSelectedFilters((prev) => {
      const current = prev[categoryTitle] || [];
      if (current.includes(filterValue)) {
        return { ...prev, [categoryTitle]: current.filter((v) => v !== filterValue) };
      } else {
        return { ...prev, [categoryTitle]: [...current, filterValue] };
      }
    });
  };

  // Clear all selected filters.
  const clearAll = () => {
    setSelectedFilters({});
  };

  return (
    <aside className="w-64 min-h-screen p-6 border-r border-gray-200 bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Filters</h2>
        <button onClick={clearAll} className="text-sm text-red-500 hover:underline">
          Clear All
        </button>
      </div>
      <div className="space-y-8">
        {FILTER_CATEGORIES.map((category) => (
          <div key={category.title}>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
              {category.title}
            </h3>
            <div className="space-y-2">
              {category.filters.map((filter) => {
                const isChecked =
                  selectedFilters[category.title] &&
                  selectedFilters[category.title].includes(filter.value);
                return (
                  <label key={filter.value} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleFilter(category.title, filter.value)}
                      className="form-checkbox h-4 w-4 text-indigo-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {filter.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
