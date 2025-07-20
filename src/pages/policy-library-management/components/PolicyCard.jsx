import React from 'react';
import Icon from '../../../components/AppIcon';

const PolicyCard = ({ 
  policy, 
  isSelected, 
  onSelect, 
  onClick, 
  getStatusColor 
}) => {
  const handleCardClick = (e) => {
    if (e.target.type !== 'checkbox') {
      onClick(policy);
    }
  };

  const isExpiringSoon = () => {
    const expirationDate = new Date(policy?.expirationDate);
    const today = new Date();
    const daysUntilExpiration = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiration <= 30 && daysUntilExpiration > 0;
  };

  const isExpired = () => {
    const expirationDate = new Date(policy?.expirationDate);
    const today = new Date();
    return expirationDate < today;
  };

  return (
    <div 
      className={`
        neumorphic-card p-6 cursor-pointer transition-all duration-300 relative
        ${isSelected ? 'ring-2 ring-neon-green ring-opacity-50 shadow-glow-neon' : 'hover:shadow-neumorphic-hover'}
      `}
      onClick={handleCardClick}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-4 right-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onSelect(policy?.id);
          }}
          className="w-4 h-4 text-neon-green bg-dark-primary border-white border-opacity-20 rounded focus:ring-neon-green focus:ring-2"
        />
      </div>

      {/* Policy Header */}
      <div className="mb-4 pr-8">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-text-dark-primary line-clamp-2">
            {policy?.name || 'Untitled Policy'}
          </h3>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
            policy?.status === 'Active' ? 'bg-success-dark bg-opacity-20 text-success-dark' :
            policy?.status === 'Draft' ? 'bg-warning-dark bg-opacity-20 text-warning-dark' :
            policy?.status === 'Expired'? 'bg-error-dark bg-opacity-20 text-error-dark' : 'bg-dark-elevated bg-opacity-50 text-text-dark-secondary'
          }`}>
            {policy?.status || 'Unknown'}
          </span>
          <span className="text-xs text-text-dark-secondary bg-dark-elevated bg-opacity-50 px-2 py-1 rounded-full border border-white border-opacity-10">
            v{policy?.version || '1.0'}
          </span>
          {isExpiringSoon() && (
            <span className="text-xs text-warning-dark bg-warning-dark bg-opacity-20 px-2 py-1 rounded-full">
              Expiring Soon
            </span>
          )}
          {isExpired() && (
            <span className="text-xs text-error-dark bg-error-dark bg-opacity-20 px-2 py-1 rounded-full">
              Expired
            </span>
          )}
        </div>

        <p className="text-sm text-text-dark-secondary line-clamp-3">
          {policy?.description || 'No description available'}
        </p>
      </div>

      {/* Policy Metadata */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-dark-muted">Category:</span>
          <span className="text-text-dark-primary font-medium">{policy?.category || 'Uncategorized'}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-dark-muted">Department:</span>
          <span className="text-text-dark-primary">{policy?.department || 'Unassigned'}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-dark-muted">Last Updated:</span>
          <span className="text-text-dark-primary font-data">{policy?.lastUpdated || 'Unknown'}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-dark-muted">Expires:</span>
          <span className={`font-data ${
            isExpired() ? 'text-error-dark' : isExpiringSoon() ?'text-warning-dark' : 'text-text-dark-primary'
          }`}>
            {policy?.expirationDate || 'No expiration'}
          </span>
        </div>
      </div>

      {/* Policy Stats */}
      <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-10">
        <div className="flex items-center space-x-4 text-xs text-text-dark-muted">
          <div className="flex items-center space-x-1">
            <Icon name="Download" size={12} />
            <span>{policy?.downloadCount || 0}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="FileText" size={12} />
            <span>{policy?.documentSize || 'N/A'}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Download policy:', policy?.id);
            }}
            className="p-1 text-text-dark-muted hover:text-neon-green transition-colors"
            title="Download Policy"
          >
            <Icon name="Download" size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Share policy:', policy?.id);
            }}
            className="p-1 text-text-dark-muted hover:text-neon-green transition-colors"
            title="Share Policy"
          >
            <Icon name="Share2" size={16} />
          </button>
        </div>
      </div>

      {/* Quick Preview Thumbnail */}
      <div className="mt-4 h-20 bg-dark-elevated bg-opacity-30 rounded-lg border border-white border-opacity-10 flex items-center justify-center">
        <Icon name="FileText" size={24} className="text-text-dark-muted" />
      </div>
    </div>
  );
};

export default PolicyCard;