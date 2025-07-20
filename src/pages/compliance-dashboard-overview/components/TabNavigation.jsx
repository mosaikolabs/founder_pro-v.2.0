import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="mb-6">
      <div className="border-b border-white border-opacity-20">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200
                  ${isActive
                    ? 'border-neon-green text-neon-green shadow-glow-neon' 
                    : 'border-transparent text-text-dark-secondary hover:text-text-dark-primary hover:border-neon-green hover:border-opacity-50 hover:shadow-glow-neon hover:shadow-opacity-30'
                  }
                `}
              >
                <Icon 
                  name={tab.icon} 
                  size={16} 
                  className={`transition-colors duration-200 ${isActive ? 'text-neon-green' : 'text-text-dark-secondary'}`}
                />
                <span className={`transition-colors duration-200 ${isActive ? 'text-neon-green' : 'text-text-dark-secondary'}`}>
                  {tab.label}
                </span>
                {tab.count > 0 && (
                  <span className={`
                    inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-neon text-white shadow-glow-neon' 
                      : 'bg-gradient-elevated text-text-dark-secondary border border-white border-opacity-20 hover:border-neon-green hover:border-opacity-50 hover:text-text-dark-primary'
                    }
                  `}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;