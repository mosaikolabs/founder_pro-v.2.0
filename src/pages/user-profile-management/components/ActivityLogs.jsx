import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ActivityLogs = () => {
  const [filter, setFilter] = useState('all');
  const [dateRange, setDateRange] = useState('7d');

  const activities = [
    {
      id: 1,
      type: 'login',
      action: 'User Login',
      description: 'Successful login from Chrome browser',
      timestamp: '2025-07-16 09:30:00',
      ip: '192.168.1.100',
      location: 'New York, NY',
      status: 'success'
    },
    {
      id: 2,
      type: 'profile',
      action: 'Profile Updated',
      description: 'Changed notification preferences',
      timestamp: '2025-07-16 09:15:00',
      ip: '192.168.1.100',
      location: 'New York, NY',
      status: 'success'
    },
    {
      id: 3,
      type: 'security',
      action: 'Password Changed',
      description: 'Password successfully updated',
      timestamp: '2025-07-15 14:22:00',
      ip: '192.168.1.100',
      location: 'New York, NY',
      status: 'success'
    },
    {
      id: 4,
      type: 'login',
      action: 'Failed Login Attempt',
      description: 'Invalid credentials provided',
      timestamp: '2025-07-15 08:45:00',
      ip: '203.0.113.45',
      location: 'Unknown',
      status: 'error'
    },
    {
      id: 5,
      type: 'system',
      action: 'Report Generated',
      description: 'Compliance report exported to PDF',
      timestamp: '2025-07-14 16:30:00',
      ip: '192.168.1.100',
      location: 'New York, NY',
      status: 'success'
    },
    {
      id: 6,
      type: 'system',
      action: 'Data Export',
      description: 'User data exported for backup',
      timestamp: '2025-07-14 11:15:00',
      ip: '192.168.1.100',
      location: 'New York, NY',
      status: 'success'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'login':
        return 'LogIn';
      case 'profile':
        return 'User';
      case 'security':
        return 'Shield';
      case 'system':
        return 'Activity';
      default:
        return 'Info';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success-dark';
      case 'error':
        return 'text-error-dark';
      case 'warning':
        return 'text-warning-dark';
      default:
        return 'text-info-dark';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'success':
        return 'bg-success-dark bg-opacity-20';
      case 'error':
        return 'bg-error-dark bg-opacity-20';
      case 'warning':
        return 'bg-warning-dark bg-opacity-20';
      default:
        return 'bg-info-dark bg-opacity-20';
    }
  };

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type === filter;
  });

  const exportLogs = () => {
    console.log('Exporting activity logs...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-dark-primary">Activity Logs</h1>
          <p className="text-text-dark-secondary mt-1">Recent actions and system interactions</p>
        </div>
        <button
          onClick={exportLogs}
          className="px-6 py-3 bg-gradient-to-r from-neon-green to-neon-purple text-white rounded-xl font-medium hover:shadow-glow-neon transition-all duration-300 flex items-center"
        >
          <Icon name="Download" size={20} className="mr-2" />
          Export Logs
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-dark-secondary to-dark-surface p-6 rounded-xl border border-gray-700 shadow-neumorphic">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-text-dark-primary font-medium mb-2">Filter by Type</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-dark-surface border border-gray-600 text-text-dark-primary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-green"
              >
                <option value="all">All Activities</option>
                <option value="login">Login Activities</option>
                <option value="profile">Profile Changes</option>
                <option value="security">Security Events</option>
                <option value="system">System Actions</option>
              </select>
            </div>

            <div>
              <label className="block text-text-dark-primary font-medium mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-dark-surface border border-gray-600 text-text-dark-primary rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-green"
              >
                <option value="1d">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
          </div>

          <div className="text-text-dark-secondary">
            Showing {filteredActivities.length} of {activities.length} activities
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-gradient-to-br from-dark-secondary to-dark-surface p-6 rounded-xl border border-gray-700 shadow-neumorphic">
        <h2 className="text-lg font-semibold text-text-dark-primary mb-6 flex items-center">
          <Icon name="Clock" size={20} className="mr-2" />
          Activity Timeline
        </h2>

        <div className="space-y-4">
          {filteredActivities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-4 bg-dark-surface rounded-lg border border-gray-600 hover:bg-opacity-80 transition-all duration-300"
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                ${getStatusBg(activity.status)}
              `}>
                <Icon 
                  name={getActivityIcon(activity.type)} 
                  size={20} 
                  className={getStatusColor(activity.status)}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-text-dark-primary font-medium">{activity.action}</h3>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${getStatusBg(activity.status)} ${getStatusColor(activity.status)}
                  `}>
                    {activity.status}
                  </span>
                </div>
                <p className="text-text-dark-secondary text-sm mt-1">{activity.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-xs text-text-dark-muted">
                  <span className="flex items-center">
                    <Icon name="Clock" size={12} className="mr-1" />
                    {activity.timestamp}
                  </span>
                  <span className="flex items-center">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    {activity.location}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Globe" size={12} className="mr-1" />
                    {activity.ip}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-text-dark-muted mb-4" />
            <h3 className="text-text-dark-primary font-medium mb-2">No Activities Found</h3>
            <p className="text-text-dark-secondary">No activities match your current filter criteria.</p>
          </div>
        )}
      </div>

      {/* Security Summary */}
      <div className="bg-gradient-to-br from-dark-secondary to-dark-surface p-6 rounded-xl border border-gray-700 shadow-neumorphic">
        <h2 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="Shield" size={20} className="mr-2" />
          Security Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-dark-surface p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-dark-secondary text-sm">Successful Logins</p>
                <p className="text-2xl font-bold text-success-dark">24</p>
              </div>
              <Icon name="CheckCircle" size={24} className="text-success-dark" />
            </div>
          </div>

          <div className="bg-dark-surface p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-dark-secondary text-sm">Failed Attempts</p>
                <p className="text-2xl font-bold text-error-dark">2</p>
              </div>
              <Icon name="AlertCircle" size={24} className="text-error-dark" />
            </div>
          </div>

          <div className="bg-dark-surface p-4 rounded-lg border border-gray-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-dark-secondary text-sm">Unique Locations</p>
                <p className="text-2xl font-bold text-info-dark">1</p>
              </div>
              <Icon name="MapPin" size={24} className="text-info-dark" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;