// src/pages/user-role-administration/components/EmergencyAccessModal.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import ModalPortal from '../../../components/ui/ModalPortal';

const EmergencyAccessModal = ({ isOpen, onClose }) => {
  const [accessType, setAccessType] = useState('temporary');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [duration, setDuration] = useState('1');
  const [justification, setJustification] = useState('');
  const [approvalRequired, setApprovalRequired] = useState(true);
  const [notifyUsers, setNotifyUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emergencyUsers = [
    { id: 'sarah.johnson', name: 'Sarah Johnson', role: 'Security Administrator', email: 'sarah.johnson@company.com' },
    { id: 'michael.chen', name: 'Michael Chen', role: 'Compliance Manager', email: 'michael.chen@company.com' },
    { id: 'david.wilson', name: 'David Wilson', role: 'HR Manager', email: 'david.wilson@company.com' },
    { id: 'kevin.lee', name: 'Kevin Lee', role: 'Auditor', email: 'kevin.lee@company.com' }
  ];

  const emergencyRoles = [
    { id: 'security-admin', name: 'Security Administrator', description: 'Full system access for security incidents' },
    { id: 'compliance-manager', name: 'Compliance Manager', description: 'Compliance oversight and reporting' },
    { id: 'system-admin', name: 'System Administrator', description: 'Complete system administration access' },
    { id: 'audit-admin', name: 'Audit Administrator', description: 'Advanced audit capabilities' }
  ];

  const durationOptions = [
    { value: '1', label: '1 Hour' },
    { value: '2', label: '2 Hours' },
    { value: '4', label: '4 Hours' },
    { value: '8', label: '8 Hours' },
    { value: '24', label: '24 Hours' },
    { value: '72', label: '72 Hours' }
  ];

  const notificationRecipients = [
    { id: 'security-team', name: 'Security Team', email: 'security@company.com' },
    { id: 'compliance-team', name: 'Compliance Team', email: 'compliance@company.com' },
    { id: 'it-admin', name: 'IT Administrator', email: 'it-admin@company.com' },
    { id: 'management', name: 'Management', email: 'management@company.com' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const emergencyAccess = {
      type: accessType,
      user: selectedUser,
      role: selectedRole,
      duration: duration,
      justification,
      approvalRequired,
      notifyUsers,
      timestamp: new Date().toISOString()
    };

    console.log('Emergency access request:', emergencyAccess);
    
    setIsSubmitting(false);
    onClose();
  };

  const handleNotifyUserToggle = (userId) => {
    setNotifyUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const isFormValid = selectedUser && selectedRole && justification.trim().length > 0;

  return (
    <ModalPortal
      isOpen={isOpen}
      onClose={onClose}
      title="Emergency Access Request"
      size="lg"
      className="animate-fadeIn"
    >
      {/* Description */}
      <div className="px-6 py-4 border-b border-dark bg-dark-secondary/10">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning-dark mt-0.5" />
          <div>
            <p className="text-text-dark-secondary">
              Emergency access should only be requested for critical security incidents or compliance requirements.
            </p>
            <p className="text-sm text-text-dark-muted mt-1">
              All emergency access requests are logged and subject to audit.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Access Type */}
          <div>
            <label className="block text-sm font-medium text-text-dark-primary mb-3">
              Access Type
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="accessType"
                  value="temporary"
                  checked={accessType === 'temporary'}
                  onChange={(e) => setAccessType(e.target.value)}
                  className="h-4 w-4 text-neon-green focus:ring-neon-green border-dark"
                />
                <div>
                  <span className="text-text-dark-primary font-medium">Temporary Role Elevation</span>
                  <p className="text-sm text-text-dark-secondary">Grant elevated permissions for a specific duration</p>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="accessType"
                  value="emergency"
                  checked={accessType === 'emergency'}
                  onChange={(e) => setAccessType(e.target.value)}
                  className="h-4 w-4 text-neon-green focus:ring-neon-green border-dark"
                />
                <div>
                  <span className="text-text-dark-primary font-medium">Emergency System Access</span>
                  <p className="text-sm text-text-dark-secondary">Immediate access for critical security incidents</p>
                </div>
              </label>
            </div>
          </div>

          {/* User Selection */}
          <div>
            <label className="block text-sm font-medium text-text-dark-primary mb-2">
              Select User *
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="neumorphic-input w-full"
              required
            >
              <option value="">Choose a user...</option>
              {emergencyUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.role})
                </option>
              ))}
            </select>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-text-dark-primary mb-2">
              Emergency Role *
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="neumorphic-input w-full"
              required
            >
              <option value="">Choose emergency role...</option>
              {emergencyRoles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name} - {role.description}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-text-dark-primary mb-2">
              Access Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="neumorphic-input w-full"
            >
              {durationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Justification */}
          <div>
            <label className="block text-sm font-medium text-text-dark-primary mb-2">
              Justification *
            </label>
            <textarea
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="Provide detailed justification for this emergency access request..."
              className="neumorphic-input w-full"
              rows={4}
              required
            />
          </div>

          {/* Approval Required */}
          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={approvalRequired}
                onChange={(e) => setApprovalRequired(e.target.checked)}
                className="h-4 w-4 text-neon-green focus:ring-neon-green border-dark rounded"
              />
              <div>
                <span className="text-text-dark-primary font-medium">Require Management Approval</span>
                <p className="text-sm text-text-dark-secondary">Access will be pending until approved by management</p>
              </div>
            </label>
          </div>

          {/* Notification Recipients */}
          <div>
            <label className="block text-sm font-medium text-text-dark-primary mb-3">
              Notify Teams ({notifyUsers.length} selected)
            </label>
            <div className="space-y-2">
              {notificationRecipients.map(recipient => (
                <label key={recipient.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyUsers.includes(recipient.id)}
                    onChange={() => handleNotifyUserToggle(recipient.id)}
                    className="h-4 w-4 text-neon-green focus:ring-neon-green border-dark rounded"
                  />
                  <div>
                    <span className="text-text-dark-primary">{recipient.name}</span>
                    <p className="text-sm text-text-dark-secondary">{recipient.email}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className="bg-warning-dark/10 border border-warning-dark/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning-dark mt-0.5" />
              <div>
                <h4 className="font-medium text-warning-dark">Important Notice</h4>
                <p className="text-sm text-text-dark-secondary mt-1">
                  Emergency access is automatically revoked after the specified duration. All actions performed during emergency access are logged and audited.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-dark bg-dark-secondary/20 flex-shrink-0">
          <div className="flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary-dark px-4 py-2 border border-dark text-text-dark-secondary rounded-lg font-medium hover:text-text-dark-primary hover:bg-dark-elevated transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="btn-primary-dark flex items-center space-x-2 px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Icon name="Shield" size={16} />
                  <span>Request Access</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </ModalPortal>
  );
};

export default EmergencyAccessModal;