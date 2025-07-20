import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const MatrixGrid = ({ 
  departments, 
  controls, 
  matrixData, 
  selectedCells, 
  onCellClick, 
  onCellSelect, 
  getStatusColor, 
  filters 
}) => {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter departments and controls based on filters
  const filteredDepartments = departments.filter(dept => 
    filters.departments.length === 0 || filters.departments.includes(dept.id)
  );

  const filteredControls = controls.filter(control => 
    (filters.frameworks.length === 0 || filters.frameworks.includes(control.framework)) &&
    (filters.status.length === 0 || filters.status.includes(matrixData[departments[0]?.id]?.[control.id]?.status))
  );

  const getCellData = (departmentId, controlId) => {
    return matrixData[departmentId]?.[controlId] || {};
  };

  const isCellSelected = (departmentId, controlId) => {
    return selectedCells.includes(`${departmentId}-${controlId}`);
  };

  const handleCellClick = (departmentId, controlId, event) => {
    event.preventDefault();
    if (event.ctrlKey || event.metaKey) {
      // Multi-select with Ctrl/Cmd
      const isSelected = isCellSelected(departmentId, controlId);
      onCellSelect(departmentId, controlId, !isSelected);
    } else {
      // Single select
      onCellClick(departmentId, controlId);
    }
  };

  const renderStatusIndicator = (status) => {
    const statusIcons = {
      'Compliant': 'CheckCircle',
      'Non-Compliant': 'XCircle',
      'In Progress': 'Clock',
      'Not Tested': 'Circle',
      'Overdue': 'AlertTriangle'
    };
    
    return (
      <Icon 
        name={statusIcons[status] || 'Circle'} 
        size={14} 
        className="mr-1 flex-shrink-0" 
      />
    );
  };

  const renderCell = (department, control) => {
    const cellData = getCellData(department.id, control.id);
    const isSelected = isCellSelected(department.id, control.id);
    const isHovered = hoveredCell === `${department.id}-${control.id}`;
    const statusColor = getStatusColor(cellData.status);

    return (
      <td
        key={`${department.id}-${control.id}`}
        className={`
          relative border border-white border-opacity-10 p-2 cursor-pointer transition-all duration-200
          ${isSelected ? 'bg-neon-green bg-opacity-20 border-neon-green' : 'hover:bg-white hover:bg-opacity-5'}
          ${isHovered ? 'shadow-lg transform scale-105' : ''}
          min-w-[120px] max-w-[120px]
        `}
        onClick={(e) => handleCellClick(department.id, control.id, e)}
        onMouseEnter={() => setHoveredCell(`${department.id}-${control.id}`)}
        onMouseLeave={() => setHoveredCell(null)}
      >
        <div className="flex items-center justify-center min-h-[3rem] h-full">
          <div className={`
            px-2 py-1 rounded-lg border text-xs font-medium flex items-center
            ${statusColor}
            ${isSelected ? 'ring-2 ring-neon-green ring-opacity-50' : ''}
            max-w-full
          `}>
            {renderStatusIndicator(cellData.status)}
            <span className="truncate max-w-[60px]">
              {cellData.status || 'Unknown'}
            </span>
          </div>
        </div>
        
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute z-10 top-full left-1/2 transform -translate-x-1/2 mt-2 p-3 neumorphic-card border border-white border-opacity-20 text-xs whitespace-nowrap max-w-xs">
            <div className="text-text-dark-primary font-semibold truncate">{control.name}</div>
            <div className="text-text-dark-secondary truncate">{department.name}</div>
            <div className="text-text-dark-muted mt-1">
              Status: <span className="font-medium">{cellData.status}</span>
            </div>
            <div className="text-text-dark-muted truncate">
              Owner: <span className="font-medium">{cellData.owner}</span>
            </div>
            <div className="text-text-dark-muted">
              Last Test: <span className="font-medium">{cellData.lastTestDate}</span>
            </div>
          </div>
        )}
      </td>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Table Container with Proper Scrolling */}
      <div className="flex-1 min-h-0 overflow-auto scrollbar-dark">
        <table className="w-full table-dark min-w-max">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-gradient-to-r from-dark-secondary to-dark-surface text-left min-w-[200px] max-w-[200px] p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Building" size={16} />
                  <span>Department</span>
                </div>
              </th>
              {filteredControls.map(control => (
                <th 
                  key={control.id}
                  className="text-center min-w-[120px] max-w-[120px] bg-gradient-to-r from-dark-secondary to-dark-surface p-4"
                >
                  <div className="flex flex-col items-center space-y-1">
                    <div className="text-xs font-bold text-text-dark-primary">
                      {control.id}
                    </div>
                    <div className="text-xs text-text-dark-secondary truncate max-w-[100px]" title={control.name}>
                      {control.name}
                    </div>
                    <div className="text-xs text-neon-green font-medium">
                      {control.framework}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredDepartments.map(department => (
              <tr key={department.id} className="hover:bg-white hover:bg-opacity-5 transition-colors">
                <td className="sticky left-0 z-10 bg-gradient-to-r from-dark-surface to-dark-elevated border-r border-white border-opacity-10 p-4 min-w-[200px] max-w-[200px]">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-green to-neon-purple flex items-center justify-center flex-shrink-0">
                      <Icon name="Building" size={16} color="white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-text-dark-primary truncate" title={department.name}>
                        {department.name}
                      </div>
                      <div className="text-xs text-text-dark-secondary truncate" title={department.head}>
                        {department.head}
                      </div>
                    </div>
                  </div>
                </td>
                {filteredControls.map(control => renderCell(department, control))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Empty State */}
      {filteredDepartments.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center py-12">
          <Icon name="Search" size={48} className="text-text-dark-muted mb-4" />
          <h3 className="text-lg font-medium text-text-dark-primary mb-2">
            No departments found
          </h3>
          <p className="text-text-dark-secondary text-center max-w-md">
            Try adjusting your filters to see more results
          </p>
        </div>
      )}
    </div>
  );
};

export default MatrixGrid;