import prisma from '../../../config/prisma.js';
import { StockRepository } from './repository/stock.repository.js';
import { StockService } from './service/stock.service.js';
import { StockController } from './controller/stock.controller.js';
import { createRouter } from './routes/stock.routes.js';

const repository = new StockRepository(prisma);
const service = new StockService(repository);
const controller = new StockController(service);
const router = createRouter(controller);

export default router;
