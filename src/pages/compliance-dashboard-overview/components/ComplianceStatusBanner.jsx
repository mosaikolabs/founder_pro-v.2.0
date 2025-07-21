import React from 'react';
import Icon from '../../../components/AppIcon';

const FounderProStatusBanner = ({ compliancePercentage = 72, onExport }) => {
  const getFounderScoreColor = (percentage) => {
    if (percentage >= 85) return 'success';
    if (percentage >= 70) return 'warning';
    return 'error';
  };

  const getFounderScoreStatus = (percentage) => {
    if (percentage >= 85) return 'Excellence';
    if (percentage >= 70) return 'On Track';
    return 'Needs Focus';
  };

  const founderScoreColor = getFounderScoreColor(compliancePercentage);
  const founderScoreStatus = getFounderScoreStatus(compliancePercentage);

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
            
            {/* Left Side - Founder Score */}
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
                    🚀 Founder Score™
                  </h1>
                  <div className={`
                    px-3 py-1 rounded-full text-sm font-bold
                    ${founderScoreColor === 'success' ? 'bg-success-dark bg-opacity-20 text-success-dark' : 
                      founderScoreColor === 'warning'? 'bg-warning-dark bg-opacity-20 text-warning-dark' : 'bg-error-dark bg-opacity-20 text-error-dark'}
                  `}>
                    {founderScoreStatus}
                  </div>
                </div>
                <p className="text-text-dark-secondary text-lg">
                  Your startup maturity and strategic readiness score
                </p>
                <div className="flex items-center space-x-4 text-sm text-text-dark-muted">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>Last updated: 2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Zap" size={14} />
                    <span>11 AC modules active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Quick Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onExport}
                className="btn-primary-dark inline-flex items-center space-x-2"
                title="Export Founder Pro Report"
              >
                <Icon name="Download" size={16} />
                <span className="hidden sm:inline">Export Report</span>
              </button>
              
              <button className="btn-secondary-dark inline-flex items-center space-x-2">
                <Icon name="RefreshCw" size={16} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-green">11</div>
              <div className="text-sm text-text-dark-secondary">Active Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neon-purple">5</div>
              <div className="text-sm text-text-dark-secondary">Critical Tasks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warning-dark">8</div>
              <div className="text-sm text-text-dark-secondary">Upcoming Milestones</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success-dark">14</div>
              <div className="text-sm text-text-dark-secondary">Runway Months</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderProStatusBanner;