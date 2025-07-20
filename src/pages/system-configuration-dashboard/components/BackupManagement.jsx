// src/pages/system-configuration-dashboard/components/BackupManagement.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BackupManagement = ({ onConfigChange }) => {
  const [backupSchedules, setBackupSchedules] = useState([
    {
      id: 'daily-full',
      name: 'Daily Full Backup',
      type: 'full',
      frequency: 'daily',
      time: '02:00',
      enabled: true,
      lastRun: '2024-01-15 02:00:00',
      status: 'completed',
      size: '2.4 GB',
      retention: '30 days'
    },
    {
      id: 'hourly-incremental',
      name: 'Hourly Incremental',
      type: 'incremental',
      frequency: 'hourly',
      time: '00',
      enabled: true,
      lastRun: '2024-01-15 14:00:00',
      status: 'completed',
      size: '156 MB',
      retention: '7 days'
    },
    {
      id: 'weekly-archive',
      name: 'Weekly Archive',
      type: 'archive',
      frequency: 'weekly',
      time: 'Sunday 01:00',
      enabled: true,
      lastRun: '2024-01-14 01:00:00',
      status: 'completed',
      size: '8.7 GB',
      retention: '1 year'
    }
  ]);

  const [backupHistory, setBackupHistory] = useState([
    {
      id: 'backup-20240115-020000',
      timestamp: '2024-01-15 02:00:00',
      type: 'full',
      status: 'completed',
      size: '2.4 GB',
      duration: '24 minutes',
      location: '/backups/full/20240115-020000.bak'
    },
    {
      id: 'backup-20240115-140000',
      timestamp: '2024-01-15 14:00:00',
      type: 'incremental',
      status: 'completed',
      size: '156 MB',
      duration: '3 minutes',
      location: '/backups/incremental/20240115-140000.bak'
    },
    {
      id: 'backup-20240115-130000',
      timestamp: '2024-01-15 13:00:00',
      type: 'incremental',
      status: 'failed',
      size: '-',
      duration: '1 minute',
      location: '-',
      error: 'Disk space insufficient'
    }
  ]);

  const [drTests, setDrTests] = useState([
    {
      id: 'dr-test-q1-2024',
      name: 'Q1 2024 DR Test',
      scheduledDate: '2024-03-15',
      status: 'scheduled',
      scope: 'full-system',
      estimatedDuration: '4 hours'
    },
    {
      id: 'dr-test-q4-2023',
      name: 'Q4 2023 DR Test',
      scheduledDate: '2023-12-15',
      status: 'completed',
      scope: 'database-only',
      actualDuration: '2.5 hours',
      result: 'passed'
    }
  ]);

  const [selectedBackup, setSelectedBackup] = useState(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showNewScheduleModal, setShowNewScheduleModal] = useState(false);

  const handleToggleSchedule = (id) => {
    setBackupSchedules(prev => prev.map(schedule => 
      schedule.id === id ? { ...schedule, enabled: !schedule.enabled } : schedule
    ));
    onConfigChange?.();
  };

  const handleRunBackup = (scheduleId) => {
    console.log('Running backup:', scheduleId);
    // Simulate backup run
    setBackupSchedules(prev => prev.map(schedule => 
      schedule.id === scheduleId 
        ? { ...schedule, status: 'running', lastRun: new Date().toISOString().slice(0, 19).replace('T', ' ') }
        : schedule
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success-dark';
      case 'running': return 'text-neon';
      case 'failed': return 'text-error-dark';
      case 'scheduled': return 'text-warning-dark';
      default: return 'text-text-dark-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'running': return 'RefreshCw';
      case 'failed': return 'XCircle';
      case 'scheduled': return 'Clock';
      default: return 'Circle';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'full': return 'Database';
      case 'incremental': return 'Plus';
      case 'archive': return 'Archive';
      default: return 'Database';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-dark-primary flex items-center space-x-2 mb-4 mt-6 px-4">
            <Icon name="Archive" size={20} />
            <span>Backup Management</span>
          </h3>
          <p className="text-sm text-text-dark-secondary mt-1 px-4">
            Configure automated backups and disaster recovery procedures
          </p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          iconName="Plus"
          onClick={() => setShowNewScheduleModal(true)}
        >
          New Schedule
        </Button>
      </div>

      {/* Backup Schedules */}
      <div>
        <h4 className="font-medium text-text-dark-primary mb-6 mt-8 flex items-center space-x-2 px-4">
          <Icon name="Calendar" size={16} />
          <span>Backup Schedules</span>
        </h4>
        
        <div className="space-y-4">
          {backupSchedules.map((schedule) => (
            <div key={schedule.id} className="neumorphic-card p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon name={getTypeIcon(schedule.type)} size={20} className="text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h5 className="font-medium text-text-dark-primary">{schedule.name}</h5>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        schedule.type === 'full' ? 'bg-primary-50 text-primary' :
                        schedule.type === 'incremental'? 'bg-accent-50 text-accent' : 'bg-warning-50 text-warning'
                      }`}>
                        {schedule.type}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-text-dark-secondary">Frequency:</span>
                        <div className="font-medium text-text-dark-primary capitalize">{schedule.frequency}</div>
                      </div>
                      <div>
                        <span className="text-text-dark-secondary">Last Run:</span>
                        <div className="font-medium text-text-dark-primary">{schedule.lastRun}</div>
                      </div>
                      <div>
                        <span className="text-text-dark-secondary">Size:</span>
                        <div className="font-medium text-text-dark-primary">{schedule.size}</div>
                      </div>
                      <div>
                        <span className="text-text-dark-secondary">Retention:</span>
                        <div className="font-medium text-text-dark-primary">{schedule.retention}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleToggleSchedule(schedule.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      schedule.enabled ? 'bg-primary' : 'bg-secondary-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        schedule.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="Play"
                    onClick={() => handleRunBackup(schedule.id)}
                    disabled={!schedule.enabled}
                  >
                    Run Now
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="Settings"
                  >
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Backup History */}
      <div>
        <h4 className="font-medium text-text-dark-primary mb-6 mt-8 flex items-center space-x-2 px-4">
          <Icon name="History" size={16} />
          <span>Recent Backup History</span>
        </h4>
        
        <div className="neumorphic-card overflow-hidden bg-gradient-card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-secondary-700">
              <thead className="bg-gradient-surface">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-dark-secondary uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-dark-secondary uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-dark-secondary uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-dark-secondary uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-dark-secondary uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-dark-secondary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gradient-card divide-y divide-secondary-700">
                {backupHistory.map((backup) => (
                  <tr key={backup.id} className="hover:bg-dark-surface transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark-primary">
                      {backup.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        backup.type === 'full' ? 'bg-primary-50 text-primary' :
                        backup.type === 'incremental'? 'bg-accent-50 text-accent' : 'bg-warning-50 text-warning'
                      }`}>
                        {backup.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getStatusIcon(backup.status)} 
                          size={14} 
                          className={getStatusColor(backup.status)}
                        />
                        <span className={`text-sm font-medium ${getStatusColor(backup.status)}`}>
                          {backup.status}
                        </span>
                      </div>
                      {backup.error && (
                        <div className="text-xs text-error-dark mt-1">{backup.error}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark-primary">
                      {backup.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-dark-primary">
                      {backup.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {backup.status === 'completed' && (
                          <>
                            <button 
                              className="text-neon hover:text-neon-green transition-colors duration-150"
                              onClick={() => { setSelectedBackup(backup); setShowRestoreModal(true); }}
                            >
                              Restore
                            </button>
                            <button className="text-text-dark-secondary hover:text-text-dark-primary transition-colors duration-150">
                              Download
                            </button>
                          </>
                        )}
                        <button className="text-text-dark-secondary hover:text-text-dark-primary transition-colors duration-150">
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Disaster Recovery Testing */}
      <div>
        <h4 className="font-medium text-text-dark-primary mb-6 mt-8 flex items-center space-x-2 px-4">
          <Icon name="Shield" size={16} />
          <span>Disaster Recovery Testing</span>
        </h4>
        
        <div className="space-y-4">
          {drTests.map((test) => (
            <div key={test.id} className="neumorphic-card p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h5 className="font-medium text-text-dark-primary">{test.name}</h5>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      test.status === 'completed' ? 'bg-success-50 text-success' :
                      test.status === 'scheduled'? 'bg-warning-50 text-warning' : 'bg-secondary-50 text-text-secondary'
                    }`}>
                      {test.status}
                    </span>
                    {test.result && (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        test.result === 'passed' ? 'bg-success-50 text-success' : 'bg-error-50 text-error'
                      }`}>
                        {test.result}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-text-dark-secondary">Scheduled Date:</span>
                      <div className="font-medium text-text-dark-primary">{test.scheduledDate}</div>
                    </div>
                    <div>
                      <span className="text-text-dark-secondary">Scope:</span>
                      <div className="font-medium text-text-dark-primary capitalize">{test.scope.replace('-', ' ')}</div>
                    </div>
                    <div>
                      <span className="text-text-dark-secondary">Duration:</span>
                      <div className="font-medium text-text-dark-primary">
                        {test.actualDuration || test.estimatedDuration}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {test.status === 'completed' && (
                    <Button variant="outline" size="sm" iconName="FileText">
                      View Report
                    </Button>
                  )}
                  <Button variant="outline" size="sm" iconName="Settings">
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Backup Configuration Summary */}
      <div className="neumorphic-card p-6 bg-gradient-primary">
        <h4 className="font-medium text-white mb-6 mt-2 flex items-center space-x-2 px-2">
          <Icon name="Info" size={16} />
          <span>Backup Configuration Summary</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">3</div>
            <div className="text-sm text-blue-100">Active Schedules</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">98.5%</div>
            <div className="text-sm text-blue-100">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">42.8 GB</div>
            <div className="text-sm text-blue-100">Total Backup Size</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">15 min</div>
            <div className="text-sm text-blue-100">Avg Duration</div>
          </div>
        </div>
      </div>

      {/* Restore Modal */}
      {showRestoreModal && selectedBackup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal">
          <div className="neumorphic-card shadow-modal max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-dark-primary">Restore Backup</h3>
                <button 
                  onClick={() => setShowRestoreModal(false)}
                  className="text-text-dark-secondary hover:text-text-dark-primary"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <div>
                      <p className="text-sm text-warning-700">
                        <strong>Warning:</strong> This operation will overwrite current data.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-dark-primary mb-2">Backup Details</label>
                  <div className="neumorphic-inset p-3 text-sm">
                    <div className="text-text-dark-primary">Timestamp: {selectedBackup.timestamp}</div>
                    <div className="text-text-dark-primary">Type: {selectedBackup.type}</div>
                    <div className="text-text-dark-primary">Size: {selectedBackup.size}</div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-dark-primary mb-2">Restore Options</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="restore-option" value="full" defaultChecked className="text-primary" />
                      <span className="text-sm text-text-dark-primary">Full System Restore</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="restore-option" value="selective" className="text-primary" />
                      <span className="text-sm text-text-dark-primary">Selective Restore</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-6 mt-6 border-t border-border">
                <Button variant="outline" onClick={() => setShowRestoreModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" iconName="RefreshCw">
                  Start Restore
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BackupManagement;