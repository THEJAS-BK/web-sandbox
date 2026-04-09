import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for local development
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket: Socket) => {
  console.log(`User connected: ${socket.id}`);

  // Simple WebRTC signaling logic
  // Since it's only two people for now, we can just broadcast to others
  socket.on('offer', (payload) => {
    socket.broadcast.emit('offer', payload);
  });

  socket.on('answer', (payload) => {
    socket.broadcast.emit('answer', payload);
  });

  socket.on('ice-candidate', (payload) => {
    socket.broadcast.emit('ice-candidate', payload);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Signaling server listening on http://localhost:${PORT}`);
});
