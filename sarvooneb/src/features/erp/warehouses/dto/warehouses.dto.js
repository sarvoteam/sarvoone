export class WarehousesDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
