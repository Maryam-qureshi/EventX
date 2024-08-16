const Task = require("../models/task");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, assignedTo, plannerId } = req.body;
    const task = new Task({
      title,
      description,
      dueDate,
      assignedTo,
      plannerId,
      createdBy: req.user._id,
    });

    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).render("tasks", { tasks });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task not found");
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).send("Task not found");
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send("Task not found");
    res.status(200).send("Task deleted");
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
