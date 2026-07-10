export class DashboardController {
  constructor(service) {
    this.service = service;
  }

  getDashboard = async (req, res, next) => {
    try {
      const data = await this.service.getDashboard();
      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };
}
