import prisma from '../../../../config/prisma.js';

export class DashboardRepository {
  constructor(db = prisma) {
    this.db = db;
  }

  async countBusinesses() {
    return this.db.business.count();
  }

  async countBranches() {
    return this.db.branch.count();
  }

  async countBusinessesLte(date) {
    return this.db.business.count({
      where: {
        createdAt: {
          lte: date
        }
      }
    });
  }
}
