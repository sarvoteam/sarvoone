export class BranchesValidation {
  static validateCreate(data) {
    const errors = [];
    if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
      errors.push({ field: 'name', message: 'Branch name is required' });
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
