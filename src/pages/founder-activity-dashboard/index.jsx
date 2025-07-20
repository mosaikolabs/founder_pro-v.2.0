import React, { useState, useMemo } from 'react';
        import { Helmet } from 'react-helmet';
        import Button from '../../components/ui/Button';
        import ProgressHeader from './components/ProgressHeader';
        import KPIWidgets from './components/KPIWidgets';
        import TabNavigation from './components/TabNavigation';
        import RoadmapTimeline from './components/RoadmapTimeline';
        import ActivityMatrix from './components/ActivityMatrix';
        import MilestoneTracker from './components/MilestoneTracker';
        import ActivityDetailModal from './components/ActivityDetailModal';

        const FounderActivityDashboard = () => {
          const [activeTab, setActiveTab] = useState('roadmap');
          const [selectedActivity, setSelectedActivity] = useState(null);
          const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

          // Mock data for founder activities
          const founderActivities = useMemo(() => ({
            phases: [
              {
                id: 'ideation',
                name: 'Ideation',
                startDate: '2025-01-01',
                endDate: '2025-02-28',
                status: 'completed',
                activities: [
                  { id: 'market-research', name: 'Market Research', status: 'completed', priority: 'high', dueDate: '2025-01-15', area: 'market' },
                  { id: 'problem-validation', name: 'Problem Validation', status: 'completed', priority: 'high', dueDate: '2025-01-30', area: 'product' },
                  { id: 'competitor-analysis', name: 'Competitor Analysis', status: 'completed', priority: 'medium', dueDate: '2025-02-10', area: 'market' },
                  { id: 'business-model', name: 'Business Model Canvas', status: 'completed', priority: 'high', dueDate: '2025-02-20', area: 'business' }
                ]
              },
              {
                id: 'validation',
                name: 'Validation',
                startDate: '2025-03-01',
                endDate: '2025-04-30',
                status: 'in-progress',
                activities: [
                  { id: 'mvp-development', name: 'MVP Development', status: 'completed', priority: 'high', dueDate: '2025-03-31', area: 'product' },
                  { id: 'user-testing', name: 'User Testing', status: 'in-progress', priority: 'high', dueDate: '2025-04-15', area: 'product' },
                  { id: 'feedback-collection', name: 'Feedback Collection', status: 'in-progress', priority: 'medium', dueDate: '2025-04-20', area: 'market' },
                  { id: 'iterate-product', name: 'Product Iteration', status: 'pending', priority: 'high', dueDate: '2025-04-30', area: 'product' }
                ]
              },
              {
                id: 'launch',
                name: 'Launch',
                startDate: '2025-05-01',
                endDate: '2025-06-30',
                status: 'pending',
                activities: [
                  { id: 'launch-strategy', name: 'Launch Strategy', status: 'pending', priority: 'high', dueDate: '2025-05-15', area: 'marketing' },
                  { id: 'marketing-campaign', name: 'Marketing Campaign', status: 'pending', priority: 'high', dueDate: '2025-05-31', area: 'marketing' },
                  { id: 'sales-funnel', name: 'Sales Funnel Setup', status: 'pending', priority: 'medium', dueDate: '2025-06-10', area: 'sales' },
                  { id: 'customer-support', name: 'Customer Support Setup', status: 'pending', priority: 'medium', dueDate: '2025-06-20', area: 'operations' }
                ]
              },
              {
                id: 'growth',
                name: 'Growth',
                startDate: '2025-07-01',
                endDate: '2025-09-30',
                status: 'pending',
                activities: [
                  { id: 'user-acquisition', name: 'User Acquisition', status: 'pending', priority: 'high', dueDate: '2025-07-31', area: 'marketing' },
                  { id: 'retention-strategy', name: 'Retention Strategy', status: 'pending', priority: 'high', dueDate: '2025-08-15', area: 'product' },
                  { id: 'revenue-optimization', name: 'Revenue Optimization', status: 'pending', priority: 'high', dueDate: '2025-08-31', area: 'business' },
                  { id: 'team-expansion', name: 'Team Expansion', status: 'pending', priority: 'medium', dueDate: '2025-09-15', area: 'operations' }
                ]
              },
              {
                id: 'scaling',
                name: 'Scaling',
                startDate: '2025-10-01',
                endDate: '2025-12-31',
                status: 'pending',
                activities: [
                  { id: 'funding-round', name: 'Funding Round', status: 'pending', priority: 'high', dueDate: '2025-10-31', area: 'business' },
                  { id: 'international-expansion', name: 'International Expansion', status: 'pending', priority: 'medium', dueDate: '2025-11-30', area: 'business' },
                  { id: 'process-automation', name: 'Process Automation', status: 'pending', priority: 'medium', dueDate: '2025-12-15', area: 'operations' },
                  { id: 'strategic-partnerships', name: 'Strategic Partnerships', status: 'pending', priority: 'high', dueDate: '2025-12-31', area: 'business' }
                ]
              }
            ],
            businessAreas: ['market', 'product', 'business', 'marketing', 'sales', 'operations'],
            milestones: [
              { id: 'first-customer', name: 'First Paying Customer', targetDate: '2025-04-15', status: 'pending', progress: 75 },
              { id: 'product-launch', name: 'Product Launch', targetDate: '2025-06-01', status: 'pending', progress: 45 },
              { id: 'break-even', name: 'Break Even Point', targetDate: '2025-08-31', status: 'pending', progress: 20 },
              { id: 'series-a', name: 'Series A Funding', targetDate: '2025-10-31', status: 'pending', progress: 10 }
            ]
          }), []);

          // Calculate overall progress
          const overallProgress = useMemo(() => {
            const allActivities = founderActivities.phases.flatMap(phase => phase.activities);
            const completedCount = allActivities.filter(activity => activity.status === 'completed').length;
            return Math.round((completedCount / allActivities.length) * 100);
          }, [founderActivities]);

          // Calculate KPI data
          const kpiData = useMemo(() => {
            const allActivities = founderActivities.phases.flatMap(phase => phase.activities);
            const today = new Date();
            
            const overdueTasks = allActivities.filter(activity => 
              new Date(activity.dueDate) < today && activity.status !== 'completed'
            ).length;
            
            const highPriorityTasks = allActivities.filter(activity => 
              activity.priority === 'high' && activity.status !== 'completed'
            ).length;
            
            const upcomingMilestones = founderActivities.milestones.filter(milestone => {
              const targetDate = new Date(milestone.targetDate);
              const daysFromNow = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));
              return daysFromNow <= 30 && daysFromNow > 0;
            }).length;

            return {
              overdueTasks,
              highPriorityTasks,
              upcomingMilestones
            };
          }, [founderActivities]);

          const handleActivityClick = (activity) => {
            setSelectedActivity(activity);
            setIsDetailModalOpen(true);
          };

          const handleExportToPDF = () => {
            // Mock PDF export functionality
            console.log('Exporting to PDF...');
            // In a real implementation, you would use a library like jsPDF or react-pdf
          };

          const renderTabContent = () => {
            switch (activeTab) {
              case 'roadmap':
                return <RoadmapTimeline activities={founderActivities} onActivityClick={handleActivityClick} />;
              case 'matrix':
                return <ActivityMatrix activities={founderActivities} onActivityClick={handleActivityClick} />;
              case 'milestones':
                return <MilestoneTracker milestones={founderActivities.milestones} />;
              default:
                return <RoadmapTimeline activities={founderActivities} onActivityClick={handleActivityClick} />;
            }
          };

          return (
            <div className="min-h-screen bg-gradient-dark">
              <Helmet>
                <title>Founder Activity Dashboard - Track Your Startup Journey</title>
                <meta name="description" content="Comprehensive founder activity tracking from ideation to scaling with timeline, matrix, and milestone views" />
              </Helmet>

              <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1 className="text-4xl font-bold text-text-dark-primary mb-2">
                        Founder Activity Dashboard
                      </h1>
                      <p className="text-text-dark-secondary text-lg">
                        Track your startup journey from ideation to scaling
                      </p>
                    </div>
                    <Button
                      variant="accent"
                      icon="Download"
                      onClick={handleExportToPDF}
                      className="hover:shadow-glow-neon"
                    >
                      Export PDF
                    </Button>
                  </div>

                  <ProgressHeader progress={overallProgress} />
                </div>

                {/* KPI Widgets */}
                <KPIWidgets data={kpiData} />

                {/* Tab Navigation */}
                <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

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

        export default FounderActivityDashboard;