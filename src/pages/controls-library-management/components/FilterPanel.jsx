import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterPanel = ({ isOpen, filters, onFiltersChange, controlsLibrary }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const frameworks = [...new Set(controlsLibrary.map(c => c.framework))];
  const categories = [...new Set(controlsLibrary.map(c => c.category))];
  const statuses = [...new Set(controlsLibrary.map(c => c.status))];
  const allTags = [...new Set(controlsLibrary.flatMap(c => c.tags))];

  const handleFilterChange = (filterType, value, isChecked) => {
    onFiltersChange(prev => ({
      ...prev,
      [filterType]: isChecked 
        ? [...prev[filterType], value]
        : prev[filterType].filter(item => item !== value)
    }));
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    onFiltersChange(prev => ({
      ...prev,
      search: value
    }));
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      frameworks: [],
      categories: [],
      status: [],
      tags: []
    });
    setSearchTerm('');
  };

  const getFilterCount = () => {
    return filters.frameworks.length + filters.categories.length + filters.status.length + filters.tags.length;
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
            <label className="form-label-dark">Search Controls</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, ID, or description..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full neumorphic-input text-text-dark-primary placeholder-text-dark-muted pl-10"
              />
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-dark-muted"
              />
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

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text-dark-primary flex items-center">
              <Icon name="Folder" size={16} className="mr-2" />
              Categories
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-dark">
              {categories.map(category => (
                <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={(e) => handleFilterChange('categories', category, e.target.checked)}
                    className="w-4 h-4 text-neon-green bg-dark-primary border-white border-opacity-20 rounded focus:ring-neon-green focus:ring-2"
                  />
                  <span className="text-sm text-text-dark-primary group-hover:text-neon-green transition-colors truncate" title={category}>
                    {category}
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
                      status === 'Active' ? 'bg-success-dark' :
                      status === 'Inactive' ? 'bg-text-dark-muted' :
                      status === 'Draft' ? 'bg-warning-dark' : 'bg-info-dark'
                    }`} />
                    <span className="text-sm text-text-dark-primary group-hover:text-neon-green transition-colors truncate" title={status}>
                      {status}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text-dark-primary flex items-center">
              <Icon name="Tag" size={16} className="mr-2" />
              Tags
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-dark">
              {allTags.map(tag => (
                <label key={tag} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.tags.includes(tag)}
                    onChange={(e) => handleFilterChange('tags', tag, e.target.checked)}
                    className="w-4 h-4 text-neon-green bg-dark-primary border-white border-opacity-20 rounded focus:ring-neon-green focus:ring-2"
                  />
                  <span className="text-sm text-text-dark-primary group-hover:text-neon-green transition-colors truncate" title={tag}>
                    {tag}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;