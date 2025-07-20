// src/pages/compliance-reporting-center/components/FilterPanel.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Select } from '../../../components/ui/Dropdown';

const FilterPanel = ({ filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const departments = [
    { value: 'Finance', label: 'Finance' },
    { value: 'IT', label: 'IT' },
    { value: 'HR', label: 'HR' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Risk Management', label: 'Risk Management' },
    { value: 'Audit', label: 'Audit' }
  ];

  const frameworks = [
    { value: 'SOX', label: 'SOX' },
    { value: 'ISO 27001', label: 'ISO 27001' },
    { value: 'GDPR', label: 'GDPR' },
    { value: 'HIPAA', label: 'HIPAA' },
    { value: 'PCI DSS', label: 'PCI DSS' },
    { value: 'SOC 2', label: 'SOC 2' },
    { value: 'NIST', label: 'NIST' }
  ];

  const metrics = [
    { value: 'Compliance Score', label: 'Compliance Score' },
    { value: 'Control Effectiveness', label: 'Control Effectiveness' },
    { value: 'Risk Level', label: 'Risk Level' },
    { value: 'Audit Findings', label: 'Audit Findings' },
    { value: 'Policy Adherence', label: 'Policy Adherence' },
    { value: 'Training Completion', label: 'Training Completion' }
  ];

  const handleDateRangeChange = (field, value) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: value
      }
    });
  };

  const handleMultiSelectChange = (field, value) => {
    const currentValues = filters[field] || [];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFiltersChange({
      ...filters,
      [field]: updatedValues
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      dateRange: { start: '', end: '' },
      departments: [],
      frameworks: [],
      metrics: []
    });
  };

  const hasActiveFilters = () => {
    return filters?.dateRange?.start || 
           filters?.dateRange?.end || 
           filters?.departments?.length > 0 || 
           filters?.frameworks?.length > 0 || 
           filters?.metrics?.length > 0;
  };

  const getQuickDateRange = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    
    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    };
  };

  const applyQuickDateRange = (days) => {
    const dateRange = getQuickDateRange(days);
    handleDateRangeChange('start', dateRange.start);
    handleDateRangeChange('end', dateRange.end);
  };

  return (
    <div className="p-4 neumorphic-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-dark-primary">Report Filters</h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters() && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-neon-green hover:text-text-dark-primary nav-transition"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-text-dark-secondary hover:text-text-dark-primary nav-transition"
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </button>
        </div>
      </div>

      {/* Always Visible: Date Range */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-text-dark-primary mb-2">
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-text-dark-secondary mb-1">From</label>
              <input
                type="date"
                value={filters?.dateRange?.start || ''}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="w-full px-2 py-1 text-xs neumorphic-input text-text-dark-primary"
              />
            </div>
            <div>
              <label className="block text-xs text-text-dark-secondary mb-1">To</label>
              <input
                type="date"
                value={filters?.dateRange?.end || ''}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="w-full px-2 py-1 text-xs neumorphic-input text-text-dark-primary"
              />
            </div>
          </div>
          
          {/* Quick Date Ranges */}
          <div className="flex flex-wrap gap-1 mt-2">
            <button
              onClick={() => applyQuickDateRange(7)}
              className="px-2 py-1 text-xs bg-dark-surface text-text-dark-secondary rounded hover:bg-dark-elevated hover:text-text-dark-primary nav-transition"
            >
              Last 7 days
            </button>
            <button
              onClick={() => applyQuickDateRange(30)}
              className="px-2 py-1 text-xs bg-dark-surface text-text-dark-secondary rounded hover:bg-dark-elevated hover:text-text-dark-primary nav-transition"
            >
              Last 30 days
            </button>
            <button
              onClick={() => applyQuickDateRange(90)}
              className="px-2 py-1 text-xs bg-dark-surface text-text-dark-secondary rounded hover:bg-dark-elevated hover:text-text-dark-primary nav-transition"
            >
              Last 90 days
            </button>
          </div>
        </div>

        {/* Expandable Filters */}
        {isExpanded && (
          <div className="space-y-4 border-t border-white border-opacity-10 pt-4">
            {/* Departments Multi-Select */}
            <div>
              <label className="block text-xs font-medium text-text-dark-primary mb-2">
                Departments ({filters?.departments?.length || 0} selected)
              </label>
              <Select
                value={filters?.departments?.[0] || ''}
                onChange={(value) => handleMultiSelectChange('departments', value)}
                options={[
                  { value: '', label: 'Select departments...' },
                  ...departments
                ]}
                placeholder="Select departments..."
                width="100%"
              />
              {filters?.departments?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {filters.departments.map((dept) => (
                    <span
                      key={dept}
                      className="inline-flex items-center px-2 py-1 text-xs bg-neon-green bg-opacity-20 text-neon-green rounded-full border border-neon-green border-opacity-30"
                    >
                      {dept}
                      <button
                        onClick={() => handleMultiSelectChange('departments', dept)}
                        className="ml-1 text-xs hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Frameworks Multi-Select */}
            <div>
              <label className="block text-xs font-medium text-text-dark-primary mb-2">
                Frameworks ({filters?.frameworks?.length || 0} selected)
              </label>
              <Select
                value={filters?.frameworks?.[0] || ''}
                onChange={(value) => handleMultiSelectChange('frameworks', value)}
                options={[
                  { value: '', label: 'Select frameworks...' },
                  ...frameworks
                ]}
                placeholder="Select frameworks..."
                width="100%"
              />
              {filters?.frameworks?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {filters.frameworks.map((framework) => (
                    <span
                      key={framework}
                      className="inline-flex items-center px-2 py-1 text-xs bg-neon-purple bg-opacity-20 text-neon-purple rounded-full border border-neon-purple border-opacity-30"
                    >
                      {framework}
                      <button
                        onClick={() => handleMultiSelectChange('frameworks', framework)}
                        className="ml-1 text-xs hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Metrics Multi-Select */}
            <div>
              <label className="block text-xs font-medium text-text-dark-primary mb-2">
                Metrics ({filters?.metrics?.length || 0} selected)
              </label>
              <Select
                value={filters?.metrics?.[0] || ''}
                onChange={(value) => handleMultiSelectChange('metrics', value)}
                options={[
                  { value: '', label: 'Select metrics...' },
                  ...metrics
                ]}
                placeholder="Select metrics..."
                width="100%"
              />
              {filters?.metrics?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {filters.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="inline-flex items-center px-2 py-1 text-xs bg-info-dark bg-opacity-20 text-info-dark rounded-full border border-info-dark border-opacity-30"
                    >
                      {metric}
                      <button
                        onClick={() => handleMultiSelectChange('metrics', metric)}
                        className="ml-1 text-xs hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Calculations */}
            <div>
              <label className="block text-xs font-medium text-text-dark-primary mb-2">
                Custom Calculations
              </label>
              <div className="space-y-2">
                <button className="w-full text-left px-2 py-1 text-xs text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated rounded nav-transition">
                  Risk-Weighted Compliance Score
                </button>
                <button className="w-full text-left px-2 py-1 text-xs text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated rounded nav-transition">
                  Trend Analysis (YoY)
                </button>
                <button className="w-full text-left px-2 py-1 text-xs text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated rounded nav-transition">
                  Department Benchmarks
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters() && (
        <div className="mt-4 pt-4 border-t border-white border-opacity-10">
          <div className="text-xs text-text-dark-secondary mb-2">Active Filters:</div>
          <div className="space-y-1">
            {filters?.dateRange?.start && (
              <div className="text-xs text-neon-green">
                • Date: {filters.dateRange.start} to {filters.dateRange.end || 'Present'}
              </div>
            )}
            {filters?.departments?.length > 0 && (
              <div className="text-xs text-neon-green">
                • Departments: {filters.departments.length} selected
              </div>
            )}
            {filters?.frameworks?.length > 0 && (
              <div className="text-xs text-neon-green">
                • Frameworks: {filters.frameworks.length} selected
              </div>
            )}
            {filters?.metrics?.length > 0 && (
              <div className="text-xs text-neon-green">
                • Metrics: {filters.metrics.length} selected
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;