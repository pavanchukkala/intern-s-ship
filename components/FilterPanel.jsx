// /components/FilterPanel.jsx
"use client";
import React, { useState } from "react";
import { FILTER_CATEGORIES } from "./filterDefinitions";
import { Filter, XCircle } from "lucide-react";
import DualRangeSlider from "./DualRangeSlider";

// FilterPanel renders a basic filter bar and a detailed sidebar overlay.
// It supports checkboxes, parent-child subfilters, and range (slider) filters.
// For range filters, a checkbox toggles the display of the slider.
const FilterPanel = ({ selectedFilters, setSelectedFilters, onApplyFilters }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(
    FILTER_CATEGORIES.reduce((acc, cur) => ({ ...acc, [cur.title]: true }), {})
  );
  const [activeRange, setActiveRange] = useState({});

  // Toggle category expansion.
  const toggleCategory = (categoryTitle) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle],
    }));
  };

  // Handle simple checkbox changes.
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

  // Handle parent filters with sub‑filters.
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

  // Handle individual sub‑filter checkbox changes.
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

  // Handle range filter changes via the custom dual slider.
  const handleRangeChange = (filter, values) => {
    setSelectedFilters((prev) => ({ ...prev, [filter.value]: values }));
  };

  // Check if all sub‑filters for a parent are selected.
  const isParentChecked = (filter) => {
    const selectedSubs = selectedFilters[filter.value];
    return selectedSubs && selectedSubs.length === filter.subFilters?.length;
  };

  // Basic filter chips.
  const basicFilters = ["Remote", "Full-time", "Part-time", "On-site"];

  return (
    <div>
      {/* Basic Filter Bar */}
      <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow mb-4">
        <div className="flex gap-2">
          {basicFilters.map((filter) => (
            <button
              key={filter}
              className="px-3 py-1 bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-sm transition duration-200"
              onClick={() => setSidebarOpen(true)}
            >
              {filter}
            </button>
          ))}
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          aria-label="Toggle filters sidebar"
        >
          {sidebarOpen ? (
            <XCircle size={24} className="text-white" />
          ) : (
            <Filter size={24} className="text-white" />
          )}
        </button>
      </div>

      {/* Detailed Filter Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 w-80 h-full bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto p-6">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between border-b pb-3 mb-6">
              <h4 className="text-2xl font-bold text-blue-700">Filters</h4>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200 focus:outline-none"
                aria-label="Close filters sidebar"
              >
                <XCircle size={24} className="text-gray-600" />
              </button>
            </div>
            {/* Clear All Button */}
            <button
              onClick={() => {
                setSelectedFilters({});
                setActiveRange({});
              }}
              className="mb-6 w-full py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition duration-200 focus:outline-none"
            >
              Clear All
            </button>
            {/* Render Filter Categories */}
            {FILTER_CATEGORIES.map((category) => (
              <div key={category.title} className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="text-xl font-bold text-blue-700">{category.title}</h5>
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="focus:outline-none"
                    aria-label="Toggle category"
                  >
                    <div className="flex flex-col justify-center items-center">
                      <div
                        className={`w-6 h-1 bg-gray-500 transition-transform duration-300 ${
                          expandedCategories[category.title] ? "rotate-90" : ""
                        }`}
                      ></div>
                    </div>
                  </button>
                </div>
                {expandedCategories[category.title] && (
                  <div className="space-y-6">
                    {category.filters.map((filter) => (
                      <div key={filter.value} className="pl-2">
                        {filter.type === "range" ? (
                          // For range filters, show a checkbox to toggle slider display.
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={activeRange[filter.value] || false}
                                onChange={() => {
                                  setActiveRange((prev) => ({
                                    ...prev,
                                    [filter.value]: !prev[filter.value],
                                  }));
                                  if (activeRange[filter.value]) {
                                    setSelectedFilters((prev) => {
                                      const { [filter.value]: removed, ...rest } = prev;
                                      return rest;
                                    });
                                  }
                                }}
                                className="form-checkbox h-4 w-4 text-blue-600"
                              />
                              <span className="ml-2 text-gray-700 dark:text-gray-300">
                                {filter.label}
                              </span>
                            </div>
                            {activeRange[filter.value] && (
                              <div className="mt-2">
                                <span className="block mb-1 font-semibold text-gray-600">
                                  {selectedFilters[filter.value]
                                    ? `${selectedFilters[filter.value][0]} - ${selectedFilters[filter.value][1]}`
                                    : `${filter.min} - ${filter.max}`}
                                </span>
                                <DualRangeSlider
                                  min={filter.min}
                                  max={filter.max}
                                  values={
                                    selectedFilters[filter.value] ||
                                    [filter.min, filter.max]
                                  }
                                  onChange={(values) =>
                                    handleRangeChange(filter, values)
                                  }
                                />
                              </div>
                            )}
                          </div>
                        ) : filter.subFilters ? (
                          <div className="mb-4">
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
            <div className="mt-8">
              <button
                onClick={() => {
                  onApplyFilters();
                  setSidebarOpen(false);
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 focus:outline-none"
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
