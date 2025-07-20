// src/pages/user-role-administration/components/PermissionConfiguration.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PermissionConfiguration = ({ selectedUser, users = [], expanded = false }) => {
  const [activeTab, setActiveTab] = useState('permissions');
  const [editMode, setEditMode] = useState(false);
  const [tempPermissions, setTempPermissions] = useState({});
  const [showInheritance, setShowInheritance] = useState(false);

  // Permission categories and their specific permissions
  const permissionMatrix = {
    'User Management': {
      icon: 'Users',
      permissions: [
        { id: 'user-view', name: 'View Users', description: 'View user directory and basic information' },
        { id: 'user-create', name: 'Create Users', description: 'Add new users to the system' },
        { id: 'user-edit', name: 'Edit Users', description: 'Modify user information and settings' },
        { id: 'user-delete', name: 'Delete Users', description: 'Remove users from the system' },
        { id: 'user-roles', name: 'Manage Roles', description: 'Assign and modify user roles' }
      ]
    },
    'Policy Management': {
      icon: 'FileText',
      permissions: [
        { id: 'policy-view', name: 'View Policies', description: 'Access and read policy documents' },
        { id: 'policy-create', name: 'Create Policies', description: 'Draft and submit new policies' },
        { id: 'policy-edit', name: 'Edit Policies', description: 'Modify existing policy documents' },
        { id: 'policy-approve', name: 'Approve Policies', description: 'Review and approve policy changes' },
        { id: 'policy-publish', name: 'Publish Policies', description: 'Make policies active and enforceable' }
      ]
    },
    'Audit & Compliance': {
      icon: 'Shield',
      permissions: [
        { id: 'audit-view', name: 'View Audits', description: 'Access audit reports and findings' },
        { id: 'audit-schedule', name: 'Schedule Audits', description: 'Plan and schedule audit activities' },
        { id: 'audit-conduct', name: 'Conduct Audits', description: 'Perform audit procedures and testing' },
        { id: 'compliance-dashboard', name: 'Compliance Dashboard', description: 'Access compliance metrics and KPIs' },
        { id: 'risk-assessment', name: 'Risk Assessment', description: 'Perform risk analysis and assessments' }
      ]
    },
    'Reporting': {
      icon: 'BarChart3',
      permissions: [
        { id: 'report-view', name: 'View Reports', description: 'Access standard reports and dashboards' },
        { id: 'report-create', name: 'Create Reports', description: 'Build custom reports and visualizations' },
        { id: 'report-export', name: 'Export Reports', description: 'Download reports in various formats' },
        { id: 'report-schedule', name: 'Schedule Reports', description: 'Set up automated report delivery' },
        { id: 'report-admin', name: 'Report Administration', description: 'Manage report templates and settings' }
      ]
    },
    'System Administration': {
      icon: 'Settings',
      permissions: [
        { id: 'system-config', name: 'System Configuration', description: 'Modify system settings and parameters' },
        { id: 'integration-manage', name: 'Integration Management', description: 'Configure external system integrations' },
        { id: 'backup-restore', name: 'Backup & Restore', description: 'Manage system backups and data recovery' },
        { id: 'security-settings', name: 'Security Settings', description: 'Configure security policies and controls' },
        { id: 'system-monitoring', name: 'System Monitoring', description: 'Monitor system health and performance' }
      ]
    }
  };

  // Role templates
  const roleTemplates = {
    'Security Administrator': {
      color: 'bg-error-dark',
      permissions: ['user-view', 'user-create', 'user-edit', 'user-roles', 'system-config', 'security-settings', 'system-monitoring']
    },
    'Compliance Manager': {
      color: 'bg-neon-blue',
      permissions: ['policy-view', 'policy-create', 'policy-edit', 'policy-approve', 'audit-view', 'audit-schedule', 'compliance-dashboard', 'report-view', 'report-create']
    },
    'Auditor': {
      color: 'bg-neon-purple',
      permissions: ['audit-view', 'audit-conduct', 'risk-assessment', 'report-view', 'report-create', 'report-export']
    },
    'Department User': {
      color: 'bg-success-dark',
      permissions: ['policy-view', 'compliance-dashboard', 'report-view']
    },
    'Report Analyst': {
      color: 'bg-warning-dark',
      permissions: ['report-view', 'report-create', 'report-export', 'report-schedule', 'compliance-dashboard']
    }
  };

  // Get user's current permissions (mock data)
  const getCurrentPermissions = () => {
    if (!selectedUser) return [];
    return selectedUser?.permissions || [];
  };

  const handlePermissionToggle = (permissionId) => {
    if (!editMode) return;
    
    const currentPermissions = getCurrentPermissions();
    const isGranted = currentPermissions.includes(permissionId);
    
    const newPermissions = isGranted
      ? currentPermissions.filter(p => p !== permissionId)
      : [...currentPermissions, permissionId];
      
    setTempPermissions({ ...tempPermissions, [selectedUser?.id]: newPermissions });
  };

  const handleSavePermissions = () => {
    // Here you would typically save to backend
    console.log('Saving permissions:', tempPermissions);
    setEditMode(false);
    setTempPermissions({});
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setTempPermissions({});
  };

  const applyRoleTemplate = (templateName) => {
    if (!selectedUser || !editMode) return;
    
    const template = roleTemplates[templateName];
    if (template) {
      setTempPermissions({ ...tempPermissions, [selectedUser.id]: template.permissions });
    }
  };

  const getEffectivePermissions = () => {
    if (!selectedUser) return [];
    return tempPermissions[selectedUser.id] || getCurrentPermissions();
  };

  const isPermissionGranted = (permissionId) => {
    return getEffectivePermissions().includes(permissionId);
  };

  const getPermissionSource = (permissionId) => {
    // Mock inheritance logic
    if (selectedUser?.department === 'IT Security' && permissionId.includes('security')) {
      return 'Inherited from IT Security Department';
    }
    if (selectedUser?.currentRole && roleTemplates[selectedUser.currentRole]?.permissions.includes(permissionId)) {
      return `Inherited from ${selectedUser.currentRole} role`;
    }
    return 'Direct assignment';
  };

  const tabs = [
    { id: 'permissions', name: 'Permissions', icon: 'Lock' },
    { id: 'inheritance', name: 'Inheritance', icon: 'GitBranch' },
    { id: 'history', name: 'History', icon: 'History' }
  ];

  if (!selectedUser) {
    return (
      <div className="neumorphic-card p-8 text-center">
        <Icon name="UserCog" size={48} className="mx-auto text-text-dark-secondary mb-4" />
        <h3 className="text-lg font-medium text-text-dark-primary mb-2">Select a User</h3>
        <p className="text-text-dark-secondary">
          Choose a user from the directory to view and manage their permissions
        </p>
      </div>
    );
  }

  return (
    <div className="neumorphic-card">
      {/* Header */}
      <div className="p-4 border-b border-dark-surface">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-dark-elevated">
              <img
                src={selectedUser?.avatar || 'https://images.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                alt={selectedUser?.name || 'User'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
                }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-dark-primary">
                {selectedUser?.name || 'Unknown User'}
              </h3>
              <p className="text-sm text-text-dark-secondary">
                {selectedUser?.email || 'No email'} • {selectedUser?.department || 'No department'}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  roleTemplates[selectedUser?.currentRole]?.color || 'bg-text-dark-muted'
                } text-white`}>
                  {selectedUser?.currentRole || 'No role assigned'}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  selectedUser?.status === 'active' ? 'bg-success-dark' : 'bg-text-dark-muted'
                } text-white`}>
                  {selectedUser?.status || 'unknown'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {editMode ? (
              <>
                <button
                  onClick={handleCancelEdit}
                  className="btn-secondary-dark"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePermissions}
                  className="btn-primary-dark"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="btn-primary-dark inline-flex items-center space-x-2"
              >
                <Icon name="Edit" size={16} />
                <span>Edit Permissions</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center neumorphic-card-inset p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-neon-green to-neon-purple text-white shadow-glow-neon'
                  : 'text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated hover:bg-opacity-30'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className={`${expanded ? 'max-h-[800px]' : 'max-h-[600px]'} overflow-y-auto scrollbar-dark`}>
        {activeTab === 'permissions' && (
          <div className="p-4">
            {/* Role Templates (shown in edit mode) */}
            {editMode && (
              <div className="mb-6 p-4 neumorphic-card-inset">
                <h4 className="text-sm font-medium text-text-dark-primary mb-3">Quick Apply Role Template</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(roleTemplates).map(([templateName, template]) => (
                    <button
                      key={templateName}
                      onClick={() => applyRoleTemplate(templateName)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all hover:opacity-90 ${
                        template.color
                      } text-white`}
                    >
                      {templateName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Permission Matrix */}
            <div className="space-y-6">
              {Object.entries(permissionMatrix).map(([category, categoryData]) => {
                const categoryPermissions = categoryData.permissions;
                const grantedCount = categoryPermissions.filter(p => isPermissionGranted(p.id)).length;
                
                return (
                  <div key={category} className="neumorphic-card border border-dark-surface">
                    {/* Category Header */}
                    <div className="p-4 bg-dark-elevated border-b border-dark-surface">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon name={categoryData.icon} size={20} className="text-neon-green" />
                          <div>
                            <h4 className="font-medium text-text-dark-primary">{category}</h4>
                            <p className="text-sm text-text-dark-secondary">
                              {grantedCount} of {categoryPermissions.length} permissions granted
                            </p>
                          </div>
                        </div>
                        
                        {/* Category progress */}
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-dark-surface rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-neon-green to-neon-purple transition-all duration-300"
                              style={{ width: `${(grantedCount / categoryPermissions.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-text-dark-secondary">
                            {Math.round((grantedCount / categoryPermissions.length) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Permissions */}
                    <div className="divide-y divide-dark-surface">
                      {categoryPermissions.map((permission) => {
                        const isGranted = isPermissionGranted(permission.id);
                        const source = showInheritance ? getPermissionSource(permission.id) : null;
                        
                        return (
                          <div key={permission.id} className="p-4 hover:bg-dark-elevated hover:bg-opacity-30 transition-colors">
                            <div className="flex items-start space-x-3">
                              <div className="flex items-center pt-1">
                                <input
                                  type="checkbox"
                                  checked={isGranted}
                                  onChange={() => handlePermissionToggle(permission.id)}
                                  disabled={!editMode}
                                  className="h-4 w-4 text-neon-green focus:ring-neon-green border-dark-surface rounded disabled:opacity-50 bg-dark-surface"
                                />
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-medium text-text-dark-primary">
                                    {permission.name}
                                  </h5>
                                  {isGranted && (
                                    <span className="px-2 py-1 text-xs font-medium bg-success-dark text-white rounded-full">
                                      Granted
                                    </span>
                                  )}
                                </div>
                                
                                <p className="text-sm text-text-dark-secondary mt-1">
                                  {permission.description}
                                </p>
                                
                                {showInheritance && source && isGranted && (
                                  <p className="text-xs text-neon-purple mt-2 flex items-center space-x-1">
                                    <Icon name="Info" size={12} />
                                    <span>{source}</span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Show Inheritance Toggle */}
            <div className="mt-6 p-4 neumorphic-card-inset">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showInheritance}
                  onChange={(e) => setShowInheritance(e.target.checked)}
                  className="h-4 w-4 text-neon-green focus:ring-neon-green border-dark-surface rounded bg-dark-surface"
                />
                <span className="text-sm font-medium text-text-dark-primary">
                  Show permission inheritance sources
                </span>
              </label>
            </div>
          </div>
        )}
        
        {activeTab === 'inheritance' && (
          <div className="p-4">
            <div className="text-center py-8">
              <Icon name="GitBranch" size={48} className="mx-auto text-text-dark-secondary mb-4" />
              <h3 className="text-lg font-medium text-text-dark-primary mb-2">Permission Inheritance</h3>
              <p className="text-text-dark-secondary">
                This view shows how permissions are inherited from roles and organizational hierarchy
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="p-4">
            <div className="text-center py-8">
              <Icon name="History" size={48} className="mx-auto text-text-dark-secondary mb-4" />
              <h3 className="text-lg font-medium text-text-dark-primary mb-2">Permission History</h3>
              <p className="text-text-dark-secondary">
                View audit trail of all permission changes and modifications
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionConfiguration;