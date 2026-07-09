import prisma from '../../../config/prisma.js';
import { BranchesRepository } from './repository/branches.repository.js';
import { BranchesService } from './service/branches.service.js';
import { BranchesController } from './controller/branches.controller.js';
import { createRouter } from './routes/branches.routes.js';

const repository = new BranchesRepository(prisma);
const service = new BranchesService(repository);
const controller = new BranchesController(service);
const router = createRouter(controller);

export default router;
