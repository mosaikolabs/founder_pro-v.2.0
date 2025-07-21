import React from 'react';
import Icon from '../../../components/AppIcon';

const InvestmentMatrix = ({ activities, onActivityClick }) => {
  const investmentAreas = [
    'fundraising-strategy', 
    'investor-relations', 
    'valuation-management', 
    'pitch-preparation', 
    'due-diligence'
  ];
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
    if (percentage >= 50) return 'bg-gradient-to-br from-purple-500/40 to-purple-400/40 border-purple-500/50';
    if (percentage > 0) return 'bg-gradient-to-br from-warning-dark/40 to-yellow-400/40 border-warning-dark/50';
    return 'bg-gradient-to-br from-dark-surface/40 to-dark-elevated/40 border-slate-600/50';
  };

  const getAreaIcon = (area) => {
    const icons = {
      'fundraising-strategy': 'PiggyBank',
      'investor-relations': 'Users',
      'valuation-management': 'TrendingUp',
      'pitch-preparation': 'Presentation',
      'due-diligence': 'FileText'
    };
    return icons[area] || 'Banknote';
  };

  const getAreaDisplayName = (area) => {
    const displayNames = {
      'fundraising-strategy': 'Estrategia',
      'investor-relations': 'Relaciones',
      'valuation-management': 'Valuación',
      'pitch-preparation': 'Pitch',
      'due-diligence': 'Due Diligence'
    };
    return displayNames[area] || area;
  };

  const getAreaDescription = (area) => {
    const descriptions = {
      'fundraising-strategy': 'Estrategia y planning fundraising',
      'investor-relations': 'Gestión relaciones con investors',
      'valuation-management': 'Modelos de valuación y pricing',
      'pitch-preparation': 'Pitch deck y presentaciones',
      'due-diligence': 'Due diligence y compliance'
    };
    return descriptions[area] || 'Área de inversión';
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
      onActivityClick?.(areaActivities[0]);
    }
  };

  return (
    <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
      <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
        <Icon name="PiggyBank" size={24} className="mr-3 text-purple-500" />
        Matriz Investment & Fundraising
      </h3>
      
      <p className="text-text-dark-secondary mb-6">
        Gestión estratégica de inversión, fundraising y relaciones con investors para el crecimiento sostenible de tu startup.
      </p>

      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Header */}
          <div className="grid grid-cols-6 gap-2 mb-4">
            <div className="p-4"></div>
            {phases.map(phase => (
              <div key={phase.id} className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Icon 
                    name={getPhaseIcon(phase.id)} 
                    size={20} 
                    className={`
                      ${phase.status === 'completed' ? 'text-neon-green' :
                        phase.status === 'in-progress'? 'text-purple-500' : 'text-warning-dark'
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
          {investmentAreas.map(area => (
            <div key={area} className="grid grid-cols-6 gap-2 mb-2">
              {/* Area Header */}
              <div className="p-4 bg-dark-primary rounded-neumorphic shadow-neumorphic-subtle border border-slate-700 flex items-center">
                <Icon 
                  name={getAreaIcon(area)} 
                  size={16} 
                  className="text-purple-500 mr-3 flex-shrink-0" 
                />
                <div className="min-w-0">
                  <h5 className="font-semibold text-text-dark-primary text-sm">
                    {getAreaDisplayName(area)}
                  </h5>
                  <p className="text-xs text-text-dark-muted truncate">
                    {getAreaDescription(area)}
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
                        <div className="text-lg font-bold text-text-dark-primary group-hover:text-purple-500 transition-colors duration-300">
                          {completed}/{total}
                        </div>
                        <div className="text-xs text-text-dark-muted group-hover:text-text-dark-secondary transition-colors duration-300">
                          {Math.round((completed / total) * 100)}%
                        </div>
                        <div className="w-full bg-dark-surface/50 rounded-full h-1 mt-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-purple-400 h-1 rounded-full transition-all duration-300"
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
          <span className="text-text-dark-secondary">Completado</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-gradient-to-br from-purple-500/40 to-purple-400/40 border border-purple-500/50"></div>
          <span className="text-text-dark-secondary">Parcialmente Completo</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-gradient-to-br from-warning-dark/40 to-yellow-400/40 border border-warning-dark/50"></div>
          <span className="text-text-dark-secondary">Iniciado</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded bg-gradient-to-br from-dark-surface/40 to-dark-elevated/40 border border-slate-600/50"></div>
          <span className="text-text-dark-secondary">No Iniciado</span>
        </div>
      </div>

      {/* Investment Areas Quick Stats */}
      <div className="mt-6 pt-4 border-t border-slate-600">
        <h4 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2 text-purple-500" />
          Resumen por Área de Inversión
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {investmentAreas.map(area => {
            const totalActivities = phases.reduce((sum, phase) => {
              const { total } = getActivityCount(area, phase.id);
              return sum + total;
            }, 0);
            
            const completedActivities = phases.reduce((sum, phase) => {
              const { completed } = getActivityCount(area, phase.id);
              return sum + completed;
            }, 0);
            
            const progressPercentage = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;
            
            return (
              <div key={area} className="bg-dark-primary rounded-neumorphic p-3 border border-slate-700">
                <div className="flex items-center mb-2">
                  <Icon name={getAreaIcon(area)} size={14} className="text-purple-500 mr-2" />
                  <h5 className="text-sm font-medium text-text-dark-primary">
                    {getAreaDisplayName(area)}
                  </h5>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-dark-secondary">
                    {completedActivities}/{totalActivities}
                  </span>
                  <span className={`text-xs font-medium ${
                    progressPercentage >= 80 ? 'text-neon-green' :
                    progressPercentage >= 50 ? 'text-purple-500' :
                    progressPercentage > 0 ? 'text-warning-dark' : 'text-text-dark-muted'
                  }`}>
                    {progressPercentage}%
                  </span>
                </div>
                <div className="w-full bg-dark-surface/50 rounded-full h-1 mt-2">
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      progressPercentage >= 80 ? 'bg-gradient-to-r from-neon-green to-emerald-400' :
                      progressPercentage >= 50 ? 'bg-gradient-to-r from-purple-500 to-purple-400' :
                      progressPercentage > 0 ? 'bg-gradient-to-r from-warning-dark to-yellow-400' : 'bg-dark-surface'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Investment Excellence Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-purple-400/10 border border-purple-500/30 rounded-neumorphic">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-purple-500 mt-0.5" />
          <div>
            <h5 className="font-semibold text-text-dark-primary mb-1">
              Excelencia en Investment
            </h5>
            <p className="text-sm text-text-dark-secondary">
              Desarrolla estrategias de fundraising efectivas, construye relaciones sólidas con investors 
              y presenta tu startup de forma convincente para asegurar la inversión necesaria.
            </p>
          </div>
        </div>
      </div>

      {/* Investment KPI Dashboard */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-dark-primary rounded-neumorphic p-3 border border-slate-700 text-center">
          <Icon name="PiggyBank" size={20} className="text-purple-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-text-dark-primary">Seed Round</div>
          <div className="text-xs text-text-dark-muted">$500K target</div>
        </div>
        
        <div className="bg-dark-primary rounded-neumorphic p-3 border border-slate-700 text-center">
          <Icon name="Users" size={20} className="text-purple-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-text-dark-primary">Investor Pipeline</div>
          <div className="text-xs text-text-dark-muted">20+ leads</div>
        </div>
        
        <div className="bg-dark-primary rounded-neumorphic p-3 border border-slate-700 text-center">
          <Icon name="TrendingUp" size={20} className="text-purple-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-text-dark-primary">PMF Validation</div>
          <div className="text-xs text-text-dark-muted">40% retention</div>
        </div>
        
        <div className="bg-dark-primary rounded-neumorphic p-3 border border-slate-700 text-center">
          <Icon name="Banknote" size={20} className="text-purple-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-text-dark-primary">Serie A Ready</div>
          <div className="text-xs text-text-dark-muted">$2M+ ARR</div>
        </div>
      </div>

      {/* Investment Excellence Framework */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-neumorphic">
          <h6 className="font-semibold text-purple-500 mb-2 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2" />
            Best Practices Fundraising
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Storytelling compelling en pitch deck</li>
            <li>• Data room organizado y completo</li>
            <li>• Pipeline de investors cualificados</li>
            <li>• Métricas de traction validadas</li>
          </ul>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h6 className="font-semibold text-warning-dark mb-2 flex items-center">
            <Icon name="AlertTriangle" size={16} className="mr-2" />
            Alertas de Investment
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Burn rate superior a proyecciones</li>
            <li>• Pipeline de investors insuficiente</li>
            <li>• Métricas de traction por debajo objetivo</li>
            <li>• Due diligence documentation incompleta</li>
          </ul>
        </div>
      </div>

      {/* Fundraising Metrics */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-purple-400/10 border border-purple-500/30 rounded-neumorphic">
        <h5 className="font-semibold text-text-dark-primary mb-3 flex items-center">
          <Icon name="TrendingUp" size={18} className="mr-2 text-purple-500" />
          Métricas Clave de Fundraising
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-neon-green">65%</div>
            <div className="text-xs text-text-dark-muted">Seed Progress</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-500">20+</div>
            <div className="text-xs text-text-dark-muted">Qualified Leads</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning-dark">$2.5M</div>
            <div className="text-xs text-text-dark-muted">Target Valuation</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-500">18mo</div>
            <div className="text-xs text-text-dark-muted">Current Runway</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentMatrix; 