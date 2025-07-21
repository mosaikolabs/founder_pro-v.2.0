import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const PolicyLibraryManagement = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  const policies = [
    {
      id: 'POL-001',
      title: 'Strategic Planning Framework',
      category: 'Strategy',
      status: 'Active',
      lastUpdated: '2025-01-15',
      owner: 'Founder',
      description: 'Comprehensive framework for strategic planning and decision making'
    },
    {
      id: 'POL-002',
      title: 'Legal Compliance Guidelines',
      category: 'Legal',
      status: 'Active',
      lastUpdated: '2025-01-10',
      owner: 'Legal Team',
      description: 'Guidelines for maintaining legal compliance across all operations'
    },
    {
      id: 'POL-003',
      title: 'Technology Development Standards',
      category: 'Technology',
      status: 'Draft',
      lastUpdated: '2025-01-20',
      owner: 'CTO',
      description: 'Standards and best practices for technology development'
    },
    {
      id: 'POL-004',
      title: 'Financial Management Procedures',
      category: 'Finance',
      status: 'Active',
      lastUpdated: '2025-01-12',
      owner: 'CFO',
      description: 'Procedures for financial management and reporting'
    },
    {
      id: 'POL-005',
      title: 'Marketing Strategy Guidelines',
      category: 'Marketing',
      status: 'Review',
      lastUpdated: '2025-01-18',
      owner: 'Marketing Lead',
      description: 'Guidelines for marketing strategy and campaign execution'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-success text-white';
      case 'Draft': return 'bg-warning text-white';
      case 'Review': return 'bg-info text-white';
      case 'Archived': return 'bg-gray-500 text-white';
      default: return 'bg-gray-300 text-gray-700';
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">
              Policy Library Management
            </h1>
            <p className="text-lg text-text-secondary">
              Manage and organize strategic policies and guidelines for your startup
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" icon="Filter">
              Filter
            </Button>
            <Button variant="primary" icon="Plus">
              New Policy
            </Button>
          </div>
        </div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <div 
              key={policy.id}
              className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-soft-lg transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedPolicy(policy)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-medium text-text-muted">{policy.id}</span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2 group-hover:text-primary-600 transition-colors">
                    {policy.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                    {policy.description}
                  </p>
                </div>
                <Icon name="ArrowRight" size={16} className="text-text-muted group-hover:text-primary-500 transition-colors" />
              </div>
              
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>{policy.category}</span>
                <span>Updated {policy.lastUpdated}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center">
                <Icon name="CheckCircle" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">3</div>
                <div className="text-sm text-text-secondary">Active Policies</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-warning rounded-xl flex items-center justify-center">
                <Icon name="FileText" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">1</div>
                <div className="text-sm text-text-secondary">Draft Policies</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-info rounded-xl flex items-center justify-center">
                <Icon name="Eye" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">1</div>
                <div className="text-sm text-text-secondary">Under Review</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Icon name="Users" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">5</div>
                <div className="text-sm text-text-secondary">Policy Owners</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default PolicyLibraryManagement;