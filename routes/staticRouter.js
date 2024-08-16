const express = require("express");
const router = express.Router();
const Planner = require("../models/planner"); // Assuming you have a Planner model

router.get("/", (req, res) => {
  return res.render("home");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/new-event", (req, res) => {
  return res.render("new-event");
});

router.get("/tasks", async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      console.log(req.user);
      return res.status(401).send("User not authenticated");
    }

    const userId = req.user._id; // Get the current user ID
    console.log("User ID:", userId); // Debugging log to check user ID

    // Fetch tasks assigned to the current user
    const tasks = await Task.find({ assignedTo: userId });
    console.log("Fetched Tasks:", tasks); // Debugging log to check fetched tasks

    // Render the tasks view with the fetched tasks
    res.render("tasks", { tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).send("Server Error");
  }
});

router.get("/manageTasks", async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks (or adjust as needed)
    const users = await User.find(); // Fetch all users (to assign tasks to)
    res.render("manageTasks", { tasks, users }); // Pass tasks and users to the view
  } catch (err) {
    console.error("Error fetching tasks or users:", err);
    res.status(500).send("Server Error");
  }
});

router.get("/profile/:id", async (req, res) => {
  try {
    const planner = await Planner.findById(req.params.id);
    if (!planner) {
      return res.status(404).send("Planner not found");
    }
    res.render("profile", { planner }); // Ensure `planner` is passed here
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/reviews/:id", async (req, res) => {
  try {
    const planner = await Planner.findById(req.params.id);
    if (!planner) {
      return res.status(404).send("Planner not found");
    }
    res.render("review", { planner }); // Ensure `planner` is passed here
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
