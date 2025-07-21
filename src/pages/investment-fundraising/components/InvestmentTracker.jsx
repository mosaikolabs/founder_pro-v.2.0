import React from 'react';
import Icon from '../../../components/AppIcon';

const InvestmentTracker = ({ milestones = [] }) => {
  const getMilestoneIcon = (milestoneId) => {
    const icons = {
      'seed-round-completion': 'PiggyBank',
      'investor-pipeline-development': 'Users',
      'product-market-fit-validation': 'Target',
      'series-a-readiness': 'TrendingUp'
    };
    return icons[milestoneId] || 'Banknote';
  };

  const getMilestoneStatusColor = (progress) => {
    if (progress >= 100) return 'text-neon-green';
    if (progress >= 75) return 'text-purple-500';
    if (progress >= 50) return 'text-warning-dark';
    if (progress > 0) return 'text-yellow-500';
    return 'text-text-dark-muted';
  };

  const getMilestoneProgressColor = (progress) => {
    if (progress >= 100) return 'from-neon-green to-emerald-400';
    if (progress >= 75) return 'from-purple-500 to-purple-400';
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
    if (daysUntil <= 90) return { label: 'Próximo', color: 'text-purple-500', bgColor: 'bg-purple-500/20' };
    return { label: 'Planificado', color: 'text-neon-green', bgColor: 'bg-neon-green/20' };
  };

  const getInvestmentComplexity = (milestoneId) => {
    const complexities = {
      'seed-round-completion': 'Alta',
      'investor-pipeline-development': 'Media',
      'product-market-fit-validation': 'Muy Alta',
      'series-a-readiness': 'Extrema'
    };
    return complexities[milestoneId] || 'Media';
  };

  const getInvestmentRecommendation = (milestoneId) => {
    const recommendations = {
      'seed-round-completion': 'Enfoque en traction validation, pitch deck refinement y outreach personalizado a angel investors y early-stage VCs.',
      'investor-pipeline-development': 'Networking activo en eventos de startup, warm introductions y follow-up estratégico con investors cualificados.',
      'product-market-fit-validation': 'Métricas de retention &gt; 40%, customer feedback positivo y growth orgánico sostenible.',
      'series-a-readiness': 'ARR $2M+, unit economics positivos, equipo escalable y market expansion strategy clara.'
    };
    return recommendations[milestoneId] || 'Mantén enfoque en traction, fundraising strategy y relaciones con investors de calidad.';
  };

  if (milestones.length === 0) {
    return (
      <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
        <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
          <Icon name="TrendingUp" size={24} className="mr-3 text-purple-500" />
          Seguimiento de Milestones de Investment
        </h3>
        
        <div className="text-center py-12">
          <Icon name="PiggyBank" size={48} className="text-text-dark-muted mb-4 mx-auto" />
          <h4 className="text-lg font-semibold text-text-dark-primary mb-2">
            No hay milestones de investment definidos
          </h4>
          <p className="text-text-dark-secondary">
            Los hitos de fundraising aparecerán aquí una vez configurados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
      <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
        <Icon name="TrendingUp" size={24} className="mr-3 text-purple-500" />
        Seguimiento de Milestones de Investment
      </h3>
      
      <p className="text-text-dark-secondary mb-6">
        Monitorea el progreso hacia las metas de fundraising y investment para asegurar el crecimiento de tu startup
      </p>

      <div className="space-y-6">
        {milestones.map((milestone) => {
          const daysUntil = getDaysUntilTarget(milestone.targetDate);
          const urgency = getUrgencyStatus(daysUntil);
          const complexity = getInvestmentComplexity(milestone.id);
          const recommendation = getInvestmentRecommendation(milestone.id);
          
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

                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-500">
                        Complejidad {complexity}
                      </div>

                      {milestone.metric && (
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-neon-green/20 text-neon-green">
                          {milestone.metric}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-dark-secondary">Progreso Investment</span>
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
              
              {/* Investment Milestone Details */}
              <div className="mt-4 pt-4 border-t border-slate-600">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-text-dark-muted">Estado Fundraising:</span>
                    <span className={`ml-2 font-medium ${getMilestoneStatusColor(milestone.progress)}`}>
                      {milestone.progress >= 100 ? 'Completado' :
                       milestone.progress >= 75 ? 'Avanzado' :
                       milestone.progress >= 50 ? 'En Progreso' :
                       milestone.progress > 0 ? 'Iniciado' : 'Planeando'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Prioridad Investment:</span>
                    <span className={`ml-2 font-medium ${
                      daysUntil < 0 ? 'text-error-dark' :
                      daysUntil <= 30 ? 'text-warning-dark' :
                      daysUntil <= 90 ? 'text-purple-500' : 'text-neon-green'
                    }`}>
                      {daysUntil < 0 ? 'Crítico' :
                       daysUntil <= 30 ? 'Alto' :
                       daysUntil <= 90 ? 'Medio' : 'Bajo'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Tipo:</span>
                    <span className="ml-2 font-medium text-purple-500">
                      Fundraising
                    </span>
                  </div>
                </div>

                {/* Investment Recommendation Section */}
                <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-neumorphic">
                  <div className="flex items-start space-x-2">
                    <Icon name="PiggyBank" size={16} className="text-purple-500 mt-0.5" />
                    <div className="text-xs text-text-dark-secondary">
                      <strong className="text-purple-500">Recomendación Investment:</strong> {recommendation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Investment Summary Stats */}
      <div className="mt-8 pt-6 border-t border-slate-600">
        <h4 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2 text-purple-500" />
          Resumen de Investment
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">
              {milestones.filter(m => m.progress >= 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">Completados</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-purple-500 mb-1">
              {milestones.filter(m => m.progress > 0 && m.progress < 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">En Progreso</div>
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
            <span className="text-sm text-text-dark-secondary">Fundraising Progress General</span>
            <span className="text-sm font-medium text-purple-500">
              {Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%
            </span>
          </div>
          <div className="w-full bg-dark-surface/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Investment Performance Dashboard */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-neumorphic">
          <h5 className="font-semibold text-purple-500 mb-3 flex items-center">
            <Icon name="TrendingUp" size={18} className="mr-2" />
            KPIs Investment Clave
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Seed Round Progress:</span>
              <span className="text-purple-500 font-medium">65% ($500K)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Investor Pipeline:</span>
              <span className="text-neon-green font-medium">20+ leads</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">PMF Progress:</span>
              <span className="text-purple-500 font-medium">25% (40% target)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Serie A Readiness:</span>
              <span className="text-warning-dark font-medium">15% ($2M ARR)</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h5 className="font-semibold text-warning-dark mb-3 flex items-center">
            <Icon name="AlertTriangle" size={18} className="mr-2" />
            Alertas de Fundraising
          </h5>
          <div className="space-y-2 text-xs text-text-dark-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-purple-500" />
              <span>Pitch deck optimization en progreso</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-warning-dark" />
              <span>Pipeline investor requiere expansion</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-neon-green" />
              <span>Traction metrics mejorando constantemente</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-purple-500" />
              <span>Data room 90% completo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fundraising Excellence */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-purple-400/10 border border-purple-500/30 rounded-neumorphic">
        <h5 className="font-semibold text-text-dark-primary mb-3 flex items-center">
          <Icon name="PiggyBank" size={18} className="mr-2 text-purple-500" />
          Fundraising Excellence Metrics
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-neon-green">$500K</div>
            <div className="text-xs text-text-dark-muted">Seed Target</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-500">18mo</div>
            <div className="text-xs text-text-dark-muted">Current Runway</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning-dark">$2.5M</div>
            <div className="text-xs text-text-dark-muted">Target Valuation</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-500">20+</div>
            <div className="text-xs text-text-dark-muted">Qualified Investors</div>
          </div>
        </div>
      </div>

      {/* Investment Best Practices */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-neumorphic">
          <h6 className="font-semibold text-purple-500 mb-2 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2" />
            Excelencia en Fundraising
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Storytelling compelling y data-driven</li>
            <li>• Investor relations sistemáticas</li>
            <li>• Due diligence preparation completa</li>
            <li>• Traction validation clara</li>
          </ul>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h6 className="font-semibold text-warning-dark mb-2 flex items-center">
            <Icon name="Users" size={16} className="mr-2" />
            Investor Relations Strategy
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Warm introductions prioritarias</li>
            <li>• Follow-up personalizado y estratégico</li>
            <li>• Updates regulares a investors</li>
            <li>• Networking activo en eventos startup</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InvestmentTracker; 