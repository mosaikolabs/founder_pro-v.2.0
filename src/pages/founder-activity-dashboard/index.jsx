import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const FounderActivityDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Activity Overview', count: 6 },
    { id: 'timeline', label: 'Roadmap Timeline', count: 5 },
    { id: 'tracker', label: 'Milestone Tracker', count: 8 }
  ];

  const activities = [
    {
      id: 'ACT-001',
      title: 'Market Research',
      phase: 'Ideation',
      status: 'completed',
      progress: 100,
      dueDate: '2025-01-15'
    },
    {
      id: 'ACT-002',
      title: 'MVP Development',
      phase: 'Validation',
      status: 'in-progress',
      progress: 75,
      dueDate: '2025-03-31'
    },
    {
      id: 'ACT-003',
      title: 'User Testing',
      phase: 'Validation',
      status: 'in-progress',
      progress: 60,
      dueDate: '2025-04-15'
    },
    {
      id: 'ACT-004',
      title: 'Launch Strategy',
      phase: 'Launch',
      status: 'pending',
      progress: 0,
      dueDate: '2025-05-15'
    },
    {
      id: 'ACT-005',
      title: 'Marketing Campaign',
      phase: 'Launch',
      status: 'pending',
      progress: 0,
      dueDate: '2025-05-31'
    },
    {
      id: 'ACT-006',
      title: 'User Acquisition',
      phase: 'Growth',
      status: 'pending',
      progress: 0,
      dueDate: '2025-07-31'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'in-progress': return 'bg-primary-500';
      case 'pending': return 'bg-warning';
      default: return 'bg-gray-300';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 60) return 'bg-primary-500';
    if (progress >= 40) return 'bg-warning';
    return 'bg-gray-300';
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">
              Founder Activity Dashboard
            </h1>
            <p className="text-lg text-text-secondary">
              Track your startup journey from ideation to scaling
            </p>
          </div>
          
          <Button variant="primary" icon="Download">
            Export PDF
          </Button>
        </div>

        {/* Progress Overview */}
        <div className="bg-gradient-card p-8 rounded-2xl shadow-soft border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-card">
                <Icon name="TrendingUp" size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary">Overall Progress</h2>
                <p className="text-text-secondary">Startup journey completion</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-4xl font-bold text-primary-600 mb-1">39%</div>
              <div className="text-sm text-success">Keep Going!</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                style={{ width: '39%' }}
              ></div>
            </div>
          </div>
          
          {/* Phase Indicators */}
          <div className="flex items-center justify-between text-sm">
            {[
              { name: "Ideation", completed: true },
              { name: "Validation", completed: false },
              { name: "Launch", completed: false },
              { name: "Growth", completed: false },
              { name: "Scaling", completed: false }
            ].map((phase, index) => (
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

        {/* KPI Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-soft-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-error rounded-xl flex items-center justify-center shadow-card">
                <Icon name="AlertTriangle" size={24} className="text-white" />
              </div>
              <Icon name="ArrowRight" size={16} className="text-text-muted" />
            </div>
            
            <div>
              <div className="text-3xl font-bold text-text-primary mb-1">6</div>
              <div className="text-sm font-medium text-text-primary mb-1">Overdue Tasks</div>
              <div className="text-xs text-text-muted">Tasks past due date</div>
            </div>
          </div>

          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-soft-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-warning rounded-xl flex items-center justify-center shadow-card">
                <Icon name="Star" size={24} className="text-white" />
              </div>
              <Icon name="ArrowRight" size={16} className="text-text-muted" />
            </div>
            
            <div>
              <div className="text-3xl font-bold text-text-primary mb-1">9</div>
              <div className="text-sm font-medium text-text-primary mb-1">High Priorities</div>
              <div className="text-xs text-text-muted">Critical tasks pending</div>
            </div>
          </div>

          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-soft-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center shadow-card">
                <Icon name="Target" size={24} className="text-white" />
              </div>
              <Icon name="ArrowRight" size={16} className="text-text-muted" />
            </div>
            
            <div>
              <div className="text-3xl font-bold text-text-primary mb-1">1</div>
              <div className="text-sm font-medium text-text-primary mb-1">Upcoming Milestones</div>
              <div className="text-xs text-text-muted">Due within 30 days</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gradient-card rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-all duration-200
                    ${activeTab === tab.id
                      ? 'bg-gradient-primary text-white shadow-soft border-b-2 border-transparent'
                      : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                    }
                  `}
                >
                  <span>{tab.label}</span>
                  <span className={`
                    px-2 py-0.5 rounded-lg text-xs font-medium
                    ${activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-text-muted'
                    }
                  `}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="bg-white p-6 rounded-xl shadow-soft border border-gray-100 hover:shadow-soft-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-8 h-8 rounded-lg ${getStatusColor(activity.status)}`}></div>
                        <div>
                          <h3 className="font-semibold text-text-primary">{activity.title}</h3>
                          <p className="text-sm text-text-muted">{activity.phase} • Due {activity.dueDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-text-primary">{activity.progress}%</div>
                        <div className="text-xs text-text-muted">Complete</div>
                      </div>
                    </div>
                    
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getProgressColor(activity.progress)} rounded-full transition-all duration-500`}
                        style={{ width: `${activity.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'timeline' && (
              <div className="text-center py-12">
                <Icon name="Calendar" size={48} className="text-text-muted mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">Roadmap Timeline</h3>
                <p className="text-text-secondary">Interactive timeline view coming soon</p>
              </div>
            )}
            
            {activeTab === 'tracker' && (
              <div className="text-center py-12">
                <Icon name="Flag" size={48} className="text-text-muted mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">Milestone Tracker</h3>
                <p className="text-text-secondary">Track key milestones and achievements</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default FounderActivityDashboard;