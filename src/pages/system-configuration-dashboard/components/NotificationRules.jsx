// src/pages/system-configuration-dashboard/components/NotificationRules.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationRules = ({ userRole, onConfigChange }) => {
  const [rules, setRules] = useState([
    {
      id: 'compliance-breach',
      name: 'Compliance Breach Alert',
      description: 'Immediate notification when compliance thresholds are exceeded',
      enabled: true,
      priority: 'critical',
      channels: ['email', 'sms'],
      recipients: ['compliance-team@company.com', 'legal@company.com'],
      conditions: {
        threshold: '95',
        frequency: 'immediate'
      },
      template: 'breach-alert-template'
    },
    {
      id: 'audit-deadline',
      name: 'Audit Deadline Reminder',
      description: 'Reminders for upcoming audit deadlines and milestones',
      enabled: true,
      priority: 'high',
      channels: ['email'],
      recipients: ['audit-team@company.com'],
      conditions: {
        threshold: '7',
        frequency: 'daily'
      },
      template: 'deadline-reminder-template'
    },
    {
      id: 'policy-expiry',
      name: 'Policy Expiration Notice',
      description: 'Notifications for policies approaching expiration date',
      enabled: true,
      priority: 'medium',
      channels: ['email'],
      recipients: ['policy-managers@company.com'],
      conditions: {
        threshold: '30',
        frequency: 'weekly'
      },
      template: 'policy-expiry-template'
    },
    {
      id: 'system-maintenance',
      name: 'System Maintenance Notice',
      description: 'Advance notice for scheduled system maintenance',
      enabled: false,
      priority: 'medium',
      channels: ['email', 'in-app'],
      recipients: ['all-users@company.com'],
      conditions: {
        threshold: '24',
        frequency: 'once'
      },
      template: 'maintenance-notice-template'
    }
  ]);

  const [selectedRule, setSelectedRule] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [testNotification, setTestNotification] = useState(null);

  const hasFullAccess = userRole === 'System Administrator';
  const hasLimitedAccess = userRole === 'Compliance Manager';

  const handleToggleRule = (id) => {
    setRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
    onConfigChange?.();
  };

  const handleTestNotification = (ruleId) => {
    setTestNotification(ruleId);
    // Simulate sending test notification
    setTimeout(() => {
      setTestNotification(null);
    }, 2000);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error-dark bg-error-dark bg-opacity-20 border-error-dark border-opacity-30';
      case 'high': return 'text-warning-dark bg-warning-dark bg-opacity-20 border-warning-dark border-opacity-30';
      case 'medium': return 'text-info-dark bg-info-dark bg-opacity-20 border-info-dark border-opacity-30';
      case 'low': return 'text-text-dark-secondary bg-dark-surface bg-opacity-20 border-dark-surface border-opacity-30';
      default: return 'text-text-dark-secondary bg-dark-surface bg-opacity-20 border-dark-surface border-opacity-30';
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'email': return 'Mail';
      case 'sms': return 'MessageSquare';
      case 'in-app': return 'Bell';
      case 'webhook': return 'Zap';
      default: return 'Bell';
    }
  };

  const canEditRule = (rule) => {
    if (hasFullAccess) return true;
    if (hasLimitedAccess && ['compliance-breach', 'audit-deadline', 'policy-expiry'].includes(rule.id)) return true;
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-dark-primary flex items-center space-x-2 mb-4 mt-6 px-4">
            <Icon name="Bell" size={20} />
            <span>Notification Rules</span>
          </h3>
          <p className="text-sm text-text-dark-secondary mt-1 px-4">
            Configure alert settings and communication preferences
          </p>
        </div>
        {hasFullAccess && (
          <Button 
            variant="primary" 
            size="sm" 
            iconName="Plus"
            onClick={() => setShowAddModal(true)}
          >
            Add Rule
          </Button>
        )}
      </div>

      {/* Access Level Notice */}
      {!hasFullAccess && (
        <div className="neumorphic-card p-4 bg-warning-dark bg-opacity-10 border border-warning-dark border-opacity-20">
          <div className="flex items-center space-x-3">
            <Icon name="AlertTriangle" size={16} className="text-warning-dark" />
            <div>
              <p className="text-sm text-warning-dark">
                <strong>Limited Access:</strong> You can only modify compliance-related notification rules.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notification Rules */}
      <div className="space-y-4">
        {rules.map((rule) => {
          const canEdit = canEditRule(rule);
          
          return (
            <div key={rule.id} className={`neumorphic-card p-6 ${
              !canEdit ? 'opacity-60' : ''
            }`}>
              {/* Rule Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => canEdit && handleToggleRule(rule.id)}
                      disabled={!canEdit}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        rule.enabled ? 'bg-neon-green' : 'bg-dark-surface'
                      } ${!canEdit ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          rule.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    
                    {!canEdit && (
                      <Icon name="Lock" size={16} className="text-text-dark-secondary" />
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-text-dark-primary flex items-center space-x-2">
                      <span>{rule.name}</span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                        getPriorityColor(rule.priority)
                      }`}>
                        {rule.priority}
                      </span>
                    </h4>
                    <p className="text-sm text-text-dark-secondary mt-1">{rule.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="TestTube"
                    loading={testNotification === rule.id}
                    onClick={() => handleTestNotification(rule.id)}
                    disabled={!rule.enabled}
                  >
                    Test
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="Settings"
                    onClick={() => canEdit && setSelectedRule(rule)}
                    disabled={!canEdit}
                  >
                    Configure
                  </Button>
                </div>
              </div>

              {/* Rule Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-text-dark-secondary">Notification Channels</label>
                  <div className="flex items-center space-x-2 mt-1">
                    {rule.channels.map((channel) => (
                      <div key={channel} className="flex items-center space-x-1 bg-dark-surface bg-opacity-30 px-2 py-1 rounded text-xs">
                        <Icon name={getChannelIcon(channel)} size={12} className="text-text-dark-secondary" />
                        <span className="text-text-dark-primary">{channel}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-text-dark-secondary">Recipients</label>
                  <div className="mt-1">
                    <span className="text-sm text-text-dark-primary">
                      {rule.recipients.length} recipient{rule.recipients.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-text-dark-secondary">Frequency</label>
                  <div className="mt-1">
                    <span className="text-sm text-text-dark-primary capitalize">
                      {rule.conditions.frequency}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Notification Settings */}
      <div className="neumorphic-card p-6 bg-neon-green bg-opacity-5 border border-neon-green border-opacity-20">
        <h4 className="font-medium text-neon-green mb-6 mt-4 flex items-center space-x-2 px-2">
          <Icon name="Settings" size={16} />
          <span>Global Notification Settings</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-dark-primary mb-2">Default Email Server</label>
              <input 
                type="text" 
                value="smtp.company.com:587"
                className="neumorphic-input w-full px-3 py-2"
                disabled={!hasFullAccess}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-dark-primary mb-2">SMS Gateway</label>
              <select 
                className="neumorphic-input w-full px-3 py-2 text-text-dark-primary"
                disabled={!hasFullAccess}
              >
                <option value="twilio">Twilio</option>
                <option value="aws-sns">AWS SNS</option>
                <option value="custom">Custom Gateway</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-dark-primary mb-2">Rate Limiting</label>
              <select 
                className="neumorphic-input w-full px-3 py-2 text-text-dark-primary"
                disabled={!hasFullAccess}
              >
                <option value="none">No Limit</option>
                <option value="1-per-minute">1 per minute</option>
                <option value="5-per-minute">5 per minute</option>
                <option value="10-per-minute">10 per minute</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-dark-primary mb-2">Quiet Hours</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="time" 
                  value="22:00"
                  className="neumorphic-input px-3 py-2"
                  disabled={!hasFullAccess}
                />
                <span className="text-text-dark-primary">to</span>
                <input 
                  type="time" 
                  value="08:00"
                  className="neumorphic-input px-3 py-2"
                  disabled={!hasFullAccess}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Modal */}
      {selectedRule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal">
          <div className="neumorphic-card max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-dark-primary">
                  Configure {selectedRule.name}
                </h3>
                <button 
                  onClick={() => setSelectedRule(null)}
                  className="text-text-dark-secondary hover:text-text-dark-primary"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-dark-primary mb-2">Rule Name</label>
                    <input 
                      type="text" 
                      value={selectedRule.name}
                      className="neumorphic-input w-full px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-dark-primary mb-2">Priority Level</label>
                    <select className="neumorphic-input w-full px-3 py-2 text-text-dark-primary">
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-dark-primary mb-2">Notification Channels</label>
                    <div className="space-y-2">
                      {['email', 'sms', 'in-app', 'webhook'].map(channel => (
                        <label key={channel} className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            checked={selectedRule.channels.includes(channel)}
                            className="rounded border-dark-surface text-neon-green focus:ring-neon-green"
                          />
                          <span className="text-sm text-text-dark-primary capitalize">{channel}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-dark-primary mb-2">Recipients</label>
                    <textarea 
                      value={selectedRule.recipients.join('\n')}
                      className="neumorphic-input w-full px-3 py-2 h-24 resize-none"
                      placeholder="Enter email addresses, one per line"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-dark-primary mb-2">Frequency</label>
                    <select className="neumorphic-input w-full px-3 py-2 text-text-dark-primary">
                      <option value="immediate">Immediate</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="once">Once</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-dark-primary mb-2">Threshold (days)</label>
                    <input 
                      type="number" 
                      value={selectedRule.conditions.threshold}
                      className="neumorphic-input w-full px-3 py-2"
                      min="0"
                      max="365"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-6 mt-6 border-t border-dark-surface">
                <Button variant="outline" onClick={() => setSelectedRule(null)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => { setSelectedRule(null); onConfigChange?.(); }}>
                  Save Configuration
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationRules;