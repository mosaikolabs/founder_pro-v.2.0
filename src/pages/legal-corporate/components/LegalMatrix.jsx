import React from 'react';
import Icon from '../../../components/AppIcon';

const LegalMatrix = ({ activities, onActivityClick }) => {
  const legalAreas = [
    'corporate-structure', 
    'legal-documents', 
    'compliance-regulatory', 
    'intellectual-property', 
    'contracts-agreements'
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
    if (percentage >= 50) return 'bg-gradient-to-br from-neon-purple/40 to-purple-400/40 border-neon-purple/50';
    if (percentage > 0) return 'bg-gradient-to-br from-warning-dark/40 to-yellow-400/40 border-warning-dark/50';
    return 'bg-gradient-to-br from-dark-surface/40 to-dark-elevated/40 border-slate-600/50';
  };

  const getAreaIcon = (area) => {
    const icons = {
      'corporate-structure': 'Building',
      'legal-documents': 'FileText',
      'compliance-regulatory': 'Shield',
      'intellectual-property': 'Copyright',
      'contracts-agreements': 'Handshake'
    };
    return icons[area] || 'Scale';
  };

  const getAreaDisplayName = (area) => {
    const displayNames = {
      'corporate-structure': 'Estructura Corporativa',
      'legal-documents': 'Documentos Legales',
      'compliance-regulatory': 'Cumplimiento Regulatorio',
      'intellectual-property': 'Propiedad Intelectual',
      'contracts-agreements': 'Contratos & Acuerdos'
    };
    return displayNames[area] || area;
  };

  const getAreaDescription = (area) => {
    const descriptions = {
      'corporate-structure': 'Constitución y gobernanza empresarial',
      'legal-documents': 'Documentación legal fundamental',
      'compliance-regulatory': 'Cumplimiento normativo y regulatorio',
      'intellectual-property': 'Protección de activos intelectuales',
      'contracts-agreements': 'Gestión contractual y acuerdos'
    };
    return descriptions[area] || 'Área legal';
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
      // Show the first activity for now
      onActivityClick?.(areaActivities[0]);
    }
  };

  return (
    <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
      <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
        <Icon name="Scale" size={24} className="mr-3 text-neon-purple" />
        Matriz Legal & Corporativa
      </h3>
      
      <p className="text-text-dark-secondary mb-6">
        Control y seguimiento de los aspectos legales y corporativos críticos en cada fase de desarrollo de tu startup.
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
          {legalAreas.map(area => (
            <div key={area} className="grid grid-cols-6 gap-2 mb-2">
              {/* Area Header */}
              <div className="p-4 bg-dark-primary rounded-neumorphic shadow-neumorphic-subtle border border-slate-700 flex items-center">
                <Icon 
                  name={getAreaIcon(area)} 
                  size={16} 
                  className="text-neon-purple mr-3 flex-shrink-0" 
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
                        <div className="text-lg font-bold text-text-dark-primary group-hover:text-neon-purple transition-colors duration-300">
                          {completed}/{total}
                        </div>
                        <div className="text-xs text-text-dark-muted group-hover:text-text-dark-secondary transition-colors duration-300">
                          {Math.round((completed / total) * 100)}%
                        </div>
                        <div className="w-full bg-dark-surface/50 rounded-full h-1 mt-2">
                          <div 
                            className="bg-gradient-to-r from-neon-purple to-purple-400 h-1 rounded-full transition-all duration-300"
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
          <div className="w-3 h-3 rounded bg-gradient-to-br from-neon-purple/40 to-purple-400/40 border border-neon-purple/50"></div>
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

      {/* Legal Areas Quick Stats */}
      <div className="mt-6 pt-4 border-t border-slate-600">
        <h4 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2 text-neon-purple" />
          Resumen por Área Legal
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {legalAreas.map(area => {
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
                  <Icon name={getAreaIcon(area)} size={14} className="text-neon-purple mr-2" />
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
                    progressPercentage >= 50 ? 'text-neon-purple' :
                    progressPercentage > 0 ? 'text-warning-dark' : 'text-text-dark-muted'
                  }`}>
                    {progressPercentage}%
                  </span>
                </div>
                <div className="w-full bg-dark-surface/50 rounded-full h-1 mt-2">
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      progressPercentage >= 80 ? 'bg-gradient-to-r from-neon-green to-emerald-400' :
                      progressPercentage >= 50 ? 'bg-gradient-to-r from-neon-purple to-purple-400' :
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

      {/* Legal Compliance Alert */}
      <div className="mt-6 p-4 bg-gradient-to-r from-neon-purple/10 to-purple-400/10 border border-neon-purple/30 rounded-neumorphic">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-neon-purple mt-0.5" />
          <div>
            <h5 className="font-semibold text-text-dark-primary mb-1">
              Recordatorio Legal
            </h5>
            <p className="text-sm text-text-dark-secondary">
              Mantén actualizados todos los documentos legales y asegúrate de cumplir con las regulaciones aplicables. 
              Consulta con especialistas legales para decisiones críticas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalMatrix; 