// src/pages/user-role-administration/index.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Icon from '../../components/AppIcon';
import UserDirectory from './components/UserDirectory';
import PermissionConfiguration from './components/PermissionConfiguration';
import SecurityMonitoringPanel from './components/SecurityMonitoringPanel';
import BulkOperationsPanel from './components/BulkOperationsPanel';
import RoleTemplateModal from './components/RoleTemplateModal';
import AuditTrailModal from './components/AuditTrailModal';
import EmergencyAccessModal from './components/EmergencyAccessModal';
import ExportModal from './components/ExportModal';

const UserRoleAdministration = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('users'); // users, permissions, security
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    department: '',
    role: '',
    status: '',
    lastLogin: ''
  });
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isRoleTemplateModalOpen, setIsRoleTemplateModalOpen] = useState(false);
  const [adminData, setAdminData] = useState({
    failedLogins: 0,
    activeUsers: 0,
    securityAlerts: 0,
    lastUpdate: new Date().toISOString()
  });

  // Enhanced mock data with complete user information and expanded details
  const [users] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      department: 'IT Security',
      currentRole: 'Security Administrator',
      lastLogin: '2025-01-14 09:30:00',
      status: 'active',
      permissions: ['user-management', 'system-admin', 'audit-access', 'security-monitoring', 'emergency-access'],
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      phoneNumber: '+1 (555) 123-4567',
      employeeId: 'EMP001',
      hireDate: '2022-03-15',
      lastPasswordChange: '2024-12-01',
      mfaEnabled: true,
      location: 'New York, NY',
      manager: 'John Smith',
      team: 'Cybersecurity Team',
      accessLevel: 'Level 5 - Full Access',
      loginAttempts: 0,
      accountLocked: false,
      sessionTimeout: 30,
      passwordExpiry: '2025-03-01',
      roleDescription: 'Full administrative access to security systems and user management',
      recentActivity: [
        { action: 'User account created', timestamp: '2025-01-14 09:15:00' },
        { action: 'Password policy updated', timestamp: '2025-01-14 08:45:00' },
        { action: 'Security audit completed', timestamp: '2025-01-13 16:30:00' }
      ]
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      department: 'Compliance',
      currentRole: 'Compliance Manager',
      lastLogin: '2025-01-14 08:45:00',
      status: 'active',
      permissions: ['policy-management', 'report-access', 'user-view', 'compliance-review', 'audit-trail'],
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      phoneNumber: '+1 (555) 234-5678',
      employeeId: 'EMP002',
      hireDate: '2021-08-20',
      lastPasswordChange: '2024-11-15',
      mfaEnabled: true,
      location: 'San Francisco, CA',
      manager: 'Lisa Wang',
      team: 'Regulatory Compliance',
      accessLevel: 'Level 4 - Management Access',
      loginAttempts: 0,
      accountLocked: false,
      sessionTimeout: 60,
      passwordExpiry: '2025-02-15',
      roleDescription: 'Manage compliance policies and generate regulatory reports',
      recentActivity: [
        { action: 'Compliance report generated', timestamp: '2025-01-14 08:30:00' },
        { action: 'Policy review completed', timestamp: '2025-01-13 14:20:00' },
        { action: 'Audit findings updated', timestamp: '2025-01-13 11:45:00' }
      ]
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@company.com',
      department: 'Finance',
      currentRole: 'Department User',
      lastLogin: '2025-01-13 16:20:00',
      status: 'active',
      permissions: ['basic-access', 'department-reports', 'financial-data-view'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c',
      phoneNumber: '+1 (555) 345-6789',
      employeeId: 'EMP003',
      hireDate: '2023-01-10',
      lastPasswordChange: '2024-10-30',
      mfaEnabled: false,
      location: 'Chicago, IL',
      manager: 'Robert Taylor',
      team: 'Financial Analysis',
      accessLevel: 'Level 2 - Standard Access',
      loginAttempts: 0,
      accountLocked: false,
      sessionTimeout: 45,
      passwordExpiry: '2025-01-30',
      roleDescription: 'Access to financial reports and department-specific data',
      recentActivity: [
        { action: 'Financial report accessed', timestamp: '2025-01-13 16:10:00' },
        { action: 'Budget data reviewed', timestamp: '2025-01-13 15:30:00' },
        { action: 'Monthly report generated', timestamp: '2025-01-13 14:45:00' }
      ]
    },
    {
      id: 4,
      name: 'David Wilson',
      email: 'david.wilson@company.com',
      department: 'HR',
      currentRole: 'HR Manager',
      lastLogin: '2025-01-14 11:15:00',
      status: 'active',
      permissions: ['hr-access', 'employee-management', 'report-access', 'payroll-access', 'recruitment-tools'],
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
      phoneNumber: '+1 (555) 456-7890',
      employeeId: 'EMP004',
      hireDate: '2020-05-25',
      lastPasswordChange: '2024-12-10',
      mfaEnabled: true,
      location: 'Austin, TX',
      manager: 'Amanda Foster',
      team: 'Human Resources',
      accessLevel: 'Level 4 - Management Access',
      loginAttempts: 0,
      accountLocked: false,
      sessionTimeout: 30,
      passwordExpiry: '2025-03-10',
      roleDescription: 'Manage employee records, payroll, and recruitment processes',
      recentActivity: [
        { action: 'Employee onboarding completed', timestamp: '2025-01-14 11:00:00' },
        { action: 'Performance review scheduled', timestamp: '2025-01-14 10:30:00' },
        { action: 'Payroll report generated', timestamp: '2025-01-14 09:45:00' }
      ]
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      email: 'lisa.thompson@company.com',
      department: 'Finance',
      currentRole: 'Financial Analyst',
      lastLogin: '2025-01-12 14:30:00',
      status: 'inactive',
      permissions: ['basic-access', 'finance-reports', 'budget-analysis'],
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      phoneNumber: '+1 (555) 567-8901',
      employeeId: 'EMP005',
      hireDate: '2023-06-01',
      lastPasswordChange: '2024-09-20',
      mfaEnabled: false,
      location: 'Boston, MA',
      manager: 'Robert Taylor',
      team: 'Financial Analysis',
      accessLevel: 'Level 3 - Analyst Access',
      loginAttempts: 0,
      accountLocked: false,
      sessionTimeout: 60,
      passwordExpiry: '2025-01-20',
      roleDescription: 'Financial data analysis and budget reporting',
      recentActivity: [
        { action: 'Budget analysis completed', timestamp: '2025-01-12 14:15:00' },
        { action: 'Quarterly report reviewed', timestamp: '2025-01-12 13:45:00' },
        { action: 'Financial model updated', timestamp: '2025-01-12 12:30:00' }
      ]
    },
    {
      id: 6,
      name: 'Robert Kim',
      email: 'robert.kim@company.com',
      department: 'IT Security',
      currentRole: 'Security Analyst',
      lastLogin: '2025-01-14 10:45:00',
      status: 'active',
      permissions: ['security-monitoring', 'incident-response', 'vulnerability-assessment', 'threat-analysis'],
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
      phoneNumber: '+1 (555) 678-9012',
      employeeId: 'EMP006',
      hireDate: '2023-09-15',
      lastPasswordChange: '2024-11-28',
      mfaEnabled: true,
      location: 'Seattle, WA',
      manager: 'Sarah Johnson',
      team: 'Cybersecurity Team',
      accessLevel: 'Level 3 - Analyst Access',
      loginAttempts: 0,
      accountLocked: false,
      sessionTimeout: 45,
      passwordExpiry: '2025-02-28',
      roleDescription: 'Monitor security systems and respond to security incidents',
      recentActivity: [
        { action: 'Security incident investigated', timestamp: '2025-01-14 10:30:00' },
        { action: 'Vulnerability scan completed', timestamp: '2025-01-14 09:15:00' },
        { action: 'Threat analysis report generated', timestamp: '2025-01-14 08:00:00' }
      ]
    },
    {
      id: 7,
      name: 'Amanda Davis',
      email: 'amanda.davis@company.com',
      department: 'Compliance',
      currentRole: 'Compliance Specialist',
      lastLogin: '2025-01-11 09:00:00',
      status: 'pending',
      permissions: ['compliance-review', 'documentation-access', 'policy-view'],
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      phoneNumber: '+1 (555) 789-0123',
      employeeId: 'EMP007',
      hireDate: '2024-12-01',
      lastPasswordChange: '2024-12-01',
      mfaEnabled: false,
      location: 'Denver, CO',
      manager: 'Michael Chen',
      team: 'Regulatory Compliance',
      accessLevel: 'Level 2 - Standard Access',
      loginAttempts: 0,
      accountLocked: false,
      sessionTimeout: 60,
      passwordExpiry: '2025-03-01',
      roleDescription: 'Review compliance documentation and support policy implementation',
      recentActivity: [
        { action: 'Account activation pending', timestamp: '2025-01-11 09:00:00' },
        { action: 'Training modules assigned', timestamp: '2024-12-15 10:30:00' },
        { action: 'Profile setup completed', timestamp: '2024-12-01 14:20:00' }
      ]
    },
    {
      id: 8,
      name: 'James Martinez',
      email: 'james.martinez@company.com',
      department: 'Finance',
      currentRole: 'Department User',
      lastLogin: '2025-01-10 15:20:00',
      status: 'suspended',
      permissions: ['basic-access'],
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
      phoneNumber: '+1 (555) 890-1234',
      employeeId: 'EMP008',
      hireDate: '2022-11-30',
      lastPasswordChange: '2024-08-15',
      mfaEnabled: true,
      location: 'Miami, FL',
      manager: 'Robert Taylor',
      team: 'Financial Operations',
      accessLevel: 'Level 1 - Basic Access',
      loginAttempts: 5,
      accountLocked: true,
      sessionTimeout: 30,
      passwordExpiry: '2025-02-15',
      roleDescription: 'Basic access to financial systems (currently suspended)',
      recentActivity: [
        { action: 'Account suspended for policy violation', timestamp: '2025-01-10 15:30:00' },
        { action: 'Multiple failed login attempts', timestamp: '2025-01-10 15:25:00' },
        { action: 'Security alert triggered', timestamp: '2025-01-10 15:20:00' }
      ]
    },
    {
      id: 9,
      name: 'Jennifer Brown',
      email: 'jennifer.brown@company.com',
      department: 'HR',
      currentRole: 'HR Specialist',
      lastLogin: '2025-01-14 13:10:00',
      status: 'active',
      permissions: ['hr-access', 'employee-records', 'benefits-management', 'training-coordination'],
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg',
      phoneNumber: '+1 (555) 901-2345',
      employeeId: 'EMP009',
      hireDate: '2023-04-12',
      lastPasswordChange: '2024-10-05',
      mfaEnabled: true,
      location: 'Phoenix, AZ',
      manager: 'David Wilson',
      team: 'Human Resources',
      accessLevel: 'Level 3 - Specialist Access',
      loginAttempts: 0,
      accountLocked: false,
      sessionTimeout: 45,
      passwordExpiry: '2025-01-05',
      roleDescription: 'Manage employee records and coordinate training programs',
      recentActivity: [
        { action: 'Training session scheduled', timestamp: '2025-01-14 13:00:00' },
        { action: 'Employee benefits updated', timestamp: '2025-01-14 12:15:00' },
        { action: 'Performance review completed', timestamp: '2025-01-14 11:30:00' }
      ]
    },
    {
      id: 10,
      name: 'Kevin Lee',
      email: 'kevin.lee@company.com',
      department: 'IT Security',
      currentRole: 'Auditor',
      lastLogin: '2025-01-14 07:30:00',
      status: 'active',
      permissions: ['audit-access', 'compliance-review', 'report-generation', 'system-monitoring', 'data-analysis'],
      avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
      phoneNumber: '+1 (555) 012-3456',
      employeeId: 'EMP010',
      hireDate: '2021-02-28',
      lastPasswordChange: '2024-12-15',
      mfaEnabled: true,
      location: 'Portland, OR',
      manager: 'Sarah Johnson',
      team: 'Security Audit Team',
      accessLevel: 'Level 4 - Auditor Access',
      loginAttempts: 0,
      accountLocked: false,
      sessionTimeout: 60,
      passwordExpiry: '2025-03-15',
      roleDescription: 'Conduct security audits and generate compliance reports',
      recentActivity: [
        { action: 'Security audit initiated', timestamp: '2025-01-14 07:15:00' },
        { action: 'Compliance report reviewed', timestamp: '2025-01-14 06:45:00' },
        { action: 'System monitoring alerts checked', timestamp: '2025-01-14 06:30:00' }
      ]
    },
    {
      id: 11,
      name: 'Maria Garcia',
      email: 'maria.garcia@company.com',
      department: 'Operations',
      currentRole: 'Operations Manager',
      lastLogin: '2025-01-14 12:45:00',
      status: 'active',
      permissions: ['operations-management', 'workflow-optimization', 'team-coordination', 'report-access'],
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg',
      phoneNumber: '+1 (555) 111-2222',
      employeeId: 'EMP011',
      hireDate: '2022-07-10',
      lastPasswordChange: '2024-11-20',
      mfaEnabled: true,
      location: 'Dallas, TX',
      manager: 'Executive Team',
      team: 'Operations',
      accessLevel: 'Level 4 - Management Access',
      loginAttempts: 0,
      accountLocked: false,
      sessionTimeout: 30,
      passwordExpiry: '2025-02-20',
      roleDescription: 'Oversee daily operations and optimize business workflows',
      recentActivity: [
        { action: 'Weekly operations review', timestamp: '2025-01-14 12:30:00' },
        { action: 'Process optimization meeting', timestamp: '2025-01-14 11:15:00' },
        { action: 'Team performance metrics updated', timestamp: '2025-01-14 10:00:00' }
      ]
    },
    {
      id: 12,
      name: 'Thomas Anderson',
      email: 'thomas.anderson@company.com',
      department: 'Legal',
      currentRole: 'Legal Counsel',
      lastLogin: '2025-01-14 14:20:00',
      status: 'active',
      permissions: ['legal-access', 'contract-management', 'regulatory-compliance', 'litigation-support'],
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
      phoneNumber: '+1 (555) 333-4444',
      employeeId: 'EMP012',
      hireDate: '2020-09-15',
      lastPasswordChange: '2024-12-05',
      mfaEnabled: true,
      location: 'Washington, DC',
      manager: 'Executive Team',
      team: 'Legal Department',
      accessLevel: 'Level 5 - Executive Access',
      loginAttempts: 0,
      accountLocked: false,
      sessionTimeout: 45,
      passwordExpiry: '2025-03-05',
      roleDescription: 'Provide legal guidance and manage regulatory compliance',
      recentActivity: [
        { action: 'Contract review completed', timestamp: '2025-01-14 14:10:00' },
        { action: 'Regulatory filing submitted', timestamp: '2025-01-14 13:30:00' },
        { action: 'Legal briefing prepared', timestamp: '2025-01-14 12:45:00' }
      ]
    }
  ]);

  const viewOptions = [
    { id: 'users', label: 'User Directory', icon: 'Users' },
    { id: 'permissions', label: 'Permissions', icon: 'Shield' },
    { id: 'security', label: 'Security Monitoring', icon: 'Lock' }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleBulkUserSelect = (userIds) => {
    setSelectedUsers(userIds);
  };

  const handleExport = () => {
    setIsExportModalOpen(true);
  };

  const handleEmergencyAccess = () => {
    setIsEmergencyModalOpen(true);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filters) => {
    setFilterOptions(filters);
  };

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setAdminData(prev => ({
        ...prev,
        failedLogins: Math.max(0, prev.failedLogins + Math.floor(Math.random() * 3) - 1),
        activeUsers: users.filter(user => user.status === 'active').length,
        securityAlerts: Math.max(0, prev.securityAlerts + Math.floor(Math.random() * 2) - 1),
        lastUpdate: new Date().toISOString()
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, [users]);

  const handleKeyboardShortcuts = (e) => {
    if (e.ctrlKey) {
      switch (e.key) {
        case 'e':
          e.preventDefault();
          handleExport();
          break;
        case 't':
          e.preventDefault();
          setIsRoleTemplateModalOpen(true);
          break;
        case 'a':
          e.preventDefault();
          setIsAuditModalOpen(true);
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

  // Statistics for dashboard overview
  const dashboardStats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    inactiveUsers: users.filter(u => u.status === 'inactive').length,
    pendingUsers: users.filter(u => u.status === 'pending').length,
    suspendedUsers: users.filter(u => u.status === 'suspended').length,
    mfaEnabled: users.filter(u => u.mfaEnabled).length,
    accountsLocked: users.filter(u => u.accountLocked).length,
    expiringSoon: users.filter(u => {
      const expiry = new Date(u.passwordExpiry);
      const today = new Date();
      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays > 0;
    }).length
  };

  return (
    <div className="min-h-screen bg-gradient-dark dark-theme">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="lg:ml-sidebar">
        <div className="p-4 lg:p-6">
          <Breadcrumbs />
          
          {/* Enhanced Dashboard Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            <div className="neumorphic-card p-4 text-center">
              <div className="text-2xl font-bold text-neon-green">{dashboardStats.totalUsers}</div>
              <div className="text-sm text-text-dark-secondary">Total Users</div>
            </div>
            <div className="neumorphic-card p-4 text-center">
              <div className="text-2xl font-bold text-success-dark">{dashboardStats.activeUsers}</div>
              <div className="text-sm text-text-dark-secondary">Active</div>
            </div>
            <div className="neumorphic-card p-4 text-center">
              <div className="text-2xl font-bold text-warning-dark">{dashboardStats.pendingUsers}</div>
              <div className="text-sm text-text-dark-secondary">Pending</div>
            </div>
            <div className="neumorphic-card p-4 text-center">
              <div className="text-2xl font-bold text-error-dark">{dashboardStats.suspendedUsers}</div>
              <div className="text-sm text-text-dark-secondary">Suspended</div>
            </div>
            <div className="neumorphic-card p-4 text-center">
              <div className="text-2xl font-bold text-neon-purple">{dashboardStats.mfaEnabled}</div>
              <div className="text-sm text-text-dark-secondary">MFA Enabled</div>
            </div>
            <div className="neumorphic-card p-4 text-center">
              <div className="text-2xl font-bold text-warning-dark">{dashboardStats.expiringSoon}</div>
              <div className="text-sm text-text-dark-secondary">Expiring Soon</div>
            </div>
          </div>
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-text-dark-primary mb-2">
                User Role Administration
              </h1>
              <p className="text-text-dark-secondary">
                Manage user accounts, roles, permissions, and security settings
              </p>
              <div className="mt-2 text-sm text-text-dark-muted">
                Last updated: {new Date(adminData.lastUpdate).toLocaleString()}
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <button
                onClick={() => setIsRoleTemplateModalOpen(true)}
                className="btn-secondary-dark inline-flex items-center space-x-2"
              >
                <Icon name="Template" size={16} />
                <span>Role Templates</span>
              </button>
              <button
                onClick={() => setIsAuditModalOpen(true)}
                className="btn-secondary-dark inline-flex items-center space-x-2"
              >
                <Icon name="FileText" size={16} />
                <span>Audit Trail</span>
              </button>
              <button
                onClick={() => setIsEmergencyModalOpen(true)}
                className="btn-secondary-dark inline-flex items-center space-x-2"
              >
                <Icon name="AlertTriangle" size={16} />
                <span>Emergency Access</span>
              </button>
              <button className="btn-primary-dark inline-flex items-center space-x-2">
                <Icon name="Plus" size={16} />
                <span>Add User</span>
              </button>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-sm font-medium text-text-dark-secondary">View:</span>
            <div className="flex items-center neumorphic-card p-1">
              {viewOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveView(option.id)}
                  className={`px-4 py-2 text-sm inline-flex items-center space-x-2 rounded-lg transition-all ${
                    activeView === option.id
                      ? 'bg-gradient-to-r from-neon-green to-neon-purple text-white shadow-glow-neon' 
                      : 'text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated hover:bg-opacity-30'
                  }`}
                >
                  <Icon name={option.icon} size={16} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bulk Operations Panel */}
          {selectedUsers.length > 0 && activeView === 'users' && (
            <BulkOperationsPanel
              selectedCount={selectedUsers.length}
              onClearSelection={() => setSelectedUsers([])}
              onExport={() => setIsExportModalOpen(true)}
            />
          )}

          {/* Main Content */}
          <div className="neumorphic-card">
            {activeView === 'users' && (
              <UserDirectory
                users={users}
                selectedUsers={selectedUsers}
                selectedUser={selectedUser}
                onUserSelect={handleUserSelect}
                onBulkSelect={handleBulkUserSelect}
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                filterOptions={filterOptions}
                onFilterChange={handleFilterChange}
              />
            )}
            {activeView === 'permissions' && <PermissionConfiguration />}
            {activeView === 'security' && <SecurityMonitoringPanel />}
          </div>
        </div>
      </main>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        selectedUsers={selectedUsers}
      />

      {/* Audit Trail Modal */}
      <AuditTrailModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />

      {/* Emergency Access Modal */}
      <EmergencyAccessModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      {/* Role Template Modal */}
      <RoleTemplateModal
        isOpen={isRoleTemplateModalOpen}
        onClose={() => setIsRoleTemplateModalOpen(false)}
      />
    </div>
  );
};

export default UserRoleAdministration;