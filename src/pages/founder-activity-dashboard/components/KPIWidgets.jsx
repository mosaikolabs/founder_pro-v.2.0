import React from 'react';
        import Icon from '../../../components/AppIcon';

        const KPIWidgets = ({ data }) => {
          const widgets = [
            {
              id: 'overdue',
              title: 'Overdue Tasks',
              value: data?.overdueTasks || 0,
              icon: 'AlertTriangle',
              color: 'error-dark',
              gradient: 'from-error-dark to-red-400',
              description: 'Tasks past due date',
              trend: 'urgent'
            },
            {
              id: 'priorities',
              title: 'High Priorities',
              value: data?.highPriorityTasks || 0,
              icon: 'Star',
              color: 'warning-dark',
              gradient: 'from-warning-dark to-yellow-400',
              description: 'Critical tasks pending',
              trend: 'important'
            },
            {
              id: 'milestones',
              title: 'Upcoming Milestones',
              value: data?.upcomingMilestones || 0,
              icon: 'Target',
              color: 'neon-green',
              gradient: 'from-neon-green to-emerald-400',
              description: 'Due within 30 days',
              trend: 'positive'
            }
          ];

          const getTrendIcon = (trend) => {
            switch (trend) {
              case 'urgent': return 'TrendingUp';
              case 'important': return 'AlertCircle';
              case 'positive': return 'CheckCircle';
              default: return 'Circle';
            }
          };

          const handleWidgetClick = (widgetId) => {
            // Mock drill-down functionality
            console.log(`Drilling down into ${widgetId} details`);
          };

          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {widgets.map((widget) => (
                <div
                  key={widget.id}
                  onClick={() => handleWidgetClick(widget.id)}
                  className="bg-dark-primary rounded-neumorphic p-6 shadow-neumorphic border border-slate-700 hover:shadow-neumorphic-hover transition-all duration-300 cursor-pointer group hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${widget.gradient} shadow-lg group-hover:shadow-glow-neon transition-all duration-300`}>
                      <Icon name={widget.icon} size={24} className="text-white" />
                    </div>
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${widget.gradient} bg-opacity-20`}>
                      <Icon name={getTrendIcon(widget.trend)} size={16} className={`text-${widget.color}`} />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className={`text-3xl font-bold text-${widget.color} mb-1 group-hover:text-neon-green transition-colors duration-300`}>
                      {widget.value}
                    </div>
                    <h3 className="text-lg font-semibold text-text-dark-primary mb-1 group-hover:text-neon-green transition-colors duration-300">
                      {widget.title}
                    </h3>
                    <p className="text-sm text-text-dark-secondary group-hover:text-text-dark-primary transition-colors duration-300">
                      {widget.description}
                    </p>
                  </div>

                  {/* Progress indicator */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full bg-${widget.color} animate-pulse`}></div>
                      <span className="text-xs text-text-dark-muted group-hover:text-text-dark-secondary transition-colors duration-300">
                        {widget.trend === 'urgent' ? 'Needs attention' :
                         widget.trend === 'important'? 'Action required' : 'On track'}
                      </span>
                    </div>
                    <Icon 
                      name="ArrowRight" 
                      size={14} 
                      className="text-text-dark-muted group-hover:text-neon-green group-hover:translate-x-1 transition-all duration-300" 
                    />
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-neumorphic bg-gradient-to-r from-neon-green/0 to-neon-purple/0 group-hover:from-neon-green/5 group-hover:to-neon-purple/5 transition-all duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>
          );
        };

        export default KPIWidgets;