import express from 'express';

export function createRouter(controller) {
  const router = express.Router();

  router.get('/users/accounts', controller.getUsersAccounts);
  router.post('/users/accounts/:id/role', controller.updateUserRole);
  router.post('/users/accounts/:id/toggle-status', controller.toggleUserStatus);
  router.post('/users/accounts/:id/reset-password', controller.resetUserPassword);

  router.get('/users/roles', controller.getRolesMatrix);
  router.post('/users/roles/toggle-permission', controller.toggleRolePermission);

  router.get('/users/sessions', controller.getSessions);
  router.delete('/users/sessions/:id', controller.revokeSession);
  router.delete('/users/sessions/revoke-others', controller.revokeAllOtherSessions);

  return router;
}
