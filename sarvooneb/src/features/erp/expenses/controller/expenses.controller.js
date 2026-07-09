import { ExpensesDTO } from '../dto/expenses.dto.js';
import { ExpensesMapper } from '../mapper/expenses.mapper.js';
import { ExpensesValidation } from '../validation/expenses.validation.js';

export class ExpensesController {
  constructor(service) {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      const dto = ExpensesDTO.fromRequest(req.body);
      const validation = ExpensesValidation.validateCreate(dto);
      
      if (!validation.isValid) {
        return res.status(400).json({ success: false, errors: validation.errors });
      }

      const result = await this.service.create(dto);
      return res.status(201).json({
        success: true,
        data: ExpensesMapper.toResponse(result)
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
        data: ExpensesMapper.toResponseList(result)
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
        data: ExpensesMapper.toResponse(result)
      });
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      const dto = ExpensesDTO.fromRequest(req.body);
      const result = await this.service.update(req.params.id, dto);
      return res.status(200).json({
        success: true,
        data: ExpensesMapper.toResponse(result)
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
        data: ExpensesMapper.toResponse(result)
      });
    } catch (err) {
      next(err);
    }
  };
}
