const jwt = require("jsonwebtoken");
const SECRET_KEY = "event@123X$098";

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    SECRET_KEY
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
