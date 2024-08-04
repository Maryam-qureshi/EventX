const mongoose = require("mongoose");

<<<<<<< HEAD
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isPlanner: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
=======
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isPlanner: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now
    },
  },
);
>>>>>>> e8dc6015e82a6a90ad127145c5b04d6551dcc69b

const user = mongoose.model("User", UserSchema);

module.exports = user;
