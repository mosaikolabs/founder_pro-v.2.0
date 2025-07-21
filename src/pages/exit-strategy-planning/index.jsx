import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import ProgressHeader from '../founder-activity-dashboard/components/ProgressHeader';
import KPIWidgets from '../founder-activity-dashboard/components/KPIWidgets';
import TabNavigation from '../founder-activity-dashboard/components/TabNavigation';
import RoadmapTimeline from '../founder-activity-dashboard/components/RoadmapTimeline';
import ActivityDetailModal from '../founder-activity-dashboard/components/ActivityDetailModal';
import ExitMatrix from './components/ExitMatrix';
import ExitTracker from './components/ExitTracker';

const ExitStrategyPlanning = () => {
  const [activeTab, setActiveTab] = useState('matrix');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Exit Strategy Planning data structure
  const exitData = useMemo(() => ({
    phases: [
      {
        id: 'ideation',
        name: 'Ideación',
        startDate: '2025-01-01',
        endDate: '2025-02-28',
        status: 'completed',
        activities: [
          { id: 'exit-strategy-design', name: 'Diseño Estrategia Exit', status: 'completed', priority: 'high', dueDate: '2025-01-15', area: 'exit-strategy' },
          { id: 'valuation-optimization-planning', name: 'Planning Valuation Optimization', status: 'completed', priority: 'high', dueDate: '2025-01-20', area: 'valuation-optimization' },
          { id: 'acquisition-preparation-setup', name: 'Setup Acquisition Preparation', status: 'completed', priority: 'high', dueDate: '2025-01-25', area: 'acquisition-preparation' },
          { id: 'ipo-readiness-framework', name: 'Framework IPO Readiness', status: 'completed', priority: 'medium', dueDate: '2025-02-05', area: 'ipo-readiness' },
          { id: 'stakeholder-management-blueprint', name: 'Blueprint Stakeholder Management', status: 'completed', priority: 'medium', dueDate: '2025-02-15', area: 'stakeholder-management' }
        ]
      },
      {
        id: 'validation',
        name: 'Validación',
        startDate: '2025-03-01',
        endDate: '2025-04-30',
        status: 'in-progress',
        activities: [
          { id: 'exit-strategy-execution', name: 'Ejecución Exit Strategy', status: 'completed', priority: 'high', dueDate: '2025-03-15', area: 'exit-strategy' },
          { id: 'valuation-optimization-implementation', name: 'Implementación Valuation Optimization', status: 'in-progress', priority: 'high', dueDate: '2025-03-30', area: 'valuation-optimization' },
          { id: 'acquisition-preparation-execution', name: 'Ejecución Acquisition Preparation', status: 'in-progress', priority: 'high', dueDate: '2025-04-10', area: 'acquisition-preparation' },
          { id: 'ipo-readiness-development', name: 'Desarrollo IPO Readiness', status: 'pending', priority: 'high', dueDate: '2025-04-20', area: 'ipo-readiness' },
          { id: 'stakeholder-alignment-management', name: 'Management Stakeholder Alignment', status: 'pending', priority: 'medium', dueDate: '2025-04-30', area: 'stakeholder-management' }
        ]
      },
      {
        id: 'launch',
        name: 'Lanzamiento',
        startDate: '2025-05-01',
        endDate: '2025-06-30',
        status: 'pending',
        activities: [
          { id: 'active-exit-positioning', name: 'Posicionamiento Exit Activo', status: 'pending', priority: 'high', dueDate: '2025-05-15', area: 'exit-strategy' },
          { id: 'valuation-optimization-maximization', name: 'Maximización Valuation Optimization', status: 'pending', priority: 'high', dueDate: '2025-05-20', area: 'valuation-optimization' },
          { id: 'acquisition-preparation-acceleration', name: 'Aceleración Acquisition Preparation', status: 'pending', priority: 'high', dueDate: '2025-06-01', area: 'acquisition-preparation' },
          { id: 'ipo-readiness-optimization', name: 'Optimización IPO Readiness', status: 'pending', priority: 'medium', dueDate: '2025-06-15', area: 'ipo-readiness' },
          { id: 'stakeholder-communication-excellence', name: 'Excelencia Stakeholder Communication', status: 'pending', priority: 'medium', dueDate: '2025-06-30', area: 'stakeholder-management' }
        ]
      },
      {
        id: 'growth',
        name: 'Crecimiento',
        startDate: '2025-07-01',
        endDate: '2025-09-30',
        status: 'pending',
        activities: [
          { id: 'exit-strategy-portfolio-expansion', name: 'Expansión Portfolio Exit Strategy', status: 'pending', priority: 'high', dueDate: '2025-07-31', area: 'exit-strategy' },
          { id: 'valuation-optimization-mastery', name: 'Mastery Valuation Optimization', status: 'pending', priority: 'high', dueDate: '2025-08-15', area: 'valuation-optimization' },
          { id: 'acquisition-preparation-excellence', name: 'Excelencia Acquisition Preparation', status: 'pending', priority: 'medium', dueDate: '2025-08-31', area: 'acquisition-preparation' },
          { id: 'ipo-readiness-leadership', name: 'Liderazgo IPO Readiness', status: 'pending', priority: 'medium', dueDate: '2025-09-15', area: 'ipo-readiness' },
          { id: 'stakeholder-relationship-optimization', name: 'Optimización Stakeholder Relationships', status: 'pending', priority: 'low', dueDate: '2025-09-30', area: 'stakeholder-management' }
        ]
      },
      {
        id: 'scaling',
        name: 'Escalamiento',
        startDate: '2025-10-01',
        endDate: '2025-12-31',
        status: 'pending',
        activities: [
          { id: 'exit-strategy-mastery-achievement', name: 'Achievement Exit Strategy Mastery', status: 'pending', priority: 'high', dueDate: '2025-10-31', area: 'exit-strategy' },
          { id: 'valuation-optimization-automation', name: 'Automatización Valuation Optimization', status: 'pending', priority: 'high', dueDate: '2025-11-30', area: 'valuation-optimization' },
          { id: 'acquisition-ipo-readiness-excellence', name: 'Excelencia Acquisition & IPO Readiness', status: 'pending', priority: 'medium', dueDate: '2025-12-15', area: 'acquisition-preparation' },
          { id: 'stakeholder-legacy-management', name: 'Management Stakeholder Legacy', status: 'pending', priority: 'low', dueDate: '2025-12-31', area: 'stakeholder-management' }
        ]
      }
    ],
    exitAreas: [
      'exit-strategy', 
      'valuation-optimization', 
      'acquisition-preparation', 
      'ipo-readiness', 
      'stakeholder-management'
    ],
    milestones: [
      { id: 'exit-valuation-100m', name: 'Exit Valuation $100M+', targetDate: '2025-04-15', status: 'pending', progress: 80, metric: '$100M+ valuation' },
      { id: 'acquisition-readiness-tier1', name: 'Acquisition Readiness Tier 1', targetDate: '2025-06-01', status: 'pending', progress: 60, metric: 'Tier 1 acquirer ready' },
      { id: 'ipo-preparation-complete', name: 'IPO Preparation Complete', targetDate: '2025-08-31', status: 'pending', progress: 45, metric: 'IPO-ready status' },
      { id: 'stakeholder-alignment-optimal', name: 'Stakeholder Alignment Optimal', targetDate: '2025-12-31', status: 'pending', progress: 35, metric: '100% stakeholder buy-in' }
    ]
  }), []);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const allActivities = exitData.phases.flatMap(phase => phase.activities);
    const completedCount = allActivities.filter(activity => activity.status === 'completed').length;
    return Math.round((completedCount / allActivities.length) * 100);
  }, [exitData]);

  // Calculate KPI data specific to Exit Strategy Planning
  const kpiData = useMemo(() => {
    const allActivities = exitData.phases.flatMap(phase => phase.activities);
    const today = new Date();
    
    const exitTasksCompleted = allActivities.filter(activity => 
      activity.status === 'completed'
    ).length;
    
    const criticalExitTasks = allActivities.filter(activity => 
      activity.priority === 'high' && activity.status !== 'completed'
    ).length;
    
    const exitMilestonesUpcoming = exitData.milestones.filter(milestone => {
      const targetDate = new Date(milestone.targetDate);
      const daysFromNow = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
      return daysFromNow <= 90 && daysFromNow > 0;
    }).length;

    return {
      overdueTasks: exitTasksCompleted,
      highPriorityTasks: criticalExitTasks,
      upcomingMilestones: exitMilestonesUpcoming
    };
  }, [exitData]);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };

  const handleExportData = () => {
    console.log('Exporting Exit Strategy Planning data...');
    // TODO: Implementar exportación real
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'matrix':
        return <ExitMatrix activities={exitData} onActivityClick={handleActivityClick} />;
      case 'timeline':
        return <RoadmapTimeline activities={exitData} onActivityClick={handleActivityClick} />;
      case 'tracker':
        return <ExitTracker milestones={exitData.milestones} />;
      default:
        return <ExitMatrix activities={exitData} onActivityClick={handleActivityClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Helmet>
        <title>AC-010: Exit Strategy Planning - Founder Pro</title>
        <meta name="description" content="Planificación estratégica de exit y maximización de valuation para tu startup" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-gradient-to-r from-violet-500 to-violet-400 text-white px-3 py-1 rounded-neumorphic text-sm font-medium mr-3">
                  AC-010
                </div>
                <h1 className="text-4xl font-bold text-text-dark-primary">
                  Exit Strategy Planning
                </h1>
              </div>
              <p className="text-text-dark-secondary text-lg">
                Planifica tu estrategia de salida y maximiza la valuation de tu startup
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
            { id: 'matrix', label: 'Matriz Exit', icon: 'Target' },
            { id: 'timeline', label: 'Cronograma', icon: 'Calendar' },
            { id: 'tracker', label: 'Seguimiento', icon: 'DollarSign' }
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

export default ExitStrategyPlanning; 