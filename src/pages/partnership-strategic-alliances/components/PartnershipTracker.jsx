import React from 'react';
import Icon from '../../../components/AppIcon';

const PartnershipTracker = ({ milestones = [] }) => {
  const getMilestoneIcon = (milestoneId) => {
    const icons = {
      'strategic-partnership-tier1': 'Handshake',
      'channel-partner-network': 'Globe',
      'ecosystem-influence-leadership': 'Network',
      'global-alliance-expansion': 'Building'
    };
    return icons[milestoneId] || 'Handshake';
  };

  const getMilestoneStatusColor = (progress) => {
    if (progress >= 100) return 'text-neon-green';
    if (progress >= 75) return 'text-cyan-500';
    if (progress >= 50) return 'text-warning-dark';
    if (progress > 0) return 'text-yellow-500';
    return 'text-text-dark-muted';
  };

  const getMilestoneProgressColor = (progress) => {
    if (progress >= 100) return 'from-neon-green to-emerald-400';
    if (progress >= 75) return 'from-cyan-500 to-cyan-400';
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
    if (daysUntil <= 90) return { label: 'Próximo', color: 'text-cyan-500', bgColor: 'bg-cyan-500/20' };
    return { label: 'Planificado', color: 'text-neon-green', bgColor: 'bg-neon-green/20' };
  };

  const getPartnershipComplexity = (milestoneId) => {
    const complexities = {
      'strategic-partnership-tier1': 'Muy Alta',
      'channel-partner-network': 'Alta',
      'ecosystem-influence-leadership': 'Media',
      'global-alliance-expansion': 'Extrema'
    };
    return complexities[milestoneId] || 'Media';
  };

  const getPartnershipRecommendation = (milestoneId) => {
    const recommendations = {
      'strategic-partnership-tier1': 'Enfoque en value proposition alignment, win-win structures y executive relationship building con Tier 1 partners.',
      'channel-partner-network': 'Channel enablement program, partner portal development y revenue share optimization para activación efectiva.',
      'ecosystem-influence-leadership': 'Thought leadership content, ecosystem events participation y community building para influencia de mercado.',
      'global-alliance-expansion': 'International partner strategy, cross-border legal frameworks y cultural adaptation para expansión global.'
    };
    return recommendations[milestoneId] || 'Mantén enfoque en partnership value creation, alliance management y ecosystem development estratégico.';
  };

  if (milestones.length === 0) {
    return (
      <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
        <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
          <Icon name="Network" size={24} className="mr-3 text-cyan-500" />
          Seguimiento de Milestones de Partnership
        </h3>
        
        <div className="text-center py-12">
          <Icon name="Handshake" size={48} className="text-text-dark-muted mb-4 mx-auto" />
          <h4 className="text-lg font-semibold text-text-dark-primary mb-2">
            No hay milestones de partnership definidos
          </h4>
          <p className="text-text-dark-secondary">
            Los hitos de partnerships aparecerán aquí una vez configurados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
      <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
        <Icon name="Network" size={24} className="mr-3 text-cyan-500" />
        Seguimiento de Milestones de Partnership
      </h3>
      
      <p className="text-text-dark-secondary mb-6">
        Monitorea el progreso hacia partnerships estratégicos y alianzas que aceleren el crecimiento de tu startup
      </p>

      <div className="space-y-6">
        {milestones.map((milestone) => {
          const daysUntil = getDaysUntilTarget(milestone.targetDate);
          const urgency = getUrgencyStatus(daysUntil);
          const complexity = getPartnershipComplexity(milestone.id);
          const recommendation = getPartnershipRecommendation(milestone.id);
          
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

                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-500">
                        Complejidad {complexity}
                      </div>

                      {milestone.metric && (
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-neon-green/20 text-neon-green">
                          {milestone.metric}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-dark-secondary">Progreso Partnership</span>
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
              
              {/* Partnership Milestone Details */}
              <div className="mt-4 pt-4 border-t border-slate-600">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-text-dark-muted">Estado Partnership:</span>
                    <span className={`ml-2 font-medium ${getMilestoneStatusColor(milestone.progress)}`}>
                      {milestone.progress >= 100 ? 'Establecido' :
                       milestone.progress >= 75 ? 'Negociando' :
                       milestone.progress >= 50 ? 'Validando' :
                       milestone.progress > 0 ? 'Explorando' : 'Identificando'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Prioridad Alianza:</span>
                    <span className={`ml-2 font-medium ${
                      daysUntil < 0 ? 'text-error-dark' :
                      daysUntil <= 30 ? 'text-warning-dark' :
                      daysUntil <= 90 ? 'text-cyan-500' : 'text-neon-green'
                    }`}>
                      {daysUntil < 0 ? 'Crítico' :
                       daysUntil <= 30 ? 'Alto' :
                       daysUntil <= 90 ? 'Medio' : 'Bajo'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Tipo:</span>
                    <span className="ml-2 font-medium text-cyan-500">
                      Strategic Alliance
                    </span>
                  </div>
                </div>

                {/* Partnership Recommendation Section */}
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-neumorphic">
                  <div className="flex items-start space-x-2">
                    <Icon name="Handshake" size={16} className="text-cyan-500 mt-0.5" />
                    <div className="text-xs text-text-dark-secondary">
                      <strong className="text-cyan-500">Recomendación Partnership:</strong> {recommendation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Partnership Summary Stats */}
      <div className="mt-8 pt-6 border-t border-slate-600">
        <h4 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2 text-cyan-500" />
          Resumen de Partnerships
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">
              {milestones.filter(m => m.progress >= 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">Establecidos</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-cyan-500 mb-1">
              {milestones.filter(m => m.progress > 0 && m.progress < 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">En Negociación</div>
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
            <span className="text-sm text-text-dark-secondary">Partnership Progress General</span>
            <span className="text-sm font-medium text-cyan-500">
              {Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%
            </span>
          </div>
          <div className="w-full bg-dark-surface/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Partnership Performance Dashboard */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-neumorphic">
          <h5 className="font-semibold text-cyan-500 mb-3 flex items-center">
            <Icon name="Network" size={18} className="mr-2" />
            KPIs Partnership Clave
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Tier 1 Progress:</span>
              <span className="text-cyan-500 font-medium">70% (3+ partners)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Channel Network:</span>
              <span className="text-neon-green font-medium">10+ active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Market Influence:</span>
              <span className="text-cyan-500 font-medium">30% (50% target)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Global Expansion:</span>
              <span className="text-warning-dark font-medium">20% (5 countries)</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h5 className="font-semibold text-warning-dark mb-3 flex items-center">
            <Icon name="AlertTriangle" size={18} className="mr-2" />
            Alertas de Partnership
          </h5>
          <div className="space-y-2 text-xs text-text-dark-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-cyan-500" />
              <span>Tier 1 negotiations en progreso avanzado</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-warning-dark" />
              <span>Channel activation requiere aceleración</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-neon-green" />
              <span>Ecosystem engagement creciendo steady</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-cyan-500" />
              <span>Global expansion strategy definida</span>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Excellence */}
      <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-cyan-400/10 border border-cyan-500/30 rounded-neumorphic">
        <h5 className="font-semibold text-text-dark-primary mb-3 flex items-center">
          <Icon name="Handshake" size={18} className="mr-2 text-cyan-500" />
          Partnership Excellence Metrics
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-neon-green">3+</div>
            <div className="text-xs text-text-dark-muted">Tier 1 Partners</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-cyan-500">10+</div>
            <div className="text-xs text-text-dark-muted">Active Channels</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning-dark">30%</div>
            <div className="text-xs text-text-dark-muted">Partner Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-cyan-500">50%</div>
            <div className="text-xs text-text-dark-muted">Market Awareness</div>
          </div>
        </div>
      </div>

      {/* Partnership Best Practices */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-neumorphic">
          <h6 className="font-semibold text-cyan-500 mb-2 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2" />
            Excelencia en Partnerships
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Value proposition alignment strategic</li>
            <li>• Win-win partnership structures</li>
            <li>• Executive relationship building</li>
            <li>• Ecosystem thought leadership</li>
          </ul>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h6 className="font-semibold text-warning-dark mb-2 flex items-center">
            <Icon name="Building" size={16} className="mr-2" />
            Alliance Management Strategy
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Channel enablement programs</li>
            <li>• Partner portal optimization</li>
            <li>• Revenue share optimization</li>
            <li>• Cross-border expansion planning</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PartnershipTracker; 