import { logAudit } from '../utils/logger.js';

export class SecurityService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAuditLogs() {
    return this.repository.getAuditLogs();
  }

  async getLoginHistory() {
    return this.repository.getLoginHistory();
  }

  async getApiKeys() {
    return this.repository.getApiKeys();
  }

  async generateApiKey(name) {
    const token = `sk_live_${Math.random().toString(36).substring(2, 8)}...`;
    const key = await this.repository.createApiKey({ name, token });

    await logAudit({ action: 'Generate API Key', resource: `Generated API Key: ${name}` });

    return {
      id: key.id,
      name: key.name,
      token: key.token,
      scopes: key.scopes,
      created: key.created.toISOString().split('T')[0],
      status: key.status
    };
  }

  async revokeApiKey(id) {
    const key = await this.repository.findApiKeyById(id);
    if (!key) throw new Error('API key not found');

    await this.repository.revokeApiKey(id);

    await logAudit({ action: 'Revoke API Key', resource: `Revoked API Key: ${key.name}` });

    return { message: 'API Key revoked successfully' };
  }
}
