import prisma from '../../../../config/prisma.js';

export class PaymentsRepository {
  constructor(db = prisma) {
    this.db = db;
    this.model = db['payment'];
  }

  async create(data) {
    let activeBranchId = data.branchId;
    if (!activeBranchId) {
      const defaultBranch = await this.db.branch.findFirst();
      if (defaultBranch) {
        activeBranchId = defaultBranch.id;
      } else {
        throw new Error("No branch found in the database. Please create a branch first.");
      }
    }
    
    const prismaData = {
      ...data,
      branchId: activeBranchId,
      amount: Number(data.amount)
    };

    return this.model.create({ data: prismaData });
  }

  async findMany(filters = {}) {
    return this.model.findMany({ where: filters });
  }

  async findById(id) {
    return this.model.findUnique({ where: { id } });
  }

  async update(id, data) {
    return this.model.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return this.model.delete({ where: { id } });
  }
}
