import User from '../models/User.js';
import Donor from '../models/Donor.js';
import BloodRequest from '../models/BloodRequest.js';
import Donation from '../models/Donation.js';
import Hospital from '../models/Hospital.js';
import Notification from '../models/Notification.js';
import { paginate } from '../utils/helpers.js';

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private (admin)
export const getAdminStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalDonors,
      totalRequesters,
      totalHospitals,
      activeRequests,
      completedDonations,
      emergencyRequests,
      availableDonors,
    ] = await Promise.all([
      User.countDocuments({ isActive: true }),
      Donor.countDocuments({ isActive: true }),
      User.countDocuments({ role: 'requester', isActive: true }),
      Hospital.countDocuments({ isActive: true }),
      BloodRequest.countDocuments({ status: { $in: ['Pending', 'Accepted', 'In Progress'] } }),
      Donation.countDocuments({ status: 'Completed' }),
      BloodRequest.countDocuments({ urgency: 'Emergency', status: { $ne: 'Completed' } }),
      Donor.countDocuments({ isAvailable: true, isActive: true }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalDonors,
        totalRequesters,
        totalHospitals,
        activeRequests,
        completedDonations,
        emergencyRequests,
        availableDonors,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (admin)
// @route   GET /api/admin/users
// @access  Private (admin)
export const getAllUsers = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      role,
      search,
      isActive,
    } = req.query;

    const filter = {};
    if (role && role !== 'All') filter.role = role;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [users, total] = await Promise.all([
      User.find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: users,
      pagination: paginate(parseInt(page), parseInt(limit), total),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user (admin)
// @route   GET /api/admin/users/:id
// @access  Private (admin)
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user status (admin)
// @route   PUT /api/admin/users/:id/status
// @access  Private (admin)
export const updateUserStatus = async (req, res, next) => {
  try {
    const { isActive, isVerified } = req.body;
    const updates = {};

    if (isActive !== undefined) updates.isActive = isActive;
    if (isVerified !== undefined) updates.isVerified = isVerified;

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user (admin)
// @route   DELETE /api/admin/users/:id
// @access  Private (admin)
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all donors (admin)
// @route   GET /api/admin/donors
// @access  Private (admin)
export const getAllDonors = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, bloodType, city, available } = req.query;

    const filter = { role: 'donor' };
    if (bloodType && bloodType !== 'All') filter.bloodType = bloodType;
    if (city) filter.city = { $regex: city, $options: 'i' };
    if (available === 'true') filter.isAvailable = true;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [donors, total] = await Promise.all([
      Donor.find(filter)
        .select('-password')
        .sort({ totalDonations: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Donor.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: donors,
      pagination: paginate(parseInt(page), parseInt(limit), total),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all blood requests (admin)
// @route   GET /api/admin/requests
// @access  Private (admin)
export const getAllRequests = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      urgency,
      bloodType,
    } = req.query;

    const filter = {};
    if (status && status !== 'All') filter.status = status;
    if (urgency && urgency !== 'All') filter.urgency = urgency;
    if (bloodType && bloodType !== 'All') filter.bloodType = bloodType;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [requests, total] = await Promise.all([
      BloodRequest.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('createdBy', 'firstName lastName role avatar'),
      BloodRequest.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: requests,
      pagination: paginate(parseInt(page), parseInt(limit), total),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all organizations/hospitals (admin)
// @route   GET /api/admin/organizations
// @access  Private (admin)
export const getAllOrganizations = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;

    const filter = { role: 'hospital' };
    if (search) {
      filter.$or = [
        { organizationName: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orgs, total] = await Promise.all([
      Hospital.find(filter)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Hospital.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      data: orgs,
      pagination: paginate(parseInt(page), parseInt(limit), total),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get reports data (admin)
// @route   GET /api/admin/reports
// @access  Private (admin)
export const getReports = async (req, res, next) => {
  try {
    const { fromDate, toDate, period = 'This Month' } = req.query;

    // Monthly stats
    const monthlyStats = await BloodRequest.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          requests: { $sum: 1 },
          emergency: {
            $sum: { $cond: [{ $eq: ['$urgency', 'Emergency'] }, 1, 0] },
          },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 },
    ]);

    // Blood type distribution
    const bloodTypeDistribution = await BloodRequest.aggregate([
      {
        $group: {
          _id: '$bloodType',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Fulfillment rate
    const [totalRequests, completedRequests] = await Promise.all([
      BloodRequest.countDocuments(),
      BloodRequest.countDocuments({ status: 'Completed' }),
    ]);

    const fulfillmentRate = totalRequests > 0
      ? Math.round((completedRequests / totalRequests) * 100)
      : 0;

    res.status(200).json({
      success: true,
      data: {
        monthlyStats,
        bloodTypeDistribution,
        fulfillmentRate,
        totalRequests,
        completedRequests,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send notification to users (admin)
// @route   POST /api/admin/notifications
// @access  Private (admin)
export const sendNotification = async (req, res, next) => {
  try {
    const { recipients, type, title, body, link } = req.body;

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Recipients array is required',
      });
    }

    const notifications = recipients.map((recipientId) => ({
      recipient: recipientId,
      type: type || 'system',
      title,
      body,
      link,
    }));

    await Notification.insertMany(notifications);

    res.status(201).json({
      success: true,
      message: `${notifications.length} notifications sent`,
    });
  } catch (error) {
    next(error);
  }
};