// src/pages/system-configuration-dashboard/components/GeneralSettings.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Select } from '../../../components/ui/Dropdown';

const GeneralSettings = ({ userRole, onConfigChange }) => {
  const [settings, setSettings] = useState({
    systemName: 'ComplianceHub Platform',
    timezone: 'UTC-05:00 (Eastern Time)',
    language: 'English (US)', 
    dateFormat: 'MM/DD/YYYY',
    sessionTimeout: '30',
    enableMaintenance: false,
    maintenanceMessage: 'System maintenance in progress. Please try again later.',
    autoLogout: true,
    auditLogging: true,
    encryptionLevel: 'AES-256',
    passwordPolicy: 'strict',
    twoFactorAuth: true
  });

  const hasFullAccess = userRole === 'System Administrator';

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    onConfigChange?.();
  };

  const handleToggle = (field) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field] }));
    onConfigChange?.();
  };

  // Dropdown options
  const timezoneOptions = [
    { value: 'UTC-05:00 (Eastern Time)', label: 'UTC-05:00 (Eastern Time)' },
    { value: 'UTC-06:00 (Central Time)', label: 'UTC-06:00 (Central Time)' },
    { value: 'UTC-07:00 (Mountain Time)', label: 'UTC-07:00 (Mountain Time)' },
    { value: 'UTC-08:00 (Pacific Time)', label: 'UTC-08:00 (Pacific Time)' },
    { value: 'UTC+00:00 (GMT)', label: 'UTC+00:00 (GMT)' },
    { value: 'UTC+01:00 (CET)', label: 'UTC+01:00 (CET)' },
    { value: 'UTC+02:00 (EET)', label: 'UTC+02:00 (EET)' },
    { value: 'UTC+03:00 (MSK)', label: 'UTC+03:00 (MSK)' },
    { value: 'UTC+05:30 (IST)', label: 'UTC+05:30 (IST)' },
    { value: 'UTC+08:00 (CST)', label: 'UTC+08:00 (CST)' },
    { value: 'UTC+09:00 (JST)', label: 'UTC+09:00 (JST)' },
    { value: 'UTC+10:00 (AEST)', label: 'UTC+10:00 (AEST)' }
  ];

  const languageOptions = [
    { value: 'English (US)', label: 'English (US)' },
    { value: 'English (UK)', label: 'English (UK)' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'German', label: 'German' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Portuguese', label: 'Portuguese' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Chinese (Simplified)', label: 'Chinese (Simplified)' },
    { value: 'Chinese (Traditional)', label: 'Chinese (Traditional)' }
  ];

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
    { value: 'DD-MMM-YYYY', label: 'DD-MMM-YYYY' },
    { value: 'MMM DD, YYYY', label: 'MMM DD, YYYY' },
    { value: 'DD MMM YYYY', label: 'DD MMM YYYY' }
  ];

  const passwordPolicyOptions = [
    { value: 'basic', label: 'Basic (8+ characters)' },
    { value: 'standard', label: 'Standard (8+ chars, mixed case)' },
    { value: 'strict', label: 'Strict (12+ chars, mixed case, numbers, symbols)' },
    { value: 'enterprise', label: 'Enterprise (16+ chars, all requirements)' }
  ];

  const SettingRow = ({ label, children, description, restricted = false }) => (
    <div className={`neumorphic-card p-4 ${
      restricted && !hasFullAccess ? 'opacity-50' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <label className="text-sm font-medium text-text-dark-primary">{label}</label>
            {restricted && !hasFullAccess && (
              <Icon name="Lock" size={14} className="text-text-dark-secondary" />
            )}
          </div>
          {description && (
            <p className="text-xs text-text-dark-secondary mb-2">{description}</p>
          )}
        </div>
        <div className="ml-4" style={{ minWidth: '200px' }}>
          {restricted && !hasFullAccess ? (
            <span className="text-sm text-text-dark-secondary">Restricted</span>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Basic Configuration */}
      <div>
        <h3 className="text-lg font-semibold text-text-dark-primary mb-6 mt-8 flex items-center space-x-2 px-4">
          <Icon name="Settings" size={20} />
          <span>Basic Configuration</span>
        </h3>
        
        <div className="space-y-4">
          <SettingRow 
            label="System Name" 
            description="Display name for the compliance platform"
            restricted={true}
          >
            <input
              type="text"
              value={settings.systemName}
              onChange={(e) => handleInputChange('systemName', e.target.value)}
              className="neumorphic-input px-3 py-2 text-sm w-full"
              disabled={!hasFullAccess}
            />
          </SettingRow>
          
          <SettingRow 
            label="Default Timezone" 
            description="System-wide timezone for dates and scheduling"
          >
            <Select
              value={settings.timezone}
              onChange={(value) => handleInputChange('timezone', value)}
              options={timezoneOptions}
              placeholder="Select timezone"
              disabled={!hasFullAccess}
              width="100%"
            />
          </SettingRow>
          
          <SettingRow 
            label="Language" 
            description="Default language for user interfaces"
          >
            <Select
              value={settings.language}
              onChange={(value) => handleInputChange('language', value)}
              options={languageOptions}
              placeholder="Select language"
              disabled={!hasFullAccess}
              width="100%"
            />
          </SettingRow>
          
          <SettingRow 
            label="Date Format" 
            description="Default date display format"
          >
            <Select
              value={settings.dateFormat}
              onChange={(value) => handleInputChange('dateFormat', value)}
              options={dateFormatOptions}
              placeholder="Select date format"
              disabled={!hasFullAccess}
              width="100%"
            />
          </SettingRow>
        </div>
      </div>

      {/* Security Settings */}
      <div>
        <h3 className="text-lg font-semibold text-text-dark-primary mb-6 mt-8 flex items-center space-x-2 px-4">
          <Icon name="Shield" size={20} />
          <span>Security Settings</span>
        </h3>
        
        <div className="space-y-4">
          <SettingRow 
            label="Session Timeout" 
            description="Automatic logout after inactivity (minutes)"
            restricted={true}
          >
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
              className="neumorphic-input px-3 py-2 text-sm w-full"
              min="5"
              max="480"
              disabled={!hasFullAccess}
            />
          </SettingRow>
          
          <SettingRow 
            label="Password Policy" 
            description="Complexity requirements for user passwords"
            restricted={true}
          >
            <Select
              value={settings.passwordPolicy}
              onChange={(value) => handleInputChange('passwordPolicy', value)}
              options={passwordPolicyOptions}
              placeholder="Select password policy"
              disabled={!hasFullAccess}
              width="100%"
            />
          </SettingRow>
          
          <SettingRow 
            label="Two-Factor Authentication" 
            description="Require 2FA for all user accounts"
            restricted={true}
          >
            <button
              onClick={() => hasFullAccess && handleToggle('twoFactorAuth')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.twoFactorAuth ? 'bg-neon-green' : 'bg-dark-surface'
              } ${!hasFullAccess ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={!hasFullAccess}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </SettingRow>
          
          <SettingRow 
            label="Audit Logging" 
            description="Log all user activities and system changes"
            restricted={true}
          >
            <button
              onClick={() => hasFullAccess && handleToggle('auditLogging')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.auditLogging ? 'bg-neon-green' : 'bg-dark-surface'
              } ${!hasFullAccess ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={!hasFullAccess}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.auditLogging ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </SettingRow>
        </div>
      </div>

      {/* System Maintenance */}
      <div>
        <h3 className="text-lg font-semibold text-text-dark-primary mb-6 mt-8 flex items-center space-x-2 px-4">
          <Icon name="Tool" size={20} />
          <span>System Maintenance</span>
        </h3>
        
        <div className="space-y-4">
          <SettingRow 
            label="Maintenance Mode" 
            description="Enable maintenance mode to restrict user access"
            restricted={true}
          >
            <div className="flex items-center space-x-3">
              <button
                onClick={() => hasFullAccess && handleToggle('enableMaintenance')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableMaintenance ? 'bg-warning-dark' : 'bg-dark-surface'
                } ${!hasFullAccess ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={!hasFullAccess}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableMaintenance ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              {settings.enableMaintenance && (
                <span className="text-sm text-warning-dark font-medium">Active</span>
              )}
            </div>
          </SettingRow>
          
          {settings.enableMaintenance && (
            <SettingRow 
              label="Maintenance Message" 
              description="Message displayed to users during maintenance"
              restricted={true}
            >
              <textarea
                value={settings.maintenanceMessage}
                onChange={(e) => handleInputChange('maintenanceMessage', e.target.value)}
                className="neumorphic-input px-3 py-2 text-sm w-full h-20 resize-none"
                disabled={!hasFullAccess}
                placeholder="Enter maintenance message..."
              />
            </SettingRow>
          )}
        </div>
      </div>

      {/* Save Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-dark-surface">
        <div className="text-sm text-text-dark-secondary">
          {hasFullAccess ? 'You have full administrative access' : 'Limited configuration access'}
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            Reset to Defaults
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            iconName="Save"
            disabled={!hasFullAccess}
          >
            Save Configuration
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;