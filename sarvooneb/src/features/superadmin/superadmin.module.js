import express from 'express';
import dashboardRouter from './dashboard/dashboard.module.js';
import usersRouter from './users/users.module.js';
import securityRouter from './security/security.module.js';
import businessesRouter from './businesses/businesses.module.js';
import branchesRouter from './branches/branches.module.js';
import categoriesRouter from './categories/categories.module.js';

const router = express.Router();

router.use(dashboardRouter);
router.use(usersRouter);
router.use(securityRouter);

// Mount Super Admin Businesses, Branches, and Categories
router.use('/businesses', businessesRouter);
router.use('/branches', branchesRouter);
router.use('/categories', categoriesRouter);

export default router;
