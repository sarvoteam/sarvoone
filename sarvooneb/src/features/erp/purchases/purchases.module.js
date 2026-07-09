import prisma from '../../../config/prisma.js';
import { PurchasesRepository } from './repository/purchases.repository.js';
import { PurchasesService } from './service/purchases.service.js';
import { PurchasesController } from './controller/purchases.controller.js';
import { createRouter } from './routes/purchases.routes.js';

const repository = new PurchasesRepository(prisma);
const service = new PurchasesService(repository);
const controller = new PurchasesController(service);
const router = createRouter(controller);

export default router;
