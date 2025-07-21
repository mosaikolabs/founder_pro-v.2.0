import React from 'react';
import Icon from '../../../components/AppIcon';

const TechTracker = ({ milestones = [] }) => {
  const getMilestoneIcon = (milestoneId) => {
    const icons = {
      'mvp-launch-ready': 'Rocket',
      'production-stable': 'Server',
      'scalable-architecture': 'Cpu',
      'enterprise-ready': 'Building'
    };
    return icons[milestoneId] || 'Monitor';
  };

  const getMilestoneStatusColor = (progress) => {
    if (progress >= 100) return 'text-neon-green';
    if (progress >= 75) return 'text-blue-500';
    if (progress >= 50) return 'text-warning-dark';
    if (progress > 0) return 'text-yellow-500';
    return 'text-text-dark-muted';
  };

  const getMilestoneProgressColor = (progress) => {
    if (progress >= 100) return 'from-neon-green to-emerald-400';
    if (progress >= 75) return 'from-blue-500 to-blue-400';
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
    if (daysUntil <= 90) return { label: 'Próximo', color: 'text-blue-500', bgColor: 'bg-blue-500/20' };
    return { label: 'Planificado', color: 'text-neon-green', bgColor: 'bg-neon-green/20' };
  };

  const getTechComplexity = (milestoneId) => {
    const complexities = {
      'mvp-launch-ready': 'Media',
      'production-stable': 'Alta',
      'scalable-architecture': 'Muy Alta',
      'enterprise-ready': 'Extrema'
    };
    return complexities[milestoneId] || 'Media';
  };

  const getTechRecommendation = (milestoneId) => {
    const recommendations = {
      'mvp-launch-ready': 'Enfócate en funcionalidad core y deploy básico. Prioriza velocidad sobre perfección.',
      'production-stable': 'Implementa monitoring, logging y backup. Asegura alta disponibilidad.',
      'scalable-architecture': 'Considera microservicios, CDN y caching. Planifica para crecimiento exponencial.',
      'enterprise-ready': 'Cumple estándares de seguridad enterprise, auditorías y compliance.'
    };
    return recommendations[milestoneId] || 'Mantén las mejores prácticas de desarrollo.';
  };

  if (milestones.length === 0) {
    return (
      <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
        <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
          <Icon name="Monitor" size={24} className="mr-3 text-blue-500" />
          Seguimiento de Milestones Tecnológicos
        </h3>
        
        <div className="text-center py-12">
          <Icon name="Code" size={48} className="text-text-dark-muted mb-4 mx-auto" />
          <h4 className="text-lg font-semibold text-text-dark-primary mb-2">
            No hay milestones tecnológicos definidos
          </h4>
          <p className="text-text-dark-secondary">
            Los milestones de desarrollo aparecerán aquí una vez configurados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
      <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
        <Icon name="Monitor" size={24} className="mr-3 text-blue-500" />
        Seguimiento de Milestones Tecnológicos
      </h3>
      
      <p className="text-text-dark-secondary mb-6">
        Monitorea el progreso hacia los hitos tecnológicos críticos para el desarrollo de tu producto
      </p>

      <div className="space-y-6">
        {milestones.map((milestone) => {
          const daysUntil = getDaysUntilTarget(milestone.targetDate);
          const urgency = getUrgencyStatus(daysUntil);
          const complexity = getTechComplexity(milestone.id);
          const recommendation = getTechRecommendation(milestone.id);
          
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

                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-500">
                        Complejidad {complexity}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-dark-secondary">Progreso Desarrollo</span>
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
              
              {/* Tech Milestone Details */}
              <div className="mt-4 pt-4 border-t border-slate-600">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-text-dark-muted">Estado Dev:</span>
                    <span className={`ml-2 font-medium ${getMilestoneStatusColor(milestone.progress)}`}>
                      {milestone.progress >= 100 ? 'Desplegado' :
                       milestone.progress >= 75 ? 'Testing' :
                       milestone.progress >= 50 ? 'Desarrollo' :
                       milestone.progress > 0 ? 'Planificación' : 'Pendiente'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Prioridad Tech:</span>
                    <span className={`ml-2 font-medium ${
                      daysUntil < 0 ? 'text-error-dark' :
                      daysUntil <= 30 ? 'text-warning-dark' :
                      daysUntil <= 90 ? 'text-blue-500' : 'text-neon-green'
                    }`}>
                      {daysUntil < 0 ? 'Crítico' :
                       daysUntil <= 30 ? 'Alto' :
                       daysUntil <= 90 ? 'Medio' : 'Bajo'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Tipo:</span>
                    <span className="ml-2 font-medium text-blue-500">
                      Tecnológico
                    </span>
                  </div>
                </div>

                {/* Tech Recommendation Section */}
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-neumorphic">
                  <div className="flex items-start space-x-2">
                    <Icon name="Code" size={16} className="text-blue-500 mt-0.5" />
                    <div className="text-xs text-text-dark-secondary">
                      <strong className="text-blue-500">Recomendación Tech:</strong> {recommendation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Tech Summary Stats */}
      <div className="mt-8 pt-6 border-t border-slate-600">
        <h4 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2 text-blue-500" />
          Resumen de Desarrollo
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">
              {milestones.filter(m => m.progress >= 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">Desplegados</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-blue-500 mb-1">
              {milestones.filter(m => m.progress > 0 && m.progress < 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">En Desarrollo</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-warning-dark mb-1">
              {milestones.filter(m => getDaysUntilTarget(m.targetDate) <= 30 && getDaysUntilTarget(m.targetDate) > 0).length}
            </div>
            <div className="text-xs text-text-dark-muted">Releases (30d)</div>
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
            <span className="text-sm text-text-dark-secondary">Progreso General de Desarrollo</span>
            <span className="text-sm font-medium text-blue-500">
              {Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%
            </span>
          </div>
          <div className="w-full bg-dark-surface/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Development Best Practices */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-blue-400/10 border border-blue-500/30 rounded-neumorphic">
        <h5 className="font-semibold text-text-dark-primary mb-3 flex items-center">
          <Icon name="Lightbulb" size={18} className="mr-2 text-blue-500" />
          Mejores Prácticas de Desarrollo
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-text-dark-secondary">
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={14} className="text-blue-500 mt-0.5" />
            <span>Implementa CI/CD desde MVP</span>
          </div>
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={14} className="text-blue-500 mt-0.5" />
            <span>Monitorea performance en producción</span>
          </div>
                      <div className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={14} className="text-blue-500 mt-0.5" />
              <span>Mantén cobertura de tests &gt;80%</span>
            </div>
          <div className="flex items-start space-x-2">
            <Icon name="CheckCircle" size={14} className="text-blue-500 mt-0.5" />
            <span>Documenta APIs y arquitectura</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechTracker; 