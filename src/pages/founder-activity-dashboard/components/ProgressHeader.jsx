import React from 'react';
        import Icon from '../../../components/AppIcon';

        const ProgressHeader = ({ progress }) => {
          const getProgressColor = (progress) => {
            if (progress >= 80) return 'neon-green';
            if (progress >= 60) return 'neon-purple';
            return 'warning-dark';
          };

          const getProgressGradient = (progress) => {
            if (progress >= 80) return 'from-neon-green to-emerald-400';
            if (progress >= 60) return 'from-neon-purple to-purple-400';
            return 'from-warning-dark to-yellow-400';
          };

          const progressColor = getProgressColor(progress);
          const progressGradient = getProgressGradient(progress);

          return (
            <div className="bg-gradient-card rounded-neumorphic-lg p-6 shadow-neumorphic border border-slate-600">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${progressGradient} shadow-lg`}>
                    <Icon name="TrendingUp" size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-dark-primary">Overall Progress</h2>
                    <p className="text-text-dark-secondary">Startup journey completion</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold text-${progressColor} mb-1`}>
                    {progress}%
                  </div>
                  <div className="text-sm text-text-dark-secondary">
                    {progress >= 80 ? 'Excellent Progress!' : 
                     progress >= 60 ? 'Good Progress': 'Keep Going!'}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-dark-secondary rounded-full h-3 shadow-neumorphic-inset">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${progressGradient} transition-all duration-1000 ease-out shadow-lg`}
                    style={{ width: `${progress}%` }}
                  >
                    <div className="h-full w-full rounded-full animate-pulse-glow"></div>
                  </div>
                </div>
                <div 
                  className="absolute -top-8 transform -translate-x-1/2 text-sm font-medium text-text-dark-primary"
                  style={{ left: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="flex justify-between mt-6 text-xs text-text-dark-muted">
                <div className={`flex items-center ${progress >= 20 ? 'text-neon-green' : ''}`}>
                  <Icon name="CheckCircle" size={12} className="mr-1" />
                  Ideation
                </div>
                <div className={`flex items-center ${progress >= 40 ? 'text-neon-green' : ''}`}>
                  <Icon name="CheckCircle" size={12} className="mr-1" />
                  Validation
                </div>
                <div className={`flex items-center ${progress >= 60 ? 'text-neon-green' : ''}`}>
                  <Icon name="CheckCircle" size={12} className="mr-1" />
                  Launch
                </div>
                <div className={`flex items-center ${progress >= 80 ? 'text-neon-green' : ''}`}>
                  <Icon name="CheckCircle" size={12} className="mr-1" />
                  Growth
                </div>
                <div className={`flex items-center ${progress >= 100 ? 'text-neon-green' : ''}`}>
                  <Icon name="CheckCircle" size={12} className="mr-1" />
                  Scaling
                </div>
              </div>
            </div>
          );
        };

        export default ProgressHeader;