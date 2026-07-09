export class BrandsDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
