import api from '../../../../shared/api/axios';

// Users / Accounts
export const getUsersAccounts = () => {
  return api.get('/superadmin/users/accounts');
};

export const toggleUserStatus = (id) => {
  return api.post(`/superadmin/users/accounts/${id}/toggle-status`);
};

export const resetUserPassword = (id) => {
  return api.post(`/superadmin/users/accounts/${id}/reset-password`);
};

export const updateUserRole = (id, roleCode) => {
  return api.post(`/superadmin/users/accounts/${id}/role`, { role: roleCode });
};

// Roles / Authorization
export const getRolesMatrix = () => {
  return api.get('/superadmin/users/roles');
};

export const toggleRolePermission = (roleCode, permissionId) => {
  return api.post('/superadmin/users/roles/toggle-permission', { roleCode, permissionId });
};

// Login Sessions
export const getActiveSessions = () => {
  return api.get('/superadmin/users/sessions');
};

export const revokeSession = (id) => {
  return api.delete(`/superadmin/users/sessions/${id}`);
};

export const revokeAllOtherSessions = () => {
  return api.delete('/superadmin/users/sessions/revoke-others');
};
