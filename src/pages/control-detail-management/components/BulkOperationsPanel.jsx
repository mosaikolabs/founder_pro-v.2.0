// src/pages/control-detail-management/components/BulkOperationsPanel.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BulkOperationsPanel = ({ selectedControls, onBulkOperation, onClearSelection }) => {
  const [showOperations, setShowOperations] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState('');

  const operations = [
    {
      id: 'update_status',
      label: 'Update Status',
      icon: 'Edit',
      description: 'Change status for selected controls',
      color: 'primary'
    },
    {
      id: 'assign_owner',
      label: 'Assign Owner',
      icon: 'User',
      description: 'Assign new owner to selected controls',
      color: 'primary'
    },
    {
      id: 'schedule_tests',
      label: 'Schedule Tests',
      icon: 'Calendar',
      description: 'Schedule testing for selected controls',
      color: 'accent'
    },
    {
      id: 'export_data',
      label: 'Export Data',
      icon: 'Download',
      description: 'Export selected control data',
      color: 'secondary'
    },
    {
      id: 'bulk_approve',
      label: 'Bulk Approve',
      icon: 'CheckCircle',
      description: 'Approve changes for selected controls',
      color: 'success'
    },
    {
      id: 'archive',
      label: 'Archive',
      icon: 'Archive',
      description: 'Archive selected controls',
      color: 'warning'
    }
  ];

  const handleOperation = (operationId) => {
    onBulkOperation?.(operationId, selectedControls);
    setSelectedOperation('');
    setShowOperations(false);
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'text-primary hover:bg-primary-50';
      case 'accent':
        return 'text-accent hover:bg-accent-50';
      case 'success':
        return 'text-success hover:bg-success-50';
      case 'warning':
        return 'text-warning hover:bg-warning-50';
      case 'secondary':
        return 'text-text-secondary hover:bg-secondary-50';
      default:
        return 'text-primary hover:bg-primary-50';
    }
  };

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-primary">
              {selectedControls.length} control{selectedControls.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <div className="h-4 w-px bg-primary-200" />
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowOperations(!showOperations)}
              className="inline-flex items-center space-x-2 px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition"
            >
              <Icon name="Settings" size={16} />
              <span>Bulk Operations</span>
              <Icon name={showOperations ? 'ChevronUp' : 'ChevronDown'} size={16} />
            </button>
            
            <button
              onClick={onClearSelection}
              className="inline-flex items-center space-x-2 px-3 py-1 border border-primary-300 text-primary bg-white rounded-lg hover:bg-primary-50 nav-transition"
            >
              <Icon name="X" size={16} />
              <span>Clear Selection</span>
            </button>
          </div>
        </div>
        
        <div className="text-sm text-primary">
          Select operation to apply to all selected controls
        </div>
      </div>
      
      {/* Operations Grid */}
      {showOperations && (
        <div className="mt-4 pt-4 border-t border-primary-200">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {operations.map(operation => (
              <button
                key={operation.id}
                onClick={() => handleOperation(operation.id)}
                className={`
                  p-3 border border-border rounded-lg bg-white nav-transition text-left
                  hover:shadow-sm ${getColorClasses(operation.color)}
                `}
                title={operation.description}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon name={operation.icon} size={20} />
                  <span className="text-xs font-medium text-center">
                    {operation.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-3 p-3 bg-secondary-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-accent mt-0.5 flex-shrink-0" />
              <div className="text-sm text-text-secondary">
                <p className="font-medium mb-1">Bulk Operation Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Use Ctrl+A to select all visible controls</li>
                  <li>Hold Shift to select multiple consecutive controls</li>
                  <li>Operations will be applied to all selected controls simultaneously</li>
                  <li>Some operations may require additional confirmation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkOperationsPanel;