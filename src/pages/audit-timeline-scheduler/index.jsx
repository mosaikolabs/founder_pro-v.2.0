import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';

import Icon from '../../components/AppIcon';
import TimelineView from './components/TimelineView';
import FilterPanel from './components/FilterPanel';
import BulkActionsPanel from './components/BulkActionsPanel';
import AuditDetailsModal from './components/AuditDetailsModal';

const AuditTimelineScheduler = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedAudits, setSelectedAudits] = useState([]);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    departments: [],
    types: [],
    statuses: []
  });
  const [viewMode, setViewMode] = useState('timeline'); // timeline, calendar, list
  const [viewType, setViewType] = useState('department'); // department, audit-type, framework
  const [timeRange, setTimeRange] = useState('12-months'); // 6-months, 12-months, 18-months, 24-months

  // Comprehensive audit data spanning Jul 2025 to Apr 2026
  const auditData = [
    {
      id: 'AUD-001',
      title: 'SOX Financial Controls Audit',
      department: 'Finance',
      auditType: 'Financial',
      framework: 'SOX',
      startDate: '2025-07-15',
      endDate: '2025-08-30',
      status: 'Completed',
      priority: 'High',
      assignedTeam: ['John Smith', 'Sarah Johnson'],
      preparationStatus: 100,
      dependencies: [],
      description: 'Comprehensive audit of financial controls and processes to ensure SOX compliance.',
      milestones: [
        { name: 'Planning Complete', date: '2025-07-10', status: 'Completed' },
        { name: 'Fieldwork Complete', date: '2025-08-15', status: 'Completed' },
        { name: 'Report Finalized', date: '2025-08-28', status: 'Completed' }
      ]
    },
    {
      id: 'AUD-002',
      title: 'IT Security Assessment',
      department: 'IT',
      auditType: 'Security',
      framework: 'ISO 27001',
      startDate: '2025-08-01',
      endDate: '2025-09-15',
      status: 'In Progress',
      priority: 'High',
      assignedTeam: ['Mike Chen', 'Lisa Wang'],
      preparationStatus: 75,
      dependencies: [],
      description: 'Security audit focusing on access controls, data protection, and cybersecurity measures.',
      milestones: [
        { name: 'Planning Complete', date: '2025-07-25', status: 'Completed' },
        { name: 'Security Testing', date: '2025-08-15', status: 'In Progress' },
        { name: 'Final Report', date: '2025-09-10', status: 'Pending' }
      ]
    },
    {
      id: 'AUD-003',
      title: 'GDPR Compliance Review',
      department: 'Legal',
      auditType: 'Privacy',
      framework: 'GDPR',
      startDate: '2025-09-01',
      endDate: '2025-10-15',
      status: 'Scheduled',
      priority: 'Medium',
      assignedTeam: ['Emma Davis', 'Robert Brown'],
      preparationStatus: 30,
      dependencies: [],
      description: 'Review of data protection practices and GDPR compliance measures.',
      milestones: [
        { name: 'Data Mapping', date: '2025-08-25', status: 'In Progress' },
        { name: 'Policy Review', date: '2025-09-15', status: 'Pending' },
        { name: 'Final Assessment', date: '2025-10-10', status: 'Pending' }
      ]
    },
    {
      id: 'AUD-004',
      title: 'Operational Risk Assessment',
      department: 'Operations',
      auditType: 'Operational',
      framework: 'COSO',
      startDate: '2025-10-01',
      endDate: '2025-11-30',
      status: 'Scheduled',
      priority: 'Medium',
      assignedTeam: ['David Wilson', 'Jennifer Lee'],
      preparationStatus: 15,
      dependencies: ['AUD-001'],
      description: 'Comprehensive review of operational processes and risk management frameworks.',
      milestones: [
        { name: 'Risk Assessment', date: '2025-09-25', status: 'Pending' },
        { name: 'Process Review', date: '2025-10-20', status: 'Pending' },
        { name: 'Final Report', date: '2025-11-25', status: 'Pending' }
      ]
    },
    {
      id: 'AUD-005',
      title: 'HR Compliance Audit',
      department: 'Human Resources',
      auditType: 'Compliance',
      framework: 'Employment Law',
      startDate: '2025-11-01',
      endDate: '2025-12-15',
      status: 'Scheduled',
      priority: 'Low',
      assignedTeam: ['Amanda Taylor', 'Kevin Martinez'],
      preparationStatus: 10,
      dependencies: [],
      description: 'Review of HR policies, procedures, and compliance with employment regulations.',
      milestones: [
        { name: 'Policy Review', date: '2025-10-25', status: 'Pending' },
        { name: 'Records Audit', date: '2025-11-20', status: 'Pending' },
        { name: 'Compliance Report', date: '2025-12-10', status: 'Pending' }
      ]
    },
    {
      id: 'AUD-006',
      title: 'Environmental Compliance',
      department: 'Facilities',
      auditType: 'Environmental',
      framework: 'EPA',
      startDate: '2025-12-01',
      endDate: '2026-01-15',
      status: 'Scheduled',
      priority: 'Medium',
      assignedTeam: ['Rachel Green', 'Tom Anderson'],
      preparationStatus: 5,
      dependencies: [],
      description: 'Environmental compliance audit covering waste management and emissions monitoring.',
      milestones: [
        { name: 'Site Inspection', date: '2025-12-10', status: 'Pending' },
        { name: 'Documentation Review', date: '2025-12-25', status: 'Pending' },
        { name: 'Final Assessment', date: '2026-01-10', status: 'Pending' }
      ]
    },
    {
      id: 'AUD-007',
      title: 'Vendor Management Review',
      department: 'Procurement',
      auditType: 'Operational',
      framework: 'COSO',
      startDate: '2026-01-15',
      endDate: '2026-02-28',
      status: 'Scheduled',
      priority: 'High',
      assignedTeam: ['Steven Clark', 'Maria Rodriguez'],
      preparationStatus: 8,
      dependencies: ['AUD-004'],
      description: 'Review of vendor selection processes, contract management, and performance monitoring.',
      milestones: [
        { name: 'Vendor Assessment', date: '2026-01-10', status: 'Pending' },
        { name: 'Contract Review', date: '2026-02-05', status: 'Pending' },
        { name: 'Final Report', date: '2026-02-25', status: 'Pending' }
      ]
    },
    {
      id: 'AUD-008',
      title: 'Financial Reporting Controls',
      department: 'Finance',
      auditType: 'Financial',
      framework: 'SOX',
      startDate: '2026-02-01',
      endDate: '2026-03-15',
      status: 'Scheduled',
      priority: 'High',
      assignedTeam: ['John Smith', 'Patricia Adams'],
      preparationStatus: 12,
      dependencies: [],
      description: 'Quarterly review of financial reporting controls and quarterly close processes.',
      milestones: [
        { name: 'Control Testing', date: '2026-02-10', status: 'Pending' },
        { name: 'Documentation Review', date: '2026-02-25', status: 'Pending' },
        { name: 'Final Assessment', date: '2026-03-10', status: 'Pending' }
      ]
    },
    {
      id: 'AUD-009',
      title: 'Customer Data Protection Audit',
      department: 'IT',
      auditType: 'Security',
      framework: 'ISO 27001',
      startDate: '2026-03-01',
      endDate: '2026-04-15',
      status: 'Scheduled',
      priority: 'High',
      assignedTeam: ['Mike Chen', 'Alexander Kumar'],
      preparationStatus: 5,
      dependencies: ['AUD-002'],
      description: 'Comprehensive review of customer data protection measures and security controls.',
      milestones: [
        { name: 'Data Flow Analysis', date: '2026-02-25', status: 'Pending' },
        { name: 'Security Testing', date: '2026-03-20', status: 'Pending' },
        { name: 'Final Report', date: '2026-04-10', status: 'Pending' }
      ]
    },
    {
      id: 'AUD-010',
      title: 'Business Continuity Planning',
      department: 'Operations',
      auditType: 'Operational',
      framework: 'COSO',
      startDate: '2026-04-01',
      endDate: '2026-04-30',
      status: 'Scheduled',
      priority: 'Medium',
      assignedTeam: ['David Wilson', 'Christine Lee'],
      preparationStatus: 3,
      dependencies: ['AUD-007'],
      description: 'Review of business continuity plans and disaster recovery procedures.',
      milestones: [
        { name: 'Plan Review', date: '2026-03-25', status: 'Pending' },
        { name: 'Testing Procedures', date: '2026-04-15', status: 'Pending' },
        { name: 'Final Assessment', date: '2026-04-28', status: 'Pending' }
      ]
    },
    {
      id: 'AUD-011',
      title: 'Quality Management System',
      department: 'Quality Assurance',
      auditType: 'Quality',
      framework: 'ISO 9001',
      startDate: '2025-09-15',
      endDate: '2025-10-30',
      status: 'In Progress',
      priority: 'Medium',
      assignedTeam: ['Nancy Thompson', 'George Miller'],
      preparationStatus: 60,
      dependencies: [],
      description: 'Audit of quality management systems and process improvement initiatives.',
      milestones: [
        { name: 'Process Mapping', date: '2025-09-10', status: 'Completed' },
        { name: 'Quality Testing', date: '2025-10-01', status: 'In Progress' },
        { name: 'Final Report', date: '2025-10-25', status: 'Pending' }
      ]
    },
    {
      id: 'AUD-012',
      title: 'Treasury Operations Audit',
      department: 'Finance',
      auditType: 'Financial',
      framework: 'COSO',
      startDate: '2025-12-15',
      endDate: '2026-01-31',
      status: 'Scheduled',
      priority: 'High',
      assignedTeam: ['Sarah Johnson', 'Michael Foster'],
      preparationStatus: 20,
      dependencies: ['AUD-005'],
      description: 'Review of treasury operations, cash management, and investment controls.',
      milestones: [
        { name: 'Cash Flow Analysis', date: '2025-12-10', status: 'Pending' },
        { name: 'Investment Review', date: '2026-01-10', status: 'Pending' },
        { name: 'Final Report', date: '2026-01-28', status: 'Pending' }
      ]
    }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAuditSelect = (audit) => {
    setSelectedAudit(audit);
    setIsModalOpen(true);
  };

  const handleBulkSelect = (auditIds) => {
    setSelectedAudits(auditIds);
  };

  const handleExportSchedule = () => {
    console.log('Exporting audit schedule...');
    // Implementation for PDF export
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-success bg-success-50';
      case 'in progress':
        return 'text-warning bg-warning-50';
      case 'scheduled':
        return 'text-accent bg-accent-50';
      case 'overdue':
        return 'text-error bg-error-50';
      default:
        return 'text-text-secondary bg-secondary-50';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-error bg-error-50';
      case 'medium':
        return 'text-warning bg-warning-50';
      case 'low':
        return 'text-success bg-success-50';
      default:
        return 'text-text-secondary bg-secondary-50';
    }
  };

  // Filter audits based on current filters
  const filteredAudits = auditData.filter(audit => {
    if (filters.departments.length > 0 && !filters.departments.includes(audit.department)) return false;
    if (filters.types.length > 0 && !filters.types.includes(audit.auditType)) return false;
    if (filters.statuses.length > 0 && !filters.statuses.includes(audit.status)) return false;
    return true;
  });

  // Get unique values for filter options
  const filterOptions = {
    departments: [...new Set(auditData.map(audit => audit.department))],
    auditTypes: [...new Set(auditData.map(audit => audit.auditType))],
    status: [...new Set(auditData.map(audit => audit.status))],
    priority: [...new Set(auditData.map(audit => audit.priority))]
  };

  return (
    <div className="min-h-screen bg-gradient-dark dark-theme">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="lg:ml-sidebar">
        <div className="p-3 sm:p-4 lg:p-6 max-w-full">
          <Breadcrumbs />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 lg:mb-6">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-text-dark-primary mb-2">
                Audit Timeline Scheduler
              </h1>
              <p className="text-sm sm:text-base text-text-dark-secondary">
                Schedule, track, and manage audit activities across departments
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button className="btn-primary-dark inline-flex items-center justify-center space-x-2 px-3 py-2 text-sm">
                <Icon name="Plus" size={16} />
                <span>Schedule Audit</span>
              </button>
              <button className="btn-secondary-dark inline-flex items-center justify-center space-x-2 px-3 py-2 text-sm">
                <Icon name="Download" size={16} />
                <span>Export Schedule</span>
              </button>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-text-dark-secondary">View:</span>
              <div className="flex items-center neumorphic-card p-1 rounded-neumorphic">
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-l-lg transition-all duration-200 ${
                    viewMode === 'timeline' ?'bg-gradient-neon text-white shadow-neumorphic-inset' :'text-text-dark-secondary hover:text-text-dark-primary hover:bg-gradient-elevated'
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ${
                    viewMode === 'calendar' ?'bg-gradient-neon text-white shadow-neumorphic-inset' :'text-text-dark-secondary hover:text-text-dark-primary hover:bg-gradient-elevated'
                  }`}
                >
                  Calendar
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-r-lg transition-all duration-200 ${
                    viewMode === 'list' ?'bg-gradient-neon text-white shadow-neumorphic-inset' :'text-text-dark-secondary hover:text-text-dark-primary hover:bg-gradient-elevated'
                  }`}
                >
                  List
                </button>
              </div>
            </div>

            {/* Group By and Time Range Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-text-dark-secondary">Group:</span>
                <select
                  value={viewType}
                  onChange={(e) => setViewType(e.target.value)}
                  className="neumorphic-input px-3 py-2 text-sm text-text-dark-primary focus:outline-none focus:border-neon-green focus:shadow-glow-neon transition-all duration-200"
                >
                  <option value="department">Department</option>
                  <option value="audit-type">Audit Type</option>
                  <option value="framework">Framework</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-text-dark-secondary">Range:</span>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="neumorphic-input px-3 py-2 text-sm text-text-dark-primary focus:outline-none focus:border-neon-green focus:shadow-glow-neon transition-all duration-200"
                >
                  <option value="6-months">6 Months</option>
                  <option value="12-months">12 Months</option>
                  <option value="18-months">18 Months</option>
                  <option value="24-months">24 Months</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row gap-4 lg:gap-6 max-w-full">
            {/* Filter Panel */}
            <div className="xl:w-72 xl:flex-shrink-0">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                filterOptions={filterOptions}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Bulk Actions Panel */}
              {selectedAudits.length > 0 && (
                <BulkActionsPanel
                  selectedCount={selectedAudits.length}
                  onClearSelection={() => setSelectedAudits([])}
                />
              )}

              {/* Timeline View */}
              <div className="neumorphic-card overflow-hidden">
                <TimelineView
                  audits={filteredAudits}
                  viewMode={viewMode}
                  viewType={viewType}
                  timeRange={timeRange}
                  filters={filters}
                  selectedAudits={selectedAudits}
                  onAuditSelect={handleAuditSelect}
                  onBulkSelect={handleBulkSelect}
                  getStatusColor={getStatusColor}
                  getPriorityColor={getPriorityColor}
                  onAuditClick={handleAuditSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Audit Details Modal */}
      <AuditDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        audit={selectedAudit}
      />
    </div>
  );
};

export default AuditTimelineScheduler;