const express = require("express");
const router = express.Router();
const {
  updateTheme,
  helpRequest,
  currentUser,
  updateUser,
  forgotPassword,
  forgotPasswordSend,
} = require("../../controllers/users");
const { multerUpload, validateBody, auth } = require("../../middlewares");
const {
  themeSchema,
  helpRequestSchema,
  updateSchema,
} = require("../../schemas");
const { controllerWrapper } = require("../../helpers");

router.patch(
  "/themes",
  auth,
  validateBody(themeSchema),
  controllerWrapper(updateTheme)
);

router.patch(
  "/forgotpasswordsend",

  controllerWrapper(forgotPasswordSend)
);

router.patch("/forgotpassword", controllerWrapper(forgotPassword));

router.patch(
  "/help",
  auth,
  validateBody(helpRequestSchema),
  controllerWrapper(helpRequest)
);

router.get("/current", auth, controllerWrapper(currentUser));

router.patch(
  "/",
  auth,
  multerUpload.single("newAvatar"),
  validateBody(updateSchema),
  controllerWrapper(updateUser)
);

module.exports = router;
