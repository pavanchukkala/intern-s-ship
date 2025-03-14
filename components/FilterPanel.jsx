// components/FilterPanel.jsx
import React from 'react';
import { FILTER_CATEGORIES } from './filterDefinitions';

// This component expects two props:
// - selectedFilters: an object representing the currently active filters
// - setSelectedFilters: a function to update the filter state
const FilterPanel = ({ selectedFilters, setSelectedFilters }) => {
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

  // For filters with sub‑filters:
  // Toggling the parent checkbox selects/deselects all its sub‑filters.
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

  // Determine if a parent filter (with sub‑filters) should appear as fully checked.
  const isParentChecked = (filter) => {
    const selectedSubs = selectedFilters[filter.value];
    return selectedSubs && selectedSubs.length === filter.subFilters.length;
  };

  return (
    <div className="filter-panel">
      {FILTER_CATEGORIES.map((category) => (
        <div key={category.title} className="filter-category">
          <h4>{category.title}</h4>
          <div className="filter-options">
            {category.filters.map((filter) => (
              <div key={filter.value} className="filter-option">
                {filter.subFilters ? (
                  <>
                    <label>
                      <input
                        type="checkbox"
                        checked={isParentChecked(filter)}
                        onChange={handleParentChange(filter)}
                      />
                      {filter.label}
                    </label>
                    <div className="sub-filters" style={{ paddingLeft: '1rem' }}>
                      {filter.subFilters.map((sub) => (
                        <div key={sub.value} className="sub-filter-option">
                          <label>
                            <input
                              type="checkbox"
                              checked={
                                selectedFilters[filter.value]
                                  ? selectedFilters[filter.value].includes(sub.value)
                                  : false
                              }
                              onChange={handleSubChange(filter, sub)}
                            />
                            {sub.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <label>
                    <input
                      type="checkbox"
                      checked={!!selectedFilters[filter.value]}
                      onChange={handleChange(filter)}
                    />
                    {filter.label}
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
