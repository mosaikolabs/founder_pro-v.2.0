import React from 'react';
import Icon from '../../../components/AppIcon';

const ScalingTracker = ({ milestones = [] }) => {
  const getMilestoneIcon = (milestoneId) => {
    const icons = {
      'revenue-scaling-10x': 'TrendingUp',
      'team-scaling-100-people': 'Users',
      'performance-optimization-99uptime': 'Zap',
      'global-scaling-multi-region': 'Globe'
    };
    return icons[milestoneId] || 'BarChart';
  };

  const getMilestoneStatusColor = (progress) => {
    if (progress >= 100) return 'text-neon-green';
    if (progress >= 75) return 'text-emerald-500';
    if (progress >= 50) return 'text-warning-dark';
    if (progress > 0) return 'text-yellow-500';
    return 'text-text-dark-muted';
  };

  const getMilestoneProgressColor = (progress) => {
    if (progress >= 100) return 'from-neon-green to-emerald-400';
    if (progress >= 75) return 'from-emerald-500 to-emerald-400';
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
    if (daysUntil <= 90) return { label: 'Próximo', color: 'text-emerald-500', bgColor: 'bg-emerald-500/20' };
    return { label: 'Planificado', color: 'text-neon-green', bgColor: 'bg-neon-green/20' };
  };

  const getScalingComplexity = (milestoneId) => {
    const complexities = {
      'revenue-scaling-10x': 'Extrema',
      'team-scaling-100-people': 'Muy Alta',
      'performance-optimization-99uptime': 'Alta',
      'global-scaling-multi-region': 'Extrema'
    };
    return complexities[milestoneId] || 'Alta';
  };

  const getScalingRecommendation = (milestoneId) => {
    const recommendations = {
      'revenue-scaling-10x': 'Enfoque en product-market fit optimization, sales automation scaling y customer acquisition cost optimization.',
      'team-scaling-100-people': 'Systematic hiring processes, leadership development programs y organizational structure optimization.',
      'performance-optimization-99uptime': 'Infrastructure monitoring 24/7, automated scaling policies y performance bottleneck elimination.',
      'global-scaling-multi-region': 'Multi-region deployment strategy, latency optimization y compliance management internacional.'
    };
    return recommendations[milestoneId] || 'Mantén enfoque en scaling efficiency, performance optimization y sustainable growth strategies.';
  };

  if (milestones.length === 0) {
    return (
      <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
        <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
          <Icon name="BarChart" size={24} className="mr-3 text-emerald-500" />
          Seguimiento de Milestones de Scaling
        </h3>
        
        <div className="text-center py-12">
          <Icon name="TrendingUp" size={48} className="text-text-dark-muted mb-4 mx-auto" />
          <h4 className="text-lg font-semibold text-text-dark-primary mb-2">
            No hay milestones de scaling definidos
          </h4>
          <p className="text-text-dark-secondary">
            Los hitos de scaling aparecerán aquí una vez configurados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
      <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
        <Icon name="BarChart" size={24} className="mr-3 text-emerald-500" />
        Seguimiento de Milestones de Scaling
      </h3>
      
      <p className="text-text-dark-secondary mb-6">
        Monitorea el progreso hacia el scaling exponencial y growth optimization para tu startup
      </p>

      <div className="space-y-6">
        {milestones.map((milestone) => {
          const daysUntil = getDaysUntilTarget(milestone.targetDate);
          const urgency = getUrgencyStatus(daysUntil);
          const complexity = getScalingComplexity(milestone.id);
          const recommendation = getScalingRecommendation(milestone.id);
          
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

                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-500">
                        Complejidad {complexity}
                      </div>

                      {milestone.metric && (
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-neon-green/20 text-neon-green">
                          {milestone.metric}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-dark-secondary">Progreso Scaling</span>
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
              
              {/* Scaling Milestone Details */}
              <div className="mt-4 pt-4 border-t border-slate-600">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-text-dark-muted">Estado Scaling:</span>
                    <span className={`ml-2 font-medium ${getMilestoneStatusColor(milestone.progress)}`}>
                      {milestone.progress >= 100 ? 'Escalado' :
                       milestone.progress >= 75 ? 'Optimizando' :
                       milestone.progress >= 50 ? 'Implementando' :
                       milestone.progress > 0 ? 'Iniciando' : 'Planeando'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Prioridad Growth:</span>
                    <span className={`ml-2 font-medium ${
                      daysUntil < 0 ? 'text-error-dark' :
                      daysUntil <= 30 ? 'text-warning-dark' :
                      daysUntil <= 90 ? 'text-emerald-500' : 'text-neon-green'
                    }`}>
                      {daysUntil < 0 ? 'Crítico' :
                       daysUntil <= 30 ? 'Alto' :
                       daysUntil <= 90 ? 'Medio' : 'Bajo'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Tipo:</span>
                    <span className="ml-2 font-medium text-emerald-500">
                      Growth Scaling
                    </span>
                  </div>
                </div>

                {/* Scaling Recommendation Section */}
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-neumorphic">
                  <div className="flex items-start space-x-2">
                    <Icon name="TrendingUp" size={16} className="text-emerald-500 mt-0.5" />
                    <div className="text-xs text-text-dark-secondary">
                      <strong className="text-emerald-500">Recomendación Scaling:</strong> {recommendation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Scaling Summary Stats */}
      <div className="mt-8 pt-6 border-t border-slate-600">
        <h4 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2 text-emerald-500" />
          Resumen de Scaling
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">
              {milestones.filter(m => m.progress >= 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">Escalados</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-emerald-500 mb-1">
              {milestones.filter(m => m.progress > 0 && m.progress < 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">En Scaling</div>
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
            <span className="text-sm text-text-dark-secondary">Scaling Progress General</span>
            <span className="text-sm font-medium text-emerald-500">
              {Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%
            </span>
          </div>
          <div className="w-full bg-dark-surface/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Scaling Performance Dashboard */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-neumorphic">
          <h5 className="font-semibold text-emerald-500 mb-3 flex items-center">
            <Icon name="BarChart" size={18} className="mr-2" />
            KPIs Scaling Clave
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Revenue Growth:</span>
              <span className="text-emerald-500 font-medium">75% (10x target)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Team Scaling:</span>
              <span className="text-neon-green font-medium">50% (100+ people)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Performance:</span>
              <span className="text-emerald-500 font-medium">40% (99.9% uptime)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Global Expansion:</span>
              <span className="text-warning-dark font-medium">25% (5 regions)</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h5 className="font-semibold text-warning-dark mb-3 flex items-center">
            <Icon name="AlertTriangle" size={18} className="mr-2" />
            Alertas de Scaling
          </h5>
          <div className="space-y-2 text-xs text-text-dark-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-emerald-500" />
              <span>Revenue scaling en trayectoria positiva</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-warning-dark" />
              <span>Team hiring velocity requiere aceleración</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-neon-green" />
              <span>Performance optimization en progreso</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-emerald-500" />
              <span>Infrastructure auto-scaling configurado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scaling Excellence */}
      <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-400/10 border border-emerald-500/30 rounded-neumorphic">
        <h5 className="font-semibold text-text-dark-primary mb-3 flex items-center">
          <Icon name="TrendingUp" size={18} className="mr-2 text-emerald-500" />
          Scaling Excellence Metrics
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-neon-green">10x</div>
            <div className="text-xs text-text-dark-muted">Revenue Target</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-500">100+</div>
            <div className="text-xs text-text-dark-muted">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning-dark">99.9%</div>
            <div className="text-xs text-text-dark-muted">System Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-500">5+</div>
            <div className="text-xs text-text-dark-muted">Global Regions</div>
          </div>
        </div>
      </div>

      {/* Scaling Best Practices */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-neumorphic">
          <h6 className="font-semibold text-emerald-500 mb-2 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2" />
            Excelencia en Scaling
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Data-driven growth optimization</li>
            <li>• Systematic team scaling processes</li>
            <li>• Infrastructure auto-scaling policies</li>
            <li>• Performance monitoring 24/7</li>
          </ul>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h6 className="font-semibold text-warning-dark mb-2 flex items-center">
            <Icon name="Zap" size={16} className="mr-2" />
            Performance Optimization
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Latency optimization global</li>
            <li>• Load balancing intelligent</li>
            <li>• Database scaling horizontal</li>
            <li>• CDN optimization multi-region</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScalingTracker; 