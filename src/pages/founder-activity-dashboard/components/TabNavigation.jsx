import React from 'react';
        import Icon from '../../../components/AppIcon';

        const TabNavigation = ({ activeTab, onTabChange }) => {
          const tabs = [
            {
              id: 'roadmap',
              name: 'Roadmap Timeline',
              icon: 'Map',
              description: 'Chronological activity view'
            },
            {
              id: 'matrix',
              name: 'Activity Matrix',
              icon: 'Grid3X3',
              description: 'Business areas vs phases'
            },
            {
              id: 'milestones',
              name: 'Milestone Tracker',
              icon: 'Flag',
              description: 'Key achievements & goals'
            }
          ];

          return (
            <div className="bg-gradient-card rounded-neumorphic-lg p-1 shadow-neumorphic border border-slate-600">
              <div className="flex space-x-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
                      flex items-center space-x-3 px-6 py-4 rounded-neumorphic transition-all duration-300 flex-1 group
                      ${activeTab === tab.id 
                        ? 'bg-gradient-to-r from-neon-green to-neon-purple text-white shadow-neumorphic-inset' 
                        : 'text-text-dark-secondary hover:text-text-dark-primary hover:bg-gradient-to-r hover:from-dark-secondary/50 hover:to-dark-surface/50'
                      }
                    `}
                  >
                    <div className={`
                      p-2 rounded-lg transition-all duration-300
                      ${activeTab === tab.id 
                        ? 'bg-white/20' :'bg-dark-surface/30 group-hover:bg-neon-green/20'
                      }
                    `}>
                      <Icon 
                        name={tab.icon} 
                        size={18} 
                        className={`
                          transition-colors duration-300
                          ${activeTab === tab.id 
                            ? 'text-white' :'text-text-dark-muted group-hover:text-neon-green'
                          }
                        `} 
                      />
                    </div>
                    <div className="text-left flex-1">
                      <div className={`
                        font-semibold transition-colors duration-300
                        ${activeTab === tab.id 
                          ? 'text-white' :'text-text-dark-primary group-hover:text-neon-green'
                        }
                      `}>
                        {tab.name}
                      </div>
                      <div className={`
                        text-sm transition-colors duration-300
                        ${activeTab === tab.id 
                          ? 'text-white/80' :'text-text-dark-muted group-hover:text-text-dark-secondary'
                        }
                      `}>
                        {tab.description}
                      </div>
                    </div>
                    
                    {/* Active indicator */}
                    {activeTab === tab.id && (
                      <div className="w-1 h-8 bg-white rounded-full shadow-lg animate-pulse"></div>
                    )}
                    
                    {/* Hover indicator */}
                    {activeTab !== tab.id && (
                      <div className="w-1 h-8 bg-neon-green rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        };

        export default TabNavigation;