import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import KPIWidgets from './components/KPIWidgets';
import StrategicMatrix from './components/StrategicMatrix';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const FounderDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Strategic Overview', count: 11 },
    { id: 'resources', label: 'Founder Resources', count: 5 },
    { id: 'timeline', label: 'Milestone Timeline', count: 8 }
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">
              Founder Pro Dashboard
            </h1>
            <p className="text-lg text-text-secondary">
              Your comprehensive platform to guide your startup from idea to launch and beyond
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" icon="RefreshCcw">
              Refresh
            </Button>
            <Button variant="primary" icon="Download">
              Export Report
            </Button>
          </div>
        </div>

        {/* Founder Score Card */}
        <div className="bg-gradient-card p-8 rounded-2xl shadow-soft border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                {/* Circular Progress */}
                <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-soft">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-600">72%</span>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-card">
                  <Icon name="TrendingUp" size={16} className="text-white" />
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-text-primary mb-1">Founder Score™</h3>
                <p className="text-text-secondary mb-2">Your startup maturity and strategic readiness score</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-success font-medium">📈 On Track</span>
                  <span className="text-text-muted">Last updated: 2 hours ago</span>
                  <span className="text-text-muted">11 AC modules active</span>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              View Analysis
            </Button>
          </div>
        </div>

        {/* KPI Widgets */}
        <KPIWidgets />

        {/* Tab Navigation */}
        <div className="bg-gradient-card rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-all duration-200
                    ${activeTab === tab.id
                      ? 'bg-gradient-primary text-white shadow-soft border-b-2 border-transparent'
                      : 'text-text-secondary hover:text-text-primary hover:bg-gray-50'
                    }
                  `}
                >
                  <span>{tab.label}</span>
                  <span className={`
                    px-2 py-0.5 rounded-lg text-xs font-medium
                    ${activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-text-muted'
                    }
                  `}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-8">
            {activeTab === 'overview' && <StrategicMatrix />}
            {activeTab === 'resources' && (
              <div className="text-center py-12">
                <Icon name="BookOpen" size={48} className="text-text-muted mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">Founder Resources</h3>
                <p className="text-text-secondary">Access curated resources and guides for your startup journey.</p>
              </div>
            )}
            {activeTab === 'timeline' && (
              <div className="text-center py-12">
                <Icon name="Calendar" size={48} className="text-text-muted mb-4 mx-auto" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">Milestone Timeline</h3>
                <p className="text-text-secondary">Track your startup milestones and key achievements.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-soft-lg transition-all duration-300 cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="Target" size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">Strategic Planning</h4>
                <p className="text-sm text-text-secondary">Review and update core strategy</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-success bg-success/10 px-2 py-1 rounded-lg">Active</span>
              <Icon name="ArrowRight" size={16} className="text-text-muted group-hover:text-primary-500 transition-colors" />
            </div>
          </div>

          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-soft-lg transition-all duration-300 cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="Search" size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">Market Research</h4>
                <p className="text-sm text-text-secondary">Validate market assumptions</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-info bg-info/10 px-2 py-1 rounded-lg">Connected</span>
              <Icon name="ArrowRight" size={16} className="text-text-muted group-hover:text-primary-500 transition-colors" />
            </div>
          </div>

          <div className="bg-gradient-card p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-soft-lg transition-all duration-300 cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-warning rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon name="DollarSign" size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">Funding Pipeline</h4>
                <p className="text-sm text-text-secondary">Prepare for next funding round</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-warning bg-warning/10 px-2 py-1 rounded-lg">In Progress</span>
              <Icon name="ArrowRight" size={16} className="text-text-muted group-hover:text-primary-500 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default FounderDashboard;