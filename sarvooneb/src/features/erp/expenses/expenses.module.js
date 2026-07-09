import prisma from '../../../config/prisma.js';
import { ExpensesRepository } from './repository/expenses.repository.js';
import { ExpensesService } from './service/expenses.service.js';
import { ExpensesController } from './controller/expenses.controller.js';
import { createRouter } from './routes/expenses.routes.js';

const repository = new ExpensesRepository(prisma);
const service = new ExpensesService(repository);
const controller = new ExpensesController(service);
const router = createRouter(controller);

export default router;
