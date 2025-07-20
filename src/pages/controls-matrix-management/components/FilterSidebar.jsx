import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ isOpen, filters, onFiltersChange, departments, controls }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const frameworks = [...new Set(controls.map(c => c.framework))];
  const statuses = ['Compliant', 'Non-Compliant', 'In Progress', 'Not Tested', 'Overdue'];

  const handleFilterChange = (filterType, value, isChecked) => {
    onFiltersChange(prev => ({
      ...prev,
      [filterType]: isChecked 
        ? [...prev[filterType], value]
        : prev[filterType].filter(item => item !== value)
    }));
  };

  const clearAllFilters = () => {
    onFiltersChange({
      departments: [],
      frameworks: [],
      status: [],
      savedView: null
    });
    setSearchTerm('');
  };

  const getFilterCount = () => {
    return filters.departments.length + filters.frameworks.length + filters.status.length;
  };

  if (!isOpen) return null;

  return (
    <div className="w-full h-full neumorphic-card flex flex-col">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 p-4 border-b border-white border-opacity-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-dark-primary">
            Filters
          </h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-neon-green font-medium">
              {getFilterCount()} active
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-text-dark-muted hover:text-text-dark-primary"
            >
              Clear All
            </Button>
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-dark">
        <div className="p-4 space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <label className="form-label-dark">Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search departments, controls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full neumorphic-input text-text-dark-primary placeholder-text-dark-muted pl-10"
              />
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-dark-muted"
              />
            </div>
          </div>

          {/* Departments */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text-dark-primary flex items-center">
              <Icon name="Building" size={16} className="mr-2" />
              Departments
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-dark">
              {departments
                .filter(dept => dept.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(dept => (
                  <label key={dept.id} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.departments.includes(dept.id)}
                      onChange={(e) => handleFilterChange('departments', dept.id, e.target.checked)}
                      className="w-4 h-4 text-neon-green bg-dark-primary border-white border-opacity-20 rounded focus:ring-neon-green focus:ring-2"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-text-dark-primary group-hover:text-neon-green transition-colors truncate" title={dept.name}>
                        {dept.name}
                      </div>
                      <div className="text-xs text-text-dark-muted truncate" title={dept.head}>
                        {dept.head}
                      </div>
                    </div>
                  </label>
                ))}
            </div>
          </div>

          {/* Frameworks */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text-dark-primary flex items-center">
              <Icon name="Shield" size={16} className="mr-2" />
              Frameworks
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-dark">
              {frameworks.map(framework => (
                <label key={framework} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.frameworks.includes(framework)}
                    onChange={(e) => handleFilterChange('frameworks', framework, e.target.checked)}
                    className="w-4 h-4 text-neon-green bg-dark-primary border-white border-opacity-20 rounded focus:ring-neon-green focus:ring-2"
                  />
                  <span className="text-sm text-text-dark-primary group-hover:text-neon-green transition-colors truncate" title={framework}>
                    {framework}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text-dark-primary flex items-center">
              <Icon name="Activity" size={16} className="mr-2" />
              Status
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-dark">
              {statuses.map(status => (
                <label key={status} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status)}
                    onChange={(e) => handleFilterChange('status', status, e.target.checked)}
                    className="w-4 h-4 text-neon-green bg-dark-primary border-white border-opacity-20 rounded focus:ring-neon-green focus:ring-2"
                  />
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      status === 'Compliant' ? 'bg-success-dark' :
                      status === 'Non-Compliant' ? 'bg-error-dark' :
                      status === 'In Progress' ? 'bg-warning-dark' :
                      status === 'Overdue'? 'bg-error-dark' : 'bg-text-dark-muted'
                    }`} />
                    <span className="text-sm text-text-dark-primary group-hover:text-neon-green transition-colors truncate" title={status}>
                      {status}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Saved Views */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text-dark-primary flex items-center">
              <Icon name="Bookmark" size={16} className="mr-2" />
              Saved Views
            </h4>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-text-dark-secondary hover:text-text-dark-primary"
                icon="Plus"
              >
                Save Current View
              </Button>
              <div className="text-xs text-text-dark-muted">
                No saved views yet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;