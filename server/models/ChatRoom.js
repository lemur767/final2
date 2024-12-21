import mongoose from 'mongoose';

const chatRoomSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    timestamp: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

export default mongoose.model('ChatRoom', chatRoomSchema);

