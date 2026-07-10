import { logAudit } from '../../security/utils/logger.js';

export class UsersService {
  constructor(repository) {
    this.repository = repository;
  }

  async getUsersAccounts() {
    await this.repository.deleteNonAdminRoles();
    const users = await this.repository.findUsersWithRoles();
    const usersStatus = await this.repository.readJson('users_status.json', {});

    const formattedUsers = users.map(user => {
      const roleList = user.roles.map(ur => ur.role.name);
      
      let displayRole = 'Business Owner';
      let roleCode = 'BUSINESS_OWNER';
      if (roleList.includes('SUPER_ADMIN')) {
        displayRole = 'Super Admin';
        roleCode = 'SUPER_ADMIN';
      } else if (roleList.includes('BUSINESS_OWNER')) {
        displayRole = 'Business Owner';
        roleCode = 'BUSINESS_OWNER';
      }

      const status = usersStatus[user.id] || 'Active';
      const dateStr = user.createdAt ? user.createdAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: displayRole,
        roleCode: roleCode,
        status: status,
        joinedDate: dateStr
      };
    });

    const dbRoles = await this.repository.findRoles();
    const rolesMapping = {
      'SUPER_ADMIN': 'Super Admin',
      'BUSINESS_OWNER': 'Business Owner'
    };
    const order = ['SUPER_ADMIN', 'BUSINESS_OWNER'];
    dbRoles.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

    const formattedRoles = dbRoles.map(r => ({
      id: r.id,
      name: rolesMapping[r.name] || r.description || r.name,
      code: r.name
    }));

    return {
      users: formattedUsers,
      roles: formattedRoles
    };
  }

  async updateUserRole(userId, roleCode) {
    const roleObj = await this.repository.findRoleByName(roleCode);
    if (!roleObj) throw new Error('Role not found');

    const user = await this.repository.findUserById(userId);
    if (!user) throw new Error('User not found');

    await this.repository.deleteUserRoles(userId);
    await this.repository.createUserRole(userId, roleObj.id);

    await logAudit({ action: 'Update User Role', resource: `User ${user.name} role changed to ${roleCode}` });

    return { message: `Role updated successfully to ${roleCode}` };
  }

  async toggleUserStatus(userId) {
    const user = await this.repository.findUserById(userId);
    if (!user) throw new Error('User not found');

    const usersStatus = await this.repository.readJson('users_status.json', {});
    const currentStatus = usersStatus[userId] || 'Active';
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';

    usersStatus[userId] = newStatus;
    await this.repository.writeJson('users_status.json', usersStatus);

    await logAudit({ action: 'Toggle User Status', resource: `User ${user.name} status toggled to ${newStatus}` });

    return { id: userId, status: newStatus };
  }

  async resetUserPassword(userId) {
    const user = await this.repository.findUserById(userId);
    if (!user) throw new Error('User not found');

    await this.repository.updateUserPassword(userId, 'reset2026');

    await logAudit({ action: 'Reset Password', resource: `Reset password for user ${user.name}` });

    return { message: `Password reset to "reset2026" for user ${user.name}` };
  }

  async getRolesMatrix() {
    await this.repository.deleteNonAdminRoles();
    const dbRoles = await this.repository.findRoles();
    const rolesMapping = {
      'SUPER_ADMIN': 'Super Admin',
      'BUSINESS_OWNER': 'Business Owner'
    };
    const order = ['SUPER_ADMIN', 'BUSINESS_OWNER'];
    dbRoles.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

    const roles = dbRoles.map(r => ({
      id: r.id,
      name: rolesMapping[r.name] || r.description || r.name,
      code: r.name
    }));

    const permissions = [
      { id: 'manage_businesses', label: 'Manage Businesses', description: 'Suspend, create, edit businesses' },
      { id: 'manage_users', label: 'Manage Users', description: 'Reset PW, delete logins, roles' },
      { id: 'view_financials', label: 'View Revenues', description: 'Access bills, payments & tables' },
      { id: 'manage_system', label: 'Edit System', description: 'Modify SMTP, gateways settings' }
    ];

    const initialMatrix = {
      SUPER_ADMIN: { manage_businesses: true, manage_users: true, view_financials: true, manage_system: true },
      BUSINESS_OWNER: { manage_businesses: false, manage_users: true, view_financials: true, manage_system: false }
    };

    let matrix = await this.repository.readJson('roles_matrix.json', null);
    if (!matrix) {
      matrix = initialMatrix;
      await this.repository.writeJson('roles_matrix.json', matrix);
    } else {
      const cleanedMatrix = {};
      cleanedMatrix.SUPER_ADMIN = matrix.SUPER_ADMIN || initialMatrix.SUPER_ADMIN;
      cleanedMatrix.BUSINESS_OWNER = matrix.BUSINESS_OWNER || initialMatrix.BUSINESS_OWNER;
      matrix = cleanedMatrix;
      await this.repository.writeJson('roles_matrix.json', matrix);
    }

    return { roles, permissions, matrix };
  }

  async toggleRolePermission(roleCode, permissionId) {
    if (roleCode === 'SUPER_ADMIN') {
      throw new Error('Super Admin permissions are locked');
    }

    let matrix = await this.repository.readJson('roles_matrix.json', {});
    if (!matrix[roleCode]) {
      matrix[roleCode] = {};
    }

    matrix[roleCode][permissionId] = !matrix[roleCode][permissionId];
    await this.repository.writeJson('roles_matrix.json', matrix);

    await logAudit({ action: 'Toggle Permission', resource: `Permission ${permissionId} toggled for role ${roleCode}` });

    return matrix;
  }

  async getSessions() {
    let dbSessions = await this.repository.findSessionsWithUser();

    const userAgentMocks = [
      { browser: 'Chrome 125', os: 'Windows 11', device: 'Desktop', ip: '103.45.201.88', location: 'New Delhi, DL' },
      { browser: 'Safari Mobile', os: 'iOS 17.4', device: 'Mobile', ip: '192.168.1.12', location: 'Mumbai, MH' },
      { browser: 'Firefox Developer Edition', os: 'macOS Sonoma', device: 'Desktop', ip: '82.90.155.12', location: 'Saint Petersburg, RU' },
      { browser: 'Chrome Mobile', os: 'Android 14', device: 'Mobile', ip: '94.22.40.103', location: 'Kiev, UA' }
    ];

    let sessionsMeta = await this.repository.readJson('sessions_meta.json', {});

    if (dbSessions.length === 0) {
      const allUsers = await this.repository.findUsers();
      dbSessions = [];
      for (let i = 0; i < allUsers.length; i++) {
        const u = allUsers[i];
        const mockAgent = userAgentMocks[i % userAgentMocks.length];
        const token = `mock_jwt_token_for_${u.id}_${Date.now()}_${i}`;
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        
        const sess = await this.repository.createSession(u.id, token, expiresAt);
        sessionsMeta[sess.id] = mockAgent;
        dbSessions.push(sess);
      }
      await this.repository.writeJson('sessions_meta.json', sessionsMeta);
    }

    return dbSessions.map(sess => {
      const meta = sessionsMeta[sess.id] || userAgentMocks[0];
      const diffMs = Date.now() - new Date(sess.createdAt).getTime();
      let lastActive = 'Active Now';
      if (diffMs > 3600000) {
        lastActive = `${Math.floor(diffMs / 3600000)} hour(s) ago`;
      } else if (diffMs > 60000) {
        lastActive = `${Math.floor(diffMs / 60000)} mins ago`;
      }

      return {
        id: sess.id,
        browser: meta.browser,
        os: meta.os,
        device: meta.device,
        userName: sess.user ? sess.user.name : 'Unknown User',
        email: sess.user ? sess.user.email : 'unknown@domain.com',
        ip: meta.ip,
        location: meta.location,
        lastActive
      };
    });
  }

  async revokeSession(id) {
    const session = await this.repository.db.session.findUnique({ where: { id } });
    if (!session) throw new Error('Session not found');

    await this.repository.deleteSession(id);
    const sessionsMeta = await this.repository.readJson('sessions_meta.json', {});
    delete sessionsMeta[id];
    await this.repository.writeJson('sessions_meta.json', sessionsMeta);

    await logAudit({ action: 'Revoke Session', resource: `Session ${id} terminated` });

    return { message: 'Session terminated successfully' };
  }

  async revokeAllOtherSessions(authHeader) {
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;
    let currentSession = null;
    if (token) {
      currentSession = await this.repository.findSessionByToken(token);
    }

    await logAudit({ action: 'Revoke Other Sessions', resource: 'All other remote user sessions revoked' });

    if (currentSession) {
      await this.repository.deleteOtherSessions(currentSession.id);
      const sessionsMeta = await this.repository.readJson('sessions_meta.json', {});
      const newMeta = {};
      if (sessionsMeta[currentSession.id]) {
        newMeta[currentSession.id] = sessionsMeta[currentSession.id];
      }
      await this.repository.writeJson('sessions_meta.json', newMeta);
      return { message: 'All other remote sessions terminated successfully' };
    }

    const superAdminUser = await this.repository.db.user.findFirst({
      where: { email: 'sarvooneteam@gmail.com' }
    });

    if (superAdminUser) {
      const adminSession = await this.repository.findFirstSessionOfUser(superAdminUser.id);
      if (adminSession) {
        await this.repository.deleteOtherSessions(adminSession.id);
        const sessionsMeta = await this.repository.readJson('sessions_meta.json', {});
        const newMeta = {};
        if (sessionsMeta[adminSession.id]) {
          newMeta[adminSession.id] = sessionsMeta[adminSession.id];
        }
        await this.repository.writeJson('sessions_meta.json', newMeta);
        return { message: 'All other sessions terminated' };
      }
    }

    await this.repository.deleteAllSessions();
    await this.repository.writeJson('sessions_meta.json', {});
    return { message: 'All sessions terminated' };
  }
}
