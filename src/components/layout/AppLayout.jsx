import React from 'react';
import Sidebar from '../ui/Sidebar';
import Header from '../ui/Header';

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Glassmorphism Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 z-30">
        <div className="h-full bg-gradient-sidebar backdrop-blur-glass border-r border-gray-200/50 shadow-glass">
          <Sidebar />
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 ml-64 min-h-screen">
        {/* Clean Header */}
        <header className="sticky top-0 z-20 bg-bg-surface/95 backdrop-blur-glass border-b border-gray-200/50 shadow-soft">
          <Header />
        </header>
        
        {/* Page Content */}
        <main className="p-6 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout; 