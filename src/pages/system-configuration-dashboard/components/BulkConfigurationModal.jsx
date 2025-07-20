// src/pages/system-configuration-dashboard/components/BulkConfigurationModal.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkConfigurationModal = ({ isOpen, onClose, onBulkUpdate }) => {
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedSettings, setSelectedSettings] = useState([]);
  const [backupEnabled, setBackupEnabled] = useState(true);
  const [scheduleUpdate, setScheduleUpdate] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const [updateMode, setUpdateMode] = useState('merge'); // merge, replace, selective
  const [isProcessing, setIsProcessing] = useState(false);

  const departments = [
    { id: 'finance', name: 'Finance', userCount: 45, currentSettings: 'Standard' },
    { id: 'hr', name: 'Human Resources', userCount: 23, currentSettings: 'Compliance' },
    { id: 'it', name: 'Information Technology', userCount: 67, currentSettings: 'Security Enhanced' },
    { id: 'legal', name: 'Legal & Compliance', userCount: 12, currentSettings: 'Strict Compliance' },
    { id: 'operations', name: 'Operations', userCount: 89, currentSettings: 'Standard' },
    { id: 'sales', name: 'Sales & Marketing', userCount: 134, currentSettings: 'Basic' }
  ];

  const settingCategories = [
    {
      id: 'security',
      name: 'Security Settings',
      description: 'Authentication, session management, and access controls',
      settings: [
        { key: 'sessionTimeout', label: 'Session Timeout', current: '30 min', new: '45 min' },
        { key: 'twoFactorAuth', label: 'Two-Factor Authentication', current: 'Optional', new: 'Required' },
        { key: 'passwordPolicy', label: 'Password Policy', current: 'Standard', new: 'Strict' }
      ]
    },
    {
      id: 'notifications',
      name: 'Notification Rules',
      description: 'Alert preferences and communication settings',
      settings: [
        { key: 'emailNotifications', label: 'Email Notifications', current: 'Enabled', new: 'Enhanced' },
        { key: 'alertFrequency', label: 'Alert Frequency', current: 'Immediate', new: 'Batched' },
        { key: 'quietHours', label: 'Quiet Hours', current: 'None', new: '10 PM - 8 AM' }
      ]
    },
    {
      id: 'integration',
      name: 'Integration Settings',
      description: 'External system connections and sync preferences',
      settings: [
        { key: 'ldapSync', label: 'LDAP Synchronization', current: 'Hourly', new: 'Real-time' },
        { key: 'apiAccess', label: 'API Access Level', current: 'Read-only', new: 'Full Access' },
        { key: 'dataRetention', label: 'Data Retention', current: '1 year', new: '2 years' }
      ]
    }
  ];

  if (!isOpen) return null;

  const handleDepartmentToggle = (deptId) => {
    setSelectedDepartments(prev => 
      prev.includes(deptId) 
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    );
  };

  const handleSettingToggle = (settingId) => {
    setSelectedSettings(prev => 
      prev.includes(settingId) 
        ? prev.filter(id => id !== settingId)
        : [...prev, settingId]
    );
  };

  const handleBulkUpdate = async () => {
    setIsProcessing(true);
    
    // Simulate bulk update process
    setTimeout(() => {
      setIsProcessing(false);
      onBulkUpdate?.();
      onClose();
    }, 3000);
  };

  const getTotalUsers = () => {
    return departments
      .filter(dept => selectedDepartments.includes(dept.id))
      .reduce((total, dept) => total + dept.userCount, 0);
  };

  const getTotalSettings = () => {
    return settingCategories
      .filter(category => selectedSettings.includes(category.id))
      .reduce((total, category) => total + category.settings.length, 0);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal">
      <div className="bg-surface rounded-lg shadow-modal max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex h-full max-h-[90vh]">
          {/* Department Selection */}
          <div className="w-1/3 border-r border-border flex flex-col">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
                <Icon name="Package" size={20} />
                <span>Bulk Configuration</span>
              </h3>
              <p className="text-sm text-text-secondary mt-1">Select departments and settings to update</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <h4 className="font-medium text-text-primary mb-4">Target Departments</h4>
              <div className="space-y-3">
                {departments.map((dept) => (
                  <label key={dept.id} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedDepartments.includes(dept.id)}
                      onChange={() => handleDepartmentToggle(dept.id)}
                      className="mt-1 text-primary focus:ring-primary"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-text-primary">{dept.name}</span>
                        <span className="text-xs text-text-secondary">{dept.userCount} users</span>
                      </div>
                      <div className="text-xs text-text-secondary mt-1">Current: {dept.currentSettings}</div>
                    </div>
                  </label>
                ))}
              </div>
              
              {selectedDepartments.length > 0 && (
                <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                  <div className="text-sm text-primary-700">
                    <strong>{selectedDepartments.length}</strong> departments selected
                  </div>
                  <div className="text-sm text-primary-600">
                    <strong>{getTotalUsers()}</strong> users affected
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Settings Selection */}
          <div className="w-1/3 border-r border-border flex flex-col">
            <div className="p-6 border-b border-border">
              <h4 className="font-medium text-text-primary mb-4">Configuration Categories</h4>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {settingCategories.map((category) => (
                  <div key={category.id}>
                    <label className="flex items-start space-x-3 cursor-pointer mb-2">
                      <input
                        type="checkbox"
                        checked={selectedSettings.includes(category.id)}
                        onChange={() => handleSettingToggle(category.id)}
                        className="mt-1 text-primary focus:ring-primary"
                      />
                      <div>
                        <div className="font-medium text-text-primary">{category.name}</div>
                        <div className="text-xs text-text-secondary">{category.description}</div>
                        <div className="text-xs text-text-secondary mt-1">
                          {category.settings.length} settings
                        </div>
                      </div>
                    </label>
                    
                    {selectedSettings.includes(category.id) && (
                      <div className="ml-6 space-y-2">
                        {category.settings.map((setting, index) => (
                          <div key={index} className="text-xs bg-secondary-50 rounded p-2">
                            <div className="font-medium text-text-primary">{setting.label}</div>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-text-secondary">Current: {setting.current}</span>
                              <span className="text-primary">→ {setting.new}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Configuration Options */}
          <div className="w-1/3 flex flex-col">
            <div className="p-6 border-b border-border">
              <h4 className="font-medium text-text-primary mb-4">Update Options</h4>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Update Mode */}
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-3">Update Mode</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="updateMode"
                        value="merge"
                        checked={updateMode === 'merge'}
                        onChange={(e) => setUpdateMode(e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="text-sm font-medium text-text-primary">Merge</span>
                        <p className="text-xs text-text-secondary">Update only selected settings, keep others unchanged</p>
                      </div>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="updateMode"
                        value="replace"
                        checked={updateMode === 'replace'}
                        onChange={(e) => setUpdateMode(e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="text-sm font-medium text-text-primary">Replace</span>
                        <p className="text-xs text-text-secondary">Replace all settings with new configuration</p>
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* Backup Option */}
                <div>
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-text-primary">Create Backup</span>
                      <p className="text-xs text-text-secondary">Automatically backup current settings before update</p>
                    </div>
                    <button
                      onClick={() => setBackupEnabled(!backupEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        backupEnabled ? 'bg-primary' : 'bg-secondary-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          backupEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </label>
                </div>
                
                {/* Schedule Option */}
                <div>
                  <label className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-sm font-medium text-text-primary">Schedule Update</span>
                      <p className="text-xs text-text-secondary">Apply changes during maintenance window</p>
                    </div>
                    <button
                      onClick={() => setScheduleUpdate(!scheduleUpdate)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        scheduleUpdate ? 'bg-primary' : 'bg-secondary-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          scheduleUpdate ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </label>
                  
                  {scheduleUpdate && (
                    <input
                      type="datetime-local"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  )}
                </div>
                
                {/* Update Summary */}
                <div className="bg-secondary-50 rounded-lg p-4">
                  <h5 className="text-sm font-medium text-text-primary mb-2">Update Summary</h5>
                  <div className="space-y-1 text-xs text-text-secondary">
                    <div>Departments: <span className="font-medium text-text-primary">{selectedDepartments.length}</span></div>
                    <div>Users affected: <span className="font-medium text-text-primary">{getTotalUsers()}</span></div>
                    <div>Settings changed: <span className="font-medium text-text-primary">{getTotalSettings()}</span></div>
                    <div>Mode: <span className="font-medium text-text-primary capitalize">{updateMode}</span></div>
                  </div>
                </div>
                
                {/* Warning */}
                {selectedDepartments.length > 0 && selectedSettings.length > 0 && (
                  <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                      <div>
                        <h6 className="text-sm font-medium text-warning-700">Bulk Update Warning</h6>
                        <p className="text-sm text-warning-600 mt-1">
                          This operation will affect {getTotalUsers()} users across {selectedDepartments.length} departments. 
                          {!backupEnabled && ' No backup will be created.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Actions */}
            <div className="p-6 border-t border-border">
              <div className="flex items-center justify-end space-x-3">
                <Button variant="outline" onClick={onClose} disabled={isProcessing}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  iconName="Package"
                  loading={isProcessing}
                  onClick={handleBulkUpdate}
                  disabled={selectedDepartments.length === 0 || selectedSettings.length === 0}
                >
                  {isProcessing ? 'Processing...' : (scheduleUpdate ? 'Schedule Update' : 'Apply Changes')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkConfigurationModal;