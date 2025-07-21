import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import ProgressHeader from '../founder-activity-dashboard/components/ProgressHeader';
import KPIWidgets from '../founder-activity-dashboard/components/KPIWidgets';
import TabNavigation from '../founder-activity-dashboard/components/TabNavigation';
import RoadmapTimeline from '../founder-activity-dashboard/components/RoadmapTimeline';
import ActivityDetailModal from '../founder-activity-dashboard/components/ActivityDetailModal';
import MarketingMatrix from './components/MarketingMatrix';
import MarketingTracker from './components/MarketingTracker';

const MarketingCustomerAcquisition = () => {
  const [activeTab, setActiveTab] = useState('matrix');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Marketing & Customer Acquisition data structure
  const marketingData = useMemo(() => ({
    phases: [
      {
        id: 'ideation',
        name: 'Ideación',
        startDate: '2025-01-01',
        endDate: '2025-02-28',
        status: 'completed',
        activities: [
          { id: 'target-audience-research', name: 'Investigación Audiencia Objetivo', status: 'completed', priority: 'high', dueDate: '2025-01-15', area: 'customer-acquisition' },
          { id: 'brand-identity-creation', name: 'Creación Identidad de Marca', status: 'completed', priority: 'high', dueDate: '2025-01-20', area: 'brand-marketing' },
          { id: 'digital-strategy-planning', name: 'Planificación Estrategia Digital', status: 'completed', priority: 'high', dueDate: '2025-01-25', area: 'digital-marketing' },
          { id: 'content-strategy-definition', name: 'Definición Estrategia Contenido', status: 'completed', priority: 'medium', dueDate: '2025-02-05', area: 'content-strategy' },
          { id: 'analytics-setup-planning', name: 'Planificación Setup Analytics', status: 'completed', priority: 'medium', dueDate: '2025-02-15', area: 'analytics-optimization' }
        ]
      },
      {
        id: 'validation',
        name: 'Validación',
        startDate: '2025-03-01',
        endDate: '2025-04-30',
        status: 'in-progress',
        activities: [
          { id: 'mvp-customer-interviews', name: 'Entrevistas Clientes MVP', status: 'completed', priority: 'high', dueDate: '2025-03-15', area: 'customer-acquisition' },
          { id: 'brand-testing-campaigns', name: 'Campañas Testing Marca', status: 'in-progress', priority: 'high', dueDate: '2025-03-30', area: 'brand-marketing' },
          { id: 'initial-digital-campaigns', name: 'Campañas Digitales Iniciales', status: 'in-progress', priority: 'high', dueDate: '2025-04-10', area: 'digital-marketing' },
          { id: 'content-creation-launch', name: 'Lanzamiento Creación Contenido', status: 'pending', priority: 'high', dueDate: '2025-04-20', area: 'content-strategy' },
          { id: 'analytics-implementation', name: 'Implementación Analytics', status: 'pending', priority: 'medium', dueDate: '2025-04-30', area: 'analytics-optimization' }
        ]
      },
      {
        id: 'launch',
        name: 'Lanzamiento',
        startDate: '2025-05-01',
        endDate: '2025-06-30',
        status: 'pending',
        activities: [
          { id: 'launch-acquisition-campaign', name: 'Campaña Adquisición Lanzamiento', status: 'pending', priority: 'high', dueDate: '2025-05-15', area: 'customer-acquisition' },
          { id: 'brand-awareness-push', name: 'Push Brand Awareness', status: 'pending', priority: 'high', dueDate: '2025-05-20', area: 'brand-marketing' },
          { id: 'multi-channel-campaigns', name: 'Campañas Multi-canal', status: 'pending', priority: 'high', dueDate: '2025-06-01', area: 'digital-marketing' },
          { id: 'content-amplification', name: 'Amplificación de Contenido', status: 'pending', priority: 'medium', dueDate: '2025-06-15', area: 'content-strategy' },
          { id: 'conversion-optimization', name: 'Optimización Conversión', status: 'pending', priority: 'medium', dueDate: '2025-06-30', area: 'analytics-optimization' }
        ]
      },
      {
        id: 'growth',
        name: 'Crecimiento',
        startDate: '2025-07-01',
        endDate: '2025-09-30',
        status: 'pending',
        activities: [
          { id: 'growth-hacking-experiments', name: 'Experimentos Growth Hacking', status: 'pending', priority: 'high', dueDate: '2025-07-31', area: 'customer-acquisition' },
          { id: 'brand-expansion-strategy', name: 'Estrategia Expansión Marca', status: 'pending', priority: 'high', dueDate: '2025-08-15', area: 'brand-marketing' },
          { id: 'paid-advertising-scaling', name: 'Escalamiento Publicidad Pagada', status: 'pending', priority: 'medium', dueDate: '2025-08-31', area: 'digital-marketing' },
          { id: 'viral-content-strategy', name: 'Estrategia Contenido Viral', status: 'pending', priority: 'medium', dueDate: '2025-09-15', area: 'content-strategy' },
          { id: 'advanced-analytics-insights', name: 'Insights Analytics Avanzados', status: 'pending', priority: 'low', dueDate: '2025-09-30', area: 'analytics-optimization' }
        ]
      },
      {
        id: 'scaling',
        name: 'Escalamiento',
        startDate: '2025-10-01',
        endDate: '2025-12-31',
        status: 'pending',
        activities: [
          { id: 'global-acquisition-strategy', name: 'Estrategia Adquisición Global', status: 'pending', priority: 'high', dueDate: '2025-10-31', area: 'customer-acquisition' },
          { id: 'international-brand-strategy', name: 'Estrategia Marca Internacional', status: 'pending', priority: 'high', dueDate: '2025-11-30', area: 'brand-marketing' },
          { id: 'omnichannel-marketing', name: 'Marketing Omnicanal', status: 'pending', priority: 'medium', dueDate: '2025-12-15', area: 'digital-marketing' },
          { id: 'global-content-localization', name: 'Localización Contenido Global', status: 'pending', priority: 'low', dueDate: '2025-12-31', area: 'content-strategy' }
        ]
      }
    ],
    marketingAreas: [
      'customer-acquisition', 
      'brand-marketing', 
      'digital-marketing', 
      'content-strategy', 
      'analytics-optimization'
    ],
    milestones: [
      { id: 'first-1000-users', name: 'Primeros 1,000 Usuarios', targetDate: '2025-04-15', status: 'pending', progress: 70, metric: '1,000 usuarios' },
      { id: 'brand-recognition-10-percent', name: 'Brand Recognition 10%', targetDate: '2025-06-01', status: 'pending', progress: 45, metric: '10% reconocimiento' },
      { id: 'cac-ltv-positive-ratio', name: 'CAC/LTV Ratio Positivo', targetDate: '2025-08-31', status: 'pending', progress: 30, metric: 'LTV:CAC 3:1' },
      { id: 'viral-coefficient-achieved', name: 'Coeficiente Viral Logrado', targetDate: '2025-12-31', status: 'pending', progress: 15, metric: 'K-factor > 1.0' }
    ]
  }), []);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const allActivities = marketingData.phases.flatMap(phase => phase.activities);
    const completedCount = allActivities.filter(activity => activity.status === 'completed').length;
    return Math.round((completedCount / allActivities.length) * 100);
  }, [marketingData]);

  // Calculate KPI data specific to Marketing & Customer Acquisition
  const kpiData = useMemo(() => {
    const allActivities = marketingData.phases.flatMap(phase => phase.activities);
    const today = new Date();
    
    const marketingTasksCompleted = allActivities.filter(activity => 
      activity.status === 'completed'
    ).length;
    
    const criticalMarketingTasks = allActivities.filter(activity => 
      activity.priority === 'high' && activity.status !== 'completed'
    ).length;
    
    const marketingMilestonesUpcoming = marketingData.milestones.filter(milestone => {
      const targetDate = new Date(milestone.targetDate);
      const daysFromNow = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
      return daysFromNow <= 90 && daysFromNow > 0;
    }).length;

    return {
      overdueTasks: marketingTasksCompleted,
      highPriorityTasks: criticalMarketingTasks,
      upcomingMilestones: marketingMilestonesUpcoming
    };
  }, [marketingData]);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };

  const handleExportData = () => {
    console.log('Exporting Marketing & Customer Acquisition data...');
    // TODO: Implementar exportación real
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'matrix':
        return <MarketingMatrix activities={marketingData} onActivityClick={handleActivityClick} />;
      case 'timeline':
        return <RoadmapTimeline activities={marketingData} onActivityClick={handleActivityClick} />;
      case 'tracker':
        return <MarketingTracker milestones={marketingData.milestones} />;
      default:
        return <MarketingMatrix activities={marketingData} onActivityClick={handleActivityClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Helmet>
        <title>AC-005: Marketing & Customer Acquisition - Founder Pro</title>
        <meta name="description" content="Estrategias completas de marketing y adquisición de clientes para tu startup" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-3 py-1 rounded-neumorphic text-sm font-medium mr-3">
                  AC-005
                </div>
                <h1 className="text-4xl font-bold text-text-dark-primary">
                  Marketing & Customer Acquisition
                </h1>
              </div>
              <p className="text-text-dark-secondary text-lg">
                Acelera el crecimiento con estrategias efectivas de marketing y adquisición de clientes
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
            { id: 'matrix', label: 'Matriz Marketing', icon: 'Target' },
            { id: 'timeline', label: 'Cronograma', icon: 'Calendar' },
            { id: 'tracker', label: 'Seguimiento', icon: 'Users' }
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

export default MarketingCustomerAcquisition; 