import prisma from '../../../config/prisma.js';
import { CompaniesRepository } from './repository/companies.repository.js';
import { CompaniesService } from './service/companies.service.js';
import { CompaniesController } from './controller/companies.controller.js';
import { createRouter } from './routes/companies.routes.js';

const repository = new CompaniesRepository(prisma);
const service = new CompaniesService(repository);
const controller = new CompaniesController(service);
const router = createRouter(controller);

export default router;
