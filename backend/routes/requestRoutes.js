import { Router } from 'express';
import {
  createRequest, getRequests, getRequest,
  getMyRequests, updateRequestStatus,
  acceptRequest, rejectRequest, cancelRequest,
  getMatchingRequests,
} from '../controllers/bloodRequestController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { body } from 'express-validator';

const router = Router();

// Public routes
router.get('/', getRequests);
router.get('/:id', getRequest);

// Protected routes
router.use(protect);

// Create request (requester, hospital)
router.post(
  '/',
  authorize('requester', 'hospital'),
  [
    body('bloodType').notEmpty().withMessage('Blood type is required'),
    body('hospitalName').notEmpty().withMessage('Hospital name is required'),
  ],
  validate,
  createRequest
);

// My requests
router.get('/user/my', getMyRequests);

// Matching requests for donor
router.get('/donor/matching', authorize('donor'), getMatchingRequests);

// Status updates
router.put('/:id/status', updateRequestStatus);
router.put('/:id/cancel', cancelRequest);

// Donor actions
router.post('/:id/accept', authorize('donor'), acceptRequest);
router.post('/:id/reject', authorize('donor'), rejectRequest);

export default router;