import React from 'react';
import Dashboard from '../features/erp/dashboard/pages/Dashboard';
import InventoryList from '../features/erp/inventory/pages/InventoryList';
import GeneralLedger from '../features/erp/accounting/pages/GeneralLedger';
import JournalEntries from '../features/erp/accounting/pages/JournalEntries';
import POSBillingPage from '../features/erp/sales/pages/POSBillingPage';
import ProductManagement from '../features/erp/products/ProductManagement';
import PurchaseManagement from '../features/erp/purchases/PurchaseManagement';
import SalesManagementPage from '../features/erp/sales/pages/SalesManagementPage';
import Taxation from '../features/erp/accounting/Taxation';
import Reports from '../features/erp/reports/Reports';
import EmployeeManagement from '../features/erp/employees/EmployeeManagement';
import BranchManagement from '../features/erp/branches/BranchManagement';
import Settings from '../features/erp/settings/Settings';
import MyAccount from '../features/erp/settings/MyAccount';

export const erpRoutes = [
  {
    path: 'dashboard',
    element: <Dashboard />
  },
  {
    path: 'inventory',
    element: <InventoryList />
  },
  {
    path: 'ledger',
    element: <GeneralLedger />
  },
  {
    path: 'journal',
    element: <JournalEntries />
  },
  {
    path: 'pos',
    element: <POSBillingPage />
  },
  {
    path: 'products',
    element: <ProductManagement />
  },
  {
    path: 'purchases',
    element: <PurchaseManagement />
  },
  {
    path: 'sales',
    element: <SalesManagementPage />
  },
  {
    path: 'taxation',
    element: <Taxation />
  },
  {
    path: 'reports',
    element: <Reports />
  },
  {
    path: 'employees',
    element: <EmployeeManagement />
  },

  {
    path: 'branches',
    element: <BranchManagement />
  },
  {
    path: 'settings',
    element: <Settings />
  },
  {
    path: 'my-account',
    element: <MyAccount />
  }
];
