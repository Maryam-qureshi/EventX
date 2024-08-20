const ChatRoom = require("../models/chat");
const Message = require("../models/message");

exports.getChatPage = async (req, res) => {
  try {
    const chatRoomId = req.params.chatRoomId;
    // Ensure chatRoomId is valid and exists
    const chatRoom = await ChatRoom.findById(chatRoomId).populate("messages");
    if (!chatRoom) {
      return res.status(404).send("Chat room not found");
    }

    res.render("chat", { chatRoomId, messages: chatRoom.messages });
  } catch (err) {
    console.error("Error fetching chat page:", err);
    res.status(500).send("Server Error");
  }
};
