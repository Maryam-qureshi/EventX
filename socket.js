const ChatRoom = require("./models/chat");
const Message = require("./models/message");
const authMiddleware = require("./middleware/auth");

module.exports = (io) => {
  io.use(authMiddleware);

  io.on("connection", (socket) => {
    console.log("New WebSocket connection");

    socket.on("joinRoom", async (chatRoomId) => {
      socket.join(chatRoomId);

      try {
        const chatRoom = await ChatRoom.findById(chatRoomId).populate(
          "messages"
        );
        if (chatRoom) {
          socket.emit("loadMessages", chatRoom.messages);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    });

    socket.on("sendMessage", async (chatRoomId, messageContent) => {
      if (!socket.user) return;

      try {
        const message = new Message({
          sender: socket.user._id,
          content: messageContent,
        });
        await message.save();

        // Find the chat room and add the message to it
        const chatRoom = await ChatRoom.findById(chatRoomId);
        if (chatRoom) {
          chatRoom.messages.push(message._id);
          await chatRoom.save();

          // Emit the new message
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
