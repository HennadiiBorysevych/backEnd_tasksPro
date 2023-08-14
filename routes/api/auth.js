const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth");
const { validateBody, auth } = require("../../middlewares");
const { schemas } = require("../../models/user");
const { controllerWrapper } = require("../../helpers");

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  controllerWrapper(authController.registerUser)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  controllerWrapper(authController.loginUser)
);

router.post("/logout", auth, controllerWrapper(authController.logoutUser));

router.get("/google", controllerWrapper(authController.google));
router.get(
  "/google-redirect",
  controllerWrapper(authController.googleRedirect)
);

module.exports = router;
