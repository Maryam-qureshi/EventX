const express = require("express");
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");
const socketIo = require("socket.io");
const { connectMongoDb } = require("./connection/config");
const userRoutes = require("./routes/userRoute");
const eventRoutes = require("./routes/eventRoute");
const staticRoute = require("./routes/staticRouter");
const plannerRoutes = require("./routes/plannerRoute");
const taskRoutes = require("./routes/taskRoute");
const chatRoutes = require("./routes/chatRoute");
const { restrictToLoggedinUsersOnly } = require("./middleware/auth");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 8000;

// Connect Database
connectMongoDb("mongodb://127.0.0.1:27017/EventX");

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.headers.authorization; // Extract token from headers
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    const user = await verifyToken(token); // Verify the token
    if (!user) {
      return next(new Error("Authentication error: Invalid token"));
    }

    socket.user = user; // Attach user information to the socket
    next(); // Proceed with the connection
  } catch (error) {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log("New WebSocket connection");

  // Join a chat room
  socket.on("joinRoom", async (chatRoomId) => {
    socket.join(chatRoomId);

    // Fetch and emit existing messages
    try {
      const chatRoom = await ChatRoom.findById(chatRoomId).populate("messages");
      if (chatRoom) {
        socket.emit("loadMessages", chatRoom.messages);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  });

  // Handle new messages
  socket.on("sendMessage", async (chatRoomId, messageContent) => {
    if (!socket.user) return; // Ensure user is authenticated

    try {
      // Create the message
      const message = new Message({
        sender: socket.user._id,
        content: messageContent,
      });

      // Save the message to the database
      await message.save();

      // Find the chat room and add the message to it
      const chatRoom = await ChatRoom.findById(chatRoomId);
      if (chatRoom) {
        chatRoom.messages.push(message._id);
        await chatRoom.save();

        // Emit the new message to everyone in the room
        io.to(chatRoomId).emit("newMessage", message);
      } else {
        console.error("Chat room not found:", chatRoomId);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });
});
// Routes
app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/", staticRoute);
app.use("/api/planners", plannerRoutes);
app.use("/api/tasks", restrictToLoggedinUsersOnly, taskRoutes);
app.use("/api/chat", chatRoutes);

// Initialize WebSocket
require("./socket")(io);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
