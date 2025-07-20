// src/pages/compliance-reporting-center/components/PreviewPanel.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import FilterPanel from './FilterPanel';

const PreviewPanel = ({ reportData, filters, onFiltersChange, onExport }) => {
  const [previewMode, setPreviewMode] = useState('desktop'); // desktop, tablet, mobile
  const [showFilters, setShowFilters] = useState(true);

  const mockReportData = {
    title: 'Compliance Summary Report',
    generatedAt: new Date().toLocaleDateString(),
    sections: [
      {
        id: 'kpi-overview',
        title: 'KPI Overview',
        type: 'metrics',
        data: {
          overallCompliance: 87,
          controlsImplemented: 245,
          policiesActive: 67,
          auditFindings: 12
        }
      },
      {
        id: 'control-status',
        title: 'Control Status Matrix',
        type: 'table',
        data: [
          { control: 'AC-01', status: 'Implemented', effectiveness: 'Effective', lastTested: '2024-01-15' },
          { control: 'AC-02', status: 'In Progress', effectiveness: 'Pending', lastTested: '2024-01-10' },
          { control: 'AC-03', status: 'Implemented', effectiveness: 'Effective', lastTested: '2024-01-12' }
        ]
      }
    ]
  };

  const displayData = reportData || mockReportData;

  const getPreviewScale = () => {
    switch (previewMode) {
      case 'tablet':
        return 'scale-75';
      case 'mobile':
        return 'scale-50';
      default:
        return 'scale-100';
    }
  };

  const renderMetricCard = (title, value, icon, color = 'primary') => (
    <div className="neumorphic-card p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 bg-${color} bg-opacity-10 rounded-lg`}>
          <Icon name={icon} size={16} className={`text-${color}`} />
        </div>
        <span className="text-2xl font-bold text-text-dark-primary">{value}</span>
      </div>
      <h4 className="text-sm font-medium text-text-dark-secondary">{title}</h4>
    </div>
  );

  const renderKPIOverview = (section) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-dark-primary">{section.title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {renderMetricCard('Overall Compliance', `${section.data.overallCompliance}%`, 'BarChart3', 'primary')}
        {renderMetricCard('Controls Implemented', section.data.controlsImplemented, 'Shield', 'success')}
        {renderMetricCard('Active Policies', section.data.policiesActive, 'BookOpen', 'accent')}
        {renderMetricCard('Open Findings', section.data.auditFindings, 'AlertTriangle', 'warning')}
      </div>
    </div>
  );

  const renderTable = (section) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-dark-primary">{section.title}</h3>
      <div className="neumorphic-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-surface">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-dark-secondary uppercase tracking-wider">
                  Control
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-dark-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-dark-secondary uppercase tracking-wider">
                  Effectiveness
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-text-dark-secondary uppercase tracking-wider">
                  Last Tested
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white divide-opacity-10">
              {section.data.map((row, index) => (
                <tr key={index} className="hover:bg-dark-elevated">
                  <td className="px-4 py-3 text-sm font-medium text-text-dark-primary">
                    {row.control}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      row.status === 'Implemented' ? 'bg-success-dark/20 text-success-dark' : 'bg-warning-dark/20 text-warning-dark'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-dark-secondary">
                    {row.effectiveness}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-dark-secondary">
                    {row.lastTested}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSection = (section) => {
    switch (section.type) {
      case 'metrics':
        return renderKPIOverview(section);
      case 'table':
        return renderTable(section);
      default:
        return (
          <div className="p-6 neumorphic-card text-center">
            <Icon name="FileText" size={32} className="text-text-dark-secondary mx-auto mb-2" />
            <p className="text-text-dark-secondary">{section.title} Preview</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-dark-secondary">
      {/* Header */}
      <div className="p-4 neumorphic-card border-b border-white border-opacity-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-text-dark-primary">Live Preview</h2>
          
          {/* Preview Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-2 rounded-md nav-transition ${
                previewMode === 'desktop' ? 'bg-gradient-accent text-white' : 'text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated'
              }`}
              title="Desktop Preview"
            >
              <Icon name="Monitor" size={16} />
            </button>
            <button
              onClick={() => setPreviewMode('tablet')}
              className={`p-2 rounded-md nav-transition ${
                previewMode === 'tablet' 
                  ? 'bg-gradient-accent text-white' : 'text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated'
              }`}
              title="Tablet Preview"
            >
              <Icon name="Tablet" size={16} />
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-2 rounded-md nav-transition ${
                previewMode === 'mobile' ? 'bg-gradient-accent text-white' : 'text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated'
              }`}
              title="Mobile Preview"
            >
              <Icon name="Smartphone" size={16} />
            </button>
          </div>
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-sm text-neon-green hover:text-text-dark-primary nav-transition"
        >
          <Icon name={showFilters ? 'ChevronUp' : 'ChevronDown'} size={16} />
          <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="border-b border-white border-opacity-10 neumorphic-card">
          <FilterPanel
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
        </div>
      )}

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto scrollbar-dark p-4">
        <div className={`transform-gpu transition-transform duration-300 ${getPreviewScale()} origin-top`}>
          <div className="neumorphic-card shadow-neumorphic min-h-full">
            {/* Report Header */}
            <div className="p-6 border-b border-white border-opacity-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-text-dark-primary mb-1">
                    {displayData.title}
                  </h1>
                  <p className="text-text-dark-secondary">
                    Generated on {displayData.generatedAt}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                    <Icon name="Shield" size={24} color="white" />
                  </div>
                </div>
              </div>
              
              {/* Watermark */}
              <div className="text-xs text-text-dark-secondary bg-warning-dark/20 border border-warning-dark/30 rounded-lg p-2">
                <Icon name="Eye" size={12} className="inline mr-1" />
                Preview Mode - Some data may be simulated
              </div>
            </div>

            {/* Report Content */}
            <div className="p-6 space-y-8">
              {displayData.sections?.length > 0 ? (
                displayData.sections.map((section, index) => (
                  <div key={section.id || index}>
                    {renderSection(section)}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Icon name="FileText" size={48} className="text-text-dark-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-text-dark-primary mb-2">
                    No Report Generated
                  </h3>
                  <p className="text-text-dark-secondary">
                    Add components and generate a report to see the preview
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Export Actions */}
      {reportData && (
        <div className="p-4 neumorphic-card border-t border-white border-opacity-10">
          <button
            onClick={onExport}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-accent text-white rounded-lg font-medium hover:shadow-glow-neon nav-transition"
          >
            <Icon name="Download" size={16} />
            <span>Export Report</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PreviewPanel;