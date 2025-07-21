import React from 'react';
import Icon from '../../../components/AppIcon';

const OperationsTracker = ({ milestones = [] }) => {
  const getMilestoneIcon = (milestoneId) => {
    const icons = {
      'support-sla-achievement': 'Clock',
      'operational-efficiency-target': 'Zap',
      'customer-satisfaction-nps': 'Heart',
      'zero-defect-quality': 'Shield'
    };
    return icons[milestoneId] || 'Settings';
  };

  const getMilestoneStatusColor = (progress) => {
    if (progress >= 100) return 'text-neon-green';
    if (progress >= 75) return 'text-indigo-500';
    if (progress >= 50) return 'text-warning-dark';
    if (progress > 0) return 'text-yellow-500';
    return 'text-text-dark-muted';
  };

  const getMilestoneProgressColor = (progress) => {
    if (progress >= 100) return 'from-neon-green to-emerald-400';
    if (progress >= 75) return 'from-indigo-500 to-indigo-400';
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
    if (daysUntil <= 90) return { label: 'Próximo', color: 'text-indigo-500', bgColor: 'bg-indigo-500/20' };
    return { label: 'Planificado', color: 'text-neon-green', bgColor: 'bg-neon-green/20' };
  };

  const getOperationsComplexity = (milestoneId) => {
    const complexities = {
      'support-sla-achievement': 'Media',
      'operational-efficiency-target': 'Alta',
      'customer-satisfaction-nps': 'Muy Alta',
      'zero-defect-quality': 'Extrema'
    };
    return complexities[milestoneId] || 'Media';
  };

  const getOperationsRecommendation = (milestoneId) => {
    const recommendations = {
      'support-sla-achievement': 'Implementa sistemas de ticketing automatizados y monitoreo en tiempo real. Establece escalaciones claras.',
      'operational-efficiency-target': 'Automatiza procesos manuales repetitivos. Implementa herramientas de workflow y KPI tracking.',
      'customer-satisfaction-nps': 'Programa de feedback continuo, customer success proactivo y mejora de experiencia end-to-end.',
      'zero-defect-quality': 'Implementa QA automatizado, testing continuo y procesos de revisión rigurosos en toda la organización.'
    };
    return recommendations[milestoneId] || 'Mantén enfoque en excelencia operacional y mejora continua de procesos.';
  };

  if (milestones.length === 0) {
    return (
      <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
        <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
          <Icon name="CheckCircle" size={24} className="mr-3 text-indigo-500" />
          Seguimiento de Milestones Operacionales
        </h3>
        
        <div className="text-center py-12">
          <Icon name="Settings" size={48} className="text-text-dark-muted mb-4 mx-auto" />
          <h4 className="text-lg font-semibold text-text-dark-primary mb-2">
            No hay milestones operacionales definidos
          </h4>
          <p className="text-text-dark-secondary">
            Los hitos operacionales aparecerán aquí una vez configurados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
      <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
        <Icon name="CheckCircle" size={24} className="mr-3 text-indigo-500" />
        Seguimiento de Milestones Operacionales
      </h3>
      
      <p className="text-text-dark-secondary mb-6">
        Monitorea el progreso hacia la excelencia operacional y satisfaction máxima del cliente en tu startup
      </p>

      <div className="space-y-6">
        {milestones.map((milestone) => {
          const daysUntil = getDaysUntilTarget(milestone.targetDate);
          const urgency = getUrgencyStatus(daysUntil);
          const complexity = getOperationsComplexity(milestone.id);
          const recommendation = getOperationsRecommendation(milestone.id);
          
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

                      <div className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-500">
                        Complejidad {complexity}
                      </div>

                      {milestone.metric && (
                        <div className="px-2 py-1 rounded-full text-xs font-medium bg-neon-green/20 text-neon-green">
                          {milestone.metric}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-dark-secondary">Progreso Operacional</span>
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
              
              {/* Operations Milestone Details */}
              <div className="mt-4 pt-4 border-t border-slate-600">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-text-dark-muted">Estado Operacional:</span>
                    <span className={`ml-2 font-medium ${getMilestoneStatusColor(milestone.progress)}`}>
                      {milestone.progress >= 100 ? 'Optimizado' :
                       milestone.progress >= 75 ? 'Implementando' :
                       milestone.progress >= 50 ? 'Configurando' :
                       milestone.progress > 0 ? 'Iniciando' : 'Planeando'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Prioridad SLA:</span>
                    <span className={`ml-2 font-medium ${
                      daysUntil < 0 ? 'text-error-dark' :
                      daysUntil <= 30 ? 'text-warning-dark' :
                      daysUntil <= 90 ? 'text-indigo-500' : 'text-neon-green'
                    }`}>
                      {daysUntil < 0 ? 'Crítico' :
                       daysUntil <= 30 ? 'Alto' :
                       daysUntil <= 90 ? 'Medio' : 'Bajo'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Tipo:</span>
                    <span className="ml-2 font-medium text-indigo-500">
                      Operacional
                    </span>
                  </div>
                </div>

                {/* Operations Recommendation Section */}
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-neumorphic">
                  <div className="flex items-start space-x-2">
                    <Icon name="Settings" size={16} className="text-indigo-500 mt-0.5" />
                    <div className="text-xs text-text-dark-secondary">
                      <strong className="text-indigo-500">Recomendación Operacional:</strong> {recommendation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Operations Summary Stats */}
      <div className="mt-8 pt-6 border-t border-slate-600">
        <h4 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2 text-indigo-500" />
          Resumen Operacional
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">
              {milestones.filter(m => m.progress >= 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">Optimizados</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-indigo-500 mb-1">
              {milestones.filter(m => m.progress > 0 && m.progress < 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">En Mejora</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-warning-dark mb-1">
              {milestones.filter(m => getDaysUntilTarget(m.targetDate) <= 30 && getDaysUntilTarget(m.targetDate) > 0).length}
            </div>
            <div className="text-xs text-text-dark-muted">SLA Critical (30d)</div>
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
            <span className="text-sm text-text-dark-secondary">Excelencia Operacional General</span>
            <span className="text-sm font-medium text-indigo-500">
              {Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%
            </span>
          </div>
          <div className="w-full bg-dark-surface/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Operations Performance Dashboard */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-neumorphic">
          <h5 className="font-semibold text-indigo-500 mb-3 flex items-center">
            <Icon name="CheckCircle" size={18} className="mr-2" />
            KPIs Operacionales Clave
          </h5>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Support SLA:</span>
                              <span className="text-indigo-500 font-medium">95% en &lt; 2h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Automation Rate:</span>
              <span className="text-neon-green font-medium">85%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">NPS Score:</span>
              <span className="text-indigo-500 font-medium">+72</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-dark-secondary">Quality Rate:</span>
              <span className="text-neon-green font-medium">99.9%</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h5 className="font-semibold text-warning-dark mb-3 flex items-center">
            <Icon name="AlertTriangle" size={18} className="mr-2" />
            Alertas Operacionales
          </h5>
          <div className="space-y-2 text-xs text-text-dark-secondary">
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-indigo-500" />
              <span>Sistema monitoreo SLA activo</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-warning-dark" />
              <span>3 procesos pendientes automatización</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-neon-green" />
              <span>Customer satisfaction trending up</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={8} className="text-indigo-500" />
              <span>Zero critical incidents última semana</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Success Excellence */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-500/10 to-indigo-400/10 border border-indigo-500/30 rounded-neumorphic">
        <h5 className="font-semibold text-text-dark-primary mb-3 flex items-center">
          <Icon name="Heart" size={18} className="mr-2 text-indigo-500" />
          Customer Success Excellence
        </h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-neon-green">95%</div>
            <div className="text-xs text-text-dark-muted">Customer Retention</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-indigo-500">1.8h</div>
            <div className="text-xs text-text-dark-muted">Avg Response</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning-dark">98.2%</div>
            <div className="text-xs text-text-dark-muted">Resolution Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-indigo-500">+72</div>
            <div className="text-xs text-text-dark-muted">NPS Score</div>
          </div>
        </div>
      </div>

      {/* Operations Best Practices */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-neumorphic">
          <h6 className="font-semibold text-indigo-500 mb-2 flex items-center">
            <Icon name="CheckCircle" size={16} className="mr-2" />
            Excelencia Operacional
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• Automatización inteligente de procesos</li>
            <li>• Monitoreo proactivo de SLAs</li>
            <li>• Customer success data-driven</li>
            <li>• Mejora continua sistemática</li>
          </ul>
        </div>
        
        <div className="p-4 bg-warning-dark/10 border border-warning-dark/30 rounded-neumorphic">
          <h6 className="font-semibold text-warning-dark mb-2 flex items-center">
            <Icon name="Zap" size={16} className="mr-2" />
            Optimizaciones Activas
          </h6>
          <ul className="space-y-1 text-xs text-text-dark-secondary">
            <li>• AI-powered support routing</li>
            <li>• Predictive customer health scoring</li>
            <li>• Automated workflow optimization</li>
            <li>• Real-time quality monitoring</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OperationsTracker; 