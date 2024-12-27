import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const SECRET = process.env.JWT_SECRET


export const listFriends = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, SECRET);
        const userId = decoded.id;
        const friendList = await User.findById(userId).populate('friends', "username email");
}catch (err){
    return res.status(500,"Error getting Friends list")
};
}