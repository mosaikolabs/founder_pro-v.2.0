import React from 'react';
import ACModuleTemplate from '../../components/templates/ACModuleTemplate';
import Icon from '../../components/AppIcon';

const AC007InvestmentFundraising = () => {
  const kpiData = [
    { title: "Overdue Tasks", value: "6", subtitle: "Tasks past due date", color: "error", icon: "AlertTriangle" },
    { title: "High Priorities", value: "10", subtitle: "Critical tasks pending", color: "warning", icon: "Star" },
    { title: "Upcoming Milestones", value: "1", subtitle: "Due within 30 days", color: "success", icon: "Target" },
  ];

  const progressData = {
    percentage: 20,
    color: "warning",
    icon: "DollarSign",
    phases: [
      { name: "Ideación", completed: true },
      { name: "Validación", completed: false },
      { name: "Launch", completed: false },
      { name: "Growth", completed: false },
      { name: "Scaling", completed: false }
    ]
  };

  return (
    <ACModuleTemplate
      moduleId="AC-007"
      moduleName="Investment & Fundraising Preparation"
      moduleDescription="Prepara tu startup para inversiones y fundraising exitoso"
      kpiData={kpiData}
      progressData={progressData}
    >
      {/* Matriz específica del módulo */}
      <div className="bg-gradient-card p-8 rounded-2xl shadow-soft border border-gray-100">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-primary mb-2 flex items-center">
            <Icon name="DollarSign" size={28} className="text-primary-500 mr-3" />
            Matriz Investment & Fundraising
          </h2>
          <p className="text-text-secondary">
            Control integral de preparación para inversiones y fundraising.
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
    </ACModuleTemplate>
  );
};

export default AC007InvestmentFundraising; 