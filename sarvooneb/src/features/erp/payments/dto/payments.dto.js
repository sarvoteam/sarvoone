export class PaymentsDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
