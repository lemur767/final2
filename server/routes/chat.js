import express from 'express';
import { getDirectMessages, getRoomMessages, sendMessage } from '../controllers/chatController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get Direct Messages between two users
router.get('/direct/:userId', authMiddleware, getDirectMessages);

// Get Messages in a Chat Room
router.get('/room/:roomId', authMiddleware, getRoomMessages);

// Send a Message (direct or room)
router.post('/send', authMiddleware, sendMessage);

export default router;
