import prisma from '../../../config/prisma.js';
import { SuppliersRepository } from './repository/suppliers.repository.js';
import { SuppliersService } from './service/suppliers.service.js';
import { SuppliersController } from './controller/suppliers.controller.js';
import { createRouter } from './routes/suppliers.routes.js';

const repository = new SuppliersRepository(prisma);
const service = new SuppliersService(repository);
const controller = new SuppliersController(service);
const router = createRouter(controller);

export default router;
