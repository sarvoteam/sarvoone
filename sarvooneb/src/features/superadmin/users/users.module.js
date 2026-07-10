import prisma from '../../../config/prisma.js';
import { UsersRepository } from './repository/users.repository.js';
import { UsersService } from './service/users.service.js';
import { UsersController } from './controller/users.controller.js';
import { createRouter } from './routes/users.routes.js';

const repository = new UsersRepository(prisma);
const service = new UsersService(repository);
const controller = new UsersController(service);
const router = createRouter(controller);

export default router;
