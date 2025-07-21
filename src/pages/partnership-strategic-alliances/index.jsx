import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import ProgressHeader from '../founder-activity-dashboard/components/ProgressHeader';
import KPIWidgets from '../founder-activity-dashboard/components/KPIWidgets';
import TabNavigation from '../founder-activity-dashboard/components/TabNavigation';
import RoadmapTimeline from '../founder-activity-dashboard/components/RoadmapTimeline';
import ActivityDetailModal from '../founder-activity-dashboard/components/ActivityDetailModal';
import PartnershipMatrix from './components/PartnershipMatrix';
import PartnershipTracker from './components/PartnershipTracker';

const PartnershipStrategicAlliances = () => {
  const [activeTab, setActiveTab] = useState('matrix');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Partnership & Strategic Alliances data structure
  const partnershipData = useMemo(() => ({
    phases: [
      {
        id: 'ideation',
        name: 'Ideación',
        startDate: '2025-01-01',
        endDate: '2025-02-28',
        status: 'completed',
        activities: [
          { id: 'partnership-strategy-design', name: 'Diseño Estrategia Partnerships', status: 'completed', priority: 'high', dueDate: '2025-01-15', area: 'partnership-strategy' },
          { id: 'alliance-framework-setup', name: 'Setup Framework Alianzas', status: 'completed', priority: 'high', dueDate: '2025-01-20', area: 'strategic-alliances' },
          { id: 'business-development-planning', name: 'Planning Business Development', status: 'completed', priority: 'high', dueDate: '2025-01-25', area: 'business-development' },
          { id: 'channel-partner-identification', name: 'Identificación Channel Partners', status: 'completed', priority: 'medium', dueDate: '2025-02-05', area: 'channel-partnerships' },
          { id: 'ecosystem-mapping-initial', name: 'Mapeo Inicial del Ecosistema', status: 'completed', priority: 'medium', dueDate: '2025-02-15', area: 'ecosystem-management' }
        ]
      },
      {
        id: 'validation',
        name: 'Validación',
        startDate: '2025-03-01',
        endDate: '2025-04-30',
        status: 'in-progress',
        activities: [
          { id: 'partnership-pipeline-development', name: 'Desarrollo Pipeline Partnerships', status: 'completed', priority: 'high', dueDate: '2025-03-15', area: 'partnership-strategy' },
          { id: 'strategic-alliance-negotiations', name: 'Negociaciones Alianzas Estratégicas', status: 'in-progress', priority: 'high', dueDate: '2025-03-30', area: 'strategic-alliances' },
          { id: 'business-development-execution', name: 'Ejecución Business Development', status: 'in-progress', priority: 'high', dueDate: '2025-04-10', area: 'business-development' },
          { id: 'channel-partner-onboarding', name: 'Onboarding Channel Partners', status: 'pending', priority: 'high', dueDate: '2025-04-20', area: 'channel-partnerships' },
          { id: 'ecosystem-relationship-building', name: 'Building Relaciones Ecosistema', status: 'pending', priority: 'medium', dueDate: '2025-04-30', area: 'ecosystem-management' }
        ]
      },
      {
        id: 'launch',
        name: 'Lanzamiento',
        startDate: '2025-05-01',
        endDate: '2025-06-30',
        status: 'pending',
        activities: [
          { id: 'active-partnership-management', name: 'Gestión Activa Partnerships', status: 'pending', priority: 'high', dueDate: '2025-05-15', area: 'partnership-strategy' },
          { id: 'alliance-activation-launch', name: 'Lanzamiento Activación Alianzas', status: 'pending', priority: 'high', dueDate: '2025-05-20', area: 'strategic-alliances' },
          { id: 'business-development-scaling', name: 'Escalamiento Business Development', status: 'pending', priority: 'high', dueDate: '2025-06-01', area: 'business-development' },
          { id: 'channel-program-optimization', name: 'Optimización Programa Channel', status: 'pending', priority: 'medium', dueDate: '2025-06-15', area: 'channel-partnerships' },
          { id: 'ecosystem-engagement-expansion', name: 'Expansión Engagement Ecosistema', status: 'pending', priority: 'medium', dueDate: '2025-06-30', area: 'ecosystem-management' }
        ]
      },
      {
        id: 'growth',
        name: 'Crecimiento',
        startDate: '2025-07-01',
        endDate: '2025-09-30',
        status: 'pending',
        activities: [
          { id: 'partnership-portfolio-expansion', name: 'Expansión Portfolio Partnerships', status: 'pending', priority: 'high', dueDate: '2025-07-31', area: 'partnership-strategy' },
          { id: 'strategic-alliance-optimization', name: 'Optimización Alianzas Estratégicas', status: 'pending', priority: 'high', dueDate: '2025-08-15', area: 'strategic-alliances' },
          { id: 'business-development-automation', name: 'Automatización Business Development', status: 'pending', priority: 'medium', dueDate: '2025-08-31', area: 'business-development' },
          { id: 'channel-partner-excellence', name: 'Excelencia Channel Partners', status: 'pending', priority: 'medium', dueDate: '2025-09-15', area: 'channel-partnerships' },
          { id: 'ecosystem-leadership-positioning', name: 'Posicionamiento Liderazgo Ecosistema', status: 'pending', priority: 'low', dueDate: '2025-09-30', area: 'ecosystem-management' }
        ]
      },
      {
        id: 'scaling',
        name: 'Escalamiento',
        startDate: '2025-10-01',
        endDate: '2025-12-31',
        status: 'pending',
        activities: [
          { id: 'global-partnership-network', name: 'Red Global de Partnerships', status: 'pending', priority: 'high', dueDate: '2025-10-31', area: 'partnership-strategy' },
          { id: 'enterprise-alliance-management', name: 'Gestión Alianzas Enterprise', status: 'pending', priority: 'high', dueDate: '2025-11-30', area: 'strategic-alliances' },
          { id: 'business-development-excellence', name: 'Excelencia Business Development', status: 'pending', priority: 'medium', dueDate: '2025-12-15', area: 'business-development' },
          { id: 'ecosystem-thought-leadership', name: 'Thought Leadership Ecosistema', status: 'pending', priority: 'low', dueDate: '2025-12-31', area: 'ecosystem-management' }
        ]
      }
    ],
    partnershipAreas: [
      'partnership-strategy', 
      'strategic-alliances', 
      'business-development', 
      'channel-partnerships', 
      'ecosystem-management'
    ],
    milestones: [
      { id: 'strategic-partnership-tier1', name: 'Strategic Partnership Tier 1', targetDate: '2025-04-15', status: 'pending', progress: 70, metric: '3+ Tier 1 partners' },
      { id: 'channel-partner-network', name: 'Channel Partner Network 10+', targetDate: '2025-06-01', status: 'pending', progress: 45, metric: '10+ active channels' },
      { id: 'ecosystem-influence-leadership', name: 'Ecosystem Influence & Leadership', targetDate: '2025-08-31', status: 'pending', progress: 30, metric: '&gt;50% market awareness' },
      { id: 'global-alliance-expansion', name: 'Global Alliance Expansion', targetDate: '2025-12-31', status: 'pending', progress: 20, metric: '5+ countries coverage' }
    ]
  }), []);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const allActivities = partnershipData.phases.flatMap(phase => phase.activities);
    const completedCount = allActivities.filter(activity => activity.status === 'completed').length;
    return Math.round((completedCount / allActivities.length) * 100);
  }, [partnershipData]);

  // Calculate KPI data specific to Partnership & Strategic Alliances
  const kpiData = useMemo(() => {
    const allActivities = partnershipData.phases.flatMap(phase => phase.activities);
    const today = new Date();
    
    const partnershipTasksCompleted = allActivities.filter(activity => 
      activity.status === 'completed'
    ).length;
    
    const criticalPartnershipTasks = allActivities.filter(activity => 
      activity.priority === 'high' && activity.status !== 'completed'
    ).length;
    
    const partnershipMilestonesUpcoming = partnershipData.milestones.filter(milestone => {
      const targetDate = new Date(milestone.targetDate);
      const daysFromNow = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
      return daysFromNow <= 90 && daysFromNow > 0;
    }).length;

    return {
      overdueTasks: partnershipTasksCompleted,
      highPriorityTasks: criticalPartnershipTasks,
      upcomingMilestones: partnershipMilestonesUpcoming
    };
  }, [partnershipData]);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };

  const handleExportData = () => {
    console.log('Exporting Partnership & Strategic Alliances data...');
    // TODO: Implementar exportación real
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'matrix':
        return <PartnershipMatrix activities={partnershipData} onActivityClick={handleActivityClick} />;
      case 'timeline':
        return <RoadmapTimeline activities={partnershipData} onActivityClick={handleActivityClick} />;
      case 'tracker':
        return <PartnershipTracker milestones={partnershipData.milestones} />;
      default:
        return <PartnershipMatrix activities={partnershipData} onActivityClick={handleActivityClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Helmet>
        <title>AC-008: Partnership Strategic Alliances - Founder Pro</title>
        <meta name="description" content="Gestión estratégica de partnerships y alianzas para el crecimiento acelerado de tu startup" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-400 text-white px-3 py-1 rounded-neumorphic text-sm font-medium mr-3">
                  AC-008
                </div>
                <h1 className="text-4xl font-bold text-text-dark-primary">
                  Partnership Strategic Alliances
                </h1>
              </div>
              <p className="text-text-dark-secondary text-lg">
                Desarrolla partnerships estratégicos y alianzas que aceleren el crecimiento de tu startup
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
            { id: 'matrix', label: 'Matriz Partnerships', icon: 'Handshake' },
            { id: 'timeline', label: 'Cronograma', icon: 'Calendar' },
            { id: 'tracker', label: 'Seguimiento', icon: 'Network' }
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

export default PartnershipStrategicAlliances; 