import prisma from '../../../config/prisma.js';
import { InventoryRepository } from './repository/inventory.repository.js';
import { InventoryService } from './service/inventory.service.js';
import { InventoryController } from './controller/inventory.controller.js';
import { createRouter } from './routes/inventory.routes.js';

const repository = new InventoryRepository(prisma);
const service = new InventoryService(repository);
const controller = new InventoryController(service);
const router = createRouter(controller);

export default router;
