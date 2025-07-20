import React from 'react';
import Icon from '../../../components/AppIcon';

const BulkOperationsBar = ({ 
  selectedCount, 
  onSelectAll, 
  onClearSelection, 
  onExport 
}) => {
  const handleBulkApproval = () => {
    console.log('Bulk approval for', selectedCount, 'policies');
    // Bulk approval functionality would be implemented here
  };

  const handleBulkArchive = () => {
    console.log('Bulk archive for', selectedCount, 'policies');
    // Bulk archive functionality would be implemented here
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedCount} policies?`)) {
      console.log('Bulk delete for', selectedCount, 'policies');
      // Bulk delete functionality would be implemented here
    }
  };

  return (
    <div className="bg-primary text-white rounded-lg p-4 mb-6 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} />
            <span className="font-medium">
              {selectedCount} {selectedCount === 1 ? 'policy' : 'policies'} selected
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={onSelectAll}
              className="text-sm text-primary-100 hover:text-white nav-transition"
            >
              Select All
            </button>
            <span className="text-primary-200">•</span>
            <button
              onClick={onClearSelection}
              className="text-sm text-primary-100 hover:text-white nav-transition"
            >
              Clear Selection
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onExport}
            className="px-3 py-1.5 bg-white bg-opacity-20 text-white rounded-md text-sm font-medium hover:bg-opacity-30 nav-transition inline-flex items-center space-x-1"
          >
            <Icon name="Download" size={14} />
            <span>Export</span>
          </button>
          
          <button
            onClick={handleBulkApproval}
            className="px-3 py-1.5 bg-white bg-opacity-20 text-white rounded-md text-sm font-medium hover:bg-opacity-30 nav-transition inline-flex items-center space-x-1"
          >
            <Icon name="CheckCircle2" size={14} />
            <span>Approve</span>
          </button>
          
          <button
            onClick={handleBulkArchive}
            className="px-3 py-1.5 bg-white bg-opacity-20 text-white rounded-md text-sm font-medium hover:bg-opacity-30 nav-transition inline-flex items-center space-x-1"
          >
            <Icon name="Archive" size={14} />
            <span>Archive</span>
          </button>
          
          <button
            onClick={handleBulkDelete}
            className="px-3 py-1.5 bg-error bg-opacity-90 text-white rounded-md text-sm font-medium hover:bg-opacity-100 nav-transition inline-flex items-center space-x-1"
          >
            <Icon name="Trash2" size={14} />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkOperationsBar;