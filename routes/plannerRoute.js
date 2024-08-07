const express = require("express");
const {
  getPlanners,
  getPlannerProfile,
  createPlannerProfile,
  updatePlannerProfile,
  addPortfolioItem,
} = require("../controllers/plannerController");
const { restrictToLoggedinUsersOnly } = require("../middleware/auth");
const router = express.Router();

router.get("/", restrictToLoggedinUsersOnly, getPlanners); // Route to browse planners
router.get("/:id", restrictToLoggedinUsersOnly, getPlannerProfile); // Route to view planner profile
router.post("/profile", restrictToLoggedinUsersOnly, createPlannerProfile); // Route to create planner profile
router.put("/profile/:id", restrictToLoggedinUsersOnly, updatePlannerProfile); // Route to update planner profile
router.post("/portfolio", restrictToLoggedinUsersOnly, addPortfolioItem); // Route to add portfolio item

module.exports = router;
