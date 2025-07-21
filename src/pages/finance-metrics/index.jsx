import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import ProgressHeader from '../founder-activity-dashboard/components/ProgressHeader';
import KPIWidgets from '../founder-activity-dashboard/components/KPIWidgets';
import TabNavigation from '../founder-activity-dashboard/components/TabNavigation';
import RoadmapTimeline from '../founder-activity-dashboard/components/RoadmapTimeline';
import ActivityDetailModal from '../founder-activity-dashboard/components/ActivityDetailModal';
import FinanceMatrix from './components/FinanceMatrix';
import FinanceTracker from './components/FinanceTracker';

const FinanceMetrics = () => {
  const [activeTab, setActiveTab] = useState('matrix');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Finance & Metrics data structure
  const financeData = useMemo(() => ({
    phases: [
      {
        id: 'ideation',
        name: 'Ideación',
        startDate: '2025-01-01',
        endDate: '2025-02-28',
        status: 'completed',
        activities: [
          { id: 'financial-model-creation', name: 'Creación Modelo Financiero', status: 'completed', priority: 'high', dueDate: '2025-01-15', area: 'budgeting' },
          { id: 'revenue-projections', name: 'Proyecciones de Ingresos', status: 'completed', priority: 'high', dueDate: '2025-01-20', area: 'revenue' },
          { id: 'cost-structure-analysis', name: 'Análisis Estructura Costos', status: 'completed', priority: 'high', dueDate: '2025-01-25', area: 'expenses' },
          { id: 'funding-requirements', name: 'Requerimientos de Financiación', status: 'completed', priority: 'medium', dueDate: '2025-02-05', area: 'investments' },
          { id: 'financial-kpis-definition', name: 'Definición KPIs Financieros', status: 'completed', priority: 'medium', dueDate: '2025-02-15', area: 'financial-planning' }
        ]
      },
      {
        id: 'validation',
        name: 'Validación',
        startDate: '2025-03-01',
        endDate: '2025-04-30',
        status: 'in-progress',
        activities: [
          { id: 'mvp-budget-tracking', name: 'Tracking Presupuesto MVP', status: 'completed', priority: 'high', dueDate: '2025-03-15', area: 'budgeting' },
          { id: 'first-revenue-streams', name: 'Primeros Flujos de Ingresos', status: 'in-progress', priority: 'high', dueDate: '2025-03-30', area: 'revenue' },
          { id: 'operational-expenses', name: 'Gastos Operativos', status: 'in-progress', priority: 'high', dueDate: '2025-04-10', area: 'expenses' },
          { id: 'angel-investor-outreach', name: 'Contacto Angel Investors', status: 'pending', priority: 'high', dueDate: '2025-04-20', area: 'investments' },
          { id: 'financial-reporting-setup', name: 'Setup Reportes Financieros', status: 'pending', priority: 'medium', dueDate: '2025-04-30', area: 'financial-planning' }
        ]
      },
      {
        id: 'launch',
        name: 'Lanzamiento',
        startDate: '2025-05-01',
        endDate: '2025-06-30',
        status: 'pending',
        activities: [
          { id: 'launch-budget-execution', name: 'Ejecución Presupuesto Lanzamiento', status: 'pending', priority: 'high', dueDate: '2025-05-15', area: 'budgeting' },
          { id: 'revenue-optimization', name: 'Optimización de Ingresos', status: 'pending', priority: 'high', dueDate: '2025-05-20', area: 'revenue' },
          { id: 'cost-optimization', name: 'Optimización de Costos', status: 'pending', priority: 'high', dueDate: '2025-06-01', area: 'expenses' },
          { id: 'seed-funding-round', name: 'Ronda Seed Funding', status: 'pending', priority: 'medium', dueDate: '2025-06-15', area: 'investments' },
          { id: 'financial-dashboard', name: 'Dashboard Financiero', status: 'pending', priority: 'medium', dueDate: '2025-06-30', area: 'financial-planning' }
        ]
      },
      {
        id: 'growth',
        name: 'Crecimiento',
        startDate: '2025-07-01',
        endDate: '2025-09-30',
        status: 'pending',
        activities: [
          { id: 'growth-budget-scaling', name: 'Escalamiento Presupuesto Crecimiento', status: 'pending', priority: 'high', dueDate: '2025-07-31', area: 'budgeting' },
          { id: 'revenue-diversification', name: 'Diversificación de Ingresos', status: 'pending', priority: 'high', dueDate: '2025-08-15', area: 'revenue' },
          { id: 'advanced-cost-management', name: 'Gestión Avanzada de Costos', status: 'pending', priority: 'medium', dueDate: '2025-08-31', area: 'expenses' },
          { id: 'series-a-preparation', name: 'Preparación Serie A', status: 'pending', priority: 'medium', dueDate: '2025-09-15', area: 'investments' },
          { id: 'advanced-financial-analytics', name: 'Analytics Financieros Avanzados', status: 'pending', priority: 'low', dueDate: '2025-09-30', area: 'financial-planning' }
        ]
      },
      {
        id: 'scaling',
        name: 'Escalamiento',
        startDate: '2025-10-01',
        endDate: '2025-12-31',
        status: 'pending',
        activities: [
          { id: 'enterprise-budgeting', name: 'Presupuestación Empresarial', status: 'pending', priority: 'high', dueDate: '2025-10-31', area: 'budgeting' },
          { id: 'global-revenue-streams', name: 'Flujos de Ingresos Globales', status: 'pending', priority: 'high', dueDate: '2025-11-30', area: 'revenue' },
          { id: 'enterprise-cost-structure', name: 'Estructura Costos Empresarial', status: 'pending', priority: 'medium', dueDate: '2025-12-15', area: 'expenses' },
          { id: 'institutional-funding', name: 'Financiación Institucional', status: 'pending', priority: 'low', dueDate: '2025-12-31', area: 'investments' }
        ]
      }
    ],
    financeAreas: [
      'budgeting', 
      'revenue', 
      'expenses', 
      'investments', 
      'financial-planning'
    ],
    milestones: [
      { id: 'break-even-point', name: 'Punto de Equilibrio', targetDate: '2025-04-15', status: 'pending', progress: 65, amount: '$50,000' },
      { id: 'first-profitable-month', name: 'Primer Mes Rentable', targetDate: '2025-06-01', status: 'pending', progress: 40, amount: '$75,000' },
      { id: 'seed-funding-closed', name: 'Cierre Seed Funding', targetDate: '2025-08-31', status: 'pending', progress: 25, amount: '$500,000' },
      { id: 'sustainable-profitability', name: 'Rentabilidad Sostenible', targetDate: '2025-12-31', status: 'pending', progress: 15, amount: '$1,000,000' }
    ]
  }), []);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const allActivities = financeData.phases.flatMap(phase => phase.activities);
    const completedCount = allActivities.filter(activity => activity.status === 'completed').length;
    return Math.round((completedCount / allActivities.length) * 100);
  }, [financeData]);

  // Calculate KPI data specific to Finance & Metrics
  const kpiData = useMemo(() => {
    const allActivities = financeData.phases.flatMap(phase => phase.activities);
    const today = new Date();
    
    const financialTasksCompleted = allActivities.filter(activity => 
      activity.status === 'completed'
    ).length;
    
    const criticalFinancialTasks = allActivities.filter(activity => 
      activity.priority === 'high' && activity.status !== 'completed'
    ).length;
    
    const financialMilestonesUpcoming = financeData.milestones.filter(milestone => {
      const targetDate = new Date(milestone.targetDate);
      const daysFromNow = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
      return daysFromNow <= 90 && daysFromNow > 0;
    }).length;

    return {
      overdueTasks: financialTasksCompleted,
      highPriorityTasks: criticalFinancialTasks,
      upcomingMilestones: financialMilestonesUpcoming
    };
  }, [financeData]);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };

  const handleExportData = () => {
    console.log('Exporting Finance & Metrics data...');
    // TODO: Implementar exportación real
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'matrix':
        return <FinanceMatrix activities={financeData} onActivityClick={handleActivityClick} />;
      case 'timeline':
        return <RoadmapTimeline activities={financeData} onActivityClick={handleActivityClick} />;
      case 'tracker':
        return <FinanceTracker milestones={financeData.milestones} />;
      default:
        return <FinanceMatrix activities={financeData} onActivityClick={handleActivityClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Helmet>
        <title>AC-004: Finanzas & Métricas - Founder Pro</title>
        <meta name="description" content="Gestión completa de finanzas, métricas y control financiero para tu startup" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-3 py-1 rounded-neumorphic text-sm font-medium mr-3">
                  AC-004
                </div>
                <h1 className="text-4xl font-bold text-text-dark-primary">
                  Finanzas & Métricas
                </h1>
              </div>
              <p className="text-text-dark-secondary text-lg">
                Controla las finanzas, métricas clave y sostenibilidad económica de tu startup
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
            { id: 'matrix', label: 'Matriz Financiera', icon: 'DollarSign' },
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

export default FinanceMetrics; 