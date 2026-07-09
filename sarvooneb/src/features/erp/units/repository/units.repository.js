import prisma from '../../../../config/prisma.js';

export class UnitsRepository {
  constructor(db = prisma) {
    this.db = db;
    this.model = db['unit'];
  }

  async create(data) {
    return this.model.create({ data });
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
