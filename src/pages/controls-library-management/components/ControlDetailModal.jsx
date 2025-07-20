import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ControlDetailModal = ({ 
  isOpen, 
  onClose, 
  control, 
  getRiskLevelColor, 
  getStatusColor 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !control) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'implementation', label: 'Implementation', icon: 'Settings' },
    { id: 'testing', label: 'Testing', icon: 'CheckCircle' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="form-label-dark">Control ID</label>
                  <p className="text-text-dark-primary font-medium">{control.id}</p>
                </div>
                <div>
                  <label className="form-label-dark">Name</label>
                  <p className="text-text-dark-primary font-medium">{control.name}</p>
                </div>
                <div>
                  <label className="form-label-dark">Framework</label>
                  <p className="text-text-dark-primary">{control.framework}</p>
                </div>
                <div>
                  <label className="form-label-dark">Category</label>
                  <p className="text-text-dark-primary">{control.category}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="form-label-dark">Status</label>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(control.status)}`}>
                    {control.status}
                  </span>
                </div>
                <div>
                  <label className="form-label-dark">Risk Level</label>
                  <span className={`inline-block px-3 py-1 rounded-lg text-sm font-medium border ${getRiskLevelColor(control.riskLevel)}`}>
                    {control.riskLevel}
                  </span>
                </div>
                <div>
                  <label className="form-label-dark">Version</label>
                  <p className="text-text-dark-primary">{control.version}</p>
                </div>
                <div>
                  <label className="form-label-dark">Owner</label>
                  <p className="text-text-dark-primary">{control.owner}</p>
                </div>
              </div>
            </div>
            <div>
              <label className="form-label-dark">Description</label>
              <p className="text-text-dark-primary leading-relaxed">{control.description}</p>
            </div>
            <div>
              <label className="form-label-dark">Tags</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {control.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-dark-elevated bg-opacity-50 text-text-dark-secondary text-sm rounded-lg border border-white border-opacity-10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'implementation':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="form-label-dark">Implementation Status</label>
                  <p className="text-text-dark-primary font-medium">{control.implementationStatus}</p>
                </div>
                <div>
                  <label className="form-label-dark">Effectiveness</label>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-dark-secondary">Current Score</span>
                      <span className="text-text-dark-primary font-medium">{control.effectiveness}%</span>
                    </div>
                    <div className="w-full bg-dark-elevated rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${
                          control.effectiveness >= 80 ? 'bg-gradient-to-r from-success-dark to-neon-green' :
                          control.effectiveness >= 60 ? 'bg-gradient-to-r from-warning-dark to-neon-green': 'bg-gradient-to-r from-error-dark to-warning-dark'
                        }`}
                        style={{ width: `${control.effectiveness}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="form-label-dark">Testing Frequency</label>
                  <p className="text-text-dark-primary">{control.testingFrequency}</p>
                </div>
                <div>
                  <label className="form-label-dark">Last Review</label>
                  <p className="text-text-dark-primary">{control.lastReviewed}</p>
                </div>
                <div>
                  <label className="form-label-dark">Next Review</label>
                  <p className="text-text-dark-primary">{control.nextReview}</p>
                </div>
              </div>
            </div>
            <div>
              <label className="form-label-dark">Related Controls</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {control.relatedControls.map(relatedId => (
                  <span 
                    key={relatedId} 
                    className="px-3 py-1 bg-neon-green bg-opacity-20 text-neon-green text-sm rounded-lg border border-neon-green border-opacity-50"
                  >
                    {relatedId}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'testing':
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <Icon name="CheckCircle" size={48} className="text-text-dark-muted mb-4 mx-auto" />
              <h3 className="text-lg font-medium text-text-dark-primary mb-2">
                Testing Information
              </h3>
              <p className="text-text-dark-secondary">
                Testing details and history will be displayed here
              </p>
            </div>
          </div>
        );
      
      case 'documents':
        return (
          <div className="space-y-6">
            <div>
              <label className="form-label-dark">Associated Documents</label>
              <div className="mt-3 space-y-2">
                {control.documents.map(doc => (
                  <div key={doc} className="flex items-center p-3 neumorphic-card border border-white border-opacity-10 rounded-lg">
                    <Icon name="FileText" size={16} className="text-neon-green mr-3" />
                    <span className="text-text-dark-primary flex-1">{doc}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="Download"
                      className="text-text-dark-muted hover:text-text-dark-primary"
                    >
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <Icon name="Clock" size={48} className="text-text-dark-muted mb-4 mx-auto" />
              <h3 className="text-lg font-medium text-text-dark-primary mb-2">
                Change History
              </h3>
              <p className="text-text-dark-secondary">
                Control change history will be displayed here
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-modal bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl max-h-[90vh] neumorphic-card border border-white border-opacity-20 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white border-opacity-10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-green to-neon-purple flex items-center justify-center">
              <Icon name="Shield" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-dark-primary">
                {control.name}
              </h2>
              <p className="text-sm text-neon-green font-medium">
                {control.id}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            icon="X"
            onClick={onClose}
            className="text-text-dark-muted hover:text-text-dark-primary"
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white border-opacity-10 px-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors
                ${activeTab === tab.id 
                  ? 'text-neon-green border-b-2 border-neon-green' :'text-text-dark-secondary hover:text-text-dark-primary'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-dark p-6">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-white border-opacity-10">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-text-dark-muted hover:text-text-dark-primary"
          >
            Close
          </Button>
          <Button
            variant="primary"
            icon="Edit"
            className="shadow-glow-neon"
          >
            Edit Control
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ControlDetailModal;