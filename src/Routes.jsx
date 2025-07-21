// src/Routes.jsx
import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ComplianceDashboardOverview from "./pages/compliance-dashboard-overview";
import ControlsMatrixManagement from "./pages/controls-matrix-management";
import AuditTimelineScheduler from "./pages/audit-timeline-scheduler";
import PolicyLibraryManagement from "./pages/policy-library-management";
import ControlDetailManagement from "./pages/control-detail-management";
import ComplianceReportingCenter from "./pages/compliance-reporting-center";
import UserRoleAdministration from "./pages/user-role-administration";
import SystemConfigurationDashboard from "./pages/system-configuration-dashboard";
import UserProfileManagement from "./pages/user-profile-management";
import FounderActivityDashboard from "./pages/founder-activity-dashboard";
import StrategicFundamentals from "./pages/strategic-fundamentals";
import LegalCorporate from "./pages/legal-corporate";
import TechnologyProduct from "./pages/technology-product";
import FinanceMetrics from "./pages/finance-metrics";
import MarketingCustomerAcquisition from "./pages/marketing-customer-acquisition";
import OperationsCustomerSuccess from "./pages/operations-customer-success";
import InvestmentFundraising from "./pages/investment-fundraising";
import PartnershipStrategicAlliances from "./pages/partnership-strategic-alliances";
import ScalingGrowthOptimization from "./pages/scaling-growth-optimization";
import ExitStrategyPlanning from "./pages/exit-strategy-planning";
import LegacyImpactOptimization from "./pages/legacy-impact-optimization";
import NotFound from "./pages/NotFound";

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
          <Route path="/strategic-fundamentals" element={<StrategicFundamentals />} />
          <Route path="/ac-001" element={<StrategicFundamentals />} />
          <Route path="/legal-corporate" element={<LegalCorporate />} />
          <Route path="/ac-002" element={<LegalCorporate />} />
          <Route path="/technology-product" element={<TechnologyProduct />} />
          <Route path="/ac-003" element={<TechnologyProduct />} />
          <Route path="/finance-metrics" element={<FinanceMetrics />} />
          <Route path="/ac-004" element={<FinanceMetrics />} />
          <Route path="/marketing-customer-acquisition" element={<MarketingCustomerAcquisition />} />
          <Route path="/ac-005" element={<MarketingCustomerAcquisition />} />
          <Route path="/operations-customer-success" element={<OperationsCustomerSuccess />} />
          <Route path="/ac-006" element={<OperationsCustomerSuccess />} />
          <Route path="/investment-fundraising" element={<InvestmentFundraising />} />
          <Route path="/ac-007" element={<InvestmentFundraising />} />
          <Route path="/partnership-strategic-alliances" element={<PartnershipStrategicAlliances />} />
          <Route path="/ac-008" element={<PartnershipStrategicAlliances />} />
          <Route path="/scaling-growth-optimization" element={<ScalingGrowthOptimization />} />
          <Route path="/ac-009" element={<ScalingGrowthOptimization />} />
          <Route path="/exit-strategy-planning" element={<ExitStrategyPlanning />} />
          <Route path="/ac-010" element={<ExitStrategyPlanning />} />
          <Route path="/legacy-impact-optimization" element={<LegacyImpactOptimization />} />
          <Route path="/ac-011" element={<LegacyImpactOptimization />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;