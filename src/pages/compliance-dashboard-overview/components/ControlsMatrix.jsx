import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ControlsMatrix = ({ onControlClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Mock data for controls matrix
  const departments = [
    "IT Security", "Finance", "HR", "Operations", "Legal", "Marketing", "Sales", "R&D"
  ];

  const controls = [
    "CTRL-001", "CTRL-002", "CTRL-003", "CTRL-004", "CTRL-005", 
    "CTRL-006", "CTRL-007", "CTRL-008", "CTRL-009", "CTRL-010"
  ];

  const matrixData = departments.map(dept => {
    const row = { department: dept };
    controls.forEach(control => {
      const statuses = ['Compliant', 'Non-Compliant', 'In Progress', 'Not Tested'];
      const weights = [0.6, 0.15, 0.2, 0.05]; // Higher probability for compliant
      const randomValue = Math.random();
      let cumulativeWeight = 0;
      let status = statuses[0];
      
      for (let i = 0; i < statuses.length; i++) {
        cumulativeWeight += weights[i];
        if (randomValue <= cumulativeWeight) {
          status = statuses[i];
          break;
        }
      }
      
      row[control] = {
        status,
        owner: `${dept.split(' ')[0]} Team`,
        lastTestDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        nextTestDate: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        evidence: `Evidence for ${control} in ${dept}`
      };
    });
    return row;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Compliant':
        return 'bg-success text-white';
      case 'Non-Compliant':
        return 'bg-error text-white';
      case 'In Progress':
        return 'bg-warning text-white';
      case 'Not Tested':
        return 'bg-secondary-300 text-text-secondary';
      default:
        return 'bg-secondary-100 text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Compliant':
        return 'CheckCircle';
      case 'Non-Compliant':
        return 'XCircle';
      case 'In Progress':
        return 'Clock';
      case 'Not Tested':
        return 'HelpCircle';
      default:
        return 'HelpCircle';
    }
  };

  const handleCellClick = (department, control, data) => {
    const controlData = {
      id: control,
      title: `${control} - ${department}`,
      description: `Control implementation for ${department} department`,
      owner: data.owner,
      department: department,
      status: data.status,
      riskLevel: data.status === 'Non-Compliant' ? 'High' : data.status === 'In Progress' ? 'Medium' : 'Low',
      lastTestDate: data.lastTestDate,
      nextTestDate: data.nextTestDate,
      testFrequency: 'Quarterly',
      requiredEvidence: [data.evidence],
      complianceFrameworks: ['SOX', 'ISO 27001'],
      implementationStatus: data.status === 'Compliant' ? 100 : data.status === 'In Progress' ? 65 : 0
    };
    onControlClick(controlData);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = matrixData.filter(row => {
    const matchesSearch = row.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || row.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-6">
      {/* Header and Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div>
          <h3 className="text-lg font-semibold text-text-dark-primary">
            Controls Matrix
          </h3>
          <p className="text-sm text-text-dark-secondary mt-1">
            Interactive grid showing control status across departments
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          {/* Search */}
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-dark-muted" />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-dark-surface border border-white/10 rounded-neumorphic text-sm text-text-dark-primary placeholder-text-dark-muted shadow-neumorphic-inset focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green nav-transition"
            />
          </div>
          
          {/* Department Filter */}
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 bg-dark-surface border border-white/10 rounded-neumorphic text-sm text-text-dark-primary shadow-neumorphic-inset focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green nav-transition"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Matrix Table */}
      <div className="overflow-x-auto neumorphic-card">
        <div className="table-dark">
          <table className="w-full">
            <thead>
              <tr>
                <th className="sticky left-0 bg-gradient-to-r from-dark-secondary to-dark-surface px-4 py-3 text-left border-r border-white/10">
                  <button
                    onClick={() => handleSort('department')}
                    className="flex items-center space-x-1 text-sm font-medium text-text-dark-secondary hover:text-neon-green nav-transition"
                  >
                    <span>Department</span>
                    <Icon 
                      name={sortConfig.key === 'department' && sortConfig.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                      size={14} 
                    />
                  </button>
                </th>
                {controls.map(control => (
                  <th key={control} className="px-3 py-3 text-center min-w-[100px]">
                    <span className="text-sm font-medium text-text-dark-secondary">
                      {control}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sortedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-white/5 nav-transition">
                  <td className="sticky left-0 bg-gradient-to-r from-dark-secondary to-dark-surface px-4 py-3 font-medium text-text-dark-primary border-r border-white/10">
                    {row.department}
                  </td>
                  {controls.map(control => {
                    const cellData = row[control];
                    return (
                      <td key={control} className="px-3 py-3 text-center">
                        <button
                          onClick={() => handleCellClick(row.department, control, cellData)}
                          className={`
                            w-8 h-8 rounded-full flex items-center justify-center nav-transition hover-scale
                            ${getStatusColor(cellData.status)}
                          `}
                          title={`${control} - ${cellData.status}
Click for details`}
                        >
                          <Icon 
                            name={getStatusIcon(cellData.status)} 
                            size={14} 
                          />
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center space-x-6">
        <span className="text-sm font-medium text-text-dark-secondary">Legend:</span>
        {[
          { status: 'Compliant', icon: 'CheckCircle' },
          { status: 'Non-Compliant', icon: 'XCircle' },
          { status: 'In Progress', icon: 'Clock' },
          { status: 'Not Tested', icon: 'HelpCircle' }
        ].map(item => (
          <div key={item.status} className="flex items-center space-x-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getStatusColor(item.status)}`}>
              <Icon name={item.icon} size={12} />
            </div>
            <span className="text-sm text-text-dark-secondary">{item.status}</span>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Controls', value: departments.length * controls.length },
          { label: 'Compliant', value: Math.round(departments.length * controls.length * 0.6) },
          { label: 'Non-Compliant', value: Math.round(departments.length * controls.length * 0.15) },
          { label: 'In Progress', value: Math.round(departments.length * controls.length * 0.2) }
        ].map(stat => (
          <div key={stat.label} className="neumorphic-card p-4 text-center">
            <div className="text-2xl font-bold text-text-dark-primary">{stat.value}</div>
            <div className="text-sm text-text-dark-secondary">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlsMatrix;