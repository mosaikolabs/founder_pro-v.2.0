export const PREDEFINED_TEMPLATES = [
  {
    id: 'executive-dashboard',
    name: 'Executive Compliance Dashboard',
    description: 'High-level overview for C-level executives with key metrics and trends',
    category: 'executive',
    author: 'System',
    lastModified: '2024-01-20',
    usageCount: 45,
    rating: 4.8,
    isPredefined: true,
    accessRoles: ['C-level Executive', 'Compliance Officer'],
    components: ['executive-summary', 'kpi-overview', 'trend-analysis', 'risk-heatmap'],
    previewImage: 'executive-dashboard.png',
    estimatedTime: '5 minutes'
  },
  {
    id: 'sox-compliance-report',
    name: 'SOX Compliance Report',
    description: 'Comprehensive SOX compliance status with control testing results',
    category: 'regulatory',
    author: 'System',
    lastModified: '2024-01-18',
    usageCount: 32,
    rating: 4.6,
    isPredefined: true,
    accessRoles: ['Compliance Officer', 'Risk Management Team'],
    components: ['regulatory-mapping', 'control-status', 'audit-findings', 'executive-summary'],
    previewImage: 'sox-report.png',
    estimatedTime: '15 minutes'
  },
  {
    id: 'risk-assessment-summary',
    name: 'Risk Assessment Summary',
    description: 'Departmental risk analysis with mitigation strategies',
    category: 'risk',
    author: 'System',
    lastModified: '2024-01-15',
    usageCount: 28,
    rating: 4.5,
    isPredefined: true,
    accessRoles: ['Risk Management Team', 'Department Head', 'Compliance Officer'],
    components: ['risk-heatmap', 'trend-analysis', 'kpi-overview'],
    previewImage: 'risk-assessment.png',
    estimatedTime: '10 minutes'
  },
  {
    id: 'department-compliance',
    name: 'Department Compliance Report',
    description: 'Detailed compliance status for specific departments',
    category: 'department',
    author: 'System',
    lastModified: '2024-01-12',
    usageCount: 67,
    rating: 4.7,
    isPredefined: true,
    accessRoles: ['Department Head', 'Compliance Officer'],
    components: ['control-status', 'policy-compliance', 'audit-findings'],
    previewImage: 'department-report.png',
    estimatedTime: '8 minutes'
  },
  {
    id: 'audit-readiness',
    name: 'Audit Readiness Report',
    description: 'Pre-audit checklist and compliance verification',
    category: 'audit',
    author: 'System',
    lastModified: '2024-01-10',
    usageCount: 23,
    rating: 4.4,
    isPredefined: true,
    accessRoles: ['Compliance Officer', 'Risk Management Team'],
    components: ['control-status', 'audit-findings', 'policy-compliance', 'regulatory-mapping'],
    previewImage: 'audit-readiness.png',
    estimatedTime: '12 minutes'
  },
  {
    id: 'quarterly-performance',
    name: 'Quarterly Performance Review',
    description: 'Quarterly compliance metrics and performance indicators',
    category: 'executive',
    author: 'System',
    lastModified: '2024-01-08',
    usageCount: 34,
    rating: 4.3,
    isPredefined: true,
    accessRoles: ['C-level Executive', 'Compliance Officer'],
    components: ['kpi-overview', 'trend-analysis', 'executive-summary'],
    previewImage: 'quarterly-performance.png',
    estimatedTime: '7 minutes'
  },
  {
    id: 'regulatory-framework',
    name: 'Regulatory Framework Analysis',
    description: 'Comprehensive analysis of regulatory requirements and compliance mapping',
    category: 'regulatory',
    author: 'System',
    lastModified: '2024-01-05',
    usageCount: 19,
    rating: 4.6,
    isPredefined: true,
    accessRoles: ['Compliance Officer', 'Risk Management Team'],
    components: ['regulatory-mapping', 'control-status', 'policy-compliance'],
    previewImage: 'regulatory-framework.png',
    estimatedTime: '18 minutes'
  },
  {
    id: 'control-effectiveness',
    name: 'Control Effectiveness Review',
    description: 'Assessment of control design and operating effectiveness',
    category: 'audit',
    author: 'System',
    lastModified: '2024-01-03',
    usageCount: 41,
    rating: 4.5,
    isPredefined: true,
    accessRoles: ['Compliance Officer', 'Risk Management Team'],
    components: ['control-status', 'audit-findings', 'trend-analysis'],
    previewImage: 'control-effectiveness.png',
    estimatedTime: '14 minutes'
  }
];

export const CATEGORY_ICONS = {
  executive: 'Crown',
  regulatory: 'Shield',
  risk: 'AlertTriangle',
  department: 'Building',
  audit: 'Search',
  custom: 'User',
  default: 'FileText'
};

export const SORT_OPTIONS = [
  { value: 'lastModified', label: 'Recently Modified' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'usage', label: 'Most Used' },
  { value: 'rating', label: 'Highest Rated' }
];

export const ITEMS_PER_PAGE = 12;