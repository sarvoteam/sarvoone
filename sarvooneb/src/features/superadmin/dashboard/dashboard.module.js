import prisma from '../../../config/prisma.js';
import { DashboardRepository } from './repository/dashboard.repository.js';
import { DashboardService } from './service/dashboard.service.js';
import { DashboardController } from './controller/dashboard.controller.js';
import { createRouter } from './routes/dashboard.routes.js';

const repository = new DashboardRepository(prisma);
const service = new DashboardService(repository);
const controller = new DashboardController(service);
const router = createRouter(controller);

export default router;
