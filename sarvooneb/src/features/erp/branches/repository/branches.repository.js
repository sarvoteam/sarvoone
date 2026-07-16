import prisma from '../../../../config/prisma.js';

export class BranchesRepository {
  constructor(db = prisma) {
    this.db = db;
    this.model = db['branch'];
  }

  async create(data) {
    let activeBusinessId = data.businessId;
    if (!activeBusinessId) {
      const defaultBusiness = await this.db.business.findFirst();
      if (defaultBusiness) {
        activeBusinessId = defaultBusiness.id;
      } else {
        throw new Error("No business found in the database. Please create a business first.");
      }
    }
    
    return this.model.create({
      data: {
        name: data.name,
        address: data.address || null,
        phone: data.phone || null,
        businessId: activeBusinessId
      }
    });
  }

  async findMany(filters = {}) {
    return this.model.findMany({
      where: filters,
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findById(id) {
    return this.model.findUnique({
      where: { id }
    });
  }

  async update(id, data) {
    return this.model.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return this.model.delete({
      where: { id }
    });
  }
}
