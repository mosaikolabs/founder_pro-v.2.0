// src/pages/compliance-reporting-center/components/TemplateLibrary.jsx
import React, { useCallback } from 'react';
import { useTemplateLibrary } from '../hooks/useTemplateLibrary';
import { transformTemplateForSelection } from '../utils/templateUtils';
import CategorySidebar from './CategorySidebar';
import SearchAndSort from './SearchAndSort';
import TemplateCard from './TemplateCard';
import Pagination from './Pagination';
import EmptyState from './EmptyState';

const TemplateLibrary = ({ 
  savedReports = [], 
  userRole = 'Compliance Officer', 
  onTemplateSelect,
  onTemplatePreview 
}) => {
  const {
    searchTerm,
    selectedCategory,
    sortBy,
    currentPage,
    categories,
    currentTemplates,
    totalPages,
    startIndex,
    endIndex,
    totalCount,
    handleSearch,
    handleCategoryChange,
    handleSortChange,
    handlePageChange
  } = useTemplateLibrary(savedReports, userRole);

  const handleTemplateUse = useCallback((template) => {
    if (onTemplateSelect) {
      const transformedTemplate = transformTemplateForSelection(template);
      onTemplateSelect(transformedTemplate);
    }
  }, [onTemplateSelect]);

  const handleTemplatePreview = useCallback((template) => {
    if (onTemplatePreview) {
      onTemplatePreview(template);
    }
  }, [onTemplatePreview]);

  const handleClearFilters = useCallback(() => {
    handleSearch('');
    handleCategoryChange('all');
  }, [handleSearch, handleCategoryChange]);

  return (
    <div className="bg-white rounded-lg shadow-card border border-slate-200">
      <div className="p-6">
        {/* Header */}
        <header className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="flex-1 min-w-0 pr-4">
            <h1 className="text-2xl font-semibold text-slate-900 mb-2">
              Templates
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Choose from pre-configured templates or your saved custom reports to quickly generate comprehensive compliance reports
            </p>
          </div>
          
          <SearchAndSort
            searchTerm={searchTerm}
            sortBy={sortBy}
            onSearchChange={handleSearch}
            onSortChange={handleSortChange}
          />
        </header>

        {/* Main Content */}
        <div className="flex flex-col xl:flex-row gap-8">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <main className="flex-1 min-w-0">
            {currentTemplates?.length === 0 ? (
              <EmptyState
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                onClearFilters={handleClearFilters}
              />
            ) : (
              <>
                <div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
                  role="grid"
                  aria-label="Template library"
                >
                  {currentTemplates?.map(template => (
                    <TemplateCard
                      key={template?.id}
                      template={template}
                      onUse={handleTemplateUse}
                      onPreview={handleTemplatePreview}
                    />
                  ))}
                </div>
                
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  totalCount={totalCount}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TemplateLibrary;