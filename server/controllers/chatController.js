import ChatRoom from '../models/ChatRoom.js';
import Message from '../models/Message.js';

// Get Direct Messages between two users
export const getDirectMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId }
      ]
    }).sort({ timestamp: 1 }); // Sort by oldest first

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Messages in a Chat Room
export const getRoomMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await ChatRoom.findById(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    res.json(room.messages); // Messages are stored in the room model
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send a Message (direct or to a room)
export const sendMessage = async (req, res) => {
  try {
    const { type, content, receiverId, roomId } = req.body;

    // Handle direct messages
    if (type === 'direct') {
      const newMessage = new Message({
        sender: req.user.id,
        receiver: receiverId,
        text: content
      });
      await newMessage.save();

      res.status(201).json({ message: 'Direct message sent', newMessage });
    }

    // Handle room messages
    else if (type === 'room') {
      const room = await ChatRoom.findById(roomId);
      if (!room) return res.status(404).json({ error: 'Room not found' });

      const newRoomMessage = {
        sender: req.user.id,
        text: content,
        timestamp: new Date()
      };

      room.messages.push(newRoomMessage);
      await room.save();

      res.status(201).json({ message: 'Room message sent', newRoomMessage });
    }

    // Invalid message type
    else {
      res.status(400).json({ error: 'Invalid message type' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const inviteUsers = async (req, res) => {
  try {
    const { roomId, userIds } = req.body; // `userIds` is an array of user IDs
    const room = await ChatRoom.findById(roomId);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Ensure only the creator can invite users
    if (room.creator.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to invite users' });
    }

    // Add users to the room, avoiding duplicates
    room.members = [...new Set([...room.members, ...userIds])];
    await room.save();

    res.status(200).json({ message: 'Users invited successfully', room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
