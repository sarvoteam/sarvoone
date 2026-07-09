import React from 'react';

// Platform Dashboard
import PlatformDashboard from '../features/superadmin/dashboard/pages/PlatformDashboard';

// Businesses
import BusinessAccounts from '../features/superadmin/businesses/pages/BusinessAccounts';
import BusinessBranches from '../features/superadmin/businesses/pages/BusinessBranches';
import BusinessCategories from '../features/superadmin/businesses/pages/BusinessCategories';

// Subscriptions
import SubscriptionPlans from '../features/superadmin/subscriptions/pages/SubscriptionPlans';
import SubscriptionPayments from '../features/superadmin/subscriptions/pages/SubscriptionPayments';
import SubscriptionInvoices from '../features/superadmin/subscriptions/pages/SubscriptionInvoices';
import SubscriptionCoupons from '../features/superadmin/subscriptions/pages/SubscriptionCoupons';

// Users
import UserAccounts from '../features/superadmin/users/pages/UserAccounts';
import UserRoles from '../features/superadmin/users/pages/UserRoles';
import UserSessions from '../features/superadmin/users/pages/UserSessions';

// Support
import SupportTickets from '../features/superadmin/support/pages/SupportTickets';
import SupportLiveChat from '../features/superadmin/support/pages/SupportLiveChat';
import SupportKnowledgeBase from '../features/superadmin/support/pages/SupportKnowledgeBase';

// Marketplace
import MarketplaceModules from '../features/superadmin/marketplace/pages/MarketplaceModules';
import MarketplaceFeatureFlags from '../features/superadmin/marketplace/pages/MarketplaceFeatureFlags';

// Reports
import ReportsRevenue from '../features/superadmin/reports/pages/ReportsRevenue';
import ReportsBusinesses from '../features/superadmin/reports/pages/ReportsBusinesses';
import ReportsUsage from '../features/superadmin/reports/pages/ReportsUsage';

// Security
import SecurityAuditLogs from '../features/superadmin/security/pages/SecurityAuditLogs';
import SecurityLoginHistory from '../features/superadmin/security/pages/SecurityLoginHistory';
import SecurityApiKeys from '../features/superadmin/security/pages/SecurityApiKeys';

// System
import SystemSettings from '../features/superadmin/system/pages/SystemSettings';
import SystemNotifications from '../features/superadmin/system/pages/SystemNotifications';
import SystemEmailTemplates from '../features/superadmin/system/pages/SystemEmailTemplates';
import SystemPaymentGateways from '../features/superadmin/system/pages/SystemPaymentGateways';

// Monitoring
import MonitoringServerStatus from '../features/superadmin/monitoring/pages/MonitoringServerStatus';
import MonitoringErrorLogs from '../features/superadmin/monitoring/pages/MonitoringErrorLogs';
import MonitoringBackgroundJobs from '../features/superadmin/monitoring/pages/MonitoringBackgroundJobs';

// Developers
import DeveloperApis from '../features/superadmin/developers/pages/DeveloperApis';
import DeveloperWebhooks from '../features/superadmin/developers/pages/DeveloperWebhooks';

// Marketing
import MarketingCampaigns from '../features/superadmin/marketing/pages/MarketingCampaigns';
import MarketingAnnouncements from '../features/superadmin/marketing/pages/MarketingAnnouncements';

// Master Data
import MasterCategories from '../features/superadmin/masterdata/pages/MasterCategories';
import MasterCountries from '../features/superadmin/masterdata/pages/MasterCountries';
import MasterCities from '../features/superadmin/masterdata/pages/MasterCities';

export const superAdminRoutes = [
  // Dashboard / Legacy Analytics
  { path: 'dashboard', element: <PlatformDashboard /> },
  { path: 'analytics', element: <PlatformDashboard /> },

  // Businesses
  { path: 'businesses', element: <BusinessAccounts /> },
  { path: 'businesses/accounts', element: <BusinessAccounts /> },
  { path: 'businesses/branches', element: <BusinessBranches /> },
  { path: 'businesses/categories', element: <BusinessCategories /> },

  // Subscriptions
  { path: 'subscriptions', element: <SubscriptionPlans /> },
  { path: 'subscriptions/plans', element: <SubscriptionPlans /> },
  { path: 'subscriptions/payments', element: <SubscriptionPayments /> },
  { path: 'subscriptions/invoices', element: <SubscriptionInvoices /> },
  { path: 'subscriptions/coupons', element: <SubscriptionCoupons /> },

  // Users
  { path: 'users', element: <UserAccounts /> },
  { path: 'users/accounts', element: <UserAccounts /> },
  { path: 'users/roles', element: <UserRoles /> },
  { path: 'users/sessions', element: <UserSessions /> },

  // Support
  { path: 'support', element: <SupportTickets /> },
  { path: 'support/tickets', element: <SupportTickets /> },
  { path: 'support/chat', element: <SupportLiveChat /> },
  { path: 'support/kb', element: <SupportKnowledgeBase /> },

  // Marketplace
  { path: 'marketplace/modules', element: <MarketplaceModules /> },
  { path: 'marketplace/flags', element: <MarketplaceFeatureFlags /> },

  // Reports
  { path: 'reports/revenue', element: <ReportsRevenue /> },
  { path: 'reports/businesses', element: <ReportsBusinesses /> },
  { path: 'reports/usage', element: <ReportsUsage /> },

  // Security
  { path: 'security/audit', element: <SecurityAuditLogs /> },
  { path: 'security/logins', element: <SecurityLoginHistory /> },
  { path: 'security/apikeys', element: <SecurityApiKeys /> },

  // System
  { path: 'system/settings', element: <SystemSettings /> },
  { path: 'system/notifications', element: <SystemNotifications /> },
  { path: 'system/emails', element: <SystemEmailTemplates /> },
  { path: 'system/gateways', element: <SystemPaymentGateways /> },

  // Monitoring
  { path: 'monitoring/server', element: <MonitoringServerStatus /> },
  { path: 'monitoring/errors', element: <MonitoringErrorLogs /> },
  { path: 'monitoring/jobs', element: <MonitoringBackgroundJobs /> },

  // Developers
  { path: 'developers/apis', element: <DeveloperApis /> },
  { path: 'developers/webhooks', element: <DeveloperWebhooks /> },

  // Marketing
  { path: 'marketing/campaigns', element: <MarketingCampaigns /> },
  { path: 'marketing/announcements', element: <MarketingAnnouncements /> },

  // Master Data
  { path: 'masterdata/categories', element: <MasterCategories /> },
  { path: 'masterdata/countries', element: <MasterCountries /> },
  { path: 'masterdata/cities', element: <MasterCities /> }
];
