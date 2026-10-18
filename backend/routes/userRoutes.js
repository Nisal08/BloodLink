import { Router } from 'express';
import {
  getProfile, updateProfile, changePassword,
  updateNotificationPrefs, updatePrivacySettings,
  deactivateAccount, deleteAccount,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.use(protect); // All routes require auth

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);
router.put('/notification-preferences', updateNotificationPrefs);
router.put('/privacy-settings', updatePrivacySettings);
router.put('/deactivate', deactivateAccount);
router.delete('/account', deleteAccount);

export default router;