export class PurchasesValidation {
  static validateCreate(data) {
    const errors = [];
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
