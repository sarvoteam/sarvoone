import prisma from '../../../config/prisma.js';
import { CategoriesRepository } from './repository/categories.repository.js';
import { CategoriesService } from './service/categories.service.js';
import { CategoriesController } from './controller/categories.controller.js';
import { createRouter } from './routes/categories.routes.js';

const repository = new CategoriesRepository(prisma);
const service = new CategoriesService(repository);
const controller = new CategoriesController(service);
const router = createRouter(controller);

export default router;
