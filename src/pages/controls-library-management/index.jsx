import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ControlCard from './components/ControlCard';
import ControlDetailModal from './components/ControlDetailModal';
import FilterPanel from './components/FilterPanel';
import BulkOperationsBar from './components/BulkOperationsBar';
import Icon from '../../components/AppIcon';

const ControlsLibraryManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedControl, setSelectedControl] = useState(null);
  const [selectedControls, setSelectedControls] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    search: '',
    frameworks: [],
    categories: [],
    status: [],
    tags: []
  });

  // Mock data for controls library
  const controlsLibrary = [
    {
      id: 'AC-001',
      name: 'Access Control Management',
      description: 'Establish and maintain access control policies and procedures',
      framework: 'ISO 27001',
      category: 'Security',
      status: 'Active',
      version: '2.1',
      owner: 'Security Team',
      lastReviewed: '2024-01-15',
      nextReview: '2024-07-15',
      tags: ['Access', 'Security', 'Authentication'],
      riskLevel: 'High',
      implementationStatus: 'Implemented',
      effectiveness: 85,
      testingFrequency: 'Monthly',
      relatedControls: ['AC-002', 'AC-003'],
      documents: ['Policy-AC-001.pdf', 'Procedure-AC-001.pdf']
    },
    {
      id: 'AC-002',
      name: 'User Authentication',
      description: 'Implement multi-factor authentication for all system access',
      framework: 'NIST',
      category: 'Security',
      status: 'Active',
      version: '1.8',
      owner: 'IT Security',
      lastReviewed: '2024-01-10',
      nextReview: '2024-04-10',
      tags: ['Authentication', 'MFA', 'Security'],
      riskLevel: 'High',
      implementationStatus: 'Implemented',
      effectiveness: 92,
      testingFrequency: 'Quarterly',
      relatedControls: ['AC-001', 'AC-004'],
      documents: ['MFA-Policy.pdf', 'Auth-Procedure.pdf']
    },
    {
      id: 'DC-001',
      name: 'Data Classification',
      description: 'Classify and label data based on sensitivity levels',
      framework: 'GDPR',
      category: 'Data Protection',
      status: 'Active',
      version: '3.0',
      owner: 'Data Protection Office',
      lastReviewed: '2024-01-20',
      nextReview: '2024-06-20',
      tags: ['Data', 'Classification', 'Privacy'],
      riskLevel: 'Medium',
      implementationStatus: 'In Progress',
      effectiveness: 78,
      testingFrequency: 'Bi-Annual',
      relatedControls: ['DC-002', 'DC-003'],
      documents: ['Data-Classification.pdf', 'Labeling-Guide.pdf']
    },
    {
      id: 'BC-001',
      name: 'Business Continuity Planning',
      description: 'Develop and maintain business continuity and disaster recovery plans',
      framework: 'ISO 22301',
      category: 'Operations',
      status: 'Active',
      version: '2.5',
      owner: 'Business Continuity Team',
      lastReviewed: '2024-01-05',
      nextReview: '2024-12-05',
      tags: ['Continuity', 'Disaster Recovery', 'Planning'],
      riskLevel: 'Critical',
      implementationStatus: 'Implemented',
      effectiveness: 88,
      testingFrequency: 'Annual',
      relatedControls: ['BC-002', 'BC-003'],
      documents: ['BCP-Plan.pdf', 'DR-Procedures.pdf']
    },
    {
      id: 'RM-001',
      name: 'Risk Assessment',
      description: 'Conduct regular risk assessments and maintain risk register',
      framework: 'COSO',
      category: 'Risk Management',
      status: 'Active',
      version: '1.9',
      owner: 'Risk Management Team',
      lastReviewed: '2024-01-12',
      nextReview: '2024-07-12',
      tags: ['Risk', 'Assessment', 'Management'],
      riskLevel: 'High',
      implementationStatus: 'Implemented',
      effectiveness: 82,
      testingFrequency: 'Quarterly',
      relatedControls: ['RM-002', 'RM-003'],
      documents: ['Risk-Assessment.pdf', 'Risk-Register.xlsx']
    },
    {
      id: 'CM-001',
      name: 'Change Management',
      description: 'Implement formal change management processes',
      framework: 'ITIL',
      category: 'Process Management',
      status: 'Active',
      version: '2.2',
      owner: 'Change Advisory Board',
      lastReviewed: '2024-01-08',
      nextReview: '2024-04-08',
      tags: ['Change', 'Process', 'Management'],
      riskLevel: 'Medium',
      implementationStatus: 'Implemented',
      effectiveness: 90,
      testingFrequency: 'Monthly',
      relatedControls: ['CM-002', 'CM-003'],
      documents: ['Change-Process.pdf', 'Change-Form.pdf']
    }
  ];

  // Filter controls based on current filters
  const filteredControls = controlsLibrary.filter(control => {
    const matchesSearch = control.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         control.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                         control.id.toLowerCase().includes(filters.search.toLowerCase());
    const matchesFramework = filters.frameworks.length === 0 || filters.frameworks.includes(control.framework);
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(control.category);
    const matchesStatus = filters.status.length === 0 || filters.status.includes(control.status);
    const matchesTags = filters.tags.length === 0 || filters.tags.some(tag => control.tags.includes(tag));
    
    return matchesSearch && matchesFramework && matchesCategory && matchesStatus && matchesTags;
  });

  const handleControlSelect = (controlId, isSelected) => {
    if (isSelected) {
      setSelectedControls(prev => [...prev, controlId]);
    } else {
      setSelectedControls(prev => prev.filter(id => id !== controlId));
    }
  };

  const handleBulkOperation = (operation) => {
    console.log(`Performing ${operation} on ${selectedControls.length} controls`);
    // Implement bulk operations logic here
    setSelectedControls([]);
  };

  const handleControlClick = (control) => {
    setSelectedControl(control);
    setIsDetailModalOpen(true);
  };

  const handleExport = () => {
    console.log('Exporting controls library to Excel');
    // Implement export functionality
  };

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Critical':
        return 'bg-error-dark bg-opacity-20 text-error-dark border-error-dark';
      case 'High':
        return 'bg-warning-dark bg-opacity-20 text-warning-dark border-warning-dark';
      case 'Medium':
        return 'bg-info-dark bg-opacity-20 text-info-dark border-info-dark';
      default:
        return 'bg-success-dark bg-opacity-20 text-success-dark border-success-dark';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success-dark bg-opacity-20 text-success-dark border-success-dark';
      case 'Inactive':
        return 'bg-text-dark-muted bg-opacity-20 text-text-dark-muted border-text-dark-muted';
      case 'Draft':
        return 'bg-warning-dark bg-opacity-20 text-warning-dark border-warning-dark';
      default:
        return 'bg-info-dark bg-opacity-20 text-info-dark border-info-dark';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark dark-theme">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="lg:ml-sidebar">
        <div className="h-full flex flex-col">
          {/* Header Section - Fixed Height */}
          <div className="flex-shrink-0 p-4 lg:p-6 border-b border-white border-opacity-10">
            <Breadcrumbs />
            
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl lg:text-3xl font-semibold text-text-dark-primary mb-2 truncate">
                  Controls Library Management
                </h1>
                <p className="text-text-dark-secondary">
                  Manage your compliance controls library and documentation
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0 flex-shrink-0">
                <div className="flex items-center space-x-2 p-1 neumorphic-card">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'grid' ?'bg-gradient-to-r from-neon-green to-neon-purple text-white' :'text-text-dark-secondary hover:text-text-dark-primary'
                    }`}
                  >
                    <Icon name="Grid" size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'list' ?'bg-gradient-to-r from-neon-green to-neon-purple text-white' :'text-text-dark-secondary hover:text-text-dark-primary'
                    }`}
                  >
                    <Icon name="List" size={18} />
                  </button>
                </div>
                
                <button
                  onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
                  className={`
                    px-4 py-2 rounded-xl font-medium nav-transition inline-flex items-center space-x-2 neumorphic-button
                    ${isFilterPanelOpen 
                      ? 'bg-gradient-to-r from-neon-green to-neon-purple text-white shadow-glow-neon' 
                      : 'text-text-dark-secondary hover:text-text-dark-primary'
                    }
                  `}
                >
                  <Icon name="Filter" size={18} />
                  <span>Filters</span>
                </button>
                
                <button
                  onClick={handleExport}
                  className="btn-secondary-dark inline-flex items-center space-x-2 whitespace-nowrap"
                >
                  <Icon name="Download" size={18} />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="neumorphic-card p-4 text-center">
                <div className="text-2xl font-bold text-neon-green mb-1">
                  {filteredControls.length}
                </div>
                <div className="text-xs text-text-dark-secondary uppercase tracking-wider">
                  Total Controls
                </div>
              </div>
              <div className="neumorphic-card p-4 text-center">
                <div className="text-2xl font-bold text-success-dark mb-1">
                  {filteredControls.filter(c => c.status === 'Active').length}
                </div>
                <div className="text-xs text-text-dark-secondary uppercase tracking-wider">
                  Active
                </div>
              </div>
              <div className="neumorphic-card p-4 text-center">
                <div className="text-2xl font-bold text-warning-dark mb-1">
                  {filteredControls.filter(c => c.implementationStatus === 'In Progress').length}
                </div>
                <div className="text-xs text-text-dark-secondary uppercase tracking-wider">
                  In Progress
                </div>
              </div>
              <div className="neumorphic-card p-4 text-center">
                <div className="text-2xl font-bold text-info-dark mb-1">
                  {Math.round(filteredControls.reduce((sum, c) => sum + c.effectiveness, 0) / filteredControls.length)}%
                </div>
                <div className="text-xs text-text-dark-secondary uppercase tracking-wider">
                  Avg Effectiveness
                </div>
              </div>
            </div>

            {/* Bulk Operations Bar */}
            {selectedControls.length > 0 && (
              <BulkOperationsBar
                selectedCount={selectedControls.length}
                onBulkOperation={handleBulkOperation}
                onClearSelection={() => setSelectedControls([])}
              />
            )}
          </div>

          {/* Main Content Area - Flexible Height */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            {/* Filter Panel */}
            <div className={`
              transition-all duration-300 ease-in-out flex-shrink-0
              ${isFilterPanelOpen ? 'w-80' : 'w-0'}
              overflow-hidden
            `}>
              <FilterPanel
                isOpen={isFilterPanelOpen}
                filters={filters}
                onFiltersChange={setFilters}
                controlsLibrary={controlsLibrary}
              />
            </div>

            {/* Controls Grid/List */}
            <div className="flex-1 min-w-0 p-4 lg:p-6">
              <div className="h-full overflow-y-auto scrollbar-dark">
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {filteredControls.map(control => (
                      <ControlCard
                        key={control.id}
                        control={control}
                        isSelected={selectedControls.includes(control.id)}
                        onSelect={handleControlSelect}
                        onClick={() => handleControlClick(control)}
                        getRiskLevelColor={getRiskLevelColor}
                        getStatusColor={getStatusColor}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredControls.map(control => (
                      <ControlCard
                        key={control.id}
                        control={control}
                        isSelected={selectedControls.includes(control.id)}
                        onSelect={handleControlSelect}
                        onClick={() => handleControlClick(control)}
                        getRiskLevelColor={getRiskLevelColor}
                        getStatusColor={getStatusColor}
                        viewMode="list"
                      />
                    ))}
                  </div>
                )}
                
                {/* Empty State */}
                {filteredControls.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <Icon name="Search" size={48} className="text-text-dark-muted mb-4" />
                    <h3 className="text-lg font-medium text-text-dark-primary mb-2">
                      No controls found
                    </h3>
                    <p className="text-text-dark-secondary text-center max-w-md">
                      Try adjusting your filters to see more results
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Control Detail Modal */}
      <ControlDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        control={selectedControl}
        getRiskLevelColor={getRiskLevelColor}
        getStatusColor={getStatusColor}
      />
    </div>
  );
};

export default ControlsLibraryManagement;