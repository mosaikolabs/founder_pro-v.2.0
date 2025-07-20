import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ControlDetailDrawer from '../../components/ui/ControlDetailDrawer';
import ComplianceStatusBanner from './components/ComplianceStatusBanner';
import KPIWidgets from './components/KPIWidgets';
import TabNavigation from './components/TabNavigation';
import ControlsMatrix from './components/ControlsMatrix';
import PolicyLibrary from './components/PolicyLibrary';
import AuditTimeline from './components/AuditTimeline';
import ExportModal from './components/ExportModal';
import Icon from '../../components/AppIcon';

const ComplianceDashboardOverview = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('controls-matrix');
  const [isControlDrawerOpen, setIsControlDrawerOpen] = useState(false);
  const [selectedControl, setSelectedControl] = useState(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [complianceData, setComplianceData] = useState({
    overallCompliance: 87,
    openControls: 23,
    expiredPolicies: 5,
    upcomingAudits: 8
  });

  // Mock real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setComplianceData(prev => ({
        ...prev,
        overallCompliance: Math.max(75, Math.min(95, prev.overallCompliance + (Math.random() - 0.5) * 2))
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleControlClick = (controlData) => {
    setSelectedControl(controlData);
    setIsControlDrawerOpen(true);
  };

  const handleExport = () => {
    setIsExportModalOpen(true);
  };

  const handleKeyboardShortcuts = (e) => {
    if (e.ctrlKey && e.key === 'e') {
      e.preventDefault();
      handleExport();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcuts);
    return () => document.removeEventListener('keydown', handleKeyboardShortcuts);
  }, []);

  const tabs = [
    {
      id: 'controls-matrix',
      label: 'Controls Matrix',
      icon: 'Grid3X3',
      count: complianceData.openControls
    },
    {
      id: 'policy-library',
      label: 'Policy Library',
      icon: 'BookOpen',
      count: complianceData.expiredPolicies
    },
    {
      id: 'audit-timeline',
      label: 'Audit Timeline',
      icon: 'Calendar',
      count: complianceData.upcomingAudits
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'controls-matrix':
        return <ControlsMatrix onControlClick={handleControlClick} />;
      case 'policy-library':
        return <PolicyLibrary />;
      case 'audit-timeline':
        return <AuditTimeline />;
      default:
        return <ControlsMatrix onControlClick={handleControlClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark dark-theme">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="lg:ml-sidebar">
        {/* Page Content */}
        <main>
          {/* Compliance Status Banner */}
          <ComplianceStatusBanner 
            compliancePercentage={complianceData.overallCompliance}
            onExport={handleExport}
          />

          <div className="p-4 lg:p-6">
            {/* Breadcrumbs */}
            <Breadcrumbs />

            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-2xl lg:text-3xl font-semibold text-text-dark-primary mb-2">
                  Compliance Dashboard
                </h1>
                <p className="text-text-dark-secondary">
                  Monitor organizational compliance status and manage controls across departments
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <button
                  onClick={handleExport}
                  className="btn-primary-dark inline-flex items-center space-x-2"
                  title="Export Dashboard (Ctrl+E)"
                >
                  <Icon name="Download" size={16} />
                  <span>Export PDF</span>
                </button>
                
                <button className="btn-secondary-dark inline-flex items-center space-x-2">
                  <Icon name="RefreshCw" size={16} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>
            </div>

            {/* KPI Widgets */}
            <KPIWidgets 
              openControls={complianceData.openControls}
              expiredPolicies={complianceData.expiredPolicies}
              upcomingAudits={complianceData.upcomingAudits}
            />

            {/* Tab Navigation */}
            <TabNavigation 
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Tab Content */}
            <div className="neumorphic-card">
              {renderTabContent()}
            </div>

            {/* Integration Status */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="neumorphic-card p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full neon-glow-green"></div>
                  <span className="text-sm text-text-dark-secondary">ERP Integration</span>
                  <span className="text-xs text-green-400 font-medium">Connected</span>
                </div>
              </div>
              <div className="neumorphic-card p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full neon-glow-green"></div>
                  <span className="text-sm text-text-dark-secondary">LDAP Sync</span>
                  <span className="text-xs text-green-400 font-medium">Active</span>
                </div>
              </div>
              <div className="neumorphic-card p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-text-dark-secondary">Document Management</span>
                  <span className="text-xs text-yellow-400 font-medium">Syncing</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Control Detail Drawer */}
      <ControlDetailDrawer
        isOpen={isControlDrawerOpen}
        onClose={() => setIsControlDrawerOpen(false)}
        controlData={selectedControl}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        activeTab={activeTab}
        complianceData={complianceData}
      />
    </div>
  );
};

export default ComplianceDashboardOverview;