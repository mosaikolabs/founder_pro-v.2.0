// src/pages/control-detail-management/components/TestingProceduresTab.jsx
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const TestingProceduresTab = ({ controlData, onUpdate, userRole, disabled }) => {
  const [testingProcedures, setTestingProcedures] = useState([
    {
      id: 1,
      name: 'User Access Review',
      description: 'Review user access permissions and validate against business roles',
      type: 'Substantive',
      frequency: 'Quarterly',
      duration: '2 hours',
      responsible: 'IT Auditor',
      status: 'Scheduled',
      lastExecuted: '2023-12-15',
      nextExecution: '2024-03-15',
      passRate: 95,
      riskLevel: 'Medium',
      automated: false,
      steps: [
        'Extract user access report from system',
        'Compare against approved access matrix',
        'Identify exceptions and unauthorized access',
        'Document findings and remediation actions'
      ]
    },
    {
      id: 2,
      name: 'System Log Analysis',
      description: 'Automated analysis of system access logs for anomalies',
      type: 'Detective',
      frequency: 'Monthly',
      duration: '30 minutes',
      responsible: 'Security Team',
      status: 'Completed',
      lastExecuted: '2024-01-10',
      nextExecution: '2024-02-10',
      passRate: 100,
      riskLevel: 'High',
      automated: true,
      steps: [
        'Run automated log analysis script',
        'Review flagged anomalies',
        'Investigate suspicious activities',
        'Update security monitoring rules'
      ]
    }
  ]);

  const [testResults, setTestResults] = useState([
    {
      id: 1,
      procedureId: 1,
      executionDate: '2023-12-15',
      result: 'Pass',
      findings: 'Minor exceptions identified and resolved',
      tester: 'John Smith',
      reviewedBy: 'Jane Doe',
      deficiencies: [],
      recommendations: ['Update access review frequency to monthly']
    },
    {
      id: 2,
      procedureId: 2,
      executionDate: '2024-01-10',
      result: 'Pass',
      findings: 'No anomalies detected',
      tester: 'System',
      reviewedBy: 'Security Manager',
      deficiencies: [],
      recommendations: []
    }
  ]);

  const [activeView, setActiveView] = useState('procedures');
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [newTestResult, setNewTestResult] = useState({
    result: 'Pass',
    findings: '',
    deficiencies: '',
    recommendations: ''
  });

  const testTypes = ['Substantive', 'Detective', 'Preventive', 'Walkthrough', 'Inquiry'];
  const frequencies = ['Continuous', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Semi-Annual', 'Annual'];
  const riskLevels = ['Critical', 'High', 'Medium', 'Low'];
  const testResults_options = ['Pass', 'Pass with Exceptions', 'Fail'];

  const addTestingProcedure = () => {
    const newProcedure = {
      id: Date.now(),
      name: '',
      description: '',
      type: 'Substantive',
      frequency: 'Quarterly',
      duration: '',
      responsible: '',
      status: 'Draft',
      lastExecuted: null,
      nextExecution: null,
      passRate: 0,
      riskLevel: 'Medium',
      automated: false,
      steps: []
    };
    
    setTestingProcedures(prev => [...prev, newProcedure]);
  };

  const updateTestingProcedure = (id, field, value) => {
    setTestingProcedures(prev => 
      prev.map(proc => proc.id === id ? { ...proc, [field]: value } : proc)
    );
  };

  const removeTestingProcedure = (id) => {
    setTestingProcedures(prev => prev.filter(proc => proc.id !== id));
  };

  const addTestStep = (procedureId) => {
    setTestingProcedures(prev => 
      prev.map(proc => 
        proc.id === procedureId 
          ? { ...proc, steps: [...proc.steps, ''] }
          : proc
      )
    );
  };

  const updateTestStep = (procedureId, stepIndex, value) => {
    setTestingProcedures(prev => 
      prev.map(proc => 
        proc.id === procedureId 
          ? { 
              ...proc, 
              steps: proc.steps.map((step, index) => 
                index === stepIndex ? value : step
              )
            }
          : proc
      )
    );
  };

  const removeTestStep = (procedureId, stepIndex) => {
    setTestingProcedures(prev => 
      prev.map(proc => 
        proc.id === procedureId 
          ? { ...proc, steps: proc.steps.filter((_, index) => index !== stepIndex) }
          : proc
      )
    );
  };

  const executeTest = (procedureId) => {
    setSelectedProcedure(procedureId);
    setActiveView('execute');
  };

  const submitTestResult = () => {
    const result = {
      id: Date.now(),
      procedureId: selectedProcedure,
      executionDate: new Date().toISOString().split('T')[0],
      result: newTestResult.result,
      findings: newTestResult.findings,
      tester: 'Current User',
      reviewedBy: '',
      deficiencies: newTestResult.deficiencies.split('\n').filter(d => d.trim()),
      recommendations: newTestResult.recommendations.split('\n').filter(r => r.trim())
    };
    
    setTestResults(prev => [...prev, result]);
    setNewTestResult({ result: 'Pass', findings: '', deficiencies: '', recommendations: '' });
    setActiveView('results');
    setSelectedProcedure(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
      case 'Pass':
        return 'bg-success-100 text-success-700';
      case 'Scheduled':
        return 'bg-primary-100 text-primary-700';
      case 'Overdue': case'Fail':
        return 'bg-error-100 text-error-700';
      case 'Pass with Exceptions':
        return 'bg-warning-100 text-warning-700';
      case 'Draft':
        return 'bg-secondary-100 text-secondary-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const views = [
    { id: 'procedures', label: 'Test Procedures', icon: 'CheckSquare' },
    { id: 'schedule', label: 'Test Schedule', icon: 'Calendar' },
    { id: 'results', label: 'Test Results', icon: 'BarChart3' },
    { id: 'execute', label: 'Execute Test', icon: 'Play' }
  ];

  return (
    <div className="space-y-6">
      {/* View Navigation */}
      <div className="flex items-center space-x-6 border-b border-border pb-4">
        {views.map(view => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            disabled={view.id === 'execute' && !selectedProcedure}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm nav-transition disabled:opacity-50 disabled:cursor-not-allowed ${
              activeView === view.id
                ? 'bg-primary text-white' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
            }`}
          >
            <Icon name={view.icon} size={16} />
            <span>{view.label}</span>
          </button>
        ))}
      </div>

      {/* Test Procedures View */}
      {activeView === 'procedures' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
              <Icon name="CheckSquare" size={20} className="text-primary" />
              <span>Testing Procedures</span>
            </h3>
            
            <button
              onClick={addTestingProcedure}
              disabled={disabled}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Plus" size={16} />
              <span>Add Procedure</span>
            </button>
          </div>

          <div className="space-y-6">
            {testingProcedures.map((procedure, index) => (
              <div key={procedure.id} className="bg-surface border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-text-secondary">
                      Test #{index + 1}
                    </span>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(procedure.status)}`}>
                      {procedure.status}
                    </span>
                    {procedure.automated && (
                      <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-700">
                        <Icon name="Zap" size={12} />
                        <span>Automated</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => executeTest(procedure.id)}
                      disabled={disabled || userRole !== 'auditor'}
                      className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-700 nav-transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Execute
                    </button>
                    
                    <button
                      onClick={() => removeTestingProcedure(procedure.id)}
                      disabled={disabled}
                      className="p-1 text-error hover:bg-error-50 rounded nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove procedure"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Procedure Name
                      </label>
                      <Input
                        value={procedure.name}
                        onChange={(e) => updateTestingProcedure(procedure.id, 'name', e.target.value)}
                        placeholder="Enter procedure name"
                        disabled={disabled}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Description
                      </label>
                      <textarea
                        value={procedure.description}
                        onChange={(e) => updateTestingProcedure(procedure.id, 'description', e.target.value)}
                        placeholder="Describe the testing procedure"
                        disabled={disabled}
                        rows={3}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Responsible Party
                      </label>
                      <Input
                        value={procedure.responsible}
                        onChange={(e) => updateTestingProcedure(procedure.id, 'responsible', e.target.value)}
                        placeholder="Who performs this test"
                        disabled={disabled}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Test Type
                        </label>
                        <select
                          value={procedure.type}
                          onChange={(e) => updateTestingProcedure(procedure.id, 'type', e.target.value)}
                          disabled={disabled}
                          className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          {testTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Frequency
                        </label>
                        <select
                          value={procedure.frequency}
                          onChange={(e) => updateTestingProcedure(procedure.id, 'frequency', e.target.value)}
                          disabled={disabled}
                          className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          {frequencies.map(freq => (
                            <option key={freq} value={freq}>{freq}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Duration
                        </label>
                        <Input
                          value={procedure.duration}
                          onChange={(e) => updateTestingProcedure(procedure.id, 'duration', e.target.value)}
                          placeholder="e.g., 2 hours"
                          disabled={disabled}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Risk Level
                        </label>
                        <select
                          value={procedure.riskLevel}
                          onChange={(e) => updateTestingProcedure(procedure.id, 'riskLevel', e.target.value)}
                          disabled={disabled}
                          className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          {riskLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={procedure.automated}
                          onChange={(e) => updateTestingProcedure(procedure.id, 'automated', e.target.checked)}
                          disabled={disabled}
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm font-medium text-text-secondary">Automated</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Test Steps */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-md font-semibold text-text-primary">Test Steps</h4>
                    <button
                      onClick={() => addTestStep(procedure.id)}
                      disabled={disabled}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-secondary-100 text-text-secondary rounded hover:bg-secondary-200 nav-transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon name="Plus" size={14} />
                      <span>Add Step</span>
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {procedure.steps?.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-text-secondary w-8">
                          {stepIndex + 1}.
                        </span>
                        <Input
                          value={step}
                          onChange={(e) => updateTestStep(procedure.id, stepIndex, e.target.value)}
                          placeholder="Enter test step"
                          disabled={disabled}
                          className="flex-1"
                        />
                        <button
                          onClick={() => removeTestStep(procedure.id, stepIndex)}
                          disabled={disabled}
                          className="p-1 text-error hover:bg-error-50 rounded nav-transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  {(!procedure.steps || procedure.steps.length === 0) && (
                    <div className="text-center py-4 text-text-secondary text-sm">
                      No test steps defined. Add steps to document the testing process.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {testingProcedures.length === 0 && (
            <div className="text-center py-12 text-text-secondary">
              <Icon name="CheckSquare" size={48} className="mx-auto mb-3 text-secondary-300" />
              <p className="text-lg mb-2">No testing procedures defined</p>
              <p className="text-sm">Add procedures to document how controls should be tested</p>
            </div>
          )}
        </div>
      )}

      {/* Test Schedule View */}
      {activeView === 'schedule' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="Calendar" size={20} className="text-primary" />
            <span>Testing Schedule</span>
          </h3>
          
          <div className="bg-surface border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary-50">
                  <tr>
                    <th className="text-left p-4 font-medium text-text-secondary">Procedure</th>
                    <th className="text-left p-4 font-medium text-text-secondary">Frequency</th>
                    <th className="text-left p-4 font-medium text-text-secondary">Last Executed</th>
                    <th className="text-left p-4 font-medium text-text-secondary">Next Due</th>
                    <th className="text-left p-4 font-medium text-text-secondary">Status</th>
                    <th className="text-left p-4 font-medium text-text-secondary">Responsible</th>
                  </tr>
                </thead>
                <tbody>
                  {testingProcedures.map((procedure, index) => (
                    <tr key={procedure.id} className={index % 2 === 0 ? 'bg-white' : 'bg-secondary-25'}>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-text-primary">{procedure.name}</p>
                          <p className="text-sm text-text-secondary">{procedure.type}</p>
                        </div>
                      </td>
                      <td className="p-4 text-text-secondary">{procedure.frequency}</td>
                      <td className="p-4 text-text-secondary font-data">
                        {procedure.lastExecuted || 'Never'}
                      </td>
                      <td className="p-4 text-text-secondary font-data">
                        {procedure.nextExecution || 'TBD'}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(procedure.status)}`}>
                          {procedure.status}
                        </span>
                      </td>
                      <td className="p-4 text-text-secondary">{procedure.responsible}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Test Results View */}
      {activeView === 'results' && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
            <span>Test Results</span>
          </h3>
          
          <div className="space-y-4">
            {testResults.map((result, index) => {
              const procedure = testingProcedures.find(p => p.id === result.procedureId);
              return (
                <div key={result.id} className="bg-surface border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-text-primary">{procedure?.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
                        <span>Executed: {result.executionDate}</span>
                        <span>•</span>
                        <span>Tester: {result.tester}</span>
                        {result.reviewedBy && (
                          <>
                            <span>•</span>
                            <span>Reviewed by: {result.reviewedBy}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result.result)}`}>
                      {result.result}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-medium text-text-secondary mb-1">Findings</h5>
                      <p className="text-text-primary">{result.findings}</p>
                    </div>
                    
                    {result.deficiencies?.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-text-secondary mb-1">Deficiencies</h5>
                        <ul className="list-disc list-inside text-text-primary text-sm space-y-1">
                          {result.deficiencies.map((deficiency, idx) => (
                            <li key={idx}>{deficiency}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {result.recommendations?.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-text-secondary mb-1">Recommendations</h5>
                        <ul className="list-disc list-inside text-text-primary text-sm space-y-1">
                          {result.recommendations.map((recommendation, idx) => (
                            <li key={idx}>{recommendation}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {testResults.length === 0 && (
            <div className="text-center py-12 text-text-secondary">
              <Icon name="BarChart3" size={48} className="mx-auto mb-3 text-secondary-300" />
              <p className="text-lg mb-2">No test results available</p>
              <p className="text-sm">Execute tests to see results here</p>
            </div>
          )}
        </div>
      )}

      {/* Execute Test View */}
      {activeView === 'execute' && selectedProcedure && (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setActiveView('procedures');
                setSelectedProcedure(null);
              }}
              className="p-2 hover:bg-secondary-50 rounded-lg nav-transition"
            >
              <Icon name="ArrowLeft" size={20} className="text-text-secondary" />
            </button>
            
            <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
              <Icon name="Play" size={20} className="text-primary" />
              <span>Execute Test</span>
            </h3>
          </div>
          
          {(() => {
            const procedure = testingProcedures.find(p => p.id === selectedProcedure);
            return (
              <div className="space-y-6">
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                  <h4 className="font-semibold text-primary mb-2">{procedure?.name}</h4>
                  <p className="text-primary-700">{procedure?.description}</p>
                </div>
                
                {/* Test Steps Checklist */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h4 className="text-md font-semibold text-text-primary mb-4">Test Steps</h4>
                  
                  <div className="space-y-3">
                    {procedure?.steps?.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          className="mt-1 rounded border-border text-primary focus:ring-primary"
                        />
                        <div>
                          <span className="text-sm font-medium text-text-secondary mr-2">
                            Step {index + 1}:
                          </span>
                          <span className="text-text-primary">{step}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Test Result Input */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h4 className="text-md font-semibold text-text-primary mb-4">Test Result</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Test Result
                      </label>
                      <select
                        value={newTestResult.result}
                        onChange={(e) => setNewTestResult(prev => ({ ...prev, result: e.target.value }))}
                        className="w-full h-10 px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        {testResults_options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Findings
                      </label>
                      <textarea
                        value={newTestResult.findings}
                        onChange={(e) => setNewTestResult(prev => ({ ...prev, findings: e.target.value }))}
                        placeholder="Document your findings..."
                        rows={4}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Deficiencies (one per line)
                      </label>
                      <textarea
                        value={newTestResult.deficiencies}
                        onChange={(e) => setNewTestResult(prev => ({ ...prev, deficiencies: e.target.value }))}
                        placeholder="List any deficiencies found..."
                        rows={3}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Recommendations (one per line)
                      </label>
                      <textarea
                        value={newTestResult.recommendations}
                        onChange={(e) => setNewTestResult(prev => ({ ...prev, recommendations: e.target.value }))}
                        placeholder="Provide recommendations..."
                        rows={3}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-text-primary focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => {
                        setActiveView('procedures');
                        setSelectedProcedure(null);
                      }}
                      className="px-4 py-2 border border-border text-text-secondary rounded-lg hover:text-text-primary hover:bg-secondary-50 nav-transition"
                    >
                      Cancel
                    </button>
                    
                    <button
                      onClick={submitTestResult}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 nav-transition"
                    >
                      Submit Result
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default TestingProceduresTab;