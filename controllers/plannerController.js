const Planner = require("../models/planner"); // Assuming you have a Planner model

// Controller to get the list of planners
const getPlanners = async (req, res) => {
  try {
    const planners = await Planner.find({});
    res.render("planners", { planners });
  } catch (err) {
    console.error("Error fetching planners:", err);
    res.status(500).send("Server Error");
  }
};

// Controller to get a single planner's profile
const getPlannerProfile = async (req, res) => {
  try {
    const planner = await Planner.findById(req.params.id);
    res.render("plannerProfile", { planner });
  } catch (err) {
    console.error("Error fetching planner profile:", err);
    res.status(500).send("Server Error");
  }
};

// Controller to create a planner's profile
const createPlannerProfile = async (req, res) => {
  try {
    const { name, expertise, services } = req.body;
    const planner = new Planner({
      user: req.user.id,
      name,
      expertise,
      services,
    });
    await planner.save();
    res.redirect("/planners");
  } catch (err) {
    console.error("Error creating planner profile:", err);
    res.status(500).send("Server Error");
  }
};

// Controller to update a planner's profile
const updatePlannerProfile = async (req, res) => {
  try {
    const { name, expertise, services } = req.body;
    const planner = await Planner.findByIdAndUpdate(
      req.params.id,
      { name, expertise, services },
      { new: true }
    );
    res.redirect(`/planners/${planner._id}`);
  } catch (err) {
    console.error("Error updating planner profile:", err);
    res.status(500).send("Server Error");
  }
};

// Controller to add portfolio item
const addPortfolioItem = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const planner = await Planner.findById(req.user.id);
    planner.portfolio.push({ title, description, date });
    await planner.save();
    res.redirect(`/planners/${planner._id}`);
  } catch (err) {
    console.error("Error adding portfolio item:", err);
    res.status(500).send("Server Error");
  }
};

const deletePlanner = async (req, res) => {
  try {
    const plannerId = req.params.id;

    const planner = await Planner.findByIdAndDelete(plannerId);

    if (!planner) {
      return res.status(404).send("Planner not found");
    }

    res.status(200).send("Planner deleted");
  } catch (err) {
    console.error("Error deleting planner:", err);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getPlanners,
  getPlannerProfile,
  createPlannerProfile,
  updatePlannerProfile,
  addPortfolioItem,
  deletePlanner,
};
