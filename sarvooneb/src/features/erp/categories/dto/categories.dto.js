export class CategoriesDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
