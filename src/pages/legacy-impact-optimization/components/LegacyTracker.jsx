import React from 'react';
import Icon from '../../../components/AppIcon';

const LegacyTracker = ({ milestones = [] }) => {
  const getMilestoneIcon = (milestoneId) => {
    const icons = {
      'legacy-impact-million-lives': 'Star',
      'sustainability-carbon-negative': 'Leaf',
      'community-global-network': 'Heart',
      'knowledge-transfer-perpetual': 'BookOpen'
    };
    return icons[milestoneId] || 'Crown';
  };

  const getMilestoneStatusColor = (progress) => {
    if (progress >= 100) return 'text-neon-green';
    if (progress >= 75) return 'text-amber-500';
    if (progress >= 50) return 'text-warning-dark';
    if (progress > 0) return 'text-yellow-500';
    return 'text-text-dark-muted';
  };

  const getMilestoneProgressColor = (progress) => {
    if (progress >= 100) return 'from-neon-green to-emerald-400';
    if (progress >= 75) return 'from-amber-500 to-amber-400';
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
    if (daysUntil <= 90) return { label: 'Próximo', color: 'text-amber-500', bgColor: 'bg-amber-500/20' };
    return { label: 'Planificado', color: 'text-neon-green', bgColor: 'bg-neon-green/20' };
  };

  const getLegacyComplexity = (milestoneId) => {
    const complexities = {
      'legacy-impact-million-lives': 'Extrema',
      'sustainability-carbon-negative': 'Muy Alta',
      'community-global-network': 'Alta',
      'knowledge-transfer-perpetual': 'Extrema'
    };
    return complexities[milestoneId] || 'Alta';
  };

  const getLegacyRecommendation = (milestoneId) => {
    const recommendations = {
      'legacy-impact-million-lives': 'Enfoque en impact measurement sistemático, scalable solutions y social innovation para maximizar vidas transformadas.',
      'sustainability-carbon-negative': 'Carbon offset programs, renewable energy transition y circular economy implementation para neutralidad climática.',
      'community-global-network': 'Community engagement strategies, global outreach programs y ambassador networks para growth exponencial.',
      'knowledge-transfer-perpetual': 'Educational platform development, mentorship programs y open source initiatives para knowledge perpetuation.'
    };
    return recommendations[milestoneId] || 'Mantén enfoque en impact optimization, sustainability excellence y community building para legacy perpetuo.';
  };

  if (milestones.length === 0) {
    return (
      <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
        <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
          <Icon name="Heart" size={24} className="mr-3 text-amber-500" />
          Seguimiento de Milestones de Legacy
        </h3>
        
        <div className="text-center py-12">
          <Icon name="Crown" size={48} className="text-text-dark-muted mb-4 mx-auto" />
          <h4 className="text-lg font-semibold text-text-dark-primary mb-2">
            No hay milestones de legacy definidos
          </h4>
          <p className="text-text-dark-secondary">
            Los hitos de legacy aparecerán aquí una vez configurados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
      <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
        <Icon name="Heart" size={24} className="mr-3 text-amber-500" />
        Seguimiento de Milestones de Legacy
      </h3>
      
      <p className="text-text-dark-secondary mb-6">
        Monitorea el progreso hacia el legado perpetuo e impacto duradero que trascienda generaciones
      </p>

      <div className="space-y-6">
        {milestones.map((milestone) => {
          const daysUntil = getDaysUntilTarget(milestone.targetDate);
          const urgency = getUrgencyStatus(daysUntil);
          const complexity = getLegacyComplexity(milestone.id);
          const recommendation = getLegacyRecommendation(milestone.id);
          
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

                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-500">
                        Complejidad {complexity}
                      </div>

                      {milestone.metric && (
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-neon-green/20 text-neon-green">
                          {milestone.metric}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-dark-secondary">Progreso Legacy</span>
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
              
              {/* Legacy Milestone Details */}
              <div className="mt-4 pt-4 border-t border-slate-600">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-text-dark-muted">Estado Legacy:</span>
                    <span className={`ml-2 font-medium ${getMilestoneStatusColor(milestone.progress)}`}>
                      {milestone.progress >= 100 ? 'Immortalized' :
                       milestone.progress >= 75 ? 'Transcending' :
                       milestone.progress >= 50 ? 'Building' :
                       milestone.progress > 0 ? 'Creating' : 'Visioning'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Prioridad Impact:</span>
                    <span className={`ml-2 font-medium ${
                      daysUntil < 0 ? 'text-error-dark' :
                      daysUntil <= 30 ? 'text-warning-dark' :
                      daysUntil <= 90 ? 'text-amber-500' : 'text-neon-green'
                    }`}>
                      {daysUntil < 0 ? 'Crítico' :
                       daysUntil <= 30 ? 'Alto' :
                       daysUntil <= 90 ? 'Medio' : 'Bajo'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Tipo:</span>
                    <span className="ml-2 font-medium text-amber-500">
                      Legacy Impact
                    </span>
                  </div>
                </div>

                {/* Legacy Recommendation Section */}
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-neumorphic">
                  <div className="flex items-start space-x-2">
                    <Icon name="Crown" size={16} className="text-amber-500 mt-0.5" />
                    <div className="text-xs text-text-dark-secondary">
                      <strong className="text-amber-500">Recomendación Legacy:</strong> {recommendation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legacy Summary Stats */}
      <div className="mt-8 pt-6 border-t border-slate-600">
        <h4 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2 text-amber-500" />
          Resumen de Legacy Impact
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">
              {milestones.filter(m => m.progress >= 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">Inmortalizados</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-amber-500 mb-1">
              {milestones.filter(m => m.progress > 0 && m.progress < 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">En Construcción</div>
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
            <span className="text-sm text-text-dark-secondary">Legacy Progress General</span>
            <span className="text-sm font-medium text-amber-500">
              {Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%
            </span>
          </div>
          <div className="w-full bg-dark-surface/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-amber-500 to-amber-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Legacy Performance Dashboard */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-neumorphic">
          <h5 className="font-semibold text-amber-500 mb-3 flex items-center">
            <Icon name="Star" size={18} className="mr-2" />
            KPIs Legacy Clave
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Impact Lives:</span>
              <span className="text-amber-500 font-medium">85% (1M+ target)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Carbon Negative:</span>
              <span className="text-neon-green font-medium">70% (neutral status)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Global Community:</span>
              <span className="text-amber-500 font-medium">55% (100K network)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Knowledge Transfer:</span>
              <span className="text-warning-dark font-medium">40% (perpetual system)</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h5 className="font-semibold text-warning-dark mb-3 flex items-center">
            <Icon name="AlertTriangle" size={18} className="mr-2" />
            Alertas de Legacy
          </h5>
          <div className="space-y-2 text-xs text-text-dark-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-amber-500" />
              <span>Impact scaling acelerando hacia 1M+ vidas</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-warning-dark" />
              <span>Carbon neutral transition requiere velocidad</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-neon-green" />
              <span>Community growth exponencial en progreso</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-amber-500" />
              <span>Knowledge platform foundation establecida</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legacy Excellence */}
      <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 to-amber-400/10 border border-amber-500/30 rounded-neumorphic">
        <h5 className="font-semibold text-text-dark-primary mb-3 flex items-center">
          <Icon name="Crown" size={18} className="mr-2 text-amber-500" />
          Legacy Excellence Metrics
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-neon-green">1M+</div>
            <div className="text-xs text-text-dark-muted">Lives Impacted</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-amber-500">-100%</div>
            <div className="text-xs text-text-dark-muted">Carbon Footprint</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning-dark">100K+</div>
            <div className="text-xs text-text-dark-muted">Global Community</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-amber-500">∞</div>
            <div className="text-xs text-text-dark-muted">Knowledge Legacy</div>
          </div>
        </div>
      </div>

      {/* Legacy Best Practices */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-neumorphic">
          <h6 className="font-semibold text-amber-500 mb-2 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2" />
            Excelencia en Legacy
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Impact measurement sistemático</li>
            <li>• Sustainability carbon negative</li>
            <li>• Community building global</li>
            <li>• Knowledge transfer perpetuo</li>
          </ul>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h6 className="font-semibold text-warning-dark mb-2 flex items-center">
            <Icon name="Leaf" size={16} className="mr-2" />
            Sustainability & Impact
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Carbon offset programs activos</li>
            <li>• Renewable energy transition</li>
            <li>• Social innovation scaling</li>
            <li>• Educational platform development</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LegacyTracker; 