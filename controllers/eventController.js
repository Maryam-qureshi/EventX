const Event = require('../models/event');

const createEvent = async (req, res) => {
  const { id,eventType, date, location, budget, preferences } = req.body;
  try {
    const event = new Event({
      user: id,
      eventType,
      date,
      location,
      budget,
      preferences,
    });

    await event.save();
    res.status(201).json({ message: "Successfully added new event", event });

  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.params.id });
    res.json(events);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    await event.remove();
    res.json({ message: "Event removed" });

  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createEvent,
  getEvents,
  deleteEvent
};
