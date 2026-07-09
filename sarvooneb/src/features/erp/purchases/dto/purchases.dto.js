export class PurchasesDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
