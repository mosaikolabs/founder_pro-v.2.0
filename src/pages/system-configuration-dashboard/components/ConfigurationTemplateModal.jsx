// src/pages/system-configuration-dashboard/components/ConfigurationTemplateModal.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfigurationTemplateModal = ({ isOpen, onClose, onApplyTemplate }) => {
  const [templates] = useState([
    {
      id: 'compliance-standard',
      name: 'Compliance Standard Setup',
      description: 'Standard configuration for compliance-focused organizations',
      category: 'Compliance',
      settings: {
        auditLogging: true,
        twoFactorAuth: true,
        sessionTimeout: 30,
        passwordPolicy: 'strict'
      },
      integrations: ['LDAP', 'Audit System'],
      notifications: ['Compliance Breach', 'Audit Deadlines'],
      lastUpdated: '2024-01-10'
    },
    {
      id: 'enterprise-security',
      name: 'Enterprise Security Profile',
      description: 'High-security configuration for enterprise environments',
      category: 'Security',
      settings: {
        auditLogging: true,
        twoFactorAuth: true,
        sessionTimeout: 15,
        passwordPolicy: 'enterprise',
        encryptionLevel: 'AES-256'
      },
      integrations: ['LDAP', 'SIEM', 'Identity Provider'],
      notifications: ['Security Alerts', 'Failed Logins', 'System Access'],
      lastUpdated: '2024-01-08'
    },
    {
      id: 'development-environment',
      name: 'Development Environment',
      description: 'Relaxed settings suitable for development and testing',
      category: 'Development',
      settings: {
        auditLogging: false,
        twoFactorAuth: false,
        sessionTimeout: 120,
        passwordPolicy: 'basic'
      },
      integrations: ['Development Tools'],
      notifications: ['System Maintenance'],
      lastUpdated: '2024-01-05'
    },
    {
      id: 'financial-services',
      name: 'Financial Services Compliance',
      description: 'Specialized configuration for financial industry compliance',
      category: 'Industry',
      settings: {
        auditLogging: true,
        twoFactorAuth: true,
        sessionTimeout: 20,
        passwordPolicy: 'strict',
        dataRetention: '7 years'
      },
      integrations: ['Financial Systems', 'Regulatory Reporting'],
      notifications: ['Regulatory Deadlines', 'Transaction Monitoring'],
      lastUpdated: '2024-01-12'
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!isOpen) return null;

  const categories = ['all', ...new Set(templates.map(t => t.category))];
  
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApplyTemplate = () => {
    if (selectedTemplate) {
      onApplyTemplate?.(selectedTemplate);
      onClose();
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Compliance': return 'bg-primary-50 text-primary border-primary-200';
      case 'Security': return 'bg-error-50 text-error border-error-200';
      case 'Development': return 'bg-accent-50 text-accent border-accent-200';
      case 'Industry': return 'bg-warning-50 text-warning border-warning-200';
      default: return 'bg-secondary-50 text-text-secondary border-border';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal">
      <div className="bg-surface rounded-lg shadow-modal max-w-6xl w-full mx-4 max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex h-full max-h-[90vh]">
          {/* Template List */}
          <div className="w-1/2 border-r border-border flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-border flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
                  <Icon name="FileText" size={20} />
                  <span>Configuration Templates</span>
                </h3>
                <button 
                  onClick={onClose}
                  className="text-text-secondary hover:text-text-primary nav-transition"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              
              {/* Search and Filter */}
              <div className="space-y-3">
                <div className="relative">
                  <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Template List - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {filteredTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => { setSelectedTemplate(template); setShowPreview(true); }}
                    className={`w-full text-left p-4 border rounded-lg nav-transition ${
                      selectedTemplate?.id === template.id
                        ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-secondary-50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-text-primary">{template.name}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                        getCategoryColor(template.category)
                      }`}>
                        {template.category}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mb-3">{template.description}</p>
                    <div className="flex items-center justify-between text-xs text-text-secondary">
                      <span>Updated: {template.lastUpdated}</span>
                      <span>{template.integrations.length} integrations</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Template Preview */}
          <div className="w-1/2 flex flex-col max-h-[90vh]">
            {showPreview && selectedTemplate ? (
              <>
                <div className="p-6 border-b border-border flex-shrink-0">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-text-primary">{selectedTemplate.name}</h4>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                      getCategoryColor(selectedTemplate.category)
                    }`}>
                      {selectedTemplate.category}
                    </span>
                  </div>
                  <p className="text-text-secondary">{selectedTemplate.description}</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-6">
                    {/* General Settings */}
                    <div>
                      <h5 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
                        <Icon name="Settings" size={16} />
                        <span>General Settings</span>
                      </h5>
                      <div className="bg-secondary-50 rounded-lg p-4 space-y-2">
                        {Object.entries(selectedTemplate.settings).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between text-sm">
                            <span className="text-text-secondary capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <span className="font-medium text-text-primary">
                              {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Integrations */}
                    <div>
                      <h5 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
                        <Icon name="Zap" size={16} />
                        <span>Integrations ({selectedTemplate.integrations.length})</span>
                      </h5>
                      <div className="space-y-2">
                        {selectedTemplate.integrations.map((integration, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <Icon name="CheckCircle" size={14} className="text-success" />
                            <span className="text-text-primary">{integration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Notifications */}
                    <div>
                      <h5 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
                        <Icon name="Bell" size={16} />
                        <span>Notification Rules ({selectedTemplate.notifications.length})</span>
                      </h5>
                      <div className="space-y-2">
                        {selectedTemplate.notifications.map((notification, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <Icon name="CheckCircle" size={14} className="text-success" />
                            <span className="text-text-primary">{notification}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Impact Warning */}
                    <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                        <div>
                          <h6 className="text-sm font-medium text-warning-700">Configuration Impact</h6>
                          <p className="text-sm text-warning-600 mt-1">
                            Applying this template will overwrite current settings. Consider creating a backup before proceeding.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="p-6 border-t border-border flex-shrink-0">
                  <div className="flex items-center justify-end space-x-3">
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button variant="primary" iconName="Download" onClick={handleApplyTemplate}>
                      Apply Template
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center">
                  <Icon name="FileText" size={48} className="text-text-secondary mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-text-primary mb-2">Select a Template</h4>
                  <p className="text-text-secondary">Choose a configuration template from the list to preview its settings</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationTemplateModal;