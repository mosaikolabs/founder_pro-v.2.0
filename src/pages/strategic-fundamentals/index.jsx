import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import ProgressHeader from '../founder-activity-dashboard/components/ProgressHeader';
import KPIWidgets from '../founder-activity-dashboard/components/KPIWidgets';
import TabNavigation from '../founder-activity-dashboard/components/TabNavigation';
import RoadmapTimeline from '../founder-activity-dashboard/components/RoadmapTimeline';
import ActivityDetailModal from '../founder-activity-dashboard/components/ActivityDetailModal';
import StrategicMatrix from './components/StrategicMatrix';
import StrategicTracker from './components/StrategicTracker';

const StrategicFundamentals = () => {
  const [activeTab, setActiveTab] = useState('matrix');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Strategic Fundamentals data structure
  const strategicData = useMemo(() => ({
    phases: [
      {
        id: 'ideation',
        name: 'Ideación',
        startDate: '2025-01-01',
        endDate: '2025-02-28',
        status: 'completed',
        activities: [
          { id: 'vision-definition', name: 'Definición de Visión', status: 'completed', priority: 'high', dueDate: '2025-01-15', area: 'vision-mission' },
          { id: 'mission-statement', name: 'Declaración de Misión', status: 'completed', priority: 'high', dueDate: '2025-01-20', area: 'vision-mission' },
          { id: 'problem-identification', name: 'Identificación del Problema', status: 'completed', priority: 'high', dueDate: '2025-01-25', area: 'strategy-core' },
          { id: 'target-market-definition', name: 'Definición de Mercado Objetivo', status: 'completed', priority: 'medium', dueDate: '2025-02-05', area: 'market-analysis' },
          { id: 'initial-value-proposition', name: 'Propuesta de Valor Inicial', status: 'completed', priority: 'high', dueDate: '2025-02-15', area: 'strategy-core' }
        ]
      },
      {
        id: 'validation',
        name: 'Validación',
        startDate: '2025-03-01',
        endDate: '2025-04-30',
        status: 'in-progress',
        activities: [
          { id: 'market-research', name: 'Investigación de Mercado', status: 'completed', priority: 'high', dueDate: '2025-03-15', area: 'market-analysis' },
          { id: 'competitive-analysis', name: 'Análisis Competitivo', status: 'in-progress', priority: 'high', dueDate: '2025-03-30', area: 'competitive-advantage' },
          { id: 'business-model-canvas', name: 'Business Model Canvas', status: 'in-progress', priority: 'high', dueDate: '2025-04-10', area: 'business-model' },
          { id: 'value-proposition-testing', name: 'Testing Propuesta de Valor', status: 'pending', priority: 'high', dueDate: '2025-04-20', area: 'strategy-core' },
          { id: 'revenue-model-validation', name: 'Validación Modelo de Ingresos', status: 'pending', priority: 'medium', dueDate: '2025-04-30', area: 'business-model' }
        ]
      },
      {
        id: 'launch',
        name: 'Lanzamiento',
        startDate: '2025-05-01',
        endDate: '2025-06-30',
        status: 'pending',
        activities: [
          { id: 'go-to-market-strategy', name: 'Estrategia Go-to-Market', status: 'pending', priority: 'high', dueDate: '2025-05-15', area: 'strategy-core' },
          { id: 'positioning-strategy', name: 'Estrategia de Posicionamiento', status: 'pending', priority: 'high', dueDate: '2025-05-20', area: 'competitive-advantage' },
          { id: 'pricing-strategy', name: 'Estrategia de Precios', status: 'pending', priority: 'medium', dueDate: '2025-06-01', area: 'business-model' },
          { id: 'brand-strategy', name: 'Estrategia de Marca', status: 'pending', priority: 'medium', dueDate: '2025-06-15', area: 'vision-mission' },
          { id: 'customer-segmentation', name: 'Segmentación de Clientes', status: 'pending', priority: 'medium', dueDate: '2025-06-30', area: 'market-analysis' }
        ]
      },
      {
        id: 'growth',
        name: 'Crecimiento',
        startDate: '2025-07-01',
        endDate: '2025-09-30',
        status: 'pending',
        activities: [
          { id: 'market-expansion-strategy', name: 'Estrategia Expansión de Mercado', status: 'pending', priority: 'high', dueDate: '2025-07-31', area: 'market-analysis' },
          { id: 'competitive-differentiation', name: 'Diferenciación Competitiva', status: 'pending', priority: 'high', dueDate: '2025-08-15', area: 'competitive-advantage' },
          { id: 'business-model-optimization', name: 'Optimización Modelo Negocio', status: 'pending', priority: 'high', dueDate: '2025-08-31', area: 'business-model' },
          { id: 'strategic-partnerships', name: 'Alianzas Estratégicas', status: 'pending', priority: 'medium', dueDate: '2025-09-15', area: 'strategy-core' },
          { id: 'vision-refinement', name: 'Refinamiento de Visión', status: 'pending', priority: 'low', dueDate: '2025-09-30', area: 'vision-mission' }
        ]
      },
      {
        id: 'scaling',
        name: 'Escalamiento',
        startDate: '2025-10-01',
        endDate: '2025-12-31',
        status: 'pending',
        activities: [
          { id: 'long-term-strategy', name: 'Estrategia a Largo Plazo', status: 'pending', priority: 'high', dueDate: '2025-10-31', area: 'strategy-core' },
          { id: 'market-leadership-strategy', name: 'Estrategia Liderazgo de Mercado', status: 'pending', priority: 'medium', dueDate: '2025-11-30', area: 'competitive-advantage' },
          { id: 'diversification-strategy', name: 'Estrategia de Diversificación', status: 'pending', priority: 'medium', dueDate: '2025-12-15', area: 'business-model' },
          { id: 'legacy-vision', name: 'Visión de Legado', status: 'pending', priority: 'low', dueDate: '2025-12-31', area: 'vision-mission' }
        ]
      }
    ],
    strategicAreas: [
      'strategy-core', 
      'business-model', 
      'vision-mission', 
      'market-analysis', 
      'competitive-advantage'
    ],
    milestones: [
      { id: 'strategy-foundation', name: 'Fundamentos Estratégicos Completos', targetDate: '2025-04-15', status: 'pending', progress: 75 },
      { id: 'business-model-validated', name: 'Modelo de Negocio Validado', targetDate: '2025-06-01', status: 'pending', progress: 45 },
      { id: 'market-position-defined', name: 'Posición de Mercado Definida', targetDate: '2025-08-31', status: 'pending', progress: 20 },
      { id: 'strategic-roadmap-complete', name: 'Roadmap Estratégico Completo', targetDate: '2025-12-31', status: 'pending', progress: 10 }
    ]
  }), []);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const allActivities = strategicData.phases.flatMap(phase => phase.activities);
    const completedCount = allActivities.filter(activity => activity.status === 'completed').length;
    return Math.round((completedCount / allActivities.length) * 100);
  }, [strategicData]);

  // Calculate KPI data specific to Strategic Fundamentals
  const kpiData = useMemo(() => {
    const allActivities = strategicData.phases.flatMap(phase => phase.activities);
    const today = new Date();
    
    const strategicTasksCompleted = allActivities.filter(activity => 
      activity.status === 'completed'
    ).length;
    
    const criticalTasksPending = allActivities.filter(activity => 
      activity.priority === 'high' && activity.status !== 'completed'
    ).length;
    
    const strategicMilestonesUpcoming = strategicData.milestones.filter(milestone => {
      const targetDate = new Date(milestone.targetDate);
      const daysFromNow = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
      return daysFromNow <= 90 && daysFromNow > 0;
    }).length;

    return {
      overdueTasks: strategicTasksCompleted,
      highPriorityTasks: criticalTasksPending,
      upcomingMilestones: strategicMilestonesUpcoming
    };
  }, [strategicData]);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };

  const handleExportData = () => {
    console.log('Exporting Strategic Fundamentals data...');
    // TODO: Implementar exportación real
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'matrix':
        return <StrategicMatrix activities={strategicData} onActivityClick={handleActivityClick} />;
      case 'timeline':
        return <RoadmapTimeline activities={strategicData} onActivityClick={handleActivityClick} />;
      case 'tracker':
        return <StrategicTracker milestones={strategicData.milestones} />;
      default:
        return <StrategicMatrix activities={strategicData} onActivityClick={handleActivityClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Helmet>
        <title>AC-001: Fundamentos Estratégicos - Founder Pro</title>
        <meta name="description" content="Gestión de fundamentos estratégicos y modelo de negocio para tu startup" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-gradient-to-r from-neon-green to-emerald-400 text-white px-3 py-1 rounded-neumorphic text-sm font-medium mr-3">
                  AC-001
                </div>
                <h1 className="text-4xl font-bold text-text-dark-primary">
                  Fundamentos Estratégicos
                </h1>
              </div>
              <p className="text-text-dark-secondary text-lg">
                Establece la base estratégica sólida para el éxito de tu startup
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
            { id: 'matrix', label: 'Matriz Estratégica', icon: 'Grid3X3' },
            { id: 'timeline', label: 'Cronograma', icon: 'Calendar' },
            { id: 'tracker', label: 'Seguimiento', icon: 'Target' }
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

export default StrategicFundamentals; 