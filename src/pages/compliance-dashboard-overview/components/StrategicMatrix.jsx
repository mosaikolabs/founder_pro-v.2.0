import React from 'react';
import Icon from '../../../components/AppIcon';

const StrategicMatrix = () => {
  const phases = [
    { id: 'ideation', name: 'Ideation', icon: 'Lightbulb', color: 'text-yellow-600' },
    { id: 'validation', name: 'Validation', icon: 'TestTube', color: 'text-orange-600' },
    { id: 'mvp', name: 'MVP Build', icon: 'Wrench', color: 'text-blue-600' },
    { id: 'launch', name: 'Launch', icon: 'Rocket', color: 'text-purple-600' },
    { id: 'growth', name: 'Growth', icon: 'TrendingUp', color: 'text-green-600' },
    { id: 'scaling', name: 'Scaling', icon: 'Maximize', color: 'text-indigo-600' }
  ];

  const strategicAreas = [
    { id: 'strategy', name: 'Strategy & Fundamentals', owner: 'Founder' },
    { id: 'legal', name: 'Legal & Corporate', owner: 'Legal Team' },
    { id: 'tech', name: 'Technology & Product', owner: 'CTO/Tech Lead' },
    { id: 'finance', name: 'Finance & Metrics', owner: 'Founder/CFO' }
  ];

  const getStatus = (area, phase) => {
    // Mock status logic - replace with real data
    const statuses = ['completed', 'in-progress', 'pending', 'not-started'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success border-green-300';
      case 'in-progress': return 'bg-primary-500 border-purple-300';
      case 'pending': return 'bg-warning border-yellow-300';
      default: return 'bg-gray-300 border-gray-400';
    }
  };

  return (
    <div className="bg-gradient-card p-8 rounded-2xl shadow-soft border border-gray-100">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Strategic Areas Matrix</h2>
        <p className="text-text-secondary">
          Track progress across strategic areas and startup phases. Click any cell to view detailed information.
        </p>
      </div>

      {/* Matrix */}
      <div className="overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          <div className="p-4"></div> {/* Empty corner */}
          {phases.map((phase) => (
            <div key={phase.id} className="text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-gradient-card rounded-xl flex items-center justify-center shadow-card border border-gray-200">
                  <Icon name={phase.icon} size={20} className={phase.color} />
                </div>
                <span className="text-sm font-medium text-text-primary">{phase.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Matrix Rows */}
        {strategicAreas.map((area) => (
          <div key={area.id} className="grid grid-cols-7 gap-4 mb-4">
            {/* Row Header */}
            <div className="p-4 bg-gradient-glass rounded-xl border border-gray-200">
              <h3 className="font-semibold text-text-primary text-sm mb-1">{area.name}</h3>
              <p className="text-xs text-text-muted">{area.owner}</p>
            </div>
            
            {/* Status Cells */}
            {phases.map((phase) => {
              const status = getStatus(area.id, phase.id);
              return (
                <div
                  key={`${area.id}-${phase.id}`}
                  className={`
                    w-full h-16 rounded-xl border-2 cursor-pointer transition-all duration-200 
                    hover:scale-105 hover:shadow-card flex items-center justify-center
                    ${getStatusColor(status)}
                  `}
                  onClick={() => console.log(`Clicked: ${area.name} - ${phase.name}`)}
                >
                  <Icon 
                    name={status === 'completed' ? 'Check' : status === 'in-progress' ? 'Clock' : 'Circle'} 
                    size={20} 
                    className="text-white" 
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success rounded border-2 border-green-300"></div>
            <span className="text-sm text-text-secondary">Completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary-500 rounded border-2 border-purple-300"></div>
            <span className="text-sm text-text-secondary">In Progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-warning rounded border-2 border-yellow-300"></div>
            <span className="text-sm text-text-secondary">Pending</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded border-2 border-gray-400"></div>
            <span className="text-sm text-text-secondary">Not Started</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicMatrix; 