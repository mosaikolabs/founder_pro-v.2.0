import React from 'react';
import Icon from '../../../components/AppIcon';

const KPIWidget = ({ title, value, subtitle, trend, icon, color = 'primary' }) => {
  const colorMap = {
    primary: 'bg-gradient-primary',
    success: 'bg-gradient-success', 
    warning: 'bg-gradient-warning',
    info: 'bg-gradient-secondary'
  };

  return (
    <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-soft-lg transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${colorMap[color]} rounded-xl shadow-card`}>
          <Icon name={icon} size={24} className="text-white" />
        </div>
        {trend && (
          <span className="text-success text-sm font-medium bg-success/10 px-2 py-1 rounded-lg">
            {trend}
          </span>
        )}
      </div>
      
      {/* Content */}
      <div>
        <p className="text-text-secondary text-sm mb-1">{title}</p>
        <p className="text-text-primary text-3xl font-bold mb-1">{value}</p>
        {subtitle && (
          <p className="text-text-muted text-xs">{subtitle}</p>
        )}
      </div>
      
      {/* Subtle animation on hover */}
      <div className="mt-4 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${colorMap[color]} rounded-full transition-all duration-500 group-hover:w-full w-3/4`}></div>
      </div>
    </div>
  );
};

const KPIWidgets = () => {
  const widgets = [
    {
      title: "Active Strategic Areas",
      value: "11",
      subtitle: "AC modules in progress", 
      trend: "+2 this month",
      icon: "Zap",
      color: "primary"
    },
    {
      title: "Critical Action Items",
      value: "5", 
      subtitle: "Requiring immediate attention",
      trend: "-1 completed today",
      icon: "Target",
      color: "warning"
    },
    {
      title: "Milestone Checkpoints", 
      value: "8",
      subtitle: "Next 30 days",
      trend: "+3 upcoming", 
      icon: "Flag",
      color: "info"
    },
    {
      title: "Financial Runway",
      value: "14",
      subtitle: "Months remaining",
      trend: "Stable projection",
      icon: "DollarSign", 
      color: "success"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {widgets.map((widget, index) => (
        <KPIWidget key={index} {...widget} />
      ))}
    </div>
  );
};

export default KPIWidgets;