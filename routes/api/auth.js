const express = require("express");
const router = express.Router();
const authController = require("../../controllers");

router.post("/signup", authController.registerUser);

router.post("/signin", authController.loginUser);

router.post("/signout", authController.logoutUser);

module.exports = router;
