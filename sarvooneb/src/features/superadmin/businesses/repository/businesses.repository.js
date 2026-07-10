import prisma from '../../../../config/prisma.js';

export class BusinessesRepository {
  constructor(db = prisma) {
    this.db = db;
    this.model = db['business'];
  }

  async create(data) {
    return this.model.create({ data });
  }

  async findMany(filters = {}) {
    return this.model.findMany({ 
      where: filters,
      include: {
        _count: {
          select: { branches: true }
        }
      }
    });
  }

  async findById(id) {
    return this.model.findUnique({ 
      where: { id },
      include: {
        _count: {
          select: { branches: true }
        }
      }
    });
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
