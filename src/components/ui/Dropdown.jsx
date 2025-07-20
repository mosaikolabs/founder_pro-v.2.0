import React, { useState, useRef, useEffect } from 'react';
import ReactSelect from 'react-select';
import Icon from '../AppIcon';

const Dropdown = ({
  trigger,
  children,
  placement = 'bottom-start',
  offset = 8,
  width = 'auto',
  maxHeight = '300px',
  disabled = false,
  closeOnSelect = true,
  className = '',
  onOpen,
  onClose,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  // Enhanced position calculation with better alignment
  const calculatePosition = () => {
    if (!triggerRef.current || !dropdownRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = 0;
    let left = 0;

    // Calculate horizontal position with better precision
    switch (placement) {
      case 'bottom-start': case'top-start':
        left = triggerRect.left + scrollX;
        break;
      case 'bottom-end': case'top-end':
        left = triggerRect.right + scrollX - dropdownRect.width;
        break;
      case 'bottom-center': case'top-center':
        left = triggerRect.left + scrollX + (triggerRect.width - dropdownRect.width) / 2;
        break;
      default:
        left = triggerRect.left + scrollX;
    }

    // Calculate vertical position with better precision
    switch (placement) {
      case 'bottom-start': case'bottom-end': case'bottom-center':
        top = triggerRect.bottom + scrollY + offset;
        // Check if dropdown would go below viewport
        if (top + dropdownRect.height > viewportHeight + scrollY) {
          top = triggerRect.top + scrollY - dropdownRect.height - offset;
        }
        break;
      case 'top-start': case'top-end': case'top-center':
        top = triggerRect.top + scrollY - dropdownRect.height - offset;
        // Check if dropdown would go above viewport
        if (top < scrollY) {
          top = triggerRect.bottom + scrollY + offset;
        }
        break;
    }

    // Ensure dropdown stays within viewport horizontally with better boundaries
    const minLeft = scrollX + 8;
    const maxLeft = scrollX + viewportWidth - dropdownRect.width - 8;
    
    if (left < minLeft) {
      left = minLeft;
    } else if (left > maxLeft) {
      left = maxLeft;
    }

    // Ensure dropdown stays within viewport vertically with better boundaries
    const minTop = scrollY + 8;
    const maxTop = scrollY + viewportHeight - dropdownRect.height - 8;
    
    if (top < minTop) {
      top = minTop;
    } else if (top > maxTop) {
      top = maxTop;
    }

    setPosition({ top, left });
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        onClose?.();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('scroll', calculatePosition, true);
      window.addEventListener('resize', calculatePosition);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('scroll', calculatePosition, true);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isOpen, onClose]);

  // Calculate position when dropdown opens with improved timing
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      // Use requestAnimationFrame for better positioning timing
      requestAnimationFrame(() => {
        if (dropdownRef.current) {
          calculatePosition();
        }
      });
    }
  }, [isOpen, placement, offset]);

  const toggleDropdown = () => {
    if (disabled) return;
    
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    if (newIsOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  };

  const handleItemClick = (event) => {
    if (closeOnSelect) {
      setIsOpen(false);
      onClose?.();
    }
  };

  return (
    <div className={`relative ${className}`} {...props}>
      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={toggleDropdown}
        className={`dropdown-trigger ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        {trigger}
      </div>

      {/* Dropdown Portal */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`dropdown-portal fixed z-dropdown`}
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: width === 'auto' ? 'auto' : width,
            maxHeight: maxHeight,
            minWidth: '200px'
          }}
        >
          <div
            className="dropdown-content neumorphic-card p-2 overflow-y-auto scrollbar-dark animate-dropdown-enter"
            onClick={handleItemClick}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

// Dropdown item component
const DropdownItem = ({
  children,
  onClick,
  disabled = false,
  danger = false,
  className = '',
  icon,
  ...props
}) => {
  const handleClick = (e) => {
    if (disabled) return;
    onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`dropdown-item w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 flex items-center space-x-2 ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : danger
          ? 'text-error-dark hover:bg-error-dark hover:bg-opacity-20 hover:text-error-dark' :'text-text-dark-primary hover:bg-neon-green hover:bg-opacity-20 hover:text-neon-green'
      } ${className}`}
      {...props}
    >
      {icon && <Icon name={icon} size={16} />}
      <span>{children}</span>
    </button>
  );
};

// Dropdown divider component
const DropdownDivider = ({ className = '' }) => (
  <div className={`dropdown-divider my-1 h-px bg-white bg-opacity-10 ${className}`} />
);

// Dropdown header component
const DropdownHeader = ({ children, className = '' }) => (
  <div className={`dropdown-header px-3 py-2 text-xs font-medium text-text-dark-muted uppercase tracking-wider ${className}`}>
    {children}
  </div>
);

// Enhanced Select component using react-select
const Select = ({
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  disabled = false,
  error = false,
  className = '',
  width = '100%',
  isMulti = false,
  isSearchable = true,
  isClearable = false,
  ...props
}) => {
  const selectedOption = options.find(opt => opt.value === value);
  
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#334155',
      border: error 
        ? '1px solid var(--error-dark)' 
        : state.isFocused 
          ? '1px solid var(--neon-green)' 
          : '1px solid #475569',
      borderRadius: '0.5rem',
      boxShadow: state.isFocused 
        ? error 
          ? '0 0 0 1px var(--error-dark)' 
          : '0 0 0 1px var(--neon-green), 0 0 10px rgba(0, 255, 127, 0.3)' :'8px 8px 16px rgba(0, 0, 0, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.1)',
      minHeight: '40px',
      width: width,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      '&:hover': {
        borderColor: error ? 'var(--error-dark)' : 'var(--neon-green)',
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#334155',
      border: '1px solid #475569',
      borderRadius: '0.5rem',
      boxShadow: '8px 8px 16px rgba(0, 0, 0, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.1)',
      zIndex: 1000,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected 
        ? '#1E293B'
        : state.isFocused 
          ? '#475569' :'#334155',
      color: state.isSelected 
        ? 'var(--neon-green)' 
        : 'var(--text-dark-primary)',
      padding: '8px 12px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#475569',
        color: 'var(--neon-green)',
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--text-dark-primary)',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'var(--text-dark-muted)',
    }),
    input: (provided) => ({
      ...provided,
      color: 'var(--text-dark-primary)',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: 'var(--text-dark-muted)',
      '&:hover': {
        color: 'var(--neon-green)',
      }
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: 'var(--text-dark-muted)',
      '&:hover': {
        color: 'var(--error-dark)',
      }
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#1E293B',
      borderRadius: '0.25rem',
      border: '1px solid #475569',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'var(--neon-green)',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'var(--text-dark-muted)',
      backgroundColor: '#475569',
      '&:hover': {
        backgroundColor: 'var(--error-dark)',
        color: 'white',
      }
    }),
  };

  const handleChange = (selectedOption) => {
    if (isMulti) {
      onChange?.(selectedOption ? selectedOption.map(opt => opt.value) : []);
    } else {
      onChange?.(selectedOption ? selectedOption.value : null);
    }
  };

  const getValue = () => {
    if (isMulti) {
      return Array.isArray(value) ? options.filter(opt => value.includes(opt.value)) : [];
    } else {
      return selectedOption || null;
    }
  };

  return (
    <ReactSelect
      value={getValue()}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      isDisabled={disabled}
      isMulti={isMulti}
      isSearchable={isSearchable}
      isClearable={isClearable}
      styles={customStyles}
      className={`react-select-container ${className}`}
      classNamePrefix="react-select"
      {...props}
    />
  );
};

export default Dropdown;
export { DropdownItem, DropdownDivider, DropdownHeader, Select };