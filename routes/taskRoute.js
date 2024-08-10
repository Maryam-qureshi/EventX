const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

// Route to create a new task
router.post("/tasks", taskController.createTask);

// Route to get all tasks
router.get("/tasks", taskController.getTasks);

// Route to get a specific task
router.get("/tasks/:id", taskController.getTask);

// Route to update a task
router.put("/tasks/:id", taskController.updateTask);

// Route to delete a task
router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;
