export class SecurityController {
  constructor(service) {
    this.service = service;
  }

  getAuditLogs = async (req, res, next) => {
    try {
      const data = await this.service.getAuditLogs();
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  getLoginHistory = async (req, res, next) => {
    try {
      const data = await this.service.getLoginHistory();
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  getApiKeys = async (req, res, next) => {
    try {
      const data = await this.service.getApiKeys();
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  generateApiKey = async (req, res, next) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ success: false, message: 'API key name is required' });
      }
      const data = await this.service.generateApiKey(name);
      return res.status(201).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  revokeApiKey = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this.service.revokeApiKey(id);
      return res.status(200).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  };
}
