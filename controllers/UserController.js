const User = require("../models/user");

const signup = async (req, res) => {
  console.log(req.body);
  const { name, email, password, isPlanner } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const isPlannerBoolean = isPlanner === "true" || isPlanner === true;

    user = new User({ name, email, password, isPlanner: isPlannerBoolean });
    await user.save();
    res.status(201).json({ message: "User Successfully added", id: user.id });
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
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
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
