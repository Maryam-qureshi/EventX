
const express = require("express");
const eventController = require("../controllers/eventController");
const { restrictToLoggedinUsersOnly } = require("../middleware/auth");
const router = express.Router();

router.post(
  "/new-event",
  restrictToLoggedinUsersOnly,
  eventController.createEvent
);
router.get("/", restrictToLoggedinUsersOnly, eventController.getEvents);
router.delete("/:id", restrictToLoggedinUsersOnly, eventController.deleteEvent);

module.exports = router;
