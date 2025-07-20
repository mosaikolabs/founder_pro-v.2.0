import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumbs = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  
  const pathMap = {
    '/': 'Dashboard',
    '/compliance-dashboard-overview': 'Compliance Dashboard',
    '/controls-matrix-management': 'Controls Matrix',
    '/audit-timeline-scheduler': 'Audit Timeline',
    '/policy-library-management': 'Policy Library',
    '/control-detail-management': 'Control Details',
    '/compliance-reporting-center': 'Reporting Center',
    '/user-role-administration': 'User Management',
    '/system-configuration-dashboard': 'System Configuration'
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Dashboard', path: '/' }];

    if (pathSegments.length > 0) {
      const currentPath = `/${pathSegments.join('/')}`;
      const currentLabel = pathMap[currentPath] || 'Unknown Page';
      breadcrumbs.push({ label: currentLabel, path: currentPath });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.path}>
          {index > 0 && (
            <Icon 
              name="ChevronRight" 
              size={14} 
              className="text-text-dark-muted" 
            />
          )}
          <span
            className={`
              transition-colors duration-200
              ${index === breadcrumbs.length - 1 
                ? 'text-neon-green font-semibold' :'text-text-dark-secondary hover:text-text-dark-primary cursor-pointer'
              }
            `}
            onClick={() => {
              if (index < breadcrumbs.length - 1) {
                window.location.href = breadcrumb.path;
              }
            }}
          >
            {breadcrumb.label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumbs;