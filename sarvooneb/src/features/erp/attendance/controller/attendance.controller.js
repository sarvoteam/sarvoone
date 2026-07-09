import { AttendanceDTO } from '../dto/attendance.dto.js';
import { AttendanceMapper } from '../mapper/attendance.mapper.js';
import { AttendanceValidation } from '../validation/attendance.validation.js';

export class AttendanceController {
  constructor(service) {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      const dto = AttendanceDTO.fromRequest(req.body);
      const validation = AttendanceValidation.validateCreate(dto);
      
      if (!validation.isValid) {
        return res.status(400).json({ success: false, errors: validation.errors });
      }

      const result = await this.service.create(dto);
      return res.status(201).json({
        success: true,
        data: AttendanceMapper.toResponse(result)
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
        data: AttendanceMapper.toResponseList(result)
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
        data: AttendanceMapper.toResponse(result)
      });
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const dto = AttendanceDTO.fromRequest(req.body);
      const result = await this.service.update(req.params.id, dto);
      return res.status(200).json({
        success: true,
        data: AttendanceMapper.toResponse(result)
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
        data: AttendanceMapper.toResponse(result)
      });
    } catch (err) {
      next(err);
    }
  };
}
