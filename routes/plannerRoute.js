const express = require("express");
const planner = require("../controllers/plannerController");
const { restrictToLoggedinUsersOnly } = require("../middleware/auth");
const router = express.Router();

router.get("/", restrictToLoggedinUsersOnly, planner.getPlanners); // Route to browse planners
router.get("/:id", restrictToLoggedinUsersOnly, planner.getPlannerProfile); // Route to view planner profile
router.post(
  "/profile",
  restrictToLoggedinUsersOnly,
  planner.createPlannerProfile
); // Route to create planner profile
router.put(
  "/profile/:id",
  restrictToLoggedinUsersOnly,
  planner.updatePlannerProfile
); // Route to update planner profile
router.post(
  "/portfolio",
  restrictToLoggedinUsersOnly,
  planner.addPortfolioItem
); // Route to add portfolio item
router.delete("/:id", restrictToLoggedinUsersOnly, planner.deletePlanner); //Route to delete planner

module.exports = router;
