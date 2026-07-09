import pool from '../../config/database.js';
import { EmailRepository } from './repository/email.repository.js';
import { EmailService } from './service/email.service.js';
import { EmailController } from './controller/email.controller.js';
import { createEmailRouter } from './routes/email.routes.js';

// Assemble Dependency Injection Chain
const repository = new EmailRepository(pool);
const service = new EmailService(repository);
const controller = new EmailController(service);

// Create the configured router for this module
const emailRouter = createEmailRouter(controller);

export default emailRouter;
