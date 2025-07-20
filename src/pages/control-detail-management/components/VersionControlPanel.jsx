// src/pages/control-detail-management/components/VersionControlPanel.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const VersionControlPanel = ({ controlData, versionHistory, onRevert }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showConfirmRevert, setShowConfirmRevert] = useState(null);
  const [showVersionDiff, setShowVersionDiff] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeSince = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMins > 0) return `${diffMins}m ago`;
    return 'Just now';
  };

  const handleRevert = (version) => {
    onRevert?.(version);
    setShowConfirmRevert(null);
  };

  const getVersionStatus = (version, index) => {
    if (index === 0) return 'current';
    if (version.version?.includes('draft')) return 'draft';
    return 'historical';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return 'bg-success-100 text-success-700';
      case 'draft':
        return 'bg-warning-100 text-warning-700';
      case 'historical':
        return 'bg-secondary-100 text-secondary-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getChangeImpact = (changes) => {
    const changeText = changes.toLowerCase();
    if (changeText.includes('major') || changeText.includes('breaking')) return 'high';
    if (changeText.includes('updated') || changeText.includes('modified')) return 'medium';
    return 'low';
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-secondary-500';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="GitBranch" size={18} className="text-primary" />
            <h3 className="font-semibold text-text-primary">Version Control</h3>
            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
              v{controlData?.version || '1.0'}
            </span>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-text-secondary hover:text-primary hover:bg-secondary-50 rounded nav-transition"
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4">
          <div className="space-y-3">
            {versionHistory?.map((version, index) => {
              const status = getVersionStatus(version, index);
              const impact = getChangeImpact(version.changes);
              
              return (
                <div key={version.version} className="border border-border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          status === 'current' ? 'bg-success' :
                          status === 'draft' ? 'bg-warning' : 'bg-secondary-300'
                        }`} />
                        <span className="font-medium text-text-primary">
                          Version {version.version}
                        </span>
                      </div>
                      
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {status === 'current' ? 'Current' : status === 'draft' ? 'Draft' : 'Historical'}
                      </span>
                      
                      <div className={`flex items-center space-x-1 ${getImpactColor(impact)}`}>
                        <Icon name="TrendingUp" size={12} />
                        <span className="text-xs font-medium capitalize">{impact} Impact</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {index > 0 && (
                        <>
                          <button
                            onClick={() => setShowVersionDiff(version)}
                            className="p-1 text-text-secondary hover:text-primary hover:bg-secondary-50 rounded nav-transition"
                            title="View changes"
                          >
                            <Icon name="Eye" size={14} />
                          </button>
                          
                          <button
                            onClick={() => setShowConfirmRevert(version)}
                            className="p-1 text-text-secondary hover:text-warning hover:bg-warning-50 rounded nav-transition"
                            title="Revert to this version"
                          >
                            <Icon name="RotateCcw" size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="text-text-secondary">By:</span>
                        <span className="text-text-primary font-medium">{version.author}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className="text-text-secondary font-data">{formatDate(version.date)}</span>
                        <span className="text-text-secondary">({getTimeSince(version.date)})</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-text-primary">{version.changes}</p>
                    </div>
                    
                    {version.approvalRequired && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Icon name="Lock" size={12} className="text-warning" />
                        <span className="text-xs text-warning font-medium">
                          Approval required for changes
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {(!versionHistory || versionHistory.length === 0) && (
            <div className="text-center py-6 text-text-secondary">
              <Icon name="GitBranch" size={32} className="mx-auto mb-2 text-secondary-300" />
              <p className="text-sm">No version history available</p>
            </div>
          )}
          
          {/* Version Control Actions */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={14} className="text-text-secondary" />
                  <span className="text-text-secondary">Tracking changes for compliance audit</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center space-x-1 px-2 py-1 text-xs bg-secondary-100 text-text-secondary rounded hover:bg-secondary-200 nav-transition">
                  <Icon name="Download" size={12} />
                  <span>Export History</span>
                </button>
                
                <button className="inline-flex items-center space-x-1 px-2 py-1 text-xs bg-secondary-100 text-text-secondary rounded hover:bg-secondary-200 nav-transition">
                  <Icon name="GitCompare" size={12} />
                  <span>Compare Versions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Revert Confirmation Modal */}
      {showConfirmRevert && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-modal" onClick={() => setShowConfirmRevert(null)} />
          
          <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
            <div className="bg-surface rounded-lg shadow-large w-full max-w-md">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-warning-100 rounded-lg">
                    <Icon name="AlertTriangle" size={20} className="text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Confirm Version Revert</h3>
                    <p className="text-sm text-text-secondary">This action cannot be undone</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="bg-secondary-50 rounded-lg p-3">
                    <div className="text-sm">
                      <p className="font-medium text-text-primary mb-1">
                        Reverting to: Version {showConfirmRevert.version}
                      </p>
                      <p className="text-text-secondary mb-2">
                        {showConfirmRevert.changes}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-text-secondary">
                        <span>By: {showConfirmRevert.author}</span>
                        <span>•</span>
                        <span>{formatDate(showConfirmRevert.date)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-text-secondary">
                    <p>This will:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Create a new version based on the selected version</li>
                      <li>Preserve all version history</li>
                      <li>Require approval if control has sensitive changes</li>
                      <li>Notify assigned stakeholders</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowConfirmRevert(null)}
                    className="px-4 py-2 border border-border text-text-secondary rounded-lg hover:text-text-primary hover:bg-secondary-50 nav-transition"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={() => handleRevert(showConfirmRevert)}
                    className="px-4 py-2 bg-warning text-white rounded-lg hover:bg-warning-600 nav-transition"
                  >
                    Revert Version
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VersionControlPanel;