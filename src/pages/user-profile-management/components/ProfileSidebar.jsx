import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ProfileSidebar = ({ isOpen, onToggle, activeSection, onSectionChange }) => {
  const location = useLocation();

  const navigationItems = [
    {
      id: 'settings',
      label: 'User Settings',
      icon: 'Settings',
      description: 'Manage preferences and configurations'
    },
    {
      id: 'account',
      label: 'Account Information',
      icon: 'User',
      description: 'Personal details and profile information'
    },
    {
      id: 'activity',
      label: 'Activity Logs',
      icon: 'Activity',
      description: 'Recent actions and system interactions'
    }
  ];

  const handleSectionClick = (sectionId) => {
    onSectionChange(sectionId);
    if (window.innerWidth < 768) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-80 z-50 md:relative md:w-80 md:z-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isOpen ? 'md:w-80' : 'md:w-20'}
        `}
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          borderRight: '1px solid rgba(139, 92, 246, 0.2)'
        }}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className={`flex items-center space-x-3 ${isOpen ? 'block' : 'hidden md:block'}`}>
              <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-purple rounded-xl flex items-center justify-center shadow-neumorphic">
                <Icon name="User" size={24} color="white" />
              </div>
              <div className={`${isOpen ? 'block' : 'hidden'}`}>
                <h2 className="text-xl font-bold text-text-dark-primary">Profile</h2>
                <p className="text-sm text-text-dark-secondary">User Management</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg text-text-dark-secondary hover:text-text-dark-primary hover:bg-white hover:bg-opacity-10 transition-all duration-300"
              aria-label="Toggle sidebar"
            >
              <Icon name={isOpen ? "ChevronLeft" : "ChevronRight"} size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className="space-y-2 px-4">
              {navigationItems.map((item) => {
                const isActive = activeSection === item.id;
                
                return (
                  <div key={item.id} className="relative group">
                    <button
                      onClick={() => handleSectionClick(item.id)}
                      className={`
                        w-full flex items-center p-4 rounded-xl text-left transition-all duration-300
                        ${isActive
                          ? 'bg-gradient-to-r from-neon-green to-neon-purple text-white shadow-glow-neon' 
                          : 'text-text-dark-secondary hover:text-text-dark-primary hover:bg-white hover:bg-opacity-10'
                        }
                        ${isOpen ? 'justify-start' : 'justify-center md:justify-start'}
                      `}
                      title={!isOpen ? item.label : ''}
                    >
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                        ${isActive 
                          ? 'bg-white bg-opacity-20' :'bg-white bg-opacity-10'
                        }
                      `}>
                        <Icon 
                          name={item.icon} 
                          size={20} 
                          color={isActive ? 'white' : 'currentColor'}
                        />
                      </div>
                      
                      <div className={`ml-4 ${isOpen ? 'block' : 'hidden'}`}>
                        <div className="font-medium text-sm">{item.label}</div>
                        <div className="text-xs text-text-dark-muted mt-1">
                          {item.description}
                        </div>
                      </div>

                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0"></div>
                      )}
                    </button>
                    
                    {/* Tooltip for collapsed state */}
                    {!isOpen && (
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-3 py-2 bg-dark-secondary text-text-dark-primary text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 border border-white border-opacity-20 shadow-lg hidden md:block">
                        {item.label}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-dark-secondary border-l border-t border-white border-opacity-20 rotate-45"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div className={`flex items-center space-x-3 ${isOpen ? 'block' : 'hidden'}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-neon-green rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-text-dark-primary">Mark Johnson</div>
                <div className="text-xs text-text-dark-secondary">Compliance Officer</div>
              </div>
            </div>
            {!isOpen && (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-neon-green rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;