// src/pages/user-role-administration/components/RoleTemplateModal.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import ModalPortal from '../../../components/ui/ModalPortal';

const RoleTemplateModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('existing');
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    permissions: [],
    color: 'bg-primary'
  });

  const roleTemplates = [
    {
      id: 1,
      name: 'Security Administrator',
      description: 'Full system administration with security oversight capabilities',
      color: 'bg-error',
      permissions: [
        'user-management', 'system-admin', 'security-settings', 'audit-access',
        'integration-management', 'backup-restore'
      ],
      usageCount: 5,
      lastModified: '2024-01-10',
      createdBy: 'System Admin'
    },
    {
      id: 2,
      name: 'Compliance Manager',
      description: 'Comprehensive compliance oversight and policy management',
      color: 'bg-primary',
      permissions: [
        'policy-management', 'audit-schedule', 'compliance-dashboard',
        'report-access', 'user-view', 'risk-assessment'
      ],
      usageCount: 12,
      lastModified: '2024-01-08',
      createdBy: 'Sarah Johnson'
    },
    {
      id: 3,
      name: 'Department Auditor',
      description: 'Specialized auditing role with limited administrative access',
      color: 'bg-accent',
      permissions: [
        'audit-conduct', 'audit-view', 'report-create', 'risk-assessment',
        'compliance-dashboard'
      ],
      usageCount: 8,
      lastModified: '2024-01-05',
      createdBy: 'Michael Chen'
    },
    {
      id: 4,
      name: 'Report Analyst',
      description: 'Advanced reporting and data analysis capabilities',
      color: 'bg-warning',
      permissions: [
        'report-view', 'report-create', 'report-export', 'report-schedule',
        'compliance-dashboard', 'data-export'
      ],
      usageCount: 15,
      lastModified: '2024-01-12',
      createdBy: 'Emily Rodriguez'
    },
    {
      id: 5,
      name: 'Department User',
      description: 'Standard user access with department-specific permissions',
      color: 'bg-success',
      permissions: [
        'policy-view', 'compliance-dashboard', 'report-view', 'basic-access'
      ],
      usageCount: 156,
      lastModified: '2024-01-15',
      createdBy: 'HR Department'
    }
  ];

  const availablePermissions = [
    { id: 'user-management', name: 'User Management', category: 'Administration' },
    { id: 'system-admin', name: 'System Administration', category: 'Administration' },
    { id: 'security-settings', name: 'Security Settings', category: 'Security' },
    { id: 'policy-management', name: 'Policy Management', category: 'Compliance' },
    { id: 'audit-access', name: 'Audit Access', category: 'Auditing' },
    { id: 'audit-schedule', name: 'Audit Scheduling', category: 'Auditing' },
    { id: 'audit-conduct', name: 'Conduct Audits', category: 'Auditing' },
    { id: 'compliance-dashboard', name: 'Compliance Dashboard', category: 'Compliance' },
    { id: 'report-access', name: 'Report Access', category: 'Reporting' },
    { id: 'report-create', name: 'Create Reports', category: 'Reporting' },
    { id: 'report-export', name: 'Export Reports', category: 'Reporting' },
    { id: 'risk-assessment', name: 'Risk Assessment', category: 'Risk' }
  ];

  const colorOptions = [
    { value: 'bg-primary', label: 'Primary Blue', class: 'bg-primary' },
    { value: 'bg-error', label: 'Error Red', class: 'bg-error' },
    { value: 'bg-success', label: 'Success Green', class: 'bg-success' },
    { value: 'bg-warning', label: 'Warning Orange', class: 'bg-warning' },
    { value: 'bg-accent', label: 'Accent Blue', class: 'bg-accent' },
    { value: 'bg-secondary-600', label: 'Secondary Gray', class: 'bg-secondary-600' }
  ];

  const handleCreateTemplate = () => {
    if (!newTemplate.name || newTemplate.permissions.length === 0) {
      return;
    }
    
    console.log('Creating new role template:', newTemplate);
    // Here you would typically save to backend
    
    // Reset form
    setNewTemplate({
      name: '',
      description: '',
      permissions: [],
      color: 'bg-primary'
    });
    
    onClose();
  };

  const handlePermissionToggle = (permissionId) => {
    const isSelected = newTemplate.permissions.includes(permissionId);
    if (isSelected) {
      setNewTemplate(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => p !== permissionId)
      }));
    } else {
      setNewTemplate(prev => ({
        ...prev,
        permissions: [...prev.permissions, permissionId]
      }));
    }
  };

  const handleApplyTemplate = (template) => {
    console.log('Applying template:', template);
    // Here you would typically apply the template to selected users
    onClose();
  };

  const handleDuplicateTemplate = (template) => {
    setNewTemplate({
      name: `${template.name} (Copy)`,
      description: template.description,
      permissions: [...template.permissions],
      color: template.color
    });
    setActiveTab('create');
  };

  return (
    <ModalPortal
      isOpen={isOpen}
      onClose={onClose}
      title="Role Templates"
      size="lg"
      className="animate-fadeIn"
    >
      {/* Description */}
      <div className="px-6 py-4 border-b border-dark bg-dark-secondary/10">
        <p className="text-text-dark-secondary">
          Manage predefined role templates for quick user assignment
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 py-4 border-b border-dark bg-dark-secondary/10">
        <div className="flex space-x-1 bg-dark-secondary/30 border border-dark rounded-lg p-1">
          <button
            onClick={() => setActiveTab('existing')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'existing' ? 'bg-gradient-neon text-white shadow-neon' : 'text-text-dark-secondary hover:text-text-dark-primary'
            }`}
          >
            <Icon name="FileTemplate" size={16} />
            <span>Existing Templates</span>
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'create' ? 'bg-gradient-neon text-white shadow-neon' : 'text-text-dark-secondary hover:text-text-dark-primary'
            }`}
          >
            <Icon name="Plus" size={16} />
            <span>Create New</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 overflow-y-auto bg-dark-elevated scrollbar-dark">
        {activeTab === 'existing' ? (
          /* Existing Templates */
          <div className="space-y-4">
            {roleTemplates.map(template => (
              <div key={template.id} className="bg-dark-secondary/20 border border-dark rounded-lg p-4 hover:border-neon-green transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg ${template.color} flex items-center justify-center text-white`}>
                      <Icon name="Users" size={20} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-text-dark-primary">{template.name}</h3>
                        <span className="px-2 py-1 text-xs font-medium bg-dark-elevated text-text-dark-secondary rounded">
                          {template.usageCount} users
                        </span>
                      </div>
                      
                      <p className="text-text-dark-secondary text-sm mb-3">{template.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {template.permissions.slice(0, 4).map(permission => (
                          <span key={permission} className="px-2 py-1 text-xs bg-dark-secondary/30 text-neon-green rounded">
                            {permission.replace('-', ' ')}
                          </span>
                        ))}
                        {template.permissions.length > 4 && (
                          <span className="px-2 py-1 text-xs bg-dark-elevated text-text-dark-secondary rounded">
                            +{template.permissions.length - 4} more
                          </span>
                        )}
                      </div>
                      
                      <div className="text-xs text-text-dark-muted">
                        Created by {template.createdBy} • Last modified {template.lastModified}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDuplicateTemplate(template)}
                      className="p-2 text-text-dark-secondary hover:text-text-dark-primary rounded-lg hover:bg-dark-elevated transition-colors"
                      title="Duplicate template"
                    >
                      <Icon name="Copy" size={16} />
                    </button>
                    
                    <button
                      onClick={() => handleApplyTemplate(template)}
                      className="btn-primary-dark px-3 py-2 text-sm font-medium rounded-lg"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Create New Template */
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-dark-primary mb-2">
                  Template Name *
                </label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter template name..."
                  className="neumorphic-input w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-dark-primary mb-2">
                  Color Theme
                </label>
                <div className="flex space-x-2">
                  {colorOptions.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setNewTemplate(prev => ({ ...prev, color: color.value }))}
                      className={`w-8 h-8 rounded-lg ${color.class} border-2 transition-colors ${
                        newTemplate.color === color.value ? 'border-neon-green' : 'border-transparent'
                      }`}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-dark-primary mb-2">
                Description
              </label>
              <textarea
                value={newTemplate.description}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the role and its responsibilities..."
                className="neumorphic-input w-full"
                rows={3}
              />
            </div>
            
            {/* Permissions */}
            <div>
              <label className="block text-sm font-medium text-text-dark-primary mb-3">
                Permissions * ({newTemplate.permissions.length} selected)
              </label>
              
              <div className="space-y-4">
                {['Administration', 'Security', 'Compliance', 'Auditing', 'Reporting', 'Risk'].map(category => {
                  const categoryPermissions = availablePermissions.filter(p => p.category === category);
                  
                  return (
                    <div key={category} className="bg-dark-secondary/20 border border-dark rounded-lg">
                      <div className="p-3 bg-dark-secondary/30 border-b border-dark">
                        <h4 className="font-medium text-text-dark-primary">{category}</h4>
                      </div>
                      <div className="p-3 space-y-2">
                        {categoryPermissions.map(permission => (
                          <label key={permission.id} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={newTemplate.permissions.includes(permission.id)}
                              onChange={() => handlePermissionToggle(permission.id)}
                              className="h-4 w-4 text-neon-green focus:ring-neon-green border-dark rounded"
                            />
                            <span className="text-sm text-text-dark-primary">{permission.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-dark bg-dark-secondary/20 flex-shrink-0">
        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="btn-secondary-dark px-4 py-2 border border-dark text-text-dark-secondary rounded-lg font-medium hover:text-text-dark-primary hover:bg-dark-elevated transition-colors"
          >
            Cancel
          </button>
          
          {activeTab === 'create' && (
            <button
              onClick={handleCreateTemplate}
              disabled={!newTemplate.name || newTemplate.permissions.length === 0}
              className="btn-primary-dark px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Template
            </button>
          )}
        </div>
      </div>
    </ModalPortal>
  );
};

export default RoleTemplateModal;