import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import ProgressHeader from '../founder-activity-dashboard/components/ProgressHeader';
import KPIWidgets from '../founder-activity-dashboard/components/KPIWidgets';
import TabNavigation from '../founder-activity-dashboard/components/TabNavigation';
import RoadmapTimeline from '../founder-activity-dashboard/components/RoadmapTimeline';
import ActivityDetailModal from '../founder-activity-dashboard/components/ActivityDetailModal';
import InvestmentMatrix from './components/InvestmentMatrix';
import InvestmentTracker from './components/InvestmentTracker';

const InvestmentFundraising = () => {
  const [activeTab, setActiveTab] = useState('matrix');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Investment & Fundraising data structure
  const investmentData = useMemo(() => ({
    phases: [
      {
        id: 'ideation',
        name: 'Ideación',
        startDate: '2025-01-01',
        endDate: '2025-02-28',
        status: 'completed',
        activities: [
          { id: 'fundraising-strategy-design', name: 'Diseño Estrategia Fundraising', status: 'completed', priority: 'high', dueDate: '2025-01-15', area: 'fundraising-strategy' },
          { id: 'investor-persona-definition', name: 'Definición Investor Persona', status: 'completed', priority: 'high', dueDate: '2025-01-20', area: 'investor-relations' },
          { id: 'preliminary-valuation-model', name: 'Modelo Valuation Preliminar', status: 'completed', priority: 'high', dueDate: '2025-01-25', area: 'valuation-management' },
          { id: 'pitch-deck-outline', name: 'Outline del Pitch Deck', status: 'completed', priority: 'medium', dueDate: '2025-02-05', area: 'pitch-preparation' },
          { id: 'due-diligence-prep-planning', name: 'Planificación Prep Due Diligence', status: 'completed', priority: 'medium', dueDate: '2025-02-15', area: 'due-diligence' }
        ]
      },
      {
        id: 'validation',
        name: 'Validación',
        startDate: '2025-03-01',
        endDate: '2025-04-30',
        status: 'in-progress',
        activities: [
          { id: 'fundraising-execution-plan', name: 'Plan Ejecución Fundraising', status: 'completed', priority: 'high', dueDate: '2025-03-15', area: 'fundraising-strategy' },
          { id: 'investor-outreach-campaign', name: 'Campaña Outreach Investors', status: 'in-progress', priority: 'high', dueDate: '2025-03-30', area: 'investor-relations' },
          { id: 'financial-model-validation', name: 'Validación Modelo Financiero', status: 'in-progress', priority: 'high', dueDate: '2025-04-10', area: 'valuation-management' },
          { id: 'pitch-deck-development', name: 'Desarrollo Pitch Deck Completo', status: 'pending', priority: 'high', dueDate: '2025-04-20', area: 'pitch-preparation' },
          { id: 'data-room-setup', name: 'Setup Data Room Completo', status: 'pending', priority: 'medium', dueDate: '2025-04-30', area: 'due-diligence' }
        ]
      },
      {
        id: 'launch',
        name: 'Lanzamiento',
        startDate: '2025-05-01',
        endDate: '2025-06-30',
        status: 'pending',
        activities: [
          { id: 'active-fundraising-round', name: 'Ronda Fundraising Activa', status: 'pending', priority: 'high', dueDate: '2025-05-15', area: 'fundraising-strategy' },
          { id: 'investor-meetings-series', name: 'Serie Meetings con Investors', status: 'pending', priority: 'high', dueDate: '2025-05-20', area: 'investor-relations' },
          { id: 'term-sheet-negotiations', name: 'Negociaciones Term Sheet', status: 'pending', priority: 'high', dueDate: '2025-06-01', area: 'valuation-management' },
          { id: 'pitch-presentations-delivery', name: 'Entrega Pitch Presentations', status: 'pending', priority: 'medium', dueDate: '2025-06-15', area: 'pitch-preparation' },
          { id: 'due-diligence-process', name: 'Proceso Due Diligence', status: 'pending', priority: 'medium', dueDate: '2025-06-30', area: 'due-diligence' }
        ]
      },
      {
        id: 'growth',
        name: 'Crecimiento',
        startDate: '2025-07-01',
        endDate: '2025-09-30',
        status: 'pending',
        activities: [
          { id: 'post-funding-strategy', name: 'Estrategia Post-Funding', status: 'pending', priority: 'high', dueDate: '2025-07-31', area: 'fundraising-strategy' },
          { id: 'investor-relations-management', name: 'Gestión Relaciones Investors', status: 'pending', priority: 'high', dueDate: '2025-08-15', area: 'investor-relations' },
          { id: 'valuation-growth-tracking', name: 'Tracking Crecimiento Valuation', status: 'pending', priority: 'medium', dueDate: '2025-08-31', area: 'valuation-management' },
          { id: 'series-a-preparation', name: 'Preparación Serie A', status: 'pending', priority: 'medium', dueDate: '2025-09-15', area: 'pitch-preparation' },
          { id: 'ongoing-compliance-monitoring', name: 'Monitoreo Compliance Continuo', status: 'pending', priority: 'low', dueDate: '2025-09-30', area: 'due-diligence' }
        ]
      },
      {
        id: 'scaling',
        name: 'Escalamiento',
        startDate: '2025-10-01',
        endDate: '2025-12-31',
        status: 'pending',
        activities: [
          { id: 'series-a-fundraising', name: 'Fundraising Serie A', status: 'pending', priority: 'high', dueDate: '2025-10-31', area: 'fundraising-strategy' },
          { id: 'institutional-investor-relations', name: 'Relaciones Investors Institucionales', status: 'pending', priority: 'high', dueDate: '2025-11-30', area: 'investor-relations' },
          { id: 'enterprise-valuation-modeling', name: 'Modelado Valuation Enterprise', status: 'pending', priority: 'medium', dueDate: '2025-12-15', area: 'valuation-management' },
          { id: 'board-governance-optimization', name: 'Optimización Board Governance', status: 'pending', priority: 'low', dueDate: '2025-12-31', area: 'due-diligence' }
        ]
      }
    ],
    investmentAreas: [
      'fundraising-strategy', 
      'investor-relations', 
      'valuation-management', 
      'pitch-preparation', 
      'due-diligence'
    ],
    milestones: [
      { id: 'seed-round-completion', name: 'Seed Round $500K Completion', targetDate: '2025-04-15', status: 'pending', progress: 65, metric: '$500K target' },
      { id: 'investor-pipeline-development', name: 'Investor Pipeline 20+ Leads', targetDate: '2025-06-01', status: 'pending', progress: 40, metric: '20+ qualified leads' },
      { id: 'product-market-fit-validation', name: 'Product-Market Fit Validation', targetDate: '2025-08-31', status: 'pending', progress: 25, metric: '&gt;40% retention rate' },
      { id: 'series-a-readiness', name: 'Serie A Readiness $2M+', targetDate: '2025-12-31', status: 'pending', progress: 15, metric: '$2M+ ARR target' }
    ]
  }), []);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const allActivities = investmentData.phases.flatMap(phase => phase.activities);
    const completedCount = allActivities.filter(activity => activity.status === 'completed').length;
    return Math.round((completedCount / allActivities.length) * 100);
  }, [investmentData]);

  // Calculate KPI data specific to Investment & Fundraising
  const kpiData = useMemo(() => {
    const allActivities = investmentData.phases.flatMap(phase => phase.activities);
    const today = new Date();
    
    const fundraisingTasksCompleted = allActivities.filter(activity => 
      activity.status === 'completed'
    ).length;
    
    const criticalInvestmentTasks = allActivities.filter(activity => 
      activity.priority === 'high' && activity.status !== 'completed'
    ).length;
    
    const investmentMilestonesUpcoming = investmentData.milestones.filter(milestone => {
      const targetDate = new Date(milestone.targetDate);
      const daysFromNow = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
      return daysFromNow <= 90 && daysFromNow > 0;
    }).length;

    return {
      overdueTasks: fundraisingTasksCompleted,
      highPriorityTasks: criticalInvestmentTasks,
      upcomingMilestones: investmentMilestonesUpcoming
    };
  }, [investmentData]);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };

  const handleExportData = () => {
    console.log('Exporting Investment & Fundraising data...');
    // TODO: Implementar exportación real
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'matrix':
        return <InvestmentMatrix activities={investmentData} onActivityClick={handleActivityClick} />;
      case 'timeline':
        return <RoadmapTimeline activities={investmentData} onActivityClick={handleActivityClick} />;
      case 'tracker':
        return <InvestmentTracker milestones={investmentData.milestones} />;
      default:
        return <InvestmentMatrix activities={investmentData} onActivityClick={handleActivityClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Helmet>
        <title>AC-007: Investment & Fundraising - Founder Pro</title>
        <meta name="description" content="Gestión estratégica de inversión y fundraising para el crecimiento de tu startup" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-400 text-white px-3 py-1 rounded-neumorphic text-sm font-medium mr-3">
                  AC-007
                </div>
                <h1 className="text-4xl font-bold text-text-dark-primary">
                  Investment & Fundraising
                </h1>
              </div>
              <p className="text-text-dark-secondary text-lg">
                Gestiona estratégicamente la inversión y fundraising para acelerar el crecimiento
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
            { id: 'matrix', label: 'Matriz Inversión', icon: 'PiggyBank' },
            { id: 'timeline', label: 'Cronograma', icon: 'Calendar' },
            { id: 'tracker', label: 'Seguimiento', icon: 'TrendingUp' }
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

export default InvestmentFundraising; 