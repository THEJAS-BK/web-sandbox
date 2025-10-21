const express = require("express");
const app = express();
const cors = require("cors");
const { createServer } = require("node:http");
const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // your React app URL
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use(cors());

app.get("/api/index", (req, res) => {
  res.json({ message: "This is a message from backend" });
});
let bookedSeats = [];
io.on("connection", (socket) => {
  io.emit("booked-seats", bookedSeats);
  socket.on("seat-idx", (idx) => {
    bookedSeats.push(idx);
    io.emit("booked-seats", bookedSeats);
  });
});

server.listen(8000, () => {
  console.log("server started");
});
