import BloodRequest from '../models/BloodRequest.js';
import Donor from '../models/Donor.js';
import Donation from '../models/Donation.js';
import Notification from '../models/Notification.js';
import { getCompatibleDonors } from '../utils/bloodCompatibility.js';
import { paginate } from '../utils/helpers.js';

// @desc    Create a new blood request
// @route   POST /api/requests
// @access  Private (requester, hospital)
export const createRequest = async (req, res, next) => {
  try {
    const {
      bloodType, units, urgency, hospitalName, hospitalCity,
      patientInfo, contact, clinicalNotes, requiredBy, note,
      department, isEmergency,
    } = req.body;

    if (!bloodType) {
      return res.status(400).json({ success: false, message: 'Blood type is required' });
    }
    if (!hospitalName) {
      return res.status(400).json({ success: false, message: 'Hospital name is required' });
    }

    // For hospital role, use their own info
    const finalHospitalName = req.user.role === 'hospital'
      ? (hospitalName || req.user.organizationName)
      : hospitalName;

    const bloodRequest = await BloodRequest.create({
      createdBy: req.user._id,
      creatorRole: req.user.role,
      bloodType,
      units: units || 1,
      urgency: isEmergency ? 'Emergency' : (urgency || 'Normal'),
      hospitalName: finalHospitalName,
      hospitalCity: hospitalCity || req.user.city,
      patientInfo: patientInfo || {},
      contact,
      clinicalNotes,
      requiredBy,
      note,
    });

    // If it's an emergency, find compatible donors and notify them
    if (bloodRequest.urgency === 'Emergency') {
      const compatibleTypes = getCompatibleDonors(bloodType);
      const nearbyDonors = await Donor.find({
        bloodType: { $in: compatibleTypes },
        isAvailable: true,
        isActive: true,
      }).limit(50);

      // Create notifications for compatible donors
      const notifications = nearbyDonors.map((donor) => ({
        recipient: donor._id,
        type: 'emergency',
        title: 'Emergency Blood Request',
        body: `Urgent: ${bloodType} blood needed (${units} units) at ${finalHospitalName}.`,
        link: '/dashboard/donor/requests',
        relatedRequest: bloodRequest._id,
      }));

      if (notifications.length > 0) {
        await Notification.insertMany(notifications);
      }

      // Update hospital stats
      if (req.user.role === 'hospital') {
        await Donor.findByIdAndUpdate(req.user._id, {
          $inc: { emergencyAlerts: 1 },
        });
      }
    }

    // Update requester stats
    if (req.user.role === 'requester') {
      const DonorModel = await import('../models/Requester.js');
      await DonorModel.default.findByIdAndUpdate(req.user._id, {
        $inc: { totalRequests: 1, activeRequests: 1 },
      });
    }

    res.status(201).json({ success: true, data: bloodRequest });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all blood requests (public board)
// @route   GET /api/requests
// @access  Public
export const getRequests = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      urgency,
      bloodType,
      city,
      sortBy = 'createdAt',
      order = 'desc',
    } = req.query;

    const filter = {};

    if (status && status !== 'All') filter.status = status;
    if (urgency && urgency !== 'All') filter.urgency = urgency;
    if (bloodType && bloodType !== 'All') filter.bloodType = bloodType;
    if (city) filter.hospitalCity = { $regex: city, $options: 'i' };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [requests, total] = await Promise.all([
      BloodRequest.find(filter)
        .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('createdBy', 'firstName lastName avatar role'),
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

// @desc    Get single blood request
// @route   GET /api/requests/:id
// @access  Public
export const getRequest = async (req, res, next) => {
  try {
    const request = await BloodRequest.findById(req.params.id)
      .populate('createdBy', 'firstName lastName avatar role email phone')
      .populate('matchedDonors.donor', 'firstName lastName avatar bloodType city phone')
      .populate('fulfilledBy', 'firstName lastName avatar bloodType');

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    next(error);
  }
};

// @desc    Get my requests (created by current user)
// @route   GET /api/requests/my
// @access  Private
export const getMyRequests = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = { createdBy: req.user._id };
    if (status && status !== 'All') filter.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [requests, total] = await Promise.all([
      BloodRequest.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
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

// @desc    Update blood request status
// @route   PUT /api/requests/:id/status
// @access  Private
export const updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Accepted', 'In Progress', 'Completed', 'Rejected', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const request = await BloodRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Status flow validation
    const validTransitions = {
      Pending: ['Accepted', 'Rejected', 'Cancelled'],
      Accepted: ['In Progress', 'Cancelled'],
      'In Progress': ['Completed'],
      Completed: [],
      Rejected: [],
      Cancelled: [],
    };

    if (!validTransitions[request.status]?.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot transition from '${request.status}' to '${status}'`,
      });
    }

    request.status = status;

    if (status === 'Completed') {
      request.completedAt = new Date();

      // Create donation record
      if (request.fulfilledBy) {
        await Donation.create({
          donor: request.fulfilledBy,
          bloodRequest: request._id,
          recipient: request.createdBy,
          recipientRole: request.creatorRole,
          bloodType: request.bloodType,
          units: request.units,
          hospitalName: request.hospitalName,
          hospitalCity: request.hospitalCity,
          patientName: request.patientInfo?.name || 'Anonymous',
          status: 'Completed',
          completedDate: new Date(),
          hasCertificate: true,
        });

        // Update donor stats
        await Donor.findByIdAndUpdate(request.fulfilledBy, {
          $inc: { totalDonations: 1, livesSaved: 1 },
          lastDonated: new Date(),
        });
      }
    }

    await request.save();

    // Notify the request creator
    const statusMessages = {
      Accepted: 'Your blood request has been accepted by a donor.',
      'In Progress': 'Your blood request is now in progress.',
      Completed: 'Your blood request has been fulfilled!',
      Rejected: 'Your blood request was declined.',
      Cancelled: 'Your blood request has been cancelled.',
    };

    if (statusMessages[status]) {
      await Notification.create({
        recipient: request.createdBy,
        type: status === 'Completed' ? 'request_completed' : 'request_accepted',
        title: `Request ${status}`,
        body: statusMessages[status],
        relatedRequest: request._id,
      });
    }

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    next(error);
  }
};

// @desc    Accept a blood request (as a donor)
// @route   POST /api/requests/:id/accept
// @access  Private (donor)
export const acceptRequest = async (req, res, next) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    if (request.status === 'Completed' || request.status === 'Cancelled' || request.status === 'Rejected') {
      return res.status(400).json({ success: false, message: 'This request is no longer active' });
    }

    // Check if donor already matched
    const alreadyMatched = request.matchedDonors.some(
      (m) => m.donor.toString() === req.user._id.toString()
    );
    if (alreadyMatched) {
      return res.status(400).json({ success: false, message: 'You have already responded to this request' });
    }

    // Check donor eligibility
    const donor = await Donor.findById(req.user._id);
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor profile not found' });
    }

    if (!donor.isAvailable) {
      return res.status(400).json({ success: false, message: 'You are currently marked as unavailable' });
    }

    if (!donor.isEligible()) {
      return res.status(400).json({
        success: false,
        message: `You are not yet eligible to donate. Next eligible date: ${donor.nextEligibleDate?.toDateString()}`,
      });
    }

    // Add donor to matched list
    request.matchedDonors.push({
      donor: req.user._id,
      status: 'accepted',
      respondedAt: new Date(),
    });

    // Update request status and fulfilledBy
    request.status = 'Accepted';
    request.fulfilledBy = req.user._id;
    await request.save();

    // Notify the request creator
    await Notification.create({
      recipient: request.createdBy,
      type: 'donor_found',
      title: 'Donor Match Found!',
      body: `${donor.firstName} ${donor.lastName} (${donor.bloodType}) has accepted your request at ${request.hospitalName}.`,
      relatedRequest: request._id,
      relatedUser: req.user._id,
    });

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    next(error);
  }
};

// @desc    Reject a blood request (as a donor)
// @route   POST /api/requests/:id/reject
// @access  Private (donor)
export const rejectRequest = async (req, res, next) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    request.matchedDonors.push({
      donor: req.user._id,
      status: 'rejected',
      respondedAt: new Date(),
    });

    await request.save();

    res.status(200).json({ success: true, message: 'Request declined', data: request });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel a blood request (creator only)
// @route   PUT /api/requests/:id/cancel
// @access  Private
export const cancelRequest = async (req, res, next) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    if (request.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this request' });
    }

    if (!['Pending', 'Accepted'].includes(request.status)) {
      return res.status(400).json({
        success: false,
        message: 'Can only cancel Pending or Accepted requests',
      });
    }

    request.status = 'Cancelled';
    await request.save();

    // Update requester active count
    if (request.creatorRole === 'requester') {
      const Requester = (await import('../models/Requester.js')).default;
      await Requester.findByIdAndUpdate(request.createdBy, {
        $inc: { activeRequests: -1 },
      });
    }

    res.status(200).json({ success: true, data: request });
  } catch (error) {
    next(error);
  }
};

// @desc    Get requests matching donor's blood type
// @route   GET /api/requests/matching
// @access  Private (donor)
export const getMatchingRequests = async (req, res, next) => {
  try {
    const donor = await Donor.findById(req.user._id);
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor profile not found' });
    }

    // Get compatible blood types (who this donor can donate to)
    const { canDonateTo } = await import('../utils/bloodCompatibility.js');
    const compatibleTypes = canDonateTo(donor.bloodType);

    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = {
      bloodType: { $in: compatibleTypes },
      status: { $in: ['Pending', 'Accepted', 'In Progress'] },
    };

    const [requests, total] = await Promise.all([
      BloodRequest.find(filter)
        .sort({ urgency: 1, createdAt: -1 }) // Emergency first
        .skip(skip)
        .limit(parseInt(limit))
        .populate('createdBy', 'firstName lastName avatar role'),
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