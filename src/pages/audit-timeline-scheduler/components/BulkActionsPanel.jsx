import React from 'react';
import Icon from '../../../components/AppIcon';

const BulkActionsPanel = ({ selectedCount, onClearSelection }) => {
  const handleBulkReschedule = () => {
    console.log('Bulk reschedule selected audits');
    // Implementation for bulk rescheduling
  };

  const handleBulkExport = () => {
    console.log('Bulk export selected audits');
    // Implementation for bulk export
  };

  const handleBulkStatusUpdate = () => {
    console.log('Bulk status update selected audits');
    // Implementation for bulk status update
  };

  const handleBulkAssign = () => {
    console.log('Bulk assign selected audits');
    // Implementation for bulk team assignment
  };

  return (
    <div className="neumorphic-card p-3 sm:p-4 mb-4 lg:mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Selection Info */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-neon-green" />
            <span className="text-sm font-medium text-text-dark-primary">
              {selectedCount} audit{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>
          <button
            onClick={onClearSelection}
            className="text-sm text-text-dark-secondary hover:text-text-dark-primary nav-transition"
          >
            Clear selection
          </button>
        </div>

        {/* Bulk Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleBulkReschedule}
            className="flex items-center space-x-2 px-3 py-2 bg-dark-surface border border-white border-opacity-10 rounded-lg text-sm font-medium text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated hover:bg-opacity-30 nav-transition"
          >
            <Icon name="Calendar" size={16} />
            <span className="hidden sm:inline">Reschedule</span>
          </button>

          <button
            onClick={handleBulkStatusUpdate}
            className="flex items-center space-x-2 px-3 py-2 bg-dark-surface border border-white border-opacity-10 rounded-lg text-sm font-medium text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated hover:bg-opacity-30 nav-transition"
          >
            <Icon name="Edit" size={16} />
            <span className="hidden sm:inline">Update Status</span>
          </button>

          <button
            onClick={handleBulkAssign}
            className="flex items-center space-x-2 px-3 py-2 bg-dark-surface border border-white border-opacity-10 rounded-lg text-sm font-medium text-text-dark-secondary hover:text-text-dark-primary hover:bg-dark-elevated hover:bg-opacity-30 nav-transition"
          >
            <Icon name="Users" size={16} />
            <span className="hidden sm:inline">Assign Team</span>
          </button>

          <button
            onClick={handleBulkExport}
            className="flex items-center space-x-2 px-3 py-2 bg-gradient-accent text-white rounded-lg text-sm font-medium hover:opacity-90 nav-transition"
          >
            <Icon name="Download" size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsPanel;