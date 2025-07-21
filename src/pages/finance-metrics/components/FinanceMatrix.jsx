import React from 'react';
import Icon from '../../../components/AppIcon';

const FinanceMatrix = ({ activities, onActivityClick }) => {
  const financeAreas = [
    'budgeting', 
    'revenue', 
    'expenses', 
    'investments', 
    'financial-planning'
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
    if (percentage >= 50) return 'bg-gradient-to-br from-emerald-500/40 to-emerald-400/40 border-emerald-500/50';
    if (percentage > 0) return 'bg-gradient-to-br from-warning-dark/40 to-yellow-400/40 border-warning-dark/50';
    return 'bg-gradient-to-br from-dark-surface/40 to-dark-elevated/40 border-slate-600/50';
  };

  const getAreaIcon = (area) => {
    const icons = {
      'budgeting': 'Calculator',
      'revenue': 'TrendingUp',
      'expenses': 'CreditCard',
      'investments': 'DollarSign',
      'financial-planning': 'PieChart'
    };
    return icons[area] || 'BarChart3';
  };

  const getAreaDisplayName = (area) => {
    const displayNames = {
      'budgeting': 'Presupuestos',
      'revenue': 'Ingresos',
      'expenses': 'Gastos',
      'investments': 'Inversiones',
      'financial-planning': 'Planificación'
    };
    return displayNames[area] || area;
  };

  const getAreaDescription = (area) => {
    const descriptions = {
      'budgeting': 'Gestión y control presupuestario',
      'revenue': 'Generación y optimización ingresos',
      'expenses': 'Control y optimización gastos',
      'investments': 'Fundraising y gestión capital',
      'financial-planning': 'Estrategia y análisis financiero'
    };
    return descriptions[area] || 'Área financiera';
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
        <Icon name="DollarSign" size={24} className="mr-3 text-emerald-500" />
        Matriz Financiera & Métricas
      </h3>
      
      <p className="text-text-dark-secondary mb-6">
        Control integral de todas las áreas financieras y métricas clave para la sostenibilidad de tu startup.
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
                        phase.status === 'in-progress'? 'text-emerald-500' : 'text-warning-dark'
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
          {financeAreas.map(area => (
            <div key={area} className="grid grid-cols-6 gap-2 mb-2">
              {/* Area Header */}
              <div className="p-4 bg-dark-primary rounded-neumorphic shadow-neumorphic-subtle border border-slate-700 flex items-center">
                <Icon 
                  name={getAreaIcon(area)} 
                  size={16} 
                  className="text-emerald-500 mr-3 flex-shrink-0" 
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
                        <div className="text-lg font-bold text-text-dark-primary group-hover:text-emerald-500 transition-colors duration-300">
                          {completed}/{total}
                        </div>
                        <div className="text-xs text-text-dark-muted group-hover:text-text-dark-secondary transition-colors duration-300">
                          {Math.round((completed / total) * 100)}%
                        </div>
                        <div className="w-full bg-dark-surface/50 rounded-full h-1 mt-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-1 rounded-full transition-all duration-300"
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
          <div className="w-3 h-3 rounded bg-gradient-to-br from-emerald-500/40 to-emerald-400/40 border border-emerald-500/50"></div>
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

      {/* Finance Areas Quick Stats */}
      <div className="mt-6 pt-4 border-t border-slate-600">
        <h4 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2 text-emerald-500" />
          Resumen por Área Financiera
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {financeAreas.map(area => {
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
                  <Icon name={getAreaIcon(area)} size={14} className="text-emerald-500 mr-2" />
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
                    progressPercentage >= 50 ? 'text-emerald-500' :
                    progressPercentage > 0 ? 'text-warning-dark' : 'text-text-dark-muted'
                  }`}>
                    {progressPercentage}%
                  </span>
                </div>
                <div className="w-full bg-dark-surface/50 rounded-full h-1 mt-2">
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      progressPercentage >= 80 ? 'bg-gradient-to-r from-neon-green to-emerald-400' :
                      progressPercentage >= 50 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
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

      {/* Financial Health Indicators */}
      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-400/10 border border-emerald-500/30 rounded-neumorphic">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-emerald-500 mt-0.5" />
          <div>
            <h5 className="font-semibold text-text-dark-primary mb-1">
              Indicadores de Salud Financiera
            </h5>
            <p className="text-sm text-text-dark-secondary">
              Mantén un control riguroso del cash flow, burn rate y runway financiero. 
              La disciplina financiera es crucial para la supervivencia y crecimiento sostenible.
            </p>
          </div>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-dark-primary rounded-neumorphic p-3 border border-slate-700 text-center">
          <Icon name="TrendingUp" size={20} className="text-emerald-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-text-dark-primary">Revenue Growth</div>
          <div className="text-xs text-text-dark-muted">Crecimiento MoM</div>
        </div>
        
        <div className="bg-dark-primary rounded-neumorphic p-3 border border-slate-700 text-center">
          <Icon name="Calculator" size={20} className="text-emerald-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-text-dark-primary">Burn Rate</div>
          <div className="text-xs text-text-dark-muted">Quema mensual</div>
        </div>
        
        <div className="bg-dark-primary rounded-neumorphic p-3 border border-slate-700 text-center">
          <Icon name="PieChart" size={20} className="text-emerald-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-text-dark-primary">Runway</div>
          <div className="text-xs text-text-dark-muted">Meses restantes</div>
        </div>
        
        <div className="bg-dark-primary rounded-neumorphic p-3 border border-slate-700 text-center">
          <Icon name="DollarSign" size={20} className="text-emerald-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-text-dark-primary">ARR/MRR</div>
          <div className="text-xs text-text-dark-muted">Ingresos recurrentes</div>
        </div>
      </div>

      {/* Financial Best Practices */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-neumorphic">
          <h6 className="font-semibold text-emerald-500 mb-2 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2" />
            Mejores Prácticas
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Mantén 12-18 meses de runway mínimo</li>
            <li>• Monitorea burn rate semanalmente</li>
            <li>• Diversifica fuentes de ingresos</li>
            <li>• Reportes financieros mensuales</li>
          </ul>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h6 className="font-semibold text-warning-dark mb-2 flex items-center">
            <Icon name="AlertTriangle" size={16} className="mr-2" />
            Alertas Tempranas
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Burn rate superior al plan</li>
            <li>• Revenue por debajo del objetivo</li>
            <li>• Runway inferior a 6 meses</li>
            <li>• CAC &gt; LTV ratio desfavorable</li>
            <li>• Cash burn rate acelerado</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FinanceMatrix; 