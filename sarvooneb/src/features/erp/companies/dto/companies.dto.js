export class CompaniesDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
