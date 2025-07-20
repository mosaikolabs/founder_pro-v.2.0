// src/pages/compliance-reporting-center/components/ExportModal.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExportModal = ({ isOpen, onClose, reportData, userRole }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportOptions, setExportOptions] = useState({
    includeHeader: true,
    includeFooter: true,
    includeWatermark: false,
    includeMetadata: true,
    digitalSignature: false,
    compression: 'standard'
  });
  const [isExporting, setIsExporting] = useState(false);
  const [customBranding, setCustomBranding] = useState(false);

  const formats = [
    {
      id: 'pdf',
      name: 'PDF Document',
      icon: 'FileText',
      description: 'Professional report format with formatting preserved',
      size: '~2-5 MB',
      features: ['Digital signatures', 'Print-ready', 'Universal compatibility']
    },
    {
      id: 'excel',
      name: 'Excel Workbook',
      icon: 'Sheet',
      description: 'Spreadsheet format for data analysis and manipulation',
      size: '~1-3 MB',
      features: ['Editable data', 'Charts included', 'Multiple worksheets']
    },
    {
      id: 'regulatory',
      name: 'Regulatory Submission',
      icon: 'Shield',
      description: 'Compliance-specific format for regulatory bodies',
      size: '~3-8 MB',
      features: ['Digital signatures', 'Audit trail', 'Regulatory compliance'],
      restricted: userRole !== 'Compliance Officer'
    },
    {
      id: 'dashboard',
      name: 'Interactive Dashboard',
      icon: 'Monitor',
      description: 'HTML dashboard with interactive charts and filters',
      size: '~5-10 MB',
      features: ['Interactive charts', 'Filter capabilities', 'Responsive design']
    }
  ];

  const handleExportOptionChange = (option, value) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real implementation, this would trigger the actual export
      console.log('Exporting report:', {
        format: exportFormat,
        options: exportOptions,
        reportData
      });
      
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const getFormatSpecificOptions = () => {
    switch (exportFormat) {
      case 'pdf':
        return (
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.digitalSignature}
                onChange={(e) => handleExportOptionChange('digitalSignature', e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">Add digital signature</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.includeWatermark}
                onChange={(e) => handleExportOptionChange('includeWatermark', e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">Include confidential watermark</span>
            </label>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Compression Level
              </label>
              <select
                value={exportOptions.compression}
                onChange={(e) => handleExportOptionChange('compression', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="high">High (smaller file)</option>
                <option value="standard">Standard</option>
                <option value="low">Low (larger file, best quality)</option>
              </select>
            </div>
          </div>
        );
      case 'excel':
        return (
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.includeCharts}
                onChange={(e) => handleExportOptionChange('includeCharts', e.target.checked)}
                defaultChecked
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">Include charts and visualizations</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.separateSheets}
                onChange={(e) => handleExportOptionChange('separateSheets', e.target.checked)}
                defaultChecked
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">Separate data into multiple sheets</span>
            </label>
          </div>
        );
      case 'regulatory':
        return (
          <div className="space-y-3">
            <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-warning-800">Regulatory Submission Format</p>
                  <p className="text-sm text-warning-700 mt-1">
                    This format includes mandatory audit trails and digital signatures for regulatory compliance.
                  </p>
                </div>
              </div>
            </div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.auditTrail}
                onChange={(e) => handleExportOptionChange('auditTrail', e.target.checked)}
                defaultChecked
                disabled
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">Include audit trail (required)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exportOptions.digitalSignature}
                onChange={(e) => handleExportOptionChange('digitalSignature', e.target.checked)}
                defaultChecked
                disabled
                className="rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">Digital signature (required)</span>
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-large max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Export Report
            </h2>
            <p className="text-text-secondary mt-1">
              Choose format and export options for your report
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg nav-transition"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">
              Export Format
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formats.map(format => (
                <div
                  key={format.id}
                  onClick={() => !format.restricted && setExportFormat(format.id)}
                  className={`p-4 rounded-lg border-2 cursor-pointer nav-transition ${
                    format.restricted
                      ? 'border-border bg-secondary-50 opacity-50 cursor-not-allowed'
                      : exportFormat === format.id
                        ? 'border-primary bg-primary-50' :'border-border hover:border-primary-200 hover:bg-secondary-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      exportFormat === format.id && !format.restricted
                        ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary'
                    }`}>
                      <Icon name={format.icon} size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-medium text-text-primary">
                          {format.name}
                        </h4>
                        {format.restricted && (
                          <Icon name="Lock" size={12} className="text-text-secondary" />
                        )}
                      </div>
                      <p className="text-xs text-text-secondary mb-2">
                        {format.description}
                      </p>
                      <div className="text-xs text-text-secondary mb-2">
                        Est. size: {format.size}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {format.features.map(feature => (
                          <span key={feature} className="px-2 py-1 bg-secondary-100 text-text-secondary text-xs rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* General Options */}
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">
              General Options
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exportOptions.includeHeader}
                  onChange={(e) => handleExportOptionChange('includeHeader', e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">Include report header with logo</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exportOptions.includeFooter}
                  onChange={(e) => handleExportOptionChange('includeFooter', e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">Include page numbers and timestamp</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={exportOptions.includeMetadata}
                  onChange={(e) => handleExportOptionChange('includeMetadata', e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">Include generation metadata</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={customBranding}
                  onChange={(e) => setCustomBranding(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm text-text-secondary">Use custom branding</span>
              </label>
            </div>
          </div>

          {/* Format-Specific Options */}
          {getFormatSpecificOptions() && (
            <div>
              <h3 className="text-lg font-medium text-text-primary mb-4">
                {formats.find(f => f.id === exportFormat)?.name} Options
              </h3>
              {getFormatSpecificOptions()}
            </div>
          )}

          {/* Report Info */}
          {reportData && (
            <div className="bg-secondary-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-text-primary mb-2">
                Report Information
              </h4>
              <div className="space-y-1 text-sm text-text-secondary">
                <div>Title: {reportData.name || 'Custom Report'}</div>
                <div>Components: {reportData.components?.length || 0}</div>
                <div>Data Sources: {reportData.dataSources?.length || 0}</div>
                <div>Generated: {new Date(reportData.generatedAt || Date.now()).toLocaleString()}</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-secondary-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border text-text-secondary rounded-lg font-medium hover:text-text-primary hover:bg-surface nav-transition"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting || !reportData}
            className="flex items-center space-x-2 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Icon name="Download" size={16} />
                <span>Export Report</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;