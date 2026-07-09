import prisma from '../../../../config/prisma.js';

export class DashboardRepository {
  constructor(db = prisma) {
    this.db = db;
  }

  /**
   * Retrieves high-level count and aggregate values for Dashboard stats
   * @returns {Promise<Object>} Summary statistics
   */
  async getDashboardSummary() {
    const [
      salesCount,
      salesSum,
      purchaseCount,
      purchaseSum,
      expenseSum,
      customerCount,
      supplierCount,
      productCount,
      employeeCount
    ] = await Promise.all([
      // 1. Sales count
      this.db.salesOrder.count(),
      // 2. Sales amount sum
      this.db.salesOrder.aggregate({
        _sum: { totalAmount: true }
      }),
      // 3. Purchase count
      this.db.purchaseOrder.count(),
      // 4. Purchase amount sum
      this.db.purchaseOrder.aggregate({
        _sum: { totalAmount: true }
      }),
      // 5. Expense sum
      this.db.expense.aggregate({
        _sum: { amount: true }
      }),
      // 6. Customers count
      this.db.customer.count(),
      // 7. Suppliers count
      this.db.supplier.count(),
      // 8. Products count
      this.db.product.count(),
      // 9. Employees count
      this.db.employee.count()
    ]);

    return {
      sales: {
        count: salesCount,
        totalAmount: salesSum._sum.totalAmount || 0
      },
      purchases: {
        count: purchaseCount,
        totalAmount: purchaseSum._sum.totalAmount || 0
      },
      expenses: {
        totalAmount: expenseSum._sum.amount || 0
      },
      counters: {
        customers: customerCount,
        suppliers: supplierCount,
        products: productCount,
        employees: employeeCount
      }
    };
  }
}
