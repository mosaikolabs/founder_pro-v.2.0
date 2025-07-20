import { useState, useMemo, useCallback } from 'react';
import { PREDEFINED_TEMPLATES, ITEMS_PER_PAGE } from '../constants/templateConstants';
import { 
  normalizeTemplate, 
  getTemplateCategories, 
  filterTemplates, 
  sortTemplates 
} from '../utils/templateUtils';

export const useTemplateLibrary = (savedReports = [], userRole = 'Compliance Officer') => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('lastModified');
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize normalized templates
  const allTemplates = useMemo(() => {
    const combined = [...PREDEFINED_TEMPLATES, ...(savedReports || [])];
    return combined.map(template => normalizeTemplate(template, userRole));
  }, [savedReports, userRole]);

  // Memoize categories
  const categories = useMemo(() => {
    return getTemplateCategories(PREDEFINED_TEMPLATES, savedReports);
  }, [savedReports]);

  // Memoize filtered and sorted templates
  const filteredTemplates = useMemo(() => {
    const filtered = filterTemplates(allTemplates, {
      userRole,
      selectedCategory,
      searchTerm
    });
    return sortTemplates(filtered, sortBy);
  }, [allTemplates, userRole, selectedCategory, searchTerm, sortBy]);

  // Memoize pagination data
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredTemplates.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentTemplates = filteredTemplates.slice(startIndex, endIndex);

    return {
      totalPages,
      startIndex,
      endIndex,
      currentTemplates,
      totalCount: filteredTemplates.length
    };
  }, [filteredTemplates, currentPage]);

  // Memoized handlers
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return {
    // State
    searchTerm,
    selectedCategory,
    sortBy,
    currentPage,
    
    // Computed values
    categories,
    filteredTemplates,
    ...paginationData,
    
    // Handlers
    handleSearch,
    handleCategoryChange,
    handleSortChange,
    handlePageChange
  };
};