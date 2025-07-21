import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import ProgressHeader from '../founder-activity-dashboard/components/ProgressHeader';
import KPIWidgets from '../founder-activity-dashboard/components/KPIWidgets';
import TabNavigation from '../founder-activity-dashboard/components/TabNavigation';
import RoadmapTimeline from '../founder-activity-dashboard/components/RoadmapTimeline';
import ActivityDetailModal from '../founder-activity-dashboard/components/ActivityDetailModal';
import LegacyMatrix from './components/LegacyMatrix';
import LegacyTracker from './components/LegacyTracker';

const LegacyImpactOptimization = () => {
  const [activeTab, setActiveTab] = useState('matrix');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Legacy Impact Optimization data structure
  const legacyData = useMemo(() => ({
    phases: [
      {
        id: 'ideation',
        name: 'Ideación',
        startDate: '2025-01-01',
        endDate: '2025-02-28',
        status: 'completed',
        activities: [
          { id: 'legacy-strategy-design', name: 'Diseño Estrategia Legacy', status: 'completed', priority: 'high', dueDate: '2025-01-15', area: 'legacy-strategy' },
          { id: 'impact-optimization-planning', name: 'Planning Impact Optimization', status: 'completed', priority: 'high', dueDate: '2025-01-20', area: 'impact-optimization' },
          { id: 'sustainability-management-setup', name: 'Setup Sustainability Management', status: 'completed', priority: 'high', dueDate: '2025-01-25', area: 'sustainability-management' },
          { id: 'community-building-framework', name: 'Framework Community Building', status: 'completed', priority: 'medium', dueDate: '2025-02-05', area: 'community-building' },
          { id: 'knowledge-transfer-blueprint', name: 'Blueprint Knowledge Transfer', status: 'completed', priority: 'medium', dueDate: '2025-02-15', area: 'knowledge-transfer' }
        ]
      },
      {
        id: 'validation',
        name: 'Validación',
        startDate: '2025-03-01',
        endDate: '2025-04-30',
        status: 'in-progress',
        activities: [
          { id: 'legacy-strategy-execution', name: 'Ejecución Legacy Strategy', status: 'completed', priority: 'high', dueDate: '2025-03-15', area: 'legacy-strategy' },
          { id: 'impact-optimization-implementation', name: 'Implementación Impact Optimization', status: 'in-progress', priority: 'high', dueDate: '2025-03-30', area: 'impact-optimization' },
          { id: 'sustainability-management-execution', name: 'Ejecución Sustainability Management', status: 'in-progress', priority: 'high', dueDate: '2025-04-10', area: 'sustainability-management' },
          { id: 'community-building-development', name: 'Desarrollo Community Building', status: 'pending', priority: 'high', dueDate: '2025-04-20', area: 'community-building' },
          { id: 'knowledge-transfer-system', name: 'Sistema Knowledge Transfer', status: 'pending', priority: 'medium', dueDate: '2025-04-30', area: 'knowledge-transfer' }
        ]
      },
      {
        id: 'launch',
        name: 'Lanzamiento',
        startDate: '2025-05-01',
        endDate: '2025-06-30',
        status: 'pending',
        activities: [
          { id: 'active-legacy-building', name: 'Building Legacy Activo', status: 'pending', priority: 'high', dueDate: '2025-05-15', area: 'legacy-strategy' },
          { id: 'impact-optimization-maximization', name: 'Maximización Impact Optimization', status: 'pending', priority: 'high', dueDate: '2025-05-20', area: 'impact-optimization' },
          { id: 'sustainability-management-acceleration', name: 'Aceleración Sustainability Management', status: 'pending', priority: 'high', dueDate: '2025-06-01', area: 'sustainability-management' },
          { id: 'community-building-expansion', name: 'Expansión Community Building', status: 'pending', priority: 'medium', dueDate: '2025-06-15', area: 'community-building' },
          { id: 'knowledge-transfer-excellence', name: 'Excelencia Knowledge Transfer', status: 'pending', priority: 'medium', dueDate: '2025-06-30', area: 'knowledge-transfer' }
        ]
      },
      {
        id: 'growth',
        name: 'Crecimiento',
        startDate: '2025-07-01',
        endDate: '2025-09-30',
        status: 'pending',
        activities: [
          { id: 'legacy-strategy-mastery', name: 'Mastery Legacy Strategy', status: 'pending', priority: 'high', dueDate: '2025-07-31', area: 'legacy-strategy' },
          { id: 'impact-optimization-leadership', name: 'Liderazgo Impact Optimization', status: 'pending', priority: 'high', dueDate: '2025-08-15', area: 'impact-optimization' },
          { id: 'sustainability-management-excellence', name: 'Excelencia Sustainability Management', status: 'pending', priority: 'medium', dueDate: '2025-08-31', area: 'sustainability-management' },
          { id: 'community-building-leadership', name: 'Liderazgo Community Building', status: 'pending', priority: 'medium', dueDate: '2025-09-15', area: 'community-building' },
          { id: 'knowledge-transfer-mastery', name: 'Mastery Knowledge Transfer', status: 'pending', priority: 'low', dueDate: '2025-09-30', area: 'knowledge-transfer' }
        ]
      },
      {
        id: 'scaling',
        name: 'Escalamiento',
        startDate: '2025-10-01',
        endDate: '2025-12-31',
        status: 'pending',
        activities: [
          { id: 'legacy-strategy-immortalization', name: 'Inmortalización Legacy Strategy', status: 'pending', priority: 'high', dueDate: '2025-10-31', area: 'legacy-strategy' },
          { id: 'impact-optimization-global', name: 'Impact Optimization Global', status: 'pending', priority: 'high', dueDate: '2025-11-30', area: 'impact-optimization' },
          { id: 'sustainability-management-perpetual', name: 'Sustainability Management Perpetuo', status: 'pending', priority: 'medium', dueDate: '2025-12-15', area: 'sustainability-management' },
          { id: 'knowledge-transfer-eternal', name: 'Knowledge Transfer Eterno', status: 'pending', priority: 'low', dueDate: '2025-12-31', area: 'knowledge-transfer' }
        ]
      }
    ],
    legacyAreas: [
      'legacy-strategy', 
      'impact-optimization', 
      'sustainability-management', 
      'community-building', 
      'knowledge-transfer'
    ],
    milestones: [
      { id: 'legacy-impact-million-lives', name: 'Legacy Impact 1M+ Lives', targetDate: '2025-04-15', status: 'pending', progress: 85, metric: '1M+ lives impacted' },
      { id: 'sustainability-carbon-negative', name: 'Sustainability Carbon Negative', targetDate: '2025-06-01', status: 'pending', progress: 70, metric: 'Carbon negative status' },
      { id: 'community-global-network', name: 'Community Global Network 100K+', targetDate: '2025-08-31', status: 'pending', progress: 55, metric: '100K+ community members' },
      { id: 'knowledge-transfer-perpetual', name: 'Knowledge Transfer Perpetual System', targetDate: '2025-12-31', status: 'pending', progress: 40, metric: 'Self-sustaining knowledge' }
    ]
  }), []);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const allActivities = legacyData.phases.flatMap(phase => phase.activities);
    const completedCount = allActivities.filter(activity => activity.status === 'completed').length;
    return Math.round((completedCount / allActivities.length) * 100);
  }, [legacyData]);

  // Calculate KPI data specific to Legacy Impact Optimization
  const kpiData = useMemo(() => {
    const allActivities = legacyData.phases.flatMap(phase => phase.activities);
    const today = new Date();
    
    const legacyTasksCompleted = allActivities.filter(activity => 
      activity.status === 'completed'
    ).length;
    
    const criticalLegacyTasks = allActivities.filter(activity => 
      activity.priority === 'high' && activity.status !== 'completed'
    ).length;
    
    const legacyMilestonesUpcoming = legacyData.milestones.filter(milestone => {
      const targetDate = new Date(milestone.targetDate);
      const daysFromNow = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
      return daysFromNow <= 90 && daysFromNow > 0;
    }).length;

    return {
      overdueTasks: legacyTasksCompleted,
      highPriorityTasks: criticalLegacyTasks,
      upcomingMilestones: legacyMilestonesUpcoming
    };
  }, [legacyData]);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };

  const handleExportData = () => {
    console.log('Exporting Legacy Impact Optimization data...');
    // TODO: Implementar exportación real
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'matrix':
        return <LegacyMatrix activities={legacyData} onActivityClick={handleActivityClick} />;
      case 'timeline':
        return <RoadmapTimeline activities={legacyData} onActivityClick={handleActivityClick} />;
      case 'tracker':
        return <LegacyTracker milestones={legacyData.milestones} />;
      default:
        return <LegacyMatrix activities={legacyData} onActivityClick={handleActivityClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Helmet>
        <title>AC-011: Legacy Impact Optimization - Founder Pro</title>
        <meta name="description" content="Optimización del legado e impacto perpetuo para trascender con tu startup" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-gradient-to-r from-amber-500 to-amber-400 text-white px-3 py-1 rounded-neumorphic text-sm font-medium mr-3">
                  AC-011
                </div>
                <h1 className="text-4xl font-bold text-text-dark-primary">
                  Legacy Impact Optimization
                </h1>
              </div>
              <p className="text-text-dark-secondary text-lg">
                Construye un legado perpetuo e impacto duradero que trascienda generaciones
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
            { id: 'matrix', label: 'Matriz Legacy', icon: 'Crown' },
            { id: 'timeline', label: 'Cronograma', icon: 'Calendar' },
            { id: 'tracker', label: 'Seguimiento', icon: 'Heart' }
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

export default LegacyImpactOptimization; 