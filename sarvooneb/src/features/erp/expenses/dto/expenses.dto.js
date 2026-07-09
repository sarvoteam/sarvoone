export class ExpensesDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
