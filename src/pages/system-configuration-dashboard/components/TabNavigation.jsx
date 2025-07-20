// src/pages/system-configuration-dashboard/components/TabNavigation.jsx
import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="mb-6">
      <div className="border-b border-dark-surface">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs?.map((tab) => {
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange?.(tab.id)}
                className={`
                  flex flex-col items-start py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap nav-transition min-w-0
                  ${isActive
                    ? 'border-neon-green text-neon-green' :'border-transparent text-text-dark-secondary hover:text-text-dark-primary hover:border-text-dark-secondary'
                  }
                `}
                title={tab.description}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Icon 
                    name={tab.icon} 
                    size={16} 
                    className={isActive ? 'text-neon-green' : 'text-text-dark-secondary'}
                  />
                  <span className="font-medium">{tab.label}</span>
                </div>
                <span className={`text-xs leading-tight text-left ${
                  isActive ? 'text-neon-green opacity-70' : 'text-text-dark-secondary'
                }`}>
                  {tab.description}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;