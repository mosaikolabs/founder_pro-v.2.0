// src/components/ui/Sidebar.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = ({ isOpen, onClose, userRole = 'Compliance Officer' }) => {
  const location = useLocation();

  const navigationItems = [
    {
      section: 'Dashboard',
      items: [
        {
          label: 'Compliance Overview',
          path: '/compliance-dashboard-overview',
          icon: 'BarChart3',
          roles: ['Compliance Officer', 'C-level Executive', 'Risk Management Team', 'Department Head'],
          tooltip: 'Real-time compliance status and KPI overview'
        }
      ]
    },
    {
      section: 'Operations',
      items: [
        {
          label: 'Controls Matrix',
          path: '/controls-matrix-management',
          icon: 'Grid3X3',
          roles: ['Compliance Officer', 'Risk Management Team', 'Department Head'],
          tooltip: 'Manage compliance controls and requirements'
        },
        {
          label: 'Policy Library',
          path: '/policy-library-management',
          icon: 'BookOpen',
          roles: ['Compliance Officer', 'Risk Management Team', 'Department Head'],
          tooltip: 'Centralized policy documentation and management'
        },
        {
          label: 'Audit Timeline',
          path: '/audit-timeline-scheduler',
          icon: 'Calendar',
          roles: ['Compliance Officer', 'Risk Management Team'],
          tooltip: 'Schedule and track audit activities'
        }
      ]
    },
    {
      section: 'Reports',
      items: [
        {
          label: 'Reporting Center',
          path: '/compliance-reporting-center',
          icon: 'FileText',
          roles: ['Compliance Officer', 'C-level Executive', 'Risk Management Team', 'Department Head'],
          tooltip: 'Generate compliance reports and analytics'
        }
      ]
    },
    {
      section: 'Administration',
      items: [
        {
          label: 'User Management',
          path: '/user-role-administration',
          icon: 'Users',
          roles: ['Compliance Officer'],
          tooltip: 'Manage user roles and permissions'
        },
        {
          label: 'System Configuration',
          path: '/system-configuration-dashboard',
          icon: 'Settings',
          roles: ['Compliance Officer'],
          tooltip: 'Configure system settings and preferences'
        }
      ]
    }
  ];

  const isActiveSection = (sectionItems) => {
    return sectionItems.some(item => location.pathname === item.path);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const hasAccess = (roles) => {
    return roles.includes(userRole);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-mobile-nav lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-sidebar z-sidebar
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          neumorphic-card
          overflow-hidden
        `}
        style={{ 
          zIndex: 200,
          background: 'linear-gradient(135deg, #334155 0%, #475569 100%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4 border-b border-white border-opacity-10 min-h-0">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-neon-green to-neon-purple rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Icon name="Shield" size={24} color="white" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xl font-bold text-text-dark-primary block truncate">
                  ComplianceHub
                </span>
                <div className="text-xs text-neon-green font-medium">
                  Enterprise
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg text-text-dark-secondary hover:text-text-dark-primary hover:bg-white hover:bg-opacity-10 nav-transition flex-shrink-0"
              aria-label="Close navigation menu"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* User Welcome Section */}
          <div className="p-4 border-b border-white border-opacity-10 min-h-0">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-neon-green rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-text-dark-primary truncate">
                  Welcome back, Mark Johnson
                </div>
                <div className="text-xs text-text-dark-secondary truncate">
                  {userRole}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 scrollbar-dark">
            <div className="space-y-8">
              {navigationItems.map((section) => {
                const accessibleItems = section.items.filter(item => hasAccess(item.roles));
                
                if (accessibleItems.length === 0) return null;

                const sectionActive = isActiveSection(accessibleItems);

                return (
                  <div key={section.section}>
                    <div className="px-6 mb-4">
                      <h3 className={`
                        text-xs font-bold uppercase tracking-wider truncate
                        ${sectionActive ? 'neon-green' : 'text-text-dark-muted'}
                      `}>
                        {section.section}
                      </h3>
                    </div>
                    <div className="space-y-2 px-4">
                      {accessibleItems.map((item) => {
                        const isActive = isActivePath(item.path);
                        
                        return (
                          <div key={item.path} className="relative group">
                            <button
                              onClick={() => handleNavigation(item.path)}
                              className={`
                                w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium nav-transition min-w-0
                                ${isActive
                                  ? 'bg-gradient-to-r from-neon-green to-neon-purple text-white shadow-lg neon-glow-green' 
                                  : 'text-text-dark-secondary hover:text-text-dark-primary hover:bg-white hover:bg-opacity-10 neumorphic-button'
                                }
                              `}
                              title={item.tooltip}
                            >
                              <div className={`
                                w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0
                                ${isActive 
                                  ? 'bg-white bg-opacity-20' :'bg-white bg-opacity-10'
                                }
                              `}>
                                <Icon 
                                  name={item.icon} 
                                  size={18} 
                                  color={isActive ? 'white' : 'currentColor'}
                                />
                              </div>
                              <span className="truncate flex-1 min-w-0">{item.label}</span>
                              {isActive && (
                                <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0"></div>
                              )}
                            </button>
                            
                            {/* Tooltip */}
                            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-3 py-2 bg-dark-secondary text-text-dark-primary text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-modal hidden lg:block border border-white border-opacity-20 shadow-lg max-w-xs">
                              {item.tooltip}
                              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-dark-secondary border-l border-t border-white border-opacity-20 rotate-45"></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white border-opacity-10 min-h-0">
            <div className="text-xs text-text-dark-muted">
              <div className="flex items-center justify-between min-w-0">
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-text-dark-secondary truncate">ComplianceHub v2.1</div>
                  <div className="truncate">Enterprise Edition</div>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <div className="w-2 h-2 bg-success-dark rounded-full animate-pulse"></div>
                  <span className="text-success-dark font-medium">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;