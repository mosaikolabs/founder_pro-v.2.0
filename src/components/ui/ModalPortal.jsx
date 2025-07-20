import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../AppIcon';

const ModalPortal = ({ 
  children, 
  isOpen, 
  onClose, 
  title, 
  size = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  backdropClassName = '',
  contentClassName = ''
}) => {
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  // Size configurations
  const sizeClasses = {
    sm: 'max-w-md',
    default: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-7xl'
  };

  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previouslyFocusedElement.current = document.activeElement;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus the modal
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.focus();
        }
      }, 100);
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Restore focus to previously focused element
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && closeOnEscape && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose, closeOnEscape]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 min-h-screen ${backdropClassName}`}
      onClick={handleOverlayClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        minWidth: '100vw'
      }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-dark-primary/95 backdrop-blur-sm transition-opacity duration-300"
        style={{ 
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(49, 46, 129, 0.95) 100%)',
          backdropFilter: 'blur(8px)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
      
      {/* Modal Container */}
      <div 
        ref={modalRef}
        className={`relative w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col animate-fadeIn ${className}`}
        onClick={handleModalClick}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        style={{ 
          transform: 'translateY(0)',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 10000
        }}
      >
        {/* Modal Content */}
        <div className={`neumorphic-card bg-gradient-elevated border-dark shadow-large flex flex-col h-full max-h-[90vh] overflow-hidden w-full ${contentClassName}`}>
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-dark bg-dark-secondary/20 flex-shrink-0">
              {title && (
                <div>
                  <h2 id="modal-title" className="text-xl font-semibold text-text-dark-primary">
                    {title}
                  </h2>
                </div>
              )}
              
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 text-text-dark-secondary hover:text-text-dark-primary rounded-lg hover:bg-dark-elevated transition-colors"
                  aria-label="Close modal"
                >
                  <Icon name="X" size={20} />
                </button>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ModalPortal;