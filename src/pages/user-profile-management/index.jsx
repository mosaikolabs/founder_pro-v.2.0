import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import ProfileSidebar from './components/ProfileSidebar';
import UserSettings from './components/UserSettings';
import AccountInformation from './components/AccountInformation';
import ActivityLogs from './components/ActivityLogs';

const UserProfileManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('settings');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'settings':
        return <UserSettings />;
      case 'account':
        return <AccountInformation />;
      case 'activity':
        return <ActivityLogs />;
      default:
        return <UserSettings />;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'settings':
        return 'User Settings';
      case 'account':
        return 'Account Information';
      case 'activity':
        return 'Activity Logs';
      default:
        return 'User Settings';
    }
  };

  return (
    <>
      <Helmet>
        <title>User Profile Management - ComplianceHub</title>
        <meta name="description" content="Manage your user profile, settings, and account information in ComplianceHub" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-dark">
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <ProfileSidebar
            isOpen={sidebarOpen}
            onToggle={toggleSidebar}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* Main Content */}
          <div className={`
            flex-1 flex flex-col overflow-hidden transition-all duration-300
            ${sidebarOpen ? 'md:ml-0' : 'md:ml-0'}
          `}>
            {/* Header */}
            <header className="flex items-center justify-between p-6 bg-gradient-to-r from-dark-secondary to-dark-surface border-b border-gray-700 shadow-neumorphic">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleSidebar}
                  className="md:hidden p-2 rounded-lg text-text-dark-secondary hover:text-text-dark-primary hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                  aria-label="Toggle sidebar"
                >
                  <Icon name="Menu" size={24} />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-text-dark-primary">{getSectionTitle()}</h1>
                  <p className="text-text-dark-secondary">Manage your profile and preferences</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-text-dark-secondary">
                  <Icon name="Clock" size={16} />
                  <span className="text-sm">Last updated: {new Date().toLocaleDateString()}</span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-neon-green rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-6 scrollbar-dark">
              <div className="max-w-7xl mx-auto">
                {renderActiveSection()}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileManagement;