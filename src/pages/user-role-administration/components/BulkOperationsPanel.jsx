// src/pages/user-role-administration/components/BulkOperationsPanel.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BulkOperationsPanel = ({ selectedUsers = [], onClearSelection, users = [] }) => {
  const [activeOperation, setActiveOperation] = useState(null);
  const [bulkRole, setBulkRole] = useState('');
  const [bulkDepartment, setBulkDepartment] = useState('');
  const [bulkStatus, setBulkStatus] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);

  const selectedUserData = users.filter(user => selectedUsers.includes(user?.id));
  
  const operations = [
    {
      id: 'assign-role',
      name: 'Assign Role',
      icon: 'UserCheck',
      description: 'Assign a role to selected users',
      color: 'bg-neon-green'
    },
    {
      id: 'change-department',
      name: 'Change Department',
      icon: 'Building',
      description: 'Move users to a different department',
      color: 'bg-neon-blue'
    },
    {
      id: 'update-status',
      name: 'Update Status',
      icon: 'ToggleLeft',
      description: 'Change user status (active/inactive)',
      color: 'bg-warning-dark'
    },
    {
      id: 'revoke-access',
      name: 'Revoke Access',
      icon: 'UserX',
      description: 'Temporarily suspend user access',
      color: 'bg-error-dark'
    },
    {
      id: 'reset-passwords',
      name: 'Reset Passwords',
      icon: 'Key',
      description: 'Force password reset for selected users',
      color: 'bg-neon-purple'
    },
    {
      id: 'export-users',
      name: 'Export Data',
      icon: 'Download',
      description: 'Export selected user data',
      color: 'bg-success-dark'
    }
  ];

  const roles = [
    'Security Administrator',
    'Compliance Manager',
    'Department User',
    'Auditor',
    'Report Analyst',
    'Guest User'
  ];

  const departments = [
    'IT Security',
    'Compliance',
    'Finance',
    'HR',
    'Operations',
    'Legal'
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'pending', label: 'Pending' }
  ];

  const handleOperationClick = (operationId) => {
    setActiveOperation(operationId);
  };

  const handleConfirmAction = () => {
    if (!activeOperation) return;

    // Here you would typically call an API to perform the bulk operation
    console.log('Performing bulk operation:', {
      operation: activeOperation,
      userIds: selectedUsers,
      params: {
        role: bulkRole,
        department: bulkDepartment,
        status: bulkStatus
      }
    });

    // Reset state
    setActiveOperation(null);
    setConfirmAction(null);
    setBulkRole('');
    setBulkDepartment('');
    setBulkStatus('');
    onClearSelection?.();
  };

  const handleCancelOperation = () => {
    setActiveOperation(null);
    setConfirmAction(null);
    setBulkRole('');
    setBulkDepartment('');
    setBulkStatus('');
  };

  const renderOperationForm = () => {
    switch (activeOperation) {
      case 'assign-role':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-dark-primary mb-2">
                Select Role to Assign
              </label>
              <select
                value={bulkRole}
                onChange={(e) => setBulkRole(e.target.value)}
                className="input-dark w-full"
              >
                <option value="">Choose a role...</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div className="neumorphic-card p-3 bg-gradient-to-r from-dark-secondary to-dark-surface">
              <p className="text-sm text-text-dark-secondary">
                This will assign the selected role to {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''}.
                Existing role assignments will be replaced.
              </p>
            </div>
          </div>
        );
      
      case 'change-department':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-dark-primary mb-2">
                Select New Department
              </label>
              <select
                value={bulkDepartment}
                onChange={(e) => setBulkDepartment(e.target.value)}
                className="input-dark w-full"
              >
                <option value="">Choose a department...</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="neumorphic-card p-3 bg-gradient-to-r from-dark-secondary to-dark-surface">
              <p className="text-sm text-text-dark-secondary">
                Moving {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} to the selected department.
                This may affect their inherited permissions.
              </p>
            </div>
          </div>
        );
      
      case 'update-status':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-dark-primary mb-2">
                Select New Status
              </label>
              <select
                value={bulkStatus}
                onChange={(e) => setBulkStatus(e.target.value)}
                className="input-dark w-full"
              >
                <option value="">Choose a status...</option>
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>
            <div className="neumorphic-card p-3 bg-gradient-to-r from-dark-secondary to-dark-surface">
              <p className="text-sm text-text-dark-secondary">
                Updating status for {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''}.
                This will immediately affect their access to the system.
              </p>
            </div>
          </div>
        );
      
      case 'revoke-access':
        return (
          <div className="space-y-4">
            <div className="neumorphic-card p-4 bg-gradient-to-r from-error-dark/20 to-error-dark/10 border border-error-dark/30">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-error-dark flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-error-dark mb-1">Revoke Access Confirmation</h4>
                  <p className="text-sm text-text-dark-secondary">
                    This will immediately suspend access for {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''}.
                    They will be unable to log in until access is restored.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark-primary mb-2">
                Reason for Access Revocation
              </label>
              <textarea
                placeholder="Provide a reason for revoking access (optional)..."
                className="input-dark w-full resize-none"
                rows={3}
              />
            </div>
          </div>
        );
      
      case 'reset-passwords':
        return (
          <div className="space-y-4">
            <div className="neumorphic-card p-3 bg-gradient-to-r from-warning-dark/20 to-warning-dark/10 border border-warning-dark/30">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-warning-dark flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-warning-dark mb-1">Password Reset Information</h4>
                  <p className="text-sm text-text-dark-secondary">
                    This will force a password reset for {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''}.
                    They will receive an email with reset instructions.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="dropdown-checkbox"
                  defaultChecked
                />
                <span className="text-sm text-text-dark-primary">Send email notification to users</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="dropdown-checkbox"
                />
                <span className="text-sm text-text-dark-primary">Require immediate password change on next login</span>
              </label>
            </div>
          </div>
        );
      
      case 'export-users':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-dark-primary mb-2">
                Export Format
              </label>
              <select className="input-dark w-full">
                <option value="csv">CSV (Comma Separated Values)</option>
                <option value="xlsx">Excel (XLSX)</option>
                <option value="pdf">PDF Report</option>
                <option value="json">JSON Data</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-dark-primary mb-2">
                Include Fields
              </label>
              <div className="space-y-2 max-h-32 overflow-y-auto dark-scrollbar">
                {[
                  'Basic Information',
                  'Contact Details',
                  'Role Assignments',
                  'Permission Details',
                  'Last Login Information',
                  'Department Information',
                  'Status and Notes'
                ].map(field => (
                  <label key={field} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="dropdown-checkbox"
                      defaultChecked
                    />
                    <span className="text-sm text-text-dark-primary">{field}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getOperationButtonState = () => {
    switch (activeOperation) {
      case 'assign-role':
        return !bulkRole;
      case 'change-department':
        return !bulkDepartment;
      case 'update-status':
        return !bulkStatus;
      default:
        return false;
    }
  };

  return (
    <div className="neumorphic-card mb-6">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-dark-secondary to-dark-surface rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={20} className="text-neon-green" />
            <div>
              <h3 className="font-semibold text-text-dark-primary">
                Bulk Operations
              </h3>
              <p className="text-sm text-text-dark-secondary">
                {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          </div>
          
          <button
            onClick={onClearSelection}
            className="flex items-center space-x-1 px-3 py-1 text-sm text-text-dark-secondary hover:text-text-dark-primary border border-white/10 rounded-lg hover:bg-dark-elevated/30 transition-colors"
          >
            <Icon name="X" size={14} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Selected Users Preview */}
      <div className="p-4 border-b border-white/10">
        <h4 className="text-sm font-medium text-text-dark-primary mb-2">Selected Users:</h4>
        <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto dark-scrollbar">
          {selectedUserData.map(user => (
            <div key={user?.id} className="flex items-center space-x-2 px-2 py-1 bg-gradient-to-r from-dark-elevated to-dark-surface rounded-lg border border-white/10">
              <div className="w-5 h-5 rounded-full overflow-hidden bg-dark-surface">
                <img
                  src={user?.avatar || 'https://images.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                  alt={user?.name || 'User'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
                  }}
                />
              </div>
              <span className="text-xs text-text-dark-primary">{user?.name || 'Unknown'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Operations */}
      <div className="p-4">
        {!activeOperation ? (
          /* Operation Selection */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {operations.map(operation => (
              <button
                key={operation.id}
                onClick={() => handleOperationClick(operation.id)}
                className={`p-4 text-left border border-white/10 rounded-lg hover:shadow-neumorphic-hover transition-all group bg-gradient-to-br from-dark-surface to-dark-elevated ${
                  operation.id === 'revoke-access' ? 'hover:border-error-dark/50' : 'hover:border-neon-green/30'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg ${operation.color} text-white group-hover:scale-110 transition-transform shadow-glow-neon`}>
                    <Icon name={operation.icon} size={16} />
                  </div>
                  <h4 className="font-medium text-text-dark-primary">{operation.name}</h4>
                </div>
                <p className="text-sm text-text-dark-secondary">{operation.description}</p>
              </button>
            ))}
          </div>
        ) : (
          /* Operation Form */
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCancelOperation}
                className="p-2 text-text-dark-secondary hover:text-text-dark-primary rounded-lg hover:bg-dark-elevated/30 transition-colors"
              >
                <Icon name="ArrowLeft" size={16} />
              </button>
              <div>
                <h4 className="font-medium text-text-dark-primary">
                  {operations.find(op => op.id === activeOperation)?.name}
                </h4>
                <p className="text-sm text-text-dark-secondary">
                  {operations.find(op => op.id === activeOperation)?.description}
                </p>
              </div>
            </div>
            
            {renderOperationForm()}
            
            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
              <button
                onClick={handleCancelOperation}
                className="btn-secondary-dark"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                disabled={getOperationButtonState()}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeOperation === 'revoke-access' ?'bg-gradient-to-r from-error-dark to-error-dark/80 text-white hover:from-error-dark/90 hover:to-error-dark/70 disabled:opacity-50 shadow-glow-neon' :'btn-primary-dark disabled:opacity-50'
                } disabled:cursor-not-allowed`}
              >
                {activeOperation === 'export-users' ? 'Download' : 'Confirm'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkOperationsPanel;