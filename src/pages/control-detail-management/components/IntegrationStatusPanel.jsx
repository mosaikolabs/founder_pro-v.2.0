// src/pages/control-detail-management/components/IntegrationStatusPanel.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const IntegrationStatusPanel = ({ controlData, integrationStatus }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const integrations = [
    {
      id: 'riskManagement',
      name: 'Risk Management System',
      description: 'Risk assessment and monitoring platform',
      icon: 'Shield',
      status: integrationStatus?.riskManagement?.status || 'disconnected',
      lastSync: integrationStatus?.riskManagement?.lastSync,
      syncData: {
        riskScore: 'Medium',
        lastAssessment: '2024-01-10',
        mitigationActions: 3
      }
    },
    {
      id: 'documentRepo',
      name: 'Document Repository',
      description: 'Centralized document management system',
      icon: 'FolderOpen',
      status: integrationStatus?.documentRepo?.status || 'disconnected',
      lastSync: integrationStatus?.documentRepo?.lastSync,
      syncData: {
        documentCount: 15,
        lastUpdate: '2024-01-12',
        pendingApprovals: 2
      }
    },
    {
      id: 'testingPlatform',
      name: 'Testing Platform',
      description: 'Automated testing and validation system',
      icon: 'TestTube',
      status: integrationStatus?.testingPlatform?.status || 'disconnected',
      lastSync: integrationStatus?.testingPlatform?.lastSync,
      syncData: {
        testsCompleted: 12,
        passRate: '95%',
        nextScheduled: '2024-01-20'
      }
    },
    {
      id: 'complianceDb',
      name: 'Compliance Database',
      description: 'Central compliance data repository',
      icon: 'Database',
      status: 'connected',
      lastSync: '2024-01-12T09:30:00Z',
      syncData: {
        recordsSync: 1250,
        lastBackup: '2024-01-12',
        healthStatus: 'Good'
      }
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'text-success';
      case 'disconnected':
        return 'text-error';
      case 'syncing':
        return 'text-warning';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-secondary-400';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'connected':
        return 'bg-success-100';
      case 'disconnected':
        return 'bg-error-100';
      case 'syncing':
        return 'bg-warning-100';
      case 'warning':
        return 'bg-warning-100';
      default:
        return 'bg-secondary-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle';
      case 'disconnected':
        return 'XCircle';
      case 'syncing':
        return 'RefreshCw';
      case 'warning':
        return 'AlertTriangle';
      default:
        return 'Circle';
    }
  };

  const formatLastSync = (lastSync) => {
    if (!lastSync) return 'Never';
    
    const date = new Date(lastSync);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const handleRefreshIntegrations = () => {
    setLastRefresh(new Date());
    // Simulate refresh action
    console.log('Refreshing integration status...');
  };

  const handleTestConnection = (integrationId) => {
    console.log(`Testing connection for ${integrationId}`);
    // Simulate connection test
  };

  const connectedIntegrations = integrations.filter(i => i.status === 'connected').length;
  const totalIntegrations = integrations.length;

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Icon name="Link" size={18} className="text-primary" />
              <h3 className="font-semibold text-text-primary">Integration Status</h3>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                connectedIntegrations === totalIntegrations ? 'bg-success' :
                connectedIntegrations > 0 ? 'bg-warning' : 'bg-error'
              }`} />
              <span className="text-sm text-text-secondary">
                {connectedIntegrations}/{totalIntegrations} connected
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefreshIntegrations}
              className="p-1 text-text-secondary hover:text-primary hover:bg-secondary-50 rounded nav-transition"
              title="Refresh status"
            >
              <Icon name="RefreshCw" size={16} />
            </button>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-text-secondary hover:text-primary hover:bg-secondary-50 rounded nav-transition"
            >
              <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <div className="space-y-4">
            {integrations.map(integration => (
              <div key={integration.id} className="border border-border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`p-1.5 rounded-lg ${getStatusBgColor(integration.status)}`}>
                      <Icon name={integration.icon} size={16} className={getStatusColor(integration.status)} />
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-text-primary text-sm">{integration.name}</h4>
                      <p className="text-xs text-text-secondary">{integration.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getStatusBgColor(integration.status)}`}>
                      <Icon name={getStatusIcon(integration.status)} size={12} className={getStatusColor(integration.status)} />
                      <span className={`text-xs font-medium capitalize ${getStatusColor(integration.status)}`}>
                        {integration.status}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleTestConnection(integration.id)}
                      className="p-1 text-text-secondary hover:text-primary hover:bg-secondary-50 rounded nav-transition"
                      title="Test connection"
                    >
                      <Icon name="Zap" size={12} />
                    </button>
                  </div>
                </div>
                
                <div className="text-xs text-text-secondary mb-2">
                  Last sync: {formatLastSync(integration.lastSync)}
                </div>
                
                {/* Integration-specific data */}
                {integration.status === 'connected' && integration.syncData && (
                  <div className="bg-secondary-50 rounded p-2">
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      {Object.entries(integration.syncData).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-text-secondary capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                          </span>
                          <span className="text-text-primary font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {integration.status === 'disconnected' && (
                  <div className="bg-error-50 rounded p-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={12} className="text-error" />
                      <span className="text-xs text-error">
                        Connection failed. Check configuration.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Overall Integration Health */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Last refresh:</span>
              <span className="text-text-primary font-data">
                {formatLastSync(lastRefresh.toISOString())}
              </span>
            </div>
            
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Overall Health</span>
                <span className={`font-medium ${
                  connectedIntegrations === totalIntegrations ? 'text-success' :
                  connectedIntegrations > totalIntegrations / 2 ? 'text-warning' : 'text-error'
                }`}>
                  {connectedIntegrations === totalIntegrations ? 'Excellent' :
                   connectedIntegrations > totalIntegrations / 2 ? 'Good' : 'Poor'}
                </span>
              </div>
              
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    connectedIntegrations === totalIntegrations ? 'bg-success' :
                    connectedIntegrations > totalIntegrations / 2 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${(connectedIntegrations / totalIntegrations) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationStatusPanel;