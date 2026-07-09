import express from 'express';

export function createRouter(controller) {
  const router = express.Router();

  router.post('/', controller.create);
  router.post('/login', controller.login);
  router.get('/', controller.getAll);
  router.get('/:id', controller.getById);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.delete);

  return router;
}
