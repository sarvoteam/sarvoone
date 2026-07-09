import express from 'express';
import superadminRouter from '../features/superadmin/superadmin.module.js';
import emailRouter from '../features/email/email.module.js';
import authRouter from '../features/auth/auth.module.js';
import businessesRouter from '../features/erp/businesses/businesses.module.js';
import branchesRouter from '../features/erp/branches/branches.module.js';
import customersRouter from '../features/erp/customers/customers.module.js';
import suppliersRouter from '../features/erp/suppliers/suppliers.module.js';
import categoriesRouter from '../features/erp/categories/categories.module.js';
import brandsRouter from '../features/erp/brands/brands.module.js';
import unitsRouter from '../features/erp/units/units.module.js';
import productsRouter from '../features/erp/products/products.module.js';
import inventoryRouter from '../features/erp/inventory/inventory.module.js';
import purchasesRouter from '../features/erp/purchases/purchases.module.js';
import salesRouter from '../features/erp/sales/sales.module.js';
import warehousesRouter from '../features/erp/warehouses/warehouses.module.js';
import stockRouter from '../features/erp/stock/stock.module.js';
import paymentsRouter from '../features/erp/payments/payments.module.js';
import expensesRouter from '../features/erp/expenses/expenses.module.js';
import employeesRouter from '../features/erp/employees/employees.module.js';
import attendanceRouter from '../features/erp/attendance/attendance.module.js';
import dashboardRouter from '../features/erp/dashboard/dashboard.module.js';
import notificationsRouter from '../features/notifications/notifications.module.js';

const router = express.Router();

// Mount Features
router.use('/superadmin', superadminRouter);
router.use('/email', emailRouter);
router.use('/auth', authRouter);
router.use('/erp/businesses', businessesRouter);
router.use('/erp/branches', branchesRouter);
router.use('/erp/customers', customersRouter);
router.use('/erp/suppliers', suppliersRouter);
router.use('/erp/categories', categoriesRouter);
router.use('/erp/brands', brandsRouter);
router.use('/erp/units', unitsRouter);
router.use('/erp/products', productsRouter);
router.use('/erp/inventory', inventoryRouter);
router.use('/erp/purchases', purchasesRouter);
router.use('/erp/sales', salesRouter);
router.use('/erp/warehouses', warehousesRouter);
router.use('/erp/stock', stockRouter);
router.use('/erp/payments', paymentsRouter);
router.use('/erp/expenses', expensesRouter);
router.use('/erp/employees', employeesRouter);
router.use('/erp/attendance', attendanceRouter);
router.use('/erp/dashboard', dashboardRouter);
router.use('/notifications', notificationsRouter);

export default router;

