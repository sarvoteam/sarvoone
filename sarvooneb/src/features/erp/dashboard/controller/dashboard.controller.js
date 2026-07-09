export class DashboardController {
  constructor(service) {
    this.service = service;
  }

  /**
   * GET /api/erp/dashboard
   * Returns complete dashboard metrics
   */
  getSummary = async (req, res, next) => {
    try {
      const data = await this.service.getSummaryStats();
      return res.status(200).json({
        success: true,
        data
      });
    } catch (err) {
      next(err);
    }
  };
}
