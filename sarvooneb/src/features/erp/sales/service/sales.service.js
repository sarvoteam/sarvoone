export class SalesService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(data) {
    return this.repository.create(data);
  }

  async getAll(filters) {
    return this.repository.findMany(filters);
  }

  async getById(id) {
    const item = await this.repository.findById(id);
    if (!item) throw new Error(`Record not found in sales with id: ${id}`);
    return item;
  }

  async update(id, data) {
    await this.getById(id);
    return this.repository.update(id, data);
  }

  async delete(id) {
    await this.getById(id);
    return this.repository.delete(id);
  }
}
