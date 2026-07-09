import prisma from '../../../config/prisma.js';
import { SalesRepository } from './repository/sales.repository.js';
import { SalesService } from './service/sales.service.js';
import { SalesController } from './controller/sales.controller.js';
import { createRouter } from './routes/sales.routes.js';

const repository = new SalesRepository(prisma);
const service = new SalesService(repository);
const controller = new SalesController(service);
const router = createRouter(controller);

export default router;
