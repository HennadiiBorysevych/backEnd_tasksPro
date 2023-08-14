const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  refreshUser,
  google,
  googleRedirect,
} = require("../../controllers/auth");
const { validateBody, auth } = require("../../middlewares");
const { registerSchema, loginSchema, refreshSchema } = require("../../schemas");
const { controllerWrapper } = require("../../helpers");

router.post(
  "/register",
  validateBody(registerSchema),
  controllerWrapper(registerUser)
);

router.post("/login", validateBody(loginSchema), controllerWrapper(loginUser));

router.post("/logout", auth, controllerWrapper(logoutUser));

router.post(
  "/refresh",
  validateBody(refreshSchema),
  controllerWrapper(refreshUser)
);

router.get("/google", controllerWrapper(google));
router.get("/google-redirect", controllerWrapper(googleRedirect));

module.exports = router;
