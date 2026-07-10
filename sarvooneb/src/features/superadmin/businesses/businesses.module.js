import prisma from '../../../config/prisma.js';
import pool from '../../../config/database.js';
import { EmailRepository } from '../../email/repository/email.repository.js';
import { EmailService } from '../../email/service/email.service.js';
import { BusinessesRepository } from './repository/businesses.repository.js';
import { BusinessesService } from './service/businesses.service.js';
import { BusinessesController } from './controller/businesses.controller.js';
import { createRouter } from './routes/businesses.routes.js';

const emailRepository = new EmailRepository(pool);
const emailService = new EmailService(emailRepository);
const repository = new BusinessesRepository(prisma);
const service = new BusinessesService(repository, emailService);
const controller = new BusinessesController(service);
const router = createRouter(controller);

export default router;
