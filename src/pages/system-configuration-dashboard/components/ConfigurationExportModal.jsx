// src/pages/system-configuration-dashboard/components/ConfigurationExportModal.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfigurationExportModal = ({ isOpen, onClose, activeTab }) => {
  const [exportOptions, setExportOptions] = useState({
    format: 'pdf',
    scope: 'current-tab',
    includeSecrets: false,
    includeHistory: true,
    includeComments: true,
    compression: false
  });
  
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      onClose();
      
      // Simulate file download
      const filename = `system-config-${exportOptions.scope}-${new Date().toISOString().split('T')[0]}.${exportOptions.format}`;
      console.log('Downloading:', filename);
    }, 3000);
  };

  const handleOptionChange = (key, value) => {
    setExportOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-modal">
      <div className="bg-surface rounded-lg shadow-modal max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
              <Icon name="Download" size={20} />
              <span>Export Configuration</span>
            </h3>
            <button 
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary nav-transition"
              disabled={isExporting}
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Export Options */}
          <div className="space-y-6">
            {/* Format Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">Export Format</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'pdf', label: 'PDF Report', icon: 'FileText' },
                  { value: 'json', label: 'JSON Config', icon: 'Code' },
                  { value: 'csv', label: 'CSV Data', icon: 'Table' },
                  { value: 'xlsx', label: 'Excel File', icon: 'FileSpreadsheet' }
                ].map(format => (
                  <button
                    key={format.value}
                    onClick={() => handleOptionChange('format', format.value)}
                    className={`p-3 border rounded-lg text-sm font-medium nav-transition flex flex-col items-center space-y-2 ${
                      exportOptions.format === format.value
                        ? 'border-primary bg-primary-50 text-primary' :'border-border text-text-secondary hover:border-primary hover:text-primary'
                    }`}
                  >
                    <Icon name={format.icon} size={20} />
                    <span>{format.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scope Selection */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">Export Scope</label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="scope"
                    value="current-tab"
                    checked={exportOptions.scope === 'current-tab'}
                    onChange={(e) => handleOptionChange('scope', e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <div>
                    <span className="text-sm font-medium text-text-primary">Current Tab Only</span>
                    <p className="text-xs text-text-secondary">Export configuration for the active tab ({activeTab})</p>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="scope"
                    value="all-tabs"
                    checked={exportOptions.scope === 'all-tabs'}
                    onChange={(e) => handleOptionChange('scope', e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <div>
                    <span className="text-sm font-medium text-text-primary">All Configuration Tabs</span>
                    <p className="text-xs text-text-secondary">Export complete system configuration</p>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="scope"
                    value="system-summary"
                    checked={exportOptions.scope === 'system-summary'}
                    onChange={(e) => handleOptionChange('scope', e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <div>
                    <span className="text-sm font-medium text-text-primary">System Summary</span>
                    <p className="text-xs text-text-secondary">High-level overview for compliance documentation</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">Additional Options</label>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-text-primary">Include Configuration History</span>
                    <p className="text-xs text-text-secondary">Export change history and audit trail</p>
                  </div>
                  <button
                    onClick={() => handleOptionChange('includeHistory', !exportOptions.includeHistory)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      exportOptions.includeHistory ? 'bg-primary' : 'bg-secondary-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        exportOptions.includeHistory ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
                
                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-text-primary">Include Comments & Descriptions</span>
                    <p className="text-xs text-text-secondary">Export configuration comments and help text</p>
                  </div>
                  <button
                    onClick={() => handleOptionChange('includeComments', !exportOptions.includeComments)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      exportOptions.includeComments ? 'bg-primary' : 'bg-secondary-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        exportOptions.includeComments ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
                
                <label className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium text-text-primary">Include Sensitive Data</span>
                    <p className="text-xs text-text-secondary">Export API keys, passwords, and secrets</p>
                  </div>
                  <button
                    onClick={() => handleOptionChange('includeSecrets', !exportOptions.includeSecrets)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      exportOptions.includeSecrets ? 'bg-warning' : 'bg-secondary-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        exportOptions.includeSecrets ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
                
                {exportOptions.format === 'json' && (
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-text-primary">Compress Output</span>
                      <p className="text-xs text-text-secondary">Minimize file size with compression</p>
                    </div>
                    <button
                      onClick={() => handleOptionChange('compression', !exportOptions.compression)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        exportOptions.compression ? 'bg-primary' : 'bg-secondary-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          exportOptions.compression ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </label>
                )}
              </div>
            </div>

            {/* Security Warning */}
            {exportOptions.includeSecrets && (
              <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-warning-700">Security Warning</h4>
                    <p className="text-sm text-warning-600 mt-1">
                      Including sensitive data in exports poses security risks. Ensure exported files are handled securely and access is restricted.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Export Preview */}
            <div className="bg-secondary-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-text-primary mb-2">Export Preview</h4>
              <div className="text-sm text-text-secondary space-y-1">
                <div>Format: <span className="font-medium text-text-primary">{exportOptions.format.toUpperCase()}</span></div>
                <div>Scope: <span className="font-medium text-text-primary">{exportOptions.scope.replace('-', ' ')}</span></div>
                <div>Estimated size: <span className="font-medium text-text-primary">2.4 MB</span></div>
                <div>Includes: 
                  <span className="font-medium text-text-primary ml-1">
                    {[exportOptions.includeHistory && 'History', exportOptions.includeComments && 'Comments', exportOptions.includeSecrets && 'Secrets']
                      .filter(Boolean).join(', ') || 'Basic configuration'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 mt-6 border-t border-border">
            <Button 
              variant="outline" 
              onClick={onClose}
              disabled={isExporting}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              iconName="Download"
              loading={isExporting}
              onClick={handleExport}
            >
              {isExporting ? 'Exporting...' : 'Export Configuration'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationExportModal;