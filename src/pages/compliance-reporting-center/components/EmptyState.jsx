import React from 'react';
import Icon from '../../../components/AppIcon';

const EmptyState = ({ searchTerm, selectedCategory, onClearFilters }) => {
  const hasFilters = searchTerm || selectedCategory !== 'all';

  return (
    <div className="text-center py-16 bg-slate-50 rounded-lg border border-slate-200">
      <div className="max-w-md mx-auto">
        <Icon name="FileText" size={48} className="text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          No templates found
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          {hasFilters 
            ? "Try adjusting your search criteria or category filter to find the templates you're looking for"
            : "There are no templates available at the moment"
          }
        </p>
        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;