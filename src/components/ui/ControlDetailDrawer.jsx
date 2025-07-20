import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const ControlDetailDrawer = ({ isOpen, onClose, controlData }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !controlData) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'testing', label: 'Testing', icon: 'TestTube' },
    { id: 'evidence', label: 'Evidence', icon: 'Paperclip' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Compliant':
        return 'bg-success-dark bg-opacity-20 text-success-dark border-success-dark border-opacity-50';
      case 'Non-Compliant':
        return 'bg-error-dark bg-opacity-20 text-error-dark border-error-dark border-opacity-50';
      case 'In Progress':
        return 'bg-warning-dark bg-opacity-20 text-warning-dark border-warning-dark border-opacity-50';
      case 'Overdue':
        return 'bg-error-dark bg-opacity-20 text-error-dark border-error-dark border-opacity-50';
      default:
        return 'bg-dark-elevated bg-opacity-50 text-text-dark-secondary border-white border-opacity-20';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="neumorphic-card p-4">
                <h4 className="font-semibold text-text-dark-primary mb-3 flex items-center">
                  <Icon name="Info" size={16} className="mr-2" />
                  Control Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-text-dark-secondary">Control ID</label>
                    <div className="text-text-dark-primary font-medium">{controlData.id}</div>
                  </div>
                  <div>
                    <label className="text-sm text-text-dark-secondary">Title</label>
                    <div className="text-text-dark-primary font-medium">{controlData.title}</div>
                  </div>
                  <div>
                    <label className="text-sm text-text-dark-secondary">Department</label>
                    <div className="text-text-dark-primary font-medium">{controlData.department}</div>
                  </div>
                  <div>
                    <label className="text-sm text-text-dark-secondary">Owner</label>
                    <div className="text-text-dark-primary font-medium">{controlData.owner}</div>
                  </div>
                </div>
              </div>

              <div className="neumorphic-card p-4">
                <h4 className="font-semibold text-text-dark-primary mb-3 flex items-center">
                  <Icon name="Activity" size={16} className="mr-2" />
                  Status & Dates
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-text-dark-secondary">Current Status</label>
                    <div className={`inline-flex items-center px-2 py-1 rounded-lg border text-sm font-medium ${getStatusColor(controlData.status)}`}>
                      {controlData.status}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-text-dark-secondary">Last Test Date</label>
                    <div className="text-text-dark-primary font-medium">{controlData.lastTestDate}</div>
                  </div>
                  <div>
                    <label className="text-sm text-text-dark-secondary">Next Test Date</label>
                    <div className="text-text-dark-primary font-medium">{controlData.nextTestDate}</div>
                  </div>
                  <div>
                    <label className="text-sm text-text-dark-secondary">Evidence Available</label>
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={controlData.evidence ? "CheckCircle" : "XCircle"} 
                        size={16} 
                        className={controlData.evidence ? "text-success-dark" : "text-error-dark"}
                      />
                      <span className="text-text-dark-primary font-medium">
                        {controlData.evidence ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="neumorphic-card p-4">
              <h4 className="font-semibold text-text-dark-primary mb-3 flex items-center">
                <Icon name="FileText" size={16} className="mr-2" />
                Description
              </h4>
              <p className="text-text-dark-secondary leading-relaxed">
                This control ensures proper access management and authorization procedures are in place
                to protect sensitive information and systems. Regular testing and validation are required
                to maintain compliance with applicable frameworks and regulations.
              </p>
            </div>
          </div>
        );
      
      case 'testing':
        return (
          <div className="space-y-6">
            <div className="neumorphic-card p-4">
              <h4 className="font-semibold text-text-dark-primary mb-3 flex items-center">
                <Icon name="TestTube" size={16} className="mr-2" />
                Testing Schedule
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-dark-elevated bg-opacity-50 rounded-lg">
                  <div>
                    <div className="text-text-dark-primary font-medium">Monthly Review</div>
                    <div className="text-sm text-text-dark-secondary">Next: {controlData.nextTestDate}</div>
                  </div>
                  <div className="text-neon-green font-bold">Active</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-dark-elevated bg-opacity-50 rounded-lg">
                  <div>
                    <div className="text-text-dark-primary font-medium">Quarterly Audit</div>
                    <div className="text-sm text-text-dark-secondary">Next: Q1 2024</div>
                  </div>
                  <div className="text-warning-dark font-bold">Scheduled</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'evidence':
        return (
          <div className="space-y-6">
            <div className="neumorphic-card p-4">
              <h4 className="font-semibold text-text-dark-primary mb-3 flex items-center">
                <Icon name="Paperclip" size={16} className="mr-2" />
                Evidence Documents
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-dark-elevated bg-opacity-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={20} className="text-neon-green" />
                    <div>
                      <div className="text-text-dark-primary font-medium">Policy Document</div>
                      <div className="text-sm text-text-dark-secondary">Updated 2 days ago</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" icon="Download">
                    Download
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-dark-elevated bg-opacity-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="Image" size={20} className="text-neon-purple" />
                    <div>
                      <div className="text-text-dark-primary font-medium">Test Screenshot</div>
                      <div className="text-sm text-text-dark-secondary">Captured 1 week ago</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" icon="Eye">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="space-y-6">
            <div className="neumorphic-card p-4">
              <h4 className="font-semibold text-text-dark-primary mb-3 flex items-center">
                <Icon name="Clock" size={16} className="mr-2" />
                Activity History
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-dark-elevated bg-opacity-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-success-dark bg-opacity-20 flex items-center justify-center">
                    <Icon name="CheckCircle" size={16} className="text-success-dark" />
                  </div>
                  <div className="flex-1">
                    <div className="text-text-dark-primary font-medium">Status updated to Compliant</div>
                    <div className="text-sm text-text-dark-secondary">2 days ago by John Smith</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-dark-elevated bg-opacity-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-warning-dark bg-opacity-20 flex items-center justify-center">
                    <Icon name="Clock" size={16} className="text-warning-dark" />
                  </div>
                  <div className="flex-1">
                    <div className="text-text-dark-primary font-medium">Testing scheduled</div>
                    <div className="text-sm text-text-dark-secondary">1 week ago by Sarah Johnson</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-drawer"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-2xl neumorphic-card border-l border-white border-opacity-20 z-drawer animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white border-opacity-10">
          <div>
            <h2 className="text-xl font-semibold text-text-dark-primary">
              Control Details
            </h2>
            <p className="text-text-dark-secondary">
              {controlData.id} - {controlData.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-dark-secondary hover:text-text-dark-primary hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white border-opacity-10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors
                ${activeTab === tab.id 
                  ? 'text-neon-green border-b-2 border-neon-green bg-white bg-opacity-5' :'text-text-dark-secondary hover:text-text-dark-primary hover:bg-white hover:bg-opacity-5'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-dark">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white border-opacity-10">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-dark-muted">
              Last updated: {controlData.lastTestDate}
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
              <Button variant="primary" icon="Edit">
                Edit Control
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlDetailDrawer;