const express = require("express");
const userController = require("../controllers/UserController");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/:id", userController.getUser);
>>>>>>> e8dc6015e82a6a90ad127145c5b04d6551dcc69b

module.exports = router;
