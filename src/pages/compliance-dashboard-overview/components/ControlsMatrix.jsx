import React from 'react';
import Icon from '../../../components/AppIcon';

const StrategicMatrix = ({ onControlClick }) => {
  const strategicAreas = [
    {
      id: "strategy-fundamentals",
      name: "Strategy & Fundamentals",
      icon: "Compass",
      owner: "Founder",
      description: "Core strategy and business model"
    },
    {
      id: "legal-corporate",
      name: "Legal & Corporate",
      icon: "Scale",
      owner: "Legal Team",
      description: "Corporate structure and compliance"
    },
    {
      id: "technology-product",
      name: "Technology & Product",
      icon: "Code",
      owner: "CTO/Tech Lead",
      description: "Product development and tech stack"
    },
    {
      id: "finance-metrics",
      name: "Finance & Metrics",
      icon: "BarChart3",
      owner: "Founder/CFO",
      description: "Financial planning and KPI tracking"
    },
    {
      id: "marketing-customers",
      name: "Marketing & Customers",
      icon: "Target",
      owner: "Marketing Lead",
      description: "Customer acquisition and marketing"
    },
    {
      id: "operations-success",
      name: "Operations & Success",
      icon: "Settings",
      owner: "Operations Lead",
      description: "Operational excellence and customer success"
    },
    {
      id: "investment-fundraising",
      name: "Investment & Fundraising",
      icon: "Diamond",
      owner: "Founder",
      description: "Investment strategy and fundraising"
    },
    {
      id: "partnership-alliances",
      name: "Partnerships & Alliances",
      icon: "Handshake",
      owner: "Founder",
      description: "Strategic partnerships and alliances"
    },
    {
      id: "scaling-growth",
      name: "Scaling & Growth",
      icon: "TrendingUp",
      owner: "Founder",
      description: "Scaling strategies and growth optimization"
    },
    {
      id: "exit-strategy",
      name: "Exit Strategy",
      icon: "DoorOpen",
      owner: "Founder",
      description: "Exit strategy and succession planning"
    },
    {
      id: "legacy-impact",
      name: "Legacy & Impact",
      icon: "Heart",
      owner: "Founder",
      description: "Legacy building and impact optimization"
    }
  ];

  const startupPhases = [
    { id: "ideation", name: "Ideation", status: "completed" },
    { id: "validation", name: "Validation", status: "in-progress" },
    { id: "mvp", name: "MVP Build", status: "in-progress" },
    { id: "launch", name: "Launch", status: "pending" },
    { id: "growth", name: "Growth", status: "pending" },
    { id: "scaling", name: "Scaling", status: "pending" }
  ];

  const getPhaseIcon = (phaseId) => {
    const iconMap = {
      'ideation': 'Lightbulb',
      'validation': 'Search',
      'mvp': 'Code',
      'launch': 'Rocket',
      'growth': 'TrendingUp',
      'scaling': 'Zap'
    };
    return iconMap[phaseId] || 'Circle';
  };

  const getPhaseStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success-dark';
      case 'in-progress': return 'bg-warning-dark';
      case 'pending': return 'bg-text-dark-muted';
      default: return 'bg-text-dark-muted';
    }
  };

  const getAreaIcon = (areaId) => {
    const iconMap = {
      'strategy-fundamentals': 'Compass',
      'legal-corporate': 'Scale',
      'technology-product': 'Code',
      'finance-metrics': 'BarChart3',
      'marketing-customers': 'Target',
      'operations-success': 'Settings',
      'investment-fundraising': 'Diamond',
      'partnership-alliances': 'Handshake',
      'scaling-growth': 'TrendingUp',
      'exit-strategy': 'DoorOpen',
      'legacy-impact': 'Heart'
    };
    return iconMap[areaId] || 'Circle';
  };

  const handleCellClick = (area, phase) => {
    if (onControlClick) {
      onControlClick({
        id: `${area.id}-${phase.id}`,
        name: `${area.name} - ${phase.name}`,
        area: area.name,
        phase: phase.name,
        status: phase.status,
        owner: area.owner,
        description: area.description
      });
    }
  };

  return (
    <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
      <h3 className="text-2xl font-bold text-text-dark-primary mb-6 flex items-center">
        <Icon name="Grid3X3" size={24} className="mr-3 text-neon-green" />
        Strategic Areas Matrix
      </h3>
      <p className="text-text-dark-secondary mb-6">
        Track progress across strategic areas and startup phases. Click any cell to view detailed information.
      </p>

      {/* Matrix Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-2 mb-4">
            <div className="w-32"></div> {/* Empty corner */}
            {startupPhases.map((phase) => (
              <div key={phase.id} className="text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${getPhaseStatusColor(phase.status)}
                  `}>
                    <Icon name={getPhaseIcon(phase.id)} size={16} className="text-white" />
                  </div>
                  <div className="text-xs font-medium text-text-dark-primary">
                    {phase.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Matrix Rows */}
          {strategicAreas.map((area) => (
            <div key={area.id} className="grid grid-cols-12 gap-2 mb-3">
              {/* Area Name */}
              <div className="w-32 flex items-center space-x-2">
                <Icon name={getAreaIcon(area.id)} size={16} className="text-neon-green" />
                <div>
                  <div className="text-sm font-medium text-text-dark-primary">
                    {area.name}
                  </div>
                  <div className="text-xs text-text-dark-secondary">
                    {area.owner}
                  </div>
                </div>
              </div>

              {/* Matrix Cells */}
              {startupPhases.map((phase) => {
                const isCompleted = phase.status === 'completed';
                const isInProgress = phase.status === 'in-progress';
                const isPending = phase.status === 'pending';
                
                return (
                  <div
                    key={`${area.id}-${phase.id}`}
                    className={`
                      w-16 h-16 rounded-lg border-2 cursor-pointer transition-all duration-200
                      ${isCompleted 
                        ? 'bg-success-dark bg-opacity-20 border-success-dark hover:bg-success-dark hover:bg-opacity-30' 
                        : isInProgress 
                        ? 'bg-warning-dark bg-opacity-20 border-warning-dark hover:bg-warning-dark hover:bg-opacity-30'
                        : 'bg-dark-secondary border-slate-600 hover:bg-slate-600 hover:border-slate-500'
                      }
                      hover:scale-105 hover:shadow-neumorphic-hover
                    `}
                    onClick={() => handleCellClick(area, phase)}
                    title={`${area.name} - ${phase.name} (${phase.status})`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {isCompleted && (
                        <Icon name="Check" size={20} className="text-success-dark" />
                      )}
                      {isInProgress && (
                        <Icon name="Clock" size={20} className="text-warning-dark" />
                      )}
                      {isPending && (
                        <Icon name="Circle" size={20} className="text-text-dark-muted" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-success-dark rounded"></div>
          <span className="text-text-dark-secondary">Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-warning-dark rounded"></div>
          <span className="text-text-dark-secondary">In Progress</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-text-dark-muted rounded"></div>
          <span className="text-text-dark-secondary">Pending</span>
        </div>
      </div>

      {/* Strategic Areas Quick Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="neumorphic-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-neon-green">11</div>
              <div className="text-sm text-text-dark-secondary">Strategic Areas</div>
            </div>
            <Icon name="Target" size={24} className="text-neon-green" />
          </div>
        </div>
        <div className="neumorphic-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-warning-dark">6</div>
              <div className="text-sm text-text-dark-secondary">Startup Phases</div>
            </div>
            <Icon name="TrendingUp" size={24} className="text-warning-dark" />
          </div>
        </div>
        <div className="neumorphic-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-neon-purple">66</div>
              <div className="text-sm text-text-dark-secondary">Total Checkpoints</div>
            </div>
            <Icon name="Grid3X3" size={24} className="text-neon-purple" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicMatrix;