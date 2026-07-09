export class NotificationsDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
