const mongoose = require("mongoose");

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
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("User", UserSchema);

module.exports = user;
