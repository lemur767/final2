import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/list', authMiddleware, async (req, res) => {
  try {
   const user = req.user;
   if(!user) {
    return res.status(401).json({ message: 'Unauthorized' });
   }
   else{
    const friends = await user.populate('friends');
    res.json(friends.friends);
   }   
  }catch(err){
    res.status(500).json({ message: 'Internal server error' });
  };
});

export default router;