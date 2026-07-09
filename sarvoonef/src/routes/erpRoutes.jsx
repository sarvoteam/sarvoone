import React from 'react';
import Dashboard from '../features/erp/dashboard/pages/Dashboard';
import InventoryList from '../features/erp/inventory/pages/InventoryList';
import GeneralLedger from '../features/erp/accounting/pages/GeneralLedger';
import JournalEntries from '../features/erp/accounting/pages/JournalEntries';
import POSBilling from '../features/erp/sales/POSBilling';
import ProductManagement from '../features/erp/products/ProductManagement';
import CustomerManagement from '../features/erp/customers/CustomerManagement';
import SupplierManagement from '../features/erp/suppliers/SupplierManagement';
import PurchaseManagement from '../features/erp/purchases/PurchaseManagement';
import SalesManagement from '../features/erp/sales/SalesManagement';
import StockTransfer from '../features/erp/inventory/StockTransfer';
import WarehouseManagement from '../features/erp/inventory/WarehouseManagement';
import Taxation from '../features/erp/accounting/Taxation';
import Reports from '../features/erp/reports/Reports';
import EmployeeManagement from '../features/erp/employees/EmployeeManagement';
import Notifications from '../features/erp/notifications/Notifications';
import BranchManagement from '../features/erp/branches/BranchManagement';
import BarcodeQR from '../features/erp/inventory/BarcodeQR';
import Settings from '../features/erp/settings/Settings';

const UsersAccess = () => (
  <div style={{ padding: '24px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', fontFamily: 'system-ui, sans-serif' }}>
    <h2 style={{ margin: '0 0 12px 0' }}>Users & Access</h2>
    <p style={{ color: '#6b7280' }}>This is a placeholder page for Managing User roles and session permissions.</p>
  </div>
);

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
    path: 'customers',
    element: <CustomerManagement />
  },
  {
    path: 'suppliers',
    element: <SupplierManagement />
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
    path: 'stock-transfer',
    element: <StockTransfer />
  },
  {
    path: 'warehouses',
    element: <WarehouseManagement />
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
    path: 'notifications',
    element: <Notifications />
  },
  {
    path: 'branches',
    element: <BranchManagement />
  },
  {
    path: 'barcodes',
    element: <BarcodeQR />
  },
  {
    path: 'settings',
    element: <Settings />
  },
  {
    path: 'users',
    element: <UsersAccess />
  }
];
