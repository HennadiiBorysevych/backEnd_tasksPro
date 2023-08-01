const express = require("express");
const router = express.Router();
const usersController = require("../../controllers");

router.get("/current", usersController.currentUser);

router.patch("/themes", usersController.updateTheme);

router.patch("/", usersController.updateUser);

router.patch("/avatar", usersController.uploadAvatar);

router.patch("/help", usersController.helpRequest);

module.exports = router;
