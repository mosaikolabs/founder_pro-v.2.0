import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import PolicyCard from './components/PolicyCard';
import PolicyDetailModal from './components/PolicyDetailModal';
import FilterPanel from './components/FilterPanel';
import BulkOperationsBar from './components/BulkOperationsBar';
import Icon from '../../components/AppIcon';

const PolicyLibraryManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    statuses: [],
    dateRange: { start: '', end: '' }
  });
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Mock policy data
  const mockPolicies = [
    {
      id: 'POL-001',
      name: 'Information Security Policy',
      category: 'Security',
      status: 'Active',
      version: '3.2',
      lastUpdated: '2024-01-15',
      expirationDate: '2024-12-31',
      approvedBy: 'John Smith',
      department: 'IT Security',
      description: `This policy establishes the framework for protecting organizational information assets and ensuring compliance with security standards.

The policy covers data classification, access controls, incident response procedures, and employee responsibilities for maintaining information security.`,
      documentSize: '2.4 MB',
      downloadCount: 156,
      relatedPolicies: ['POL-002', 'POL-015'],
      approvalChain: [
        { name: 'Sarah Johnson', role: 'Security Manager', date: '2024-01-10', status: 'Approved' },
        { name: 'Michael Brown', role: 'Legal Counsel', date: '2024-01-12', status: 'Approved' },
        { name: 'John Smith', role: 'CISO', date: '2024-01-15', status: 'Approved' }
      ],
      versionHistory: [
        { version: '3.2', date: '2024-01-15', changes: 'Updated incident response procedures' },
        { version: '3.1', date: '2023-10-20', changes: 'Added cloud security guidelines' },
        { version: '3.0', date: '2023-07-15', changes: 'Major revision for compliance updates' }
      ]
    },
    {
      id: 'POL-002',
      name: 'Data Privacy and Protection Policy',
      category: 'Privacy',
      status: 'Active',
      version: '2.1',
      lastUpdated: '2024-01-20',
      expirationDate: '2024-11-30',
      approvedBy: 'Lisa Chen',
      department: 'Legal',
      description: `Comprehensive data privacy policy ensuring compliance with GDPR, CCPA, and other applicable privacy regulations.

Defines data handling procedures, consent management, breach notification requirements, and individual rights protection measures.`,
      documentSize: '3.1 MB',
      downloadCount: 203,
      relatedPolicies: ['POL-001', 'POL-008'],
      approvalChain: [
        { name: 'David Wilson', role: 'Privacy Officer', date: '2024-01-18', status: 'Approved' },
        { name: 'Lisa Chen', role: 'Legal Director', date: '2024-01-20', status: 'Approved' }
      ],
      versionHistory: [
        { version: '2.1', date: '2024-01-20', changes: 'Updated CCPA compliance requirements' },
        { version: '2.0', date: '2023-09-15', changes: 'GDPR alignment and consent management updates' }
      ]
    },
    {
      id: 'POL-003',
      name: 'Financial Controls and SOX Compliance',
      category: 'Financial',
      status: 'Under Review',
      version: '4.0',
      lastUpdated: '2024-01-25',
      expirationDate: '2024-06-30',
      approvedBy: 'Pending',
      department: 'Finance',
      description: `Establishes financial controls and procedures to ensure Sarbanes-Oxley Act compliance and accurate financial reporting.

Covers internal controls over financial reporting, segregation of duties, and audit requirements for public company compliance.`,
      documentSize: '4.2 MB',
      downloadCount: 89,
      relatedPolicies: ['POL-012', 'POL-018'],
      approvalChain: [
        { name: 'Robert Taylor', role: 'CFO', date: '2024-01-25', status: 'Pending' },
        { name: 'External Auditor', role: 'Compliance Review', date: '', status: 'Pending' }
      ],
      versionHistory: [
        { version: '4.0', date: '2024-01-25', changes: 'Major revision for new SOX requirements' },
        { version: '3.5', date: '2023-12-10', changes: 'Updated control testing procedures' }
      ]
    },
    {
      id: 'POL-004',
      name: 'Human Resources Code of Conduct',
      category: 'HR',
      status: 'Expired',
      version: '2.3',
      lastUpdated: '2023-08-15',
      expirationDate: '2024-01-15',
      approvedBy: 'Maria Rodriguez',
      department: 'Human Resources',
      description: `Defines expected employee behavior, ethical standards, and workplace policies to maintain a professional work environment.

Includes anti-harassment policies, conflict of interest guidelines, and disciplinary procedures for policy violations.`,
      documentSize: '1.8 MB',
      downloadCount: 312,
      relatedPolicies: ['POL-007', 'POL-011'],
      approvalChain: [
        { name: 'Maria Rodriguez', role: 'HR Director', date: '2023-08-15', status: 'Approved' }
      ],
      versionHistory: [
        { version: '2.3', date: '2023-08-15', changes: 'Updated remote work guidelines' },
        { version: '2.2', date: '2023-05-20', changes: 'Added diversity and inclusion policies' }
      ]
    },
    {
      id: 'POL-005',
      name: 'IT Asset Management Policy',
      category: 'IT',
      status: 'Draft',
      version: '1.0',
      lastUpdated: '2024-01-28',
      expirationDate: '2025-01-28',
      approvedBy: 'Pending',
      department: 'IT',
      description: `Establishes procedures for managing IT assets throughout their lifecycle, from procurement to disposal.

Covers asset tracking, maintenance schedules, security requirements, and proper disposal methods for hardware and software assets.`,
      documentSize: '2.7 MB',
      downloadCount: 45,
      relatedPolicies: ['POL-001', 'POL-009'],
      approvalChain: [
        { name: 'Tom Anderson', role: 'IT Manager', date: '', status: 'Pending' }
      ],
      versionHistory: [
        { version: '1.0', date: '2024-01-28', changes: 'Initial draft creation' }
      ]
    },
    {
      id: 'POL-006',
      name: 'Business Continuity Plan',
      category: 'Operations',
      status: 'Active',
      version: '3.1',
      lastUpdated: '2024-01-10',
      expirationDate: '2024-07-10',
      approvedBy: 'James Wilson',
      department: 'Operations',
      description: `Comprehensive business continuity plan ensuring operational resilience during disruptions and emergency situations.

Defines recovery procedures, communication protocols, and resource allocation strategies for maintaining critical business functions.`,
      documentSize: '5.3 MB',
      downloadCount: 178,
      relatedPolicies: ['POL-001', 'POL-013'],
      approvalChain: [
        { name: 'James Wilson', role: 'COO', date: '2024-01-10', status: 'Approved' }
      ],
      versionHistory: [
        { version: '3.1', date: '2024-01-10', changes: 'Updated pandemic response procedures' },
        { version: '3.0', date: '2023-11-15', changes: 'Major revision for new risk assessments' }
      ]
    }
  ];

  const categories = ['Security', 'Privacy', 'Financial', 'HR', 'IT', 'Operations', 'Legal', 'Quality'];
  const statuses = ['Active', 'Under Review', 'Draft', 'Expired', 'Archived'];

  // Filter and sort policies
  const filteredPolicies = mockPolicies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(policy.category);
    const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(policy.status);
    
    let matchesDateRange = true;
    if (filters.dateRange.start && filters.dateRange.end) {
      const policyDate = new Date(policy.lastUpdated);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      matchesDateRange = policyDate >= startDate && policyDate <= endDate;
    }

    return matchesSearch && matchesCategory && matchesStatus && matchesDateRange;
  }).sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'lastUpdated' || sortBy === 'expirationDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handlePolicySelect = (policyId) => {
    setSelectedPolicies(prev => 
      prev.includes(policyId) 
        ? prev.filter(id => id !== policyId)
        : [...prev, policyId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPolicies.length === filteredPolicies.length) {
      setSelectedPolicies([]);
    } else {
      setSelectedPolicies(filteredPolicies.map(p => p.id));
    }
  };

  const handlePolicyClick = (policy) => {
    setSelectedPolicy(policy);
    setIsModalOpen(true);
  };

  const handleExportPolicies = () => {
    console.log('Exporting policies:', selectedPolicies);
    // Export functionality would be implemented here
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'status-success';
      case 'under review':
        return 'status-warning';
      case 'draft':
        return 'text-purple-400 bg-purple-400 bg-opacity-20';
      case 'expired':
        return 'status-error';
      case 'archived':
        return 'text-text-dark-secondary bg-gray-600 bg-opacity-20';
      default:
        return 'text-text-dark-secondary bg-gray-600 bg-opacity-20';
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'a':
            e.preventDefault();
            handleSelectAll();
            break;
          case 'e':
            e.preventDefault();
            if (selectedPolicies.length > 0) {
              handleExportPolicies();
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedPolicies]);

  return (
    <div className="min-h-screen bg-gradient-dark dark-theme">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="lg:ml-sidebar">
        <div className="p-4 lg:p-6">
          <Breadcrumbs />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-text-dark-primary mb-2">
                Policy Library Management
              </h1>
              <p className="text-text-dark-secondary">
                Centralized repository for organizational policies and compliance documentation
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button className="btn-primary-dark inline-flex items-center space-x-2">
                <Icon name="Plus" size={16} />
                <span>New Policy</span>
              </button>
              <button 
                onClick={handleExportPolicies}
                disabled={selectedPolicies.length === 0}
                className="btn-secondary-dark inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Download" size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Search and View Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-dark-secondary" />
                <input
                  type="text"
                  placeholder="Search policies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="neumorphic-input w-full pl-10 pr-4 py-2"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-text-dark-secondary">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="neumorphic-input px-3 py-1 text-sm"
                >
                  <option value="name">Name</option>
                  <option value="lastUpdated">Last Updated</option>
                  <option value="expirationDate">Expiration Date</option>
                  <option value="status">Status</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="neumorphic-button p-1 text-text-dark-secondary hover:text-text-dark-primary"
                >
                  <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} size={16} />
                </button>
              </div>
              
              <div className="flex items-center neumorphic-card">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-l-lg ${viewMode === 'grid' ? 'bg-gradient-to-r from-neon-green to-neon-purple text-white' : 'text-text-dark-secondary hover:text-text-dark-primary'} nav-transition`}
                >
                  <Icon name="Grid3X3" size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-r-lg ${viewMode === 'list' ? 'bg-gradient-to-r from-neon-green to-neon-purple text-white' : 'text-text-dark-secondary hover:text-text-dark-primary'} nav-transition`}
                >
                  <Icon name="List" size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Panel */}
            <div className="lg:w-64 flex-shrink-0">
              <FilterPanel
                categories={categories}
                statuses={statuses}
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Bulk Operations Bar */}
              {selectedPolicies.length > 0 && (
                <BulkOperationsBar
                  selectedCount={selectedPolicies.length}
                  onSelectAll={handleSelectAll}
                  onClearSelection={() => setSelectedPolicies([])}
                  onExport={handleExportPolicies}
                />
              )}

              {/* Results Summary */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-text-dark-secondary">
                  Showing {filteredPolicies.length} of {mockPolicies.length} policies
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedPolicies.length === filteredPolicies.length && filteredPolicies.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-600 text-neon-green focus:ring-neon-green bg-gray-700"
                  />
                  <label className="text-sm text-text-dark-secondary">Select All</label>
                </div>
              </div>

              {/* Policy Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPolicies.map((policy) => (
                    <PolicyCard
                      key={policy.id}
                      policy={policy}
                      isSelected={selectedPolicies.includes(policy.id)}
                      onSelect={handlePolicySelect}
                      onClick={handlePolicyClick}
                      getStatusColor={getStatusColor}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredPolicies.map((policy) => (
                    <div
                      key={policy.id}
                      className="neumorphic-card p-4 hover:shadow-lg nav-transition cursor-pointer"
                      onClick={() => handlePolicyClick(policy)}
                    >
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedPolicies.includes(policy.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handlePolicySelect(policy.id);
                          }}
                          className="rounded border-gray-600 text-neon-green focus:ring-neon-green bg-gray-700"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-text-dark-primary truncate">
                              {policy.name}
                            </h3>
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                              {policy.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-text-dark-secondary">
                            <span>v{policy.version}</span>
                            <span>•</span>
                            <span>{policy.category}</span>
                            <span>•</span>
                            <span>Updated {policy.lastUpdated}</span>
                            <span>•</span>
                            <span>Expires {policy.expirationDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredPolicies.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="FileText" size={48} className="text-text-dark-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-text-dark-primary mb-2">
                    No policies found
                  </h3>
                  <p className="text-text-dark-secondary">
                    Try adjusting your search criteria or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Policy Detail Modal */}
      <PolicyDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        policy={selectedPolicy}
        getStatusColor={getStatusColor}
      />
    </div>
  );
};

export default PolicyLibraryManagement;