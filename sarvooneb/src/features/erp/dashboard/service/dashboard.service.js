export class DashboardService {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Fetches aggregate stats and formats net profit margins/stock summaries
   * @returns {Promise<Object>} Processed dashboard data
   */
  async getSummaryStats() {
    const stats = await this.repository.getDashboardSummary();
    
    // Calculate net revenue (sales total - purchases total - expenses total)
    const netRevenue = stats.sales.totalAmount - stats.purchases.totalAmount - stats.expenses.totalAmount;

    return {
      ...stats,
      financials: {
        netRevenue,
        revenueFormatted: netRevenue.toFixed(2)
      },
      timestamp: new Date().toISOString()
    };
  }
}
