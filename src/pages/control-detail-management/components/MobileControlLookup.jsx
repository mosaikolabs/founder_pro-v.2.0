// src/pages/control-detail-management/components/MobileControlLookup.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const MobileControlLookup = ({ controlData, onUpdate, searchQuery, onSearchChange }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [showQuickActions, setShowQuickActions] = useState(false);

  const sections = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'status', label: 'Status', icon: 'CheckCircle' },
    { id: 'evidence', label: 'Evidence', icon: 'Folder' },
    { id: 'testing', label: 'Testing', icon: 'TestTube' }
  ];

  const quickActions = [
    { id: 'update_status', label: 'Update Status', icon: 'Edit', color: 'primary' },
    { id: 'add_evidence', label: 'Add Evidence', icon: 'Plus', color: 'accent' },
    { id: 'emergency_note', label: 'Emergency Note', icon: 'AlertTriangle', color: 'warning' },
    { id: 'call_support', label: 'Call Support', icon: 'Phone', color: 'success' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': case'Compliant':
        return 'bg-success-100 text-success-700';
      case 'Non-Compliant': case'Overdue':
        return 'bg-error-100 text-error-700';
      case 'Pending': case'In Progress':
        return 'bg-warning-100 text-warning-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getActionColor = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary text-white';
      case 'accent':
        return 'bg-accent text-white';
      case 'warning':
        return 'bg-warning text-white';
      case 'success':
        return 'bg-success text-white';
      default:
        return 'bg-secondary-200 text-text-secondary';
    }
  };

  const handleQuickAction = (actionId) => {
    console.log('Quick action:', actionId);
    setShowQuickActions(false);
    // Implement action handlers
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="bg-surface border-b border-border p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-lg font-semibold text-text-primary">Control Lookup</h1>
          
          <button
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="p-2 bg-primary text-white rounded-lg"
          >
            <Icon name="Menu" size={18} />
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search controls..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Quick Actions Panel */}
      {showQuickActions && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-modal" onClick={() => setShowQuickActions(false)} />
          
          <div className="fixed bottom-0 left-0 right-0 z-modal bg-surface rounded-t-lg p-4">
            <div className="w-8 h-1 bg-secondary-300 rounded-full mx-auto mb-4" />
            
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              {quickActions.map(action => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className={`p-3 rounded-lg ${getActionColor(action.color)} text-center nav-transition`}
                >
                  <Icon name={action.icon} size={20} className="mx-auto mb-1" />
                  <span className="text-sm font-medium">{action.label}</span>
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setShowQuickActions(false)}
              className="w-full p-3 border border-border text-text-secondary rounded-lg"
            >
              Cancel
            </button>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="p-4">
        {/* Control Summary Card */}
        <div className="bg-surface border border-border rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="font-semibold text-text-primary">{controlData?.name}</h2>
              <p className="text-sm text-text-secondary">{controlData?.id}</p>
            </div>
            
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(controlData?.status)}`}>
              {controlData?.status}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-text-secondary">Framework:</span>
              <p className="text-text-primary font-medium">{controlData?.framework}</p>
            </div>
            <div>
              <span className="text-text-secondary">Risk Level:</span>
              <p className="text-text-primary font-medium">{controlData?.riskLevel}</p>
            </div>
            <div>
              <span className="text-text-secondary">Owner:</span>
              <p className="text-text-primary font-medium">{controlData?.owner}</p>
            </div>
            <div>
              <span className="text-text-secondary">Version:</span>
              <p className="text-text-primary font-medium font-data">{controlData?.version}</p>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm whitespace-nowrap nav-transition ${
                activeSection === section.id
                  ? 'bg-primary text-white' :'bg-surface border border-border text-text-secondary'
              }`}
            >
              <Icon name={section.icon} size={14} />
              <span>{section.label}</span>
            </button>
          ))}
        </div>

        {/* Section Content */}
        <div className="space-y-4">
          {activeSection === 'overview' && (
            <div className="space-y-4">
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="font-medium text-text-primary mb-2">Description</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {controlData?.description}
                </p>
              </div>
              
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="font-medium text-text-primary mb-3">Key Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Last Updated:</span>
                    <span className="text-text-primary font-data">{controlData?.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Next Review:</span>
                    <span className="text-text-primary font-data">{controlData?.nextReview}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Category:</span>
                    <span className="text-text-primary">{controlData?.category}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'status' && (
            <div className="space-y-4">
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="font-medium text-text-primary mb-3">Compliance Status</h3>
                <div className="space-y-3">
                  {Object.entries(controlData?.compliance || {}).map(([framework, status]) => (
                    <div key={framework} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-text-primary uppercase">{framework}</p>
                        <p className="text-xs text-text-secondary font-data">Last tested: {status.lastTest}</p>
                      </div>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status.status)}`}>
                        {status.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="font-medium text-text-primary mb-2">Quick Status Update</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['Compliant', 'Non-Compliant', 'In Progress', 'Not Tested'].map(status => (
                    <button
                      key={status}
                      onClick={() => onUpdate?.({ status })}
                      className={`p-2 text-sm rounded border nav-transition ${
                        controlData?.status === status
                          ? 'border-primary bg-primary-50 text-primary' :'border-border text-text-secondary hover:border-secondary-300'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'evidence' && (
            <div className="space-y-4">
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="font-medium text-text-primary mb-3">Recent Evidence</h3>
                <div className="space-y-3">
                  {[
                    { name: 'User Access Report', date: '2024-01-10', status: 'Approved' },
                    { name: 'Access Control Matrix', date: '2023-12-15', status: 'Pending' }
                  ].map((evidence, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border border-border rounded">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{evidence.name}</p>
                        <p className="text-xs text-text-secondary font-data">{evidence.date}</p>
                      </div>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(evidence.status)}`}>
                        {evidence.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="w-full p-3 bg-accent text-white rounded-lg font-medium">
                <Icon name="Camera" size={16} className="inline mr-2" />
                Capture Evidence
              </button>
            </div>
          )}

          {activeSection === 'testing' && (
            <div className="space-y-4">
              <div className="bg-surface border border-border rounded-lg p-4">
                <h3 className="font-medium text-text-primary mb-3">Test Results</h3>
                <div className="space-y-3">
                  {[
                    { name: 'User Access Review', result: 'Pass', date: '2023-12-15' },
                    { name: 'System Log Analysis', result: 'Pass', date: '2024-01-10' }
                  ].map((test, index) => (
                    <div key={index} className="p-3 border border-border rounded">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-text-primary">{test.name}</p>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.result)}`}>
                          {test.result}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary font-data">Tested: {test.date}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <button className="w-full p-3 bg-primary text-white rounded-lg font-medium">
                <Icon name="Play" size={16} className="inline mr-2" />
                Start Quick Test
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Emergency Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-error text-white p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} />
            <span className="text-sm font-medium">Emergency Support</span>
          </div>
          <a href="tel:+1234567890" className="flex items-center space-x-1 bg-white bg-opacity-20 px-3 py-1 rounded">
            <Icon name="Phone" size={14} />
            <span className="text-sm">Call Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileControlLookup;