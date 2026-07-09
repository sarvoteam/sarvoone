export class ProductsDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
