export class StockDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
