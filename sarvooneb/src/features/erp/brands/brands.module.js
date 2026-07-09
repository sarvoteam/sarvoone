import prisma from '../../../config/prisma.js';
import { BrandsRepository } from './repository/brands.repository.js';
import { BrandsService } from './service/brands.service.js';
import { BrandsController } from './controller/brands.controller.js';
import { createRouter } from './routes/brands.routes.js';

const repository = new BrandsRepository(prisma);
const service = new BrandsService(repository);
const controller = new BrandsController(service);
const router = createRouter(controller);

export default router;
