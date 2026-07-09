import prisma from '../../../config/prisma.js';
import { ProductsRepository } from './repository/products.repository.js';
import { ProductsService } from './service/products.service.js';
import { ProductsController } from './controller/products.controller.js';
import { createRouter } from './routes/products.routes.js';

const repository = new ProductsRepository(prisma);
const service = new ProductsService(repository);
const controller = new ProductsController(service);
const router = createRouter(controller);

export default router;
