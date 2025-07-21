import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AC004FinanzasMetricas = () => {
  const kpis = [
    { title: "Overdue Tasks", value: "6", subtitle: "Tasks past due date", color: "error", icon: "AlertTriangle" },
    { title: "High Priorities", value: "10", subtitle: "Critical tasks pending", color: "warning", icon: "Star" },
    { title: "Upcoming Milestones", value: "1", subtitle: "Due within 30 days", color: "success", icon: "Target" },
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="bg-gradient-primary text-white px-3 py-1 rounded-xl text-sm font-bold">
                AC-004
              </span>
              <h1 className="text-4xl font-bold text-text-primary">Finanzas & Métricas</h1>
            </div>
            <p className="text-lg text-text-secondary">
              Controla las finanzas, métricas clave y sostenibilidad económica de tu startup
            </p>
          </div>
          
          <Button variant="primary" icon="Download">
            Exportar Datos
          </Button>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-card p-8 rounded-2xl shadow-soft border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-warning rounded-2xl flex items-center justify-center shadow-card">
                <Icon name="TrendingUp" size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Overall Progress</h2>
                <p className="text-text-secondary">Startup journey completion</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-4xl font-bold text-warning mb-1">25%</div>
              <div className="text-sm text-success">Keep Going!</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-warning rounded-full w-1/4 transition-all duration-500"></div>
            </div>
          </div>
          
          {/* Phase Indicators */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-text-primary">Ideación</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={16} className="text-text-muted" />
              <span className="text-text-muted">Validación</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={16} className="text-text-muted" />
              <span className="text-text-muted">Launch</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={16} className="text-text-muted" />
              <span className="text-text-muted">Growth</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Circle" size={16} className="text-text-muted" />
              <span className="text-text-muted">Scaling</span>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((kpi, index) => (
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

        {/* Navigation Tabs */}
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

        {/* Financial Matrix */}
        <div className="bg-gradient-card p-8 rounded-2xl shadow-soft border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-text-primary mb-2 flex items-center">
              <Icon name="DollarSign" size={28} className="text-primary-500 mr-3" />
              Matriz Financiera & Métricas
            </h2>
            <p className="text-text-secondary">
              Control integral de todas las áreas financieras y métricas clave para la sostenibilidad de tu startup.
            </p>
          </div>
          
          {/* Phase Timeline */}
          <div className="grid grid-cols-5 gap-6">
            {[
              { name: 'Ideación', year: '2024', icon: 'Lightbulb', color: 'text-yellow-600' },
              { name: 'Validación', year: '2025', icon: 'TestTube', color: 'text-orange-600' },
              { name: 'Lanzamiento', year: '2025', icon: 'Rocket', color: 'text-purple-600' },
              { name: 'Crecimiento', year: '2025', icon: 'TrendingUp', color: 'text-green-600' },
              { name: 'Escalamiento', year: '2025', icon: 'Maximize', color: 'text-blue-600' }
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-glass rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-card border border-gray-200">
                  <Icon name={phase.icon} size={24} className={phase.color} />
                </div>
                <h4 className="font-semibold text-text-primary text-sm mb-1">{phase.name}</h4>
                <p className="text-xs text-text-muted">{phase.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AC004FinanzasMetricas; 