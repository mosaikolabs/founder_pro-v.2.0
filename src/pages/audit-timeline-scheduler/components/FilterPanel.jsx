import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ filters, onFiltersChange, filterOptions }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (filterType, value, checked) => {
    const currentValues = filters[filterType] || [];
    let newValues;
    
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }
    
    onFiltersChange({
      ...filters,
      [filterType]: newValues
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      departments: [],
      auditTypes: [],
      status: [],
      priority: []
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((count, filterArray) => count + filterArray.length, 0);
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="neumorphic-card mb-4 lg:mb-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white border-opacity-10">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-text-dark-primary hover:text-neon-green nav-transition"
        >
          <Icon 
            name={isExpanded ? "ChevronDown" : "ChevronRight"} 
            size={20} 
          />
          <span className="text-sm sm:text-base font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-gradient-accent text-white text-xs px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
        
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-xs sm:text-sm text-text-dark-secondary hover:text-text-dark-primary nav-transition"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-6">
            {/* Department Filter */}
            <div>
              <h4 className="text-sm font-medium text-text-dark-primary mb-3">
                Departments
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-dark">
                {filterOptions?.departments?.map((department) => (
                  <label
                    key={department}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters?.departments?.includes(department)}
                      onChange={(e) => handleFilterChange('departments', department, e.target.checked)}
                      className="w-4 h-4 text-neon-green bg-dark-primary border-white border-opacity-20 rounded focus:ring-neon-green focus:ring-2"
                    />
                    <span className="text-sm text-text-dark-secondary">
                      {department}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Audit Type Filter */}
            <div>
              <h4 className="text-sm font-medium text-text-dark-primary mb-3">
                Audit Types
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-dark">
                {filterOptions?.auditTypes?.map((auditType) => (
                  <label
                    key={auditType}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters?.auditTypes?.includes(auditType)}
                      onChange={(e) => handleFilterChange('auditTypes', auditType, e.target.checked)}
                      className="w-4 h-4 text-neon-green bg-dark-primary border-white border-opacity-20 rounded focus:ring-neon-green focus:ring-2"
                    />
                    <span className="text-sm text-text-dark-secondary">
                      {auditType}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <h4 className="text-sm font-medium text-text-dark-primary mb-3">
                Status
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-dark">
                {filterOptions?.status?.map((status) => (
                  <label
                    key={status}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters?.status?.includes(status)}
                      onChange={(e) => handleFilterChange('status', status, e.target.checked)}
                      className="w-4 h-4 text-neon-green bg-dark-primary border-white border-opacity-20 rounded focus:ring-neon-green focus:ring-2"
                    />
                    <span className="text-sm text-text-dark-secondary">
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Priority Filter */}
            <div>
              <h4 className="text-sm font-medium text-text-dark-primary mb-3">
                Priority
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-dark">
                {filterOptions?.priority?.map((priority) => (
                  <label
                    key={priority}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters?.priority?.includes(priority)}
                      onChange={(e) => handleFilterChange('priority', priority, e.target.checked)}
                      className="w-4 h-4 text-neon-green bg-dark-primary border-white border-opacity-20 rounded focus:ring-neon-green focus:ring-2"
                    />
                    <span className="text-sm text-text-dark-secondary">
                      {priority}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFilterCount > 0 && (
            <div className="mt-4 pt-4 border-t border-white border-opacity-10">
              <h4 className="text-sm font-medium text-text-dark-primary mb-2">
                Active Filters:
              </h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(filters).map(([filterType, values]) =>
                  values.map((value) => (
                    <span
                      key={`${filterType}-${value}`}
                      className="inline-flex items-center space-x-1 bg-dark-surface text-neon-green px-2 py-1 rounded-full text-xs border border-white border-opacity-10"
                    >
                      <span className="truncate max-w-20">{value}</span>
                      <button
                        onClick={() => handleFilterChange(filterType, value, false)}
                        className="hover:text-text-dark-primary nav-transition flex-shrink-0"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterPanel;