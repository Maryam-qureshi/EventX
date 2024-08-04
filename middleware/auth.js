const { getUser } = require("../service/auth");

const restrictToLoggedinUsersOnly = async (req, res, next) => {
  const userid = req.cookies?.uid;

  if (!userid) {
    console.log("Invalid user id");
    return res.redirect("/login");
  }

  const user = getUser(userid);

  if (!user) {
    console.log("Invalid user");
    return res.redirect("/login");
  }

  req.user = user;
  next();
};

module.exports = {
  restrictToLoggedinUsersOnly,
};
