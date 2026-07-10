import api from '../../../../shared/api/axios';

export const getAuditLogs = () => {
  return api.get('/superadmin/security/audit-logs');
};

export const getLoginHistory = () => {
  return api.get('/superadmin/security/login-history');
};

export const getApiKeys = () => {
  return api.get('/superadmin/security/api-keys');
};

export const generateApiKey = (name) => {
  return api.post('/superadmin/security/api-keys', { name });
};

export const revokeApiKey = (id) => {
  return api.post(`/superadmin/security/api-keys/${id}/revoke`);
};
