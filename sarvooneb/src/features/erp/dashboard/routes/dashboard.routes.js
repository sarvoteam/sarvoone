import express from 'express';

export function createRouter(controller) {
  const router = express.Router();

  // Fetch all dashboard summary counts & values
  router.get('/', controller.getSummary);

  return router;
}
