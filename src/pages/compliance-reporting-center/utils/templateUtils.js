import { CATEGORY_ICONS } from '../constants/templateConstants';

export const getCategoryIcon = (category) => {
  return CATEGORY_ICONS[category] || CATEGORY_ICONS.default;
};

export const formatComponentName = (componentId) => {
  if (!componentId) return '';
  return componentId
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
};

export const normalizeTemplate = (template, userRole) => ({
  ...template,
  category: template?.category || 'custom',
  isPredefined: template?.isPredefined || false,
  author: template?.author || 'You',
  rating: template?.rating || null,
  usageCount: template?.usageCount || 0,
  accessRoles: template?.accessRoles || [userRole],
  estimatedTime: template?.estimatedTime || '5-10 minutes',
  components: template?.components || []
});

export const getTemplateCategories = (predefinedTemplates, savedReports) => {
  const predefinedCount = predefinedTemplates?.length || 0;
  const savedCount = savedReports?.length || 0;
  
  return [
    { 
      key: 'all', 
      label: 'All Templates', 
      count: predefinedCount + savedCount 
    },
    { 
      key: 'executive', 
      label: 'Executive', 
      count: predefinedTemplates?.filter(t => t?.category === 'executive')?.length || 0 
    },
    { 
      key: 'regulatory', 
      label: 'Regulatory', 
      count: predefinedTemplates?.filter(t => t?.category === 'regulatory')?.length || 0 
    },
    { 
      key: 'risk', 
      label: 'Risk Management', 
      count: predefinedTemplates?.filter(t => t?.category === 'risk')?.length || 0 
    },
    { 
      key: 'department', 
      label: 'Department', 
      count: predefinedTemplates?.filter(t => t?.category === 'department')?.length || 0 
    },
    { 
      key: 'audit', 
      label: 'Audit', 
      count: predefinedTemplates?.filter(t => t?.category === 'audit')?.length || 0 
    },
    { 
      key: 'custom', 
      label: 'Custom Templates', 
      count: savedCount 
    }
  ];
};

export const sortTemplates = (templates, sortBy) => {
  return templates?.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a?.name?.localeCompare(b?.name || '') || 0;
      case 'usage':
        return (b?.usageCount || 0) - (a?.usageCount || 0);
      case 'rating':
        return (b?.rating || 0) - (a?.rating || 0);
      default: // lastModified
        return new Date(b?.lastModified || 0).getTime() - new Date(a?.lastModified || 0).getTime();
    }
  }) || [];
};

export const filterTemplates = (templates, filters) => {
  const { userRole, selectedCategory, searchTerm } = filters;
  
  return templates?.filter(template => {
    // Role-based access filter
    if (!template?.accessRoles?.includes(userRole)) return false;
    
    // Category filter
    if (selectedCategory !== 'all' && template?.category !== selectedCategory) return false;
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = template?.name?.toLowerCase()?.includes(searchLower);
      const descriptionMatch = template?.description?.toLowerCase()?.includes(searchLower);
      if (!nameMatch && !descriptionMatch) return false;
    }
    
    return true;
  }) || [];
};

export const transformTemplateForSelection = (template) => ({
  ...template,
  dataSources: [], // Would be populated based on template requirements
  components: template?.components?.map(compId => ({
    id: compId,
    name: formatComponentName(compId),
    type: compId
  })) || []
});