// src/pages/control-detail-management/components/NotificationPanel.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NotificationPanel = ({ notifications, onDismiss, onMarkAllRead }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [filter, setFilter] = useState('all'); // all, high, medium, low

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'deadline':
        return 'Clock';
      case 'approval':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      case 'update':
        return 'Bell';
      case 'reminder':
        return 'Calendar';
      default:
        return 'Info';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error-50 border-error-200';
      case 'medium':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'low':
        return 'text-success bg-success-50 border-success-200';
      default:
        return 'text-secondary-500 bg-secondary-50 border-secondary-200';
    }
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-error';
    
    switch (type) {
      case 'deadline':
        return 'text-warning';
      case 'approval':
        return 'text-primary';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      case 'update':
        return 'text-accent';
      case 'reminder':
        return 'text-primary';
      default:
        return 'text-secondary-500';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredNotifications = notifications?.filter(notification => {
    if (filter === 'all') return true;
    return notification.priority === filter;
  }) || [];

  const unreadCount = notifications?.length || 0;
  const highPriorityCount = notifications?.filter(n => n.priority === 'high').length || 0;

  return (
    <div className="bg-surface border border-border rounded-lg shadow-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Icon name="Bell" size={18} className="text-primary" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </div>
            
            <h3 className="font-semibold text-text-primary">Notifications</h3>
            
            {highPriorityCount > 0 && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-medium bg-error-100 text-error-700">
                <Icon name="AlertTriangle" size={10} />
                <span>{highPriorityCount} urgent</span>
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="text-xs text-primary hover:text-primary-700 nav-transition"
                title="Mark all as read"
              >
                Clear all
              </button>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-text-secondary hover:text-primary hover:bg-secondary-50 rounded nav-transition"
            >
              <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
            </button>
          </div>
        </div>
        
        {isExpanded && (
          <div className="flex items-center space-x-2 mt-3">
            <span className="text-xs text-text-secondary">Filter:</span>
            {['all', 'high', 'medium', 'low'].map(filterOption => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-2 py-1 text-xs rounded nav-transition ${
                  filter === filterOption
                    ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
                }`}
              >
                {filterOption === 'all' ? 'All' : filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {isExpanded && (
        <div className="max-h-80 overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            <div className="space-y-1">
              {filteredNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`
                    p-3 border-l-4 hover:bg-secondary-25 nav-transition cursor-pointer
                    ${notification.priority === 'high' ? 'border-error bg-error-25' :
                      notification.priority === 'medium'? 'border-warning bg-warning-25' : 'border-secondary-200'}
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`p-1 rounded ${notification.priority === 'high' ? 'bg-error-100' : 'bg-secondary-100'}`}>
                        <Icon 
                          name={getNotificationIcon(notification.type)} 
                          size={14} 
                          className={getNotificationColor(notification.type, notification.priority)}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-primary font-medium leading-relaxed">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-xs text-text-secondary">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          
                          <span className={`inline-flex px-1.5 py-0.5 rounded text-xs font-medium border ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDismiss?.(notification.id);
                      }}
                      className="p-1 text-text-secondary hover:text-text-primary hover:bg-secondary-100 rounded nav-transition ml-2"
                      title="Dismiss notification"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-text-secondary">
              <Icon name="Bell" size={32} className="mx-auto mb-2 text-secondary-300" />
              <p className="text-sm">
                {filter === 'all' ? 'No notifications' : `No ${filter} priority notifications`}
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Quick Actions */}
      {isExpanded && unreadCount > 0 && (
        <div className="p-3 border-t border-border bg-secondary-25">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">
              {unreadCount} notification{unreadCount !== 1 ? 's' : ''} pending
            </span>
            
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center space-x-1 px-2 py-1 text-xs bg-primary text-white rounded hover:bg-primary-700 nav-transition">
                <Icon name="Settings" size={10} />
                <span>Settings</span>
              </button>
              
              <button className="inline-flex items-center space-x-1 px-2 py-1 text-xs bg-secondary-100 text-text-secondary rounded hover:bg-secondary-200 nav-transition">
                <Icon name="Archive" size={10} />
                <span>Archive</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;