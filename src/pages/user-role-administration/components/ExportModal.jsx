// src/pages/user-role-administration/components/ExportModal.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import ModalPortal from '../../../components/ui/ModalPortal';
import { format } from 'date-fns';

const ExportModal = ({ isOpen, onClose, adminData = {} }) => {
  const [exportType, setExportType] = useState('user-report');
  const [exportFormat, setExportFormat] = useState('xlsx');
  const [includeFields, setIncludeFields] = useState({
    basicInfo: true,
    roles: true,
    permissions: true,
    lastLogin: true,
    auditTrail: false,
    securityEvents: false,
    departmentInfo: true,
    contactInfo: true
  });
  const [dateRange, setDateRange] = useState('all');
  const [customDateFrom, setCustomDateFrom] = useState('');
  const [customDateTo, setCustomDateTo] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    department: '',
    role: '',
    status: 'all',
    activeOnly: false
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const exportTypes = [
    {
      id: 'user-report',
      name: 'User Directory Report',
      description: 'Complete user listing with roles and permissions',
      icon: 'Users'
    },
    {
      id: 'permission-matrix',
      name: 'Permission Matrix',
      description: 'Detailed permission mappings across all users',
      icon: 'Grid3X3'
    },
    {
      id: 'audit-report',
      name: 'Audit Trail Report',
      description: 'Security events and access changes history',
      icon: 'FileText'
    },
    {
      id: 'compliance-report',
      name: 'Compliance Report',
      description: 'Regulatory compliance and access control summary',
      icon: 'Shield'
    },
    {
      id: 'security-summary',
      name: 'Security Summary',
      description: 'Security incidents and monitoring overview',
      icon: 'AlertTriangle'
    }
  ];

  const formatOptions = [
    { value: 'xlsx', label: 'Excel (XLSX)', description: 'Structured spreadsheet format' },
    { value: 'csv', label: 'CSV', description: 'Comma-separated values' },
    { value: 'pdf', label: 'PDF Report', description: 'Formatted document for review' },
    { value: 'json', label: 'JSON Data', description: 'Machine-readable data format' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'ytd', label: 'Year to Date' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleFieldToggle = (field) => {
    setIncludeFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleExport = async () => {
    setIsGenerating(true);
    
    // Simulate export generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const exportData = {
      type: exportType,
      format: exportFormat,
      fields: includeFields,
      dateRange,
      filters: filterOptions,
      timestamp: new Date().toISOString(),
      ...adminData
    };
    
    console.log('Generating export:', exportData);
    
    // Here you would typically call an API to generate the export
    // and either download the file or provide a download link
    
    setIsGenerating(false);
    onClose();
  };

  const getEstimatedFileSize = () => {
    const baseSize = exportType === 'audit-report' ? 5 : 2; // MB
    const formatMultiplier = exportFormat === 'pdf' ? 1.5 : exportFormat === 'json' ? 0.8 : 1;
    const fieldsMultiplier = Object.values(includeFields).filter(Boolean).length * 0.2;
    
    return Math.round((baseSize * formatMultiplier * (1 + fieldsMultiplier)) * 10) / 10;
  };

  const getSelectedFieldsCount = () => {
    return Object.values(includeFields).filter(Boolean).length;
  };

  return (
    <ModalPortal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Data"
      size="lg"
      className="animate-fadeIn"
    >
      {/* Description */}
      <div className="px-6 py-4 border-b border-dark bg-dark-secondary/10">
        <p className="text-text-dark-secondary">
          Generate and download user role administration reports
        </p>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 overflow-y-auto scrollbar-dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Export Type & Format */}
          <div className="space-y-6">
            {/* Export Type */}
            <div>
              <h3 className="text-lg font-medium text-text-dark-primary mb-3">Export Type</h3>
              <div className="space-y-3">
                {exportTypes.map(type => (
                  <label key={type.id} className="flex items-start space-x-3 cursor-pointer p-3 border border-dark rounded-lg hover:bg-dark-secondary/10 transition-colors">
                    <input
                      type="radio"
                      name="exportType"
                      value={type.id}
                      checked={exportType === type.id}
                      onChange={(e) => setExportType(e.target.value)}
                      className="mt-1 h-4 w-4 text-neon-green focus:ring-neon-green border-dark"
                    />
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="p-2 bg-dark-elevated rounded-lg">
                        <Icon name={type.icon} size={16} className="text-neon-green" />
                      </div>
                      <div>
                        <h4 className="font-medium text-text-dark-primary">{type.name}</h4>
                        <p className="text-sm text-text-dark-secondary">{type.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Format */}
            <div>
              <h3 className="text-lg font-medium text-text-dark-primary mb-3">Export Format</h3>
              <div className="grid grid-cols-2 gap-3">
                {formatOptions.map(option => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer p-3 border border-dark rounded-lg hover:bg-dark-secondary/10 transition-colors">
                    <input
                      type="radio"
                      name="format"
                      value={option.value}
                      checked={exportFormat === option.value}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="h-4 w-4 text-neon-green focus:ring-neon-green border-dark"
                    />
                    <div>
                      <div className="font-medium text-text-dark-primary">{option.label}</div>
                      <div className="text-xs text-text-dark-secondary">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Date Range */}
            <div>
              <h3 className="text-lg font-medium text-text-dark-primary mb-3">Date Range</h3>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="neumorphic-input w-full"
              >
                {dateRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              
              {dateRange === 'custom' && (
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-sm font-medium text-text-dark-primary mb-1">From</label>
                    <input
                      type="date"
                      value={customDateFrom}
                      onChange={(e) => setCustomDateFrom(e.target.value)}
                      className="neumorphic-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-dark-primary mb-1">To</label>
                    <input
                      type="date"
                      value={customDateTo}
                      onChange={(e) => setCustomDateTo(e.target.value)}
                      className="neumorphic-input w-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Fields & Filters */}
          <div className="space-y-6">
            {/* Include Fields */}
            <div>
              <h3 className="text-lg font-medium text-text-dark-primary mb-3">
                Include Fields ({getSelectedFieldsCount()} selected)
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-dark">
                {[
                  { key: 'basicInfo', label: 'Basic Information', description: 'Name, email, ID' },
                  { key: 'roles', label: 'Role Assignments', description: 'Current and historical roles' },
                  { key: 'permissions', label: 'Permission Details', description: 'Granular permission matrix' },
                  { key: 'departmentInfo', label: 'Department Information', description: 'Department and hierarchy' },
                  { key: 'contactInfo', label: 'Contact Information', description: 'Phone, address, emergency contacts' },
                  { key: 'lastLogin', label: 'Login Information', description: 'Last login, session data' },
                  { key: 'auditTrail', label: 'Audit Trail', description: 'Change history and events' },
                  { key: 'securityEvents', label: 'Security Events', description: 'Failed logins, alerts' }
                ].map(field => (
                  <label key={field.key} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeFields[field.key]}
                      onChange={() => handleFieldToggle(field.key)}
                      className="mt-1 h-4 w-4 text-neon-green focus:ring-neon-green border-dark rounded"
                    />
                    <div>
                      <div className="font-medium text-text-dark-primary">{field.label}</div>
                      <div className="text-sm text-text-dark-secondary">{field.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Filters */}
            <div>
              <h3 className="text-lg font-medium text-text-dark-primary mb-3">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-dark-primary mb-1">Department</label>
                  <select
                    value={filterOptions.department}
                    onChange={(e) => setFilterOptions(prev => ({ ...prev, department: e.target.value }))}
                    className="neumorphic-input w-full"
                  >
                    <option value="">All Departments</option>
                    <option value="IT Security">IT Security</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Finance">Finance</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-dark-primary mb-1">Role</label>
                  <select
                    value={filterOptions.role}
                    onChange={(e) => setFilterOptions(prev => ({ ...prev, role: e.target.value }))}
                    className="neumorphic-input w-full"
                  >
                    <option value="">All Roles</option>
                    <option value="Security Administrator">Security Administrator</option>
                    <option value="Compliance Manager">Compliance Manager</option>
                    <option value="Department User">Department User</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-dark-primary mb-1">Status</label>
                  <select
                    value={filterOptions.status}
                    onChange={(e) => setFilterOptions(prev => ({ ...prev, status: e.target.value }))}
                    className="neumorphic-input w-full"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active Only</option>
                    <option value="inactive">Inactive Only</option>
                    <option value="suspended">Suspended Only</option>
                  </select>
                </div>
                
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filterOptions.activeOnly}
                    onChange={(e) => setFilterOptions(prev => ({ ...prev, activeOnly: e.target.checked }))}
                    className="h-4 w-4 text-neon-green focus:ring-neon-green border-dark rounded"
                  />
                  <span className="text-sm text-text-dark-primary">Include only users with recent activity</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-dark bg-dark-secondary/20 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-dark-secondary">
            <div>Estimated file size: <strong>{getEstimatedFileSize()} MB</strong></div>
            <div>Generated on: {format(new Date(), 'PPp')}</div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="btn-secondary-dark px-4 py-2 border border-dark text-text-dark-secondary rounded-lg font-medium hover:text-text-dark-primary hover:bg-dark-elevated transition-colors"
            >
              Cancel
            </button>
            
            <button
              onClick={handleExport}
              disabled={isGenerating || getSelectedFieldsCount() === 0}
              className="btn-primary-dark flex items-center space-x-2 px-4 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Icon name="Download" size={16} />
                  <span>Generate Export</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ExportModal;