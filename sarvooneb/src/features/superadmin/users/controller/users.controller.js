export class UsersController {
  constructor(service) {
    this.service = service;
  }

  getUsersAccounts = async (req, res, next) => {
    try {
      const data = await this.service.getUsersAccounts();
      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  updateUserRole = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { role } = req.body;
      if (!role) {
        return res.status(400).json({ success: false, message: 'Role code is required' });
      }
      const result = await this.service.updateUserRole(id, role);
      return res.status(200).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  };

  toggleUserStatus = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.service.toggleUserStatus(id);
      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  resetUserPassword = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this.service.resetUserPassword(id);
      return res.status(200).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  };

  getRolesMatrix = async (req, res, next) => {
    try {
      const data = await this.service.getRolesMatrix();
      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  toggleRolePermission = async (req, res, next) => {
    try {
      const { roleCode, permissionId } = req.body;
      if (!roleCode || !permissionId) {
        return res.status(400).json({ success: false, message: 'roleCode and permissionId are required' });
      }
      const data = await this.service.toggleRolePermission(roleCode, permissionId);
      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  getSessions = async (req, res, next) => {
    try {
      const data = await this.service.getSessions();
      return res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  };

  revokeSession = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this.service.revokeSession(id);
      return res.status(200).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  };

  revokeAllOtherSessions = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      const result = await this.service.revokeAllOtherSessions(authHeader);
      return res.status(200).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  };
}
