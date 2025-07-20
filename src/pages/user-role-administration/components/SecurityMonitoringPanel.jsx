// src/pages/user-role-administration/components/SecurityMonitoringPanel.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { formatDistanceToNow } from 'date-fns';

const SecurityMonitoringPanel = ({ adminData = {}, failedLogins = 0 }) => {
  const [activeView, setActiveView] = useState('overview');
  
  // Mock security data
  const securityData = {
    loginPatterns: [
      {
        id: 1,
        user: 'Sarah Johnson',
        unusual: true,
        reason: 'Login from new location (New York)',
        timestamp: '2024-01-15T14:30:00Z',
        ipAddress: '203.0.113.45',
        risk: 'medium'
      },
      {
        id: 2,
        user: 'Michael Chen',
        unusual: false,
        reason: 'Regular login pattern',
        timestamp: '2024-01-15T13:45:00Z',
        ipAddress: '192.168.1.102',
        risk: 'low'
      }
    ],
    failedAttempts: [
      {
        id: 1,
        targetEmail: 'admin@company.com',
        attempts: 5,
        lastAttempt: '2024-01-15T15:20:00Z',
        ipAddress: '203.0.113.15',
        blocked: true,
        risk: 'high'
      },
      {
        id: 2,
        targetEmail: 'sarah.johnson@company.com',
        attempts: 2,
        lastAttempt: '2024-01-15T14:10:00Z',
        ipAddress: '192.168.1.200',
        blocked: false,
        risk: 'low'
      }
    ],
    suspiciousActivity: [
      {
        id: 1,
        type: 'Multiple Role Changes',
        description: 'User "Emily Rodriguez" role changed 3 times in 10 minutes',
        timestamp: '2024-01-15T12:30:00Z',
        severity: 'medium',
        status: 'investigating'
      },
      {
        id: 2,
        type: 'Bulk Permission Grant',
        description: 'Admin privileges granted to 15 users simultaneously',
        timestamp: '2024-01-15T11:45:00Z',
        severity: 'high',
        status: 'resolved'
      }
    ]
  };

  const views = [
    { id: 'overview', name: 'Overview', icon: 'BarChart3' },
    { id: 'logins', name: 'Login Patterns', icon: 'LogIn' },
    { id: 'failures', name: 'Failed Attempts', icon: 'XCircle' },
    { id: 'suspicious', name: 'Suspicious Activity', icon: 'AlertTriangle' }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high':
        return 'text-error-dark bg-error-dark bg-opacity-20 border-error-dark';
      case 'medium':
        return 'text-warning-dark bg-warning-dark bg-opacity-20 border-warning-dark';
      case 'low':
        return 'text-success-dark bg-success-dark bg-opacity-20 border-success-dark';
      default:
        return 'text-text-dark-secondary bg-dark-elevated bg-opacity-30 border-dark-elevated';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-error-dark text-white';
      case 'medium':
        return 'bg-warning-dark text-white';
      case 'low':
        return 'bg-success-dark text-white';
      default:
        return 'bg-dark-elevated text-white';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-success-dark text-white';
      case 'investigating':
        return 'bg-warning-dark text-white';
      case 'open':
        return 'bg-error-dark text-white';
      default:
        return 'bg-dark-elevated text-white';
    }
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Security Score */}
      <div className="bg-gradient-card p-4 rounded-neumorphic shadow-neumorphic border border-dark-elevated">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-text-dark-primary">Security Score</h4>
          <Icon name="Shield" size={16} className="text-neon-green" />
        </div>
        <div className="text-2xl font-semibold text-neon-green mb-1">87%</div>
        <div className="text-sm text-success-dark">+2% from last week</div>
      </div>
      
      {/* Failed Logins */}
      <div className="bg-gradient-card p-4 rounded-neumorphic shadow-neumorphic border border-dark-elevated">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-text-dark-primary">Failed Logins</h4>
          <Icon name="XCircle" size={16} className="text-error-dark" />
        </div>
        <div className={`text-2xl font-semibold mb-1 ${
          failedLogins > 10 ? 'text-error-dark' : failedLogins > 5 ? 'text-warning-dark' : 'text-success-dark'
        }`}>
          {failedLogins}
        </div>
        <div className="text-sm text-text-dark-secondary">Last 24 hours</div>
      </div>
      
      {/* Active Threats */}
      <div className="bg-gradient-card p-4 rounded-neumorphic shadow-neumorphic border border-dark-elevated">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-text-dark-primary">Active Threats</h4>
          <Icon name="AlertTriangle" size={16} className="text-warning-dark" />
        </div>
        <div className="text-2xl font-semibold text-warning-dark mb-1">3</div>
        <div className="text-sm text-text-dark-secondary">Requires attention</div>
      </div>
      
      {/* Compliance Status */}
      <div className="bg-gradient-card p-4 rounded-neumorphic shadow-neumorphic border border-dark-elevated">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-text-dark-primary">Compliance</h4>
          <Icon name="CheckCircle" size={16} className="text-success-dark" />
        </div>
        <div className="text-2xl font-semibold text-success-dark mb-1">Good</div>
        <div className="text-sm text-text-dark-secondary">All policies active</div>
      </div>
    </div>
  );

  const renderLoginPatterns = () => (
    <div className="space-y-4">
      {securityData.loginPatterns.map(pattern => (
        <div key={pattern.id} className={`p-4 rounded-neumorphic border shadow-neumorphic ${
          pattern.unusual ? 'border-warning-dark bg-warning-dark bg-opacity-10' : 'border-dark-elevated bg-gradient-card'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                pattern.unusual ? 'bg-warning-dark text-white' : 'bg-success-dark text-white'
              }`}>
                <Icon name="LogIn" size={16} />
              </div>
              
              <div>
                <h4 className="font-medium text-text-dark-primary">{pattern.user}</h4>
                <p className="text-sm text-text-dark-secondary mt-1">{pattern.reason}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-text-dark-muted">
                  <span>IP: {pattern.ipAddress}</span>
                  <span>{formatDistanceToNow(new Date(pattern.timestamp), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
            
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              getRiskColor(pattern.risk)
            }`}>
              {pattern.risk} risk
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFailedAttempts = () => (
    <div className="space-y-4">
      {securityData.failedAttempts.map(attempt => (
        <div key={attempt.id} className={`p-4 rounded-neumorphic border shadow-neumorphic ${
          attempt.blocked ? 'border-error-dark bg-error-dark bg-opacity-10' : 'border-dark-elevated bg-gradient-card'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                attempt.blocked ? 'bg-error-dark text-white' : 'bg-warning-dark text-white'
              }`}>
                <Icon name="XCircle" size={16} />
              </div>
              
              <div>
                <h4 className="font-medium text-text-dark-primary">{attempt.targetEmail}</h4>
                <p className="text-sm text-text-dark-secondary mt-1">
                  {attempt.attempts} failed attempt{attempt.attempts !== 1 ? 's' : ''}
                  {attempt.blocked && ' - Account temporarily locked'}
                </p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-text-dark-muted">
                  <span>IP: {attempt.ipAddress}</span>
                  <span>{formatDistanceToNow(new Date(attempt.lastAttempt), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                getRiskColor(attempt.risk)
              }`}>
                {attempt.risk} risk
              </span>
              
              {attempt.blocked && (
                <button className="px-3 py-1 text-xs bg-neon-green text-white rounded-lg hover:bg-neon-purple transition-colors shadow-glow-neon">
                  Unblock
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSuspiciousActivity = () => (
    <div className="space-y-4">
      {securityData.suspiciousActivity.map(activity => (
        <div key={activity.id} className="p-4 rounded-neumorphic border border-dark-elevated bg-gradient-card shadow-neumorphic">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${getSeverityColor(activity.severity)}`}>
                <Icon name="AlertTriangle" size={16} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-text-dark-primary">{activity.type}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    getSeverityColor(activity.severity)
                  }`}>
                    {activity.severity}
                  </span>
                </div>
                
                <p className="text-sm text-text-dark-secondary mb-2">{activity.description}</p>
                
                <div className="text-xs text-text-dark-muted">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                getStatusColor(activity.status)
              }`}>
                {activity.status}
              </span>
              
              <button className="p-1 text-text-dark-muted hover:text-text-dark-primary rounded transition-colors">
                <Icon name="MoreVertical" size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return renderOverview();
      case 'logins':
        return renderLoginPatterns();
      case 'failures':
        return renderFailedAttempts();
      case 'suspicious':
        return renderSuspiciousActivity();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="bg-gradient-card rounded-neumorphic shadow-neumorphic border border-dark-elevated">
      {/* Header */}
      <div className="p-4 border-b border-dark-elevated">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-neon-green to-neon-purple rounded-lg shadow-glow-neon">
              <Icon name="Shield" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-dark-primary">Security Monitoring</h3>
              <p className="text-sm text-text-dark-secondary">Real-time security insights and threat detection</p>
            </div>
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 border border-dark-elevated text-text-dark-secondary rounded-lg font-medium hover:text-text-dark-primary hover:bg-dark-elevated hover:bg-opacity-30 transition-colors">
            <Icon name="RefreshCw" size={16} />
            <span>Refresh</span>
          </button>
        </div>
        
        {/* View Navigation */}
        <div className="flex space-x-1 bg-dark-elevated bg-opacity-50 rounded-lg p-1">
          {views.map(view => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === view.id
                  ? 'bg-gradient-to-r from-neon-green to-neon-purple text-white shadow-glow-neon'
                  : 'text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated hover:bg-opacity-30'
              }`}
            >
              <Icon name={view.icon} size={16} />
              <span>{view.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {renderContent()}
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-dark-elevated bg-dark-elevated bg-opacity-30">
        <div className="flex items-center justify-between text-sm">
          <div className="text-text-dark-secondary">
            Last updated: {formatDistanceToNow(new Date(), { addSuffix: true })}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-dark rounded-full animate-pulse"></div>
              <span className="text-text-dark-secondary">Real-time monitoring active</span>
            </div>
            
            <button className="text-neon-green hover:text-neon-purple font-medium transition-colors">
              View Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityMonitoringPanel;