// src/pages/user-role-administration/components/UserDirectory.jsx
import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import { formatDistanceToNow } from 'date-fns';
import { Select } from '../../../components/ui/Dropdown';

const UserDirectory = ({
  users = [],
  selectedUsers = [],
  selectedUser,
  onUserSelect,
  onBulkSelect,
  searchTerm = '',
  onSearchChange,
  filterOptions = {},
  onFilterChange,
  compact = false
}) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showUserDetails, setShowUserDetails] = useState(false);

  // Enhanced filtering with more options
  const filteredUsers = useMemo(() => {
    return users?.filter(user => {
      const matchesSearch = user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user?.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user?.currentRole?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user?.employeeId?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = (
        (!filterOptions.department || user?.department === filterOptions.department) &&
        (!filterOptions.role || user?.currentRole === filterOptions.role) &&
        (!filterOptions.status || user?.status === filterOptions.status) &&
        (!filterOptions.location || user?.location?.includes(filterOptions.location)) &&
        (!filterOptions.mfaStatus || (filterOptions.mfaStatus === 'enabled' ? user?.mfaEnabled : !user?.mfaEnabled))
      );

      return matchesSearch && matchesFilters;
    }) || [];
  }, [users, searchTerm, filterOptions]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const aValue = a?.[sortField] || '';
      const bValue = b?.[sortField] || '';
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (sortField === 'lastLogin') {
        const aDate = new Date(aValue);
        const bDate = new Date(bValue);
        return sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
      }
      
      return 0;
    });
  }, [filteredUsers, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleUserClick = (user) => {
    onUserSelect?.(user);
    setShowUserDetails(true);
  };

  const handleBulkSelect = (userId) => {
    const isSelected = selectedUsers.includes(userId);
    if (isSelected) {
      onBulkSelect?.(selectedUsers.filter(id => id !== userId));
    } else {
      onBulkSelect?.([...selectedUsers, userId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === sortedUsers.length) {
      onBulkSelect?.([]);
    } else {
      onBulkSelect?.(sortedUsers.map(user => user?.id).filter(Boolean));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success-dark bg-opacity-20 text-success-dark border-success-dark';
      case 'inactive':
        return 'bg-dark-elevated bg-opacity-50 text-text-dark-secondary border-text-dark-secondary';
      case 'pending':
        return 'bg-warning-dark bg-opacity-20 text-warning-dark border-warning-dark';
      case 'suspended':
        return 'bg-error-dark bg-opacity-20 text-error-dark border-error-dark';
      default:
        return 'bg-dark-elevated bg-opacity-50 text-text-dark-secondary border-text-dark-secondary';
    }
  };

  const getAccessLevelColor = (level) => {
    if (level?.includes('Level 5')) return 'text-neon-purple';
    if (level?.includes('Level 4')) return 'text-neon-green';
    if (level?.includes('Level 3')) return 'text-info-dark';
    if (level?.includes('Level 2')) return 'text-warning-dark';
    return 'text-text-dark-muted';
  };

  const formatLastLogin = (lastLogin) => {
    if (!lastLogin) return 'Never';
    try {
      return formatDistanceToNow(new Date(lastLogin), { addSuffix: true });
    } catch {
      return 'Unknown';
    }
  };

  const isPasswordExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  return (
    <div className="bg-gradient-dark">
      {/* Header */}
      <div className="p-4 border-b border-white border-opacity-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-dark-primary">
            User Directory
            <span className="ml-2 text-sm font-normal text-text-dark-secondary">
              ({sortedUsers.length} of {users.length} users)
            </span>
          </h3>
          
          {!compact && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' ?'bg-neon-green bg-opacity-20 text-neon-green shadow-glow-neon' :'text-text-dark-muted hover:text-text-dark-primary hover:bg-dark-elevated hover:bg-opacity-30'
                }`}
              >
                <Icon name="Grid3X3" size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' ?'bg-neon-green bg-opacity-20 text-neon-green shadow-glow-neon' :'text-text-dark-muted hover:text-text-dark-primary hover:bg-dark-elevated hover:bg-opacity-30'
                }`}
              >
                <Icon name="List" size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Enhanced Search and Filters */}
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-dark-muted" 
            />
            <input
              type="text"
              placeholder="Search users, emails, departments, or employee IDs..."
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="form-input-dark w-full pl-10 pr-4 py-2"
            />
          </div>

          {/* Enhanced Filters */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            <Select
              value={filterOptions.department || ''}
              onChange={(value) => onFilterChange?.({ ...filterOptions, department: value })}
              options={[
                { value: '', label: 'All Departments' },
                { value: 'IT Security', label: 'IT Security' },
                { value: 'Compliance', label: 'Compliance' },
                { value: 'Finance', label: 'Finance' },
                { value: 'HR', label: 'HR' },
                { value: 'Operations', label: 'Operations' },
                { value: 'Legal', label: 'Legal' }
              ]}
              placeholder="All Departments"
              width="100%"
            />
            
            <Select
              value={filterOptions.role || ''}
              onChange={(value) => onFilterChange?.({ ...filterOptions, role: value })}
              options={[
                { value: '', label: 'All Roles' },
                { value: 'Security Administrator', label: 'Security Administrator' },
                { value: 'Compliance Manager', label: 'Compliance Manager' },
                { value: 'Department User', label: 'Department User' },
                { value: 'Auditor', label: 'Auditor' },
                { value: 'HR Manager', label: 'HR Manager' },
                { value: 'Operations Manager', label: 'Operations Manager' },
                { value: 'Legal Counsel', label: 'Legal Counsel' }
              ]}
              placeholder="All Roles"
              width="100%"
            />
            
            <Select
              value={filterOptions.status || ''}
              onChange={(value) => onFilterChange?.({ ...filterOptions, status: value })}
              options={[
                { value: '', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'pending', label: 'Pending' },
                { value: 'suspended', label: 'Suspended' }
              ]}
              placeholder="All Status"
              width="100%"
            />

            <Select
              value={filterOptions.mfaStatus || ''}
              onChange={(value) => onFilterChange?.({ ...filterOptions, mfaStatus: value })}
              options={[
                { value: '', label: 'All MFA Status' },
                { value: 'enabled', label: 'MFA Enabled' },
                { value: 'disabled', label: 'MFA Disabled' }
              ]}
              placeholder="All MFA Status"
              width="100%"
            />

            <input
              type="text"
              placeholder="Location"
              value={filterOptions.location || ''}
              onChange={(e) => onFilterChange?.({ ...filterOptions, location: e.target.value })}
              className="form-input-dark px-3 py-2 text-sm"
            />
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onFilterChange?.({ department: '', role: '', status: '', location: '', mfaStatus: '' })}
                className="btn-secondary-dark flex items-center space-x-1 px-3 py-2 text-sm"
              >
                <Icon name="X" size={14} />
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="px-4 py-3 bg-gradient-to-r from-neon-green to-neon-purple bg-opacity-20 border-b border-white border-opacity-10">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neon-green">
              {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <button className="btn-secondary-dark text-xs px-3 py-1">
                <Icon name="Edit" size={12} className="mr-1" />
                Edit Roles
              </button>
              <button className="btn-secondary-dark text-xs px-3 py-1">
                <Icon name="Download" size={12} className="mr-1" />
                Export
              </button>
              <button
                onClick={() => onBulkSelect?.([])}
                className="text-sm text-text-dark-muted hover:text-text-dark-primary"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User List */}
      <div className="flex">
        {/* User List Container */}
        <div className={`${selectedUser && showUserDetails ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
          <div className={`${compact ? 'max-h-96' : 'max-h-[600px]'} overflow-y-auto scrollbar-dark`}>
            {viewMode === 'grid' && !compact ? (
              /* Enhanced Grid View */
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedUsers.map((user) => (
                  <div
                    key={user?.id}
                    className={`neumorphic-card p-4 cursor-pointer transition-all duration-300 min-h-[200px] ${
                      selectedUser?.id === user?.id
                        ? 'ring-2 ring-neon-green ring-opacity-50 shadow-glow-neon' 
                        : 'hover:shadow-neumorphic-hover hover:transform hover:scale-105'
                    }`}
                    onClick={() => handleUserClick(user)}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="flex items-center flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user?.id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleBulkSelect(user?.id);
                            }}
                            className="mr-3 h-4 w-4 text-neon-green bg-dark-primary border-white border-opacity-20 rounded focus:ring-neon-green focus:ring-2 flex-shrink-0"
                          />
                          <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 rounded-full overflow-hidden bg-dark-elevated bg-opacity-30">
                              <img
                                src={user?.avatar || 'https://images.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                                alt={user?.name || 'User'}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = 'https://images.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
                                }}
                              />
                            </div>
                            {user?.mfaEnabled && (
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-success-dark rounded-full flex items-center justify-center">
                                <Icon name="Shield" size={12} className="text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-text-dark-primary truncate text-sm leading-5">
                              {user?.name || 'Unknown User'}
                            </h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border flex-shrink-0 ${getStatusColor(user?.status)}`}>
                              {user?.status || 'unknown'}
                            </span>
                          </div>
                          
                          <p className="text-sm text-text-dark-secondary truncate leading-4 mb-2">
                            {user?.email || 'No email'}
                          </p>
                          
                          <div className="space-y-1 mb-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-text-dark-muted truncate flex-1 mr-2">
                                {user?.department || 'No department'}
                              </span>
                              <span className="text-text-dark-muted flex-shrink-0">
                                {formatLastLogin(user?.lastLogin)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs px-2 py-1 bg-dark-elevated bg-opacity-50 text-text-dark-secondary rounded border border-white border-opacity-10 truncate max-w-[70%]">
                              {user?.currentRole || 'No role assigned'}
                            </span>
                            <span className={`text-xs font-medium flex-shrink-0 ${getAccessLevelColor(user?.accessLevel)}`}>
                              {user?.accessLevel?.replace('Level ', 'L') || 'No level'}
                            </span>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="space-y-1 text-xs mb-3">
                          <div className="flex items-center space-x-1">
                            <Icon name="MapPin" size={12} className="text-text-dark-muted flex-shrink-0" />
                            <span className="text-text-dark-muted truncate">{user?.location || 'No location'}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Phone" size={12} className="text-text-dark-muted flex-shrink-0" />
                            <span className="text-text-dark-muted truncate">{user?.phoneNumber || 'No phone'}</span>
                          </div>
                        </div>

                        {/* Warning indicators */}
                        <div className="flex items-center space-x-1 flex-wrap gap-1">
                          {user?.accountLocked && (
                            <span className="text-xs bg-error-dark bg-opacity-20 text-error-dark px-2 py-1 rounded flex items-center">
                              <Icon name="Lock" size={10} className="mr-1 flex-shrink-0" />
                              <span className="truncate">Locked</span>
                            </span>
                          )}
                          {isPasswordExpiringSoon(user?.passwordExpiry) && (
                            <span className="text-xs bg-warning-dark bg-opacity-20 text-warning-dark px-2 py-1 rounded flex items-center">
                              <Icon name="Clock" size={10} className="mr-1 flex-shrink-0" />
                              <span className="truncate">Expiring</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Enhanced List View */
              <div className="divide-y divide-white divide-opacity-10">
                {/* Table Header */}
                {!compact && (
                  <div className="px-4 py-3 bg-gradient-to-r from-dark-primary to-dark-secondary">
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === sortedUsers.length && sortedUsers.length > 0}
                          onChange={handleSelectAll}
                          className="h-4 w-4 text-neon-green bg-dark-primary border-white border-opacity-20 rounded focus:ring-neon-green focus:ring-2"
                        />
                      </div>
                      
                      <div className="flex-1 grid grid-cols-12 gap-4 text-xs font-medium text-text-dark-secondary uppercase tracking-wider">
                        <div className="col-span-3">
                          <button
                            onClick={() => handleSort('name')}
                            className="flex items-center space-x-1 hover:text-text-dark-primary transition-colors"
                          >
                            <span>User</span>
                            {sortField === 'name' && (
                              <Icon 
                                name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                                size={12} 
                              />
                            )}
                          </button>
                        </div>
                        <div className="col-span-2">
                          <button
                            onClick={() => handleSort('department')}
                            className="flex items-center space-x-1 hover:text-text-dark-primary transition-colors"
                          >
                            <span>Department</span>
                            {sortField === 'department' && (
                              <Icon 
                                name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                                size={12} 
                              />
                            )}
                          </button>
                        </div>
                        <div className="col-span-2">
                          <button
                            onClick={() => handleSort('currentRole')}
                            className="flex items-center space-x-1 hover:text-text-dark-primary transition-colors"
                          >
                            <span>Role</span>
                            {sortField === 'currentRole' && (
                              <Icon 
                                name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                                size={12} 
                              />
                            )}
                          </button>
                        </div>
                        <div className="col-span-2">
                          <button
                            onClick={() => handleSort('lastLogin')}
                            className="flex items-center space-x-1 hover:text-text-dark-primary transition-colors"
                          >
                            <span>Last Login</span>
                            {sortField === 'lastLogin' && (
                              <Icon 
                                name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                                size={12} 
                              />
                            )}
                          </button>
                        </div>
                        <div className="col-span-2">
                          <button
                            onClick={() => handleSort('status')}
                            className="flex items-center space-x-1 hover:text-text-dark-primary transition-colors"
                          >
                            <span>Status</span>
                            {sortField === 'status' && (
                              <Icon 
                                name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                                size={12} 
                              />
                            )}
                          </button>
                        </div>
                        <div className="col-span-1">
                          <span>Actions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* User Rows */}
                {sortedUsers.map((user) => (
                  <div
                    key={user?.id}
                    className={`px-4 py-3 cursor-pointer hover:bg-dark-elevated hover:bg-opacity-20 transition-all ${
                      selectedUser?.id === user?.id ? 'bg-neon-green bg-opacity-20 border-l-4 border-neon-green' : ''
                    }`}
                    onClick={() => handleUserClick(user)}
                  >
                    <div className="flex items-center">
                      <div className="flex items-center mr-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user?.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleBulkSelect(user?.id);
                          }}
                          className="h-4 w-4 text-neon-green bg-dark-primary border-white border-opacity-20 rounded focus:ring-neon-green focus:ring-2"
                        />
                      </div>
                      
                      <div className={`flex-1 grid gap-4 ${compact ? 'grid-cols-2' : 'grid-cols-12'}`}>
                        {/* User Info */}
                        <div className={compact ? 'col-span-1' : 'col-span-3'}>
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-dark-elevated bg-opacity-30 flex-shrink-0">
                                <img
                                  src={user?.avatar || 'https://images.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                                  alt={user?.name || 'User'}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.src = 'https://images.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
                                  }}
                                />
                              </div>
                              {user?.mfaEnabled && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-success-dark rounded-full flex items-center justify-center">
                                  <Icon name="Shield" size={10} className="text-white" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-text-dark-primary truncate">
                                  {user?.name || 'Unknown User'}
                                </p>
                                {user?.accountLocked && (
                                  <Icon name="Lock" size={12} className="text-error-dark" />
                                )}
                                {isPasswordExpiringSoon(user?.passwordExpiry) && (
                                  <Icon name="Clock" size={12} className="text-warning-dark" />
                                )}
                              </div>
                              <p className="text-sm text-text-dark-secondary truncate">
                                {user?.email || 'No email'}
                              </p>
                              <p className="text-xs text-text-dark-muted">
                                {user?.employeeId || 'No ID'}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {!compact && (
                          <>
                            {/* Department */}
                            <div className="col-span-2 flex items-center">
                              <div>
                                <span className="text-sm text-text-dark-primary">
                                  {user?.department || 'No department'}
                                </span>
                                <p className="text-xs text-text-dark-muted">
                                  {user?.team || 'No team'}
                                </p>
                              </div>
                            </div>
                            
                            {/* Role */}
                            <div className="col-span-2 flex items-center">
                              <div>
                                <span className="text-sm px-2 py-1 bg-dark-elevated bg-opacity-50 text-text-dark-secondary rounded border border-white border-opacity-10">
                                  {user?.currentRole || 'No role assigned'}
                                </span>
                                <p className={`text-xs mt-1 ${getAccessLevelColor(user?.accessLevel)}`}>
                                  {user?.accessLevel || 'No level'}
                                </p>
                              </div>
                            </div>
                            
                            {/* Last Login */}
                            <div className="col-span-2 flex items-center">
                              <div>
                                <span className="text-sm text-text-dark-primary">
                                  {formatLastLogin(user?.lastLogin)}
                                </span>
                                <p className="text-xs text-text-dark-muted">
                                  {user?.location || 'No location'}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {/* Status */}
                        <div className={compact ? 'col-span-1 flex justify-end items-center' : 'col-span-2 flex items-center'}>
                          <div className="flex flex-col items-end">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(user?.status)}`}>
                              {user?.status || 'unknown'}
                            </span>
                            {user?.loginAttempts > 0 && (
                              <span className="text-xs text-error-dark mt-1">
                                {user?.loginAttempts} failed attempts
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        {!compact && (
                          <div className="col-span-1 flex items-center justify-end">
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUserClick(user);
                                }}
                                className="p-1 rounded text-text-dark-muted hover:text-neon-green transition-colors"
                              >
                                <Icon name="Eye" size={14} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle edit action
                                }}
                                className="p-1 rounded text-text-dark-muted hover:text-neon-green transition-colors"
                              >
                                <Icon name="Edit" size={14} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Enhanced Empty State */}
            {sortedUsers.length === 0 && (
              <div className="p-12 text-center">
                <div className="neumorphic-card p-8 inline-block">
                  <Icon name="Users" size={64} className="mx-auto text-text-dark-muted mb-4" />
                  <h3 className="text-xl font-medium text-text-dark-primary mb-2">
                    {searchTerm || Object.values(filterOptions).some(Boolean) ? 'No users found' : 'No users available'}
                  </h3>
                  <p className="text-text-dark-secondary mb-4">
                    {searchTerm || Object.values(filterOptions).some(Boolean)
                      ? 'Try adjusting your search criteria or filters to find the users you\'re looking for.'
                      : 'Get started by adding your first user to the system.'}
                  </p>
                  {searchTerm || Object.values(filterOptions).some(Boolean) ? (
                    <button
                      onClick={() => {
                        onSearchChange?.('');
                        onFilterChange?.({ department: '', role: '', status: '', location: '', mfaStatus: '' });
                      }}
                      className="btn-secondary-dark"
                    >
                      Clear all filters
                    </button>
                  ) : (
                    <button className="btn-primary-dark">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Add First User
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced User Details Panel */}
        {selectedUser && showUserDetails && (
          <div className="w-1/2 border-l border-white border-opacity-10 bg-gradient-to-b from-dark-primary to-dark-secondary">
            <div className="p-4 border-b border-white border-opacity-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-dark-primary">User Details</h3>
                <button
                  onClick={() => setShowUserDetails(false)}
                  className="p-2 rounded-lg text-text-dark-muted hover:text-text-dark-primary hover:bg-dark-elevated hover:bg-opacity-30 transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>
            
            <div className="p-4 overflow-y-auto scrollbar-dark max-h-[600px]">
              {/* User Profile */}
              <div className="neumorphic-card p-4 mb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-dark-elevated bg-opacity-30">
                      <img
                        src={selectedUser?.avatar || 'https://images.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                        alt={selectedUser?.name || 'User'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://images.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
                        }}
                      />
                    </div>
                    {selectedUser?.mfaEnabled && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-success-dark rounded-full flex items-center justify-center">
                        <Icon name="Shield" size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-text-dark-primary">
                      {selectedUser?.name || 'Unknown User'}
                    </h4>
                    <p className="text-text-dark-secondary">{selectedUser?.email || 'No email'}</p>
                    <p className="text-sm text-text-dark-muted">{selectedUser?.employeeId || 'No ID'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-dark-muted">Department:</span>
                    <p className="text-text-dark-primary">{selectedUser?.department || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-text-dark-muted">Role:</span>
                    <p className="text-text-dark-primary">{selectedUser?.currentRole || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-text-dark-muted">Status:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedUser?.status)}`}>
                      {selectedUser?.status || 'unknown'}
                    </span>
                  </div>
                  <div>
                    <span className="text-text-dark-muted">Access Level:</span>
                    <p className={`font-medium ${getAccessLevelColor(selectedUser?.accessLevel)}`}>
                      {selectedUser?.accessLevel || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="neumorphic-card p-4 mb-4">
                <h5 className="text-md font-semibold text-text-dark-primary mb-3">Contact Information</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={16} className="text-text-dark-muted" />
                    <span className="text-text-dark-primary">{selectedUser?.email || 'No email'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-text-dark-muted" />
                    <span className="text-text-dark-primary">{selectedUser?.phoneNumber || 'No phone'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-text-dark-muted" />
                    <span className="text-text-dark-primary">{selectedUser?.location || 'No location'}</span>
                  </div>
                </div>
              </div>

              {/* Security Information */}
              <div className="neumorphic-card p-4 mb-4">
                <h5 className="text-md font-semibold text-text-dark-primary mb-3">Security Information</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-text-dark-muted">MFA Status:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedUser?.mfaEnabled ? 'bg-success-dark bg-opacity-20 text-success-dark' : 'bg-error-dark bg-opacity-20 text-error-dark'
                    }`}>
                      {selectedUser?.mfaEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-dark-muted">Account Status:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      selectedUser?.accountLocked ? 'bg-error-dark bg-opacity-20 text-error-dark' : 'bg-success-dark bg-opacity-20 text-success-dark'
                    }`}>
                      {selectedUser?.accountLocked ? 'Locked' : 'Unlocked'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-dark-muted">Failed Login Attempts:</span>
                    <span className="text-text-dark-primary">{selectedUser?.loginAttempts || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-dark-muted">Session Timeout:</span>
                    <span className="text-text-dark-primary">{selectedUser?.sessionTimeout || 'N/A'} minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-dark-muted">Password Expiry:</span>
                    <span className={`text-sm ${isPasswordExpiringSoon(selectedUser?.passwordExpiry) ? 'text-warning-dark' : 'text-text-dark-primary'}`}>
                      {selectedUser?.passwordExpiry || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div className="neumorphic-card p-4 mb-4">
                <h5 className="text-md font-semibold text-text-dark-primary mb-3">Permissions</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedUser?.permissions?.map((permission, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs bg-neon-green bg-opacity-20 text-neon-green rounded-full border border-neon-green border-opacity-30"
                    >
                      {permission}
                    </span>
                  )) || <span className="text-text-dark-muted text-sm">No permissions assigned</span>}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="neumorphic-card p-4">
                <h5 className="text-md font-semibold text-text-dark-primary mb-3">Recent Activity</h5>
                <div className="space-y-3">
                  {selectedUser?.recentActivity?.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 py-2 border-b border-white border-opacity-10 last:border-b-0">
                      <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-text-dark-primary">{activity.action}</p>
                        <p className="text-xs text-text-dark-muted">{activity.timestamp}</p>
                      </div>
                    </div>
                  )) || <span className="text-text-dark-muted text-sm">No recent activity</span>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDirectory;