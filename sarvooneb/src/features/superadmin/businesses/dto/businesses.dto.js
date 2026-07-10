export class BusinessesDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
