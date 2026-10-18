import User from '../models/User.js';
import Donor from '../models/Donor.js';
import Requester from '../models/Requester.js';
import Hospital from '../models/Hospital.js';
import bcrypt from 'bcryptjs';

// @desc    Get user profile (role-specific)
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    let user;
    switch (req.user.role) {
      case 'donor':
        user = await Donor.findById(req.user._id);
        break;
      case 'requester':
        user = await Requester.findById(req.user._id);
        break;
      case 'hospital':
        user = await Hospital.findById(req.user._id);
        break;
      default:
        user = await User.findById(req.user._id);
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ['firstName', 'lastName', 'phone', 'city', 'dateOfBirth'];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    let user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    // Update role-specific fields
    if (req.user.role === 'donor') {
      const donorAllowed = [
        'bloodType', 'weight', 'knownConditions', 'lastHealthCheck',
        'isAvailable', 'emergencyContact',
      ];
      const donorUpdates = {};
      donorAllowed.forEach((field) => {
        if (req.body[field] !== undefined) {
          donorUpdates[field] = req.body[field];
        }
      });
      if (Object.keys(donorUpdates).length > 0) {
        user = await Donor.findByIdAndUpdate(req.user._id, donorUpdates, {
          new: true,
          runValidators: true,
        });
      }
    }

    if (req.user.role === 'requester') {
      const reqAllowed = [
        'bloodType', 'knownConditions', 'allergies',
        'currentMedication', 'emergencyContact', 'preferredLanguage',
      ];
      const reqUpdates = {};
      reqAllowed.forEach((field) => {
        if (req.body[field] !== undefined) {
          reqUpdates[field] = req.body[field];
        }
      });
      if (Object.keys(reqUpdates).length > 0) {
        user = await Requester.findByIdAndUpdate(req.user._id, reqUpdates, {
          new: true,
          runValidators: true,
        });
      }
    }

    if (req.user.role === 'hospital') {
      const hospAllowed = [
        'organizationName', 'hospitalType', 'emergencyHotline',
        'mainReception', 'fax', 'address', 'website', 'bedCapacity',
        'activeStaff', 'annualPatients', 'traumaLevel',
        'departments', 'certifications', 'keyContacts',
        'bloodBank', 'registrationNumber', 'establishedYear',
      ];
      const hospUpdates = {};
      hospAllowed.forEach((field) => {
        if (req.body[field] !== undefined) {
          hospUpdates[field] = req.body[field];
        }
      });
      if (Object.keys(hospUpdates).length > 0) {
        user = await Hospital.findByIdAndUpdate(req.user._id, hospUpdates, {
          new: true,
          runValidators: true,
        });
      }
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/users/change-password
// @access  Private
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters',
      });
    }

    const user = await User.findById(req.user._id).select('+password');
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update notification preferences
// @route   PUT /api/users/notification-preferences
// @access  Private
export const updateNotificationPrefs = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { notificationPrefs: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: user.notificationPrefs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update privacy settings
// @route   PUT /api/users/privacy-settings
// @access  Private
export const updatePrivacySettings = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { privacy: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: user.privacy,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Deactivate account
// @route   PUT /api/users/deactivate
// @access  Private
export const deactivateAccount = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { isActive: false });

    res.status(200).json({
      success: true,
      message: 'Account deactivated',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete account
// @route   DELETE /api/users/account
// @access  Private
export const deleteAccount = async (req, res, next) => {
  try {
    const { confirmDelete } = req.body;
    if (confirmDelete !== 'DELETE') {
      return res.status(400).json({
        success: false,
        message: 'Please confirm deletion by sending "DELETE"',
      });
    }

    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({
      success: true,
      message: 'Account deleted permanently',
    });
  } catch (error) {
    next(error);
  }
};