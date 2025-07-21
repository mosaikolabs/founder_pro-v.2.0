// src/components/ui/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../AppIcon';

const Sidebar = () => {
  const navigation = [
    {
      section: "DASHBOARD",
      items: [
        { id: "dashboard", title: "Dashboard", route: "/", icon: "Home" }
      ]
    },
    {
      section: "FOUNDER ACTIVITIES", 
      items: [
        { id: "founder-activity", title: "Founder Activity", route: "/founder-activity-dashboard", icon: "Activity" },
        { id: "strategic-matrix", title: "Strategic Matrix", route: "/controls-matrix-management", icon: "Grid3X3" },
        { id: "resources", title: "Resources Library", route: "/policy-library-management", icon: "BookOpen" },
        { id: "roadmap", title: "Roadmap Timeline", route: "/audit-timeline-scheduler", icon: "Calendar" }
      ]
    },
    {
      section: "STRATEGIC AREAS",
      items: [
        { id: "ac-001", title: "Strategy & Fundamentals", route: "/ac-001", icon: "Compass", badge: "AC-001" },
        { id: "ac-002", title: "Legal & Corporate", route: "/ac-002", icon: "Scale", badge: "AC-002" },
        { id: "ac-003", title: "Technology & Product", route: "/ac-003", icon: "Code", badge: "AC-003" },
        { id: "ac-004", title: "Finance & Metrics", route: "/ac-004", icon: "BarChart3", badge: "AC-004" },
        { id: "ac-005", title: "Marketing & Customers", route: "/ac-005", icon: "Target", badge: "AC-005" },
        { id: "ac-006", title: "Operations & Success", route: "/ac-006", icon: "Settings", badge: "AC-006" },
        { id: "ac-007", title: "Investment & Fundraising", route: "/ac-007", icon: "Diamond", badge: "AC-007" },
        { id: "ac-008", title: "Partnerships & Alliances", route: "/ac-008", icon: "Handshake", badge: "AC-008" },
        { id: "ac-009", title: "Scaling & Growth", route: "/ac-009", icon: "TrendingUp", badge: "AC-009" },
        { id: "ac-010", title: "Exit Strategy", route: "/ac-010", icon: "DoorOpen", badge: "AC-010" },
        { id: "ac-011", title: "Legacy Impact", route: "/ac-011", icon: "Heart", badge: "AC-011" }
      ]
    },
    {
      section: "FOUNDER INSIGHTS",
      items: [
        { id: "reports", title: "Progress Reports", route: "/compliance-reporting-center", icon: "FileText" },
        { id: "documents", title: "Document Management", route: "/control-detail-management", icon: "Folder" }
      ]
    },
    {
      section: "CONFIGURATION",
      items: [
        { id: "users", title: "User Management", route: "/user-role-administration", icon: "Users" },
        { id: "settings", title: "System Configuration", route: "/system-configuration-dashboard", icon: "Settings" },
        { id: "profile", title: "User Profile", route: "/user-profile-management", icon: "User" }
      ]
    }
  ];

  return (
    <div className="h-full p-4">
      {/* Logo Area */}
      <div className="flex items-center space-x-3 px-2 py-4 mb-6">
        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
          <Icon name="Zap" size={24} className="text-white" />
        </div>
        <div>
          <h2 className="font-bold text-text-primary">Founder Pro</h2>
          <p className="text-xs text-text-secondary">Startup Platform</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="space-y-6">
        {navigation.map((section) => (
          <div key={section.section}>
            <h3 className="px-2 text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
              {section.section}
            </h3>
            
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.route}
                    className={({ isActive }) => `
                      group flex items-center px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-primary text-white shadow-soft' 
                        : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon name={item.icon} size={20} className="mr-3 flex-shrink-0" />
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-lg">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;