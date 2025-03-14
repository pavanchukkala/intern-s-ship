// /components/FilterPanel.jsx
"use client";
import React, { useState } from "react";
import { FILTER_CATEGORIES } from "./filterDefinitions";

// Desktop Filter Sidebar Component (for laptop/desktop)
function DesktopFilterSidebar({ selectedFilters, setSelectedFilters }) {
  const [expandedCategories, setExpandedCategories] = useState(() => {
    const init = {};
    FILTER_CATEGORIES.forEach(cat => (init[cat.title] = true));
    return init;
  });
  const [expandedFilters, setExpandedFilters] = useState({});

  const toggleCategory = (title) => {
    setExpandedCategories(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const toggleFilter = (categoryTitle, filterItem) => {
    setSelectedFilters(prev => {
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
      setExpandedFilters(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const toggleSubFilter = (categoryTitle, mainFilterValue, subFilterItem) => {
    setSelectedFilters(prev => {
      const cat = prev[categoryTitle] ? { ...prev[categoryTitle] } : {};
      let current = cat[mainFilterValue] || [];
      if (current.includes(subFilterItem.value)) {
        current = current.filter(v => v !== subFilterItem.value);
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
        {FILTER_CATEGORIES.map(category => (
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
                {category.filters.map(filterItem => {
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
                          {filterItem.subFilters.map(subFilter => {
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

// Mobile Filter Sidebar Component (for mobile view)
function MobileFilterSidebar({ selectedFilters, setSelectedFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(() => {
    const init = {};
    FILTER_CATEGORIES.forEach(cat => (init[cat.title] = true));
    return init;
  });
  const [expandedFilters, setExpandedFilters] = useState({});

  const toggleCategory = (title) => {
    setExpandedCategories(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const toggleFilter = (categoryTitle, filterItem) => {
    setSelectedFilters(prev => {
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
      setExpandedFilters(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const toggleSubFilter = (categoryTitle, mainFilterValue, subFilterItem) => {
    setSelectedFilters(prev => {
      const cat = prev[categoryTitle] ? { ...prev[categoryTitle] } : {};
      let current = cat[mainFilterValue] || [];
      if (current.includes(subFilterItem.value)) {
        current = current.filter(v => v !== subFilterItem.value);
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
              {FILTER_CATEGORIES.map(category => (
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
                      {category.filters.map(filterItem => {
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
                                {filterItem.subFilters.map(subFilter => {
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

// Main FilterPanel Component: Renders Desktop or Mobile sidebar based on screen size
export default function FilterPanel({ selectedFilters, setSelectedFilters }) {
  return (
    <>
      <div className="hidden md:block">
        <DesktopFilterSidebar
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>
      <div className="md:hidden">
        <MobileFilterSidebar
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>
    </>
  );
}
