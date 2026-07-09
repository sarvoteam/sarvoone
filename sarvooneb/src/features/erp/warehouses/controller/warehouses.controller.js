import { WarehousesDTO } from '../dto/warehouses.dto.js';
import { WarehousesMapper } from '../mapper/warehouses.mapper.js';
import { WarehousesValidation } from '../validation/warehouses.validation.js';

export class WarehousesController {
  constructor(service) {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      const dto = WarehousesDTO.fromRequest(req.body);
      const validation = WarehousesValidation.validateCreate(dto);
      
      if (!validation.isValid) {
        return res.status(400).json({ success: false, errors: validation.errors });
      }

      const result = await this.service.create(dto);
      return res.status(201).json({
        success: true,
        data: WarehousesMapper.toResponse(result)
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
        data: WarehousesMapper.toResponseList(result)
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
        data: WarehousesMapper.toResponse(result)
      });
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const dto = WarehousesDTO.fromRequest(req.body);
      const result = await this.service.update(req.params.id, dto);
      return res.status(200).json({
        success: true,
        data: WarehousesMapper.toResponse(result)
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
        data: WarehousesMapper.toResponse(result)
      });
    } catch (err) {
      next(err);
    }
  };
}
