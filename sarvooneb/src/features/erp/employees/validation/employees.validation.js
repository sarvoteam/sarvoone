export class EmployeesValidation {
  static validateCreate(data) {
    const errors = [];
    if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
      errors.push({ field: 'name', message: 'Name is required' });
    }
    if (!data.role || typeof data.role !== 'string' || data.role.trim() === '') {
      errors.push({ field: 'role', message: 'Role is required' });
    }
    if (data.salary === undefined || data.salary === null || isNaN(Number(data.salary)) || Number(data.salary) < 0) {
      errors.push({ field: 'salary', message: 'Basic monthly salary must be a positive number' });
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

