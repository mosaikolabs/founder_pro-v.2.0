import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import ProgressHeader from '../founder-activity-dashboard/components/ProgressHeader';
import KPIWidgets from '../founder-activity-dashboard/components/KPIWidgets';
import TabNavigation from '../founder-activity-dashboard/components/TabNavigation';
import RoadmapTimeline from '../founder-activity-dashboard/components/RoadmapTimeline';
import ActivityDetailModal from '../founder-activity-dashboard/components/ActivityDetailModal';
import ScalingMatrix from './components/ScalingMatrix';
import ScalingTracker from './components/ScalingTracker';

const ScalingGrowthOptimization = () => {
  const [activeTab, setActiveTab] = useState('matrix');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Scaling & Growth Optimization data structure
  const scalingData = useMemo(() => ({
    phases: [
      {
        id: 'ideation',
        name: 'Ideación',
        startDate: '2025-01-01',
        endDate: '2025-02-28',
        status: 'completed',
        activities: [
          { id: 'scaling-strategy-design', name: 'Diseño Estrategia Scaling', status: 'completed', priority: 'high', dueDate: '2025-01-15', area: 'scaling-strategy' },
          { id: 'growth-optimization-planning', name: 'Planning Growth Optimization', status: 'completed', priority: 'high', dueDate: '2025-01-20', area: 'growth-optimization' },
          { id: 'performance-management-setup', name: 'Setup Performance Management', status: 'completed', priority: 'high', dueDate: '2025-01-25', area: 'performance-management' },
          { id: 'team-scaling-framework', name: 'Framework Team Scaling', status: 'completed', priority: 'medium', dueDate: '2025-02-05', area: 'team-scaling' },
          { id: 'infrastructure-scaling-blueprint', name: 'Blueprint Infrastructure Scaling', status: 'completed', priority: 'medium', dueDate: '2025-02-15', area: 'infrastructure-scaling' }
        ]
      },
      {
        id: 'validation',
        name: 'Validación',
        startDate: '2025-03-01',
        endDate: '2025-04-30',
        status: 'in-progress',
        activities: [
          { id: 'scaling-execution-plan', name: 'Plan Ejecución Scaling', status: 'completed', priority: 'high', dueDate: '2025-03-15', area: 'scaling-strategy' },
          { id: 'growth-optimization-implementation', name: 'Implementación Growth Optimization', status: 'in-progress', priority: 'high', dueDate: '2025-03-30', area: 'growth-optimization' },
          { id: 'performance-metrics-deployment', name: 'Deploy Métricas Performance', status: 'in-progress', priority: 'high', dueDate: '2025-04-10', area: 'performance-management' },
          { id: 'team-hiring-acceleration', name: 'Aceleración Hiring Team', status: 'pending', priority: 'high', dueDate: '2025-04-20', area: 'team-scaling' },
          { id: 'infrastructure-capacity-scaling', name: 'Scaling Capacidad Infrastructure', status: 'pending', priority: 'medium', dueDate: '2025-04-30', area: 'infrastructure-scaling' }
        ]
      },
      {
        id: 'launch',
        name: 'Lanzamiento',
        startDate: '2025-05-01',
        endDate: '2025-06-30',
        status: 'pending',
        activities: [
          { id: 'active-scaling-operations', name: 'Operaciones Scaling Activas', status: 'pending', priority: 'high', dueDate: '2025-05-15', area: 'scaling-strategy' },
          { id: 'growth-optimization-acceleration', name: 'Aceleración Growth Optimization', status: 'pending', priority: 'high', dueDate: '2025-05-20', area: 'growth-optimization' },
          { id: 'performance-monitoring-active', name: 'Monitoreo Performance Activo', status: 'pending', priority: 'high', dueDate: '2025-06-01', area: 'performance-management' },
          { id: 'team-onboarding-optimization', name: 'Optimización Onboarding Team', status: 'pending', priority: 'medium', dueDate: '2025-06-15', area: 'team-scaling' },
          { id: 'infrastructure-auto-scaling', name: 'Auto-scaling Infrastructure', status: 'pending', priority: 'medium', dueDate: '2025-06-30', area: 'infrastructure-scaling' }
        ]
      },
      {
        id: 'growth',
        name: 'Crecimiento',
        startDate: '2025-07-01',
        endDate: '2025-09-30',
        status: 'pending',
        activities: [
          { id: 'scaling-portfolio-expansion', name: 'Expansión Portfolio Scaling', status: 'pending', priority: 'high', dueDate: '2025-07-31', area: 'scaling-strategy' },
          { id: 'growth-optimization-mastery', name: 'Mastery Growth Optimization', status: 'pending', priority: 'high', dueDate: '2025-08-15', area: 'growth-optimization' },
          { id: 'performance-excellence-program', name: 'Programa Performance Excellence', status: 'pending', priority: 'medium', dueDate: '2025-08-31', area: 'performance-management' },
          { id: 'team-leadership-development', name: 'Desarrollo Team Leadership', status: 'pending', priority: 'medium', dueDate: '2025-09-15', area: 'team-scaling' },
          { id: 'infrastructure-resilience-optimization', name: 'Optimización Infrastructure Resilience', status: 'pending', priority: 'low', dueDate: '2025-09-30', area: 'infrastructure-scaling' }
        ]
      },
      {
        id: 'scaling',
        name: 'Escalamiento',
        startDate: '2025-10-01',
        endDate: '2025-12-31',
        status: 'pending',
        activities: [
          { id: 'enterprise-scaling-mastery', name: 'Mastery Enterprise Scaling', status: 'pending', priority: 'high', dueDate: '2025-10-31', area: 'scaling-strategy' },
          { id: 'growth-optimization-automation', name: 'Automatización Growth Optimization', status: 'pending', priority: 'high', dueDate: '2025-11-30', area: 'growth-optimization' },
          { id: 'performance-predictive-analytics', name: 'Analytics Predictivos Performance', status: 'pending', priority: 'medium', dueDate: '2025-12-15', area: 'performance-management' },
          { id: 'organizational-excellence-achievement', name: 'Achievement Excelencia Organizacional', status: 'pending', priority: 'low', dueDate: '2025-12-31', area: 'team-scaling' }
        ]
      }
    ],
    scalingAreas: [
      'scaling-strategy', 
      'growth-optimization', 
      'performance-management', 
      'team-scaling', 
      'infrastructure-scaling'
    ],
    milestones: [
      { id: 'revenue-scaling-10x', name: 'Revenue Scaling 10x Growth', targetDate: '2025-04-15', status: 'pending', progress: 75, metric: '10x revenue target' },
      { id: 'team-scaling-100-people', name: 'Team Scaling 100+ People', targetDate: '2025-06-01', status: 'pending', progress: 50, metric: '100+ team members' },
      { id: 'performance-optimization-99uptime', name: 'Performance 99.9% Uptime', targetDate: '2025-08-31', status: 'pending', progress: 40, metric: '&gt;99.9% uptime' },
      { id: 'global-scaling-multi-region', name: 'Global Scaling Multi-Region', targetDate: '2025-12-31', status: 'pending', progress: 25, metric: '5+ regions active' }
    ]
  }), []);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const allActivities = scalingData.phases.flatMap(phase => phase.activities);
    const completedCount = allActivities.filter(activity => activity.status === 'completed').length;
    return Math.round((completedCount / allActivities.length) * 100);
  }, [scalingData]);

  // Calculate KPI data specific to Scaling & Growth Optimization
  const kpiData = useMemo(() => {
    const allActivities = scalingData.phases.flatMap(phase => phase.activities);
    const today = new Date();
    
    const scalingTasksCompleted = allActivities.filter(activity => 
      activity.status === 'completed'
    ).length;
    
    const criticalScalingTasks = allActivities.filter(activity => 
      activity.priority === 'high' && activity.status !== 'completed'
    ).length;
    
    const scalingMilestonesUpcoming = scalingData.milestones.filter(milestone => {
      const targetDate = new Date(milestone.targetDate);
      const daysFromNow = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
      return daysFromNow <= 90 && daysFromNow > 0;
    }).length;

    return {
      overdueTasks: scalingTasksCompleted,
      highPriorityTasks: criticalScalingTasks,
      upcomingMilestones: scalingMilestonesUpcoming
    };
  }, [scalingData]);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };

  const handleExportData = () => {
    console.log('Exporting Scaling & Growth Optimization data...');
    // TODO: Implementar exportación real
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'matrix':
        return <ScalingMatrix activities={scalingData} onActivityClick={handleActivityClick} />;
      case 'timeline':
        return <RoadmapTimeline activities={scalingData} onActivityClick={handleActivityClick} />;
      case 'tracker':
        return <ScalingTracker milestones={scalingData.milestones} />;
      default:
        return <ScalingMatrix activities={scalingData} onActivityClick={handleActivityClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Helmet>
        <title>AC-009: Scaling Growth Optimization - Founder Pro</title>
        <meta name="description" content="Optimización estratégica de scaling y growth para el crecimiento exponencial de tu startup" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-3 py-1 rounded-neumorphic text-sm font-medium mr-3">
                  AC-009
                </div>
                <h1 className="text-4xl font-bold text-text-dark-primary">
                  Scaling Growth Optimization
                </h1>
              </div>
              <p className="text-text-dark-secondary text-lg">
                Optimiza el scaling y growth para lograr crecimiento exponencial sostenible
              </p>
            </div>
            <Button
              variant="accent"
              icon="Download"
              onClick={handleExportData}
              className="hover:shadow-glow-neon"
            >
              Exportar Datos
            </Button>
          </div>

          <ProgressHeader progress={overallProgress} />
        </div>

        {/* KPI Widgets */}
        <KPIWidgets data={kpiData} />

        {/* Tab Navigation */}
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          tabs={[
            { id: 'matrix', label: 'Matriz Scaling', icon: 'TrendingUp' },
            { id: 'timeline', label: 'Cronograma', icon: 'Calendar' },
            { id: 'tracker', label: 'Seguimiento', icon: 'BarChart' }
          ]}
        />

        {/* Tab Content */}
        <div className="mt-8">
          {renderTabContent()}
        </div>

        {/* Activity Detail Modal */}
        <ActivityDetailModal
          activity={selectedActivity}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default ScalingGrowthOptimization; 