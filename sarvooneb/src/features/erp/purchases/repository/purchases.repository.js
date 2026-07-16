import prisma from '../../../../config/prisma.js';

export class PurchasesRepository {
  constructor(db = prisma) {
    this.db = db;
    this.model = db['purchaseOrder'];
  }

  async create(data) {
    let activeBranchId = data.branchId;
    if (!activeBranchId) {
      const defaultBranch = await this.db.branch.findFirst();
      if (defaultBranch) {
        activeBranchId = defaultBranch.id;
      } else {
        throw new Error("No branch found in the database. Please create a branch first.");
      }
    }
    
    const { items, ...orderData } = data;
    orderData.branchId = activeBranchId;
    
    if (orderData.totalAmount !== undefined) orderData.totalAmount = Number(orderData.totalAmount);
    if (orderData.taxAmount !== undefined) orderData.taxAmount = Number(orderData.taxAmount);
    
    const prismaData = {
      ...orderData
    };
    
    if (items && Array.isArray(items)) {
      prismaData.items = {
        create: items.map(item => ({
          productId: item.productId,
          quantity: Number(item.quantity),
          price: Number(item.price),
          gst: Number(item.gst || 0),
          total: Number(item.total || (item.quantity * item.price))
        }))
      };
    }
    
    return this.model.create({
      data: prismaData,
      include: {
        supplier: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });
  }

  async findMany(filters = {}) {
    return this.model.findMany({
      where: filters,
      include: {
        supplier: true,
        items: {
          include: {
            product: true
          }
        }
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
        supplier: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });
  }

  async update(id, data) {
    const { items, ...orderData } = data;
    
    if (orderData.totalAmount !== undefined) orderData.totalAmount = Number(orderData.totalAmount);
    if (orderData.taxAmount !== undefined) orderData.taxAmount = Number(orderData.taxAmount);
    
    const prismaData = {
      ...orderData
    };
    
    if (items && Array.isArray(items)) {
      await this.db.purchaseOrderItem.deleteMany({
        where: { purchaseOrderId: id }
      });
      
      prismaData.items = {
        create: items.map(item => ({
          productId: item.productId,
          quantity: Number(item.quantity),
          price: Number(item.price),
          gst: Number(item.gst || 0),
          total: Number(item.total || (item.quantity * item.price))
        }))
      };
    }
    
    return this.model.update({
      where: { id },
      data: prismaData,
      include: {
        supplier: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });
  }

  async delete(id) {
    return this.model.delete({
      where: { id },
      include: {
        supplier: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });
  }
}
