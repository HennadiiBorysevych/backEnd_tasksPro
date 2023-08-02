const express = require("express");
const router = express.Router();
const usersController = require("../../controllers");
const { multerUpload } = require("../../middlewares")

//router.get("/current", usersController.currentUser);

//router.patch("/themes", usersController.updateTheme);

router.patch("/avatar", multerUpload.single("image"), usersController.uploadAvatar);

//router.patch("/help", usersController.helpRequest);

//router.patch("/", usersController.updateUser);

module.exports = router;
