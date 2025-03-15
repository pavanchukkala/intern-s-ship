// components/FilterPanel.jsx
"use client";
import React, { useState } from "react";
import { FILTER_CATEGORIES } from "./filterDefinitions";
import { Filter, ChevronLeft } from "lucide-react";

const FilterPanel = ({ selectedFilters, setSelectedFilters, onApplyFilters }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(
    FILTER_CATEGORIES.reduce((acc, cur) => ({ ...acc, [cur.title]: true }), {})
  );

  // Toggle category expansion
  const toggleCategory = (categoryTitle) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle],
    }));
  };

  // Handlers for simple checkbox filters.
  const handleCheckboxChange = (filter) => (e) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedFilters((prev) => ({ ...prev, [filter.value]: true }));
    } else {
      setSelectedFilters((prev) => {
        const { [filter.value]: removed, ...rest } = prev;
        return rest;
      });
    }
  };

  // Handler for parent filters with sub‑filters.
  const handleParentCheckboxChange = (filter) => (e) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedFilters((prev) => ({
        ...prev,
        [filter.value]: filter.subFilters.map((sub) => sub.value),
      }));
    } else {
      setSelectedFilters((prev) => {
        const { [filter.value]: removed, ...rest } = prev;
        return rest;
      });
    }
  };

  // Handler for individual sub‑filters.
  const handleSubCheckboxChange = (parentFilter, subFilter) => (e) => {
    const checked = e.target.checked;
    setSelectedFilters((prev) => {
      const currentSubs = prev[parentFilter.value] || [];
      if (checked) {
        if (!currentSubs.includes(subFilter.value)) {
          return {
            ...prev,
            [parentFilter.value]: [...currentSubs, subFilter.value],
          };
        }
      } else {
        const updatedSubs = currentSubs.filter((v) => v !== subFilter.value);
        if (updatedSubs.length === 0) {
          const { [parentFilter.value]: removed, ...rest } = prev;
          return rest;
        }
        return { ...prev, [parentFilter.value]: updatedSubs };
      }
      return prev;
    });
  };

  // Handler for range filters (e.g., price, duration)
  const handleRangeChange = (filter, value, bound) => {
    setSelectedFilters((prev) => {
      const currentRange = prev[filter.value] || [filter.min, filter.max];
      let newRange = [...currentRange];
      if (bound === "min") {
        newRange[0] = value;
        if (value > newRange[1]) {
          newRange[1] = value;
        }
      } else if (bound === "max") {
        newRange[1] = value;
        if (value < newRange[0]) {
          newRange[0] = value;
        }
      }
      return { ...prev, [filter.value]: newRange };
    });
  };

  // Helper to check if all sub‑filters are selected.
  const isParentChecked = (filter) => {
    const selectedSubs = selectedFilters[filter.value];
    return selectedSubs && selectedSubs.length === filter.subFilters.length;
  };

  // Define basic filter chips for a quick-access bar.
  const basicFilters = ["Remote", "Full-time", "Part-time", "On-site"];

  return (
    <div>
      {/* Basic Filter Bar with chips and toggle icon */}
      <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow mb-4">
        <div className="flex gap-2">
          {basicFilters.map((filter) => (
            <button
              key={filter}
              className="px-3 py-1 bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm"
              onClick={() => setSidebarOpen(true)}
            >
              {filter}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
          aria-label="Toggle filters sidebar"
        >
          {sidebarOpen ? (
            <ChevronLeft size={20} className="text-gray-700 dark:text-gray-200" />
          ) : (
            <Filter size={20} className="text-gray-700 dark:text-gray-200" />
          )}
        </button>
      </div>

      {/* Detailed Filter Sidebar Overlay */}
      {sidebarOpen && (
        <>
          {/* Semi-transparent backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
          {/* Sidebar overlay */}
          <div className="fixed top-0 left-0 w-72 h-full bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3 mb-6">
              <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Filters
              </h4>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none"
                aria-label="Collapse filters sidebar"
              >
                <ChevronLeft size={24} />
              </button>
            </div>
            {/* Clear Filters */}
            <button
              onClick={() => setSelectedFilters({})}
              className="mb-6 text-sm bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none"
            >
              Clear Filters
            </button>
            {/* Filter Categories */}
            {FILTER_CATEGORIES.map((category) => (
              <div key={category.title} className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-xl font-medium text-gray-800 dark:text-gray-100">
                    {category.title}
                  </h5>
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="text-gray-500 focus:outline-none text-2xl"
                    aria-label="Toggle category"
                  >
                    {expandedCategories[category.title] ? "−" : "+"}
                  </button>
                </div>
                {expandedCategories[category.title] && (
                  <div className="space-y-4">
                    {category.filters.map((filter) => (
                      <div key={filter.value} className="pl-2">
                        {filter.type === "range" ? (
                          <div className="flex flex-col">
                            <label className="text-gray-700 dark:text-gray-300 mb-1">
                              {filter.label}
                            </label>
                            <div className="flex flex-col space-y-2">
                              <input
                                type="range"
                                min={filter.min}
                                max={filter.max}
                                value={
                                  selectedFilters[filter.value]
                                    ? selectedFilters[filter.value][0]
                                    : filter.min
                                }
                                onChange={(e) =>
                                  handleRangeChange(
                                    filter,
                                    Number(e.target.value),
                                    "min"
                                  )
                                }
                                className="accent-blue-600"
                              />
                              <input
                                type="range"
                                min={filter.min}
                                max={filter.max}
                                value={
                                  selectedFilters[filter.value]
                                    ? selectedFilters[filter.value][1]
                                    : filter.max
                                }
                                onChange={(e) =>
                                  handleRangeChange(
                                    filter,
                                    Number(e.target.value),
                                    "max"
                                  )
                                }
                                className="accent-blue-600"
                              />
                              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                                <span>
                                  {selectedFilters[filter.value]
                                    ? selectedFilters[filter.value][0]
                                    : filter.min}
                                </span>
                                <span>
                                  {selectedFilters[filter.value]
                                    ? selectedFilters[filter.value][1]
                                    : filter.max}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : filter.subFilters ? (
                          <div className="mb-2">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={isParentChecked(filter)}
                                onChange={handleParentCheckboxChange(filter)}
                                className="form-checkbox h-4 w-4 text-blue-600"
                              />
                              <span className="ml-2 text-gray-700 dark:text-gray-300">
                                {filter.label}
                              </span>
                            </div>
                            <div className="ml-6 mt-2 grid grid-cols-2 gap-y-1">
                              {filter.subFilters.map((sub) => (
                                <div key={sub.value} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={
                                      selectedFilters[filter.value]
                                        ? selectedFilters[filter.value].includes(
                                            sub.value
                                          )
                                        : false
                                    }
                                    onChange={handleSubCheckboxChange(filter, sub)}
                                    className="form-checkbox h-3 w-3 text-blue-600"
                                  />
                                  <span className="ml-2 text-gray-600 dark:text-gray-400 text-sm">
                                    {sub.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={!!selectedFilters[filter.value]}
                              onChange={handleCheckboxChange(filter)}
                              className="form-checkbox h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300">
                              {filter.label}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {/* Apply Filters Button */}
            <div className="mt-8">
              <button
                onClick={() => {
                  onApplyFilters();
                  setSidebarOpen(false);
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterPanel;
