import React from 'react';
        import Icon from '../../../components/AppIcon';

        const ActivityMatrix = ({ activities, onActivityClick }) => {
          const businessAreas = ['market', 'product', 'business', 'marketing', 'sales', 'operations'];
          const phases = activities.phases || [];

          const getActivityCount = (area, phaseId) => {
            const phase = phases.find(p => p.id === phaseId);
            if (!phase) return { total: 0, completed: 0 };
            
            const areaActivities = phase.activities?.filter(a => a.area === area) || [];
            const completed = areaActivities.filter(a => a.status === 'completed').length;
            
            return { total: areaActivities.length, completed };
          };

          const getCellColor = (completed, total) => {
            if (total === 0) return 'bg-dark-surface/30';
            const percentage = (completed / total) * 100;
            if (percentage === 100) return 'bg-gradient-to-br from-neon-green/40 to-emerald-400/40 border-neon-green/50';
            if (percentage >= 50) return 'bg-gradient-to-br from-neon-purple/40 to-purple-400/40 border-neon-purple/50';
            if (percentage > 0) return 'bg-gradient-to-br from-warning-dark/40 to-yellow-400/40 border-warning-dark/50';
            return 'bg-gradient-to-br from-dark-surface/40 to-dark-elevated/40 border-slate-600/50';
          };

          const getAreaIcon = (area) => {
            const icons = {
              market: 'TrendingUp',
              product: 'Package',
              business: 'Building',
              marketing: 'Megaphone',
              sales: 'DollarSign',
              operations: 'Settings'
            };
            return icons[area] || 'Circle';
          };

          const getPhaseIcon = (phaseId) => {
            const icons = {
              ideation: 'Lightbulb',
              validation: 'TestTube',
              launch: 'Rocket',
              growth: 'TrendingUp',
              scaling: 'Expand'
            };
            return icons[phaseId] || 'Circle';
          };

          const handleCellClick = (area, phase) => {
            const areaActivities = phase.activities?.filter(a => a.area === area) || [];
            if (areaActivities.length > 0) {
              // For now, just show the first activity
              onActivityClick?.(areaActivities[0]);
            }
          };

          return (
            <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
              <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
                <Icon name="Grid3X3" size={24} className="mr-3 text-neon-green" />
                Activity Matrix
              </h3>

              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Header */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    <div className="p-4"></div>
                    {phases.map(phase => (
                      <div key={phase.id} className="p-4 text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Icon 
                            name={getPhaseIcon(phase.id)} 
                            size={20} 
                            className={`
                              ${phase.status === 'completed' ? 'text-neon-green' :
                                phase.status === 'in-progress'? 'text-neon-purple' : 'text-warning-dark'
                              }
                            `} 
                          />
                        </div>
                        <h4 className="font-semibold text-text-dark-primary text-sm">{phase.name}</h4>
                        <p className="text-xs text-text-dark-muted mt-1">
                          {new Date(phase.startDate).getFullYear()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Matrix Grid */}
                  {businessAreas.map(area => (
                    <div key={area} className="grid grid-cols-7 gap-2 mb-2">
                      {/* Area Header */}
                      <div className="p-4 bg-dark-primary rounded-neumorphic shadow-neumorphic-subtle border border-slate-700 flex items-center">
                        <Icon 
                          name={getAreaIcon(area)} 
                          size={16} 
                          className="text-neon-green mr-3" 
                        />
                        <div>
                          <h5 className="font-semibold text-text-dark-primary capitalize text-sm">
                            {area}
                          </h5>
                          <p className="text-xs text-text-dark-muted">
                            {area === 'market' ? 'Research & Analysis' :
                             area === 'product' ? 'Development & Testing' :
                             area === 'business' ? 'Strategy & Planning' :
                             area === 'marketing' ? 'Promotion & Branding' :
                             area === 'sales'? 'Revenue & Growth' : 'Process & Systems'}
                          </p>
                        </div>
                      </div>

                      {/* Phase Cells */}
                      {phases.map(phase => {
                        const { total, completed } = getActivityCount(area, phase.id);
                        return (
                          <div
                            key={`${area}-${phase.id}`}
                            onClick={() => handleCellClick(area, phase)}
                            className={`
                              p-4 rounded-neumorphic shadow-neumorphic-subtle border transition-all duration-300 cursor-pointer group hover:scale-105
                              ${getCellColor(completed, total)}
                              ${total > 0 ? 'hover:shadow-neumorphic-hover' : 'cursor-not-allowed opacity-50'}
                            `}
                          >
                            {total > 0 ? (
                              <div className="text-center">
                                <div className="text-lg font-bold text-text-dark-primary group-hover:text-neon-green transition-colors duration-300">
                                  {completed}/{total}
                                </div>
                                <div className="text-xs text-text-dark-muted group-hover:text-text-dark-secondary transition-colors duration-300">
                                  {Math.round((completed / total) * 100)}%
                                </div>
                                <div className="w-full bg-dark-surface/50 rounded-full h-1 mt-2">
                                  <div 
                                    className="bg-gradient-to-r from-neon-green to-neon-purple h-1 rounded-full transition-all duration-300"
                                    style={{ width: `${(completed / total) * 100}%` }}
                                  ></div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-center text-text-dark-muted">
                                <Icon name="Minus" size={16} />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-br from-neon-green/40 to-emerald-400/40 border border-neon-green/50"></div>
                  <span className="text-text-dark-secondary">Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-br from-neon-purple/40 to-purple-400/40 border border-neon-purple/50"></div>
                  <span className="text-text-dark-secondary">Partially Complete</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-br from-warning-dark/40 to-yellow-400/40 border border-warning-dark/50"></div>
                  <span className="text-text-dark-secondary">Started</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-br from-dark-surface/40 to-dark-elevated/40 border border-slate-600/50"></div>
                  <span className="text-text-dark-secondary">Not Started</span>
                </div>
              </div>
            </div>
          );
        };

        export default ActivityMatrix;