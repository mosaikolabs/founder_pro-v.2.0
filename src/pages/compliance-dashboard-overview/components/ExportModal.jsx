import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExportModal = ({ isOpen, onClose, activeTab, complianceData }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportScope, setExportScope] = useState('current-tab');
  const [includeDetails, setIncludeDetails] = useState(true);
  const [includeCharts, setIncludeCharts] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create mock download
    const filename = `compliance-dashboard-${activeTab}-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
    
    // In a real implementation, this would generate and download the actual file
    console.log('Exporting:', {
      format: exportFormat,
      scope: exportScope,
      includeDetails,
      includeCharts,
      filename,
      data: complianceData
    });
    
    setIsExporting(false);
    onClose();
    
    // Show success message (in real app, this would be a toast notification)
    alert(`Export completed: ${filename}`);
  };

  const exportOptions = [
    {
      id: 'current-tab',
      label: 'Current Tab Only',
      description: 'Export audit timeline data only',
      icon: 'FileText'
    },
    {
      id: 'full-dashboard',
      label: 'Full Dashboard',
      description: 'Export all tabs and compliance data',
      icon: 'Database'
    },
    {
      id: 'summary-report',
      label: 'Executive Summary',
      description: 'High-level compliance overview for executives',
      icon: 'BarChart3'
    }
  ];

  const formatOptions = [
    {
      id: 'pdf',
      label: 'PDF Document',
      description: 'Formatted report with charts and tables',
      icon: 'FileText'
    },
    {
      id: 'excel',
      label: 'Excel Spreadsheet',
      description: 'Raw data in spreadsheet format',
      icon: 'Table'
    },
    {
      id: 'csv',
      label: 'CSV File',
      description: 'Comma-separated values for data analysis',
      icon: 'Download'
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Dark Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-modal"
        onClick={onClose}
      />

      {/* Modal with Dark Neumorphic Theme */}
      <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
        <div className="neumorphic-card w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-dark">
          {/* Header with Dark Theme */}
          <div className="flex items-center justify-between p-6 border-b border-white border-opacity-10">
            <div>
              <h2 className="text-xl font-semibold text-text-dark-primary">
                Export Dashboard
              </h2>
              <p className="text-sm text-text-dark-secondary mt-1">
                Generate and download compliance reports
              </p>
            </div>
            <button
              onClick={onClose}
              className="neumorphic-button p-2 text-text-dark-secondary hover:text-text-dark-primary nav-transition"
              aria-label="Close export modal"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Content with Dark Theme */}
          <div className="p-6 space-y-6">
            {/* Export Scope */}
            <div>
              <h3 className="text-lg font-medium text-text-dark-primary mb-4">
                Export Scope
              </h3>
              <div className="space-y-3 radio-dark">
                {exportOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`
                      flex items-start space-x-3 p-4 rounded-lg cursor-pointer nav-transition
                      ${exportScope === option.id 
                        ? 'bg-gradient-to-r from-neon-green/20 to-neon-purple/20 border border-neon-green/30' :'neumorphic-card hover:shadow-neumorphic-hover'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="exportScope"
                      value={option.id}
                      checked={exportScope === option.id}
                      onChange={(e) => setExportScope(e.target.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Icon name={option.icon} size={16} className="text-neon-green" />
                        <span className="font-medium text-text-dark-primary">
                          {option.label}
                        </span>
                      </div>
                      <p className="text-sm text-text-dark-secondary mt-1">
                        {option.description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Export Format */}
            <div>
              <h3 className="text-lg font-medium text-text-dark-primary mb-4">
                Export Format
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {formatOptions.map((format) => (
                  <label
                    key={format.id}
                    className={`
                      flex flex-col items-center p-4 rounded-lg cursor-pointer nav-transition
                      ${exportFormat === format.id 
                        ? 'bg-gradient-to-r from-neon-green/20 to-neon-purple/20 border border-neon-green/30' :'neumorphic-card hover:shadow-neumorphic-hover'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="exportFormat"
                      value={format.id}
                      checked={exportFormat === format.id}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="sr-only"
                    />
                    <Icon name={format.icon} size={24} className="text-neon-green mb-2" />
                    <span className="font-medium text-text-dark-primary text-center">
                      {format.label}
                    </span>
                    <p className="text-xs text-text-dark-secondary text-center mt-1">
                      {format.description}
                    </p>
                  </label>
                ))}
              </div>
            </div>

            {/* Export Options */}
            <div>
              <h3 className="text-lg font-medium text-text-dark-primary mb-4">
                Export Options
              </h3>
              <div className="space-y-3 checkbox-dark">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeDetails}
                    onChange={(e) => setIncludeDetails(e.target.checked)}
                  />
                  <div>
                    <span className="font-medium text-text-dark-primary">
                      Include Detailed Information
                    </span>
                    <p className="text-sm text-text-dark-secondary">
                      Include control details, policy descriptions, and audit findings
                    </p>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={includeCharts}
                    onChange={(e) => setIncludeCharts(e.target.checked)}
                  />
                  <div>
                    <span className="font-medium text-text-dark-primary">
                      Include Charts and Visualizations
                    </span>
                    <p className="text-sm text-text-dark-secondary">
                      Include compliance charts, progress bars, and status indicators
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Preview Information */}
            <div className="bg-gradient-to-r from-dark-secondary to-dark-surface rounded-lg p-4 border border-white border-opacity-10">
              <h4 className="font-medium text-text-dark-primary mb-2">
                Export Preview
              </h4>
              <div className="text-sm text-text-dark-secondary space-y-1">
                <p>• Format: {formatOptions.find(f => f.id === exportFormat)?.label}</p>
                <p>• Scope: {exportOptions.find(o => o.id === exportScope)?.label}</p>
                <p>• Compliance Percentage: {complianceData.overallCompliance}%</p>
                <p>• Generated: {new Date().toLocaleString()}</p>
                {includeDetails && <p>• Includes detailed information</p>}
                {includeCharts && <p>• Includes charts and visualizations</p>}
              </div>
            </div>
          </div>

          {/* Footer with Dark Theme */}
          <div className="flex items-center justify-between p-6 border-t border-white border-opacity-10">
            <div className="text-sm text-text-dark-secondary flex items-center">
              <Icon name="Info" size={16} className="mr-2 text-neon-green" />
              Export may take a few moments to generate
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="btn-secondary-dark px-4 py-2 font-medium"
                disabled={isExporting}
              >
                Cancel
              </button>
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="btn-primary-dark flex items-center space-x-2 px-4 py-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExporting ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span>Exporting...</span>
                  </>
                ) : (
                  <>
                    <Icon name="Download" size={16} />
                    <span>Export</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportModal;