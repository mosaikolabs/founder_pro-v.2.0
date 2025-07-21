import React from 'react';
import { cn } from '../../utils/cn';
import Icon from '../AppIcon';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon, 
  disabled = false,
  className,
  onClick,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-gradient-primary text-white shadow-soft hover:shadow-soft-lg focus:ring-primary-500',
    secondary: 'bg-gray-100 text-text-primary hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-transparent text-text-primary hover:bg-gray-50 focus:ring-primary-500',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-gray-100',
    success: 'bg-gradient-success text-white shadow-soft hover:shadow-soft-lg focus:ring-green-500',
    warning: 'bg-gradient-warning text-white shadow-soft hover:shadow-soft-lg focus:ring-yellow-500',
    error: 'bg-error text-white shadow-soft hover:shadow-soft-lg focus:ring-red-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-sm rounded-xl', 
    lg: 'px-6 py-3 text-base rounded-xl',
    xl: 'px-8 py-4 text-lg rounded-2xl'
  };
  
  const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';
  
  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && disabledStyles,
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <Icon name={icon} size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} className="mr-2" />
      )}
      {children}
    </button>
  );
};

export default Button;