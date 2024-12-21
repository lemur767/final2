import {Server} from 'socket.io';
import User from './models/UserModel.js';


const onlineUsers = new Map();

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", 
            credentials: true,
            methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'], 
            allowedHeaders: ['Content-Type', 'Authorization']

        },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("user-online", async (userId) => {
            if(!moongoose.Types.ObjectId.isValid(userId)) {
                console.log("Invalid userId:", userId);
                return;
            }
            onlineUsers.set(userId, socket.id);

        const onlineUserDetails = [];
        for (let id of onlineUsers.keys()) {
            const user = await User.findById(id).select("username id");
            if (user) onlineUserDetails.push({ id: user.id, username: user.username });
        }

        io.emit("online-users", onlineUserDetails);
        

        socket.on("send-message", ({ to, message }) => {
            const recipientSocketId = onlineUsers.get(to);
            if (recipientSocketId) {
                io.to(recipientSocketId).emit("receive-message", message);
            }
        });
        socket.on("join-room", (roomId) => {
            socket.join(roomId); // Join the specified room
            console.log(`User ${socket.id} joined room ${roomId}`);
        });
        socket.on("send-room-message", ({ roomId, message }) => {
            io.to(roomId).emit("receive-room-message", { message, from: socket.id });
        });
    
        socket.on("disconnect", () => {
            for(let [userId, sid] of onlineUsers.entries()){
                if (sid === socket.id) {
                    onlineUsers.deleqte(userId);
                    break;
                }
            }
            const onlineUserDetails = Array.from(onlineUsers.keys()).map(async (id) => {
                return await User.findById(id).select("username id");
            });
            Promise.all(onlineUserDetails).then((results) => {
                io.emit("update-contacts", results);
            });
        });
    });
});
}

export default initSocket;
