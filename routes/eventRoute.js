<<<<<<< HEAD
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
=======
const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.post('/', eventController.createEvent);
router.get('/',  eventController.getEvents);
router.delete('/', eventController.deleteEvent)
>>>>>>> e8dc6015e82a6a90ad127145c5b04d6551dcc69b

module.exports = router;
