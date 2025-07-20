// src/pages/system-configuration-dashboard/index.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Icon from '../../components/AppIcon';
import TabNavigation from './components/TabNavigation';
import GeneralSettings from './components/GeneralSettings';
import IntegrationManagement from './components/IntegrationManagement';
import NotificationRules from './components/NotificationRules';
import BackupManagement from './components/BackupManagement';
import PerformanceMonitoring from './components/PerformanceMonitoring';
import SystemHealthCard from './components/SystemHealthCard';





const SystemConfigurationDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [userRole, setUserRole] = useState('System Administrator');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [systemHealth, setSystemHealth] = useState({
    overall: 'Healthy',
    cpu: 45,
    memory: 72,
    disk: 58,
    network: 'Stable'
  });

  // Real-time system health monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemHealth(prev => ({
        ...prev,
        cpu: Math.max(40, Math.min(60, prev.cpu + Math.floor((Math.random() - 0.5) * 10))),
        memory: Math.max(60, Math.min(80, parseInt(prev.memory) + Math.floor((Math.random() - 0.5) * 10))) + '%',
        disk: Math.max(50, Math.min(70, parseInt(prev.disk) + Math.floor((Math.random() - 0.5) * 10))) + '%'
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboardShortcuts = (e) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case 'e':
            e.preventDefault();
            setIsExportModalOpen(true);
            break;
          case 's':
            e.preventDefault();
            handleSaveConfiguration();
            break;
          case 'b':
            e.preventDefault();
            setIsBulkModalOpen(true);
            break;
          case 't':
            e.preventDefault();
            setIsTemplateModalOpen(true);
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyboardShortcuts);
    return () => document.removeEventListener('keydown', handleKeyboardShortcuts);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSaveConfiguration = () => {
    console.log('Saving configuration...');
    setHasUnsavedChanges(false);
    // Implement save logic
  };

  const handleTabChange = (tabId) => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to switch tabs?');
      if (!confirmed) return;
    }
    setActiveTab(tabId);
    setHasUnsavedChanges(false);
  };

  // Role-based access control
  const hasFullAccess = userRole === 'System Administrator';
  const hasLimitedAccess = userRole === 'Compliance Manager';

  const tabs = [
    { id: 'general', label: 'General Settings', icon: 'Settings' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'integrations', label: 'Integrations', icon: 'Zap' },
    { id: 'backup', label: 'Backup & Recovery', icon: 'Shield' },
    { id: 'performance', label: 'Performance', icon: 'Activity' }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark dark-theme">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="lg:ml-sidebar">
        <div className="p-4 lg:p-6">
          <Breadcrumbs />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-text-dark-primary mb-2">
                System Configuration Dashboard
              </h1>
              <p className="text-text-dark-secondary">
                Manage system settings, integrations, and performance monitoring
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button className="btn-secondary-dark inline-flex items-center space-x-2">
                <Icon name="Download" size={16} />
                <span>Export Config</span>
              </button>
              <button className="btn-primary-dark inline-flex items-center space-x-2">
                <Icon name="Save" size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          {/* System Health Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <SystemHealthCard
              title="Overall Status"
              value={systemHealth.overall}
              icon="CheckCircle"
              color="green"
            />
            <SystemHealthCard
              title="CPU Usage"
              value={`${systemHealth.cpu}%`}
              icon="Cpu"
              color="blue"
            />
            <SystemHealthCard
              title="Memory Usage"
              value={`${systemHealth.memory}%`}
              icon="HardDrive"
              color="yellow"
            />
            <SystemHealthCard
              title="Network Status"
              value={systemHealth.network}
              icon="Wifi"
              color="green"
            />
          </div>

          {/* Tab Navigation */}
          <TabNavigation 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {/* Tab Content */}
          <div className="neumorphic-card">
            {activeTab === 'general' && <GeneralSettings />}
            {activeTab === 'notifications' && <NotificationRules />}
            {activeTab === 'integrations' && <IntegrationManagement />}
            {activeTab === 'backup' && <BackupManagement />}
            {activeTab === 'performance' && <PerformanceMonitoring />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SystemConfigurationDashboard;