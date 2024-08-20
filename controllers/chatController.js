const ChatRoom = require("../models/chat");

exports.getChatPage = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("User not authenticated");
    }

    const userId = req.query.userId;
    const currentUser = req.user._id;

    // Check if chat room already exists
    let chatRoom = await ChatRoom.findOne({
      users: { $all: [currentUser, userId] },
    }).populate("messages");

    // If no chat room exists, create a new one
    if (!chatRoom) {
      chatRoom = new ChatRoom({ users: [currentUser, userId] });
      await chatRoom.save();
    }

    // Pass chatRoomId and messages to the view
    res.render("chat", {
      chatRoomId: chatRoom._id.toString(), // Ensure chatRoomId is a string
      messages: chatRoom.messages.map((msg) => ({
        ...msg._doc,
        sender: {
          name: (msg.sender && msg.sender.name) || "Unknown",
        },
      })), // Ensure messages have sender information
    });
  } catch (err) {
    console.error("Error fetching or creating chat room:", err);
    res.status(500).send("Server Error");
  }
};
