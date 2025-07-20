import React from 'react';
import Icon from '../../../components/AppIcon';
import { getCategoryIcon } from '../utils/templateUtils';

const CategorySidebar = ({ categories, selectedCategory, onCategoryChange }) => {
  const handleCategoryClick = (categoryKey) => {
    onCategoryChange(categoryKey);
  };

  const handleKeyDown = (e, categoryKey) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCategoryClick(categoryKey);
    }
  };

  return (
    <div className="w-full xl:w-64 flex-shrink-0">
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">
          Categories
        </h3>
        <nav role="navigation" aria-label="Template categories">
          <ul className="space-y-1">
            {categories?.map(category => (
              <li key={category.key}>
                <button
                  onClick={() => handleCategoryClick(category.key)}
                  onKeyDown={(e) => handleKeyDown(e, category.key)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.key
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white hover:shadow-sm'
                  }`}
                  aria-pressed={selectedCategory === category.key}
                  aria-label={`Filter by ${category.label} category (${category.count} templates)`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <Icon 
                      name={getCategoryIcon(category.key)} 
                      size={16} 
                      className={`flex-shrink-0 ${
                        selectedCategory === category.key ? 'text-white' : 'text-blue-600'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="truncate">{category.label}</span>
                  </div>
                  <span 
                    className={`text-xs px-2 py-1 rounded-full flex-shrink-0 font-medium ${
                      selectedCategory === category.key
                        ? 'bg-blue-500 text-white' :'bg-slate-200 text-slate-600'
                    }`}
                    aria-label={`${category.count} templates`}
                  >
                    {category.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CategorySidebar;