import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PolicyLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Mock policy data
  const policies = [
    {
      id: 'POL-001',
      name: 'Information Security Policy',
      description: 'Comprehensive guidelines for protecting organizational information assets and maintaining data confidentiality, integrity, and availability.',
      category: 'Security',
      status: 'Active',
      version: '2.1',
      effectiveDate: '2024-01-15',
      expirationDate: '2025-01-15',
      owner: 'IT Security Team',
      approver: 'CISO',
      lastReviewed: '2024-01-10',
      nextReview: '2024-07-15',
      compliance: ['ISO 27001', 'SOX'],
      documentUrl: '#',
      attachments: 3
    },
    {
      id: 'POL-002',
      name: 'Data Privacy Policy',
      description: 'Guidelines for handling personal data in compliance with GDPR and other privacy regulations.',
      category: 'Privacy',
      status: 'Expired',
      version: '1.8',
      effectiveDate: '2023-05-01',
      expirationDate: '2024-01-01',
      owner: 'Legal Team',
      approver: 'Chief Legal Officer',
      lastReviewed: '2023-12-15',
      nextReview: '2024-02-01',
      compliance: ['GDPR', 'CCPA'],
      documentUrl: '#',
      attachments: 5
    },
    {
      id: 'POL-003',
      name: 'Financial Controls Policy',
      description: 'Internal controls and procedures for financial reporting and compliance with accounting standards.',
      category: 'Finance',
      status: 'Under Review',
      version: '3.0',
      effectiveDate: '2024-02-01',
      expirationDate: '2025-02-01',
      owner: 'Finance Team',
      approver: 'CFO',
      lastReviewed: '2024-01-20',
      nextReview: '2024-08-01',
      compliance: ['SOX', 'GAAP'],
      documentUrl: '#',
      attachments: 7
    },
    {
      id: 'POL-004',
      name: 'Employee Code of Conduct',
      description: 'Standards of behavior and ethical guidelines for all employees and contractors.',
      category: 'HR',
      status: 'Active',
      version: '1.5',
      effectiveDate: '2023-09-01',
      expirationDate: '2024-09-01',
      owner: 'HR Team',
      approver: 'Chief HR Officer',
      lastReviewed: '2023-08-15',
      nextReview: '2024-03-01',
      compliance: ['Corporate Governance'],
      documentUrl: '#',
      attachments: 2
    },
    {
      id: 'POL-005',
      name: 'Vendor Management Policy',
      description: 'Procedures for vendor selection, onboarding, monitoring, and risk assessment.',
      category: 'Procurement',
      status: 'Draft',
      version: '1.0',
      effectiveDate: '2024-03-01',
      expirationDate: '2025-03-01',
      owner: 'Procurement Team',
      approver: 'COO',
      lastReviewed: '2024-01-25',
      nextReview: '2024-09-01',
      compliance: ['SOX', 'Risk Management'],
      documentUrl: '#',
      attachments: 4
    },
    {
      id: 'POL-006',
      name: 'Business Continuity Policy',
      description: 'Framework for maintaining business operations during disruptions and disaster recovery procedures.',
      category: 'Operations',
      status: 'Active',
      version: '2.3',
      effectiveDate: '2023-11-01',
      expirationDate: '2024-11-01',
      owner: 'Operations Team',
      approver: 'COO',
      lastReviewed: '2023-10-15',
      nextReview: '2024-05-01',
      compliance: ['ISO 22301', 'Business Continuity'],
      documentUrl: '#',
      attachments: 6
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success text-white';
      case 'Expired':
        return 'bg-error text-white';
      case 'Under Review':
        return 'bg-warning text-white';
      case 'Draft':
        return 'bg-accent text-white';
      default:
        return 'bg-secondary-300 text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return 'CheckCircle';
      case 'Expired':
        return 'XCircle';
      case 'Under Review':
        return 'Clock';
      case 'Draft':
        return 'Edit';
      default:
        return 'HelpCircle';
    }
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Security': 'Shield',
      'Privacy': 'Lock',
      'Finance': 'DollarSign',
      'HR': 'Users',
      'Procurement': 'ShoppingCart',
      'Operations': 'Settings'
    };
    return iconMap[category] || 'FileText';
  };

  const isExpiringSoon = (expirationDate) => {
    const expiry = new Date(expirationDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || policy.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedPolicies = [...filteredPolicies].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'category':
        return a.category.localeCompare(b.category);
      case 'expiration':
        return new Date(a.expirationDate) - new Date(b.expirationDate);
      default:
        return 0;
    }
  });

  return (
    <div className="p-6">
      {/* Header and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-text-dark-primary">
            Policy Library
          </h3>
          <p className="text-sm text-text-dark-secondary mt-1">
            Centralized repository for organizational policies and procedures
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-dark-secondary" />
            <input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-dark-surface border border-white/10 rounded-lg text-sm text-text-dark-primary placeholder-text-dark-muted focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green shadow-inner"
            />
          </div>
          
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-dark-surface border border-white/10 rounded-lg text-sm text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green shadow-inner"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Under Review">Under Review</option>
            <option value="Draft">Draft</option>
          </select>
          
          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-dark-surface border border-white/10 rounded-lg text-sm text-text-dark-primary focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green shadow-inner"
          >
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
            <option value="category">Sort by Category</option>
            <option value="expiration">Sort by Expiration</option>
          </select>
        </div>
      </div>

      {/* Policy Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sortedPolicies.map((policy) => (
          <div key={policy.id} className="neumorphic-card hover-scale nav-transition">
            {/* Card Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-neon-green/20 to-neon-purple/20 rounded-lg flex items-center justify-center border border-white/10">
                    <Icon name={getCategoryIcon(policy.category)} size={20} className="text-neon-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-dark-primary text-sm">
                      {policy.name}
                    </h4>
                    <p className="text-xs text-text-dark-secondary">
                      {policy.id} • v{policy.version}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                    <Icon name={getStatusIcon(policy.status)} size={12} className="mr-1" />
                    {policy.status}
                  </span>
                  
                  {isExpiringSoon(policy.expirationDate) && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-warning text-white">
                      <Icon name="AlertTriangle" size={12} className="mr-1" />
                      Expiring Soon
                    </span>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-text-dark-secondary line-clamp-2">
                {policy.description}
              </p>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
              {/* Key Information */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-text-dark-muted">Category:</span>
                  <p className="font-medium text-text-dark-primary">{policy.category}</p>
                </div>
                <div>
                  <span className="text-text-dark-muted">Owner:</span>
                  <p className="font-medium text-text-dark-primary">{policy.owner}</p>
                </div>
                <div>
                  <span className="text-text-dark-muted">Effective:</span>
                  <p className="font-medium text-text-dark-primary font-data">{policy.effectiveDate}</p>
                </div>
                <div>
                  <span className="text-text-dark-muted">Expires:</span>
                  <p className={`font-medium font-data ${isExpiringSoon(policy.expirationDate) ? 'text-warning-dark' : 'text-text-dark-primary'}`}>
                    {policy.expirationDate}
                  </p>
                </div>
              </div>

              {/* Compliance Frameworks */}
              <div>
                <span className="text-sm text-text-dark-muted">Compliance:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {policy.compliance.map((framework, index) => (
                    <span
                      key={index}
                      className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-neon-green/20 to-neon-purple/20 text-neon-green border border-neon-green/30"
                    >
                      {framework}
                    </span>
                  ))}
                </div>
              </div>

              {/* Attachments */}
              {policy.attachments > 0 && (
                <div className="flex items-center space-x-2 text-sm text-text-dark-secondary">
                  <Icon name="Paperclip" size={14} />
                  <span>{policy.attachments} attachment{policy.attachments > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="p-4 border-t border-white/10 bg-gradient-to-r from-dark-secondary/50 to-dark-surface/50">
              <div className="flex items-center justify-between">
                <div className="text-xs text-text-dark-muted">
                  Next Review: {policy.nextReview}
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-text-dark-muted hover:text-neon-green hover:bg-neon-green/10 rounded-lg nav-transition">
                    <Icon name="Eye" size={16} />
                  </button>
                  <button className="p-2 text-text-dark-muted hover:text-neon-green hover:bg-neon-green/10 rounded-lg nav-transition">
                    <Icon name="Download" size={16} />
                  </button>
                  <button className="p-2 text-text-dark-muted hover:text-neon-green hover:bg-neon-green/10 rounded-lg nav-transition">
                    <Icon name="Edit" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Policies', value: policies.length, icon: 'FileText' },
          { label: 'Active', value: policies.filter(p => p.status === 'Active').length, icon: 'CheckCircle' },
          { label: 'Expired', value: policies.filter(p => p.status === 'Expired').length, icon: 'XCircle' },
          { label: 'Expiring Soon', value: policies.filter(p => isExpiringSoon(p.expirationDate)).length, icon: 'AlertTriangle' }
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

export default PolicyLibrary;