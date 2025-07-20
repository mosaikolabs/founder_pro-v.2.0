// src/pages/control-detail-management/components/ExportModal.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ExportModal = ({ isOpen, onClose, controlData, onExport }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    sections: {
      controlDefinition: true,
      evidenceRequirements: true,
      testingProcedures: true,
      assignmentHistory: false,
      versionHistory: false,
      integrationStatus: false
    },
    includeAttachments: true,
    includeMetadata: true,
    templateStyle: 'standard',
    destination: 'download'
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const exportFormats = [
    { id: 'pdf', label: 'PDF Document', icon: 'FileText', description: 'Comprehensive PDF report' },
    { id: 'docx', label: 'Word Document', icon: 'FileText', description: 'Editable Word document' },
    { id: 'xlsx', label: 'Excel Spreadsheet', icon: 'File', description: 'Data in spreadsheet format' },
    { id: 'json', label: 'JSON Data', icon: 'Code', description: 'Machine-readable data format' }
  ];

  const templateStyles = [
    { id: 'standard', label: 'Standard', description: 'Clean, professional layout' },
    { id: 'detailed', label: 'Detailed', description: 'Comprehensive with all metadata' },
    { id: 'executive', label: 'Executive Summary', description: 'High-level overview format' },
    { id: 'audit', label: 'Audit Package', description: 'Formatted for external auditors' }
  ];

  const exportDestinations = [
    { id: 'download', label: 'Download', icon: 'Download', description: 'Download to your device' },
    { id: 'email', label: 'Email', icon: 'Mail', description: 'Send via email' },
    { id: 'share', label: 'Share Link', icon: 'Share', description: 'Generate shareable link' }
  ];

  const handleSectionToggle = (section) => {
    setExportConfig(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: !prev.sections[section]
      }
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const progressSteps = [20, 40, 60, 80, 100];
    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setExportProgress(progressSteps[i]);
    }

    onExport?.(exportConfig);
    setIsExporting(false);
    setExportProgress(0);
    onClose();
  };

  const getSelectedSectionsCount = () => {
    return Object.values(exportConfig.sections).filter(Boolean).length;
  };

  const estimateFileSize = () => {
    const baseSize = 0.5; // MB
    const sectionsMultiplier = getSelectedSectionsCount() * 0.3;
    const attachmentsSize = exportConfig.includeAttachments ? 2.0 : 0;
    const metadataSize = exportConfig.includeMetadata ? 0.2 : 0;
    
    return (baseSize + sectionsMultiplier + attachmentsSize + metadataSize).toFixed(1);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-modal" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
        <div className="bg-surface rounded-lg shadow-large w-full max-w-3xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Export Control Documentation</h2>
              <p className="text-sm text-text-secondary mt-1">
                Control: {controlData?.name} ({controlData?.id})
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg nav-transition"
              aria-label="Close modal"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Export Format */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">Export Format</h3>
                <div className="grid grid-cols-2 gap-3">
                  {exportFormats.map(format => (
                    <button
                      key={format.id}
                      onClick={() => setExportConfig(prev => ({ ...prev, format: format.id }))}
                      className={`p-4 border rounded-lg text-left nav-transition ${
                        exportConfig.format === format.id
                          ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon name={format.icon} size={20} className={exportConfig.format === format.id ? 'text-primary' : 'text-text-secondary'} />
                        <div>
                          <h4 className="font-medium text-text-primary">{format.label}</h4>
                          <p className="text-sm text-text-secondary">{format.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sections to Include */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">Sections to Include</h3>
                <div className="space-y-2">
                  {[
                    { key: 'controlDefinition', label: 'Control Definition', required: true },
                    { key: 'evidenceRequirements', label: 'Evidence Requirements', required: true },
                    { key: 'testingProcedures', label: 'Testing Procedures', required: false },
                    { key: 'assignmentHistory', label: 'Assignment History', required: false },
                    { key: 'versionHistory', label: 'Version History', required: false },
                    { key: 'integrationStatus', label: 'Integration Status', required: false }
                  ].map(section => (
                    <label key={section.key} className="flex items-center space-x-3 p-2 hover:bg-secondary-50 rounded nav-transition">
                      <input
                        type="checkbox"
                        checked={exportConfig.sections[section.key]}
                        onChange={() => handleSectionToggle(section.key)}
                        disabled={section.required}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <span className={`text-sm ${section.required ? 'font-medium text-text-primary' : 'text-text-secondary'}`}>
                        {section.label}
                        {section.required && <span className="text-primary ml-1">*</span>}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Template Style */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">Template Style</h3>
                <div className="grid grid-cols-2 gap-3">
                  {templateStyles.map(style => (
                    <button
                      key={style.id}
                      onClick={() => setExportConfig(prev => ({ ...prev, templateStyle: style.id }))}
                      className={`p-3 border rounded-lg text-left nav-transition ${
                        exportConfig.templateStyle === style.id
                          ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300'
                      }`}
                    >
                      <h4 className="font-medium text-text-primary">{style.label}</h4>
                      <p className="text-sm text-text-secondary">{style.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">Additional Options</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={exportConfig.includeAttachments}
                      onChange={(e) => setExportConfig(prev => ({ ...prev, includeAttachments: e.target.checked }))}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-text-primary">Include Attachments</span>
                      <p className="text-xs text-text-secondary">Embed evidence files and supporting documents</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={exportConfig.includeMetadata}
                      onChange={(e) => setExportConfig(prev => ({ ...prev, includeMetadata: e.target.checked }))}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <div>
                      <span className="text-sm font-medium text-text-primary">Include Metadata</span>
                      <p className="text-xs text-text-secondary">Add creation dates, authors, and system information</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Export Destination */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">Export Destination</h3>
                <div className="grid grid-cols-3 gap-3">
                  {exportDestinations.map(destination => (
                    <button
                      key={destination.id}
                      onClick={() => setExportConfig(prev => ({ ...prev, destination: destination.id }))}
                      className={`p-3 border rounded-lg text-center nav-transition ${
                        exportConfig.destination === destination.id
                          ? 'border-primary bg-primary-50' :'border-border hover:border-secondary-300'
                      }`}
                    >
                      <Icon 
                        name={destination.icon} 
                        size={20} 
                        className={`mx-auto mb-2 ${exportConfig.destination === destination.id ? 'text-primary' : 'text-text-secondary'}`} 
                      />
                      <h4 className="font-medium text-text-primary text-sm">{destination.label}</h4>
                      <p className="text-xs text-text-secondary">{destination.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Export Summary */}
              <div className="bg-secondary-50 rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-2">Export Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Format:</span>
                    <span className="text-text-primary ml-2 font-medium">
                      {exportFormats.find(f => f.id === exportConfig.format)?.label}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Sections:</span>
                    <span className="text-text-primary ml-2 font-medium">
                      {getSelectedSectionsCount()} selected
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Template:</span>
                    <span className="text-text-primary ml-2 font-medium">
                      {templateStyles.find(t => t.id === exportConfig.templateStyle)?.label}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Est. Size:</span>
                    <span className="text-text-primary ml-2 font-medium">
                      ~{estimateFileSize()} MB
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          {isExporting && (
            <div className="px-6 py-3 border-t border-border">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-text-secondary">Exporting...</span>
                <div className="flex-1 bg-secondary-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
                <span className="text-sm text-text-secondary">{exportProgress}%</span>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-border p-6">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                disabled={isExporting}
                className="px-4 py-2 border border-border text-text-secondary rounded-lg font-medium hover:text-text-primary hover:bg-secondary-50 nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              
              <button
                onClick={handleExport}
                disabled={isExporting || getSelectedSectionsCount() === 0}
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-700 nav-transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isExporting ? (
                  <>
                    <Icon name="Loader" size={16} className="animate-spin" />
                    <span>Exporting...</span>
                  </>
                ) : (
                  <>
                    <Icon name="Download" size={16} />
                    <span>Export Documentation</span>
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