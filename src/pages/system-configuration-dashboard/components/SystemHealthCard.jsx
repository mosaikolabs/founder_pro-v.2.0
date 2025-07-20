// src/pages/system-configuration-dashboard/components/SystemHealthCard.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealthCard = ({ title, value, icon, trend, color = 'primary' }) => {
  const colorMap = {
    primary: {
      bg: 'from-neon-blue to-blue-400',
      text: 'text-neon-blue',
      icon: 'text-neon-blue'
    },
    success: {
      bg: 'from-success-dark to-emerald-400',
      text: 'text-success-dark',
      icon: 'text-success-dark'
    },
    warning: {
      bg: 'from-warning-dark to-yellow-400',
      text: 'text-warning-dark',
      icon: 'text-warning-dark'
    },
    error: {
      bg: 'from-error-dark to-red-400',
      text: 'text-error-dark',
      icon: 'text-error-dark'
    },
    secondary: {
      bg: 'from-dark-elevated to-dark-surface',
      text: 'text-text-dark-secondary',
      icon: 'text-text-dark-secondary'
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return { icon: 'TrendingUp', color: 'text-success-dark' };
      case 'down':
        return { icon: 'TrendingDown', color: 'text-error-dark' };
      case 'neutral':
      default:
        return { icon: 'Minus', color: 'text-text-dark-muted' };
    }
  };

  const trendInfo = getTrendIcon();
  const colors = colorMap[color] || colorMap.primary;

  return (
    <div className="neumorphic-card p-6 hover:shadow-neumorphic-hover transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        <div className={`p-2 rounded-lg bg-dark-elevated bg-opacity-30 ${trendInfo.color}`}>
          <Icon name={trendInfo.icon} size={16} />
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium text-text-dark-secondary uppercase tracking-wider">
          {title}
        </p>
        <p className="text-2xl font-bold text-text-dark-primary">
          {typeof value === 'string' ? value : value?.toLocaleString?.()}
        </p>
      </div>
    </div>
  );
};

export default SystemHealthCard;