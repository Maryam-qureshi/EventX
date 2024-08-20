const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// Route to render the chat page
router.get("/chat/:chatRoomId", chatController.getChatPage);

module.exports = router;
