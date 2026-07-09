import prisma from '../../../config/prisma.js';
import { AttendanceRepository } from './repository/attendance.repository.js';
import { AttendanceService } from './service/attendance.service.js';
import { AttendanceController } from './controller/attendance.controller.js';
import { createRouter } from './routes/attendance.routes.js';

const repository = new AttendanceRepository(prisma);
const service = new AttendanceService(repository);
const controller = new AttendanceController(service);
const router = createRouter(controller);

export default router;
