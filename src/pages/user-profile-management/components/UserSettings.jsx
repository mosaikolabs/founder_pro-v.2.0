import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const UserSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: true,
    darkMode: true,
    language: 'en',
    timezone: 'UTC-5',
    twoFactorAuth: false,
    sessionTimeout: '30',
    dataRetention: '90'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleSwitch = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const saveSettings = () => {
    // Save settings logic
    console.log('Settings saved:', settings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-dark-primary">User Settings</h1>
          <p className="text-text-dark-secondary mt-1">Manage your preferences and configurations</p>
        </div>
        <button
          onClick={saveSettings}
          className="px-6 py-3 bg-gradient-to-r from-neon-green to-neon-purple text-white rounded-xl font-medium hover:shadow-glow-neon transition-all duration-300"
        >
          Save Changes
        </button>
      </div>

      {/* Notifications Settings */}
      <div className="bg-gradient-to-br from-dark-secondary to-dark-surface p-6 rounded-xl border border-gray-700 shadow-neumorphic">
        <h2 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="Bell" size={20} className="mr-2" />
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-text-dark-primary font-medium">Email Notifications</label>
              <p className="text-text-dark-secondary text-sm">Receive notifications via email</p>
            </div>
            <button
              onClick={() => toggleSwitch('emailNotifications')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300
                ${settings.emailNotifications ? 'bg-gradient-to-r from-neon-green to-neon-purple' : 'bg-gray-600'}
              `}
            >
              <span className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
                ${settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'}
              `} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-text-dark-primary font-medium">Push Notifications</label>
              <p className="text-text-dark-secondary text-sm">Receive browser push notifications</p>
            </div>
            <button
              onClick={() => toggleSwitch('pushNotifications')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300
                ${settings.pushNotifications ? 'bg-gradient-to-r from-neon-green to-neon-purple' : 'bg-gray-600'}
              `}
            >
              <span className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
                ${settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'}
              `} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-text-dark-primary font-medium">SMS Notifications</label>
              <p className="text-text-dark-secondary text-sm">Receive notifications via SMS</p>
            </div>
            <button
              onClick={() => toggleSwitch('smsNotifications')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300
                ${settings.smsNotifications ? 'bg-gradient-to-r from-neon-green to-neon-purple' : 'bg-gray-600'}
              `}
            >
              <span className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
                ${settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'}
              `} />
            </button>
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-gradient-to-br from-dark-secondary to-dark-surface p-6 rounded-xl border border-gray-700 shadow-neumorphic">
        <h2 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="Palette" size={20} className="mr-2" />
          Appearance
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-text-dark-primary font-medium">Dark Mode</label>
              <p className="text-text-dark-secondary text-sm">Enable dark theme interface</p>
            </div>
            <button
              onClick={() => toggleSwitch('darkMode')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300
                ${settings.darkMode ? 'bg-gradient-to-r from-neon-green to-neon-purple' : 'bg-gray-600'}
              `}
            >
              <span className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
                ${settings.darkMode ? 'translate-x-6' : 'translate-x-1'}
              `} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-text-dark-primary font-medium">Language</label>
              <p className="text-text-dark-secondary text-sm">Select your preferred language</p>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="bg-dark-surface border border-gray-600 text-text-dark-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-green"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-text-dark-primary font-medium">Timezone</label>
              <p className="text-text-dark-secondary text-sm">Set your local timezone</p>
            </div>
            <select
              value={settings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
              className="bg-dark-surface border border-gray-600 text-text-dark-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-green"
            >
              <option value="UTC-5">UTC-5 (EST)</option>
              <option value="UTC-6">UTC-6 (CST)</option>
              <option value="UTC-7">UTC-7 (MST)</option>
              <option value="UTC-8">UTC-8 (PST)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-gradient-to-br from-dark-secondary to-dark-surface p-6 rounded-xl border border-gray-700 shadow-neumorphic">
        <h2 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2" />
          Security
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-text-dark-primary font-medium">Two-Factor Authentication</label>
              <p className="text-text-dark-secondary text-sm">Add an extra layer of security</p>
            </div>
            <button
              onClick={() => toggleSwitch('twoFactorAuth')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300
                ${settings.twoFactorAuth ? 'bg-gradient-to-r from-neon-green to-neon-purple' : 'bg-gray-600'}
              `}
            >
              <span className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300
                ${settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'}
              `} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-text-dark-primary font-medium">Session Timeout</label>
              <p className="text-text-dark-secondary text-sm">Auto-logout after inactivity (minutes)</p>
            </div>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
              className="w-20 bg-dark-surface border border-gray-600 text-text-dark-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-green"
              min="5"
              max="180"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-text-dark-primary font-medium">Data Retention</label>
              <p className="text-text-dark-secondary text-sm">Keep activity logs for (days)</p>
            </div>
            <input
              type="number"
              value={settings.dataRetention}
              onChange={(e) => handleSettingChange('dataRetention', e.target.value)}
              className="w-20 bg-dark-surface border border-gray-600 text-text-dark-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neon-green"
              min="30"
              max="365"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;