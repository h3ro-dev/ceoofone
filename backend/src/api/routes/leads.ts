import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { asyncHandler } from '@/utils/asyncHandler';

const router = Router();

// Lead validation rules
const leadValidationRules = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name must be less than 100 characters'),
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message must be less than 1000 characters'),
];

/**
 * @route   POST /api/leads
 * @desc    Create a new lead
 * @access  Public
 */
router.post(
  '/',
  leadValidationRules,
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, name, company, phone, message } = req.body;

    // TODO: Save to Supabase
    // TODO: Send to CRM
    // TODO: Send confirmation email

    return res.status(201).json({
      success: true,
      message: 'Lead captured successfully',
      data: {
        id: Date.now().toString(), // Temporary ID
        email,
        name,
        company,
        createdAt: new Date().toISOString(),
      },
    });
  })
);

/**
 * @route   GET /api/leads/status
 * @desc    Check lead capture system status
 * @access  Public
 */
router.get('/status', (req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'operational',
    features: {
      emailValidation: true,
      crmIntegration: false, // TODO: Implement
      emailNotifications: false, // TODO: Implement
      duplicateDetection: false, // TODO: Implement
    },
    timestamp: new Date().toISOString(),
  });
});

export { router as leadsRouter };