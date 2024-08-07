const Planner = require("../models/planner"); // Assuming you have a Planner model
const User = require("../models/user");
const getPlanners = async (req, res) => {
  try {
    const planners = await Planner.find({});
    res.status(200).render("planners", { planners });
  } catch (err) {
    console.error("Error fetching planners:", err);
    res.status(500).send("Server Error");
  }
};

const getPlannerProfile = async (req, res) => {
  try {
    const planner = await Planner.findById(req.params.id);

    if (!planner) {
      return res.status(404).send("Planner not found");
    }

    res.status(200).render("plannerProfile", { planner });
  } catch (err) {
    console.error("Error fetching planner profile:", err);
    res.status(500).send("Server Error");
  }
};

const updatePlannerProfile = async (req, res) => {
  try {
    console.log("In upp");
    console.log(req.body);
    const { expertise, services, experience } = req.body;
    console.log(expertise, services, experience);
    const planner = await Planner.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          "profile.expertise": expertise,
          "profile.services": services,
          "profile.experience": experience,
        },
      },
      { new: true }
    );
    console.log(expertise, services, experience);
    console.log(planner);
    if (!planner) {
      return res.status(404).send("Planner not found");
    }
    return res.status(201).send("Updated");
  } catch (err) {
    console.error("Error updating planner profile:", err);
    res.status(500).send("Server Error");
  }
};

const addPortfolioItem = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const planner = await Planner.findById(req.params.id);

    if (!planner) {
      return res.status(404).send("Planner not found");
    }

    planner.portfolio.push({
      title,
      description,
      date: new Date(date), // Ensure date is stored as a Date object
    });

    await planner.save();
    return res.status(201).send("Updated");
  } catch (err) {
    console.error("Error adding portfolio item:", err);
    res.status(500).send("Server Error");
  }
};

const deletePlanner = async (req, res) => {
  try {
    const plannerId = req.params.id;

    const planner = await Planner.findByIdAndDelete(plannerId);
    await User.findByIdAndDelete(planner.user);
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
  updatePlannerProfile,
  addPortfolioItem,
  deletePlanner,
};
