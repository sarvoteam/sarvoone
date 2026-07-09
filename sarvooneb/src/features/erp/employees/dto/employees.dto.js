export class EmployeesDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
