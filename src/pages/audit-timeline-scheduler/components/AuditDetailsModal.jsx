import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AuditDetailsModal = ({ 
  isOpen, 
  onClose, 
  audit,
  getStatusColor,
  getPriorityColor 
}) => {
  
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !audit) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilStart = () => {
    const startDate = new Date(audit.startDate);
    const today = new Date();
    const diffTime = startDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilStart = getDaysUntilStart();

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-modal"
        onClick={onClose}
      />

      {/* Modal - Positioned relative to parent with max-height and overflow */}
      <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
        <div
          className="bg-surface rounded-lg shadow-large max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                {audit.title}
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                {audit.id} • {audit.department}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-secondary-50 nav-transition"
              aria-label="Close audit details"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Status and Priority */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-text-secondary">Status:</span>
                <span className={`
                  inline-flex px-2 py-1 rounded-full text-xs font-medium
                  ${getStatusColor(audit.status)}
                `}>
                  {audit.status}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-text-secondary">Priority:</span>
                <span className={`
                  inline-flex px-2 py-1 rounded-full text-xs font-medium
                  ${getPriorityColor(audit.priority)}
                `}>
                  {audit.priority}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-text-secondary">Framework:</span>
                <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-accent-50 text-accent-700">
                  {audit.framework}
                </span>
              </div>
            </div>

            {/* Timeline Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">
                  Start Date
                </label>
                <p className="text-text-primary font-data">
                  {formatDate(audit.startDate)}
                </p>
                {daysUntilStart > 0 && (
                  <p className="text-xs text-text-secondary">
                    Starts in {daysUntilStart} days
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">
                  End Date
                </label>
                <p className="text-text-primary font-data">
                  {formatDate(audit.endDate)}
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-text-primary mb-3">
                Description
              </h3>
              <p className="text-text-primary leading-relaxed">
                {audit.description}
              </p>
            </div>

            {/* Assigned Team */}
            <div>
              <h3 className="text-lg font-medium text-text-primary mb-3">
                Assigned Team
              </h3>
              <div className="flex flex-wrap gap-2">
                {audit.assignedTeam.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-secondary-50 rounded-lg px-3 py-2"
                  >
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} color="white" />
                    </div>
                    <span className="text-sm text-text-primary">{member}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation Status */}
            {audit.status === 'In Progress' && (
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  Preparation Status
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Progress</span>
                    <span className="text-sm font-data text-text-primary">
                      {audit.preparationStatus}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary-100 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${audit.preparationStatus}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Milestones */}
            <div>
              <h3 className="text-lg font-medium text-text-primary mb-3">
                Milestones
              </h3>
              <div className="space-y-3">
                {audit.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`
                      w-3 h-3 rounded-full flex-shrink-0
                      ${milestone.status === 'Completed' ? 'bg-success' :
                        milestone.status === 'In Progress' ? 'bg-warning' : 'bg-secondary-300'}
                    `} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`
                          text-sm font-medium
                          ${milestone.status === 'Completed' ? 'text-text-primary' : 'text-text-secondary'}
                        `}>
                          {milestone.name}
                        </span>
                        <span className="text-xs text-text-secondary font-data">
                          {formatDate(milestone.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dependencies */}
            {audit.dependencies.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  Dependencies
                </h3>
                <div className="space-y-2">
                  {audit.dependencies.map((depId, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm text-text-secondary"
                    >
                      <Icon name="ArrowRight" size={16} />
                      <span>Depends on audit {depId}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t border-border p-6 flex-shrink-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 nav-transition">
                Edit Audit
              </button>
              <button className="flex-1 border border-border text-text-secondary px-4 py-2 rounded-lg font-medium hover:text-text-primary hover:bg-secondary-50 nav-transition">
                Reschedule
              </button>
              <button className="px-4 py-2 border border-border text-text-secondary rounded-lg font-medium hover:text-text-primary hover:bg-secondary-50 nav-transition">
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuditDetailsModal;