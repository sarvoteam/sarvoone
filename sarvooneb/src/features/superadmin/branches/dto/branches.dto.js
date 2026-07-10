export class BranchesDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
