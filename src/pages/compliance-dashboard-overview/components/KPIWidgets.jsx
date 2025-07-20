import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const KPIWidgets = ({ openControls = 23, expiredPolicies = 5, upcomingAudits = 8 }) => {
  const [activeWidget, setActiveWidget] = useState(null);

  const widgets = [
    {
      id: 'open-controls',
      title: 'Today\'s Money',
      value: `$${(openControls * 2304).toLocaleString()}`,
      rawValue: openControls,
      icon: 'DollarSign',
      color: 'success',
      trend: '+55%',
      trendDirection: 'up',
      description: 'Total revenue generated today',
      details: [
        { label: 'High Priority', value: 8, color: 'error' },
        { label: 'Medium Priority', value: 12, color: 'warning' },
        { label: 'Low Priority', value: 3, color: 'success' }
      ]
    },
    {
      id: 'expired-policies',
      title: 'Today\'s Users',
      value: `${(expiredPolicies * 430).toLocaleString()}`,
      rawValue: expiredPolicies,
      icon: 'Users',
      color: 'accent',
      trend: '+3%',
      trendDirection: 'up',
      description: 'Active users today',
      details: [
        { label: 'Overdue > 30 days', value: 2, color: 'error' },
        { label: 'Overdue < 30 days', value: 3, color: 'warning' },
        { label: 'Expiring Soon', value: 7, color: 'accent' }
      ]
    },
    {
      id: 'upcoming-audits',
      title: 'New Clients',
      value: `+${(upcomingAudits * 57).toLocaleString()}`,
      rawValue: upcomingAudits,
      icon: 'UserPlus',
      color: 'warning',
      trend: '-2%',
      trendDirection: 'down',
      description: 'New client acquisitions',
      details: [
        { label: 'This Week', value: 2, color: 'error' },
        { label: 'Next Week', value: 3, color: 'warning' },
        { label: 'This Month', value: 3, color: 'accent' }
      ]
    },
    {
      id: 'satisfaction-rate',
      title: 'Sales',
      value: `$${(103450).toLocaleString()}`,
      rawValue: 103450,
      icon: 'TrendingUp',
      color: 'success',
      trend: '+5%',
      trendDirection: 'up',
      description: 'Total sales volume',
      details: [
        { label: 'Online Sales', value: 75000, color: 'success' },
        { label: 'Retail Sales', value: 20000, color: 'warning' },
        { label: 'B2B Sales', value: 8450, color: 'accent' }
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      success: {
        bg: 'from-success-dark to-emerald-400',
        text: 'text-success-dark',
        icon: 'text-success-dark',
        glow: 'shadow-success-dark'
      },
      warning: {
        bg: 'from-warning-dark to-yellow-400',
        text: 'text-warning-dark',
        icon: 'text-warning-dark',
        glow: 'shadow-warning-dark'
      },
      error: {
        bg: 'from-error-dark to-red-400',
        text: 'text-error-dark',
        icon: 'text-error-dark',
        glow: 'shadow-error-dark'
      },
      accent: {
        bg: 'from-neon-blue to-blue-400',
        text: 'text-neon-blue',
        icon: 'text-neon-blue',
        glow: 'shadow-neon-blue'
      }
    };
    return colorMap[color] || colorMap.accent;
  };

  const handleWidgetClick = (widgetId) => {
    setActiveWidget(activeWidget === widgetId ? null : widgetId);
  };

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {widgets.map((widget) => {
          const colors = getColorClasses(widget.color);
          const isActive = activeWidget === widget.id;
          
          return (
            <div key={widget.id} className="relative">
              {/* Main Widget Card */}
              <div
                onClick={() => handleWidgetClick(widget.id)}
                className={`
                  neumorphic-card p-6 cursor-pointer float-animation hover:shadow-neumorphic-hover
                  ${isActive ? 'ring-2 ring-neon-green ring-opacity-50' : ''}
                `}
                style={{
                  background: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
                  animationDelay: `${widgets.indexOf(widget) * 0.1}s`
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg`}>
                      <Icon name={widget.icon} size={24} color="white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-text-dark-secondary uppercase tracking-wider">
                        {widget.title}
                      </h3>
                    </div>
                  </div>
                  <Icon 
                    name={isActive ? 'ChevronUp' : 'ChevronDown'} 
                    size={16} 
                    className="text-text-dark-muted"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="kpi-number">
                    {widget.value}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
                      widget.trendDirection === 'up' ?'bg-success-dark bg-opacity-20 text-success-dark' :'bg-error-dark bg-opacity-20 text-error-dark'
                    }`}>
                      <Icon 
                        name={widget.trendDirection === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                        size={14} 
                      />
                      <span className="text-xs font-bold">
                        {widget.trend}
                      </span>
                    </div>
                    <span className="text-xs text-text-dark-muted">
                      {widget.description}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown Panel */}
              {isActive && (
                <div className="absolute top-full left-0 right-0 mt-2 neumorphic-card border border-white border-opacity-20 z-10 p-4 animate-fade-in">
                  <h4 className="text-sm font-semibold text-text-dark-primary mb-3">
                    Detailed Breakdown
                  </h4>
                  <div className="space-y-3">
                    {widget.details.map((detail, index) => {
                      const detailColors = getColorClasses(detail.color);
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${detailColors.bg}`}></div>
                            <span className="text-sm text-text-dark-secondary">
                              {detail.label}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-text-dark-primary">
                            {typeof detail.value === 'number' ? detail.value.toLocaleString() : detail.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-white border-opacity-10">
                    <button className="w-full text-sm font-medium nav-transition btn-primary-dark">
                      View All Details →
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Click outside to close */}
      {activeWidget && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setActiveWidget(null)}
        />
      )}
    </div>
  );
};

export default KPIWidgets;