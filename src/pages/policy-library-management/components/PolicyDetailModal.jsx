import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const PolicyDetailModal = ({ 
  isOpen, 
  onClose, 
  policy, 
  getStatusColor 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !policy) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'versions', label: 'Version History', icon: 'GitBranch' },
    { id: 'approvals', label: 'Approval Chain', icon: 'CheckCircle2' },
    { id: 'related', label: 'Related Policies', icon: 'Link' }
  ];

  const handleDownload = () => {
    console.log('Downloading policy:', policy.id);
    // Download functionality would be implemented here
  };

  const handleEdit = () => {
    console.log('Editing policy:', policy.id);
    // Edit functionality would be implemented here
  };

  const getStatusColorDark = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-success-dark text-white';
      case 'pending':
        return 'bg-warning-dark text-white';
      case 'draft':
        return 'bg-info-dark text-white';
      case 'expired':
        return 'bg-error-dark text-white';
      default:
        return 'bg-dark-elevated text-text-dark-primary';
    }
  };

  return (
    <>
      {/* Enhanced Dark Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-modal backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Enhanced Modal with Dark Neumorphic Theme - Centered relative to viewport */}
      <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
        <div className="bg-gradient-card rounded-neumorphic-lg shadow-neumorphic w-full max-w-4xl max-h-[90vh] flex flex-col border border-white border-opacity-10 overflow-hidden">
          {/* Header with Dark Theme */}
          <div className="flex items-center justify-between p-6 border-b border-white border-opacity-10 flex-shrink-0">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-text-dark-primary truncate">
                {policy?.name}
              </h2>
              <div className="flex items-center space-x-3 mt-2">
                <span className="text-sm text-text-dark-secondary">
                  {policy?.id} • v{policy?.version}
                </span>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColorDark(policy?.status)}`}>
                  {policy?.status}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={handleDownload}
                className="p-2 text-text-dark-secondary hover:text-neon-green hover:bg-dark-elevated rounded-lg nav-transition shadow-neumorphic-subtle"
                title="Download Policy"
              >
                <Icon name="Download" size={20} />
              </button>
              <button
                onClick={handleEdit}
                className="p-2 text-text-dark-secondary hover:text-neon-green hover:bg-dark-elevated rounded-lg nav-transition shadow-neumorphic-subtle"
                title="Edit Policy"
              >
                <Icon name="Edit" size={20} />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated rounded-lg nav-transition shadow-neumorphic-subtle"
                aria-label="Close modal"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Enhanced Tabs with Dark Neumorphic Theme */}
          <div className="border-b border-white border-opacity-10 bg-dark-primary flex-shrink-0">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 py-4 border-b-2 font-medium text-sm nav-transition relative
                    ${activeTab === tab.id
                      ? 'border-neon-green text-neon-green shadow-glow-neon' 
                      : 'border-transparent text-text-dark-secondary hover:text-text-dark-primary'
                    }
                  `}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Enhanced Content with Dark Theme - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 bg-dark-secondary">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-medium text-text-dark-primary mb-3">
                    Policy Description
                  </h3>
                  <div className="prose max-w-none text-text-dark-secondary bg-dark-elevated p-4 rounded-neumorphic shadow-neumorphic-inset">
                    <p>{policy?.description}</p>
                  </div>
                </div>

                {/* Enhanced Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-dark-elevated p-4 rounded-neumorphic shadow-neumorphic-inset">
                      <label className="text-sm font-medium text-text-dark-muted">
                        Category
                      </label>
                      <p className="text-text-dark-primary mt-1">{policy?.category}</p>
                    </div>
                    <div className="bg-dark-elevated p-4 rounded-neumorphic shadow-neumorphic-inset">
                      <label className="text-sm font-medium text-text-dark-muted">
                        Department
                      </label>
                      <p className="text-text-dark-primary mt-1">{policy?.department}</p>
                    </div>
                    <div className="bg-dark-elevated p-4 rounded-neumorphic shadow-neumorphic-inset">
                      <label className="text-sm font-medium text-text-dark-muted">
                        Approved By
                      </label>
                      <p className="text-text-dark-primary mt-1">{policy?.approvedBy}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-dark-elevated p-4 rounded-neumorphic shadow-neumorphic-inset">
                      <label className="text-sm font-medium text-text-dark-muted">
                        Last Updated
                      </label>
                      <p className="text-text-dark-primary mt-1 font-data">{policy?.lastUpdated}</p>
                    </div>
                    <div className="bg-dark-elevated p-4 rounded-neumorphic shadow-neumorphic-inset">
                      <label className="text-sm font-medium text-text-dark-muted">
                        Expiration Date
                      </label>
                      <p className="text-text-dark-primary mt-1 font-data">{policy?.expirationDate}</p>
                    </div>
                    <div className="bg-dark-elevated p-4 rounded-neumorphic shadow-neumorphic-inset">
                      <label className="text-sm font-medium text-text-dark-muted">
                        Document Size
                      </label>
                      <p className="text-text-dark-primary mt-1">{policy?.documentSize}</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Statistics with Neumorphic Design */}
                <div className="bg-gradient-dark rounded-neumorphic shadow-neumorphic p-6 border border-white border-opacity-10">
                  <h4 className="text-sm font-medium text-text-dark-primary mb-3">
                    Usage Statistics
                  </h4>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Download" size={16} className="text-neon-green" />
                      <span className="text-text-dark-secondary">Downloads:</span>
                      <span className="text-neon-green font-medium">{policy?.downloadCount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Eye" size={16} className="text-neon-purple" />
                      <span className="text-text-dark-secondary">Views:</span>
                      <span className="text-neon-purple font-medium">{policy?.downloadCount * 3}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'versions' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-dark-primary mb-4">
                  Version History
                </h3>
                <div className="space-y-3">
                  {policy?.versionHistory?.map((version, index) => (
                    <div key={index} className="bg-dark-elevated border border-white border-opacity-10 rounded-neumorphic shadow-neumorphic-inset p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-text-dark-primary">
                            Version {version.version}
                          </span>
                          {index === 0 && (
                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-neon-green text-dark-primary">
                              Current
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-text-dark-secondary font-data">
                          {version.date}
                        </span>
                      </div>
                      <p className="text-sm text-text-dark-secondary">
                        {version.changes}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'approvals' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-dark-primary mb-4">
                  Approval Chain
                </h3>
                <div className="space-y-3">
                  {policy?.approvalChain?.map((approval, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-dark-elevated border border-white border-opacity-10 rounded-neumorphic shadow-neumorphic-inset">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center shadow-neumorphic-subtle
                        ${approval.status === 'Approved' ? 'bg-success-dark text-white' : 
                          approval.status === 'Pending'? 'bg-warning-dark text-white' : 'bg-error-dark text-white'}
                      `}>
                        <Icon 
                          name={approval.status === 'Approved' ? 'Check' : 
                                approval.status === 'Pending' ? 'Clock' : 'X'} 
                          size={16} 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-text-dark-primary">
                              {approval.name}
                            </p>
                            <p className="text-xs text-text-dark-secondary">
                              {approval.role}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`
                              inline-flex px-2 py-1 rounded-full text-xs font-medium
                              ${approval.status === 'Approved' ? 'text-success-dark bg-success-dark bg-opacity-20' :
                                approval.status === 'Pending'? 'text-warning-dark bg-warning-dark bg-opacity-20' : 'text-error-dark bg-error-dark bg-opacity-20'}
                            `}>
                              {approval.status}
                            </span>
                            {approval.date && (
                              <p className="text-xs text-text-dark-secondary mt-1 font-data">
                                {approval.date}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'related' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-dark-primary mb-4">
                  Related Policies
                </h3>
                <div className="space-y-3">
                  {policy?.relatedPolicies?.map((relatedId, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-dark-elevated border border-white border-opacity-10 rounded-neumorphic shadow-neumorphic-inset hover:bg-dark-surface nav-transition">
                      <div className="flex items-center space-x-3">
                        <Icon name="FileText" size={16} className="text-text-dark-secondary" />
                        <span className="text-sm font-medium text-text-dark-primary">
                          {relatedId}
                        </span>
                      </div>
                      <button className="text-sm text-neon-green hover:text-neon-purple nav-transition">
                        View Policy
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Footer with Dark Theme */}
          <div className="border-t border-white border-opacity-10 p-6 bg-dark-primary flex-shrink-0">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-white border-opacity-20 text-text-dark-secondary rounded-neumorphic font-medium hover:text-text-dark-primary hover:bg-dark-elevated nav-transition shadow-neumorphic-subtle"
              >
                Close
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-gradient-accent text-white rounded-neumorphic font-medium hover:shadow-glow-neon nav-transition shadow-neumorphic"
              >
                Edit Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PolicyDetailModal;