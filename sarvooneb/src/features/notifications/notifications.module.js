import prisma from '../../config/prisma.js';
import { NotificationsRepository } from './repository/notifications.repository.js';
import { NotificationsService } from './service/notifications.service.js';
import { NotificationsController } from './controller/notifications.controller.js';
import { createRouter } from './routes/notifications.routes.js';

const repository = new NotificationsRepository(prisma);
const service = new NotificationsService(repository);
const controller = new NotificationsController(service);
const router = createRouter(controller);

export default router;
