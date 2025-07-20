import React from 'react';
import Icon from '../../../components/AppIcon';

const ControlCard = ({ 
  control, 
  isSelected, 
  onSelect, 
  onClick, 
  getRiskLevelColor, 
  getStatusColor,
  viewMode = 'grid' 
}) => {
  const handleSelectChange = (e) => {
    e.stopPropagation();
    onSelect(control.id, e.target.checked);
  };

  const handleCardClick = () => {
    onClick(control);
  };

  if (viewMode === 'list') {
    return (
      <div 
        className={`
          neumorphic-card p-4 cursor-pointer transition-all duration-300
          ${isSelected ? 'ring-2 ring-neon-green ring-opacity-50 shadow-glow-neon' : 'hover:shadow-lg'}
        `}
        onClick={handleCardClick}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleSelectChange}
              className="w-4 h-4 text-neon-green bg-dark-primary border-white border-opacity-20 rounded focus:ring-neon-green focus:ring-2"
            />
          </div>
          
          <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-green to-neon-purple flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" size={20} color="white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-text-dark-primary truncate" title={control.name}>
                    {control.name}
                  </h3>
                  <p className="text-sm text-neon-green font-medium">
                    {control.id}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(control.status)}`}>
                {control.status}
              </span>
            </div>
            
            <div className="text-sm text-text-dark-secondary">
              {control.framework}
            </div>
            
            <div className="text-sm text-text-dark-secondary">
              {control.category}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getRiskLevelColor(control.riskLevel)}`}>
                {control.riskLevel}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`
        neumorphic-card p-6 cursor-pointer transition-all duration-300 h-full flex flex-col
        ${isSelected ? 'ring-2 ring-neon-green ring-opacity-50 shadow-glow-neon' : 'hover:shadow-lg'}
      `}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-green to-neon-purple flex items-center justify-center flex-shrink-0">
            <Icon name="Shield" size={20} color="white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-text-dark-primary truncate" title={control.name}>
              {control.name}
            </h3>
            <p className="text-sm text-neon-green font-medium">
              {control.id}
            </p>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelectChange}
            className="w-4 h-4 text-neon-green bg-dark-primary border-white border-opacity-20 rounded focus:ring-neon-green focus:ring-2"
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-text-dark-secondary mb-4 line-clamp-3 flex-1">
        {control.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {control.tags.slice(0, 3).map(tag => (
          <span 
            key={tag} 
            className="px-2 py-1 bg-dark-elevated bg-opacity-50 text-text-dark-secondary text-xs rounded-lg border border-white border-opacity-10"
          >
            {tag}
          </span>
        ))}
        {control.tags.length > 3 && (
          <span className="px-2 py-1 bg-dark-elevated bg-opacity-50 text-text-dark-muted text-xs rounded-lg border border-white border-opacity-10">
            +{control.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Status and Risk Level */}
      <div className="flex items-center justify-between mb-4">
        <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(control.status)}`}>
          {control.status}
        </span>
        <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getRiskLevelColor(control.riskLevel)}`}>
          {control.riskLevel}
        </span>
      </div>

      {/* Framework and Category */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-text-dark-secondary">
          <Icon name="Shield" size={14} className="mr-2" />
          <span className="truncate">{control.framework}</span>
        </div>
        <div className="flex items-center text-sm text-text-dark-secondary">
          <Icon name="Folder" size={14} className="mr-2" />
          <span className="truncate">{control.category}</span>
        </div>
      </div>

      {/* Effectiveness */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-dark-secondary">Effectiveness</span>
          <span className="text-text-dark-primary font-medium">{control.effectiveness}%</span>
        </div>
        <div className="w-full bg-dark-elevated rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              control.effectiveness >= 80 ? 'bg-gradient-to-r from-success-dark to-neon-green' :
              control.effectiveness >= 60 ? 'bg-gradient-to-r from-warning-dark to-neon-green': 'bg-gradient-to-r from-error-dark to-warning-dark'
            }`}
            style={{ width: `${control.effectiveness}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlCard;