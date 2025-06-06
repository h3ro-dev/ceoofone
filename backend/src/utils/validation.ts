import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/middleware/errorHandler';

/**
 * Middleware to handle validation results
 */
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.type === 'field' ? error.path : error.type,
      message: error.msg,
      value: error.type === 'field' ? error.value : undefined,
    }));
    
    throw new AppError(`Validation failed: ${errorMessages.map(e => e.message).join(', ')}`, 400);
  }
  
  next();
};

/**
 * Common validation rules
 */
export const validationRules = {
  email: () => body('email').isEmail().normalizeEmail(),
  password: () => body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  required: (field: string) => body(field).notEmpty().withMessage(`${field} is required`),
  objectId: (field: string) => param(field).isMongoId().withMessage(`${field} must be a valid ID`),
  uuid: (field: string) => param(field).isUUID().withMessage(`${field} must be a valid UUID`),
  pagination: () => [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  ],
  search: () => query('q').optional().isString().trim().isLength({ min: 1, max: 100 }),
};

/**
 * Validate request data
 */
export const validate = (rules: any[]) => {
  return [...rules, handleValidationErrors];
};