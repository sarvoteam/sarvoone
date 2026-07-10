export class DashboardService {
  constructor(repository) {
    this.repository = repository;
  }

  async getDashboard() {
    const [businessesCount, branchesCount] = await Promise.all([
      this.repository.countBusinesses(),
      this.repository.countBranches()
    ]);

    const pricePerBusiness = 3999;
    const dynamicMRR = businessesCount * pricePerBusiness;
    const supportResolutionRate = 98.4;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const trend = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = months[d.getMonth()];
      const endOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
      const count = await this.repository.countBusinessesLte(endOfMonth);

      trend.push({
        month: monthName,
        revenue: count * pricePerBusiness,
        businesses: count
      });
    }

    return {
      mrr: dynamicMRR,
      businesses: businessesCount,
      branches: branchesCount,
      supportRate: supportResolutionRate,
      trend
    };
  }
}
