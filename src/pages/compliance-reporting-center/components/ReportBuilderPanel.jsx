// src/pages/compliance-reporting-center/components/ReportBuilderPanel.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ReportBuilderPanel = ({ 
  reportComponents = [], // Add default value
  onComponentAdd, 
  onComponentRemove, 
  onComponentReorder,
  isGenerating,
  onGenerate 
}) => {
  const [activeTab, setActiveTab] = useState('components');
  const [draggedComponent, setDraggedComponent] = useState(null);

  const availableComponents = [
    {
      id: 'kpi-overview',
      name: 'KPI Overview',
      icon: 'BarChart3',
      category: 'Summary',
      description: 'Key performance indicators dashboard',
      preview: 'Executive summary with compliance metrics'
    },
    {
      id: 'control-status',
      name: 'Control Status Matrix',
      icon: 'Grid3X3',
      category: 'Controls',
      description: 'Control implementation and testing status',
      preview: 'Detailed control effectiveness analysis'
    },
    {
      id: 'trend-analysis',
      name: 'Trend Analysis',
      icon: 'TrendingUp',
      category: 'Analytics',
      description: 'Historical compliance trend visualization',
      preview: 'Time-series analysis of compliance metrics'
    },
    {
      id: 'risk-heatmap',
      name: 'Risk Heat Map',
      icon: 'Thermometer',
      category: 'Risk',
      description: 'Risk assessment visualization by department',
      preview: 'Color-coded risk matrix with impact analysis'
    },
    {
      id: 'audit-findings',
      name: 'Audit Findings Summary',
      icon: 'Search',
      category: 'Audit',
      description: 'Consolidated audit observations and recommendations',
      preview: 'Findings categorized by severity and department'
    },
    {
      id: 'policy-compliance',
      name: 'Policy Compliance Table',
      icon: 'BookOpen',
      category: 'Policies',
      description: 'Policy adherence tracking across departments',
      preview: 'Policy status with expiration tracking'
    },
    {
      id: 'regulatory-mapping',
      name: 'Regulatory Framework Mapping',
      icon: 'Shield',
      category: 'Regulatory',
      description: 'Control mapping to regulatory requirements',
      preview: 'Cross-reference of controls to regulations'
    },
    {
      id: 'executive-summary',
      name: 'Executive Summary',
      icon: 'FileText',
      category: 'Summary',
      description: 'High-level compliance overview for executives',
      preview: 'Concise summary with key recommendations'
    }
  ];

  const categories = [...new Set(availableComponents.map(comp => comp.category))];

  const handleDragStart = (e, component) => {
    setDraggedComponent(component);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedComponent) {
      onComponentAdd?.(draggedComponent);
      setDraggedComponent(null);
    }
  };

  const handleComponentDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleComponentDragOver = (e) => {
    e.preventDefault();
  };

  const handleComponentDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    if (dragIndex !== dropIndex) {
      onComponentReorder?.(dragIndex, dropIndex);
    }
  };

  const renderComponentLibrary = () => (
    <div className="space-y-4">
      <div className="text-sm text-text-dark-secondary mb-4">
        Drag components to the report builder to add them to your report.
      </div>
      
      {categories.map(category => (
        <div key={category} className="space-y-2">
          <h4 className="text-sm font-medium text-text-dark-primary">{category}</h4>
          <div className="grid grid-cols-1 gap-2">
            {availableComponents
              .filter(comp => comp.category === category)
              .map(component => (
                <div
                  key={component.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, component)}
                  className="p-3 neumorphic-card cursor-move hover:shadow-neumorphic-hover nav-transition group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-dark-surface rounded-lg group-hover:bg-neon-green group-hover:text-dark-primary nav-transition">
                      <Icon name={component.icon} size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-medium text-text-dark-primary mb-1">
                        {component.name}
                      </h5>
                      <p className="text-xs text-text-dark-secondary mb-2">
                        {component.description}
                      </p>
                      <div className="text-xs text-neon-green font-medium">
                        {component.preview}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      ))}
    </div>
  );

  const renderReportBuilder = () => (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div 
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          min-h-64 border-2 border-dashed rounded-lg p-6 nav-transition
          ${(reportComponents?.length || 0) === 0 
            ? 'border-white/20 bg-dark-surface/50 flex items-center justify-center' 
            : 'border-transparent'
          }
        `}
      >
        {(reportComponents?.length || 0) === 0 ? (
          <div className="text-center">
            <Icon name="Plus" size={32} className="text-text-dark-secondary mx-auto mb-4" />
            <p className="text-text-dark-secondary mb-2">Drop report components here</p>
            <p className="text-sm text-text-dark-secondary">
              Drag components from the library to build your report
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {reportComponents?.map((component, index) => (
              <div
                key={component?.id}
                draggable
                onDragStart={(e) => handleComponentDragStart(e, index)}
                onDragOver={handleComponentDragOver}
                onDrop={(e) => handleComponentDrop(e, index)}
                className="neumorphic-card p-4 cursor-move hover:shadow-neumorphic-hover nav-transition group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-neon-green text-dark-primary rounded-lg">
                      <Icon name={component?.icon} size={16} />
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-text-dark-primary mb-1">
                        {component?.name}
                      </h5>
                      <p className="text-xs text-text-dark-secondary">
                        {component?.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-text-dark-secondary hover:text-text-dark-primary nav-transition">
                      <Icon name="Settings" size={14} />
                    </button>
                    <button 
                      onClick={() => onComponentRemove?.(component?.id)}
                      className="p-1 text-text-dark-secondary hover:text-error-dark nav-transition"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                    <div className="p-1 text-text-dark-secondary cursor-move">
                      <Icon name="GripVertical" size={14} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Generate Button */}
      <div className="pt-4 border-t border-white border-opacity-10">
        <button
          onClick={onGenerate}
          disabled={(reportComponents?.length || 0) === 0 || isGenerating}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-accent text-white rounded-lg font-medium hover:shadow-glow-neon nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span>Generating Report...</span>
            </>
          ) : (
            <>
              <Icon name="Play" size={16} />
              <span>Generate Report</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col neumorphic-card">
      {/* Header */}
      <div className="p-4 border-b border-white border-opacity-10">
        <h2 className="text-lg font-medium text-text-dark-primary mb-4">
          Report Builder
        </h2>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-dark-surface p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('components')}
            className={`px-3 py-2 text-sm font-medium rounded-md nav-transition ${
              activeTab === 'components' ? 'bg-gradient-accent text-white shadow-sm' : 'text-text-dark-secondary hover:text-text-dark-primary'
            }`}
          >
            Components
          </button>
          <button
            onClick={() => setActiveTab('builder')}
            className={`px-3 py-2 text-sm font-medium rounded-md nav-transition ${
              activeTab === 'builder' ? 'bg-gradient-accent text-white shadow-sm' : 'text-text-dark-secondary hover:text-text-dark-primary'
            }`}
          >
            Builder ({reportComponents?.length || 0})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-dark p-4">
        {activeTab === 'components' ? renderComponentLibrary() : renderReportBuilder()}
      </div>
    </div>
  );
};

export default ReportBuilderPanel;