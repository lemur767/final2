import ChatRoom from '../models/ChatRoom.js';

// Create Chat Room
export const createRoom = async (req, res) => {
  try {
    const { name, creator, members} = req.body;
    const room = new ChatRoom({ name, creator, members });
    await room.save();

    res.status(201).json({ message: 'Room created successfully', room });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Chat Room
export const deleteRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await ChatRoom.findById(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    // Check permissions
    if (room.creator.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this room' });
    }

    await room.deleteOne();
    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const joinRoom = async (req, res) => {
  try {
    const { roomId } = req.body;
    const userId = req.user.id;

    // Find the room
    const room = await ChatRoom.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Check if user is already a member
    if (!room.members.includes(userId)) {
      room.members.push(userId);
      await room.save();
    }

    res.status(200).json({ message: "Joined room successfully", room });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await ChatRoom.find().select('creator').populate('members', 'username');
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
