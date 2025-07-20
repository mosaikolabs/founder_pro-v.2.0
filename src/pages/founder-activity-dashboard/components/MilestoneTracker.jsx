import React from 'react';
        import Icon from '../../../components/AppIcon';

        const MilestoneTracker = ({ milestones = [] }) => {
          const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
          };

          const getDaysUntilTarget = (targetDate) => {
            const today = new Date();
            const target = new Date(targetDate);
            const diffTime = target - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
          };

          const getStatusColor = (status, progress, daysUntil) => {
            if (status === 'completed') return 'neon-green';
            if (daysUntil < 0) return 'error-dark';
            if (daysUntil <= 7 && progress < 80) return 'warning-dark';
            if (progress >= 80) return 'neon-green';
            if (progress >= 50) return 'neon-purple';
            return 'text-dark-muted';
          };

          const getStatusIcon = (status, progress, daysUntil) => {
            if (status === 'completed') return 'CheckCircle';
            if (daysUntil < 0) return 'AlertTriangle';
            if (daysUntil <= 7 && progress < 80) return 'Clock';
            return 'Target';
          };

          const getUrgencyLabel = (status, daysUntil, progress) => {
            if (status === 'completed') return 'Completed';
            if (daysUntil < 0) return 'Overdue';
            if (daysUntil <= 7 && progress < 80) return 'At Risk';
            if (daysUntil <= 30) return 'Due Soon';
            return 'On Track';
          };

          return (
            <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-text-dark-primary flex items-center">
                  <Icon name="Flag" size={24} className="mr-3 text-neon-green" />
                  Milestone Tracker
                </h3>
                <div className="flex items-center space-x-4 text-sm text-text-dark-secondary">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-neon-green"></div>
                    <span>On Track</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-warning-dark"></div>
                    <span>At Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-error-dark"></div>
                    <span>Overdue</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {milestones.map((milestone) => {
                  const daysUntil = getDaysUntilTarget(milestone.targetDate);
                  const statusColor = getStatusColor(milestone.status, milestone.progress, daysUntil);
                  const statusIcon = getStatusIcon(milestone.status, milestone.progress, daysUntil);
                  const urgencyLabel = getUrgencyLabel(milestone.status, daysUntil, milestone.progress);

                  return (
                    <div 
                      key={milestone.id} 
                      className="bg-dark-primary rounded-neumorphic p-6 shadow-neumorphic-subtle border border-slate-700 hover:shadow-neumorphic-hover transition-all duration-300 group hover:scale-[1.02]"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className={`
                            p-3 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110
                            ${milestone.progress >= 80 ? 'bg-gradient-to-r from-neon-green to-emerald-400' :
                              milestone.progress >= 50 ? 'bg-gradient-to-r from-neon-purple to-purple-400' :
                              daysUntil < 0 ? 'bg-gradient-to-r from-error-dark to-red-400': 'bg-gradient-to-r from-dark-surface to-dark-elevated'
                            }
                          `}>
                            <Icon name={statusIcon} size={20} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-text-dark-primary group-hover:text-neon-green transition-colors duration-300 mb-2">
                              {milestone.name}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-text-dark-secondary">
                              <span>Target: {formatDate(milestone.targetDate)}</span>
                              <span>•</span>
                              <span>
                                {daysUntil > 0 ? `${daysUntil} days remaining` :
                                 daysUntil === 0 ? 'Due today' :
                                 `${Math.abs(daysUntil)} days overdue`}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`
                            px-3 py-1 rounded-full text-xs font-medium
                            ${urgencyLabel === 'Completed' ? 'bg-neon-green/20 text-neon-green' :
                              urgencyLabel === 'Overdue' ? 'bg-error-dark/20 text-error-dark' :
                              urgencyLabel === 'At Risk' ? 'bg-warning-dark/20 text-warning-dark' :
                              urgencyLabel === 'Due Soon'? 'bg-neon-purple/20 text-neon-purple' : 'bg-text-dark-muted/20 text-text-dark-muted'
                            }
                          `}>
                            {urgencyLabel}
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold text-${statusColor} group-hover:text-neon-green transition-colors duration-300`}>
                              {milestone.progress}%
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative">
                        <div className="w-full bg-dark-surface rounded-full h-3 shadow-neumorphic-inset overflow-hidden">
                          <div 
                            className={`
                              h-full rounded-full transition-all duration-1000 ease-out relative
                              ${milestone.progress >= 80 ? 'bg-gradient-to-r from-neon-green to-emerald-400' :
                                milestone.progress >= 50 ? 'bg-gradient-to-r from-neon-purple to-purple-400' :
                                milestone.progress > 0 ? 'bg-gradient-to-r from-warning-dark to-yellow-400': 'bg-gradient-to-r from-dark-elevated to-dark-surface'
                              }
                            `}
                            style={{ width: `${milestone.progress}%` }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Progress indicators */}
                        <div className="flex justify-between mt-2 text-xs text-text-dark-muted">
                          <span>0%</span>
                          <span className="text-text-dark-secondary">Progress</span>
                          <span>100%</span>
                        </div>
                      </div>

                      {/* Automated deadline alerts */}
                      {(daysUntil <= 7 && daysUntil > 0 && milestone.progress < 80) && (
                        <div className="mt-4 p-3 bg-warning-dark/10 border border-warning-dark/30 rounded-lg">
                          <div className="flex items-center text-warning-dark">
                            <Icon name="AlertTriangle" size={16} className="mr-2" />
                            <span className="text-sm font-medium">
                              Alert: Milestone at risk - only {daysUntil} days remaining with {milestone.progress}% completion
                            </span>
                          </div>
                        </div>
                      )}

                      {daysUntil < 0 && (
                        <div className="mt-4 p-3 bg-error-dark/10 border border-error-dark/30 rounded-lg">
                          <div className="flex items-center text-error-dark">
                            <Icon name="AlertCircle" size={16} className="mr-2" />
                            <span className="text-sm font-medium">
                              Overdue: This milestone is {Math.abs(daysUntil)} days past the target date
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {milestones.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Target" size={48} className="text-text-dark-muted mb-4 mx-auto" />
                  <h4 className="text-lg font-semibold text-text-dark-primary mb-2">No Milestones Yet</h4>
                  <p className="text-text-dark-secondary">Add milestones to track your major achievements and goals.</p>
                </div>
              )}
            </div>
          );
        };

        export default MilestoneTracker;