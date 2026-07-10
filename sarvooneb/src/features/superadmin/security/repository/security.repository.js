import prisma from '../../../../config/prisma.js';

export class SecurityRepository {
  constructor(prismaClient) {
    this.prisma = prismaClient || prisma;
  }

  async getAuditLogs() {
    // Clean up old static legacy seed records to force dynamic relative seeding
    const hasStaticLogs = await this.prisma.auditLog.findFirst({
      where: {
        action: 'Update Plan Price',
        resource: 'Pro Plan package price to ₹2499'
      }
    });

    if (hasStaticLogs && hasStaticLogs.timestamp.toISOString().includes('2026-07-09')) {
      await this.prisma.auditLog.deleteMany();
    }

    let logs = await this.prisma.auditLog.findMany({
      orderBy: { timestamp: 'desc' }
    });

    if (logs.length === 0) {
      // Seed default logs with relative dynamic timestamps
      const seedData = [
        { user: 'Emily Lynch (Super Admin)', action: 'Update Plan Price', resource: 'Pro Plan package price to ₹2499', ip: '103.45.201.88', timestamp: new Date(Date.now() - 30 * 60 * 1000) },
        { user: 'System Trigger', action: 'Create Invoice', resource: 'Invoice INV-2026-001 for Sarvo Medical', ip: '127.0.0.1', timestamp: new Date(Date.now() - 2 * 3600 * 1000) },
        { user: 'Emily Lynch (Super Admin)', action: 'Suspend Tenant', resource: 'Anastasia Grocery Outlet account', ip: '103.45.201.88', timestamp: new Date(Date.now() - 4 * 3600 * 1000) },
        { user: 'Rohit Ghanghav (Merchant)', action: 'Onboard Storefront', resource: 'Vogue Boutique Apparel CP', ip: '192.168.1.12', timestamp: new Date(Date.now() - 24 * 3600 * 1000) }
      ];

      for (const log of seedData) {
        await this.prisma.auditLog.create({ data: log });
      }

      logs = await this.prisma.auditLog.findMany({
        orderBy: { timestamp: 'desc' }
      });
    }

    return logs.map(l => ({
      id: l.id,
      timestamp: l.timestamp.toISOString().replace('T', ' ').substring(0, 19),
      user: l.user,
      action: l.action,
      resource: l.resource,
      ip: l.ip || '127.0.0.1'
    }));
  }

  async createAuditLog(data) {
    return this.prisma.auditLog.create({
      data: {
        user: data.user || 'Emily Lynch (Super Admin)',
        action: data.action,
        resource: data.resource,
        ip: data.ip || '103.45.201.88'
      }
    });
  }

  async getLoginHistory() {
    // Clean up old static legacy seed records to force dynamic relative seeding
    const hasStaticHistory = await this.prisma.loginHistory.findFirst({
      where: {
        email: 'sarvooneteam@gmail.com',
        status: 'Success'
      }
    });

    if (hasStaticHistory && hasStaticHistory.timestamp.toISOString().includes('2026-07-09')) {
      await this.prisma.loginHistory.deleteMany();
    }

    let history = await this.prisma.loginHistory.findMany({
      orderBy: { timestamp: 'desc' }
    });

    if (history.length === 0) {
      const seedData = [
        { email: 'sarvooneteam@gmail.com', ip: '103.45.201.88', agent: 'Chrome 125 / Win11', status: 'Success', timestamp: new Date(Date.now() - 10 * 60 * 1000) },
        { email: 'rohit.ghanghav6633@gmail.com', ip: '192.168.1.12', agent: 'Safari / iOS 17', status: 'Success', timestamp: new Date(Date.now() - 3 * 3600 * 1000) },
        { email: 'unknown.hacker@gmail.com', ip: '203.0.113.50', agent: 'Curl / Linux', status: 'Failed (Wrong PW)', timestamp: new Date(Date.now() - 6 * 3600 * 1000) },
        { email: 'alex.med@gmail.com', ip: '82.90.155.12', agent: 'Firefox / macOS', status: 'Success', timestamp: new Date(Date.now() - 36 * 3600 * 1000) }
      ];

      for (const hist of seedData) {
        await this.prisma.loginHistory.create({ data: hist });
      }

      history = await this.prisma.loginHistory.findMany({
        orderBy: { timestamp: 'desc' }
      });
    }

    return history.map(h => ({
      id: h.id,
      timestamp: h.timestamp.toISOString().replace('T', ' ').substring(0, 19),
      email: h.email,
      ip: h.ip || '127.0.0.1',
      agent: h.agent || 'Chrome',
      status: h.status
    }));
  }

  async createLoginHistory(data) {
    return this.prisma.loginHistory.create({
      data: {
        email: data.email,
        ip: data.ip || '103.45.201.88',
        agent: data.agent || 'Chrome 125 / Win11',
        status: data.status
      }
    });
  }

  async getApiKeys() {
    let keys = await this.prisma.apiKey.findMany({
      orderBy: { created: 'desc' }
    });

    if (keys.length === 0) {
      const seedData = [
        { name: 'Production Backend API Sync', token: 'sk_live_51P8d...', scopes: 'Read/Write (Full)', status: 'Active', created: new Date(Date.now() - 2 * 24 * 3600 * 1000) },
        { name: 'Zapier Webhook Integration', token: 'sk_live_90Ha...', scopes: 'Read Only (Metrics)', status: 'Active', created: new Date(Date.now() - 1 * 24 * 3600 * 1000) },
        { name: 'Analytics Sync Dashboard', token: 'sk_test_7a1F...', scopes: 'Read Only', status: 'Revoked', created: new Date(Date.now() - 1 * 24 * 3600 * 1000) }
      ];

      for (const k of seedData) {
        await this.prisma.apiKey.create({ data: k });
      }

      keys = await this.prisma.apiKey.findMany({
        orderBy: { created: 'desc' }
      });
    }

    return keys.map(k => ({
      id: k.id,
      name: k.name,
      token: k.token,
      scopes: k.scopes,
      created: k.created.toISOString().split('T')[0],
      status: k.status
    }));
  }

  async createApiKey(data) {
    return this.prisma.apiKey.create({
      data: {
        name: data.name,
        token: data.token,
        scopes: data.scopes || 'Read/Write (Default)',
        status: 'Active'
      }
    });
  }

  async revokeApiKey(id) {
    return this.prisma.apiKey.update({
      where: { id },
      data: { status: 'Revoked' }
    });
  }

  async findApiKeyById(id) {
    return this.prisma.apiKey.findUnique({
      where: { id }
    });
  }
}
