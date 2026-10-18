import { Router } from 'express';
import {
  getHospitalStats, getActiveRequests, getHistory,
  generateReport, updateBloodBank,
} from '../controllers/hospitalController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.use(authorize('hospital'));

router.get('/stats/dashboard', getHospitalStats);
router.get('/active-requests', getActiveRequests);
router.get('/history', getHistory);
router.post('/reports/generate', generateReport);
router.put('/blood-bank', updateBloodBank);

export default router;