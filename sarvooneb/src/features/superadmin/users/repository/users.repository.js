import prisma from '../../../../config/prisma.js';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '../../data');

export class UsersRepository {
  constructor(db = prisma) {
    this.db = db;
  }

  async readJson(filename, defaultValue = {}) {
    try {
      const filePath = path.join(dataDir, filename);
      const content = await fs.readFile(filePath, 'utf8');
      return JSON.parse(content);
    } catch (err) {
      return defaultValue;
    }
  }

  async writeJson(filename, data) {
    const filePath = path.join(dataDir, filename);
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  async deleteNonAdminRoles() {
    return this.db.role.deleteMany({
      where: {
        name: {
          notIn: ['SUPER_ADMIN', 'BUSINESS_OWNER']
        }
      }
    });
  }

  async findUsersWithRoles() {
    return this.db.user.findMany({
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });
  }

  async findUserById(id) {
    return this.db.user.findUnique({
      where: { id }
    });
  }

  async deleteUserRoles(userId) {
    return this.db.userRole.deleteMany({
      where: { userId }
    });
  }

  async createUserRole(userId, roleId) {
    return this.db.userRole.create({
      data: {
        userId,
        roleId
      }
    });
  }

  async findRoleByName(name) {
    return this.db.role.findUnique({
      where: { name }
    });
  }

  async findRoles() {
    return this.db.role.findMany();
  }

  async updateUserPassword(id, password) {
    return this.db.user.update({
      where: { id },
      data: { password }
    });
  }

  async findSessionsWithUser() {
    return this.db.session.findMany({
      include: {
        user: true
      }
    });
  }

  async findSessionByToken(token) {
    return this.db.session.findUnique({
      where: { token }
    });
  }

  async findFirstSessionOfUser(userId) {
    return this.db.session.findFirst({
      where: { userId }
    });
  }

  async createSession(userId, token, expiresAt) {
    return this.db.session.create({
      data: {
        userId,
        token,
        expiresAt
      },
      include: {
        user: true
      }
    });
  }

  async deleteSession(id) {
    return this.db.session.delete({
      where: { id }
    });
  }

  async deleteOtherSessions(keepSessionId) {
    return this.db.session.deleteMany({
      where: {
        id: { not: keepSessionId }
      }
    });
  }

  async deleteAllSessions() {
    return this.db.session.deleteMany({});
  }

  async findUsers() {
    return this.db.user.findMany();
  }
}
