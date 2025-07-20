// src/pages/control-detail-management/components/EvidenceRequirementsTab.jsx
import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const EvidenceRequirementsTab = ({ controlData, onUpdate, userRole, disabled }) => {
  const [evidenceRequirements, setEvidenceRequirements] = useState([
    {
      id: 1,
      name: 'User Access Report',
      description: 'Monthly report of user access permissions',
      type: 'Report',
      frequency: 'Monthly',
      required: true,
      responsible: 'IT Security Team',
      collectionMethod: 'Automated',
      retentionPeriod: '3 years',
      status: 'Current',
      lastCollected: '2024-01-10',
      nextDue: '2024-02-10'
    },
    {
      id: 2,
      name: 'Access Control Matrix',
      description: 'Documentation of role-based access controls',
      type: 'Documentation',
      frequency: 'Quarterly',
      required: true,
      responsible: 'Compliance Officer',
      collectionMethod: 'Manual',
      retentionPeriod: '7 years',
      status: 'Overdue',
      lastCollected: '2023-12-15',
      nextDue: '2024-01-15'
    }
  ]);

  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: 'access_report_jan2024.xlsx',
      size: '2.4 MB',
      type: 'application/xlsx',
      uploadDate: '2024-01-10',
      uploadedBy: 'John Smith',
      status: 'Approved',
      evidenceId: 1,
      category: 'Current Evidence'
    },
    {
      id: 2,
      name: 'access_matrix_q4_2023.pdf',
      size: '1.1 MB',
      type: 'application/pdf',
      uploadDate: '2023-12-15',
      uploadedBy: 'Jane Doe',
      status: 'Pending Review',
      evidenceId: 2,
      category: 'Historical Evidence'
    }
  ]);

  const [activeSection, setActiveSection] = useState('requirements');
  const [dragOver, setDragOver] = useState(false);
  const [bulkUploadMode, setBulkUploadMode] = useState(false);
  const fileInputRef = useRef(null);

  const evidenceTypes = ['Report', 'Documentation', 'Screenshot', 'Log File', 'Certificate', 'Policy', 'Other'];
  const frequencies = ['Continuous', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Semi-Annual', 'Annual', 'Ad Hoc'];
  const collectionMethods = ['Automated', 'Manual', 'Semi-Automated'];
  const retentionPeriods = ['1 year', '3 years', '5 years', '7 years', '10 years', 'Indefinite'];

  const addEvidenceRequirement = () => {
    const newRequirement = {
      id: Date.now(),
      name: '',
      description: '',
      type: 'Report',
      frequency: 'Monthly',
      required: true,
      responsible: '',
      collectionMethod: 'Manual',
      retentionPeriod: '3 years',
      status: 'Draft',
      lastCollected: null,
      nextDue: null
    };
    
    setEvidenceRequirements(prev => [...prev, newRequirement]);
  };

  const updateEvidenceRequirement = (id, field, value) => {
    setEvidenceRequirements(prev => 
      prev.map(req => req.id === id ? { ...req, [field]: value } : req)
    );
  };

  const removeEvidenceRequirement = (id) => {
    setEvidenceRequirements(prev => prev.filter(req => req.id !== id));
  };

  const handleFileUpload = (files, evidenceId = null) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      type: file.type,
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: 'Current User',
      status: 'Processing',
      evidenceId: evidenceId,
      category: 'Current Evidence',
      file: file
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Simulate processing
    newFiles.forEach(file => {
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => f.id === file.id ? { ...f, status: 'Approved' } : f)
        );
      }, 2000);
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Current': case'Approved':
        return 'bg-success-100 text-success-700';
      case 'Overdue':
        return 'bg-error-100 text-error-700';
      case 'Pending Review': case'Processing':
        return 'bg-warning-100 text-warning-700';
      case 'Draft':
        return 'bg-secondary-100 text-secondary-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const sections = [
    { id: 'requirements', label: 'Evidence Requirements', icon: 'List' },
    { id: 'upload', label: 'Evidence Upload', icon: 'Upload' },
    { id: 'workflow', label: 'Approval Workflow', icon: 'GitBranch' }
  ];

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="flex items-center space-x-6 border-b border-border pb-4">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm nav-transition ${
              activeSection === section.id
                ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
            }`}
          >
            <Icon name={section.icon} size={16} />
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Evidence Requirements Section */}
      {activeSection === 'requirements' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
              <Icon name="List" size={20} className="text-primary" />
              <span>Evidence Requirements</span>
            </h3>
            
            <button
              onClick={addEvidenceRequirement}
              disabled={disabled}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Plus" size={16} />
              <span>Add Requirement</span>
            </button>
          </div>

          <div className="space-y-4">
            {evidenceRequirements.map((requirement, index) => (
              <div key={requirement.id} className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-text-secondary">
                      #{index + 1}
                    </span>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(requirement.status)}`}>
                      {requirement.status}
                    </span>
                    {requirement.required && (
                      <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-primary text-white">
                        Required
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => removeEvidenceRequirement(requirement.id)}
                    disabled={disabled}
                    className="p-1 text-error hover:bg-error-50 rounded nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Remove requirement"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Evidence Name
                      </label>
                      <Input
                        value={requirement.name}
                        onChange={(e) => updateEvidenceRequirement(requirement.id, 'name', e.target.value)}
                        placeholder="Enter evidence name"
                        disabled={disabled}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Description
                      </label>
                      <textarea
                        value={requirement.description}
                        onChange={(e) => updateEvidenceRequirement(requirement.id, 'description', e.target.value)}
                        placeholder="Describe the evidence requirement"
                        disabled={disabled}
                        rows={2}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Type
                      </label>
                      <select
                        value={requirement.type}
                        onChange={(e) => updateEvidenceRequirement(requirement.id, 'type', e.target.value)}
                        disabled={disabled}
                        className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        {evidenceTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Frequency
                      </label>
                      <select
                        value={requirement.frequency}
                        onChange={(e) => updateEvidenceRequirement(requirement.id, 'frequency', e.target.value)}
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

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Responsible Party
                    </label>
                    <Input
                      value={requirement.responsible}
                      onChange={(e) => updateEvidenceRequirement(requirement.id, 'responsible', e.target.value)}
                      placeholder="Who is responsible"
                      disabled={disabled}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Collection Method
                    </label>
                    <select
                      value={requirement.collectionMethod}
                      onChange={(e) => updateEvidenceRequirement(requirement.id, 'collectionMethod', e.target.value)}
                      disabled={disabled}
                      className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      {collectionMethods.map(method => (
                        <option key={method} value={method}>{method}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Retention Period
                    </label>
                    <select
                      value={requirement.retentionPeriod}
                      onChange={(e) => updateEvidenceRequirement(requirement.id, 'retentionPeriod', e.target.value)}
                      disabled={disabled}
                      className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      {retentionPeriods.map(period => (
                        <option key={period} value={period}>{period}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={requirement.required}
                        onChange={(e) => updateEvidenceRequirement(requirement.id, 'required', e.target.checked)}
                        disabled={disabled}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm font-medium text-text-secondary">Required</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {evidenceRequirements.length === 0 && (
            <div className="text-center py-12 text-text-secondary">
              <Icon name="List" size={48} className="mx-auto mb-3 text-secondary-300" />
              <p className="text-lg mb-2">No evidence requirements defined</p>
              <p className="text-sm">Add requirements to specify what evidence needs to be collected</p>
            </div>
          )}
        </div>
      )}

      {/* Evidence Upload Section */}
      {activeSection === 'upload' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
              <Icon name="Upload" size={20} className="text-primary" />
              <span>Evidence Upload</span>
            </h3>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setBulkUploadMode(!bulkUploadMode)}
                className={`px-3 py-1 rounded-lg text-sm font-medium nav-transition ${
                  bulkUploadMode
                    ? 'bg-primary text-white' :'bg-secondary-100 text-text-secondary hover:bg-secondary-200'
                }`}
              >
                Bulk Upload
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={disabled}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="Upload" size={16} />
                <span>Upload Files</span>
              </button>
            </div>
          </div>

          {/* File Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-8 text-center nav-transition ${
              dragOver ? 'border-primary bg-primary-50' : 'border-border'
            }`}
          >
            <Icon name="Upload" size={48} className={`mx-auto mb-4 ${dragOver ? 'text-primary' : 'text-secondary-300'}`} />
            <h4 className="text-lg font-medium text-text-primary mb-2">
              Drop files here or click to upload
            </h4>
            <p className="text-text-secondary mb-4">
              Supports: PDF, DOC, XLS, JPG, PNG (Max 50MB per file)
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition"
            >
              Browse Files
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            />
          </div>

          {/* Uploaded Files List */}
          <div>
            <h4 className="text-md font-semibold text-text-primary mb-4">Uploaded Evidence</h4>
            
            {uploadedFiles.length > 0 ? (
              <div className="space-y-3">
                {uploadedFiles.map(file => (
                  <div key={file.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-secondary-100 rounded-lg">
                        <Icon 
                          name={file.type.includes('pdf') ? 'FileText' : 
                                file.type.includes('image') ? 'Image' : 'File'} 
                          size={20} 
                          className="text-text-secondary" 
                        />
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-text-primary">{file.name}</h5>
                        <div className="flex items-center space-x-4 text-sm text-text-secondary">
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>Uploaded by {file.uploadedBy}</span>
                          <span>•</span>
                          <span className="font-data">{file.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(file.status)}`}>
                        {file.status}
                      </span>
                      
                      <div className="flex items-center space-x-1">
                        <button
                          className="p-1 text-text-secondary hover:text-primary hover:bg-secondary-50 rounded nav-transition"
                          title="Download"
                        >
                          <Icon name="Download" size={16} />
                        </button>
                        
                        <button
                          className="p-1 text-text-secondary hover:text-error hover:bg-error-50 rounded nav-transition"
                          title="Delete"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-text-secondary">
                <Icon name="Upload" size={48} className="mx-auto mb-3 text-secondary-300" />
                <p>No files uploaded yet</p>
                <p className="text-sm">Upload evidence files to support compliance requirements</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Approval Workflow Section */}
      {activeSection === 'workflow' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="GitBranch" size={20} className="text-primary" />
            <span>Approval Workflow</span>
          </h3>
          
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="space-y-6">
              {/* Workflow Steps */}
              <div className="space-y-4">
                <h4 className="text-md font-semibold text-text-primary">Approval Process</h4>
                
                {[
                  { step: 1, title: 'Evidence Upload', status: 'completed', assignee: 'Control Owner' },
                  { step: 2, title: 'Initial Review', status: 'current', assignee: 'Compliance Officer' },
                  { step: 3, title: 'Technical Validation', status: 'pending', assignee: 'IT Auditor' },
                  { step: 4, title: 'Final Approval', status: 'pending', assignee: 'Audit Manager' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${item.status === 'completed' ? 'bg-success text-white' :
                        item.status === 'current'? 'bg-primary text-white' : 'bg-secondary-200 text-text-secondary'}
                    `}>
                      {item.step}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium text-text-primary">{item.title}</h5>
                          <p className="text-sm text-text-secondary">Assigned to: {item.assignee}</p>
                        </div>
                        
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'completed' ? 'bg-success-100 text-success-700' :
                          item.status === 'current'? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-700'
                        }`}>
                          {item.status === 'completed' ? 'Completed' :
                           item.status === 'current' ? 'In Progress' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Workflow Actions */}
              <div className="border-t border-border pt-4">
                <h4 className="text-md font-semibold text-text-primary mb-3">Actions</h4>
                
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-success text-white rounded-lg hover:bg-success-600 nav-transition">
                    Approve
                  </button>
                  
                  <button className="px-4 py-2 bg-warning text-white rounded-lg hover:bg-warning-600 nav-transition">
                    Request Changes
                  </button>
                  
                  <button className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error-600 nav-transition">
                    Reject
                  </button>
                  
                  <button className="px-4 py-2 border border-border text-text-secondary rounded-lg hover:text-text-primary hover:bg-secondary-50 nav-transition">
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvidenceRequirementsTab;