import React from 'react';
import Icon from '../../../components/AppIcon';
import { SORT_OPTIONS } from '../constants/templateConstants';

const SearchAndSort = ({ 
  searchTerm, 
  sortBy, 
  onSearchChange, 
  onSortChange 
}) => {
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-4 lg:flex-shrink-0">
      <div className="relative">
        <Icon 
          name="Search" 
          size={16} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full lg:w-80 pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          aria-label="Search templates"
        />
      </div>
      
      <div className="relative">
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="w-full lg:w-auto px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          aria-label="Sort templates"
        >
          {SORT_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchAndSort;