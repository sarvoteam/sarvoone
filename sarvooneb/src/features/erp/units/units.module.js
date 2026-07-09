import prisma from '../../../config/prisma.js';
import { UnitsRepository } from './repository/units.repository.js';
import { UnitsService } from './service/units.service.js';
import { UnitsController } from './controller/units.controller.js';
import { createRouter } from './routes/units.routes.js';

const repository = new UnitsRepository(prisma);
const service = new UnitsService(repository);
const controller = new UnitsController(service);
const router = createRouter(controller);

export default router;
