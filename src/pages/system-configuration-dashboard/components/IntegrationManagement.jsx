// src/pages/system-configuration-dashboard/components/IntegrationManagement.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationManagement = ({ userRole, onConfigChange }) => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'okta-sso',
      name: 'Okta SSO',
      description: 'Single Sign-On integration with Okta identity provider',
      enabled: true,
      status: 'connected',
      lastSync: '2024-01-15 14:30:00',
      type: 'authentication',
      config: {
        domain: 'company.okta.com',
        clientId: 'abc123xyz',
        scopes: ['openid', 'profile', 'email']
      }
    },
    {
      id: 'azure-ad',
      name: 'Azure Active Directory',
      description: 'Microsoft Azure AD integration for user management',
      enabled: false,
      status: 'disconnected',
      lastSync: null,
      type: 'authentication',
      config: {
        tenantId: '',
        clientId: '',
        clientSecret: ''
      }
    },
    {
      id: 'slack-notifications',
      name: 'Slack Notifications',
      description: 'Send compliance alerts and notifications to Slack channels',
      enabled: true,
      status: 'connected',
      lastSync: '2024-01-15 15:45:00',
      type: 'notification',
      config: {
        webhookUrl: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
        channels: ['#compliance', '#alerts']
      }
    }
  ]);

  const hasFullAccess = userRole === 'System Administrator';

  const handleToggleIntegration = (id) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === id ? { ...integration, enabled: !integration.enabled } : integration
    ));
    onConfigChange?.();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success-dark';
      case 'disconnected': return 'text-error-dark';
      case 'syncing': return 'text-warning-dark';
      default: return 'text-text-dark-secondary';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'authentication': return 'Shield';
      case 'notification': return 'Bell';
      case 'data': return 'Database';
      default: return 'Zap';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-dark-primary flex items-center space-x-2 mb-4 mt-6 px-4">
            <Icon name="Zap" size={20} />
            <span>Integration Management</span>
          </h3>
          <p className="text-sm text-text-dark-secondary mt-1 px-4">
            Configure third-party integrations and API connections
          </p>
        </div>
        {hasFullAccess && (
          <Button 
            variant="primary" 
            size="sm" 
            iconName="Plus"
          >
            Add Integration
          </Button>
        )}
      </div>

      {/* Active Integrations */}
      <div>
        <h4 className="font-medium text-text-dark-primary mb-6 mt-8 flex items-center space-x-2 px-4">
          <Icon name="Link" size={16} />
          <span>Active Integrations</span>
        </h4>
        
        <div className="space-y-4">
          {integrations.map((integration) => (
            <div key={integration.id} className="neumorphic-card p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon name={getTypeIcon(integration.type)} size={20} className="text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h5 className="font-medium text-text-dark-primary">{integration.name}</h5>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        integration.status === 'connected' ? 'bg-success-50 text-success' :
                        integration.status === 'disconnected' ? 'bg-error-50 text-error' : 'bg-warning-50 text-warning'
                      }`}>
                        {integration.status}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-dark-secondary mb-3">{integration.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-text-dark-secondary">Type:</span>
                        <div className="font-medium text-text-dark-primary capitalize">{integration.type}</div>
                      </div>
                      <div>
                        <span className="text-text-dark-secondary">Last Sync:</span>
                        <div className="font-medium text-text-dark-primary">
                          {integration.lastSync || 'Never'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleToggleIntegration(integration.id)}
                    disabled={!hasFullAccess}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      integration.enabled ? 'bg-primary' : 'bg-secondary-300'
                    } ${!hasFullAccess ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        integration.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="RefreshCw"
                    disabled={!integration.enabled || !hasFullAccess}
                  >
                    Sync
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="Settings"
                    disabled={!hasFullAccess}
                  >
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Integrations */}
      <div>
        <h4 className="font-medium text-text-dark-primary mb-6 mt-8 flex items-center space-x-2 px-4">
          <Icon name="Package" size={16} />
          <span>Available Integrations</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'ServiceNow', type: 'ticketing', icon: 'Ticket' },
            { name: 'Jira', type: 'project', icon: 'CheckSquare' },
            { name: 'Microsoft Teams', type: 'notification', icon: 'MessageCircle' },
            { name: 'Salesforce', type: 'crm', icon: 'Users' },
            { name: 'AWS CloudTrail', type: 'logging', icon: 'Cloud' },
            { name: 'Splunk', type: 'analytics', icon: 'BarChart' }
          ].map((integration, index) => (
            <div key={index} className="neumorphic-card p-4 text-center">
              <div className="w-12 h-12 bg-dark-surface rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={integration.icon} size={24} className="text-text-dark-secondary" />
              </div>
              <h5 className="font-medium text-text-dark-primary mb-1">{integration.name}</h5>
              <p className="text-xs text-text-dark-secondary mb-3 capitalize">{integration.type}</p>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={!hasFullAccess}
              >
                Install
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Settings */}
      <div className="neumorphic-card p-6 bg-gradient-primary">
        <h4 className="font-medium text-white mb-6 mt-4 flex items-center space-x-2 px-2">
          <Icon name="Settings" size={16} />
          <span>Integration Settings</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">API Rate Limit</label>
            <select 
              className="neumorphic-input w-full px-3 py-2 text-text-dark-primary"
              disabled={!hasFullAccess}
            >
              <option value="100">100 requests/minute</option>
              <option value="500">500 requests/minute</option>
              <option value="1000">1000 requests/minute</option>
              <option value="unlimited">Unlimited</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">Sync Frequency</label>
            <select 
              className="neumorphic-input w-full px-3 py-2 text-text-dark-primary"
              disabled={!hasFullAccess}
            >
              <option value="5">Every 5 minutes</option>
              <option value="15">Every 15 minutes</option>
              <option value="30">Every 30 minutes</option>
              <option value="60">Every hour</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationManagement;