import React from 'react';
import Icon from '../../../components/AppIcon';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  startIndex, 
  endIndex, 
  totalCount, 
  onPageChange 
}) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    for (let i = 1; i <= totalPages; i++) {
      const showPage = i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1;
      const showEllipsis = !showPage && (i === 2 || i === totalPages - 1) && Math.abs(i - currentPage) > 2;
      
      if (showEllipsis) {
        pages.push(
          <span key={`ellipsis-${i}`} className="px-2 py-1 text-slate-500" aria-hidden="true">
            ...
          </span>
        );
        continue;
      }
      
      if (!showPage) continue;
      
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          onKeyDown={(e) => handleKeyDown(e, () => handlePageClick(i))}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 min-w-[2.5rem] ${
            currentPage === i
              ? 'bg-blue-600 text-white' :'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
          }`}
          aria-label={`Go to page ${i}`}
          aria-current={currentPage === i ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }
    
    return pages;
  };

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 bg-slate-50 rounded-lg p-4 border border-slate-200">
      <div className="flex items-center space-x-3 text-sm text-slate-600 order-2 sm:order-1">
        <span className="whitespace-nowrap">
          Showing <span className="font-medium text-slate-900">{startIndex + 1}</span> to{' '}
          <span className="font-medium text-slate-900">{Math.min(endIndex, totalCount)}</span> of{' '}
          <span className="font-medium text-slate-900">{totalCount}</span> templates
        </span>
      </div>
      
      <nav className="flex items-center space-x-2 order-1 sm:order-2" aria-label="Pagination">
        <button
          onClick={handlePrevious}
          onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
          disabled={currentPage === 1}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            currentPage === 1
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' :'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
          }`}
          aria-label="Go to previous page"
        >
          <Icon name="ChevronLeft" size={16} className="mr-1" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        <div className="flex items-center space-x-1">
          {renderPageNumbers()}
        </div>
        
        <button
          onClick={handleNext}
          onKeyDown={(e) => handleKeyDown(e, handleNext)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            currentPage === totalPages
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' :'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300'
          }`}
          aria-label="Go to next page"
        >
          <span className="hidden sm:inline">Next</span>
          <Icon name="ChevronRight" size={16} className="ml-1" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;