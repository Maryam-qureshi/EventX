<<<<<<< HEAD
const Event = require("../models/event");

const createEvent = async (req, res) => {
  console.log(req.body);
  const { eventType, date, location, budget, preferences } = req.body;
  try {
    const event = new Event({
      user: req.user._id,
=======
const Event = require('../models/event');

const createEvent = async (req, res) => {
  const { id,eventType, date, location, budget, preferences } = req.body;
  try {
    const event = new Event({
      user: id,
>>>>>>> e8dc6015e82a6a90ad127145c5b04d6551dcc69b
      eventType,
      date,
      location,
      budget,
      preferences,
    });
<<<<<<< HEAD
    await event.save();
    console.log("Added");
    res.redirect("/");
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).send("Server Error");
=======

    await event.save();
    res.status(201).json({ message: "Successfully added new event", event });

  } catch (err) {
    res.status(500).send('Server Error');
>>>>>>> e8dc6015e82a6a90ad127145c5b04d6551dcc69b
  }
};

const getEvents = async (req, res) => {
  try {
<<<<<<< HEAD
    const events = await Event.find({ user: req.user._id });
    if (!events) {
      return res.json({ msg: "No event" });
    }
    res.render("events", { events });
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).send("Server Error");
=======
    const events = await Event.find({ user: req.params.id });
    res.json(events);
  } catch (err) {
    res.status(500).send('Server Error');
>>>>>>> e8dc6015e82a6a90ad127145c5b04d6551dcc69b
  }
};

const deleteEvent = async (req, res) => {
<<<<<<< HEAD
  const eventId = req.params.id;
  console.log(`Attempting to delete event with ID: ${eventId}`); // Add this line to debug
  try {
    const result = await Event.findByIdAndDelete(eventId); // Delete event from your data source
    if (result) {
      res.status(204).send(); // Send a 204 No Content response
    } else {
      res.status(404).send("Event not found"); // Send 404 if the event was not found
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).send("Internal Server Error");
=======
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
>>>>>>> e8dc6015e82a6a90ad127145c5b04d6551dcc69b
  }
};

module.exports = {
  createEvent,
  getEvents,
<<<<<<< HEAD
  deleteEvent,
=======
  deleteEvent
>>>>>>> e8dc6015e82a6a90ad127145c5b04d6551dcc69b
};
