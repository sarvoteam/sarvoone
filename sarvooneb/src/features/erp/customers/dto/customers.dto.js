export class CustomersDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
