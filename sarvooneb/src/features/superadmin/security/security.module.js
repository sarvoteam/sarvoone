import { SecurityRepository } from './repository/security.repository.js';
import { SecurityService } from './service/security.service.js';
import { SecurityController } from './controller/security.controller.js';
import { createRouter } from './routes/security.routes.js';

const repository = new SecurityRepository();
const service = new SecurityService(repository);
const controller = new SecurityController(service);
const router = createRouter(controller);

export default router;
