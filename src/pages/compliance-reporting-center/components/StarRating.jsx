import React from 'react';
import Icon from '../../../components/AppIcon';

const StarRating = ({ rating, size = 12, showValue = true }) => {
  if (!rating) return null;
  
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Icon
          key={star}
          name="Star"
          size={size}
          className={star <= rating ? 'text-amber-400 fill-current' : 'text-slate-300'}
        />
      ))}
      {showValue && (
        <span className="text-xs text-slate-500 ml-1" aria-label={`Rating: ${rating} out of 5`}>
          {rating}
        </span>
      )}
    </div>
  );
};

export default StarRating;