import React from 'react';
import Icon from '../../../components/AppIcon';

const ExitTracker = ({ milestones = [] }) => {
  const getMilestoneIcon = (milestoneId) => {
    const icons = {
      'exit-valuation-100m': 'TrendingUp',
      'acquisition-readiness-tier1': 'Building',
      'ipo-preparation-complete': 'DollarSign',
      'stakeholder-alignment-optimal': 'Users'
    };
    return icons[milestoneId] || 'Target';
  };

  const getMilestoneStatusColor = (progress) => {
    if (progress >= 100) return 'text-neon-green';
    if (progress >= 75) return 'text-violet-500';
    if (progress >= 50) return 'text-warning-dark';
    if (progress > 0) return 'text-yellow-500';
    return 'text-text-dark-muted';
  };

  const getMilestoneProgressColor = (progress) => {
    if (progress >= 100) return 'from-neon-green to-emerald-400';
    if (progress >= 75) return 'from-violet-500 to-violet-400';
    if (progress >= 50) return 'from-warning-dark to-yellow-400';
    if (progress > 0) return 'from-yellow-500 to-orange-400';
    return 'from-dark-surface to-dark-elevated';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysUntilTarget = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyStatus = (daysUntil) => {
    if (daysUntil < 0) return { label: 'Vencido', color: 'text-error-dark', bgColor: 'bg-error-dark/20' };
    if (daysUntil <= 30) return { label: 'Crítico', color: 'text-warning-dark', bgColor: 'bg-warning-dark/20' };
    if (daysUntil <= 90) return { label: 'Próximo', color: 'text-violet-500', bgColor: 'bg-violet-500/20' };
    return { label: 'Planificado', color: 'text-neon-green', bgColor: 'bg-neon-green/20' };
  };

  const getExitComplexity = (milestoneId) => {
    const complexities = {
      'exit-valuation-100m': 'Extrema',
      'acquisition-readiness-tier1': 'Muy Alta',
      'ipo-preparation-complete': 'Extrema',
      'stakeholder-alignment-optimal': 'Alta'
    };
    return complexities[milestoneId] || 'Alta';
  };

  const getExitRecommendation = (milestoneId) => {
    const recommendations = {
      'exit-valuation-100m': 'Enfoque en revenue multiple optimization, competitive positioning y market timing strategy para maximizar valuation.',
      'acquisition-readiness-tier1': 'Due diligence preparation, financial audit readiness y strategic asset positioning para Tier 1 acquirers.',
      'ipo-preparation-complete': 'SEC compliance, financial reporting excellence y investor relations strategy para IPO readiness completa.',
      'stakeholder-alignment-optimal': 'Board alignment, investor communication y employee equity optimization para 100% stakeholder buy-in.'
    };
    return recommendations[milestoneId] || 'Mantén enfoque en exit timing optimization, valuation maximization y stakeholder alignment estratégico.';
  };

  if (milestones.length === 0) {
    return (
      <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
        <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
          <Icon name="DollarSign" size={24} className="mr-3 text-violet-500" />
          Seguimiento de Milestones de Exit
        </h3>
        
        <div className="text-center py-12">
          <Icon name="Target" size={48} className="text-text-dark-muted mb-4 mx-auto" />
          <h4 className="text-lg font-semibold text-text-dark-primary mb-2">
            No hay milestones de exit definidos
          </h4>
          <p className="text-text-dark-secondary">
            Los hitos de exit strategy aparecerán aquí una vez configurados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
      <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
        <Icon name="DollarSign" size={24} className="mr-3 text-violet-500" />
        Seguimiento de Milestones de Exit
      </h3>
      
      <p className="text-text-dark-secondary mb-6">
        Monitorea el progreso hacia la estrategia de salida y maximización de valuation de tu startup
      </p>

      <div className="space-y-6">
        {milestones.map((milestone) => {
          const daysUntil = getDaysUntilTarget(milestone.targetDate);
          const urgency = getUrgencyStatus(daysUntil);
          const complexity = getExitComplexity(milestone.id);
          const recommendation = getExitRecommendation(milestone.id);
          
          return (
            <div
              key={milestone.id}
              className="bg-dark-primary rounded-neumorphic p-6 shadow-neumorphic-subtle border border-slate-700 hover:shadow-neumorphic-hover transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${getMilestoneProgressColor(milestone.progress)} shadow-lg`}>
                    <Icon 
                      name={getMilestoneIcon(milestone.id)} 
                      size={24} 
                      className="text-white" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-text-dark-primary mb-2">
                      {milestone.name}
                    </h4>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <Icon name="Calendar" size={16} className="text-text-dark-muted" />
                        <span className="text-sm text-text-dark-secondary">
                          Target: {formatDate(milestone.targetDate)}
                        </span>
                      </div>
                      
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${urgency.bgColor} ${urgency.color}`}>
                        {urgency.label}
                      </div>

                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-violet-500/20 text-violet-500">
                        Complejidad {complexity}
                      </div>

                      {milestone.metric && (
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-neon-green/20 text-neon-green">
                          {milestone.metric}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-dark-secondary">Progreso Exit</span>
                      <span className={`text-sm font-medium ${getMilestoneStatusColor(milestone.progress)}`}>
                        {milestone.progress}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-dark-surface/50 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${getMilestoneProgressColor(milestone.progress)} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  {daysUntil >= 0 ? (
                    <div>
                      <div className="text-2xl font-bold text-text-dark-primary">
                        {daysUntil}
                      </div>
                      <div className="text-xs text-text-dark-muted">
                        {daysUntil === 1 ? 'día restante' : 'días restantes'}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-2xl font-bold text-error-dark">
                        {Math.abs(daysUntil)}
                      </div>
                      <div className="text-xs text-error-dark">
                        {Math.abs(daysUntil) === 1 ? 'día vencido' : 'días vencidos'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Exit Milestone Details */}
              <div className="mt-4 pt-4 border-t border-slate-600">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-text-dark-muted">Estado Exit:</span>
                    <span className={`ml-2 font-medium ${getMilestoneStatusColor(milestone.progress)}`}>
                      {milestone.progress >= 100 ? 'Exit Ready' :
                       milestone.progress >= 75 ? 'Optimizing' :
                       milestone.progress >= 50 ? 'Preparing' :
                       milestone.progress > 0 ? 'Planning' : 'Iniciando'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Prioridad Valuation:</span>
                    <span className={`ml-2 font-medium ${
                      daysUntil < 0 ? 'text-error-dark' :
                      daysUntil <= 30 ? 'text-warning-dark' :
                      daysUntil <= 90 ? 'text-violet-500' : 'text-neon-green'
                    }`}>
                      {daysUntil < 0 ? 'Crítico' :
                       daysUntil <= 30 ? 'Alto' :
                       daysUntil <= 90 ? 'Medio' : 'Bajo'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Tipo:</span>
                    <span className="ml-2 font-medium text-violet-500">
                      Exit Strategy
                    </span>
                  </div>
                </div>

                {/* Exit Recommendation Section */}
                <div className="p-3 bg-violet-500/10 border border-violet-500/30 rounded-neumorphic">
                  <div className="flex items-start space-x-2">
                    <Icon name="Target" size={16} className="text-violet-500 mt-0.5" />
                    <div className="text-xs text-text-dark-secondary">
                      <strong className="text-violet-500">Recomendación Exit:</strong> {recommendation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Exit Summary Stats */}
      <div className="mt-8 pt-6 border-t border-slate-600">
        <h4 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2 text-violet-500" />
          Resumen de Exit Strategy
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">
              {milestones.filter(m => m.progress >= 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">Exit Ready</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-violet-500 mb-1">
              {milestones.filter(m => m.progress > 0 && m.progress < 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">En Preparación</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-warning-dark mb-1">
              {milestones.filter(m => getDaysUntilTarget(m.targetDate) <= 30 && getDaysUntilTarget(m.targetDate) > 0).length}
            </div>
            <div className="text-xs text-text-dark-muted">Críticos (30d)</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-error-dark mb-1">
              {milestones.filter(m => getDaysUntilTarget(m.targetDate) < 0).length}
            </div>
            <div className="text-xs text-text-dark-muted">Vencidos</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-dark-secondary">Exit Progress General</span>
            <span className="text-sm font-medium text-violet-500">
              {Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%
            </span>
          </div>
          <div className="w-full bg-dark-surface/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-violet-500 to-violet-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Exit Performance Dashboard */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-violet-500/10 border border-violet-500/30 rounded-neumorphic">
          <h5 className="font-semibold text-violet-500 mb-3 flex items-center">
            <Icon name="DollarSign" size={18} className="mr-2" />
            KPIs Exit Clave
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Exit Valuation:</span>
              <span className="text-violet-500 font-medium">80% ($100M+ target)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Acquisition Ready:</span>
              <span className="text-neon-green font-medium">60% (Tier 1 status)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">IPO Preparation:</span>
              <span className="text-violet-500 font-medium">45% (compliance)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Stakeholder Alignment:</span>
              <span className="text-warning-dark font-medium">35% (100% target)</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h5 className="font-semibold text-warning-dark mb-3 flex items-center">
            <Icon name="AlertTriangle" size={18} className="mr-2" />
            Alertas de Exit
          </h5>
          <div className="space-y-2 text-xs text-text-dark-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-violet-500" />
              <span>Valuation optimization en trayectoria $100M+</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-warning-dark" />
              <span>Acquisition readiness requiere aceleración</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-neon-green" />
              <span>IPO compliance en progreso steady</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-violet-500" />
              <span>Stakeholder alignment strategy activa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Excellence */}
      <div className="mt-6 p-4 bg-gradient-to-r from-violet-500/10 to-violet-400/10 border border-violet-500/30 rounded-neumorphic">
        <h5 className="font-semibold text-text-dark-primary mb-3 flex items-center">
          <Icon name="Target" size={18} className="mr-2 text-violet-500" />
          Exit Excellence Metrics
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-neon-green">$100M+</div>
            <div className="text-xs text-text-dark-muted">Exit Valuation</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-violet-500">Tier 1</div>
            <div className="text-xs text-text-dark-muted">Acquirer Ready</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning-dark">IPO</div>
            <div className="text-xs text-text-dark-muted">Compliance</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-violet-500">100%</div>
            <div className="text-xs text-text-dark-muted">Stakeholder Buy-in</div>
          </div>
        </div>
      </div>

      {/* Exit Best Practices */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-violet-500/10 border border-violet-500/30 rounded-neumorphic">
          <h6 className="font-semibold text-violet-500 mb-2 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2" />
            Excelencia en Exit
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Exit timing strategy optimal</li>
            <li>• Valuation multiple maximization</li>
            <li>• Due diligence preparation completa</li>
            <li>• Stakeholder communication excellence</li>
          </ul>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h6 className="font-semibold text-warning-dark mb-2 flex items-center">
            <Icon name="Building" size={16} className="mr-2" />
            Acquisition & IPO Strategy
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Financial audit readiness 24/7</li>
            <li>• SEC compliance y reporting</li>
            <li>• Investor relations optimization</li>
            <li>• Board alignment y governance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExitTracker; 