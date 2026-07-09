import { NotificationsDTO } from '../dto/notifications.dto.js';
import { NotificationsMapper } from '../mapper/notifications.mapper.js';
import { NotificationsValidation } from '../validation/notifications.validation.js';

export class NotificationsController {
  constructor(service) {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      const dto = NotificationsDTO.fromRequest(req.body);
      const validation = NotificationsValidation.validateCreate(dto);
      
      if (!validation.isValid) {
        return res.status(400).json({ success: false, errors: validation.errors });
      }

      const result = await this.service.create(dto);
      return res.status(201).json({
        success: true,
        data: NotificationsMapper.toResponse(result)
      });
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const result = await this.service.getAll(req.query);
      return res.status(200).json({
        success: true,
        data: NotificationsMapper.toResponseList(result)
      });
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const result = await this.service.getById(req.params.id);
      return res.status(200).json({
        success: true,
        data: NotificationsMapper.toResponse(result)
      });
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const dto = NotificationsDTO.fromRequest(req.body);
      const result = await this.service.update(req.params.id, dto);
      return res.status(200).json({
        success: true,
        data: NotificationsMapper.toResponse(result)
      });
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      const result = await this.service.delete(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'Deleted successfully',
        data: NotificationsMapper.toResponse(result)
      });
    } catch (err) {
      next(err);
    }
  };
}
