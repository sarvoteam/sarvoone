import prisma from '../../../config/prisma.js';
import { BusinessesRepository } from './repository/businesses.repository.js';
import { BusinessesService } from './service/businesses.service.js';
import { BusinessesController } from './controller/businesses.controller.js';
import { createRouter } from './routes/businesses.routes.js';

const repository = new BusinessesRepository(prisma);
const service = new BusinessesService(repository);
const controller = new BusinessesController(service);
const router = createRouter(controller);

export default router;
