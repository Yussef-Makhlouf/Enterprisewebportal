import { createBrowserRouter } from 'react-router';
import { RootLayout } from './components/layout/RootLayout';
import { AuthLayout } from './components/layout/AuthLayout';
import { Shell } from './components/layout/Shell';
import { LoginPage } from './pages/auth/LoginPage';
import { OTPPage } from './pages/auth/OTPPage';
import { SetPasswordPage } from './pages/auth/SetPasswordPage';
import { LicenseExpiredPage } from './pages/auth/LicenseExpiredPage';
import { LicenseRenewalPage } from './pages/auth/LicenseRenewalPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageBrokers } from './pages/admin/ManageBrokers';
import { RolesPermissions } from './pages/admin/RolesPermissions';
import { AuditTrail } from './pages/admin/AuditTrail';
import { BrokerDashboard } from './pages/broker/BrokerDashboard';
import { LOBIssuanceHub } from './pages/broker/LOBIssuanceHub';
import { TravelIssuance } from './pages/broker/TravelIssuance';
import { MotorIssuance } from './pages/broker/MotorIssuance';
import { HomeIssuance } from './pages/broker/HomeIssuance';
import { DomesticWorkerIssuance } from './pages/broker/DomesticWorkerIssuance';
import { MedicalIssuance } from './pages/broker/MedicalIssuance';
import { HomeAssistanceIssuance } from './pages/broker/HomeAssistanceIssuance';
import { MyPolicies } from './pages/broker/MyPolicies';
import { SubBrokers } from './pages/broker/SubBrokers';
import { StatementPage } from './pages/broker/StatementPage';
import { NotificationsPage } from './pages/broker/NotificationsPage';
import { ProfilePage } from './pages/broker/ProfilePage';
import { CorporateRegistration } from './pages/broker/CorporateRegistration';
import { DesignSystem } from './pages/DesignSystem';
import { ComponentsPage } from './pages/ComponentsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      // Auth routes
      {
        Component: AuthLayout,
        children: [
          { index: true, Component: LoginPage },
          { path: 'auth/login', Component: LoginPage },
          { path: 'auth/otp', Component: OTPPage },
          { path: 'auth/set-password', Component: SetPasswordPage },
          { path: 'auth/license-expired', Component: LicenseExpiredPage },
          { path: 'auth/license-renewal', Component: LicenseRenewalPage },
        ]
      },
      // Authenticated routes
      {
        Component: Shell,
        children: [
          // Admin Portal
          { path: 'admin', Component: AdminDashboard },
          { path: 'admin/brokers', Component: ManageBrokers },
          { path: 'admin/roles', Component: RolesPermissions },
          { path: 'admin/audit', Component: AuditTrail },
          
          // Broker Portal
          { path: 'broker', Component: BrokerDashboard },
          { path: 'broker/issuance', Component: LOBIssuanceHub },
          { path: 'broker/issuance/travel', Component: TravelIssuance },
          { path: 'broker/issuance/motor', Component: MotorIssuance },
          { path: 'broker/issuance/home', Component: HomeIssuance },
          { path: 'broker/issuance/domestic-worker', Component: DomesticWorkerIssuance },
          { path: 'broker/issuance/medical', Component: MedicalIssuance },
          { path: 'broker/issuance/home-assistance', Component: HomeAssistanceIssuance },
          { path: 'broker/policies', Component: MyPolicies },
          { path: 'broker/sub-brokers', Component: SubBrokers },
          { path: 'broker/statement', Component: StatementPage },
          { path: 'broker/notifications', Component: NotificationsPage },
          { path: 'broker/profile', Component: ProfilePage },
          { path: 'broker/corporate', Component: CorporateRegistration },
          // Showcase pages
          { path: 'design-system', Component: DesignSystem },
          { path: 'components', Component: ComponentsPage },
        ]
      }
    ]
  }
]);