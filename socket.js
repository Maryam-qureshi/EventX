const ChatRoom = require("./models/chat");
const Message = require("./models/message");
const authMiddleware = require("./middleware/authMiddleware");

module.exports = (io) => {
  io.use(authMiddleware);

  io.on("connection", (socket) => {
    console.log("New WebSocket connection");

    // Join a chat room
    socket.on("joinRoom", async (chatRoomId) => {
      socket.join(chatRoomId);

      try {
        const chatRoom = await ChatRoom.findById(chatRoomId).populate(
          "messages"
        );
        if (chatRoom) {
          const messages = chatRoom.messages;
          socket.emit("loadMessages", messages);
        } else {
          socket.emit("loadMessages", []);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    });

    // Handle new messages
    socket.on("sendMessage", async (chatRoomId, messageContent) => {
      if (!socket.user) return; // Ensure user is authenticated

      try {
        const message = new Message({
          sender: socket.user._id,
          content: messageContent,
        });

        await message.save();

        const chatRoom = await ChatRoom.findById(chatRoomId);
        if (chatRoom) {
          chatRoom.messages.push(message._id);
          await chatRoom.save();

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
};
