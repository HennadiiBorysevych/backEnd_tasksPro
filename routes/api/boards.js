const express = require("express");
const router = express.Router();

const {
  getBoard,
  addBoard,
  getBoardById,
  removeBoard,
  updateBoard,
} = require("../../controllers/boards");
const { controllerWrapper } = require("../../helpers");
const { auth, validateBody, isValidId } = require("../../middlewares");
const { createBoardSchema, updateBoardSchema } = require("../../schemas");

router.get("/", auth, controllerWrapper(getBoard));
router.get("/:id", auth, isValidId, controllerWrapper(getBoardById));
router.post(
  "/",
  auth,
  validateBody(createBoardSchema),
  controllerWrapper(addBoard)
);
router.patch(
  "/:id",
  auth,
  isValidId,
  validateBody(updateBoardSchema),
  controllerWrapper(updateBoard)
);
router.delete("/:id", auth, isValidId, controllerWrapper(removeBoard));

module.exports = router;
