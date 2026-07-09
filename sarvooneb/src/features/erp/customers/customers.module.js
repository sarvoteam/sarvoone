import prisma from '../../../config/prisma.js';
import { CustomersRepository } from './repository/customers.repository.js';
import { CustomersService } from './service/customers.service.js';
import { CustomersController } from './controller/customers.controller.js';
import { createRouter } from './routes/customers.routes.js';

const repository = new CustomersRepository(prisma);
const service = new CustomersService(repository);
const controller = new CustomersController(service);
const router = createRouter(controller);

export default router;
