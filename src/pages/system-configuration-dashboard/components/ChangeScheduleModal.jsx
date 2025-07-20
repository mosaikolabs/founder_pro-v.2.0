// src/pages/system-configuration-dashboard/components/ChangeScheduleModal.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChangeScheduleModal = ({ isOpen, onClose, onScheduleChange }) => {
  const [scheduledChanges, setScheduledChanges] = useState([
    {
      id: 'maint-2024-01-20',
      title: 'Security Policy Update',
      description: 'Update session timeout and password policies across all departments',
      scheduledDate: '2024-01-20T02:00:00',
      status: 'scheduled',
      priority: 'high',
      estimatedDuration: '30 minutes',
      affectedSystems: ['Authentication', 'User Management'],
      approvedBy: 'John Smith',
      createdBy: 'Admin User'
    },
    {
      id: 'maint-2024-01-25',
      title: 'Integration Endpoint Migration',
      description: 'Migrate ERP integration to new API endpoints',
      scheduledDate: '2024-01-25T01:00:00',
      status: 'pending-approval',
      priority: 'medium',
      estimatedDuration: '2 hours',
      affectedSystems: ['ERP Integration', 'Data Sync'],
      approvedBy: null,
      createdBy: 'Tech Lead'
    }
  ]);

  const [newChange, setNewChange] = useState({
    title: '',
    description: '',
    scheduledDate: '',
    priority: 'medium',
    estimatedDuration: '',
    affectedSystems: [],
    notifyUsers: true,
    createBackup: true,
    rollbackPlan: ''
  });

  const [showNewChangeForm, setShowNewChangeForm] = useState(false);
  const [selectedChange, setSelectedChange] = useState(null);

  if (!isOpen) return null;

  const availableSystems = [
    'Authentication',
    'User Management',
    'ERP Integration',
    'Data Sync',
    'Notification System',
    'Backup System',
    'Audit Logging',
    'Performance Monitoring'
  ];

  const handleNewChangeSubmit = () => {
    const change = {
      ...newChange,
      id: `maint-${Date.now()}`,
      status: 'scheduled',
      createdBy: 'Current User',
      approvedBy: null
    };
    
    setScheduledChanges(prev => [...prev, change]);
    setNewChange({
      title: '',
      description: '',
      scheduledDate: '',
      priority: 'medium',
      estimatedDuration: '',
      affectedSystems: [],
      notifyUsers: true,
      createBackup: true,
      rollbackPlan: ''
    });
    setShowNewChangeForm(false);
    onScheduleChange?.();
  };

  const handleSystemToggle = (system) => {
    setNewChange(prev => ({
      ...prev,
      affectedSystems: prev.affectedSystems.includes(system)
        ? prev.affectedSystems.filter(s => s !== system)
        : [...prev.affectedSystems, system]
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error bg-error-50 border-error-200';
      case 'high': return 'text-warning bg-warning-50 border-warning-200';
      case 'medium': return 'text-accent bg-accent-50 border-accent-200';
      case 'low': return 'text-secondary bg-secondary-50 border-secondary-200';
      default: return 'text-text-secondary bg-secondary-50 border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-success bg-success-50';
      case 'pending-approval': return 'text-warning bg-warning-50';
      case 'in-progress': return 'text-accent bg-accent-50';
      case 'completed': return 'text-primary bg-primary-50';
      case 'failed': return 'text-error bg-error-50';
      default: return 'text-text-secondary bg-secondary-50';
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal">
      <div className="bg-surface rounded-lg shadow-modal max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex h-full max-h-[90vh]">
          {/* Scheduled Changes List */}
          <div className="w-2/3 border-r border-border flex flex-col">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
                  <Icon name="Clock" size={20} />
                  <span>Change Schedule</span>
                </h3>
                <div className="flex items-center space-x-3">
                  <Button 
                    variant="primary" 
                    size="sm" 
                    iconName="Plus"
                    onClick={() => setShowNewChangeForm(true)}
                  >
                    Schedule Change
                  </Button>
                  <button 
                    onClick={onClose}
                    className="text-text-secondary hover:text-text-primary nav-transition"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-text-secondary">
                Manage scheduled configuration changes and maintenance windows
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {scheduledChanges.map((change) => (
                  <div 
                    key={change.id} 
                    className={`bg-surface border rounded-lg p-4 cursor-pointer nav-transition ${
                      selectedChange?.id === change.id 
                        ? 'border-primary bg-primary-50' :'border-border hover:border-primary'
                    }`}
                    onClick={() => setSelectedChange(change)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-text-primary mb-1">{change.title}</h4>
                        <p className="text-sm text-text-secondary">{change.description}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                          getPriorityColor(change.priority)
                        }`}>
                          {change.priority}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          getStatusColor(change.status)
                        }`}>
                          {change.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-text-secondary">Scheduled:</span>
                        <div className="font-medium text-text-primary">{formatDateTime(change.scheduledDate)}</div>
                      </div>
                      <div>
                        <span className="text-text-secondary">Duration:</span>
                        <div className="font-medium text-text-primary">{change.estimatedDuration}</div>
                      </div>
                      <div>
                        <span className="text-text-secondary">Systems:</span>
                        <div className="font-medium text-text-primary">{change.affectedSystems.length} affected</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Change Details / New Change Form */}
          <div className="w-1/3 flex flex-col">
            {showNewChangeForm ? (
              /* New Change Form */
              <>
                <div className="p-6 border-b border-border">
                  <h4 className="text-lg font-semibold text-text-primary">Schedule New Change</h4>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Change Title</label>
                      <input
                        type="text"
                        value={newChange.title}
                        onChange={(e) => setNewChange(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Brief description of the change"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Description</label>
                      <textarea
                        value={newChange.description}
                        onChange={(e) => setNewChange(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent h-20 resize-none"
                        placeholder="Detailed description of the changes"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Priority</label>
                        <select
                          value={newChange.priority}
                          onChange={(e) => setNewChange(prev => ({ ...prev, priority: e.target.value }))}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Est. Duration</label>
                        <input
                          type="text"
                          value={newChange.estimatedDuration}
                          onChange={(e) => setNewChange(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="e.g., 30 minutes"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Scheduled Date & Time</label>
                      <input
                        type="datetime-local"
                        value={newChange.scheduledDate}
                        onChange={(e) => setNewChange(prev => ({ ...prev, scheduledDate: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-3">Affected Systems</label>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {availableSystems.map(system => (
                          <label key={system} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={newChange.affectedSystems.includes(system)}
                              onChange={() => handleSystemToggle(system)}
                              className="text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-text-primary">{system}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="flex items-center justify-between">
                        <span className="text-sm font-medium text-text-primary">Notify Users</span>
                        <button
                          onClick={() => setNewChange(prev => ({ ...prev, notifyUsers: !prev.notifyUsers }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            newChange.notifyUsers ? 'bg-primary' : 'bg-secondary-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              newChange.notifyUsers ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>
                      
                      <label className="flex items-center justify-between">
                        <span className="text-sm font-medium text-text-primary">Create Backup</span>
                        <button
                          onClick={() => setNewChange(prev => ({ ...prev, createBackup: !prev.createBackup }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            newChange.createBackup ? 'bg-primary' : 'bg-secondary-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              newChange.createBackup ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Rollback Plan</label>
                      <textarea
                        value={newChange.rollbackPlan}
                        onChange={(e) => setNewChange(prev => ({ ...prev, rollbackPlan: e.target.value }))}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent h-16 resize-none"
                        placeholder="Steps to rollback if changes fail"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border-t border-border">
                  <div className="flex items-center justify-end space-x-3">
                    <Button variant="outline" onClick={() => setShowNewChangeForm(false)}>
                      Cancel
                    </Button>
                    <Button 
                      variant="primary" 
                      iconName="Calendar"
                      onClick={handleNewChangeSubmit}
                      disabled={!newChange.title || !newChange.scheduledDate}
                    >
                      Schedule Change
                    </Button>
                  </div>
                </div>
              </>
            ) : selectedChange ? (
              /* Change Details */
              <>
                <div className="p-6 border-b border-border">
                  <h4 className="text-lg font-semibold text-text-primary">{selectedChange.title}</h4>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                      getPriorityColor(selectedChange.priority)
                    }`}>
                      {selectedChange.priority}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      getStatusColor(selectedChange.status)
                    }`}>
                      {selectedChange.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-6">
                    <div>
                      <h5 className="font-medium text-text-primary mb-2">Description</h5>
                      <p className="text-sm text-text-secondary">{selectedChange.description}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-text-primary mb-3">Schedule Details</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Scheduled Date:</span>
                          <span className="font-medium text-text-primary">{formatDateTime(selectedChange.scheduledDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Duration:</span>
                          <span className="font-medium text-text-primary">{selectedChange.estimatedDuration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Created By:</span>
                          <span className="font-medium text-text-primary">{selectedChange.createdBy}</span>
                        </div>
                        {selectedChange.approvedBy && (
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Approved By:</span>
                            <span className="font-medium text-text-primary">{selectedChange.approvedBy}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-text-primary mb-3">Affected Systems</h5>
                      <div className="space-y-1">
                        {selectedChange.affectedSystems.map((system, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <Icon name="CheckCircle" size={14} className="text-success" />
                            <span className="text-text-primary">{system}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" iconName="Edit">
                      Edit
                    </Button>
                    <div className="flex items-center space-x-2">
                      {selectedChange.status === 'pending-approval' && (
                        <Button variant="primary" size="sm" iconName="Check">
                          Approve
                        </Button>
                      )}
                      <Button variant="outline" size="sm" iconName="Trash2">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center">
                  <Icon name="Calendar" size={48} className="text-text-secondary mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-text-primary mb-2">Select a Change</h4>
                  <p className="text-text-secondary mb-4">Choose a scheduled change to view details</p>
                  <Button variant="primary" size="sm" iconName="Plus" onClick={() => setShowNewChangeForm(true)}>
                    Schedule New Change
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeScheduleModal;