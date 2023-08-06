const express = require("express");
const router = express.Router();

const {
  addCard,
  removeCard,
  updateCard,
  getCardById,
} = require("../../controllers/cards");
const { auth, isValidId, validateBody } = require("../../middlewares");
const { controllerWrapper } = require("../../helpers");
const { updateCardSchema, createCardSchema } = require("../../schemas");

router.get("/:id", auth, isValidId, controllerWrapper(getCardById));
router.post(
  "/",
  auth,
  validateBody(createCardSchema),
  controllerWrapper(addCard)
);
router.patch(
  "/:id",
  auth,
  isValidId,
  validateBody(updateCardSchema),
  controllerWrapper(updateCard)
);
router.delete("/:id", auth, isValidId, controllerWrapper(removeCard));

module.exports = router;
