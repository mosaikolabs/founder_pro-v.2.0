import React from 'react';
import Icon from '../AppIcon';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  error,
  helper,
  icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const inputClasses = `
    w-full px-4 py-3 neumorphic-input text-text-dark-primary placeholder-text-dark-muted
    focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green
    disabled:opacity-50 disabled:cursor-not-allowed
    ${icon && iconPosition === 'left' ? 'pl-12' : ''}
    ${icon && iconPosition === 'right' ? 'pr-12' : ''}
    ${error ? 'border-error-dark focus:border-error-dark focus:ring-error-dark' : ''}
    ${className}
  `.trim();

  return (
    <div className="space-y-2">
      {label && (
        <label className="form-label-dark">
          {label}
          {required && <span className="text-error-dark ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-dark-muted">
            <Icon name={icon} size={18} />
          </div>
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-dark-muted">
            <Icon name={icon} size={18} />
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-error-dark text-sm flex items-center space-x-1">
          <Icon name="AlertCircle" size={14} />
          <span>{error}</span>
        </p>
      )}
      
      {helper && !error && (
        <p className="text-text-dark-muted text-sm">{helper}</p>
      )}
    </div>
  );
};

export default Input;