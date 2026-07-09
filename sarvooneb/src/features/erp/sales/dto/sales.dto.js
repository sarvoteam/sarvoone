export class SalesDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
