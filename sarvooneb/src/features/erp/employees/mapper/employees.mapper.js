export class EmployeesMapper {
  static toResponse(dbRow) {
    if (!dbRow) return null;
    return {
      id: dbRow.id,
      branchId: dbRow.branchId,
      name: dbRow.name,
      email: dbRow.email,
      phone: dbRow.phone,
      role: dbRow.role,
      salary: dbRow.salary,
      createdAt: dbRow.createdAt,
      updatedAt: dbRow.updatedAt,
      attendance: dbRow.attendance || []
    };
  }

  static toResponseList(dbRows) {
    if (!dbRows) return [];
    return dbRows.map(row => this.toResponse(row));
  }
}

