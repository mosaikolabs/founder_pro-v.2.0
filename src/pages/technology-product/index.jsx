import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import ProgressHeader from '../founder-activity-dashboard/components/ProgressHeader';
import KPIWidgets from '../founder-activity-dashboard/components/KPIWidgets';
import TabNavigation from '../founder-activity-dashboard/components/TabNavigation';
import RoadmapTimeline from '../founder-activity-dashboard/components/RoadmapTimeline';
import ActivityDetailModal from '../founder-activity-dashboard/components/ActivityDetailModal';
import TechMatrix from './components/TechMatrix';
import TechTracker from './components/TechTracker';

const TechnologyProduct = () => {
  const [activeTab, setActiveTab] = useState('matrix');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Technology & Product data structure
  const techData = useMemo(() => ({
    phases: [
      {
        id: 'ideation',
        name: 'Ideación',
        startDate: '2025-01-01',
        endDate: '2025-02-28',
        status: 'completed',
        activities: [
          { id: 'tech-stack-research', name: 'Investigación Stack Tecnológico', status: 'completed', priority: 'high', dueDate: '2025-01-15', area: 'development' },
          { id: 'architecture-planning', name: 'Planificación Arquitectura', status: 'completed', priority: 'high', dueDate: '2025-01-20', area: 'infrastructure' },
          { id: 'security-requirements', name: 'Definición Requisitos Seguridad', status: 'completed', priority: 'high', dueDate: '2025-01-25', area: 'security' },
          { id: 'ux-wireframes', name: 'Wireframes & UX Inicial', status: 'completed', priority: 'medium', dueDate: '2025-02-05', area: 'user-experience' },
          { id: 'testing-strategy', name: 'Estrategia de Testing', status: 'completed', priority: 'medium', dueDate: '2025-02-15', area: 'testing' }
        ]
      },
      {
        id: 'validation',
        name: 'Validación',
        startDate: '2025-03-01',
        endDate: '2025-04-30',
        status: 'in-progress',
        activities: [
          { id: 'mvp-development', name: 'Desarrollo MVP', status: 'completed', priority: 'high', dueDate: '2025-03-15', area: 'development' },
          { id: 'infrastructure-setup', name: 'Setup Infraestructura Dev', status: 'in-progress', priority: 'high', dueDate: '2025-03-30', area: 'infrastructure' },
          { id: 'security-implementation', name: 'Implementación Seguridad Básica', status: 'in-progress', priority: 'high', dueDate: '2025-04-10', area: 'security' },
          { id: 'user-testing', name: 'Testing con Usuarios', status: 'pending', priority: 'high', dueDate: '2025-04-20', area: 'user-experience' },
          { id: 'automated-testing', name: 'Tests Automatizados', status: 'pending', priority: 'medium', dueDate: '2025-04-30', area: 'testing' }
        ]
      },
      {
        id: 'launch',
        name: 'Lanzamiento',
        startDate: '2025-05-01',
        endDate: '2025-06-30',
        status: 'pending',
        activities: [
          { id: 'production-deployment', name: 'Deploy a Producción', status: 'pending', priority: 'high', dueDate: '2025-05-15', area: 'development' },
          { id: 'production-infrastructure', name: 'Infraestructura Producción', status: 'pending', priority: 'high', dueDate: '2025-05-20', area: 'infrastructure' },
          { id: 'security-audit', name: 'Auditoría de Seguridad', status: 'pending', priority: 'high', dueDate: '2025-06-01', area: 'security' },
          { id: 'ux-optimization', name: 'Optimización UX', status: 'pending', priority: 'medium', dueDate: '2025-06-15', area: 'user-experience' },
          { id: 'performance-testing', name: 'Testing de Performance', status: 'pending', priority: 'medium', dueDate: '2025-06-30', area: 'testing' }
        ]
      },
      {
        id: 'growth',
        name: 'Crecimiento',
        startDate: '2025-07-01',
        endDate: '2025-09-30',
        status: 'pending',
        activities: [
          { id: 'feature-development', name: 'Desarrollo Nuevas Features', status: 'pending', priority: 'high', dueDate: '2025-07-31', area: 'development' },
          { id: 'scalability-improvements', name: 'Mejoras de Escalabilidad', status: 'pending', priority: 'high', dueDate: '2025-08-15', area: 'infrastructure' },
          { id: 'advanced-security', name: 'Seguridad Avanzada', status: 'pending', priority: 'medium', dueDate: '2025-08-31', area: 'security' },
          { id: 'ux-analytics', name: 'Analytics & UX Data', status: 'pending', priority: 'medium', dueDate: '2025-09-15', area: 'user-experience' },
          { id: 'load-testing', name: 'Testing de Carga', status: 'pending', priority: 'low', dueDate: '2025-09-30', area: 'testing' }
        ]
      },
      {
        id: 'scaling',
        name: 'Escalamiento',
        startDate: '2025-10-01',
        endDate: '2025-12-31',
        status: 'pending',
        activities: [
          { id: 'microservices-architecture', name: 'Arquitectura Microservicios', status: 'pending', priority: 'high', dueDate: '2025-10-31', area: 'development' },
          { id: 'cloud-native-infrastructure', name: 'Infraestructura Cloud Native', status: 'pending', priority: 'high', dueDate: '2025-11-30', area: 'infrastructure' },
          { id: 'enterprise-security', name: 'Seguridad Empresarial', status: 'pending', priority: 'medium', dueDate: '2025-12-15', area: 'security' },
          { id: 'global-ux', name: 'UX Global & Localización', status: 'pending', priority: 'low', dueDate: '2025-12-31', area: 'user-experience' }
        ]
      }
    ],
    techAreas: [
      'development', 
      'testing', 
      'infrastructure', 
      'security', 
      'user-experience'
    ],
    milestones: [
      { id: 'mvp-launch-ready', name: 'MVP Listo para Lanzamiento', targetDate: '2025-04-15', status: 'pending', progress: 75 },
      { id: 'production-stable', name: 'Producción Estable', targetDate: '2025-06-01', status: 'pending', progress: 45 },
      { id: 'scalable-architecture', name: 'Arquitectura Escalable', targetDate: '2025-08-31', status: 'pending', progress: 20 },
      { id: 'enterprise-ready', name: 'Enterprise Ready', targetDate: '2025-12-31', status: 'pending', progress: 10 }
    ]
  }), []);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const allActivities = techData.phases.flatMap(phase => phase.activities);
    const completedCount = allActivities.filter(activity => activity.status === 'completed').length;
    return Math.round((completedCount / allActivities.length) * 100);
  }, [techData]);

  // Calculate KPI data specific to Technology & Product
  const kpiData = useMemo(() => {
    const allActivities = techData.phases.flatMap(phase => phase.activities);
    const today = new Date();
    
    const techTasksCompleted = allActivities.filter(activity => 
      activity.status === 'completed'
    ).length;
    
    const criticalTechTasks = allActivities.filter(activity => 
      activity.priority === 'high' && activity.status !== 'completed'
    ).length;
    
    const techMilestonesUpcoming = techData.milestones.filter(milestone => {
      const targetDate = new Date(milestone.targetDate);
      const daysFromNow = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
      return daysFromNow <= 90 && daysFromNow > 0;
    }).length;

    return {
      overdueTasks: techTasksCompleted,
      highPriorityTasks: criticalTechTasks,
      upcomingMilestones: techMilestonesUpcoming
    };
  }, [techData]);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };

  const handleExportData = () => {
    console.log('Exporting Technology & Product data...');
    // TODO: Implementar exportación real
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'matrix':
        return <TechMatrix activities={techData} onActivityClick={handleActivityClick} />;
      case 'timeline':
        return <RoadmapTimeline activities={techData} onActivityClick={handleActivityClick} />;
      case 'tracker':
        return <TechTracker milestones={techData.milestones} />;
      default:
        return <TechMatrix activities={techData} onActivityClick={handleActivityClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Helmet>
        <title>AC-003: Tecnología & Producto - Founder Pro</title>
        <meta name="description" content="Gestión completa del desarrollo tecnológico y producto para tu startup" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-3 py-1 rounded-neumorphic text-sm font-medium mr-3">
                  AC-003
                </div>
                <h1 className="text-4xl font-bold text-text-dark-primary">
                  Tecnología & Producto
                </h1>
              </div>
              <p className="text-text-dark-secondary text-lg">
                Desarrolla la base tecnológica sólida y producto escalable para tu startup
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
            { id: 'matrix', label: 'Matriz Tech', icon: 'Code' },
            { id: 'timeline', label: 'Cronograma', icon: 'Calendar' },
            { id: 'tracker', label: 'Seguimiento', icon: 'Monitor' }
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

export default TechnologyProduct; 