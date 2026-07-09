export class SalesValidation {
  static validateCreate(data) {
    const errors = [];
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
