// src/pages/user-role-administration/components/AuditTrailModal.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import ModalPortal from '../../../components/ui/ModalPortal';
import { formatDistanceToNow } from 'date-fns';

const AuditTrailModal = ({ isOpen, onClose }) => {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('7d');

  // Mock audit trail data
  const auditEntries = [
    {
      id: 1,
      timestamp: '2024-01-15T14:30:00Z',
      action: 'Permission Modified',
      type: 'permission',
      user: 'Sarah Johnson',
      target: 'Michael Chen',
      details: 'Added "audit-access" permission',
      severity: 'medium',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success'
    },
    {
      id: 2,
      timestamp: '2024-01-15T13:45:00Z',
      action: 'Role Assignment',
      type: 'role',
      user: 'Admin System',
      target: 'Emily Rodriguez',
      details: 'Changed role from "Department User" to "Report Analyst"',
      severity: 'high',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'success'
    },
    {
      id: 3,
      timestamp: '2024-01-15T12:20:00Z',
      action: 'User Created',
      type: 'user',
      user: 'Sarah Johnson',
      target: 'James Wilson',
      details: 'New user account created with "Department User" role',
      severity: 'medium',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success'
    },
    {
      id: 4,
      timestamp: '2024-01-15T11:15:00Z',
      action: 'Permission Revoked',
      type: 'permission',
      user: 'Michael Chen',
      target: 'David Park',
      details: 'Removed "system-admin" permission due to role change',
      severity: 'high',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
      status: 'success'
    },
    {
      id: 5,
      timestamp: '2024-01-15T10:30:00Z',
      action: 'Login Attempt Failed',
      type: 'security',
      user: 'Unknown',
      target: 'admin@company.com',
      details: 'Failed login attempt with invalid credentials',
      severity: 'high',
      ipAddress: '203.0.113.15',
      userAgent: 'curl/7.68.0',
      status: 'failed'
    },
    {
      id: 6,
      timestamp: '2024-01-15T09:45:00Z',
      action: 'Bulk Role Update',
      type: 'bulk',
      user: 'Sarah Johnson',
      target: '15 users',
      details: 'Applied "Compliance Manager" template to department users',
      severity: 'medium',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success'
    },
    {
      id: 7,
      timestamp: '2024-01-15T08:20:00Z',
      action: 'Emergency Access Granted',
      type: 'emergency',
      user: 'System Admin',
      target: 'Sarah Johnson',
      details: 'Temporary elevated access granted for security incident response',
      severity: 'critical',
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      status: 'success'
    }
  ];

  const actionTypes = [
    { value: 'all', label: 'All Actions' },
    { value: 'user', label: 'User Management' },
    { value: 'role', label: 'Role Changes' },
    { value: 'permission', label: 'Permission Changes' },
    { value: 'security', label: 'Security Events' },
    { value: 'bulk', label: 'Bulk Operations' },
    { value: 'emergency', label: 'Emergency Access' }
  ];

  const dateRanges = [
    { value: '1d', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom range' }
  ];

  // Filter entries based on selected filters
  const filteredEntries = auditEntries.filter(entry => {
    const matchesType = filterType === 'all' || entry.type === filterType;
    const matchesSearch = !searchTerm || 
      entry.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error-dark text-white';
      case 'high':
        return 'bg-warning-dark text-white';
      case 'medium':
        return 'bg-info-dark text-white';
      case 'low':
        return 'bg-success-dark text-white';
      default:
        return 'bg-dark-elevated text-white';
    }
  };

  const getActionIcon = (type) => {
    switch (type) {
      case 'user':
        return 'User';
      case 'role':
        return 'UserCog';
      case 'permission':
        return 'Lock';
      case 'security':
        return 'Shield';
      case 'bulk':
        return 'Users';
      case 'emergency':
        return 'AlertTriangle';
      default:
        return 'Activity';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success-dark';
      case 'failed':
        return 'text-error-dark';
      case 'pending':
        return 'text-warning-dark';
      default:
        return 'text-text-dark-secondary';
    }
  };

  const handleExportAuditLog = () => {
    console.log('Exporting audit log...');
    // Here you would implement the export functionality
  };

  return (
    <ModalPortal
      isOpen={isOpen}
      onClose={onClose}
      title="Audit Trail"
      size="xl"
      className="animate-fadeIn"
    >
      {/* Description */}
      <div className="px-6 py-4 border-b border-dark bg-dark-secondary/10 flex-shrink-0">
        <p className="text-text-dark-secondary">
          Complete history of user role and permission changes
        </p>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-dark bg-dark-secondary/10 flex-shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-dark-primary mb-1">
              Action Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="neumorphic-input w-full"
            >
              {actionTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-dark-primary mb-1">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="neumorphic-input w-full"
            >
              {dateRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-text-dark-primary mb-1">
              Search
            </label>
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-dark-secondary" 
              />
              <input
                type="text"
                placeholder="Search users, actions, or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="neumorphic-input w-full pl-10 pr-4"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="p-6 border-b border-dark bg-dark-secondary/10 flex-shrink-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-text-dark-primary">{filteredEntries.length}</div>
            <div className="text-sm text-text-dark-secondary">Total Events</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-success-dark">
              {filteredEntries.filter(e => e.status === 'success').length}
            </div>
            <div className="text-sm text-text-dark-secondary">Successful</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-error-dark">
              {filteredEntries.filter(e => e.status === 'failed').length}
            </div>
            <div className="text-sm text-text-dark-secondary">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-warning-dark">
              {filteredEntries.filter(e => e.severity === 'critical' || e.severity === 'high').length}
            </div>
            <div className="text-sm text-text-dark-secondary">High Priority</div>
          </div>
        </div>
      </div>

      {/* Scrollable Audit Entries */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto bg-dark-elevated scrollbar-dark">
          {filteredEntries.length > 0 ? (
            <div className="divide-y divide-dark">
              {filteredEntries.map(entry => (
                <div key={entry.id} className="p-6 hover:bg-dark-secondary/10 transition-colors">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`p-2 rounded-lg ${getSeverityColor(entry.severity)} flex-shrink-0`}>
                      <Icon name={getActionIcon(entry.type)} size={16} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-text-dark-primary">{entry.action}</h4>
                          <p className="text-sm text-text-dark-secondary mt-1">
                            {entry.details}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            getSeverityColor(entry.severity)
                          }`}>
                            {entry.severity}
                          </span>
                          <Icon 
                            name={entry.status === 'success' ? 'CheckCircle' : 'XCircle'} 
                            size={16} 
                            className={getStatusColor(entry.status)}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-text-dark-secondary">Performed by:</span>
                          <div className="font-medium text-text-dark-primary">{entry.user}</div>
                        </div>
                        
                        <div>
                          <span className="text-text-dark-secondary">Target:</span>
                          <div className="font-medium text-text-dark-primary">{entry.target}</div>
                        </div>
                        
                        <div>
                          <span className="text-text-dark-secondary">Time:</span>
                          <div className="font-medium text-text-dark-primary">
                            {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                          </div>
                        </div>
                        
                        <div>
                          <span className="text-text-dark-secondary">IP Address:</span>
                          <div className="font-mono text-xs text-text-dark-primary">{entry.ipAddress}</div>
                        </div>
                      </div>
                      
                      {/* Expandable details */}
                      <details className="mt-3">
                        <summary className="cursor-pointer text-sm text-neon-green hover:text-neon-purple">
                          Technical Details
                        </summary>
                        <div className="mt-2 p-3 bg-dark-secondary/20 border border-dark rounded text-sm space-y-1">
                          <div><strong>User Agent:</strong> {entry.userAgent}</div>
                          <div><strong>Timestamp:</strong> {new Date(entry.timestamp).toLocaleString()}</div>
                          <div><strong>Event ID:</strong> {entry.id}</div>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Icon name="Search" size={48} className="mx-auto text-text-dark-secondary mb-4" />
              <h3 className="text-lg font-medium text-text-dark-primary mb-2">No audit entries found</h3>
              <p className="text-text-dark-secondary">
                No entries match your current filters. Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-dark bg-dark-secondary/20 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-dark-secondary">
            Showing {filteredEntries.length} of {auditEntries.length} entries
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportAuditLog}
              className="btn-secondary-dark flex items-center space-x-2 px-4 py-2 border border-dark text-text-dark-secondary rounded-lg font-medium hover:text-text-dark-primary hover:bg-dark-elevated transition-colors"
            >
              <Icon name="Download" size={16} />
              <span>Export Log</span>
            </button>
            
            <button
              onClick={onClose}
              className="btn-primary-dark px-4 py-2 rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default AuditTrailModal;