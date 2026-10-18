import { Router } from 'express';
import {
  getDonors, getDonorById, toggleAvailability,
  getDonorStats, getDonationHistory,
  getBloodDemand, getCompatibility,
} from '../controllers/donorController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', getDonors);
router.get('/blood-demand', getBloodDemand);
router.get('/compatibility/:bloodType', getCompatibility);
router.get('/:id', getDonorById);

// Protected routes (donor only)
router.use(protect);
router.put('/availability', authorize('donor'), toggleAvailability);
router.get('/stats/dashboard', authorize('donor'), getDonorStats);
router.get('/history/me', authorize('donor'), getDonationHistory);

export default router;