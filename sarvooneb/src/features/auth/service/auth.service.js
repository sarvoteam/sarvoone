export class AuthService {
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
    if (!item) throw new Error(`Record not found in auth with id: ${id}`);
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

  async login(email, password) {
    const user = await this.repository.findByEmailWithRoles(email);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    const rolesList = user.roles.map(ur => ur.role.name);
    let primaryRole = 'BUSINESS_OWNER';
    if (rolesList.includes('SUPER_ADMIN')) {
      primaryRole = 'SUPER_ADMIN';
    } else if (rolesList.includes('BUSINESS_OWNER')) {
      primaryRole = 'BUSINESS_OWNER';
    } else if (rolesList.length > 0) {
      primaryRole = rolesList[0];
    }

    return {
      token: `mock_jwt_token_for_${user.id}_${Date.now()}`,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: primaryRole
      }
    };
  }
}
