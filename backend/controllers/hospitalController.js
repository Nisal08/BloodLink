import Hospital from '../models/Hospital.js';
import BloodRequest from '../models/BloodRequest.js';
import Donation from '../models/Donation.js';
import Donor from '../models/Donor.js';
import { paginate } from '../utils/helpers.js';

// @desc    Get hospital dashboard stats
// @route   GET /api/hospitals/stats/dashboard
// @access  Private (hospital)
export const getHospitalStats = async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.user._id);
    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    const [
      activeRequests,
      donorsContacted,
      fulfilledThisMonth,
      emergencyAlerts,
    ] = await Promise.all([
      BloodRequest.countDocuments({
        createdBy: req.user._id,
        status: { $in: ['Pending', 'Accepted', 'In Progress'] },
      }),
      BloodRequest.aggregate([
        { $match: { createdBy: req.user._id } },
        { $project: { donorCount: { $size: '$matchedDonors' } } },
        { $group: { _id: null, total: { $sum: '$donorCount' } } },
      ]),
      BloodRequest.countDocuments({
        createdBy: req.user._id,
        status: 'Completed',
        completedAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      }),
      BloodRequest.countDocuments({
        createdBy: req.user._id,
        urgency: 'Emergency',
        status: { $ne: 'Completed' },
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        activeRequests,
        donorsContacted: donorsContacted[0]?.total || 0,
        fulfilledThisMonth,
        emergencyAlerts,
        bloodBank: hospital.bloodBank,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get hospital active requests
// @route   GET /api/hospitals/active-requests
// @access  Private (hospital)
export const getActiveRequests = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = {
      createdBy: req.user._id,
      status: { $in: ['Pending', 'Accepted', 'In Progress'] },
    };

    if (status && status !== 'All') {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [requests, total] = await Promise.all([
      BloodRequest.find(filter)
        .sort({ urgency: 1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('matchedDonors.donor', 'firstName lastName avatar bloodType city phone')
        .populate('fulfilledBy', 'firstName lastName avatar bloodType'),
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

// @desc    Get hospital request history
// @route   GET /api/hospitals/history
// @access  Private (hospital)
export const getHistory = async (req, res, next) => {
  try {
    const { period, page = 1, limit = 20 } = req.query;

    let dateFilter = {};
    const now = new Date();

    switch (period) {
      case 'Today':
        dateFilter = { $gte: new Date(now.setHours(0, 0, 0, 0)) };
        break;
      case 'This Week':
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        dateFilter = { $gte: startOfWeek };
        break;
      case 'This Month':
        dateFilter = { $gte: new Date(now.getFullYear(), now.getMonth(), 1) };
        break;
      case 'This Year':
        dateFilter = { $gte: new Date(now.getFullYear(), 0, 1) };
        break;
      default:
        dateFilter = {};
    }

    const filter = { createdBy: req.user._id };
    if (Object.keys(dateFilter).length > 0) {
      filter.createdAt = dateFilter;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [requests, total] = await Promise.all([
      BloodRequest.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('fulfilledBy', 'firstName lastName avatar bloodType'),
      BloodRequest.countDocuments(filter),
    ]);

    // Summary stats
    const [completed, emergency] = await Promise.all([
      BloodRequest.countDocuments({ ...filter, status: 'Completed' }),
      BloodRequest.countDocuments({ ...filter, urgency: 'Emergency' }),
    ]);

    res.status(200).json({
      success: true,
      data: requests,
      summary: {
        total,
        completed,
        emergency,
        fulfilled: completed,
      },
      pagination: paginate(parseInt(page), parseInt(limit), total),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate hospital report
// @route   POST /api/hospitals/reports/generate
// @access  Private (hospital)
export const generateReport = async (req, res, next) => {
  try {
    const { fromDate, toDate, sections } = req.body;

    const startDate = fromDate ? new Date(fromDate) : new Date(new Date().setMonth(new Date().getMonth() - 1));
    const endDate = toDate ? new Date(toDate) : new Date();

    const filter = {
      createdBy: req.user._id,
      createdAt: { $gte: startDate, $lte: endDate },
    };

    // Summary
    const [totalRequests, completedRequests, emergencyCases] = await Promise.all([
      BloodRequest.countDocuments(filter),
      BloodRequest.countDocuments({ ...filter, status: 'Completed' }),
      BloodRequest.countDocuments({ ...filter, urgency: 'Emergency' }),
    ]);

    const fulfillmentRate = totalRequests > 0
      ? Math.round((completedRequests / totalRequests) * 100)
      : 0;

    // Donors
    const donorStats = await Donation.aggregate([
      {
        $match: {
          recipient: req.user._id,
          completedDate: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: '$donor',
          donations: { $sum: 1 },
          totalUnits: { $sum: '$units' },
        },
      },
      { $sort: { donations: -1 } },
      { $limit: 20 },
    ]);

    // Day by day breakdown
    const dayByDay = await BloodRequest.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          requests: { $sum: 1 },
          donations: {
            $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] },
          },
          emergency: {
            $sum: { $cond: [{ $eq: ['$urgency', 'Emergency'] }, 1, 0] },
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Blood type breakdown
    const bloodTypeBreakdown = await BloodRequest.aggregate([
      { $match: filter },
      {
        $group: {
          _id: '$bloodType',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        reportId: `RPT-${Date.now()}`,
        generatedAt: new Date(),
        dateRange: { from: startDate, to: endDate },
        summary: {
          totalRequests,
          donationsMade: completedRequests,
          emergencyCases,
          fulfillmentRate,
        },
        donorStats,
        dayByDay,
        bloodTypeBreakdown,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update blood bank inventory
// @route   PUT /api/hospitals/blood-bank
// @access  Private (hospital)
export const updateBloodBank = async (req, res, next) => {
  try {
    const { inventory, settings } = req.body;

    const updates = {};
    if (inventory) updates['bloodBank.inventory'] = inventory;
    if (settings) {
      if (settings.totalCapacity) updates['bloodBank.totalCapacity'] = settings.totalCapacity;
      if (settings.lowStockThreshold) updates['bloodBank.lowStockThreshold'] = settings.lowStockThreshold;
      if (settings.criticalThreshold) updates['bloodBank.criticalThreshold'] = settings.criticalThreshold;
    }

    const hospital = await Hospital.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: hospital.bloodBank,
    });
  } catch (error) {
    next(error);
  }
};