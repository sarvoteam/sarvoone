import prisma from '../../../../config/prisma.js';

export class ProductsRepository {
  constructor(db = prisma) {
    this.db = db;
    this.model = db['product'];
  }

  async resolveRelations(data) {
    // 1. Resolve branchId
    let activeBranchId = data.branchId;
    if (!activeBranchId) {
      const defaultBranch = await this.db.branch.findFirst();
      if (defaultBranch) {
        activeBranchId = defaultBranch.id;
      } else {
        throw new Error("No branch found in the database. Please create a branch first.");
      }
    }
    data.branchId = activeBranchId;

    // 2. Map frontend 'stock' field to prisma 'currentStock'
    if (data.stock !== undefined) {
      data.currentStock = Number(data.stock);
      delete data.stock;
    }

    // 2.5 Map compatible frontend fields and convert values to numbers
    if (data.gstRate !== undefined) {
      data.gst = Number(data.gstRate);
      delete data.gstRate;
    }
    if (data.hsnCode !== undefined) {
      data.hsn = String(data.hsnCode);
      delete data.hsnCode;
    }
    if (data.mrp !== undefined) data.mrp = Number(data.mrp);
    if (data.sellingPrice !== undefined) data.sellingPrice = Number(data.sellingPrice);
    if (data.purchasePrice !== undefined) data.purchasePrice = Number(data.purchasePrice);
    if (data.wholesalePrice !== undefined) data.wholesalePrice = Number(data.wholesalePrice);
    if (data.reorderLevel !== undefined) data.reorderLevel = Number(data.reorderLevel);
    if (data.damagedStock !== undefined) data.damagedStock = Number(data.damagedStock);

    // 3. Resolve category name to categoryId
    if (data.category) {
      let cat = await this.db.category.findFirst({
        where: { name: data.category, branchId: activeBranchId }
      });
      if (!cat) {
        cat = await this.db.category.create({
          data: { name: data.category, branchId: activeBranchId }
        });
      }
      data.categoryId = cat.id;
    }
    delete data.category;

    // 4. Resolve unit name to unitId
    if (data.unit) {
      let unitObj = await this.db.unit.findFirst({
        where: { name: data.unit, branchId: activeBranchId }
      });
      if (!unitObj) {
        unitObj = await this.db.unit.create({
          data: { name: data.unit, shortName: data.unit, branchId: activeBranchId }
        });
      }
      data.unitId = unitObj.id;
    }
    delete data.unit;

    // 5. Resolve brand name to brandId
    if (data.brand) {
      let brandObj = await this.db.brand.findFirst({
        where: { name: data.brand, branchId: activeBranchId }
      });
      if (!brandObj) {
        brandObj = await this.db.brand.create({
          data: { name: data.brand, branchId: activeBranchId }
        });
      }
      data.brandId = brandObj.id;
    }
    delete data.brand;

    return data;
  }

  async create(data) {
    const resolvedData = await this.resolveRelations({ ...data });
    return this.model.create({
      data: resolvedData,
      include: {
        category: true,
        unit: true,
        brand: true
      }
    });
  }

  async findMany(filters = {}) {
    // If branchId is passed in filters, use it. Otherwise get all.
    return this.model.findMany({
      where: filters,
      include: {
        category: true,
        unit: true,
        brand: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findById(id) {
    return this.model.findUnique({
      where: { id },
      include: {
        category: true,
        unit: true,
        brand: true
      }
    });
  }

  async update(id, data) {
    const resolvedData = await this.resolveRelations({ ...data });
    return this.model.update({
      where: { id },
      data: resolvedData,
      include: {
        category: true,
        unit: true,
        brand: true
      }
    });
  }

  async delete(id) {
    return this.model.delete({
      where: { id },
      include: {
        category: true,
        unit: true,
        brand: true
      }
    });
  }
}
