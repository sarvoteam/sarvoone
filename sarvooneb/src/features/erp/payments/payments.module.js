import prisma from '../../../config/prisma.js';
import { PaymentsRepository } from './repository/payments.repository.js';
import { PaymentsService } from './service/payments.service.js';
import { PaymentsController } from './controller/payments.controller.js';
import { createRouter } from './routes/payments.routes.js';

const repository = new PaymentsRepository(prisma);
const service = new PaymentsService(repository);
const controller = new PaymentsController(service);
const router = createRouter(controller);

export default router;
