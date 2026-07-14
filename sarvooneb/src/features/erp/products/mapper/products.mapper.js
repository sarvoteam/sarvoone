export class ProductsMapper {
  static toResponse(dbRow) {
    if (!dbRow) return null;
    return {
      id: dbRow.id,
      name: dbRow.name,
      sku: dbRow.sku,
      barcode: dbRow.barcode,
      hsn: dbRow.hsn,
      hsnCode: dbRow.hsn,
      gst: dbRow.gst,
      gstRate: dbRow.gst,
      mrp: dbRow.mrp,
      sellingPrice: dbRow.sellingPrice,
      purchasePrice: dbRow.purchasePrice,
      wholesalePrice: dbRow.wholesalePrice,
      imageUrl: dbRow.imageUrl,
      stock: dbRow.currentStock,
      currentStock: dbRow.currentStock,
      reorderLevel: dbRow.reorderLevel,
      batchNumber: dbRow.batchNumber,
      expiryDate: dbRow.expiryDate,
      damagedStock: dbRow.damagedStock,
      warehouseStock: dbRow.warehouseStock,
      branchId: dbRow.branchId,
      categoryId: dbRow.categoryId,
      brandId: dbRow.brandId,
      unitId: dbRow.unitId,
      category: dbRow.category ? dbRow.category.name : null,
      unit: dbRow.unit ? dbRow.unit.name : null,
      brand: dbRow.brand ? dbRow.brand.name : null,
      createdAt: dbRow.createdAt,
      updatedAt: dbRow.updatedAt
    };
  }

  static toResponseList(dbRows) {
    if (!dbRows) return [];
    return dbRows.map(row => this.toResponse(row));
  }
}
