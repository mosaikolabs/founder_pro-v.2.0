// src/pages/system-configuration-dashboard/components/PerformanceMonitoring.jsx
import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceMonitoring = ({ userRole, onConfigChange }) => {
  const [performanceData, setPerformanceData] = useState({
    cpu: { current: 45, average: 52, peak: 78 },
    memory: { current: 68, average: 65, peak: 85 },
    disk: { current: 34, average: 40, peak: 67 },
    network: { current: 23, average: 28, peak: 45 }
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      metric: 'Memory Usage',
      threshold: 80,
      current: 85,
      timestamp: '2024-01-15 14:30:00',
      resolved: false
    },
    {
      id: 2,
      type: 'info',
      metric: 'CPU Usage',
      threshold: 70,
      current: 45,
      timestamp: '2024-01-15 13:15:00',
      resolved: true
    }
  ]);

  const hasFullAccess = userRole === 'System Administrator';

  // Real-time performance monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setPerformanceData(prev => ({
        cpu: {
          ...prev.cpu,
          current: Math.max(30, Math.min(80, prev.cpu.current + Math.floor((Math.random() - 0.5) * 10)))
        },
        memory: {
          ...prev.memory,
          current: Math.max(50, Math.min(90, prev.memory.current + Math.floor((Math.random() - 0.5) * 8)))
        },
        disk: {
          ...prev.disk,
          current: Math.max(20, Math.min(60, prev.disk.current + Math.floor((Math.random() - 0.5) * 5)))
        },
        network: {
          ...prev.network,
          current: Math.max(10, Math.min(50, prev.network.current + Math.floor((Math.random() - 0.5) * 6)))
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value) => {
    if (value >= 80) return 'text-error-dark';
    if (value >= 60) return 'text-warning-dark';
    return 'text-success-dark';
  };

  const getProgressColor = (value) => {
    if (value >= 80) return 'bg-error-dark';
    if (value >= 60) return 'bg-warning-dark';
    return 'bg-success-dark';
  };

  const MetricCard = ({ title, icon, data, unit = '%' }) => (
    <div className="neumorphic-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-text-dark-primary">{title}</h4>
            <p className="text-sm text-text-dark-secondary">Real-time monitoring</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${getStatusColor(data.current)}`}>
            {data.current}{unit}
          </div>
          <div className="text-xs text-text-dark-secondary">Current</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-text-dark-secondary">Usage</span>
          <span className="text-text-dark-primary">{data.current}{unit}</span>
        </div>
        <div className="w-full bg-dark-surface rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(data.current)}`}
            style={{ width: `${data.current}%` }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-text-dark-secondary">Average:</span>
          <div className="font-medium text-text-dark-primary">{data.average}{unit}</div>
        </div>
        <div>
          <span className="text-text-dark-secondary">Peak:</span>
          <div className="font-medium text-text-dark-primary">{data.peak}{unit}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-dark-primary flex items-center space-x-2 mb-4 mt-6 px-4">
            <Icon name="Activity" size={20} />
            <span>Performance Monitoring</span>
          </h3>
          <p className="text-sm text-text-dark-secondary mt-1 px-4">
            Real-time system performance metrics and alerts
          </p>
        </div>
        <Button 
          variant="primary" 
          size="sm" 
          iconName="RefreshCw"
        >
          Refresh
        </Button>
      </div>

      {/* Performance Metrics */}
      <div>
        <h4 className="font-medium text-text-dark-primary mb-6 mt-8 flex items-center space-x-2 px-4">
          <Icon name="Monitor" size={16} />
          <span>System Metrics</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard 
            title="CPU Usage" 
            icon="Cpu" 
            data={performanceData.cpu}
          />
          <MetricCard 
            title="Memory Usage" 
            icon="HardDrive" 
            data={performanceData.memory}
          />
          <MetricCard 
            title="Disk Usage" 
            icon="Database" 
            data={performanceData.disk}
          />
          <MetricCard 
            title="Network I/O" 
            icon="Wifi" 
            data={performanceData.network}
            unit=" MB/s"
          />
        </div>
      </div>

      {/* Performance Alerts */}
      <div>
        <h4 className="font-medium text-text-dark-primary mb-6 mt-8 flex items-center space-x-2 px-4">
          <Icon name="AlertTriangle" size={16} />
          <span>Performance Alerts</span>
        </h4>
        
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="neumorphic-card p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    alert.type === 'error' ? 'bg-error-50' :
                    alert.type === 'warning' ? 'bg-warning-50' : 'bg-info-50'
                  }`}>
                    <Icon 
                      name={alert.type === 'error' ? 'XCircle' : alert.type === 'warning' ? 'AlertTriangle' : 'Info'} 
                      size={16} 
                      className={
                        alert.type === 'error' ? 'text-error' :
                        alert.type === 'warning' ? 'text-warning' : 'text-info'
                      }
                    />
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-text-dark-primary">{alert.metric}</h5>
                    <p className="text-sm text-text-dark-secondary">
                      Threshold: {alert.threshold}% | Current: {alert.current}%
                    </p>
                    <p className="text-xs text-text-dark-secondary mt-1">{alert.timestamp}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {alert.resolved ? (
                    <span className="text-success-dark text-sm font-medium">Resolved</span>
                  ) : (
                    <Button variant="outline" size="sm">
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monitoring Configuration */}
      <div className="neumorphic-card p-6 bg-gradient-primary">
        <h4 className="font-medium text-white mb-6 mt-4 flex items-center space-x-2 px-2">
          <Icon name="Settings" size={16} />
          <span>Monitoring Configuration</span>
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">Alert Thresholds</label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-blue-100">CPU Warning:</span>
                <input 
                  type="range" 
                  min="50" 
                  max="100" 
                  defaultValue="70"
                  className="w-24"
                  disabled={!hasFullAccess}
                />
                <span className="text-blue-100 w-12 text-right">70%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Memory Warning:</span>
                <input 
                  type="range" 
                  min="50" 
                  max="100" 
                  defaultValue="80"
                  className="w-24"
                  disabled={!hasFullAccess}
                />
                <span className="text-blue-100 w-12 text-right">80%</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">Monitoring Settings</label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Refresh Interval:</span>
                <select 
                  className="neumorphic-input px-3 py-1 text-text-dark-primary"
                  disabled={!hasFullAccess}
                >
                  <option value="5">5 seconds</option>
                  <option value="10">10 seconds</option>
                  <option value="30">30 seconds</option>
                  <option value="60">1 minute</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-100">Data Retention:</span>
                <select 
                  className="neumorphic-input px-3 py-1 text-text-dark-primary"
                  disabled={!hasFullAccess}
                >
                  <option value="1">1 day</option>
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="365">1 year</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitoring;