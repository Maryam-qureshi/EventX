const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const { restrictToLoggedinUsersOnly } = require("../middleware/auth");

// Apply the middleware to ensure the user is authenticated
router.get("/", restrictToLoggedinUsersOnly, chatController.getChatPage);

module.exports = router;
