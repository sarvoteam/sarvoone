import express from 'express';

export function createRouter(controller) {
  const router = express.Router();

  router.get('/security/audit-logs', controller.getAuditLogs);
  router.get('/security/login-history', controller.getLoginHistory);
  router.get('/security/api-keys', controller.getApiKeys);
  router.post('/security/api-keys', controller.generateApiKey);
  router.post('/security/api-keys/:id/revoke', controller.revokeApiKey);

  return router;
}
