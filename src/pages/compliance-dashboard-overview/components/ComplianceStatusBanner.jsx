import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceStatusBanner = ({ compliancePercentage = 87, onExport }) => {
  const getComplianceColor = (percentage) => {
    if (percentage >= 90) return 'success';
    if (percentage >= 75) return 'warning';
    return 'error';
  };

  const getComplianceStatus = (percentage) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 75) return 'Good';
    return 'Needs Attention';
  };

  const complianceColor = getComplianceColor(compliancePercentage);
  const complianceStatus = getComplianceStatus(compliancePercentage);

  return (
    <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #312E81 100%)' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-neon-green to-transparent transform -skew-y-1"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-neon-purple rounded-full blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative px-4 lg:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
            
            {/* Left Side - Compliance Status */}
            <div className="flex items-center space-x-6">
              {/* Circular Progress */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-dark-secondary bg-opacity-50 flex items-center justify-center">
                  <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${compliancePercentage * 2.51} 251`}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00FF94" />
                        <stop offset="100%" stopColor="#7C3AED" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-text-dark-primary">
                      {compliancePercentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Information */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl lg:text-3xl font-bold text-text-dark-primary">
                    Compliance Status
                  </h1>
                  <div className={`
                    px-3 py-1 rounded-full text-sm font-bold
                    ${complianceColor === 'success' ? 'bg-success-dark bg-opacity-20 text-success-dark' : 
                      complianceColor === 'warning'? 'bg-warning-dark bg-opacity-20 text-warning-dark' : 'bg-error-dark bg-opacity-20 text-error-dark'}
                  `}>
                    {complianceStatus}
                  </div>
                </div>
                <p className="text-text-dark-secondary text-lg">
                  Overall organizational compliance rating
                </p>
                <div className="flex items-center space-x-4 text-sm text-text-dark-muted">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>Last updated: 2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>245 controls tracked</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Quick Stats */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success-dark">
                    23
                  </div>
                  <div className="text-xs text-text-dark-secondary uppercase tracking-wider">
                    Active Controls
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning-dark">
                    5
                  </div>
                  <div className="text-xs text-text-dark-secondary uppercase tracking-wider">
                    Pending Reviews
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-error-dark">
                    2
                  </div>
                  <div className="text-xs text-text-dark-secondary uppercase tracking-wider">
                    Critical Issues
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button 
                  onClick={onExport}
                  className="btn-primary-dark flex items-center space-x-2"
                >
                  <Icon name="Download" size={16} />
                  <span>Export Report</span>
                </button>
                <button className="btn-secondary-dark flex items-center space-x-2">
                  <Icon name="RefreshCw" size={16} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm text-text-dark-secondary">
              <span>Compliance Progress</span>
              <span>{compliancePercentage}% Complete</span>
            </div>
            <div className="progress-bar-dark h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${
                  complianceColor === 'success' ? 'progress-fill-success' : 
                  complianceColor === 'warning'? 'progress-fill-warning' : 'progress-fill-error'
                }`}
                style={{ width: `${compliancePercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceStatusBanner;