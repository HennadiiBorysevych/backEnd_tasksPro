const express = require("express");
const router = express.Router();

const {
  addColumn,
  getColumnById,
  removeColumn,
  updateColumn,
} = require("../../controllers/columns");
const { auth, validateBody, isValidId } = require("../../middlewares");
const { createColumnSchema, updateColumnSchema } = require("../../schemas");
const { controllerWrapper } = require("../../helpers");

router.get("/:id", auth, isValidId, controllerWrapper(getColumnById));

router.post(
  "/",
  auth,
  validateBody(createColumnSchema),
  controllerWrapper(addColumn)
);

router.patch(
  "/:id",
  auth,
  isValidId,
  validateBody(updateColumnSchema),
  controllerWrapper(updateColumn)
);

router.delete("/:id", auth, isValidId, controllerWrapper(removeColumn));

module.exports = router;
