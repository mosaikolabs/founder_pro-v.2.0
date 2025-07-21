import React from 'react';
import Icon from '../../../components/AppIcon';

const MarketingTracker = ({ milestones = [] }) => {
  const getMilestoneIcon = (milestoneId) => {
    const icons = {
      'first-1000-users': 'Users',
      'brand-recognition-10-percent': 'Star',
      'cac-ltv-positive-ratio': 'TrendingUp',
      'viral-coefficient-achieved': 'Share2'
    };
    return icons[milestoneId] || 'Target';
  };

  const getMilestoneStatusColor = (progress) => {
    if (progress >= 100) return 'text-neon-green';
    if (progress >= 75) return 'text-orange-500';
    if (progress >= 50) return 'text-warning-dark';
    if (progress > 0) return 'text-yellow-500';
    return 'text-text-dark-muted';
  };

  const getMilestoneProgressColor = (progress) => {
    if (progress >= 100) return 'from-neon-green to-emerald-400';
    if (progress >= 75) return 'from-orange-500 to-orange-400';
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
    if (daysUntil < 0) return { label: 'Retrasado', color: 'text-error-dark', bgColor: 'bg-error-dark/20' };
    if (daysUntil <= 30) return { label: 'Crítico', color: 'text-warning-dark', bgColor: 'bg-warning-dark/20' };
    if (daysUntil <= 90) return { label: 'Próximo', color: 'text-orange-500', bgColor: 'bg-orange-500/20' };
    return { label: 'Planificado', color: 'text-neon-green', bgColor: 'bg-neon-green/20' };
  };

  const getMarketingComplexity = (milestoneId) => {
    const complexities = {
      'first-1000-users': 'Media',
      'brand-recognition-10-percent': 'Alta',
      'cac-ltv-positive-ratio': 'Muy Alta',
      'viral-coefficient-achieved': 'Extrema'
    };
    return complexities[milestoneId] || 'Media';
  };

  const getMarketingRecommendation = (milestoneId) => {
    const recommendations = {
      'first-1000-users': 'Enfócate en canales de adquisición de bajo costo. Optimiza landing pages y onboarding.',
      'brand-recognition-10-percent': 'Invierte en brand awareness. Contenido de calidad y presencia consistente.',
      'cac-ltv-positive-ratio': 'Optimiza funnel de conversión. Mejora retention y aumenta valor por cliente.',
      'viral-coefficient-achieved': 'Implementa loops virales y referral programs. Incentiva sharing orgánico.'
    };
    return recommendations[milestoneId] || 'Mantén enfoque en métricas de crecimiento y optimización continua.';
  };

  if (milestones.length === 0) {
    return (
      <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
        <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
          <Icon name="Users" size={24} className="mr-3 text-orange-500" />
          Seguimiento de Milestones de Marketing
        </h3>
        
        <div className="text-center py-12">
          <Icon name="Target" size={48} className="text-text-dark-muted mb-4 mx-auto" />
          <h4 className="text-lg font-semibold text-text-dark-primary mb-2">
            No hay milestones de marketing definidos
          </h4>
          <p className="text-text-dark-secondary">
            Los hitos de marketing aparecerán aquí una vez configurados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
      <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
        <Icon name="Users" size={24} className="mr-3 text-orange-500" />
        Seguimiento de Milestones de Marketing
      </h3>
      
      <p className="text-text-dark-secondary mb-6">
        Monitorea el progreso hacia los hitos de marketing críticos para el crecimiento y reconocimiento de tu startup
      </p>

      <div className="space-y-6">
        {milestones.map((milestone) => {
          const daysUntil = getDaysUntilTarget(milestone.targetDate);
          const urgency = getUrgencyStatus(daysUntil);
          const complexity = getMarketingComplexity(milestone.id);
          const recommendation = getMarketingRecommendation(milestone.id);
          
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

                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-500">
                        Complejidad {complexity}
                      </div>

                      {milestone.metric && (
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-neon-green/20 text-neon-green">
                          {milestone.metric}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-dark-secondary">Progreso Marketing</span>
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
                        {Math.abs(daysUntil) === 1 ? 'día retrasado' : 'días retrasados'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Marketing Milestone Details */}
              <div className="mt-4 pt-4 border-t border-slate-600">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-text-dark-muted">Estado Campaign:</span>
                    <span className={`ml-2 font-medium ${getMilestoneStatusColor(milestone.progress)}`}>
                      {milestone.progress >= 100 ? 'Logrado' :
                       milestone.progress >= 75 ? 'Optimizando' :
                       milestone.progress >= 50 ? 'Ejecutando' :
                       milestone.progress > 0 ? 'Lanzando' : 'Planificando'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Prioridad Growth:</span>
                    <span className={`ml-2 font-medium ${
                      daysUntil < 0 ? 'text-error-dark' :
                      daysUntil <= 30 ? 'text-warning-dark' :
                      daysUntil <= 90 ? 'text-orange-500' : 'text-neon-green'
                    }`}>
                      {daysUntil < 0 ? 'Crítico' :
                       daysUntil <= 30 ? 'Alto' :
                       daysUntil <= 90 ? 'Medio' : 'Bajo'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Tipo:</span>
                    <span className="ml-2 font-medium text-orange-500">
                      Marketing
                    </span>
                  </div>
                </div>

                {/* Marketing Recommendation Section */}
                <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-neumorphic">
                  <div className="flex items-start space-x-2">
                    <Icon name="Target" size={16} className="text-orange-500 mt-0.5" />
                    <div className="text-xs text-text-dark-secondary">
                      <strong className="text-orange-500">Recomendación Growth:</strong> {recommendation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Marketing Summary Stats */}
      <div className="mt-8 pt-6 border-t border-slate-600">
        <h4 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2 text-orange-500" />
          Resumen de Crecimiento
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">
              {milestones.filter(m => m.progress >= 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">Logrados</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-orange-500 mb-1">
              {milestones.filter(m => m.progress > 0 && m.progress < 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">En Campaign</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-warning-dark mb-1">
              {milestones.filter(m => getDaysUntilTarget(m.targetDate) <= 30 && getDaysUntilTarget(m.targetDate) > 0).length}
            </div>
            <div className="text-xs text-text-dark-muted">Lanzamientos (30d)</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-error-dark mb-1">
              {milestones.filter(m => getDaysUntilTarget(m.targetDate) < 0).length}
            </div>
            <div className="text-xs text-text-dark-muted">Retrasados</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-dark-secondary">Progreso General Marketing</span>
            <span className="text-sm font-medium text-orange-500">
              {Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%
            </span>
          </div>
          <div className="w-full bg-dark-surface/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Marketing KPIs Dashboard */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-neumorphic">
          <h5 className="font-semibold text-orange-500 mb-3 flex items-center">
            <Icon name="TrendingUp" size={18} className="mr-2" />
            KPIs Clave de Marketing
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">CAC Promedio:</span>
              <span className="text-orange-500 font-medium">$45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">LTV Promedio:</span>
              <span className="text-neon-green font-medium">$180</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Conversion Rate:</span>
              <span className="text-orange-500 font-medium">3.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">K-Factor:</span>
              <span className="text-warning-dark font-medium">0.7</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h5 className="font-semibold text-warning-dark mb-3 flex items-center">
            <Icon name="AlertTriangle" size={18} className="mr-2" />
            Optimizaciones Activas
          </h5>
          <div className="space-y-2 text-xs text-text-dark-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-orange-500" />
              <span>A/B testing landing pages</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-warning-dark" />
              <span>Optimizando CAC en Facebook Ads</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-orange-500" />
              <span>Mejorando email marketing automation</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-neon-green" />
              <span>Referral program en beta</span>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Channels Performance */}
      <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-orange-400/10 border border-orange-500/30 rounded-neumorphic">
        <h5 className="font-semibold text-text-dark-primary mb-3 flex items-center">
          <Icon name="Eye" size={18} className="mr-2 text-orange-500" />
          Performance por Canal
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-neon-green">35%</div>
            <div className="text-xs text-text-dark-muted">Organic</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-500">28%</div>
            <div className="text-xs text-text-dark-muted">Paid Ads</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning-dark">22%</div>
            <div className="text-xs text-text-dark-muted">Social Media</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-500">15%</div>
            <div className="text-xs text-text-dark-muted">Referrals</div>
          </div>
        </div>
      </div>

      {/* Marketing Growth Best Practices */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-neumorphic">
          <h6 className="font-semibold text-orange-500 mb-2 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2" />
            Growth Hacks Efectivos
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Product-led growth estrategies</li>
            <li>• Viral loops y referral programs</li>
            <li>• Content marketing + SEO</li>
            <li>• Community building & engagement</li>
          </ul>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h6 className="font-semibold text-warning-dark mb-2 flex items-center">
            <Icon name="Target" size={16} className="mr-2" />
            Experimentos Activos
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Landing page variations (A/B)</li>
            <li>• Email drip campaign optimization</li>
            <li>• Social proof testimonials</li>
            <li>• Onboarding flow improvements</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MarketingTracker; 