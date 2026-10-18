import { Router } from 'express';
import {
  getAdminStats, getAllUsers, getUserById,
  updateUserStatus, deleteUser, getAllDonors,
  getAllRequests, getAllOrganizations, getReports,
  sendNotification,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id/status', updateUserStatus);
router.delete('/users/:id', deleteUser);
router.get('/donors', getAllDonors);
router.get('/requests', getAllRequests);
router.get('/organizations', getAllOrganizations);
router.get('/reports', getReports);
router.post('/notifications', sendNotification);

export default router;