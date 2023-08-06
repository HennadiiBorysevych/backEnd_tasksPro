const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users");
const { multerUpload, validateBody, auth } = require("../../middlewares");
const { themeSchema } = require("../../schemas");

router.patch(
  "/themes",
  auth,
  validateBody(themeSchema),
  usersController.updateTheme
);

router.patch(
  "/avatar",
  auth,
  multerUpload.single("newAvatar"),
  usersController.uploadAvatar
);

// router.patch("/help", usersController.helpRequest);

// router.patch("/", usersController.updateUser);

module.exports = router;
