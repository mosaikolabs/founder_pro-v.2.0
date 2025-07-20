import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AccountInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [accountData, setAccountData] = useState({
    firstName: 'Mark',
    lastName: 'Johnson',
    email: 'mark.johnson@compliancehub.com',
    phone: '+1 (555) 123-4567',
    department: 'Compliance',
    role: 'Compliance Officer',
    employeeId: 'EMP001',
    location: 'New York, NY',
    manager: 'Sarah Mitchell',
    startDate: '2022-01-15',
    lastLogin: '2025-07-16 09:30:00'
  });

  const handleInputChange = (field, value) => {
    setAccountData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save account data logic
    console.log('Account data saved:', accountData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
  };

  const roles = [
    'Compliance Officer',
    'Risk Management Team',
    'Department Head',
    'C-level Executive'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-dark-primary">Account Information</h1>
          <p className="text-text-dark-secondary mt-1">Manage your personal details and profile information</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-gradient-to-r from-neon-green to-neon-purple text-white rounded-xl font-medium hover:shadow-glow-neon transition-all duration-300"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-gradient-to-r from-neon-green to-neon-purple text-white rounded-xl font-medium hover:shadow-glow-neon transition-all duration-300 flex items-center"
            >
              <Icon name="Edit" size={20} className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Picture Section */}
      <div className="bg-gradient-to-br from-dark-secondary to-dark-surface p-6 rounded-xl border border-gray-700 shadow-neumorphic">
        <h2 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="Camera" size={20} className="mr-2" />
          Profile Picture
        </h2>
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gradient-to-br from-neon-purple to-neon-green rounded-full flex items-center justify-center shadow-neumorphic">
            <Icon name="User" size={32} color="white" />
          </div>
          <div>
            <h3 className="text-text-dark-primary font-medium">{accountData.firstName} {accountData.lastName}</h3>
            <p className="text-text-dark-secondary">{accountData.role}</p>
            <button className="mt-2 text-neon-green hover:text-neon-purple transition-colors duration-300">
              Change Picture
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-gradient-to-br from-dark-secondary to-dark-surface p-6 rounded-xl border border-gray-700 shadow-neumorphic">
        <h2 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="User" size={20} className="mr-2" />
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-text-dark-primary font-medium mb-2">First Name</label>
            {isEditing ? (
              <input
                type="text"
                value={accountData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full bg-dark-surface border border-gray-600 text-text-dark-primary rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-green"
              />
            ) : (
              <p className="text-text-dark-secondary bg-dark-surface border border-gray-600 rounded-lg px-4 py-3">
                {accountData.firstName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-text-dark-primary font-medium mb-2">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                value={accountData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full bg-dark-surface border border-gray-600 text-text-dark-primary rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-green"
              />
            ) : (
              <p className="text-text-dark-secondary bg-dark-surface border border-gray-600 rounded-lg px-4 py-3">
                {accountData.lastName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-text-dark-primary font-medium mb-2">Email Address</label>
            {isEditing ? (
              <input
                type="email"
                value={accountData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full bg-dark-surface border border-gray-600 text-text-dark-primary rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-green"
              />
            ) : (
              <p className="text-text-dark-secondary bg-dark-surface border border-gray-600 rounded-lg px-4 py-3">
                {accountData.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-text-dark-primary font-medium mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                value={accountData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full bg-dark-surface border border-gray-600 text-text-dark-primary rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-green"
              />
            ) : (
              <p className="text-text-dark-secondary bg-dark-surface border border-gray-600 rounded-lg px-4 py-3">
                {accountData.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-text-dark-primary font-medium mb-2">Location</label>
            {isEditing ? (
              <input
                type="text"
                value={accountData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full bg-dark-surface border border-gray-600 text-text-dark-primary rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-green"
              />
            ) : (
              <p className="text-text-dark-secondary bg-dark-surface border border-gray-600 rounded-lg px-4 py-3">
                {accountData.location}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Work Information */}
      <div className="bg-gradient-to-br from-dark-secondary to-dark-surface p-6 rounded-xl border border-gray-700 shadow-neumorphic">
        <h2 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="Briefcase" size={20} className="mr-2" />
          Work Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-text-dark-primary font-medium mb-2">Employee ID</label>
            <p className="text-text-dark-secondary bg-dark-surface border border-gray-600 rounded-lg px-4 py-3">
              {accountData.employeeId}
            </p>
          </div>

          <div>
            <label className="block text-text-dark-primary font-medium mb-2">Department</label>
            <p className="text-text-dark-secondary bg-dark-surface border border-gray-600 rounded-lg px-4 py-3">
              {accountData.department}
            </p>
          </div>

          <div>
            <label className="block text-text-dark-primary font-medium mb-2">Role</label>
            {isEditing ? (
              <select
                value={accountData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full bg-dark-surface border border-gray-600 text-text-dark-primary rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon-green"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            ) : (
              <p className="text-text-dark-secondary bg-dark-surface border border-gray-600 rounded-lg px-4 py-3">
                {accountData.role}
              </p>
            )}
          </div>

          <div>
            <label className="block text-text-dark-primary font-medium mb-2">Manager</label>
            <p className="text-text-dark-secondary bg-dark-surface border border-gray-600 rounded-lg px-4 py-3">
              {accountData.manager}
            </p>
          </div>

          <div>
            <label className="block text-text-dark-primary font-medium mb-2">Start Date</label>
            <p className="text-text-dark-secondary bg-dark-surface border border-gray-600 rounded-lg px-4 py-3">
              {accountData.startDate}
            </p>
          </div>

          <div>
            <label className="block text-text-dark-primary font-medium mb-2">Last Login</label>
            <p className="text-text-dark-secondary bg-dark-surface border border-gray-600 rounded-lg px-4 py-3">
              {accountData.lastLogin}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;