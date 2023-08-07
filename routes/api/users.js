const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users");
const { multerUpload, validateBody, auth } = require("../../middlewares");
const { themeSchema, helpRequestSchema } = require("../../schemas");
const { schemas } = require("../../models/user");
const { controllerWrapper } = require("../../helpers");

router.patch(
  "/themes",
  auth,
  validateBody(themeSchema),
  controllerWrapper(usersController.updateTheme)
);

router.patch(
  "/help",
  auth,
  validateBody(helpRequestSchema),
  controllerWrapper(usersController.helpRequest)
);

router.get("/current", auth, controllerWrapper(usersController.currentUser));

router.patch(
  "/",
  auth,
  multerUpload.single("newAvatar"),
  validateBody(schemas.updateSchema),
  usersController.updateUser
);

module.exports = router;
