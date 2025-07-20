import React from 'react';
import Icon from '../../../components/AppIcon';
import StarRating from './StarRating';
import { getCategoryIcon, formatComponentName } from '../utils/templateUtils';

const TemplateCard = ({ template, onUse, onPreview }) => {
  const handleUse = () => {
    onUse?.(template);
  };

  const handlePreview = () => {
    onPreview?.(template);
  };

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <div 
      className="bg-white border border-slate-200 rounded-lg hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden flex flex-col"
      role="article"
      aria-label={`Template: ${template?.name}`}
    >
      {/* Header with icon and badges */}
      <div className="relative h-36 bg-gradient-to-br from-blue-50 via-sky-50 to-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/5" />
        <Icon 
          name={getCategoryIcon(template?.category)} 
          size={40} 
          className="text-blue-600 relative z-10 group-hover:scale-110 transition-transform duration-300"
          aria-hidden="true"
        />
        
        {template?.isPredefined && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-blue-600 text-white text-xs rounded-full font-medium shadow-sm">
            Official
          </span>
        )}
        
        {template?.rating && (
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <StarRating rating={template.rating} showValue={false} />
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-slate-900 leading-tight line-clamp-2 min-h-[2.5rem]">
            {template?.name}
          </h3>
        </div>
        
        {/* Description */}
        <div className="mb-4">
          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed min-h-[3rem]">
            {template?.description}
          </p>
        </div>
        
        {/* Metadata */}
        <div className="space-y-3 mb-4">
          {template?.rating && (
            <div className="flex items-center justify-between">
              <StarRating rating={template.rating} />
              <span className="text-xs text-slate-500">
                {template?.usageCount > 0 ? `${template.usageCount} uses` : 'New'}
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 truncate flex-1 mr-2">
              By {template?.author}
            </span>
            <span className="text-blue-600 font-medium flex-shrink-0">
              {template?.estimatedTime}
            </span>
          </div>
          
          <div className="text-xs text-slate-500">
            Modified {template?.lastModified}
          </div>
        </div>
        
        {/* Components */}
        <div className="mb-5">
          <div className="text-xs text-slate-500 mb-2 font-medium">
            Components ({template?.components?.length || 0}):
          </div>
          <div className="flex flex-wrap gap-2">
            {template?.components?.slice(0, 3)?.map(component => (
              <span 
                key={component} 
                className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md border border-slate-200 font-medium"
              >
                {formatComponentName(component)}
              </span>
            ))}
            {template?.components?.length > 3 && (
              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md flex-shrink-0 border border-slate-200 font-medium">
                +{template.components.length - 3} more
              </span>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="mt-auto pt-4 border-t border-slate-200">
          <div className="flex space-x-3">
            <button
              onClick={handleUse}
              onKeyDown={(e) => handleKeyDown(e, handleUse)}
              className="flex-1 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`Use template: ${template?.name}`}
            >
              Use Template
            </button>
            <button 
              onClick={handlePreview}
              onKeyDown={(e) => handleKeyDown(e, handlePreview)}
              className="px-3 py-2.5 bg-white border border-slate-300 text-slate-600 text-sm rounded-md hover:text-slate-900 hover:bg-slate-50 transition-colors duration-200 flex-shrink-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              title="Preview Template"
              aria-label={`Preview template: ${template?.name}`}
            >
              <Icon name="Eye" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;