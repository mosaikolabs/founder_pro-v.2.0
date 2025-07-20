import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-dark dark-theme flex items-center justify-center">
      <div className="text-center">
        <div className="neumorphic-card p-8 max-w-md mx-auto">
          <div className="mb-6">
            <Icon name="AlertTriangle" size={64} className="text-text-dark-secondary mx-auto mb-4" />
            <h1 className="text-6xl font-bold text-text-dark-primary mb-2">404</h1>
            <h2 className="text-xl font-semibold text-text-dark-primary mb-4">Page Not Found</h2>
            <p className="text-text-dark-secondary mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link
              to="/compliance-dashboard-overview"
              className="btn-primary-dark inline-flex items-center space-x-2 w-full justify-center"
            >
              <Icon name="Home" size={16} />
              <span>Back to Dashboard</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="btn-secondary-dark inline-flex items-center space-x-2 w-full justify-center"
            >
              <Icon name="ArrowLeft" size={16} />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;