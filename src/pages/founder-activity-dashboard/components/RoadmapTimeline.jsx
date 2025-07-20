import React from 'react';
        import Icon from '../../../components/AppIcon';

        const RoadmapTimeline = ({ activities, onActivityClick }) => {
          const getStatusColor = (status) => {
            switch (status) {
              case 'completed': return 'neon-green';
              case 'in-progress': return 'neon-purple';
              case 'pending': return 'warning-dark';
              default: return 'text-dark-muted';
            }
          };

          const getStatusIcon = (status) => {
            switch (status) {
              case 'completed': return 'CheckCircle';
              case 'in-progress': return 'Clock';
              case 'pending': return 'Circle';
              default: return 'Circle';
            }
          };

          const getPriorityColor = (priority) => {
            switch (priority) {
              case 'high': return 'error-dark';
              case 'medium': return 'warning-dark';
              case 'low': return 'text-dark-muted';
              default: return 'text-dark-muted';
            }
          };

          const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
          };

          return (
            <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
              <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
                <Icon name="Map" size={24} className="mr-3 text-neon-green" />
                Roadmap Timeline
              </h3>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-green via-neon-purple to-warning-dark"></div>

                {activities.phases?.map((phase, phaseIndex) => (
                  <div key={phase.id} className="relative mb-12 last:mb-0">
                    {/* Phase header */}
                    <div className="flex items-center mb-6">
                      <div className={`
                        w-16 h-16 rounded-full flex items-center justify-center z-10 relative shadow-lg
                        ${phase.status === 'completed' ? 'bg-gradient-to-r from-neon-green to-emerald-400' :
                          phase.status === 'in-progress'? 'bg-gradient-to-r from-neon-purple to-purple-400' : 'bg-gradient-to-r from-dark-surface to-dark-elevated'
                        }
                      `}>
                        <Icon 
                          name={getStatusIcon(phase.status)} 
                          size={24} 
                          className="text-white" 
                        />
                      </div>
                      <div className="ml-6 flex-1">
                        <h4 className="text-xl font-bold text-text-dark-primary mb-1">
                          {phase.name}
                        </h4>
                        <p className="text-text-dark-secondary text-sm">
                          {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
                        </p>
                        <div className={`
                          inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-2
                          ${phase.status === 'completed' ? 'bg-neon-green/20 text-neon-green' :
                            phase.status === 'in-progress'? 'bg-neon-purple/20 text-neon-purple' : 'bg-warning-dark/20 text-warning-dark'
                          }
                        `}>
                          <Icon name={getStatusIcon(phase.status)} size={12} className="mr-1" />
                          {phase.status.charAt(0).toUpperCase() + phase.status.slice(1).replace('-', ' ')}
                        </div>
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="ml-20 space-y-4">
                      {phase.activities?.map((activity) => (
                        <div
                          key={activity.id}
                          onClick={() => onActivityClick?.(activity)}
                          className="bg-dark-primary rounded-neumorphic p-4 shadow-neumorphic-subtle border border-slate-700 hover:shadow-neumorphic-hover transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <Icon 
                                  name={getStatusIcon(activity.status)} 
                                  size={16} 
                                  className={`text-${getStatusColor(activity.status)} group-hover:scale-110 transition-transform duration-300`} 
                                />
                                <h5 className="font-semibold text-text-dark-primary group-hover:text-neon-green transition-colors duration-300">
                                  {activity.name}
                                </h5>
                                <div className={`
                                  px-2 py-1 rounded-full text-xs font-medium
                                  ${activity.priority === 'high' ? 'bg-error-dark/20 text-error-dark' :
                                    activity.priority === 'medium'? 'bg-warning-dark/20 text-warning-dark' : 'bg-text-dark-muted/20 text-text-dark-muted'
                                  }
                                `}>
                                  {activity.priority}
                                </div>
                              </div>
                              <p className="text-sm text-text-dark-secondary">
                                Due: {formatDate(activity.dueDate)} • Area: {activity.area}
                              </p>
                            </div>
                            <Icon 
                              name="ChevronRight" 
                              size={16} 
                              className="text-text-dark-muted group-hover:text-neon-green group-hover:translate-x-1 transition-all duration-300" 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        };

        export default RoadmapTimeline;