export class AuthDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
