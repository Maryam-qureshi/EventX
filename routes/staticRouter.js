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
