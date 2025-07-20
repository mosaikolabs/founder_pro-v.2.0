// src/pages/compliance-reporting-center/index.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Icon from '../../components/AppIcon';
import TemplateLibrary from './components/TemplateLibrary';

import ReportBuilderPanel from './components/ReportBuilderPanel';
import PreviewPanel from './components/PreviewPanel';
import DataSourcePanel from './components/DataSourcePanel';
import ExportModal from './components/ExportModal';
import ScheduleModal from './components/ScheduleModal';
import FilterPanel from '../audit-timeline-scheduler/components/FilterPanel';



const ComplianceReportingCenter = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('builder'); // builder, templates, scheduled
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [reportConfig, setReportConfig] = useState({
    title: '',
    description: '',
    dataSources: [],
    filters: {},
    template: null
  });

  // Add missing state variables
  const [savedReports, setSavedReports] = useState([]);
  const [selectedDataSources, setSelectedDataSources] = useState([]);
  const [reportComponents, setReportComponents] = useState([]);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    departments: [],
    frameworks: [],
    metrics: []
  });

  // Mock data for demonstration
  useEffect(() => {
    // Simulate loading saved reports
    setSavedReports([
      {
        id: 1,
        name: 'Monthly Compliance Dashboard',
        type: 'executive',
        lastModified: '2024-01-15',
        components: ['kpi-overview', 'control-status', 'trend-analysis']
      },
      {
        id: 2,
        name: 'SOX Compliance Report',
        type: 'regulatory',
        lastModified: '2024-01-14',
        components: ['sox-controls', 'testing-results', 'deficiency-summary']
      }
    ]);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleDataSourceSelect = (dataSource) => {
    if (selectedDataSources.some(ds => ds?.id === dataSource?.id)) {
      setSelectedDataSources(selectedDataSources.filter(ds => ds?.id !== dataSource?.id));
    } else {
      setSelectedDataSources([...selectedDataSources, dataSource]);
    }
  };

  const handleComponentAdd = (component) => {
    setReportComponents([...reportComponents, {
      ...component,
      id: Date.now(),
      position: reportComponents.length
    }]);
  };

  const handleComponentRemove = (componentId) => {
    setReportComponents(reportComponents.filter(comp => comp?.id !== componentId));
  };

  const handleComponentReorder = (dragIndex, hoverIndex) => {
    const newComponents = [...reportComponents];
    const draggedComponent = newComponents[dragIndex];
    newComponents.splice(dragIndex, 1);
    newComponents.splice(hoverIndex, 0, draggedComponent);
    setReportComponents(newComponents);
  };

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setReportData({
        id: Date.now(),
        name: 'Custom Report',
        generatedAt: new Date().toISOString(),
        dataSources: selectedDataSources,
        components: reportComponents,
        filters: filters
      });
    } catch (error) {
      console.error('Report generation failed:', error);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleExport = () => {
    setIsExportModalOpen(true);
  };

  const handleSchedule = () => {
    setIsScheduleModalOpen(true);
  };

  const handleKeyboardShortcuts = (e) => {
    if (e.ctrlKey) {
      switch (e.key) {
        case 'e':
          e.preventDefault();
          handleExport();
          break;
        case 's':
          e.preventDefault();
          // Handle save report
          break;
        case 'n':
          e.preventDefault();
          // Handle new report
          setReportComponents([]);
          setSelectedDataSources([]);
          setReportData(null);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShortcuts);
    return () => document.removeEventListener('keydown', handleKeyboardShortcuts);
  }, []);

  const viewOptions = [
    { id: 'builder', label: 'Report Builder', icon: 'BarChart3' },
    { id: 'scheduled', label: 'Scheduled Reports', icon: 'Clock' }
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
                Compliance Reporting Center
              </h1>
              <p className="text-text-dark-secondary">
                Create, schedule, and manage compliance reports and analytics
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="btn-secondary-dark inline-flex items-center space-x-2"
              >
                <Icon name="Clock" size={16} />
                <span>Schedule Report</span>
              </button>
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="btn-primary-dark inline-flex items-center space-x-2"
              >
                <Icon name="Download" size={16} />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-sm font-medium text-text-dark-secondary">View:</span>
            <div className="flex items-center bg-dark-surface p-1 rounded-lg">
              {viewOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveView(option.id)}
                  className={`px-4 py-2 text-sm inline-flex items-center space-x-2 rounded-md nav-transition ${
                    activeView === option.id
                      ? 'bg-gradient-accent text-white shadow-sm' : 'text-text-dark-secondary hover:text-text-dark-primary'
                  }`}
                >
                  <Icon name={option.icon} size={16} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Side Panel */}
            <div className="lg:col-span-3">
              {activeView === 'builder' && (
                <div className="space-y-6">
                  <DataSourcePanel />
                  <FilterPanel 
                    filters={filters}
                    onFiltersChange={setFilters}
                  />
                </div>
              )}
              {activeView === 'templates' && (
                <TemplateLibrary 
                  savedReports={savedReports}
                  userRole="Compliance Officer"
                  onTemplateSelect={(template) => {
                    setReportConfig(prev => ({
                      ...prev,
                      template: template,
                      title: template?.name || '',
                      description: template?.description || '',
                      dataSources: template?.dataSources || [],
                      components: template?.components || []
                    }));
                    setActiveView('builder');
                  }}
                />
              )}
            </div>

            {/* Main Panel */}
            <div className="lg:col-span-9">
              {activeView === 'builder' && (
                <div className="space-y-6">
                  <ReportBuilderPanel reportConfig={reportConfig} />
                  <PreviewPanel reportConfig={reportConfig} />
                </div>
              )}
              
              {activeView === 'scheduled' && (
                <div className="neumorphic-card p-6">
                  <div className="text-center py-12">
                    <Icon name="Clock" size={48} className="text-text-dark-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-text-dark-primary mb-2">
                      No scheduled reports
                    </h3>
                    <p className="text-text-dark-secondary">
                      Create and schedule automated reports
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        reportConfig={reportConfig}
      />

      {/* Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        reportConfig={reportConfig}
      />
    </div>
  );
};

export default ComplianceReportingCenter;