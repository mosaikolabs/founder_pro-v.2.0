import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AuditTimelineScheduler = () => {
  const [selectedTimeline, setSelectedTimeline] = useState(null);

  const timelines = [
    {
      id: 'TL-001',
      title: 'Strategic Planning Timeline',
      category: 'Strategy',
      status: 'Active',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      progress: 35,
      milestones: 8,
      owner: 'Founder'
    },
    {
      id: 'TL-002',
      title: 'Product Development Roadmap',
      category: 'Product',
      status: 'Active',
      startDate: '2025-02-01',
      endDate: '2025-08-31',
      progress: 60,
      milestones: 12,
      owner: 'CTO'
    },
    {
      id: 'TL-003',
      title: 'Marketing Campaign Schedule',
      category: 'Marketing',
      status: 'Planning',
      startDate: '2025-03-01',
      endDate: '2025-06-30',
      progress: 15,
      milestones: 6,
      owner: 'Marketing Lead'
    },
    {
      id: 'TL-004',
      title: 'Funding Preparation Timeline',
      category: 'Finance',
      status: 'Active',
      startDate: '2025-01-15',
      endDate: '2025-05-31',
      progress: 45,
      milestones: 10,
      owner: 'CFO'
    },
    {
      id: 'TL-005',
      title: 'Legal Compliance Schedule',
      category: 'Legal',
      status: 'Planning',
      startDate: '2025-02-15',
      endDate: '2025-07-31',
      progress: 20,
      milestones: 7,
      owner: 'Legal Team'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-success text-white';
      case 'Planning': return 'bg-info text-white';
      case 'Completed': return 'bg-primary-500 text-white';
      case 'On Hold': return 'bg-warning text-white';
      default: return 'bg-gray-300 text-gray-700';
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
              Strategic Timeline Scheduler
            </h1>
            <p className="text-lg text-text-secondary">
              Plan and track strategic timelines and milestones for your startup journey
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" icon="Filter">
              Filter
            </Button>
            <Button variant="primary" icon="Plus">
              New Timeline
            </Button>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timelines.map((timeline) => (
            <div 
              key={timeline.id}
              className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-soft-lg transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedTimeline(timeline)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-medium text-text-muted">{timeline.id}</span>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(timeline.status)}`}>
                      {timeline.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2 group-hover:text-primary-600 transition-colors">
                    {timeline.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4">
                    {timeline.category} • {timeline.milestones} milestones
                  </p>
                </div>
                <Icon name="ArrowRight" size={16} className="text-text-muted group-hover:text-primary-500 transition-colors" />
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                  <span>Progress</span>
                  <span>{timeline.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getProgressColor(timeline.progress)} rounded-full transition-all duration-500`}
                    style={{ width: `${timeline.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>{timeline.owner}</span>
                <span>{timeline.startDate} - {timeline.endDate}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center">
                <Icon name="Play" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">3</div>
                <div className="text-sm text-text-secondary">Active Timelines</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-info rounded-xl flex items-center justify-center">
                <Icon name="Calendar" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">2</div>
                <div className="text-sm text-text-secondary">Planning Phase</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Icon name="Flag" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">43</div>
                <div className="text-sm text-text-secondary">Total Milestones</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-warning rounded-xl flex items-center justify-center">
                <Icon name="Clock" size={24} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">12</div>
                <div className="text-sm text-text-secondary">Upcoming Deadlines</div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar View Placeholder */}
        <div className="bg-gradient-card p-8 rounded-2xl shadow-soft border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Calendar View</h2>
            <p className="text-text-secondary">
              Visual timeline representation of all strategic activities and milestones
            </p>
          </div>
          
          <div className="text-center py-12">
            <Icon name="Calendar" size={48} className="text-text-muted mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">Calendar Integration</h3>
            <p className="text-text-secondary">Interactive calendar view coming soon</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AuditTimelineScheduler;