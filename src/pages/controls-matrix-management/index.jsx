import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import ControlDetailDrawer from '../../components/ui/ControlDetailDrawer';
import Icon from '../../components/AppIcon';
import MatrixGrid from './components/MatrixGrid';
import FilterSidebar from './components/FilterSidebar';
import BulkOperationsToolbar from './components/BulkOperationsToolbar';

const ControlsMatrixManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isControlDetailOpen, setIsControlDetailOpen] = useState(false);
  const [selectedControl, setSelectedControl] = useState(null);
  const [selectedCells, setSelectedCells] = useState([]);
  const [filters, setFilters] = useState({
    departments: [],
    frameworks: [],
    status: [],
    savedView: null
  });

  // Mock data for departments and controls
  const departments = [
    { id: 'IT', name: 'Information Technology', head: 'John Smith' },
    { id: 'HR', name: 'Human Resources', head: 'Sarah Johnson' },
    { id: 'FIN', name: 'Finance', head: 'Michael Brown' },
    { id: 'OPS', name: 'Operations', head: 'Lisa Davis' },
    { id: 'LEGAL', name: 'Legal', head: 'Robert Wilson' },
    { id: 'SALES', name: 'Sales', head: 'Emily Chen' },
    { id: 'MKT', name: 'Marketing', head: 'David Rodriguez' },
    { id: 'PROC', name: 'Procurement', head: 'Jennifer Taylor' }
  ];

  const controls = [
    { id: 'AC-001', name: 'Access Control', framework: 'SOX', category: 'Security' },
    { id: 'AC-002', name: 'User Authentication', framework: 'ISO 27001', category: 'Security' },
    { id: 'DC-001', name: 'Data Classification', framework: 'GDPR', category: 'Data' },
    { id: 'BC-001', name: 'Business Continuity', framework: 'NIST', category: 'Operations' },
    { id: 'RM-001', name: 'Risk Management', framework: 'COSO', category: 'Risk' },
    { id: 'CM-001', name: 'Change Management', framework: 'ITIL', category: 'Process' },
    { id: 'IA-001', name: 'Incident Response', framework: 'ISO 27001', category: 'Security' },
    { id: 'DG-001', name: 'Data Governance', framework: 'GDPR', category: 'Data' }
  ];

  // Mock matrix data with status
  const matrixData = {};
  departments.forEach(dept => {
    matrixData[dept.id] = {};
    controls.forEach(control => {
      const statuses = ['Compliant', 'Non-Compliant', 'In Progress', 'Not Tested', 'Overdue'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      const lastTestDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
      
      matrixData[dept.id][control.id] = {
        status: randomStatus,
        owner: dept.head,
        lastTestDate: lastTestDate.toISOString().split('T')[0],
        nextTestDate: new Date(lastTestDate.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        evidence: Math.random() > 0.3,
        isEditing: false
      };
    });
  });

  const handleCellClick = (departmentId, controlId) => {
    const controlData = {
      id: controlId,
      title: controls.find(c => c.id === controlId)?.name || 'Unknown Control',
      department: departments.find(d => d.id === departmentId)?.name || 'Unknown Department',
      ...matrixData[departmentId][controlId]
    };
    setSelectedControl(controlData);
    setIsControlDetailOpen(true);
  };

  const handleCellSelect = (departmentId, controlId, isSelected) => {
    const cellKey = `${departmentId}-${controlId}`;
    if (isSelected) {
      setSelectedCells(prev => [...prev, cellKey]);
    } else {
      setSelectedCells(prev => prev.filter(key => key !== cellKey));
    }
  };

  const handleBulkOperation = (operation) => {
    console.log(`Performing ${operation} on ${selectedCells.length} cells`);
    // Implement bulk operations logic here
    setSelectedCells([]);
  };

  const handleExport = () => {
    console.log('Exporting matrix data to Excel');
    // Implement export functionality
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Compliant':
        return 'bg-success-dark bg-opacity-20 text-success-dark border-success-dark border-opacity-50';
      case 'Non-Compliant':
        return 'bg-error-dark bg-opacity-20 text-error-dark border-error-dark border-opacity-50';
      case 'In Progress':
        return 'bg-warning-dark bg-opacity-20 text-warning-dark border-warning-dark border-opacity-50';
      case 'Overdue':
        return 'bg-error-dark bg-opacity-20 text-error-dark border-error-dark border-opacity-50';
      default:
        return 'bg-dark-elevated bg-opacity-50 text-text-dark-secondary border-white border-opacity-20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark dark-theme flex flex-col">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className={`
        flex-1 transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'lg:ml-sidebar' : 'lg:ml-sidebar'}
        overflow-hidden
      `}>
        <div className="h-full flex flex-col">
          {/* Header Section - Fixed Height */}
          <div className="flex-shrink-0 p-4 lg:p-6 border-b border-white border-opacity-10">
            <Breadcrumbs />
            
            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl lg:text-3xl font-semibold text-text-dark-primary mb-2 truncate">
                  Controls Matrix Management
                </h1>
                <p className="text-text-dark-secondary">
                  Monitor and manage compliance controls across all departments
                </p>
              </div>
              
              <div className="flex items-center space-x-3 mt-4 lg:mt-0 flex-shrink-0">
                <button
                  onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
                  className={`
                    px-4 py-2 rounded-xl font-medium nav-transition inline-flex items-center space-x-2 neumorphic-button
                    ${isFilterSidebarOpen 
                      ? 'bg-gradient-to-r from-neon-green to-neon-purple text-white shadow-glow-neon' 
                      : 'text-text-dark-secondary hover:text-text-dark-primary'
                    }
                  `}
                >
                  <Icon name="Filter" size={18} />
                  <span>Filters</span>
                </button>
                
                <button
                  onClick={handleExport}
                  className="btn-secondary-dark inline-flex items-center space-x-2 whitespace-nowrap"
                >
                  <Icon name="Download" size={18} />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Bulk Operations Toolbar */}
            {selectedCells.length > 0 && (
              <BulkOperationsToolbar
                selectedCount={selectedCells.length}
                onBulkOperation={handleBulkOperation}
                onClearSelection={() => setSelectedCells([])}
              />
            )}
          </div>

          {/* Main Content Area - Flexible Height */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            {/* Filter Sidebar */}
            <div className={`
              transition-all duration-300 ease-in-out flex-shrink-0
              ${isFilterSidebarOpen ? 'w-80' : 'w-0'}
              overflow-hidden
            `}>
              <FilterSidebar
                isOpen={isFilterSidebarOpen}
                filters={filters}
                onFiltersChange={setFilters}
                departments={departments}
                controls={controls}
              />
            </div>

            {/* Matrix Grid Container */}
            <div className="flex-1 min-w-0 p-4 lg:p-6">
              <div className="h-full neumorphic-card overflow-hidden flex flex-col">
                <div className="flex-1 min-h-0">
                  <MatrixGrid
                    departments={departments}
                    controls={controls}
                    matrixData={matrixData}
                    selectedCells={selectedCells}
                    onCellClick={handleCellClick}
                    onCellSelect={handleCellSelect}
                    getStatusColor={getStatusColor}
                    filters={filters}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Control Detail Drawer */}
      <ControlDetailDrawer
        isOpen={isControlDetailOpen}
        onClose={() => setIsControlDetailOpen(false)}
        controlData={selectedControl}
      />
    </div>
  );
};

export default ControlsMatrixManagement;