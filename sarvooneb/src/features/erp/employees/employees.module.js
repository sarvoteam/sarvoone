import prisma from '../../../config/prisma.js';
import { EmployeesRepository } from './repository/employees.repository.js';
import { EmployeesService } from './service/employees.service.js';
import { EmployeesController } from './controller/employees.controller.js';
import { createRouter } from './routes/employees.routes.js';

const repository = new EmployeesRepository(prisma);
const service = new EmployeesService(repository);
const controller = new EmployeesController(service);
const router = createRouter(controller);

export default router;
