// components/FilterSidebarOverlay.jsx
import React, { useState } from 'react';
import { FILTER_CATEGORIES } from './filterDefinitions';

const FilterSidebarOverlay = ({
  visible,
  onClose,
  selectedFilters,
  setSelectedFilters,
  onApplyFilters,
}) => {
  const [expandedCategories, setExpandedCategories] = useState(
    FILTER_CATEGORIES.reduce((acc, cur) => ({ ...acc, [cur.title]: true }), {})
  );

  const toggleCategory = (categoryTitle) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle],
    }));
  };

  // Handlers for filters without sub‑filters.
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

  // Helper for parent filters: check if all sub‑filters are selected.
  const isParentChecked = (filter) => {
    const selectedSubs = selectedFilters[filter.value];
    return selectedSubs && selectedSubs.length === filter.subFilters.length;
  };

  if (!visible) return null;

  return (
    <>
      {/* Semi-transparent backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      ></div>
      {/* Sidebar overlay */}
      <div className="fixed top-0 left-0 w-64 h-full bg-white shadow z-50 overflow-y-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <h4 className="text-lg font-semibold text-gray-800">Filters</h4>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close sidebar"
          >
            X
          </button>
        </div>
        {/* Clear Filters */}
        <button
          onClick={() => setSelectedFilters({})}
          className="mb-4 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          Clear Filters
        </button>
        {/* Filter Categories */}
        {FILTER_CATEGORIES.map((category) => (
          <div key={category.title} className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-md font-medium text-gray-800">
                {category.title}
              </h5>
              <button
                onClick={() => toggleCategory(category.title)}
                className="text-gray-500 focus:outline-none"
                aria-label="Toggle category"
              >
                {expandedCategories[category.title] ? '−' : '+'}
              </button>
            </div>
            {expandedCategories[category.title] && (
              <div className="space-y-2">
                {category.filters.map((filter) => (
                  <div key={filter.value} className="pl-2">
                    {filter.subFilters ? (
                      <div className="mb-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={isParentChecked(filter)}
                            onChange={handleParentCheckboxChange(filter)}
                            className="form-checkbox h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2 text-gray-700">
                            {filter.label}
                          </span>
                        </div>
                        <div className="ml-6 mt-1 grid grid-cols-2 gap-y-1">
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
                              <span className="ml-2 text-gray-600 text-sm">
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
                        <span className="ml-2 text-gray-700">
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
        <div className="mt-4">
          <button
            onClick={() => {
              onApplyFilters();
              onClose();
            }}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebarOverlay;
