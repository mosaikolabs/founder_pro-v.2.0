import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ 
  categories, 
  statuses, 
  filters, 
  onFiltersChange 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCategoryChange = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleStatusChange = (status) => {
    const updatedStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status];
    
    onFiltersChange({
      ...filters,
      statuses: updatedStatuses
    });
  };

  const handleDateRangeChange = (field, value) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      statuses: [],
      dateRange: { start: '', end: '' }
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || 
                          filters.statuses.length > 0 || 
                          filters.dateRange.start || 
                          filters.dateRange.end;

  return (
    <div className="neumorphic-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white border-opacity-10">
        <h3 className="text-lg font-medium text-text-dark-primary">Filters</h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-neon-green hover:text-text-dark-primary nav-transition"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 text-text-dark-secondary hover:text-text-dark-primary nav-transition lg:hidden"
          >
            <Icon name={isCollapsed ? 'ChevronDown' : 'ChevronUp'} size={16} />
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className={`${isCollapsed ? 'hidden' : 'block'} lg:block p-4 space-y-6`}>
        {/* Categories */}
        <div>
          <h4 className="text-sm font-medium text-text-dark-primary mb-3">
            Categories
          </h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="rounded border-white border-opacity-20 text-neon-green bg-dark-primary focus:ring-neon-green"
                />
                <span className="text-sm text-text-dark-secondary">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Status */}
        <div>
          <h4 className="text-sm font-medium text-text-dark-primary mb-3">
            Status
          </h4>
          <div className="space-y-2">
            {statuses.map((status) => (
              <label key={status} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.statuses.includes(status)}
                  onChange={() => handleStatusChange(status)}
                  className="rounded border-white border-opacity-20 text-neon-green bg-dark-primary focus:ring-neon-green"
                />
                <span className="text-sm text-text-dark-secondary">
                  {status}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <h4 className="text-sm font-medium text-text-dark-primary mb-3">
            Last Updated
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-text-dark-secondary mb-1">
                From
              </label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="w-full px-3 py-2 neumorphic-input text-sm text-text-dark-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-text-dark-secondary mb-1">
                To
              </label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="w-full px-3 py-2 neumorphic-input text-sm text-text-dark-primary"
              />
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div>
          <h4 className="text-sm font-medium text-text-dark-primary mb-3">
            Quick Filters
          </h4>
          <div className="space-y-2">
            <button
              onClick={() => onFiltersChange({
                ...filters,
                statuses: ['Expired']
              })}
              className="w-full text-left px-3 py-2 text-sm text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated rounded-md nav-transition"
            >
              Expired Policies
            </button>
            <button
              onClick={() => {
                const thirtyDaysFromNow = new Date();
                thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
                // This would filter policies expiring in the next 30 days
                console.log('Filter expiring soon');
              }}
              className="w-full text-left px-3 py-2 text-sm text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated rounded-md nav-transition"
            >
              Expiring Soon
            </button>
            <button
              onClick={() => onFiltersChange({
                ...filters,
                statuses: ['Under Review', 'Draft']
              })}
              className="w-full text-left px-3 py-2 text-sm text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated rounded-md nav-transition"
            >
              Pending Approval
            </button>
          </div>
        </div>

        {/* Saved Filters */}
        <div>
          <h4 className="text-sm font-medium text-text-dark-primary mb-3">
            Saved Filters
          </h4>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 text-sm text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated rounded-md nav-transition">
              My Department Policies
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated rounded-md nav-transition">
              Security Policies
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated rounded-md nav-transition">
              Recently Updated
            </button>
          </div>
          
          <button className="w-full mt-3 px-3 py-2 text-sm text-neon-green border border-neon-green rounded-md hover:bg-neon-green hover:text-dark-primary nav-transition">
            Save Current Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;