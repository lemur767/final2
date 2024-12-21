import { io } from "socket.io-client";

export const socket = io('http://localhost:3001', {
    withCredentials: true,
});

socket.on('connect', () => {
    console.log('Connected to the server');
});
