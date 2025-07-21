import React from 'react';
import AppLayout from '../layout/AppLayout';
import Button from '../ui/Button';
import Icon from '../AppIcon';

const ACModuleTemplate = ({ 
  moduleId, 
  moduleName, 
  moduleDescription,
  children,
  kpiData = [],
  progressData = null
}) => {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header Universal */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="bg-gradient-primary text-white px-3 py-1 rounded-xl text-sm font-bold">
                {moduleId}
              </span>
              <h1 className="text-4xl font-bold text-text-primary">{moduleName}</h1>
            </div>
            <p className="text-lg text-text-secondary">{moduleDescription}</p>
          </div>
          
          <Button variant="primary" icon="Download">
            Exportar Datos
          </Button>
        </div>

        {/* Progress Card Universal */}
        {progressData && (
          <div className="bg-gradient-card p-8 rounded-2xl shadow-soft border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`w-16 h-16 bg-gradient-${progressData.color} rounded-2xl flex items-center justify-center shadow-card`}>
                  <Icon name={progressData.icon} size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-text-primary">Overall Progress</h2>
                  <p className="text-text-secondary">Startup journey completion</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-4xl font-bold text-${progressData.color} mb-1`}>
                  {progressData.percentage}%
                </div>
                <div className="text-sm text-success">Keep Going!</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-${progressData.color} rounded-full transition-all duration-500`}
                  style={{ width: `${progressData.percentage}%` }}
                ></div>
              </div>
            </div>
            
            {/* Phase Indicators */}
            <div className="flex items-center justify-between text-sm">
              {progressData.phases.map((phase, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon 
                    name={phase.completed ? "CheckCircle" : "Circle"} 
                    size={16} 
                    className={phase.completed ? "text-success" : "text-text-muted"} 
                  />
                  <span className={phase.completed ? "text-text-primary" : "text-text-muted"}>
                    {phase.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* KPI Cards Universal */}
        {kpiData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kpiData.map((kpi, index) => (
              <div key={index} className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-soft-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-${kpi.color} rounded-xl flex items-center justify-center shadow-card`}>
                    <Icon name={kpi.icon} size={24} className="text-white" />
                  </div>
                  <Icon name="ArrowRight" size={16} className="text-text-muted" />
                </div>
                
                <div>
                  <div className="text-3xl font-bold text-text-primary mb-1">{kpi.value}</div>
                  <div className="text-sm font-medium text-text-primary mb-1">{kpi.title}</div>
                  <div className="text-xs text-text-muted">{kpi.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Navigation Tabs Universal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-soft-lg transition-all duration-300 cursor-pointer group">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="Calendar" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Roadmap Timeline</h3>
                <p className="text-sm text-text-secondary">Chronological activity view</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-primary p-6 rounded-2xl shadow-soft text-white cursor-pointer group hover:shadow-soft-lg transition-all duration-300">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="Grid3X3" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Activity Matrix</h3>
                <p className="text-sm opacity-90">Business areas vs phases</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-soft-lg transition-all duration-300 cursor-pointer group">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="BarChart3" size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Milestone Tracker</h3>
                <p className="text-sm text-text-secondary">Key achievements & goals</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content específico del módulo */}
        {children}
      </div>
    </AppLayout>
  );
};

export default ACModuleTemplate; 