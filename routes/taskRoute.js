const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { restrictToLoggedinUsersOnly } = require("../middleware/auth");

router.post("/", restrictToLoggedinUsersOnly, taskController.createTask);

router.get("/", restrictToLoggedinUsersOnly, taskController.getTasks);

router.get("/:id", restrictToLoggedinUsersOnly, taskController.getTask);

router.post("/:id", restrictToLoggedinUsersOnly, taskController.updateTask);

router.delete("/:id", restrictToLoggedinUsersOnly, taskController.deleteTask);

module.exports = router;
