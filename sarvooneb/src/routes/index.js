import express from 'express';
import superadminRouter from '../features/superadmin/superadmin.module.js';
import emailRouter from '../features/email/email.module.js';
import authRouter from '../features/auth/auth.module.js';
import customersRouter from '../features/erp/customers/customers.module.js';
import suppliersRouter from '../features/erp/suppliers/suppliers.module.js';
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
import branchesRouter from '../features/erp/branches/branches.module.js';
import notificationsRouter from '../features/notifications/notifications.module.js';

import prisma from '../config/prisma.js';

const router = express.Router();

// Mount Features
router.use('/superadmin', superadminRouter);
router.use('/email', emailRouter);
router.use('/auth', authRouter);
router.use('/erp/customers', customersRouter);
router.use('/erp/suppliers', suppliersRouter);
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
router.use('/erp/branches', branchesRouter);
router.use('/notifications', notificationsRouter);

// Public Shop API Endpoints
router.get('/public', async (req, res, next) => {
  try {
    const businesses = await prisma.business.findMany({
      include: {
        branches: {
          include: {
            products: {
              include: {
                category: true,
                unit: true,
                brand: true
              }
            }
          }
        }
      }
    });

    const data = businesses.map(b => {
      const products = b.branches.flatMap(br => br.products.map(p => ({
        id: p.id,
        name: p.name,
        sku: p.sku,
        category: p.category ? p.category.name : 'General',
        unit: p.unit ? p.unit.name : 'piece',
        brand: p.brand ? p.brand.name : '',
        sellingPrice: p.sellingPrice,
        mrp: p.mrp,
        currentStock: p.currentStock
      })));

      return {
        id: b.id,
        name: b.name,
        email: b.email,
        phone: b.phone,
        address: b.address,
        ownerName: b.ownerName,
        category: b.category,
        products: products
      };
    });

    return res.status(200).json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
});

router.get('/public/:businessSlug', async (req, res, next) => {
  try {
    const { businessSlug } = req.params;
    const businesses = await prisma.business.findMany({
      include: {
        branches: {
          include: {
            products: {
              include: {
                category: true,
                unit: true,
                brand: true
              }
            }
          }
        }
      }
    });

    const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const business = businesses.find(b => slugify(b.name) === businessSlug);

    if (!business) {
      return res.status(404).json({ success: false, message: 'Business not found' });
    }

    const businessSettings = await prisma.businessSetting.findMany({
      where: { businessId: business.id }
    });

    const settingsObj = businessSettings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    const products = business.branches.flatMap(br => br.products.map(p => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      category: p.category ? p.category.name : 'General',
      unit: p.unit ? p.unit.name : 'piece',
      brand: p.brand ? p.brand.name : '',
      sellingPrice: p.sellingPrice,
      mrp: p.mrp,
      currentStock: p.currentStock
    })));

    return res.status(200).json({
      success: true,
      data: {
        business: {
          id: business.id,
          name: business.name,
          email: business.email,
          phone: business.phone,
          address: business.address,
          ownerName: business.ownerName,
          category: business.category,
          settings: settingsObj
        },
        products
      }
    });
  } catch (err) {
    next(err);
  }
});

// ERP Settings API Endpoints
router.get('/erp/settings/:businessSlug', async (req, res, next) => {
  try {
    const { businessSlug } = req.params;
    const businesses = await prisma.business.findMany();
    const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const business = businesses.find(b => slugify(b.name) === businessSlug);

    if (!business) {
      return res.status(404).json({ success: false, message: 'Business not found' });
    }

    const businessSettings = await prisma.businessSetting.findMany({
      where: { businessId: business.id }
    });

    const settingsObj = businessSettings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    return res.status(200).json({
      success: true,
      data: {
        id: business.id,
        name: business.name,
        email: business.email,
        phone: business.phone,
        address: business.address,
        ownerName: business.ownerName,
        category: business.category,
        settings: settingsObj
      }
    });
  } catch (err) {
    next(err);
  }
});

router.put('/erp/settings/:businessSlug', async (req, res, next) => {
  try {
    const { businessSlug } = req.params;
    const { name, phone, currency, colorPalette } = req.body;

    const businesses = await prisma.business.findMany();
    const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const business = businesses.find(b => slugify(b.name) === businessSlug);

    if (!business) {
      return res.status(404).json({ success: false, message: 'Business not found' });
    }

    // Update business profile
    const updatedBusiness = await prisma.business.update({
      where: { id: business.id },
      data: {
        name: name || business.name,
        phone: phone || business.phone
      }
    });

    // Update settings: currency
    if (currency !== undefined) {
      const setting = await prisma.businessSetting.findFirst({
        where: { businessId: business.id, key: 'currency' }
      });
      if (setting) {
        await prisma.businessSetting.update({
          where: { id: setting.id },
          data: { value: currency }
        });
      } else {
        await prisma.businessSetting.create({
          data: {
            businessId: business.id,
            key: 'currency',
            value: currency
          }
        });
      }
    }

    // Update settings: colorPalette
    if (colorPalette !== undefined) {
      const setting = await prisma.businessSetting.findFirst({
        where: { businessId: business.id, key: 'colorPalette' }
      });
      if (setting) {
        await prisma.businessSetting.update({
          where: { id: setting.id },
          data: { value: colorPalette }
        });
      } else {
        await prisma.businessSetting.create({
          data: {
            businessId: business.id,
            key: 'colorPalette',
            value: colorPalette
          }
        });
      }
    }

    const businessSettings = await prisma.businessSetting.findMany({
      where: { businessId: business.id }
    });

    const settingsObj = businessSettings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    return res.status(200).json({
      success: true,
      message: 'Business configurations updated successfully',
      data: {
        id: updatedBusiness.id,
        name: updatedBusiness.name,
        email: updatedBusiness.email,
        phone: updatedBusiness.phone,
        address: updatedBusiness.address,
        ownerName: updatedBusiness.ownerName,
        category: updatedBusiness.category,
        settings: settingsObj
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;


