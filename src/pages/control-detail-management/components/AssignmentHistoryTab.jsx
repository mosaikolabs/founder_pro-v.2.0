// src/pages/control-detail-management/components/AssignmentHistoryTab.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const AssignmentHistoryTab = ({ controlData, onUpdate, userRole, disabled }) => {
  const [assignmentHistory, setAssignmentHistory] = useState([
    {
      id: 1,
      assignedTo: 'John Smith',
      role: 'Control Owner',
      department: 'IT Security',
      assignedBy: 'Compliance Manager',
      assignmentDate: '2024-01-01',
      endDate: null,
      status: 'Active',
      responsibilities: [
        'Review control procedures monthly',
        'Ensure evidence collection',
        'Report control effectiveness'
      ],
      reason: 'Initial assignment - designated as primary control owner'
    },
    {
      id: 2,
      assignedTo: 'Jane Doe',
      role: 'Backup Owner',
      department: 'IT Security',
      assignedBy: 'John Smith',
      assignmentDate: '2024-01-15',
      endDate: null,
      status: 'Active',
      responsibilities: [
        'Backup control owner duties',
        'Assist with testing procedures',
        'Cover during primary owner absence'
      ],
      reason: 'Backup coverage and redundancy'
    },
    {
      id: 3,
      assignedTo: 'Mike Johnson',
      role: 'Control Owner',
      department: 'IT Security',
      assignedBy: 'Compliance Manager',
      assignmentDate: '2023-06-01',
      endDate: '2023-12-31',
      status: 'Completed',
      responsibilities: [
        'Initial control setup',
        'Procedure documentation',
        'Team training'
      ],
      reason: 'Temporary assignment during control implementation'
    }
  ]);

  const [currentAssignments, setCurrentAssignments] = useState([
    {
      id: 1,
      name: 'John Smith',
      role: 'Control Owner',
      department: 'IT Security',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      workload: 75,
      availability: 'Available',
      lastActivity: '2024-01-12'
    },
    {
      id: 2,
      name: 'Jane Doe',
      role: 'Backup Owner',
      department: 'IT Security',
      email: 'jane.doe@company.com',
      phone: '+1 (555) 123-4568',
      workload: 45,
      availability: 'Available',
      lastActivity: '2024-01-11'
    }
  ]);

  const [newAssignment, setNewAssignment] = useState({
    assignedTo: '',
    role: 'Control Owner',
    department: '',
    responsibilities: [''],
    reason: '',
    startDate: new Date().toISOString().split('T')[0]
  });

  const [activeView, setActiveView] = useState('current');
  const [showNewAssignmentModal, setShowNewAssignmentModal] = useState(false);

  const roles = ['Control Owner', 'Backup Owner', 'Reviewer', 'Approver', 'Tester', 'Observer'];
  const departments = ['IT Security', 'Compliance', 'Finance', 'Operations', 'HR', 'Legal'];

  const addNewAssignment = () => {
    const assignment = {
      id: Date.now(),
      assignedTo: newAssignment.assignedTo,
      role: newAssignment.role,
      department: newAssignment.department,
      assignedBy: 'Current User',
      assignmentDate: newAssignment.startDate,
      endDate: null,
      status: 'Active',
      responsibilities: newAssignment.responsibilities.filter(r => r.trim()),
      reason: newAssignment.reason
    };
    
    setAssignmentHistory(prev => [assignment, ...prev]);
    setCurrentAssignments(prev => [...prev, {
      id: assignment.id,
      name: assignment.assignedTo,
      role: assignment.role,
      department: assignment.department,
      email: '',
      phone: '',
      workload: 0,
      availability: 'Available',
      lastActivity: assignment.assignmentDate
    }]);
    
    setNewAssignment({
      assignedTo: '',
      role: 'Control Owner',
      department: '',
      responsibilities: [''],
      reason: '',
      startDate: new Date().toISOString().split('T')[0]
    });
    
    setShowNewAssignmentModal(false);
  };

  const endAssignment = (assignmentId) => {
    const today = new Date().toISOString().split('T')[0];
    
    setAssignmentHistory(prev => 
      prev.map(assignment => 
        assignment.id === assignmentId 
          ? { ...assignment, endDate: today, status: 'Completed' }
          : assignment
      )
    );
    
    setCurrentAssignments(prev => 
      prev.filter(assignment => assignment.id !== assignmentId)
    );
  };

  const addResponsibility = () => {
    setNewAssignment(prev => ({
      ...prev,
      responsibilities: [...prev.responsibilities, '']
    }));
  };

  const updateResponsibility = (index, value) => {
    setNewAssignment(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.map((resp, i) => 
        i === index ? value : resp
      )
    }));
  };

  const removeResponsibility = (index) => {
    setNewAssignment(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index)
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success-100 text-success-700';
      case 'Completed':
        return 'bg-secondary-100 text-secondary-700';
      case 'Suspended':
        return 'bg-warning-100 text-warning-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getWorkloadColor = (workload) => {
    if (workload >= 80) return 'bg-error text-white';
    if (workload >= 60) return 'bg-warning text-white';
    return 'bg-success text-white';
  };

  const views = [
    { id: 'current', label: 'Current Assignments', icon: 'Users' },
    { id: 'history', label: 'Assignment History', icon: 'History' },
    { id: 'workload', label: 'Workload Analysis', icon: 'BarChart3' }
  ];

  return (
    <div className="space-y-6">
      {/* View Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6 border-b border-border pb-4">
          {views.map(view => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm nav-transition ${
                activeView === view.id
                  ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
              }`}
            >
              <Icon name={view.icon} size={16} />
              <span>{view.label}</span>
            </button>
          ))}
        </div>
        
        {activeView === 'current' && (
          <button
            onClick={() => setShowNewAssignmentModal(true)}
            disabled={disabled}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="Plus" size={16} />
            <span>New Assignment</span>
          </button>
        )}
      </div>

      {/* Current Assignments View */}
      {activeView === 'current' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="Users" size={20} className="text-primary" />
            <span>Current Assignments</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentAssignments.map(assignment => (
              <div key={assignment.id} className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-text-primary">{assignment.name}</h4>
                    <p className="text-text-secondary">{assignment.role}</p>
                    <p className="text-sm text-text-secondary">{assignment.department}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor('Active')}`}>
                      Active
                    </span>
                    
                    <button
                      onClick={() => endAssignment(assignment.id)}
                      disabled={disabled}
                      className="p-1 text-text-secondary hover:text-error hover:bg-error-50 rounded nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
                      title="End assignment"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Contact:</span>
                    <div className="text-right">
                      <p className="text-sm text-text-primary">{assignment.email}</p>
                      <p className="text-sm text-text-secondary">{assignment.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Workload:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-secondary-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getWorkloadColor(assignment.workload)}`}
                          style={{ width: `${assignment.workload}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{assignment.workload}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Availability:</span>
                    <span className="text-sm text-success font-medium">{assignment.availability}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Last Activity:</span>
                    <span className="text-sm text-text-primary font-data">{assignment.lastActivity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {currentAssignments.length === 0 && (
            <div className="text-center py-12 text-text-secondary">
              <Icon name="Users" size={48} className="mx-auto mb-3 text-secondary-300" />
              <p className="text-lg mb-2">No current assignments</p>
              <p className="text-sm">Assign team members to control responsibilities</p>
            </div>
          )}
        </div>
      )}

      {/* Assignment History View */}
      {activeView === 'history' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="History" size={20} className="text-primary" />
            <span>Assignment History</span>
          </h3>
          
          <div className="space-y-4">
            {assignmentHistory.map((assignment, index) => (
              <div key={assignment.id} className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${assignment.status === 'Active' ? 'bg-success text-white' : 'bg-secondary-200 text-text-secondary'}
                    `}>
                      {index + 1}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-text-primary">{assignment.assignedTo}</h4>
                      <p className="text-text-secondary">{assignment.role} • {assignment.department}</p>
                    </div>
                  </div>
                  
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-medium text-text-secondary mb-1">Assignment Details</h5>
                      <div className="text-sm space-y-1">
                        <p><span className="text-text-secondary">Assigned by:</span> <span className="text-text-primary">{assignment.assignedBy}</span></p>
                        <p><span className="text-text-secondary">Start date:</span> <span className="text-text-primary font-data">{assignment.assignmentDate}</span></p>
                        {assignment.endDate && (
                          <p><span className="text-text-secondary">End date:</span> <span className="text-text-primary font-data">{assignment.endDate}</span></p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-text-secondary mb-1">Reason for Assignment</h5>
                      <p className="text-sm text-text-primary">{assignment.reason}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-text-secondary mb-2">Responsibilities</h5>
                    <ul className="text-sm text-text-primary space-y-1">
                      {assignment.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <Icon name="CheckCircle2" size={14} className="text-success mt-0.5 flex-shrink-0" />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workload Analysis View */}
      {activeView === 'workload' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
            <span>Workload Analysis</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Summary Cards */}
            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-text-secondary">Total Assignments</h4>
                <Icon name="Users" size={20} className="text-primary" />
              </div>
              <p className="text-2xl font-semibold text-text-primary">{currentAssignments.length}</p>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-text-secondary">Average Workload</h4>
                <Icon name="TrendingUp" size={20} className="text-primary" />
              </div>
              <p className="text-2xl font-semibold text-text-primary">
                {currentAssignments.length > 0 
                  ? Math.round(currentAssignments.reduce((sum, a) => sum + a.workload, 0) / currentAssignments.length)
                  : 0}%
              </p>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-text-secondary">Overloaded Staff</h4>
                <Icon name="AlertTriangle" size={20} className="text-warning" />
              </div>
              <p className="text-2xl font-semibold text-text-primary">
                {currentAssignments.filter(a => a.workload >= 80).length}
              </p>
            </div>
          </div>
          
          {/* Workload Distribution */}
          <div className="bg-surface border border-border rounded-lg p-6">
            <h4 className="text-md font-semibold text-text-primary mb-4">Workload Distribution</h4>
            
            <div className="space-y-4">
              {currentAssignments.map(assignment => (
                <div key={assignment.id} className="flex items-center space-x-4">
                  <div className="w-32 flex-shrink-0">
                    <p className="font-medium text-text-primary text-sm">{assignment.name}</p>
                    <p className="text-xs text-text-secondary">{assignment.role}</p>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-text-secondary">{assignment.department}</span>
                      <span className="text-sm font-medium">{assignment.workload}%</span>
                    </div>
                    
                    <div className="w-full bg-secondary-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${getWorkloadColor(assignment.workload)}`}
                        style={{ width: `${assignment.workload}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="w-16 text-right">
                    <span className={`text-xs font-medium ${
                      assignment.workload >= 80 ? 'text-error' :
                      assignment.workload >= 60 ? 'text-warning' : 'text-success'
                    }`}>
                      {assignment.workload >= 80 ? 'High' :
                       assignment.workload >= 60 ? 'Medium' : 'Low'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* New Assignment Modal */}
      {showNewAssignmentModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-modal" onClick={() => setShowNewAssignmentModal(false)} />
          
          <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
            <div className="bg-surface rounded-lg shadow-large w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-text-primary">New Assignment</h3>
                  <button
                    onClick={() => setShowNewAssignmentModal(false)}
                    className="p-2 text-text-secondary hover:text-text-primary hover:bg-secondary-50 rounded-lg nav-transition"
                  >
                    <Icon name="X" size={20} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Assignee Name *
                      </label>
                      <Input
                        value={newAssignment.assignedTo}
                        onChange={(e) => setNewAssignment(prev => ({ ...prev, assignedTo: e.target.value }))}
                        placeholder="Enter person's name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Role *
                      </label>
                      <select
                        value={newAssignment.role}
                        onChange={(e) => setNewAssignment(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        {roles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Department *
                      </label>
                      <select
                        value={newAssignment.department}
                        onChange={(e) => setNewAssignment(prev => ({ ...prev, department: e.target.value }))}
                        className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="">Select department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Start Date *
                      </label>
                      <Input
                        type="date"
                        value={newAssignment.startDate}
                        onChange={(e) => setNewAssignment(prev => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-text-secondary">
                        Responsibilities
                      </label>
                      <button
                        onClick={addResponsibility}
                        className="inline-flex items-center space-x-1 px-2 py-1 bg-secondary-100 text-text-secondary rounded hover:bg-secondary-200 nav-transition text-sm"
                      >
                        <Icon name="Plus" size={14} />
                        <span>Add</span>
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {newAssignment.responsibilities.map((responsibility, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-text-secondary w-4">
                            {index + 1}.
                          </span>
                          <Input
                            value={responsibility}
                            onChange={(e) => updateResponsibility(index, e.target.value)}
                            placeholder="Enter responsibility"
                            className="flex-1"
                          />
                          <button
                            onClick={() => removeResponsibility(index)}
                            className="p-1 text-error hover:bg-error-50 rounded nav-transition"
                          >
                            <Icon name="X" size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Reason for Assignment
                    </label>
                    <textarea
                      value={newAssignment.reason}
                      onChange={(e) => setNewAssignment(prev => ({ ...prev, reason: e.target.value }))}
                      placeholder="Explain why this assignment is being made"
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowNewAssignmentModal(false)}
                    className="px-4 py-2 border border-border text-text-secondary rounded-lg hover:text-text-primary hover:bg-secondary-50 nav-transition"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={addNewAssignment}
                    disabled={!newAssignment.assignedTo || !newAssignment.department}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Assignment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AssignmentHistoryTab;