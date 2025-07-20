import React from 'react';
        import Icon from '../../../components/AppIcon';
        import ModalPortal from '../../../components/ui/ModalPortal';

        const ActivityDetailModal = ({ activity, isOpen, onClose }) => {
          if (!activity) return null;

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
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
          };

          // Mock detailed activity data
          const activityDetails = {
            description: "Comprehensive market analysis to understand target audience, market size, and competitive landscape. This research will inform product development and go-to-market strategy.",
            objectives: [
              "Identify target customer segments",
              "Analyze market size and growth potential",
              "Research competitor offerings and pricing",
              "Understand customer pain points and needs"
            ],
            deliverables: [
              "Market analysis report",
              "Competitor comparison matrix",
              "Customer persona definitions",
              "Market sizing calculations"
            ],
            resources: [
              "Market research tools (SurveyMonkey, Google Trends)",
              "Industry reports and publications",
              "Customer interview budget",
              "Analytics and research time allocation"
            ],
            timeline: {
              planned: "2 weeks",
              actual: activity.status === 'completed' ? "2.5 weeks" : "In progress",
              startDate: "2025-01-01",
              endDate: "2025-01-15"
            },
            team: [
              { name: "John Founder", role: "Lead Researcher" },
              { name: "Sarah Marketing", role: "Market Analyst" },
              { name: "Mike Sales", role: "Customer Interview Lead" }
            ],
            risks: [
              "Limited budget for comprehensive research tools",
              "Difficulty reaching target customers for interviews",
              "Rapidly changing market conditions"
            ],
            dependencies: [
              "Customer discovery interviews completed",
              "Industry expert consultations scheduled",
              "Competitive analysis framework approved"
            ]
          };

          return (
            <ModalPortal isOpen={isOpen} onClose={onClose} className="max-w-4xl">
              <div className="bg-gradient-card rounded-neumorphic-lg shadow-neumorphic border border-slate-600">
                {/* Header */}
                <div className="p-6 border-b border-slate-600">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`
                        p-3 rounded-xl shadow-lg
                        ${activity.status === 'completed' ? 'bg-gradient-to-r from-neon-green to-emerald-400' :
                          activity.status === 'in-progress'? 'bg-gradient-to-r from-neon-purple to-purple-400' : 'bg-gradient-to-r from-dark-surface to-dark-elevated'
                        }
                      `}>
                        <Icon name={getStatusIcon(activity.status)} size={24} className="text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-text-dark-primary mb-2">
                          {activity.name}
                        </h2>
                        <div className="flex items-center space-x-4">
                          <div className={`
                            inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                            ${activity.status === 'completed' ? 'bg-neon-green/20 text-neon-green' :
                              activity.status === 'in-progress'? 'bg-neon-purple/20 text-neon-purple' : 'bg-warning-dark/20 text-warning-dark'
                            }
                          `}>
                            <Icon name={getStatusIcon(activity.status)} size={14} className="mr-1" />
                            {activity.status.charAt(0).toUpperCase() + activity.status.slice(1).replace('-', ' ')}
                          </div>
                          <div className={`
                            inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                            ${activity.priority === 'high' ? 'bg-error-dark/20 text-error-dark' :
                              activity.priority === 'medium'? 'bg-warning-dark/20 text-warning-dark' : 'bg-text-dark-muted/20 text-text-dark-muted'
                            }
                          `}>
                            {activity.priority} priority
                          </div>
                          <span className="text-text-dark-secondary text-sm">
                            Due: {formatDate(activity.dueDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg hover:bg-dark-surface/50 transition-colors duration-200 text-text-dark-muted hover:text-text-dark-primary"
                    >
                      <Icon name="X" size={20} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Description */}
                      <div>
                        <h3 className="text-lg font-semibold text-text-dark-primary mb-3 flex items-center">
                          <Icon name="FileText" size={18} className="mr-2 text-neon-green" />
                          Description
                        </h3>
                        <p className="text-text-dark-secondary leading-relaxed">
                          {activityDetails.description}
                        </p>
                      </div>

                      {/* Objectives */}
                      <div>
                        <h3 className="text-lg font-semibold text-text-dark-primary mb-3 flex items-center">
                          <Icon name="Target" size={18} className="mr-2 text-neon-green" />
                          Objectives
                        </h3>
                        <ul className="space-y-2">
                          {activityDetails.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <Icon name="CheckCircle" size={14} className="text-neon-green mt-0.5 flex-shrink-0" />
                              <span className="text-text-dark-secondary">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <h3 className="text-lg font-semibold text-text-dark-primary mb-3 flex items-center">
                          <Icon name="Package" size={18} className="mr-2 text-neon-green" />
                          Deliverables
                        </h3>
                        <ul className="space-y-2">
                          {activityDetails.deliverables.map((deliverable, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <Icon name="FileCheck" size={14} className="text-neon-purple mt-0.5 flex-shrink-0" />
                              <span className="text-text-dark-secondary">{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Timeline */}
                      <div>
                        <h3 className="text-lg font-semibold text-text-dark-primary mb-3 flex items-center">
                          <Icon name="Clock" size={18} className="mr-2 text-neon-green" />
                          Timeline
                        </h3>
                        <div className="bg-dark-primary rounded-neumorphic p-4 shadow-neumorphic-subtle">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-text-dark-muted">Planned Duration:</span>
                              <span className="text-text-dark-primary font-medium">{activityDetails.timeline.planned}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-dark-muted">Actual Duration:</span>
                              <span className="text-text-dark-primary font-medium">{activityDetails.timeline.actual}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-dark-muted">Start Date:</span>
                              <span className="text-text-dark-primary font-medium">
                                {formatDate(activityDetails.timeline.startDate)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-text-dark-muted">End Date:</span>
                              <span className="text-text-dark-primary font-medium">
                                {formatDate(activityDetails.timeline.endDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Team */}
                      <div>
                        <h3 className="text-lg font-semibold text-text-dark-primary mb-3 flex items-center">
                          <Icon name="Users" size={18} className="mr-2 text-neon-green" />
                          Team Members
                        </h3>
                        <div className="space-y-3">
                          {activityDetails.team.map((member, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-dark-primary rounded-neumorphic shadow-neumorphic-subtle">
                              <div className="w-8 h-8 bg-gradient-to-r from-neon-green to-neon-purple rounded-full flex items-center justify-center">
                                <Icon name="User" size={14} className="text-white" />
                              </div>
                              <div>
                                <div className="text-text-dark-primary font-medium">{member.name}</div>
                                <div className="text-text-dark-muted text-sm">{member.role}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Resources */}
                      <div>
                        <h3 className="text-lg font-semibold text-text-dark-primary mb-3 flex items-center">
                          <Icon name="Briefcase" size={18} className="mr-2 text-neon-green" />
                          Resources
                        </h3>
                        <ul className="space-y-2">
                          {activityDetails.resources.map((resource, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <Icon name="Tool" size={14} className="text-warning-dark mt-0.5 flex-shrink-0" />
                              <span className="text-text-dark-secondary">{resource}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Risks & Dependencies */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {/* Risks */}
                    <div>
                      <h3 className="text-lg font-semibold text-text-dark-primary mb-3 flex items-center">
                        <Icon name="AlertTriangle" size={18} className="mr-2 text-error-dark" />
                        Risks
                      </h3>
                      <ul className="space-y-2">
                        {activityDetails.risks.map((risk, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <Icon name="AlertCircle" size={14} className="text-error-dark mt-0.5 flex-shrink-0" />
                            <span className="text-text-dark-secondary">{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dependencies */}
                    <div>
                      <h3 className="text-lg font-semibold text-text-dark-primary mb-3 flex items-center">
                        <Icon name="GitBranch" size={18} className="mr-2 text-neon-purple" />
                        Dependencies
                      </h3>
                      <ul className="space-y-2">
                        {activityDetails.dependencies.map((dependency, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <Icon name="Link" size={14} className="text-neon-purple mt-0.5 flex-shrink-0" />
                            <span className="text-text-dark-secondary">{dependency}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-600 flex items-center justify-between">
                  <div className="text-sm text-text-dark-muted">
                    Business Area: <span className="text-text-dark-primary capitalize font-medium">{activity.area}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 text-text-dark-secondary hover:text-text-dark-primary transition-colors duration-200">
                      Edit Activity
                    </button>
                    <button 
                      onClick={onClose}
                      className="px-6 py-2 bg-gradient-to-r from-neon-green to-neon-purple text-white rounded-neumorphic hover:shadow-glow-neon transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </ModalPortal>
          );
        };

        export default ActivityDetailModal;