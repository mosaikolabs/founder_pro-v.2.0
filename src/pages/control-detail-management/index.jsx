// src/pages/control-detail-management/index.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Icon from '../../components/AppIcon';
import ControlDefinitionTab from './components/ControlDefinitionTab';
import TestingProceduresTab from './components/TestingProceduresTab';
import EvidenceRequirementsTab from './components/EvidenceRequirementsTab';
import AssignmentHistoryTab from './components/AssignmentHistoryTab';
import BulkOperationsPanel from './components/BulkOperationsPanel';
import VersionControlPanel from './components/VersionControlPanel';
import IntegrationStatusPanel from './components/IntegrationStatusPanel';
import NotificationPanel from './components/NotificationPanel';
import MobileControlLookup from './components/MobileControlLookup';
import ExportModal from './components/ExportModal';

const ControlDetailManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('definition');
  const [selectedControls, setSelectedControls] = useState([]);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock control data
  const [controlData, setControlData] = useState({
    id: 'CTRL-001',
    name: 'Access Control Management',
    description: 'Comprehensive access control procedures for user authentication and authorization',
    category: 'Security',
    framework: 'SOX',
    riskLevel: 'High',
    owner: 'John Smith',
    status: 'Active',
    lastUpdated: '2024-01-15',
    nextReview: '2024-04-15',
    version: '2.1',
    compliance: {
      sox: { status: 'Compliant', lastTest: '2024-01-10' },
      iso27001: { status: 'Pending', lastTest: '2023-12-15' },
      gdpr: { status: 'Compliant', lastTest: '2024-01-05' }
    }
  });

  // Mock notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'deadline',
      message: 'Evidence collection deadline in 3 days for CTRL-001',
      priority: 'high',
      timestamp: '2024-01-12T10:30:00Z'
    },
    {
      id: 2,
      type: 'approval',
      message: 'Control modification pending approval',
      priority: 'medium',
      timestamp: '2024-01-12T09:15:00Z'
    }
  ]);

  const tabs = [
    { id: 'definition', label: 'Control Definition', icon: 'FileText' },
    { id: 'testing', label: 'Testing Procedures', icon: 'CheckSquare' },
    { id: 'evidence', label: 'Evidence Requirements', icon: 'Archive' },
    { id: 'history', label: 'Assignment History', icon: 'History' }
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
                Control Detail Management
              </h1>
              <p className="text-text-dark-secondary">
                Manage detailed control definitions, testing procedures, and evidence requirements
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="btn-secondary-dark inline-flex items-center space-x-2"
              >
                <Icon name="Download" size={16} />
                <span>Export Details</span>
              </button>
              <button className="btn-primary-dark inline-flex items-center space-x-2">
                <Icon name="Plus" size={16} />
                <span>Add Control</span>
              </button>
            </div>
          </div>

          {/* Search and Mobile Lookup */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-dark-secondary" />
                <input
                  type="text"
                  placeholder="Search controls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="neumorphic-input w-full pl-10 pr-4 py-2"
                />
              </div>
            </div>
            <div className="lg:hidden">
              <MobileControlLookup />
            </div>
          </div>

          {/* Bulk Operations Panel */}
          {selectedControls.length > 0 && (
            <BulkOperationsPanel
              selectedCount={selectedControls.length}
              onClearSelection={() => setSelectedControls([])}
              onExport={() => setIsExportModalOpen(true)}
            />
          )}

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Side Panels */}
            <div className="lg:col-span-3 space-y-6">
              <VersionControlPanel />
              <NotificationPanel />
              <IntegrationStatusPanel />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              {/* Tab Navigation */}
              <div className="neumorphic-card p-1 mb-6">
                <div className="flex space-x-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium nav-transition inline-flex items-center justify-center space-x-2 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-neon-green to-neon-purple text-white shadow-lg'
                          : 'text-text-dark-secondary hover:text-text-dark-primary hover:bg-white hover:bg-opacity-10'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="neumorphic-card">
                {activeTab === 'definition' && <ControlDefinitionTab />}
                {activeTab === 'testing' && <TestingProceduresTab />}
                {activeTab === 'evidence' && <EvidenceRequirementsTab />}
                {activeTab === 'history' && <AssignmentHistoryTab />}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        selectedControls={selectedControls}
      />
    </div>
  );
};

export default ControlDetailManagement;