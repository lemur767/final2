import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

//Routes
import authRoutes from './routes/auth.js';
import roomRoutes from './routes/room.js';
import chatRoutes from './routes/chat.js';
import { on } from 'events';

//Cors Options
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST','PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:5173',
  credentials: true,
 } });

app.use(cors((corsOptions)));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/chat', chatRoutes);

mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
  
const PORT = process.env.PORT
  server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
  
  
const onlineUsers = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle user coming online
  socket.on('user_online', ({  }) => {
    onlineUsers[userId] = socket.id;
    socket.emit('user-online', Object.keys(onlineUsers).map(userId => ({
      id: userId,
      username: onlineUsers[userId].username,
      email: onlineUsers[userId].email,
      imageURL: onlineUsers[userId].imageURL,
    }
    )));
      // Handle direct messaging
  socket.on('direct_message', ({ senderId, receiverId, content }) => {
    const receiverSocketId = onlineUsers[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('direct_message', { senderId, content });
    }
  });

  // Handle room messages
  socket.on('room_message', ({ roomId, senderId, content }) => {
    io.to(roomId).emit('room_message', { senderId, content });
  });

  // Join room
  socket.on('join_room', ({ roomId }) => {
    socket.join(roomId);
  });

  // Leave room
  socket.on('leave_room', ({ roomId }) => {
    socket.leave(roomId);
  });
  io.on('connection', (socket) => {
    // Notify when a user starts typing
    socket.on('typing', ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('typing', { senderId });
      }
    });
  
    // Notify when a user stops typing
    socket.on('stop_typing', ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('stop_typing', { senderId });
      }
    });
  });
  io.on('connection', (socket) => {
    socket.on('invite_to_room', ({ roomId, invitedUserIds }) => {
      invitedUserIds.forEach((userId) => {
        const userSocketId = onlineUsers[userId];
        if (userSocketId) {
          io.to(userSocketId).emit('room_invitation', { roomId });
        }
      });
    });
  });
    
  // Handle disconnections
  socket.on('disconnect', () => {
    for (const [userId, socketId] of Object.entries(onlineUsers)) {
      if (socket.id === socketId) {
        delete onlineUsers[userId];
        break;
      }
    }
    io.emit('online_users', Object.keys(onlineUsers)); // Send updated list to all clients
  });
});
});
