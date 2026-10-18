import User from '../models/User.js';
import Donor from '../models/Donor.js';
import Requester from '../models/Requester.js';
import Hospital from '../models/Hospital.js';
import { body } from 'express-validator';

// Validation rules
export const registerValidation = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('role')
    .isIn(['donor', 'requester', 'hospital'])
    .withMessage('Role must be donor, requester, or hospital'),
];

export const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role, bloodType, organizationName, phone, city } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    let user;

    const baseData = { firstName, lastName, email, password, phone, city };

    switch (role) {
      case 'donor':
        if (!bloodType) {
          return res.status(400).json({
            success: false,
            message: 'Blood type is required for donors',
          });
        }
        user = await Donor.create({
          ...baseData,
          bloodType,
        });
        break;

      case 'requester':
        user = await Requester.create({
          ...baseData,
        });
        break;

      case 'hospital':
        if (!organizationName) {
          return res.status(400).json({
            success: false,
            message: 'Organization name is required for hospitals',
          });
        }
        user = await Hospital.create({
          ...baseData,
          organizationName,
        });
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid role',
        });
    }

    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if role matches
    if (role && user.role !== role) {
      return res.status(401).json({
        success: false,
        message: `No ${role} account found with this email`,
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user (client-side)
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

// Helper: send token response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token,
    data: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isVerified: user.isVerified,
    },
  });
};