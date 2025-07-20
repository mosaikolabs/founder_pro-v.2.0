// src/pages/control-detail-management/components/ControlDefinitionTab.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const ControlDefinitionTab = ({ controlData, onUpdate, userRole, disabled }) => {
  const [formData, setFormData] = useState({
    name: controlData?.name || '',
    description: controlData?.description || '',
    category: controlData?.category || '',
    framework: controlData?.framework || '',
    riskLevel: controlData?.riskLevel || 'Medium',
    owner: controlData?.owner || '',
    frequency: controlData?.frequency || 'Quarterly',
    scope: controlData?.scope || '',
    objectives: controlData?.objectives || '',
    controlType: controlData?.controlType || 'Preventive',
    automationLevel: controlData?.automationLevel || 'Manual',
    businessProcess: controlData?.businessProcess || '',
    regulatoryMapping: controlData?.regulatoryMapping || []
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [showRegulatoryMapping, setShowRegulatoryMapping] = useState(false);

  const frameworks = ['SOX', 'ISO 27001', 'GDPR', 'NIST', 'COSO', 'COBIT', 'ITIL'];
  const riskLevels = ['Critical', 'High', 'Medium', 'Low'];
  const controlTypes = ['Preventive', 'Detective', 'Corrective', 'Compensating'];
  const automationLevels = ['Fully Automated', 'Semi-Automated', 'Manual', 'IT-Dependent'];
  const frequencies = ['Continuous', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Semi-Annual', 'Annual'];

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate?.(updatedData);
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name?.trim()) {
      errors.name = 'Control name is required';
    }
    
    if (!formData.description?.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!formData.owner?.trim()) {
      errors.owner = 'Control owner is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addRegulatoryMapping = () => {
    const newMapping = {
      id: Date.now(),
      regulation: '',
      section: '',
      requirement: '',
      complianceLevel: 'Required'
    };
    
    const updatedMappings = [...formData.regulatoryMapping, newMapping];
    handleInputChange('regulatoryMapping', updatedMappings);
  };

  const updateRegulatoryMapping = (index, field, value) => {
    const updatedMappings = formData.regulatoryMapping.map((mapping, i) => 
      i === index ? { ...mapping, [field]: value } : mapping
    );
    handleInputChange('regulatoryMapping', updatedMappings);
  };

  const removeRegulatoryMapping = (index) => {
    const updatedMappings = formData.regulatoryMapping.filter((_, i) => i !== index);
    handleInputChange('regulatoryMapping', updatedMappings);
  };

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Info" size={20} className="text-primary" />
          <span>Basic Information</span>
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Control Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter control name"
                disabled={disabled}
                className={validationErrors.name ? 'border-error' : ''}
              />
              {validationErrors.name && (
                <p className="text-sm text-error mt-1">{validationErrors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                disabled={disabled}
                className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Select category</option>
                <option value="Security">Security</option>
                <option value="Financial">Financial</option>
                <option value="Operational">Operational</option>
                <option value="Compliance">Compliance</option>
                <option value="Data Protection">Data Protection</option>
                <option value="IT General">IT General</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Primary Framework
              </label>
              <select
                value={formData.framework}
                onChange={(e) => handleInputChange('framework', e.target.value)}
                disabled={disabled}
                className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Select framework</option>
                {frameworks.map(framework => (
                  <option key={framework} value={framework}>{framework}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Risk Level
              </label>
              <select
                value={formData.riskLevel}
                onChange={(e) => handleInputChange('riskLevel', e.target.value)}
                disabled={disabled}
                className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {riskLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Control Owner *
              </label>
              <Input
                value={formData.owner}
                onChange={(e) => handleInputChange('owner', e.target.value)}
                placeholder="Enter control owner"
                disabled={disabled}
                className={validationErrors.owner ? 'border-error' : ''}
              />
              {validationErrors.owner && (
                <p className="text-sm text-error mt-1">{validationErrors.owner}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Control Type
              </label>
              <select
                value={formData.controlType}
                onChange={(e) => handleInputChange('controlType', e.target.value)}
                disabled={disabled}
                className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {controlTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Automation Level
              </label>
              <select
                value={formData.automationLevel}
                onChange={(e) => handleInputChange('automationLevel', e.target.value)}
                disabled={disabled}
                className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {automationLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Testing Frequency
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                disabled={disabled}
                className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {frequencies.map(freq => (
                  <option key={freq} value={freq}>{freq}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Description */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="FileText" size={20} className="text-primary" />
          <span>Control Description</span>
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter detailed control description"
              disabled={disabled}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none ${
                validationErrors.description ? 'border-error' : 'border-border'
              }`}
            />
            {validationErrors.description && (
              <p className="text-sm text-error mt-1">{validationErrors.description}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Control Objectives
              </label>
              <textarea
                value={formData.objectives}
                onChange={(e) => handleInputChange('objectives', e.target.value)}
                placeholder="Enter control objectives"
                disabled={disabled}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Scope
              </label>
              <textarea
                value={formData.scope}
                onChange={(e) => handleInputChange('scope', e.target.value)}
                placeholder="Enter control scope"
                disabled={disabled}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Business Process
            </label>
            <Input
              value={formData.businessProcess}
              onChange={(e) => handleInputChange('businessProcess', e.target.value)}
              placeholder="Enter related business process"
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      {/* Regulatory Mapping */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="Scale" size={20} className="text-primary" />
            <span>Regulatory Mapping</span>
          </h3>
          
          <button
            onClick={() => setShowRegulatoryMapping(!showRegulatoryMapping)}
            className="flex items-center space-x-2 text-sm text-primary hover:text-primary-700 nav-transition"
          >
            <Icon name={showRegulatoryMapping ? 'ChevronUp' : 'ChevronDown'} size={16} />
            <span>{showRegulatoryMapping ? 'Hide' : 'Show'} Mapping</span>
          </button>
        </div>
        
        {showRegulatoryMapping && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-text-secondary">
                Map this control to specific regulatory requirements
              </p>
              <button
                onClick={addRegulatoryMapping}
                disabled={disabled}
                className="inline-flex items-center space-x-2 px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-700 nav-transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Plus" size={16} />
                <span>Add Mapping</span>
              </button>
            </div>
            
            {formData.regulatoryMapping?.length > 0 ? (
              <div className="space-y-3">
                {formData.regulatoryMapping.map((mapping, index) => (
                  <div key={mapping.id || index} className="p-4 border border-border rounded-lg bg-secondary-50">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1">
                          Regulation
                        </label>
                        <Input
                          value={mapping.regulation || ''}
                          onChange={(e) => updateRegulatoryMapping(index, 'regulation', e.target.value)}
                          placeholder="e.g., SOX Section 404"
                          disabled={disabled}
                          className="text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1">
                          Section/Clause
                        </label>
                        <Input
                          value={mapping.section || ''}
                          onChange={(e) => updateRegulatoryMapping(index, 'section', e.target.value)}
                          placeholder="e.g., 404.1.a"
                          disabled={disabled}
                          className="text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1">
                          Compliance Level
                        </label>
                        <select
                          value={mapping.complianceLevel || 'Required'}
                          onChange={(e) => updateRegulatoryMapping(index, 'complianceLevel', e.target.value)}
                          disabled={disabled}
                          className="w-full h-8 px-2 py-1 border border-border rounded-md bg-background text-text-primary text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="Required">Required</option>
                          <option value="Recommended">Recommended</option>
                          <option value="Optional">Optional</option>
                        </select>
                      </div>
                      
                      <div className="flex items-end">
                        <button
                          onClick={() => removeRegulatoryMapping(index)}
                          disabled={disabled}
                          className="p-1 text-error hover:bg-error-50 rounded nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Remove mapping"
                        >
                          <Icon name="X" size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <label className="block text-xs font-medium text-text-secondary mb-1">
                        Requirement Description
                      </label>
                      <textarea
                        value={mapping.requirement || ''}
                        onChange={(e) => updateRegulatoryMapping(index, 'requirement', e.target.value)}
                        placeholder="Describe the specific regulatory requirement"
                        disabled={disabled}
                        rows={2}
                        className="w-full px-2 py-1 border border-border rounded-md bg-background text-text-primary text-sm focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-text-secondary">
                <Icon name="Scale" size={48} className="mx-auto mb-3 text-secondary-300" />
                <p>No regulatory mappings defined</p>
                <p className="text-sm">Add mappings to link this control to specific regulations</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Form Validation Summary */}
      {Object.keys(validationErrors).length > 0 && (
        <div className="bg-error-50 border border-error-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <h4 className="text-sm font-medium text-error">Please fix the following errors:</h4>
          </div>
          <ul className="text-sm text-error space-y-1 ml-6">
            {Object.values(validationErrors).map((error, index) => (
              <li key={index} className="list-disc">{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ControlDefinitionTab;