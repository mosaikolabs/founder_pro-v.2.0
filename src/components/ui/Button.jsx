import React from 'react';
import Icon from '../AppIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'btn-primary-dark',
    secondary: 'btn-secondary-dark',
    accent: 'bg-gradient-to-r from-neon-green to-neon-purple text-white hover:shadow-lg hover:shadow-neon-green/50',
    success: 'bg-gradient-to-r from-success-dark to-emerald-400 text-white hover:shadow-lg hover:shadow-success-dark/50',
    warning: 'bg-gradient-to-r from-warning-dark to-yellow-400 text-white hover:shadow-lg hover:shadow-warning-dark/50',
    error: 'bg-gradient-to-r from-error-dark to-red-400 text-white hover:shadow-lg hover:shadow-error-dark/50',
    ghost: 'text-text-dark-primary hover:bg-white hover:bg-opacity-10 border border-white border-opacity-20',
    outline: 'text-text-dark-primary border border-white border-opacity-20 hover:bg-white hover:bg-opacity-10'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-sm rounded-xl',
    lg: 'px-6 py-3 text-base rounded-xl',
    xl: 'px-8 py-4 text-lg rounded-xl'
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20
  };

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant] || variants.primary}
    ${sizes[size]}
    ${className}
  `.trim();

  const iconSize = iconSizes[size];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={buttonClasses}
      {...props}
    >
      {loading && (
        <Icon
          name="Loader2"
          size={iconSize}
          className="animate-spin mr-2"
        />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <Icon
          name={icon}
          size={iconSize}
          className="mr-2"
        />
      )}
      
      {children}
      
      {!loading && icon && iconPosition === 'right' && (
        <Icon
          name={icon}
          size={iconSize}
          className="ml-2"
        />
      )}
    </button>
  );
};

export default Button;