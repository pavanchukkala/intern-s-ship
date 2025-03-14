// components/FilterPanel.jsx
import React, { useState } from 'react';
import { FILTER_CATEGORIES } from './filterDefinitions';

const FilterPanel = ({ selectedFilters, setSelectedFilters }) => {
  // State to control which parent filters have their subfilters visible.
  const [openSubFilters, setOpenSubFilters] = useState({});

  const toggleSubFilterAccordion = (filterValue) => {
    setOpenSubFilters((prev) => ({ ...prev, [filterValue]: !prev[filterValue] }));
  };

  // For filters without sub‑filters.
  const handleChange = (filter) => (e) => {
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

  // For parent filters with sub‑filters.
  const handleParentChange = (filter) => (e) => {
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

  // For individual sub‑filter toggles.
  const handleSubChange = (parentFilter, subFilter) => (e) => {
    const checked = e.target.checked;
    setSelectedFilters((prev) => {
      const current = prev[parentFilter.value] || [];
      if (checked) {
        if (!current.includes(subFilter.value)) {
          return { ...prev, [parentFilter.value]: [...current, subFilter.value] };
        }
        return prev;
      } else {
        const newArr = current.filter((val) => val !== subFilter.value);
        if (newArr.length === 0) {
          const { [parentFilter.value]: removed, ...rest } = prev;
          return rest;
        }
        return { ...prev, [parentFilter.value]: newArr };
      }
    });
  };

  // Check if all subfilters are selected.
  const isParentChecked = (filter) => {
    const selectedSubs = selectedFilters[filter.value];
    return selectedSubs && selectedSubs.length === filter.subFilters.length;
  };

  return (
    <div className="p-4 space-y-6">
      {FILTER_CATEGORIES.map((category) => (
        <div key={category.title} className="bg-white shadow rounded-lg p-4">
          <h4 className="text-xl font-semibold mb-3">{category.title}</h4>
          <div className="space-y-3">
            {category.filters.map((filter) => (
              <div key={filter.value} className="border-b pb-2">
                {filter.subFilters ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={isParentChecked(filter)}
                          onChange={handleParentChange(filter)}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="font-medium">{filter.label}</span>
                      </label>
                      <button
                        onClick={() => toggleSubFilterAccordion(filter.value)}
                        className="text-sm text-blue-500 focus:outline-none"
                      >
                        {openSubFilters[filter.value] ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    {openSubFilters[filter.value] && (
                      <div className="pl-6 mt-2 grid grid-cols-2 gap-2">
                        {filter.subFilters.map((sub) => (
                          <label key={sub.value} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={
                                selectedFilters[filter.value]
                                  ? selectedFilters[filter.value].includes(sub.value)
                                  : false
                              }
                              onChange={handleSubChange(filter, sub)}
                              className="form-checkbox h-5 w-5 text-blue-600"
                            />
                            <span className="text-sm">{sub.label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={!!selectedFilters[filter.value]}
                      onChange={handleChange(filter)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="font-medium">{filter.label}</span>
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterPanel;
