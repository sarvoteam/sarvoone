export class AttendanceDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
