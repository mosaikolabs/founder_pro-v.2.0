import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import ProgressHeader from '../founder-activity-dashboard/components/ProgressHeader';
import KPIWidgets from '../founder-activity-dashboard/components/KPIWidgets';
import TabNavigation from '../founder-activity-dashboard/components/TabNavigation';
import RoadmapTimeline from '../founder-activity-dashboard/components/RoadmapTimeline';
import ActivityDetailModal from '../founder-activity-dashboard/components/ActivityDetailModal';
import OperationsMatrix from './components/OperationsMatrix';
import OperationsTracker from './components/OperationsTracker';

const OperationsCustomerSuccess = () => {
  const [activeTab, setActiveTab] = useState('matrix');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Operations & Customer Success data structure
  const operationsData = useMemo(() => ({
    phases: [
      {
        id: 'ideation',
        name: 'Ideación',
        startDate: '2025-01-01',
        endDate: '2025-02-28',
        status: 'completed',
        activities: [
          { id: 'support-strategy-design', name: 'Diseño Estrategia Soporte', status: 'completed', priority: 'high', dueDate: '2025-01-15', area: 'customer-support' },
          { id: 'operations-framework-setup', name: 'Setup Framework Operacional', status: 'completed', priority: 'high', dueDate: '2025-01-20', area: 'operations-management' },
          { id: 'quality-standards-definition', name: 'Definición Estándares Calidad', status: 'completed', priority: 'high', dueDate: '2025-01-25', area: 'quality-assurance' },
          { id: 'process-mapping-initial', name: 'Mapeo Inicial de Procesos', status: 'completed', priority: 'medium', dueDate: '2025-02-05', area: 'process-optimization' },
          { id: 'customer-success-planning', name: 'Planificación Customer Success', status: 'completed', priority: 'medium', dueDate: '2025-02-15', area: 'customer-success' }
        ]
      },
      {
        id: 'validation',
        name: 'Validación',
        startDate: '2025-03-01',
        endDate: '2025-04-30',
        status: 'in-progress',
        activities: [
          { id: 'support-system-implementation', name: 'Implementación Sistema Soporte', status: 'completed', priority: 'high', dueDate: '2025-03-15', area: 'customer-support' },
          { id: 'operations-tools-deployment', name: 'Deploy Herramientas Operativas', status: 'in-progress', priority: 'high', dueDate: '2025-03-30', area: 'operations-management' },
          { id: 'qa-processes-validation', name: 'Validación Procesos QA', status: 'in-progress', priority: 'high', dueDate: '2025-04-10', area: 'quality-assurance' },
          { id: 'workflow-optimization-pilot', name: 'Piloto Optimización Workflows', status: 'pending', priority: 'high', dueDate: '2025-04-20', area: 'process-optimization' },
          { id: 'customer-onboarding-launch', name: 'Lanzamiento Onboarding', status: 'pending', priority: 'medium', dueDate: '2025-04-30', area: 'customer-success' }
        ]
      },
      {
        id: 'launch',
        name: 'Lanzamiento',
        startDate: '2025-05-01',
        endDate: '2025-06-30',
        status: 'pending',
        activities: [
          { id: 'support-team-scaling', name: 'Escalamiento Equipo Soporte', status: 'pending', priority: 'high', dueDate: '2025-05-15', area: 'customer-support' },
          { id: 'operations-automation', name: 'Automatización Operaciones', status: 'pending', priority: 'high', dueDate: '2025-05-20', area: 'operations-management' },
          { id: 'quality-monitoring-system', name: 'Sistema Monitoreo Calidad', status: 'pending', priority: 'high', dueDate: '2025-06-01', area: 'quality-assurance' },
          { id: 'process-standardization', name: 'Estandarización Procesos', status: 'pending', priority: 'medium', dueDate: '2025-06-15', area: 'process-optimization' },
          { id: 'customer-success-metrics', name: 'Métricas Customer Success', status: 'pending', priority: 'medium', dueDate: '2025-06-30', area: 'customer-success' }
        ]
      },
      {
        id: 'growth',
        name: 'Crecimiento',
        startDate: '2025-07-01',
        endDate: '2025-09-30',
        status: 'pending',
        activities: [
          { id: 'support-excellence-program', name: 'Programa Excelencia Soporte', status: 'pending', priority: 'high', dueDate: '2025-07-31', area: 'customer-support' },
          { id: 'operations-scaling-strategy', name: 'Estrategia Escalamiento Ops', status: 'pending', priority: 'high', dueDate: '2025-08-15', area: 'operations-management' },
          { id: 'quality-continuous-improvement', name: 'Mejora Continua Calidad', status: 'pending', priority: 'medium', dueDate: '2025-08-31', area: 'quality-assurance' },
          { id: 'advanced-process-optimization', name: 'Optimización Avanzada Procesos', status: 'pending', priority: 'medium', dueDate: '2025-09-15', area: 'process-optimization' },
          { id: 'customer-advocacy-program', name: 'Programa Customer Advocacy', status: 'pending', priority: 'low', dueDate: '2025-09-30', area: 'customer-success' }
        ]
      },
      {
        id: 'scaling',
        name: 'Escalamiento',
        startDate: '2025-10-01',
        endDate: '2025-12-31',
        status: 'pending',
        activities: [
          { id: 'global-support-infrastructure', name: 'Infraestructura Soporte Global', status: 'pending', priority: 'high', dueDate: '2025-10-31', area: 'customer-support' },
          { id: 'enterprise-operations-management', name: 'Gestión Operaciones Enterprise', status: 'pending', priority: 'high', dueDate: '2025-11-30', area: 'operations-management' },
          { id: 'iso-quality-certification', name: 'Certificación Calidad ISO', status: 'pending', priority: 'medium', dueDate: '2025-12-15', area: 'quality-assurance' },
          { id: 'global-process-harmonization', name: 'Armonización Procesos Global', status: 'pending', priority: 'low', dueDate: '2025-12-31', area: 'process-optimization' }
        ]
      }
    ],
    operationsAreas: [
      'customer-support', 
      'operations-management', 
      'quality-assurance', 
      'process-optimization', 
      'customer-success'
    ],
    milestones: [
      { id: 'support-sla-achievement', name: 'SLA Soporte 95% Achievement', targetDate: '2025-04-15', status: 'pending', progress: 75, metric: '&lt; 2h response time' },
      { id: 'operational-efficiency-target', name: 'Eficiencia Operacional 85%', targetDate: '2025-06-01', status: 'pending', progress: 50, metric: '85% automation' },
      { id: 'customer-satisfaction-nps', name: 'NPS Customer Satisfaction +70', targetDate: '2025-08-31', status: 'pending', progress: 35, metric: 'NPS Score &gt; 70' },
      { id: 'zero-defect-quality', name: 'Zero Defect Quality Program', targetDate: '2025-12-31', status: 'pending', progress: 20, metric: '&lt; 0.1% defect rate' }
    ]
  }), []);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const allActivities = operationsData.phases.flatMap(phase => phase.activities);
    const completedCount = allActivities.filter(activity => activity.status === 'completed').length;
    return Math.round((completedCount / allActivities.length) * 100);
  }, [operationsData]);

  // Calculate KPI data specific to Operations & Customer Success
  const kpiData = useMemo(() => {
    const allActivities = operationsData.phases.flatMap(phase => phase.activities);
    const today = new Date();
    
    const operationsTasksCompleted = allActivities.filter(activity => 
      activity.status === 'completed'
    ).length;
    
    const criticalOperationsTasks = allActivities.filter(activity => 
      activity.priority === 'high' && activity.status !== 'completed'
    ).length;
    
    const operationsMilestonesUpcoming = operationsData.milestones.filter(milestone => {
      const targetDate = new Date(milestone.targetDate);
      const daysFromNow = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
      return daysFromNow <= 90 && daysFromNow > 0;
    }).length;

    return {
      overdueTasks: operationsTasksCompleted,
      highPriorityTasks: criticalOperationsTasks,
      upcomingMilestones: operationsMilestonesUpcoming
    };
  }, [operationsData]);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };

  const handleExportData = () => {
    console.log('Exporting Operations & Customer Success data...');
    // TODO: Implementar exportación real
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'matrix':
        return <OperationsMatrix activities={operationsData} onActivityClick={handleActivityClick} />;
      case 'timeline':
        return <RoadmapTimeline activities={operationsData} onActivityClick={handleActivityClick} />;
      case 'tracker':
        return <OperationsTracker milestones={operationsData.milestones} />;
      default:
        return <OperationsMatrix activities={operationsData} onActivityClick={handleActivityClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Helmet>
        <title>AC-006: Operations & Customer Success - Founder Pro</title>
        <meta name="description" content="Optimización operacional y éxito del cliente para la excelencia de tu startup" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-400 text-white px-3 py-1 rounded-neumorphic text-sm font-medium mr-3">
                  AC-006
                </div>
                <h1 className="text-4xl font-bold text-text-dark-primary">
                  Operations & Customer Success
                </h1>
              </div>
              <p className="text-text-dark-secondary text-lg">
                Optimiza operaciones y garantiza el éxito y satisfacción de tus clientes
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
            { id: 'matrix', label: 'Matriz Operaciones', icon: 'Settings' },
            { id: 'timeline', label: 'Cronograma', icon: 'Calendar' },
            { id: 'tracker', label: 'Seguimiento', icon: 'CheckCircle' }
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

export default OperationsCustomerSuccess; 