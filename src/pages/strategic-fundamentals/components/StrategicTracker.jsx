import React from 'react';
import Icon from '../../../components/AppIcon';

const StrategicTracker = ({ milestones = [] }) => {
  const getMilestoneIcon = (milestoneId) => {
    const icons = {
      'strategy-foundation': 'Target',
      'business-model-validated': 'Building',
      'market-position-defined': 'TrendingUp',
      'strategic-roadmap-complete': 'CheckCircle'
    };
    return icons[milestoneId] || 'Flag';
  };

  const getMilestoneStatusColor = (progress) => {
    if (progress >= 100) return 'text-neon-green';
    if (progress >= 75) return 'text-neon-purple';
    if (progress >= 50) return 'text-warning-dark';
    if (progress > 0) return 'text-yellow-500';
    return 'text-text-dark-muted';
  };

  const getMilestoneProgressColor = (progress) => {
    if (progress >= 100) return 'from-neon-green to-emerald-400';
    if (progress >= 75) return 'from-neon-purple to-purple-400';
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
    if (daysUntil <= 30) return { label: 'Urgente', color: 'text-warning-dark', bgColor: 'bg-warning-dark/20' };
    if (daysUntil <= 90) return { label: 'Próximo', color: 'text-neon-purple', bgColor: 'bg-neon-purple/20' };
    return { label: 'Planificado', color: 'text-neon-green', bgColor: 'bg-neon-green/20' };
  };

  if (milestones.length === 0) {
    return (
      <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
        <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
          <Icon name="Target" size={24} className="mr-3 text-neon-green" />
          Seguimiento de Milestones Estratégicos
        </h3>
        
        <div className="text-center py-12">
          <Icon name="Flag" size={48} className="text-text-dark-muted mb-4 mx-auto" />
          <h4 className="text-lg font-semibold text-text-dark-primary mb-2">
            No hay milestones definidos
          </h4>
          <p className="text-text-dark-secondary">
            Los milestones estratégicos aparecerán aquí una vez configurados
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
      <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
        <Icon name="Target" size={24} className="mr-3 text-neon-green" />
        Seguimiento de Milestones Estratégicos
      </h3>
      
      <p className="text-text-dark-secondary mb-6">
        Monitorea el progreso hacia los hitos estratégicos clave de tu startup
      </p>

      <div className="space-y-6">
        {milestones.map((milestone) => {
          const daysUntil = getDaysUntilTarget(milestone.targetDate);
          const urgency = getUrgencyStatus(daysUntil);
          
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
                          Meta: {formatDate(milestone.targetDate)}
                        </span>
                      </div>
                      
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${urgency.bgColor} ${urgency.color}`}>
                        {urgency.label}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-text-dark-secondary">Progreso</span>
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
                        {Math.abs(daysUntil) === 1 ? 'día atrasado' : 'días atrasados'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Milestone Details */}
              <div className="mt-4 pt-4 border-t border-slate-600">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-text-dark-muted">Estado:</span>
                    <span className={`ml-2 font-medium ${getMilestoneStatusColor(milestone.progress)}`}>
                      {milestone.progress >= 100 ? 'Completado' :
                       milestone.progress >= 75 ? 'Casi Completo' :
                       milestone.progress >= 50 ? 'En Progreso Avanzado' :
                       milestone.progress > 0 ? 'En Progreso' : 'Pendiente'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Criticidad:</span>
                    <span className={`ml-2 font-medium ${
                      daysUntil < 0 ? 'text-error-dark' :
                      daysUntil <= 30 ? 'text-warning-dark' :
                      daysUntil <= 90 ? 'text-neon-purple' : 'text-neon-green'
                    }`}>
                      {daysUntil < 0 ? 'Crítico' :
                       daysUntil <= 30 ? 'Alto' :
                       daysUntil <= 90 ? 'Medio' : 'Bajo'}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-text-dark-muted">Impacto:</span>
                    <span className="ml-2 font-medium text-neon-green">
                      Estratégico
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-slate-600">
        <h4 className="text-lg font-semibold text-text-dark-primary mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2 text-neon-purple" />
          Resumen de Milestones
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">
              {milestones.filter(m => m.progress >= 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">Completados</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-neon-purple mb-1">
              {milestones.filter(m => m.progress > 0 && m.progress < 100).length}
            </div>
            <div className="text-xs text-text-dark-muted">En Progreso</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-warning-dark mb-1">
              {milestones.filter(m => getDaysUntilTarget(m.targetDate) <= 30 && getDaysUntilTarget(m.targetDate) > 0).length}
            </div>
            <div className="text-xs text-text-dark-muted">Próximos (30d)</div>
          </div>
          
          <div className="bg-dark-primary rounded-neumorphic p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-error-dark mb-1">
              {milestones.filter(m => getDaysUntilTarget(m.targetDate) < 0).length}
            </div>
            <div className="text-xs text-text-dark-muted">Atrasados</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-dark-secondary">Progreso General</span>
            <span className="text-sm font-medium text-neon-green">
              {Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%
            </span>
          </div>
          <div className="w-full bg-dark-surface/50 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-neon-green to-emerald-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicTracker; 