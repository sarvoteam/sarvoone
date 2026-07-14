import React from 'react';
import Dashboard from '../features/erp/dashboard/pages/Dashboard';
import InventoryList from '../features/erp/inventory/pages/InventoryList';
import GeneralLedger from '../features/erp/accounting/pages/GeneralLedger';
import JournalEntries from '../features/erp/accounting/pages/JournalEntries';
import POSBilling from '../features/erp/sales/POSBilling';
import ProductManagement from '../features/erp/products/ProductManagement';
import PurchaseManagement from '../features/erp/purchases/PurchaseManagement';
import SalesManagement from '../features/erp/sales/SalesManagement';
import Taxation from '../features/erp/accounting/Taxation';
import Reports from '../features/erp/reports/Reports';
import EmployeeManagement from '../features/erp/employees/EmployeeManagement';
import BranchManagement from '../features/erp/branches/BranchManagement';
import Settings from '../features/erp/settings/Settings';

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
    element: <POSBilling />
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
    element: <SalesManagement />
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
  }
];
