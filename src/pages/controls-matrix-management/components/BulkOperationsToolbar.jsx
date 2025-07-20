import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkOperationsToolbar = ({ selectedCount, onBulkOperation, onClearSelection }) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const bulkActions = [
    { 
      id: 'update-status', 
      label: 'Update Status', 
      icon: 'Edit', 
      color: 'accent',
      description: 'Change status for selected controls'
    },
    { 
      id: 'assign-owner', 
      label: 'Assign Owner', 
      icon: 'User', 
      color: 'success',
      description: 'Assign new owner to selected controls'
    },
    { 
      id: 'schedule-test', 
      label: 'Schedule Test', 
      icon: 'Calendar', 
      color: 'warning',
      description: 'Schedule testing for selected controls'
    },
    { 
      id: 'export-selected', 
      label: 'Export Selected', 
      icon: 'Download', 
      color: 'accent',
      description: 'Export selected controls to Excel'
    },
    { 
      id: 'bulk-delete', 
      label: 'Delete Selected', 
      icon: 'Trash2', 
      color: 'error',
      description: 'Remove selected controls (requires confirmation)'
    }
  ];

  const handleBulkAction = (actionId) => {
    onBulkOperation(actionId);
    setIsActionsOpen(false);
  };

  return (
    <div className="mb-6 neumorphic-card p-4 border border-neon-green border-opacity-30 shadow-glow-neon">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-green to-neon-purple flex items-center justify-center">
              <Icon name="CheckSquare" size={16} color="white" />
            </div>
            <span className="text-lg font-semibold text-text-dark-primary">
              {selectedCount} items selected
            </span>
          </div>
          <div className="text-sm text-text-dark-secondary">
            Ready for bulk operations
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Button
              variant="primary"
              icon="Edit"
              onClick={() => setIsActionsOpen(!isActionsOpen)}
              className="shadow-glow-neon"
            >
              Bulk Actions
              <Icon 
                name={isActionsOpen ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="ml-2"
              />
            </Button>

            {isActionsOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 neumorphic-card border border-white border-opacity-20 z-modal animate-fade-in">
                <div className="p-2">
                  <div className="text-xs text-text-dark-muted uppercase tracking-wider px-3 py-2">
                    Available Actions
                  </div>
                  {bulkActions.map(action => (
                    <button
                      key={action.id}
                      onClick={() => handleBulkAction(action.id)}
                      className="w-full flex items-center px-3 py-2 text-left hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors group"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        action.color === 'success' ? 'bg-success-dark bg-opacity-20' :
                        action.color === 'warning' ? 'bg-warning-dark bg-opacity-20' :
                        action.color === 'error'? 'bg-error-dark bg-opacity-20' : 'bg-neon-green bg-opacity-20'
                      }`}>
                        <Icon 
                          name={action.icon} 
                          size={16} 
                          className={`${
                            action.color === 'success' ? 'text-success-dark' :
                            action.color === 'warning' ? 'text-warning-dark' :
                            action.color === 'error'? 'text-error-dark' : 'text-neon-green'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-text-dark-primary group-hover:text-neon-green transition-colors">
                          {action.label}
                        </div>
                        <div className="text-xs text-text-dark-muted">
                          {action.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            icon="X"
            onClick={onClearSelection}
            className="text-text-dark-muted hover:text-text-dark-primary"
          >
            Clear Selection
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-xl font-bold text-success-dark">
            {Math.floor(selectedCount * 0.6)}
          </div>
          <div className="text-xs text-text-dark-secondary uppercase tracking-wider">
            Compliant
          </div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-warning-dark">
            {Math.floor(selectedCount * 0.25)}
          </div>
          <div className="text-xs text-text-dark-secondary uppercase tracking-wider">
            In Progress
          </div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-error-dark">
            {Math.floor(selectedCount * 0.15)}
          </div>
          <div className="text-xs text-text-dark-secondary uppercase tracking-wider">
            Non-Compliant
          </div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-neon-blue">
            {selectedCount}
          </div>
          <div className="text-xs text-text-dark-secondary uppercase tracking-wider">
            Total Selected
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      {isActionsOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setIsActionsOpen(false)}
        />
      )}
    </div>
  );
};

export default BulkOperationsToolbar;