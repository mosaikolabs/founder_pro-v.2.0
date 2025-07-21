import React from 'react';
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ControlsMatrixManagement = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">
              Strategic Matrix Management
            </h1>
            <p className="text-lg text-text-secondary">
              Monitor and manage strategic activities across all areas
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" icon="Filter">
              Filters
            </Button>
            <Button variant="primary" icon="Download">
              Export
            </Button>
          </div>
        </div>

        {/* Strategic Matrix Table */}
        <div className="bg-gradient-card rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-text-primary">Strategic Areas Matrix</h2>
            <p className="text-text-secondary">Track progress across strategic areas and startup phases</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-primary">STRATEGIC AREA</th>
                  <th className="px-4 py-4 text-center text-sm font-medium text-text-primary">AC-001<br/>STRATEGY</th>
                  <th className="px-4 py-4 text-center text-sm font-medium text-text-primary">AC-002<br/>LEGAL</th>
                  <th className="px-4 py-4 text-center text-sm font-medium text-text-primary">AC-003<br/>TECH</th>
                  <th className="px-4 py-4 text-center text-sm font-medium text-text-primary">AC-004<br/>FINANCE</th>
                  <th className="px-4 py-4 text-center text-sm font-medium text-text-primary">AC-005<br/>MARKETING</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { name: "Strategy & Fundamentals", owner: "Founder" },
                  { name: "Legal & Corporate", owner: "Legal Team" },
                  { name: "Technology & Product", owner: "CTO/Tech Lead" },
                  { name: "Finance & Metrics", owner: "Founder/CFO" },
                  { name: "Marketing & Customers", owner: "Marketing Lead" },
                  { name: "Operations & Success", owner: "Operations Lead" }
                ].map((area, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-text-primary">{area.name}</div>
                        <div className="text-sm text-text-muted">{area.owner}</div>
                      </div>
                    </td>
                    {[0,1,2,3,4].map((colIndex) => (
                      <td key={colIndex} className="px-4 py-4 text-center">
                        <div className={`w-8 h-8 rounded-lg mx-auto cursor-pointer transition-all duration-200 hover:scale-110 ${
                          Math.random() > 0.7 ? 'bg-success' : 
                          Math.random() > 0.5 ? 'bg-primary-500' : 
                          Math.random() > 0.3 ? 'bg-warning' : 'bg-gray-300'
                        }`}></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Legend */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-success rounded"></div>
                <span className="text-sm text-text-secondary">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary-500 rounded"></div>
                <span className="text-sm text-text-secondary">In Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-warning rounded"></div>
                <span className="text-sm text-text-secondary">Pending</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <span className="text-sm text-text-secondary">Not Started</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ControlsMatrixManagement;