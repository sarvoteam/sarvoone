import prisma from '../../config/prisma.js';
import { AuthRepository } from './repository/auth.repository.js';
import { AuthService } from './service/auth.service.js';
import { AuthController } from './controller/auth.controller.js';
import { createRouter } from './routes/auth.routes.js';

const repository = new AuthRepository(prisma);
const service = new AuthService(repository);
const controller = new AuthController(service);
const router = createRouter(controller);

export default router;
