import prisma from '../../../../config/prisma.js';

export class SalesRepository {
  constructor(db = prisma) {
    this.db = db;
    this.model = db['salesOrder'];
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

    const prismaOrderData = {
      ...orderData,
      branchId: activeBranchId,
    };

    if (items && Array.isArray(items)) {
      prismaOrderData.items = {
        create: items.map(item => ({
          productId: item.productId,
          quantity: Number(item.quantity),
          price: Number(item.price),
          gst: Number(item.gst || 0),
          total: Number(item.total)
        }))
      };
    }

    return this.db.$transaction(async (tx) => {
      const createdOrder = await tx.salesOrder.create({
        data: prismaOrderData,
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });

      if (items && Array.isArray(items)) {
        for (const item of items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              currentStock: {
                decrement: Number(item.quantity)
              }
            }
          });
        }
      }

      return createdOrder;
    });
  }

  async findMany(filters = {}) {
    return this.model.findMany({
      where: filters,
      include: {
        customer: true,
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
        customer: true,
        items: {
          include: {
            product: true
          }
        }
      }
    });
  }

  async update(id, data) {
    return this.model.update({
      where: { id },
      data
    });
  }

  async delete(id) {
    return this.model.delete({ where: { id } });
  }
}
