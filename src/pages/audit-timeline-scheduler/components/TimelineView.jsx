import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TimelineView = ({
  audits = [],
  viewType,
  timeRange,
  onAuditSelect,
  onBulkSelect,
  selectedAudits = [],
  getStatusColor,
  getPriorityColor
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const timelineRef = useRef(null);

  // Generate timeline months based on time range
  const generateTimelineMonths = () => {
    const months = [];
    const startDate = new Date();
    startDate.setDate(1); // Start from first day of current month
    
    const monthCount = timeRange === '6-months' ? 6 : 
                      timeRange === '12-months' ? 12 : 
                      timeRange === '18-months' ? 18 : 24;

    for (let i = 0; i < monthCount; i++) {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);
      months.push({
        date: date,
        label: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        fullLabel: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      });
    }
    return months;
  };

  const timelineMonths = generateTimelineMonths();

  // Group audits by the selected view type
  const groupAudits = () => {
    const groups = {};
    
    // Add null check and use optional chaining
    if (!audits || !Array.isArray(audits)) {
      return groups;
    }
    
    audits.forEach(audit => {
      let groupKey;
      switch (viewType) {
        case 'department':
          groupKey = audit?.department || 'Unassigned';
          break;
        case 'audit-type':
          groupKey = audit?.auditType || 'Unassigned';
          break;
        case 'framework':
          groupKey = audit?.framework || 'Unassigned';
          break;
        default:
          groupKey = audit?.department || 'Unassigned';
      }
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(audit);
    });
    
    return groups;
  };

  const groupedAudits = groupAudits();

  // Calculate audit position and width on timeline
  const getAuditPosition = (audit) => {
    const startDate = new Date(audit?.startDate || new Date());
    const endDate = new Date(audit?.endDate || new Date());
    const timelineStart = timelineMonths[0]?.date || new Date();
    const timelineEnd = new Date(timelineMonths[timelineMonths.length - 1]?.date || new Date());
    timelineEnd.setMonth(timelineEnd.getMonth() + 1);

    const totalDays = (timelineEnd - timelineStart) / (1000 * 60 * 60 * 24);
    const startOffset = (startDate - timelineStart) / (1000 * 60 * 60 * 24);
    const duration = (endDate - startDate) / (1000 * 60 * 60 * 24);

    const leftPercent = (startOffset / totalDays) * 100;
    const widthPercent = (duration / totalDays) * 100;

    return {
      left: `${Math.max(0, leftPercent)}%`,
      width: `${Math.min(100 - Math.max(0, leftPercent), widthPercent)}%`
    };
  };

  const handleAuditClick = (audit, event) => {
    event.stopPropagation();
    if (event.ctrlKey || event.metaKey) {
      // Multi-select with Ctrl/Cmd
      const newSelected = selectedItems.includes(audit?.id)
        ? selectedItems.filter(id => id !== audit?.id)
        : [...selectedItems, audit?.id];
      setSelectedItems(newSelected);
      onBulkSelect?.(newSelected);
    } else {
      onAuditSelect?.(audit);
    }
  };

  const handleSelectAll = (groupAudits) => {
    const groupIds = groupAudits?.map(audit => audit?.id).filter(Boolean) || [];
    const allSelected = groupIds.every(id => selectedItems.includes(id));
    
    let newSelected;
    if (allSelected) {
      newSelected = selectedItems.filter(id => !groupIds.includes(id));
    } else {
      newSelected = [...new Set([...selectedItems, ...groupIds])];
    }
    
    setSelectedItems(newSelected);
    onBulkSelect?.(newSelected);
  };

  useEffect(() => {
    setSelectedItems(selectedAudits || []);
  }, [selectedAudits]);

  return (
    <div className="neumorphic-card overflow-hidden">
      {/* Timeline Header */}
      <div className="border-b border-white border-opacity-10 bg-dark-elevated bg-opacity-30">
        <div className="flex min-w-0">
          {/* Group Label Column */}
          <div className="w-32 sm:w-40 lg:w-48 flex-shrink-0 p-3 sm:p-4 border-r border-white border-opacity-10 bg-dark-surface bg-opacity-30">
            <h3 className="text-xs sm:text-sm font-medium text-text-dark-primary capitalize truncate">
              {viewType?.replace('-', ' ') || 'Group'}
            </h3>
          </div>
          
          {/* Timeline Months */}
          <div className="flex-1 min-w-0">
            <div className="overflow-x-auto scrollbar-dark" ref={timelineRef}>
              <div className="flex" style={{ minWidth: `${timelineMonths?.length * 100}px` }}>
                {timelineMonths?.map((month, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-20 sm:w-24 lg:w-28 p-2 sm:p-3 lg:p-4 border-r border-white border-opacity-10 text-center"
                  >
                    <div className="text-xs font-medium text-text-dark-primary truncate">
                      {month?.label || ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Body */}
      <div className="max-h-96 overflow-y-auto scrollbar-dark">
        {Object.entries(groupedAudits).map(([groupName, groupAudits]) => (
          <div key={groupName} className="border-b border-white border-opacity-10">
            <div className="flex min-w-0">
              {/* Group Row */}
              <div className="w-32 sm:w-40 lg:w-48 flex-shrink-0 p-3 sm:p-4 border-r border-white border-opacity-10 bg-dark-surface bg-opacity-30">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-medium text-text-dark-primary truncate">
                      {groupName}
                    </h4>
                    <p className="text-xs text-text-dark-secondary">
                      {groupAudits?.length || 0} audit{groupAudits?.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSelectAll(groupAudits)}
                    className="p-1 rounded text-text-dark-muted hover:text-neon-green hover:bg-dark-elevated hover:bg-opacity-30 transition-colors flex-shrink-0"
                    title="Select all audits in this group"
                  >
                    <Icon name="CheckSquare" size={14} />
                  </button>
                </div>
              </div>

              {/* Timeline Content */}
              <div className="flex-1 min-w-0">
                <div className="overflow-x-auto scrollbar-dark">
                  <div className="relative min-h-16 p-2" style={{ minWidth: `${timelineMonths?.length * 100}px` }}>
                    {/* Month Grid Lines */}
                    {timelineMonths?.map((_, index) => (
                      <div
                        key={index}
                        className="absolute top-0 bottom-0 border-r border-white border-opacity-10"
                        style={{ left: `${(index / timelineMonths.length) * 100}%` }}
                      />
                    ))}

                    {/* Audit Bars */}
                    {groupAudits?.map((audit, auditIndex) => {
                      const position = getAuditPosition(audit);
                      const isSelected = selectedItems.includes(audit?.id);
                      
                      return (
                        <div
                          key={audit?.id || auditIndex}
                          className={`
                            absolute h-6 sm:h-8 rounded-lg cursor-pointer border-2 transition-all duration-200
                            ${isSelected 
                              ? 'border-neon-green bg-neon-green bg-opacity-20 shadow-glow-neon' 
                              : 'border-transparent hover:border-neon-green hover:bg-neon-green hover:bg-opacity-10'
                            }
                          `}
                          style={{
                            ...position,
                            top: `${auditIndex * 32 + 4}px`,
                            backgroundColor: isSelected ? undefined : 
                              audit?.status === 'Completed' ? 'rgba(34, 197, 94, 0.2)' :
                              audit?.status === 'In Progress' ? 'rgba(245, 158, 11, 0.2)' :
                              audit?.status === 'Scheduled' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(71, 85, 105, 0.2)'
                          }}
                          onClick={(e) => handleAuditClick(audit, e)}
                          title={`${audit?.title || 'Untitled'} (${audit?.startDate || ''} - ${audit?.endDate || ''})`}
                        >
                          <div className="flex items-center h-full px-1 sm:px-2 space-x-1 sm:space-x-2 min-w-0">
                            {/* Priority Indicator */}
                            <div className={`
                              w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full flex-shrink-0
                              ${audit?.priority === 'High' ? 'bg-error-dark' :
                                audit?.priority === 'Medium' ? 'bg-warning-dark' : 'bg-success-dark'}
                            `} />
                            
                            {/* Audit Title */}
                            <span className="text-xs font-medium text-text-dark-primary truncate flex-1 min-w-0">
                              {audit?.title || 'Untitled'}
                            </span>
                            
                            {/* Status Badge - Hidden on very small screens */}
                            <span className={`
                              hidden sm:inline-flex px-1 py-0.5 rounded text-xs font-medium flex-shrink-0
                              ${audit?.status === 'Completed' ? 'bg-success-dark bg-opacity-20 text-success-dark' :
                                audit?.status === 'In Progress' ? 'bg-warning-dark bg-opacity-20 text-warning-dark' :
                                audit?.status === 'Scheduled'? 'bg-neon-blue bg-opacity-20 text-neon-blue' : 'bg-dark-elevated bg-opacity-50 text-text-dark-secondary'}
                            `}>
                              {audit?.status || 'Unknown'}
                            </span>
                          </div>

                          {/* Progress Bar for In Progress audits */}
                          {audit?.status === 'In Progress' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-dark-elevated bg-opacity-50 rounded-b-lg">
                              <div
                                className="h-full bg-neon-green rounded-b-lg transition-all duration-300"
                                style={{ width: `${audit?.preparationStatus || 0}%` }}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline Legend */}
      <div className="border-t border-white border-opacity-10 p-3 sm:p-4 bg-dark-elevated bg-opacity-30">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-error-dark rounded-full" />
            <span className="text-text-dark-secondary truncate">High Priority</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-warning-dark rounded-full" />
            <span className="text-text-dark-secondary truncate">Medium Priority</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-success-dark rounded-full" />
            <span className="text-text-dark-secondary truncate">Low Priority</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-2 sm:w-8 sm:h-3 bg-success-dark bg-opacity-20 border border-success-dark rounded" />
            <span className="text-text-dark-secondary truncate">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-2 sm:w-8 sm:h-3 bg-warning-dark bg-opacity-20 border border-warning-dark rounded" />
            <span className="text-text-dark-secondary truncate">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-2 sm:w-8 sm:h-3 bg-neon-blue bg-opacity-20 border border-neon-blue rounded" />
            <span className="text-text-dark-secondary truncate">Scheduled</span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {Object.keys(groupedAudits).length === 0 && (
        <div className="p-8 sm:p-12 text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-dark-elevated bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={20} className="text-text-dark-muted" />
          </div>
          <h3 className="text-base sm:text-lg font-medium text-text-dark-primary mb-2">
            No audits found
          </h3>
          <p className="text-sm sm:text-base text-text-dark-secondary">
            Try adjusting your filters or create a new audit to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default TimelineView;