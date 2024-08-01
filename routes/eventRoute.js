const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

router.post('/', eventController.createEvent);
router.get('/',  eventController.getEvents);
router.delete('/', eventController.deleteEvent)

module.exports = router;
