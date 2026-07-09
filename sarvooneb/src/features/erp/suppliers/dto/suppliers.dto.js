export class SuppliersDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
