import React from 'react';
import Icon from '../../../components/AppIcon';

const MarketingMatrix = ({ activities, onActivityClick }) => {
  const marketingAreas = [
    'customer-acquisition', 
    'brand-marketing', 
    'digital-marketing', 
    'content-strategy', 
    'analytics-optimization'
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
    if (percentage >= 50) return 'bg-gradient-to-br from-orange-500/40 to-orange-400/40 border-orange-500/50';
    if (percentage > 0) return 'bg-gradient-to-br from-warning-dark/40 to-yellow-400/40 border-warning-dark/50';
    return 'bg-gradient-to-br from-dark-surface/40 to-dark-elevated/40 border-slate-600/50';
  };

  const getAreaIcon = (area) => {
    const icons = {
      'customer-acquisition': 'Target',
      'brand-marketing': 'Users',
      'digital-marketing': 'Share2',
      'content-strategy': 'FileText',
      'analytics-optimization': 'Eye'
    };
    return icons[area] || 'Megaphone';
  };

  const getAreaDisplayName = (area) => {
    const displayNames = {
      'customer-acquisition': 'Adquisición',
      'brand-marketing': 'Branding',
      'digital-marketing': 'Digital',
      'content-strategy': 'Contenido',
      'analytics-optimization': 'Analytics'
    };
    return displayNames[area] || area;
  };

  const getAreaDescription = (area) => {
    const descriptions = {
      'customer-acquisition': 'Captación y conversión clientes',
      'brand-marketing': 'Construcción y posicionamiento marca',
      'digital-marketing': 'Campañas digitales y paid media',
      'content-strategy': 'Estrategia de contenido y SEO',
      'analytics-optimization': 'Métricas y optimización'
    };
    return descriptions[area] || 'Área de marketing';
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
        <Icon name="Target" size={24} className="mr-3 text-orange-500" />
        Matriz Marketing & Customer Acquisition
      </h3>
      
      <p className="text-text-dark-secondary mb-6">
        Gestión integral de todas las estrategias de marketing y adquisición de clientes para acelerar el crecimiento.
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
                        phase.status === 'in-progress'? 'text-orange-500' : 'text-warning-dark'
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
          {marketingAreas.map(area => (
            <div key={area} className="grid grid-cols-6 gap-2 mb-2">
              {/* Area Header */}
              <div className="p-4 bg-dark-primary rounded-neumorphic shadow-neumorphic-subtle border border-slate-700 flex items-center">
                <Icon 
                  name={getAreaIcon(area)} 
                  size={16} 
                  className="text-orange-500 mr-3 flex-shrink-0" 
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
                        <div className="text-lg font-bold text-text-dark-primary group-hover:text-orange-500 transition-colors duration-300">
                          {completed}/{total}
                        </div>
                        <div className="text-xs text-text-dark-muted group-hover:text-text-dark-secondary transition-colors duration-300">
                          {Math.round((completed / total) * 100)}%
                        </div>
                        <div className="w-full bg-dark-surface/50 rounded-full h-1 mt-2">
                          <div 
                            className="bg-gradient-to-r from-orange-500 to-orange-400 h-1 rounded-full transition-all duration-300"
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
          <div className="w-3 h-3 rounded bg-gradient-to-br from-orange-500/40 to-orange-400/40 border border-orange-500/50"></div>
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

      {/* Marketing Areas Quick Stats */}
      <div className="mt-6 pt-4 border-t border-slate-600">
        <h4 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2 text-orange-500" />
          Resumen por Área de Marketing
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {marketingAreas.map(area => {
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
                  <Icon name={getAreaIcon(area)} size={14} className="text-orange-500 mr-2" />
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
                    progressPercentage >= 50 ? 'text-orange-500' :
                    progressPercentage > 0 ? 'text-warning-dark' : 'text-text-dark-muted'
                  }`}>
                    {progressPercentage}%
                  </span>
                </div>
                <div className="w-full bg-dark-surface/50 rounded-full h-1 mt-2">
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      progressPercentage >= 80 ? 'bg-gradient-to-r from-neon-green to-emerald-400' :
                      progressPercentage >= 50 ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
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

      {/* Marketing Strategy Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-orange-400/10 border border-orange-500/30 rounded-neumorphic">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-orange-500 mt-0.5" />
          <div>
            <h5 className="font-semibold text-text-dark-primary mb-1">
              Estrategia de Marketing Integral
            </h5>
            <p className="text-sm text-text-dark-secondary">
              Combina múltiples canales para maximizar alcance y ROI. Enfócate en CAC óptimo, 
              LTV alto y construye una marca reconocible en tu mercado objetivo.
            </p>
          </div>
        </div>
      </div>

      {/* Marketing Channels Performance */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-dark-primary rounded-neumorphic p-3 border border-slate-700 text-center">
          <Icon name="Target" size={20} className="text-orange-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-text-dark-primary">Paid Ads</div>
          <div className="text-xs text-text-dark-muted">CAC $45</div>
        </div>
        
        <div className="bg-dark-primary rounded-neumorphic p-3 border border-slate-700 text-center">
          <Icon name="FileText" size={20} className="text-orange-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-text-dark-primary">Content</div>
          <div className="text-xs text-text-dark-muted">Organic Traffic</div>
        </div>
        
        <div className="bg-dark-primary rounded-neumorphic p-3 border border-slate-700 text-center">
          <Icon name="Share2" size={20} className="text-orange-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-text-dark-primary">Social Media</div>
          <div className="text-xs text-text-dark-muted">Engagement Rate</div>
        </div>
        
        <div className="bg-dark-primary rounded-neumorphic p-3 border border-slate-700 text-center">
          <Icon name="Users" size={20} className="text-orange-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-text-dark-primary">Referrals</div>
          <div className="text-xs text-text-dark-muted">Viral Coefficient</div>
        </div>
      </div>

      {/* Marketing Funnel Metrics */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-neumorphic">
          <h6 className="font-semibold text-orange-500 mb-2 flex items-center">
            <Icon name="TrendingUp" size={16} className="mr-2" />
            Funnel de Conversión
          </h6>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Awareness:</span>
              <span className="text-orange-500 font-medium">10,000 impresiones</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Interest:</span>
              <span className="text-orange-500 font-medium">1,500 clicks (15%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Consideration:</span>
              <span className="text-orange-500 font-medium">450 leads (30%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Conversion:</span>
              <span className="text-neon-green font-medium">90 customers (20%)</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h6 className="font-semibold text-warning-dark mb-2 flex items-center">
            <Icon name="AlertTriangle" size={16} className="mr-2" />
            Optimizaciones Prioritarias
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Reducir CAC en canales paid</li>
            <li>• Mejorar conversion rate landing pages</li>
            <li>• Incrementar retention rate</li>
            <li>• Optimizar customer lifetime value</li>
          </ul>
        </div>
      </div>

      {/* Growth Metrics Dashboard */}
      <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-orange-400/10 border border-orange-500/30 rounded-neumorphic">
        <h5 className="font-semibold text-text-dark-primary mb-3 flex items-center">
          <Icon name="Eye" size={18} className="mr-2 text-orange-500" />
          Métricas de Crecimiento Clave
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-neon-green">$45</div>
            <div className="text-xs text-text-dark-muted">CAC Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-500">$180</div>
            <div className="text-xs text-text-dark-muted">LTV Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning-dark">4:1</div>
            <div className="text-xs text-text-dark-muted">LTV:CAC Ratio</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-500">3.2%</div>
            <div className="text-xs text-text-dark-muted">Conversion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingMatrix; 