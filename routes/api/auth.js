const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth");
const { validateBody } = require("../../middlewares");
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

router.post("/logout", authController.logoutUser);

module.exports = router;
