export class CustomersMapper {
  static toResponse(dbRow) {
    if (!dbRow) return null;
    return {
      ...dbRow
    };
  }

  static toResponseList(dbRows) {
    if (!dbRows) return [];
    return dbRows.map(row => this.toResponse(row));
  }
}
