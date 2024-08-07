const User = require("../models/user");
const Planner = require("../models/planner");
const { setUser } = require("../service/auth");

const signup = async (req, res) => {
  console.log(req.body);

  try {
    const {
      name,
      email,
      password,
      isPlanner,
      expertise,
      services,
      experience,
    } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const isPlannerBoolean = isPlanner === "true" || isPlanner === true;
    // Create the user
    const user1 = new User({
      name,
      email,
      password,
      isPlanner: isPlannerBoolean,
    });
    await user1.save();

    // If user is a planner, create a Planner profile
    if (isPlanner) {
      const planner = new Planner({
        user: user1._id,
        name: user1.name,
        email: user1.email,
        profile: {
          expertise,
          services,
          experience,
        },
      });
      await planner.save();
    }
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Invalid Credentials / Invalid e-mail" });
    }
    const isMatch = password === user.password;
    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Invalid Credentials / Invalid password" });
    }

    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    console.log("Error");
    res.status(500).send("Server Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "The user deleted successfully" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  signup,
  login,
  getUser,
  deleteUser,
};
