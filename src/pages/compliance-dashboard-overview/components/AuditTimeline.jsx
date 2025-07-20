import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AuditTimeline = () => {
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'calendar'
  const [filterType, setFilterType] = useState('all');

  // Mock audit data
  const audits = [
    {
      id: 'AUD-001',
      title: 'SOX Compliance Audit',
      type: 'Internal',
      department: 'Finance',
      auditor: 'Internal Audit Team',
      status: 'In Progress',
      priority: 'High',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      progress: 65,
      findings: 3,
      description: 'Annual SOX compliance audit focusing on financial controls and reporting processes.',
      scope: ['Financial Controls', 'IT General Controls', 'Entity Level Controls'],
      stakeholders: ['CFO', 'Finance Team', 'IT Security']
    },
    {
      id: 'AUD-002',
      title: 'Information Security Assessment',
      type: 'External',
      department: 'IT Security',
      auditor: 'CyberSec Partners',
      status: 'Scheduled',
      priority: 'High',
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      progress: 0,
      findings: 0,
      description: 'Comprehensive security audit covering network security, access controls, and data protection.',
      scope: ['Network Security', 'Access Management', 'Data Protection'],
      stakeholders: ['CISO', 'IT Team', 'Security Team']
    },
    {
      id: 'AUD-003',
      title: 'HR Policy Compliance Review',
      type: 'Internal',
      department: 'HR',
      auditor: 'Compliance Team',
      status: 'Completed',
      priority: 'Medium',
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      progress: 100,
      findings: 2,
      description: 'Review of HR policies and procedures for compliance with employment regulations.',
      scope: ['Employment Policies', 'Training Records', 'Performance Management'],
      stakeholders: ['CHRO', 'HR Team', 'Legal Team']
    },
    {
      id: 'AUD-004',
      title: 'Vendor Risk Assessment',
      type: 'Internal',
      department: 'Procurement',
      auditor: 'Risk Management Team',
      status: 'Scheduled',
      priority: 'Medium',
      startDate: '2024-02-15',
      endDate: '2024-03-15',
      progress: 0,
      findings: 0,
      description: 'Assessment of vendor management processes and third-party risk controls.',
      scope: ['Vendor Onboarding', 'Contract Management', 'Risk Assessment'],
      stakeholders: ['COO', 'Procurement Team', 'Legal Team']
    },
    {
      id: 'AUD-005',
      title: 'Data Privacy Compliance Audit',
      type: 'External',
      department: 'Legal',
      auditor: 'Privacy Consultants Inc',
      status: 'Planning',
      priority: 'High',
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      progress: 15,
      findings: 0,
      description: 'GDPR and CCPA compliance audit focusing on data handling and privacy controls.',
      scope: ['Data Processing', 'Consent Management', 'Data Subject Rights'],
      stakeholders: ['Chief Legal Officer', 'IT Team', 'Marketing Team']
    },
    {
      id: 'AUD-006',
      title: 'Business Continuity Testing',
      type: 'Internal',
      department: 'Operations',
      auditor: 'Business Continuity Team',
      status: 'Scheduled',
      priority: 'Medium',
      startDate: '2024-03-15',
      endDate: '2024-04-15',
      progress: 0,
      findings: 0,
      description: 'Testing of business continuity plans and disaster recovery procedures.',
      scope: ['Disaster Recovery', 'Business Continuity Plans', 'Crisis Management'],
      stakeholders: ['COO', 'Operations Team', 'IT Team']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-success text-white';
      case 'In Progress':
        return 'bg-warning text-white';
      case 'Scheduled':
        return 'bg-accent text-white';
      case 'Planning':
        return 'bg-secondary-400 text-white';
      default:
        return 'bg-secondary-300 text-text-secondary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'text-error';
      case 'Medium':
        return 'text-warning';
      case 'Low':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  const getTypeIcon = (type) => {
    return type === 'External' ? 'ExternalLink' : 'Building';
  };

  const filteredAudits = audits.filter(audit => {
    if (filterType === 'all') return true;
    return audit.type === filterType;
  });

  const sortedAudits = [...filteredAudits].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const renderTimelineView = () => (
    <div className="space-y-6">
      {sortedAudits.map((audit, index) => (
        <div key={audit.id} className="relative">
          {/* Timeline Line */}
          {index < sortedAudits.length - 1 && (
            <div className="absolute left-6 top-12 w-0.5 h-full bg-gradient-to-b from-neon-green to-neon-purple"></div>
          )}
          
          {/* Timeline Node */}
          <div className="flex items-start space-x-4">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white/20
              ${getStatusColor(audit.status)}
            `}>
              <Icon name={getTypeIcon(audit.type)} size={20} />
            </div>
            
            {/* Audit Card */}
            <div className="flex-1 neumorphic-card hover-scale nav-transition">
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-text-dark-primary">
                        {audit.title}
                      </h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(audit.status)}`}>
                        {audit.status}
                      </span>
                    </div>
                    <p className="text-sm text-text-dark-secondary mb-3">
                      {audit.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                    <div className="text-right">
                      <div className="text-sm font-medium text-text-dark-primary">
                        {audit.startDate} - {audit.endDate}
                      </div>
                      <div className={`text-sm font-medium ${getPriorityColor(audit.priority)}`}>
                        {audit.priority} Priority
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {audit.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-text-dark-secondary mb-2">
                      <span>Progress</span>
                      <span>{audit.progress}%</span>
                    </div>
                    <div className="w-full bg-dark-secondary rounded-full h-2 border border-white/10">
                      <div
                        className="bg-gradient-to-r from-neon-green to-neon-purple h-2 rounded-full transition-all duration-300"
                        style={{ width: `${audit.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-text-dark-muted">Department:</span>
                    <p className="font-medium text-text-dark-primary">{audit.department}</p>
                  </div>
                  <div>
                    <span className="text-sm text-text-dark-muted">Auditor:</span>
                    <p className="font-medium text-text-dark-primary">{audit.auditor}</p>
                  </div>
                  <div>
                    <span className="text-sm text-text-dark-muted">Type:</span>
                    <div className="flex items-center space-x-1">
                      <Icon name={getTypeIcon(audit.type)} size={14} className="text-text-dark-secondary" />
                      <span className="font-medium text-text-dark-primary">{audit.type}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-text-dark-muted">Findings:</span>
                    <p className="font-medium text-text-dark-primary">{audit.findings}</p>
                  </div>
                </div>

                {/* Scope */}
                <div className="mb-4">
                  <span className="text-sm text-text-dark-muted">Scope:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {audit.scope.map((item, index) => (
                      <span
                        key={index}
                        className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-neon-green/20 to-neon-purple/20 text-neon-green border border-neon-green/30"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stakeholders */}
                <div>
                  <span className="text-sm text-text-dark-muted">Stakeholders:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {audit.stakeholders.map((stakeholder, index) => (
                      <span
                        key={index}
                        className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 text-neon-purple border border-neon-purple/30"
                      >
                        {stakeholder}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Card Footer */}
              <div className="px-6 py-3 border-t border-white/10 bg-gradient-to-r from-dark-secondary/50 to-dark-surface/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-dark-muted">
                    Audit ID: {audit.id}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-text-dark-muted hover:text-neon-green hover:bg-neon-green/10 rounded-lg nav-transition">
                      <Icon name="Eye" size={16} />
                    </button>
                    <button className="p-2 text-text-dark-muted hover:text-neon-green hover:bg-neon-green/10 rounded-lg nav-transition">
                      <Icon name="Edit" size={16} />
                    </button>
                    <button className="p-2 text-text-dark-muted hover:text-neon-green hover:bg-neon-green/10 rounded-lg nav-transition">
                      <Icon name="Download" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCalendarView = () => (
    <div className="neumorphic-card p-6">
      <div className="text-center text-text-dark-secondary">
        <Icon name="Calendar" size={48} className="mx-auto mb-4 text-neon-green" />
        <h3 className="text-lg font-medium text-text-dark-primary mb-2">
          Calendar View
        </h3>
        <p className="text-sm">
          Calendar integration coming soon. Switch to Timeline view for detailed audit information.
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            Audit Timeline
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Schedule and track audit activities across departments
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          {/* View Mode Toggle */}
          <div className="flex bg-dark-secondary/50 rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setViewMode('timeline')}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium nav-transition
                ${viewMode === 'timeline' ?'bg-gradient-to-r from-neon-green/20 to-neon-purple/20 text-neon-green border border-neon-green/30 shadow-lg shadow-neon-green/10' :'text-text-dark-secondary hover:text-neon-green hover:bg-neon-green/10'}
              `}
            >
              <Icon name="List" size={16} />
              <span>Timeline</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium nav-transition
                ${viewMode === 'calendar' ?'bg-gradient-to-r from-neon-green/20 to-neon-purple/20 text-neon-green border border-neon-green/30 shadow-lg shadow-neon-green/10' :'text-text-dark-secondary hover:text-neon-green hover:bg-neon-green/10'}
              `}
            >
              <Icon name="Calendar" size={16} />
              <span>Calendar</span>
            </button>
          </div>
          
          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-gradient-to-r from-dark-secondary/80 to-dark-surface/80 border border-white/20 rounded-lg text-sm text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-neon-green/50 focus:border-neon-green/50 hover:border-neon-green/30 nav-transition shadow-lg shadow-black/20"
          >
            <option value="all">All Types</option>
            <option value="Internal">Internal</option>
            <option value="External">External</option>
          </select>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'timeline' ? renderTimelineView() : renderCalendarView()}

      {/* Summary Statistics */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Audits', value: audits.length, icon: 'FileText' },
          { label: 'In Progress', value: audits.filter(a => a.status === 'In Progress').length, icon: 'Clock' },
          { label: 'Scheduled', value: audits.filter(a => a.status === 'Scheduled').length, icon: 'Calendar' },
          { label: 'Completed', value: audits.filter(a => a.status === 'Completed').length, icon: 'CheckCircle' }
        ].map(stat => (
          <div key={stat.label} className="neumorphic-card p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Icon name={stat.icon} size={20} className="text-neon-green" />
            </div>
            <div className="text-2xl font-bold text-text-dark-primary">{stat.value}</div>
            <div className="text-sm text-text-dark-secondary">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditTimeline;