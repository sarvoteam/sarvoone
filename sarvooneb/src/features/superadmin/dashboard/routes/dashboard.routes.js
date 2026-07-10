import express from 'express';

export function createRouter(controller) {
  const router = express.Router();
  router.get('/dashboard', controller.getDashboard);
  return router;
}
