// src/pages/compliance-reporting-center/components/DataSourcePanel.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DataSourcePanel = ({ selectedDataSources = [], onDataSourceSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(['compliance', 'audit']);

  const dataSources = [
    {
      category: 'Compliance',
      key: 'compliance',
      sources: [
        {
          id: 'controls-matrix',
          name: 'Controls Matrix',
          icon: 'Grid3X3',
          description: 'Control implementation status and testing results',
          status: 'connected',
          recordCount: '1,247'
        },
        {
          id: 'policy-library',
          name: 'Policy Library',
          icon: 'BookOpen',
          description: 'Policy documentation and compliance status',
          status: 'connected',
          recordCount: '892'
        },
        {
          id: 'risk-assessments',
          name: 'Risk Assessments',
          icon: 'Shield',
          description: 'Risk evaluation and mitigation tracking',
          status: 'connected',
          recordCount: '456'
        }
      ]
    },
    {
      category: 'Audit',
      key: 'audit',
      sources: [
        {
          id: 'audit-findings',
          name: 'Audit Findings',
          icon: 'Search',
          description: 'Audit observations and recommendations',
          status: 'connected',
          recordCount: '234'
        },
        {
          id: 'testing-results',
          name: 'Testing Results',
          icon: 'CheckCircle',
          description: 'Control testing outcomes and evidence',
          status: 'connected',
          recordCount: '1,089'
        }
      ]
    },
    {
      category: 'Business Intelligence',
      key: 'business-intelligence',
      sources: [
        {
          id: 'kpi-metrics',
          name: 'KPI Metrics',
          icon: 'TrendingUp',
          description: 'Key performance indicators and trends',
          status: 'connected',
          recordCount: '567'
        },
        {
          id: 'financial-data',
          name: 'Financial Data',
          icon: 'DollarSign',
          description: 'Financial controls and reporting data',
          status: 'syncing',
          recordCount: '2,341'
        }
      ]
    },
    {
      category: 'External Systems',
      key: 'external-systems',
      sources: [
        {
          id: 'erp-system',
          name: 'ERP System',
          icon: 'Database',
          description: 'Enterprise resource planning data',
          status: 'connected',
          recordCount: '5,678'
        },
        {
          id: 'ldap-directory',
          name: 'LDAP Directory',
          icon: 'Users',
          description: 'User access and authentication data',
          status: 'connected',
          recordCount: '1,234'
        }
      ]
    }
  ];

  const toggleCategory = (categoryKey) => {
    setExpandedCategories(prev => 
      prev.includes(categoryKey)
        ? prev.filter(key => key !== categoryKey)
        : [...prev, categoryKey]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-success';
      case 'syncing':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle';
      case 'syncing':
        return 'RefreshCw';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const filteredDataSources = dataSources.map(category => ({
    ...category,
    sources: category.sources.filter(source =>
      source?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      source?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
  })).filter(category => category.sources.length > 0);

  const isSourceSelected = (sourceId) => {
    return selectedDataSources?.some(ds => ds?.id === sourceId) || false;
  };

  return (
    <div className="h-full flex flex-col neumorphic-card">
      {/* Header */}
      <div className="p-4 border-b border-white border-opacity-10">
        <h2 className="text-lg font-medium text-text-dark-primary mb-3">
          Data Sources
        </h2>
        
        {/* Search */}
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-dark-secondary" 
          />
          <input
            type="text"
            placeholder="Search data sources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 neumorphic-input text-text-dark-primary text-sm focus:ring-2 focus:ring-neon-green focus:border-transparent"
          />
        </div>
      </div>

      {/* Data Sources List */}
      <div className="flex-1 overflow-y-auto scrollbar-dark p-4 space-y-4">
        {filteredDataSources.map((category) => {
          const isExpanded = expandedCategories.includes(category.key);
          
          return (
            <div key={category.key} className="space-y-2">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.key)}
                className="w-full flex items-center justify-between py-2 text-sm font-medium text-text-dark-primary hover:text-neon-green nav-transition"
              >
                <span>{category.category}</span>
                <Icon 
                  name={isExpanded ? 'ChevronDown' : 'ChevronRight'} 
                  size={16} 
                />
              </button>

              {/* Category Sources */}
              {isExpanded && (
                <div className="space-y-2 ml-2">
                  {category.sources.map((source) => {
                    const isSelected = isSourceSelected(source?.id);
                    
                    return (
                      <div
                        key={source?.id}
                        onClick={() => onDataSourceSelect?.(source)}
                        className={`p-3 rounded-lg border-2 cursor-pointer nav-transition ${
                          isSelected
                            ? 'border-neon-green bg-neon-green/10' : 'border-white/10 hover:border-neon-green/50 hover:bg-dark-elevated'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${
                            isSelected ? 'bg-neon-green text-dark-primary' : 'bg-dark-surface text-text-dark-secondary'
                          }`}>
                            <Icon name={source?.icon} size={16} />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-sm font-medium text-text-dark-primary truncate">
                                {source?.name}
                              </h4>
                              <div className="flex items-center space-x-1">
                                <Icon 
                                  name={getStatusIcon(source?.status)} 
                                  size={12} 
                                  className={getStatusColor(source?.status)}
                                />
                              </div>
                            </div>
                            
                            <p className="text-xs text-text-dark-secondary mb-2 line-clamp-2">
                              {source?.description}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-text-dark-secondary">
                                {source?.recordCount} records
                              </span>
                              <span className={`capitalize ${getStatusColor(source?.status)}`}>
                                {source?.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Sources Summary */}
      {selectedDataSources?.length > 0 && (
        <div className="p-4 border-t border-white border-opacity-10 bg-dark-elevated">
          <h3 className="text-sm font-medium text-text-dark-primary mb-2">
            Selected Sources ({selectedDataSources?.length || 0})
          </h3>
          <div className="space-y-1">
            {selectedDataSources?.slice(0, 3)?.map((source) => (
              <div key={source?.id} className="text-xs text-text-dark-secondary">
                • {source?.name}
              </div>
            ))}
            {selectedDataSources?.length > 3 && (
              <div className="text-xs text-text-dark-secondary">
                + {(selectedDataSources?.length || 0) - 3} more sources
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSourcePanel;