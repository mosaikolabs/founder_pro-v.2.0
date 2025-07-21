import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import ProgressHeader from '../founder-activity-dashboard/components/ProgressHeader';
import KPIWidgets from '../founder-activity-dashboard/components/KPIWidgets';
import TabNavigation from '../founder-activity-dashboard/components/TabNavigation';
import RoadmapTimeline from '../founder-activity-dashboard/components/RoadmapTimeline';
import ActivityDetailModal from '../founder-activity-dashboard/components/ActivityDetailModal';
import LegalMatrix from './components/LegalMatrix';
import LegalTracker from './components/LegalTracker';

const LegalCorporate = () => {
  const [activeTab, setActiveTab] = useState('matrix');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Legal & Corporate data structure
  const legalData = useMemo(() => ({
    phases: [
      {
        id: 'ideation',
        name: 'Ideación',
        startDate: '2025-01-01',
        endDate: '2025-02-28',
        status: 'completed',
        activities: [
          { id: 'business-structure-research', name: 'Investigación Estructura Empresarial', status: 'completed', priority: 'high', dueDate: '2025-01-15', area: 'corporate-structure' },
          { id: 'founder-agreements-draft', name: 'Borrador Acuerdos Fundadores', status: 'completed', priority: 'high', dueDate: '2025-01-20', area: 'contracts-agreements' },
          { id: 'trademark-research', name: 'Investigación de Marcas', status: 'completed', priority: 'medium', dueDate: '2025-01-25', area: 'intellectual-property' },
          { id: 'legal-requirements-map', name: 'Mapeo Requisitos Legales', status: 'completed', priority: 'high', dueDate: '2025-02-05', area: 'compliance-regulatory' },
          { id: 'legal-budget-planning', name: 'Planificación Presupuesto Legal', status: 'completed', priority: 'medium', dueDate: '2025-02-15', area: 'legal-documents' }
        ]
      },
      {
        id: 'validation',
        name: 'Validación',
        startDate: '2025-03-01',
        endDate: '2025-04-30',
        status: 'in-progress',
        activities: [
          { id: 'company-incorporation', name: 'Constitución de Empresa', status: 'completed', priority: 'high', dueDate: '2025-03-15', area: 'corporate-structure' },
          { id: 'founder-agreement-signing', name: 'Firma Acuerdo Fundadores', status: 'in-progress', priority: 'high', dueDate: '2025-03-30', area: 'contracts-agreements' },
          { id: 'trademark-registration', name: 'Registro de Marca', status: 'in-progress', priority: 'high', dueDate: '2025-04-10', area: 'intellectual-property' },
          { id: 'tax-registration', name: 'Registro Tributario', status: 'pending', priority: 'high', dueDate: '2025-04-20', area: 'compliance-regulatory' },
          { id: 'bylaws-creation', name: 'Creación de Estatutos', status: 'pending', priority: 'medium', dueDate: '2025-04-30', area: 'legal-documents' }
        ]
      },
      {
        id: 'launch',
        name: 'Lanzamiento',
        startDate: '2025-05-01',
        endDate: '2025-06-30',
        status: 'pending',
        activities: [
          { id: 'board-establishment', name: 'Establecimiento Junta Directiva', status: 'pending', priority: 'high', dueDate: '2025-05-15', area: 'corporate-structure' },
          { id: 'employment-contracts', name: 'Contratos de Trabajo', status: 'pending', priority: 'high', dueDate: '2025-05-20', area: 'contracts-agreements' },
          { id: 'ip-protection-strategy', name: 'Estrategia Protección PI', status: 'pending', priority: 'medium', dueDate: '2025-06-01', area: 'intellectual-property' },
          { id: 'privacy-policy', name: 'Política de Privacidad', status: 'pending', priority: 'medium', dueDate: '2025-06-15', area: 'compliance-regulatory' },
          { id: 'terms-conditions', name: 'Términos y Condiciones', status: 'pending', priority: 'medium', dueDate: '2025-06-30', area: 'legal-documents' }
        ]
      },
      {
        id: 'growth',
        name: 'Crecimiento',
        startDate: '2025-07-01',
        endDate: '2025-09-30',
        status: 'pending',
        activities: [
          { id: 'equity-structuring', name: 'Estructuración de Capital', status: 'pending', priority: 'high', dueDate: '2025-07-31', area: 'corporate-structure' },
          { id: 'investor-agreements', name: 'Acuerdos con Inversores', status: 'pending', priority: 'high', dueDate: '2025-08-15', area: 'contracts-agreements' },
          { id: 'patent-filing', name: 'Solicitud de Patentes', status: 'pending', priority: 'medium', dueDate: '2025-08-31', area: 'intellectual-property' },
          { id: 'data-protection-compliance', name: 'Cumplimiento Protección Datos', status: 'pending', priority: 'high', dueDate: '2025-09-15', area: 'compliance-regulatory' },
          { id: 'contract-templates', name: 'Plantillas de Contratos', status: 'pending', priority: 'low', dueDate: '2025-09-30', area: 'legal-documents' }
        ]
      },
      {
        id: 'scaling',
        name: 'Escalamiento',
        startDate: '2025-10-01',
        endDate: '2025-12-31',
        status: 'pending',
        activities: [
          { id: 'international-expansion-legal', name: 'Legal Expansión Internacional', status: 'pending', priority: 'high', dueDate: '2025-10-31', area: 'corporate-structure' },
          { id: 'acquisition-agreements', name: 'Acuerdos de Adquisición', status: 'pending', priority: 'medium', dueDate: '2025-11-30', area: 'contracts-agreements' },
          { id: 'ip-portfolio-management', name: 'Gestión Portfolio PI', status: 'pending', priority: 'medium', dueDate: '2025-12-15', area: 'intellectual-property' },
          { id: 'regulatory-strategy', name: 'Estrategia Regulatoria', status: 'pending', priority: 'high', dueDate: '2025-12-31', area: 'compliance-regulatory' }
        ]
      }
    ],
    legalAreas: [
      'corporate-structure', 
      'legal-documents', 
      'compliance-regulatory', 
      'intellectual-property', 
      'contracts-agreements'
    ],
    milestones: [
      { id: 'company-legally-established', name: 'Empresa Legalmente Establecida', targetDate: '2025-04-15', status: 'pending', progress: 75 },
      { id: 'ip-protection-complete', name: 'Protección PI Completa', targetDate: '2025-06-01', status: 'pending', progress: 45 },
      { id: 'compliance-framework-ready', name: 'Marco de Cumplimiento Listo', targetDate: '2025-08-31', status: 'pending', progress: 20 },
      { id: 'legal-scaling-prepared', name: 'Preparación Legal para Escalamiento', targetDate: '2025-12-31', status: 'pending', progress: 10 }
    ]
  }), []);

  // Calculate overall progress
  const overallProgress = useMemo(() => {
    const allActivities = legalData.phases.flatMap(phase => phase.activities);
    const completedCount = allActivities.filter(activity => activity.status === 'completed').length;
    return Math.round((completedCount / allActivities.length) * 100);
  }, [legalData]);

  // Calculate KPI data specific to Legal & Corporate
  const kpiData = useMemo(() => {
    const allActivities = legalData.phases.flatMap(phase => phase.activities);
    const today = new Date();
    
    const legalTasksCompleted = allActivities.filter(activity => 
      activity.status === 'completed'
    ).length;
    
    const criticalLegalTasks = allActivities.filter(activity => 
      activity.priority === 'high' && activity.status !== 'completed'
    ).length;
    
    const legalMilestonesUpcoming = legalData.milestones.filter(milestone => {
      const targetDate = new Date(milestone.targetDate);
      const daysFromNow = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
      return daysFromNow <= 90 && daysFromNow > 0;
    }).length;

    return {
      overdueTasks: legalTasksCompleted,
      highPriorityTasks: criticalLegalTasks,
      upcomingMilestones: legalMilestonesUpcoming
    };
  }, [legalData]);

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };

  const handleExportData = () => {
    console.log('Exporting Legal & Corporate data...');
    // TODO: Implementar exportación real
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'matrix':
        return <LegalMatrix activities={legalData} onActivityClick={handleActivityClick} />;
      case 'timeline':
        return <RoadmapTimeline activities={legalData} onActivityClick={handleActivityClick} />;
      case 'tracker':
        return <LegalTracker milestones={legalData.milestones} />;
      default:
        return <LegalMatrix activities={legalData} onActivityClick={handleActivityClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Helmet>
        <title>AC-002: Legal & Corporativo - Founder Pro</title>
        <meta name="description" content="Gestión completa de aspectos legales y corporativos para tu startup" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-gradient-to-r from-neon-purple to-purple-400 text-white px-3 py-1 rounded-neumorphic text-sm font-medium mr-3">
                  AC-002
                </div>
                <h1 className="text-4xl font-bold text-text-dark-primary">
                  Legal & Corporativo
                </h1>
              </div>
              <p className="text-text-dark-secondary text-lg">
                Establece la estructura legal sólida y cumplimiento regulatorio para tu startup
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
            { id: 'matrix', label: 'Matriz Legal', icon: 'Scale' },
            { id: 'timeline', label: 'Cronograma', icon: 'Calendar' },
            { id: 'tracker', label: 'Seguimiento', icon: 'FileText' }
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

export default LegalCorporate; 