const Event = require("../models/event");

const createEvent = async (req, res) => {
  console.log(req.body);
  const { eventType, date, location, budget, preferences } = req.body;
  try {
    const event = new Event({
      user: req.user._id,
      eventType,
      date,
      location,
      budget,
      preferences,
    });
    await event.save();
    console.log("Added");
    res.redirect("/");
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).send("Server Error");
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user._id });
    if (!events) {
      return res.json({ msg: "No event" });
    }
    res.render("events", { events });
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).send("Server Error");
  }
};

const deleteEvent = async (req, res) => {
  const eventId = req.params.id;
  try {
    const result = await Event.findByIdAndDelete(eventId);
    if (result) {
      res.status(204).send(); // Send a 204 No Content response
    } else {
      res.status(404).send("Event not found"); // Send 404 if the event was not found
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createEvent,
  getEvents,
  deleteEvent,
};
