const express = require("express");
const userController = require("../controllers/UserController");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/:id", userController.getUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
