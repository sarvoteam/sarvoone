export class InventoryDTO {
  static fromRequest(body) {
    return {
      ...body
    };
  }
}
