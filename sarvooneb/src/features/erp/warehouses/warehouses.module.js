import prisma from '../../../config/prisma.js';
import { WarehousesRepository } from './repository/warehouses.repository.js';
import { WarehousesService } from './service/warehouses.service.js';
import { WarehousesController } from './controller/warehouses.controller.js';
import { createRouter } from './routes/warehouses.routes.js';

const repository = new WarehousesRepository(prisma);
const service = new WarehousesService(repository);
const controller = new WarehousesController(service);
const router = createRouter(controller);

export default router;
