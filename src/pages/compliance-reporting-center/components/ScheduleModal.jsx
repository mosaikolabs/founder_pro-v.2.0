// src/pages/compliance-reporting-center/components/ScheduleModal.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ScheduleModal = ({ isOpen, onClose, reportData }) => {
  const [scheduleType, setScheduleType] = useState('one-time');
  const [scheduleSettings, setScheduleSettings] = useState({
    frequency: 'weekly',
    dayOfWeek: 'monday',
    dayOfMonth: '1',
    time: '09:00',
    timezone: 'America/New_York',
    startDate: '',
    endDate: '',
    format: 'pdf',
    recipients: []
  });
  const [recipientEmail, setRecipientEmail] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);

  const frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' }
  ];

  const daysOfWeek = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
  ];

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'UTC', label: 'UTC' }
  ];

  const predefinedRecipients = [
    { email: 'ceo@company.com', name: 'CEO', role: 'C-level Executive' },
    { email: 'cfo@company.com', name: 'CFO', role: 'C-level Executive' },
    { email: 'compliance@company.com', name: 'Compliance Team', role: 'Compliance Officer' },
    { email: 'audit@company.com', name: 'Audit Team', role: 'Risk Management Team' }
  ];

  const handleSettingChange = (setting, value) => {
    setScheduleSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const addRecipient = (email, name = '', role = '') => {
    if (email && !scheduleSettings.recipients.some(r => r.email === email)) {
      handleSettingChange('recipients', [
        ...scheduleSettings.recipients,
        { email, name, role }
      ]);
    }
  };

  const removeRecipient = (email) => {
    handleSettingChange('recipients', 
      scheduleSettings.recipients.filter(r => r.email !== email)
    );
  };

  const handleAddRecipient = () => {
    if (recipientEmail) {
      addRecipient(recipientEmail);
      setRecipientEmail('');
    }
  };

  const handleSchedule = async () => {
    setIsScheduling(true);
    try {
      // Simulate scheduling process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Scheduling report:', {
        type: scheduleType,
        settings: scheduleSettings,
        reportData
      });
      
      onClose();
    } catch (error) {
      console.error('Scheduling failed:', error);
    } finally {
      setIsScheduling(false);
    }
  };

  const getNextRunDate = () => {
    if (scheduleType === 'one-time') {
      return scheduleSettings.startDate ? new Date(scheduleSettings.startDate).toLocaleDateString() : 'Not set';
    }
    
    const now = new Date();
    let nextRun = new Date(now);
    
    switch (scheduleSettings.frequency) {
      case 'daily':
        nextRun.setDate(now.getDate() + 1);
        break;
      case 'weekly':
        const dayIndex = daysOfWeek.findIndex(d => d.value === scheduleSettings.dayOfWeek);
        const currentDay = now.getDay();
        const daysUntilTarget = (dayIndex + 1 - currentDay + 7) % 7 || 7;
        nextRun.setDate(now.getDate() + daysUntilTarget);
        break;
      case 'monthly':
        nextRun.setMonth(now.getMonth() + 1);
        nextRun.setDate(parseInt(scheduleSettings.dayOfMonth));
        break;
      case 'quarterly':
        nextRun.setMonth(now.getMonth() + 3);
        nextRun.setDate(1);
        break;
      default:
        return 'Unknown';
    }
    
    return nextRun.toLocaleDateString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-large max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Schedule Report
            </h2>
            <p className="text-text-secondary mt-1">
              Set up automated report generation and delivery
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg nav-transition"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Schedule Type */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">
              Schedule Type
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setScheduleType('one-time')}
                className={`p-4 rounded-lg border-2 cursor-pointer nav-transition ${
                  scheduleType === 'one-time' ?'border-primary bg-primary-50' :'border-border hover:border-primary-200 hover:bg-secondary-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    scheduleType === 'one-time' ?'bg-primary text-white' :'bg-secondary-100 text-text-secondary'
                  }`}>
                    <Icon name="Calendar" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">
                      One-time
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Generate and send once
                    </p>
                  </div>
                </div>
              </div>
              
              <div
                onClick={() => setScheduleType('recurring')}
                className={`p-4 rounded-lg border-2 cursor-pointer nav-transition ${
                  scheduleType === 'recurring' ?'border-primary bg-primary-50' :'border-border hover:border-primary-200 hover:bg-secondary-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    scheduleType === 'recurring' ?'bg-primary text-white' :'bg-secondary-100 text-text-secondary'
                  }`}>
                    <Icon name="Repeat" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">
                      Recurring
                    </h4>
                    <p className="text-xs text-text-secondary">
                      Automatic regular delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Settings */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">
              Schedule Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scheduleType === 'recurring' && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Frequency
                  </label>
                  <select
                    value={scheduleSettings.frequency}
                    onChange={(e) => handleSettingChange('frequency', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {frequencies.map(freq => (
                      <option key={freq.value} value={freq.value}>
                        {freq.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {scheduleType === 'recurring' && scheduleSettings.frequency === 'weekly' && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Day of Week
                  </label>
                  <select
                    value={scheduleSettings.dayOfWeek}
                    onChange={(e) => handleSettingChange('dayOfWeek', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {daysOfWeek.map(day => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              {scheduleType === 'recurring' && scheduleSettings.frequency === 'monthly' && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Day of Month
                  </label>
                  <select
                    value={scheduleSettings.dayOfMonth}
                    onChange={(e) => handleSettingChange('dayOfMonth', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {Array.from({ length: 28 }, (_, i) => i + 1).map(day => (
                      <option key={day} value={day.toString()}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={scheduleSettings.time}
                  onChange={(e) => handleSettingChange('time', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Timezone
                </label>
                <select
                  value={scheduleSettings.timezone}
                  onChange={(e) => handleSettingChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {timezones.map(tz => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  {scheduleType === 'one-time' ? 'Run Date' : 'Start Date'}
                </label>
                <input
                  type="date"
                  value={scheduleSettings.startDate}
                  onChange={(e) => handleSettingChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              {scheduleType === 'recurring' && (
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    End Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={scheduleSettings.endDate}
                    onChange={(e) => handleSettingChange('endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Recipients */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">
              Recipients
            </h3>
            
            {/* Quick Add Recipients */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Quick Add
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {predefinedRecipients.map(recipient => (
                  <button
                    key={recipient.email}
                    onClick={() => addRecipient(recipient.email, recipient.name, recipient.role)}
                    disabled={scheduleSettings.recipients.some(r => r.email === recipient.email)}
                    className="flex items-center justify-between p-2 border border-border rounded-lg text-sm hover:bg-secondary-50 nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="text-left">
                      <div className="font-medium text-text-primary">{recipient.name}</div>
                      <div className="text-text-secondary text-xs">{recipient.email}</div>
                    </div>
                    <Icon name="Plus" size={16} className="text-text-secondary" />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Custom Recipient */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Add Custom Recipient
              </label>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  onClick={handleAddRecipient}
                  disabled={!recipientEmail}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-700 nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* Recipients List */}
            {scheduleSettings.recipients.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Selected Recipients ({scheduleSettings.recipients.length})
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {scheduleSettings.recipients.map((recipient, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-secondary-50 rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-text-primary">
                          {recipient.name || recipient.email}
                        </div>
                        {recipient.name && (
                          <div className="text-xs text-text-secondary">{recipient.email}</div>
                        )}
                      </div>
                      <button
                        onClick={() => removeRecipient(recipient.email)}
                        className="p-1 text-text-secondary hover:text-error nav-transition"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Schedule Summary */}
          <div className="bg-secondary-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-text-primary mb-2">
              Schedule Summary
            </h4>
            <div className="space-y-1 text-sm text-text-secondary">
              <div>Type: {scheduleType === 'one-time' ? 'One-time delivery' : `Recurring ${scheduleSettings.frequency}`}</div>
              <div>Next run: {getNextRunDate()}</div>
              <div>Recipients: {scheduleSettings.recipients.length}</div>
              <div>Format: PDF</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-secondary-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border text-text-secondary rounded-lg font-medium hover:text-text-primary hover:bg-surface nav-transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSchedule}
            disabled={isScheduling || scheduleSettings.recipients.length === 0 || !scheduleSettings.startDate}
            className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isScheduling ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>Scheduling...</span>
              </>
            ) : (
              <>
                <Icon name="Clock" size={16} />
                <span>Schedule Report</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;