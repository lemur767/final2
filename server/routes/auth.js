import express from 'express';
import { signup, login, getProfile, updateProfile } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/get-profile', authMiddleware, getProfile);
router.post('/update-profile', authMiddleware, updateProfile)

export default router;
