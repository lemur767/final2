import express from 'express';
import { createRoom, deleteRoom, getAllRooms } from '../controllers/roomController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createRoom);
router.delete('/delete/:roomId', authMiddleware, deleteRoom);
router.get('/', authMiddleware, getAllRooms);

export default router;
