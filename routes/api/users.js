const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users");
const { multerUpload, validateBody, auth } = require("../../middlewares");
const { themeSchema } = require("../../schemas");
const { schemas } = require("../../models/user");

router.patch(
  "/themes",
  auth,
  validateBody(themeSchema),
  usersController.updateTheme
);

// router.patch("/help", usersController.helpRequest);

router.get("/current", auth, usersController.currentUser);

router.patch(
  "/",
  auth,
  multerUpload.single("newAvatar"),
  validateBody(schemas.updateSchema),
  usersController.updateUser
);

module.exports = router;
