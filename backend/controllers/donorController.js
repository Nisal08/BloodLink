import Donor from '../models/Donor.js';
import Donation from '../models/Donation.js';
import Notification from '../models/Notification.js';
import BloodRequest from '../models/BloodRequest.js';
import { canDonateTo, getCompatibleDonors, BLOOD_COMPAT } from '../utils/bloodCompatibility.js';
import { paginate, calculateDemandLevel } from '../utils/helpers.js';

// @desc    Get all donors (search/filter)
// @route   GET /api/donors
// @access  Public
export const getDonors = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      bloodType,
      city,
      search,
      available,
    } = req.query;

    const filter = { isActive: true, role: 'donor' };

    if (bloodType && bloodType !== 'All') {
      filter.bloodType = bloodType;
    }
    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
      ];
    }
    if (available === 'true') {
      filter.isAvailable = true;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [donors, total] = await Promise.all([
      Donor.find(filter)
        .select('-password -notificationPrefs -privacy')
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

// @desc    Get donor profile by ID (public view)
// @route   GET /api/donors/:id
// @access  Public
export const getDonorById = async (req, res, next) => {
  try {
    const donor = await Donor.findById(req.params.id)
      .select('-password -notificationPrefs -privacy -emergencyContact');

    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }

    res.status(200).json({ success: true, data: donor });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle donor availability
// @route   PUT /api/donors/availability
// @access  Private (donor)
export const toggleAvailability = async (req, res, next) => {
  try {
    const donor = await Donor.findById(req.user._id);

    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor profile not found' });
    }

    donor.isAvailable = !donor.isAvailable;
    await donor.save();

    res.status(200).json({
      success: true,
      data: { isAvailable: donor.isAvailable },
      message: donor.isAvailable ? 'You are now available for donations' : 'You are now unavailable',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get donor dashboard stats
// @route   GET /api/donors/stats/dashboard
// @access  Private (donor)
export const getDonorStats = async (req, res, next) => {
  try {
    const donor = await Donor.findById(req.user._id);
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor not found' });
    }

    // Count pending requests for this donor's blood type
    const compatibleTypes = canDonateTo(donor.bloodType);
    const pendingRequests = await BloodRequest.countDocuments({
      bloodType: { $in: compatibleTypes },
      status: 'Pending',
    });

    // Calculate cooldown progress
    let cooldownProgress = 100;
    let daysLeft = 0;
    if (donor.lastDonated && donor.nextEligibleDate) {
      const now = new Date();
      const totalCooldown = donor.cooldownDays * 24 * 60 * 60 * 1000;
      const elapsed = now - new Date(donor.lastDonated);
      cooldownProgress = Math.min(100, Math.round((elapsed / totalCooldown) * 100));
      daysLeft = Math.max(0, Math.ceil((new Date(donor.nextEligibleDate) - now) / (1000 * 60 * 60 * 24)));
    }

    res.status(200).json({
      success: true,
      data: {
        totalDonations: donor.totalDonations,
        livesSaved: donor.livesSaved,
        pendingRequests,
        nextEligibleDate: donor.nextEligibleDate,
        cooldownProgress,
        daysLeft,
        isAvailable: donor.isAvailable,
        isEligible: donor.isEligible(),
        responseRate: donor.responseRate,
        rating: donor.rating,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get donation history for donor
// @route   GET /api/donors/history
// @access  Private (donor)
export const getDonationHistory = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [donations, total] = await Promise.all([
      Donation.find({ donor: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('bloodRequest', 'bloodType urgency hospitalName'),
      Donation.countDocuments({ donor: req.user._id }),
    ]);

    // Summary stats
    const totalDonations = await Donation.countDocuments({ donor: req.user._id, status: 'Completed' });
    const totalUnits = await Donation.aggregate([
      { $match: { donor: req.user._id, status: 'Completed' } },
      { $group: { _id: null, total: { $sum: '$units' } } },
    ]);
    const certificates = await Donation.countDocuments({
      donor: req.user._id,
      hasCertificate: true,
    });

    res.status(200).json({
      success: true,
      data: donations,
      summary: {
        totalDonations,
        totalUnits: totalUnits[0]?.total || 0,
        livesSaved: totalDonations,
        certificates,
      },
      pagination: paginate(parseInt(page), parseInt(limit), total),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get blood demand data
// @route   GET /api/donors/blood-demand
// @access  Public
export const getBloodDemand = async (req, res, next) => {
  try {
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    const demandData = await Promise.all(
      bloodTypes.map(async (type) => {
        const [openRequests, availableDonors] = await Promise.all([
          BloodRequest.countDocuments({
            bloodType: type,
            status: { $in: ['Pending', 'Accepted', 'In Progress'] },
          }),
          Donor.countDocuments({
            bloodType: type,
            isAvailable: true,
            isActive: true,
          }),
        ]);

        return {
          bloodType: type,
          donors: availableDonors,
          requests: openRequests,
          level: calculateDemandLevel(openRequests, availableDonors),
        };
      })
    );

    res.status(200).json({ success: true, data: demandData });
  } catch (error) {
    next(error);
  }
};

// @desc    Get compatibility info for a blood type
// @route   GET /api/donors/compatibility/:bloodType
// @access  Public
export const getCompatibility = async (req, res, next) => {
  const { bloodType } = req.params;

  if (!BLOOD_COMPAT[bloodType]) {
    return res.status(400).json({ success: false, message: 'Invalid blood type' });
  }

  res.status(200).json({
    success: true,
    data: BLOOD_COMPAT[bloodType],
  });
};