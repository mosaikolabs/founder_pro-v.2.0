// src/Routes.jsx
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ComplianceDashboardOverview from "pages/compliance-dashboard-overview";
import ControlsMatrixManagement from "pages/controls-matrix-management";
import AuditTimelineScheduler from "pages/audit-timeline-scheduler";
import PolicyLibraryManagement from "pages/policy-library-management";
import ControlDetailManagement from "pages/control-detail-management";
import ComplianceReportingCenter from "pages/compliance-reporting-center";
import UserRoleAdministration from "pages/user-role-administration";
import SystemConfigurationDashboard from "pages/system-configuration-dashboard";
import UserProfileManagement from "pages/user-profile-management";
import FounderActivityDashboard from "pages/founder-activity-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<ComplianceDashboardOverview />} />
          <Route path="/compliance-dashboard-overview" element={<ComplianceDashboardOverview />} />
          <Route path="/controls-matrix-management" element={<ControlsMatrixManagement />} />
          <Route path="/audit-timeline-scheduler" element={<AuditTimelineScheduler />} />
          <Route path="/policy-library-management" element={<PolicyLibraryManagement />} />
          <Route path="/control-detail-management" element={<ControlDetailManagement />} />
          <Route path="/compliance-reporting-center" element={<ComplianceReportingCenter />} />
          <Route path="/user-role-administration" element={<UserRoleAdministration />} />
          <Route path="/system-configuration-dashboard" element={<SystemConfigurationDashboard />} />
          <Route path="/user-profile-management" element={<UserProfileManagement />} />
          <Route path="/founder-activity-dashboard" element={<FounderActivityDashboard />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;