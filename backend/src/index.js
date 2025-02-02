import { Server } from "socket.io";
import http from "http";
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("joinWorkspace", (workspaceId) => {
    if (workspaceId) {
      socket.join(workspaceId);
      console.log(`Client ${socket.id} joined workspace ${workspaceId}`);
    } else {
      console.error("workspaceId is null or undefined");
    }
  });

  socket.on("leaveWorkspace", (workspaceId) => {
    if (workspaceId) {
      socket.leave(workspaceId);
      console.log(`Client ${socket.id} left workspace ${workspaceId}`);
    } else {
      console.error("workspaceId is null or undefined");
    }
  });

  socket.on("codeChange", (workspaceId, fileId, code) => {
    if (workspaceId && fileId && code !== undefined) {
      console.log(`Code change in workspace ${workspaceId}, file ${fileId}: ${code}`);
      socket.to(workspaceId).emit("codeUpdate", fileId, code);
    } else {
      console.error("workspaceId, fileId, or code is null or undefined");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
  });
});

console.log(process.env.MONGODB_URI);
connectDB().then(() => {
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});