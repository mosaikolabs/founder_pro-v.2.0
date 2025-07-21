import React from 'react';
import Button from './Button';
import Icon from '../AppIcon';

const Header = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      {/* Left Side - Title Area */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          {/* Founder Pro Logo */}
          <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-white" />
          </div>
          
          <div>
            <h1 className="text-lg font-semibold text-text-primary">Founder Pro</h1>
            <p className="text-xs text-text-secondary">Startup Success Platform</p>
          </div>
        </div>
      </div>
      
      {/* Right Side - Actions */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
          />
          <Icon name="Search" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" />
        </div>
        
        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Icon name="Bell" size={16} />
          </Button>
          
          <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-medium">F</span>
            </div>
            <div className="text-sm">
              <p className="font-medium text-text-primary">Founder</p>
              <p className="text-text-muted">Startup Founder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;